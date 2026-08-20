import { SkinViewer as Skinview3D, WalkingAnimation } from "skinview3d";

const React = window.React;
const { useState, useEffect, useRef } = React;

function SkinViewer({
  skinUrl,
  capeUrl,
  slim = false,
  width = 150,
  height = 300,
  className,
  autoRotate = false,
  backView = false,
}) {
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!canvasRef.current) return;

    if (!viewerRef.current) {
      viewerRef.current = new Skinview3D({
        canvas: canvasRef.current,
        width,
        height,
      });
      viewerRef.current.animation = new WalkingAnimation();
    }

    setError(null);
    viewerRef.current.setSize(width, height);
    viewerRef.current.autoRotate = autoRotate;

    if (backView) {
      viewerRef.current.playerObject.rotation.y = Math.PI;
    } else if (!autoRotate) {
      viewerRef.current.playerObject.rotation.y = 0;
    }

    viewerRef.current
      .loadSkin(skinUrl, { model: slim ? "slim" : "auto-detect" })
      .catch((e) => {
        if (isMounted) {
          console.error("Failed to load skin:", e);
          setError(String(e));
        }
      });

    if (capeUrl) {
      viewerRef.current.loadCape(capeUrl).catch((e) => {
        if (isMounted) {
          console.error("Failed to load cape:", e);
        }
      });
    } else {
      viewerRef.current.resetCape();
    }

    return () => {
      isMounted = false;
    };
  }, [skinUrl, capeUrl, slim, width, height, autoRotate, backView]);

  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, []);

  if (error) {
    return React.createElement(
      "div",
      {
        className,
        style: {
          width,
          height,
          color: "red",
          fontSize: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      `Skin Error: ${error}`,
    );
  }

  return React.createElement("canvas", {
    ref: canvasRef,
    className,
    style: { display: "block" },
  });
}

function WardrobeModal({ isOpen, onClose, activeProfile, store, api }) {
  const [activeTab, setActiveTab] = useState("skins");
  const [selectedSkinId, setSelectedSkinId] = useState(null);
  const [accountCapes, setAccountCapes] = useState([]);
  const [loadingCapes, setLoadingCapes] = useState(false);
  const [selectedCape, setSelectedCape] = useState(null);
  const [isBackView, setIsBackView] = useState(false);
  const [uploadSlim, setUploadSlim] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const fileInputRef = useRef(null);
  const wardrobe = store?.wardrobe || [];
  const Obsy = window.Obsy;

  const {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsList,
    TabsTrigger,
  } = Obsy?.ui || {};

  useEffect(() => {
    if (isOpen && activeProfile) {
      store?.fetchWardrobe?.();
      if (activeProfile.microsoft && store?.getAccountCapes) {
        setLoadingCapes(true);
        store
          .getAccountCapes(activeProfile.id)
          .then((capes) => {
            setAccountCapes(capes || []);
            const active = (capes || []).find((c) => c.state === "ACTIVE");
            if (active) {
              setSelectedCape(active);
            }
          })
          .catch(() => setAccountCapes([]))
          .finally(() => setLoadingCapes(false));
      }
    }
  }, [isOpen, activeProfile?.id]);

  if (!activeProfile) return null;

  const handleSkinUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const bytes = Array.from(new Uint8Array(buffer));
      if (store?.addSkinToWardrobe) {
        await store.addSkinToWardrobe(
          bytes,
          file.name,
          uploadSlim,
          activeProfile.id,
        );
        api.ui.showToast(`Скин «${file.name}» добавлен в гардероб`, "success");
      }
    } catch (err) {
      api.ui.showToast("Ошибка при загрузке скина", "error");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApply = async () => {
    setIsApplying(true);
    try {
      if (selectedSkinId && store?.applySkin) {
        await store.applySkin(activeProfile.id, selectedSkinId);
      }
      if (activeProfile.microsoft && store?.setActiveCape) {
        await store.setActiveCape(activeProfile.id, selectedCape?.id || null);
        if (selectedCape?.base64) {
          localStorage.setItem(
            `obsy_cape_${activeProfile.id}`,
            selectedCape.base64,
          );
        } else {
          localStorage.removeItem(`obsy_cape_${activeProfile.id}`);
        }
      }
      window.dispatchEvent(new CustomEvent("obsy:capeChange"));
      api.ui.showToast("Изменения сохранены", "success");
      onClose();
    } catch (err) {
      api.ui.showToast("Не удалось применить скин или плащ", "error");
    } finally {
      setIsApplying(false);
    }
  };

  const selectedSkin = wardrobe.find((s) => s.id === selectedSkinId);
  const previewSkinUrl = selectedSkin
    ? selectedSkin.base64Data
    : activeProfile.skinPng || "";
  const previewSlim = selectedSkin ? selectedSkin.slim : activeProfile.slim;
  const previewCapeUrl = selectedCape?.base64 || selectedCape?.url || null;

  return React.createElement(
    Dialog,
    {
      open: isOpen,
      onOpenChange: (open) => {
        if (!open) onClose();
      },
    },
    React.createElement(
      DialogContent,
      { className: "sm:max-w-4xl" },
      React.createElement(
        DialogHeader,
        null,
        React.createElement(
          "div",
          { className: "flex items-center justify-between pr-6" },
          React.createElement(DialogTitle, null, "Гардероб"),
          React.createElement(
            Tabs,
            {
              value: activeTab,
              onValueChange: (val) => {
                setActiveTab(val);
                setIsBackView(val === "capes");
              },
            },
            React.createElement(
              TabsList,
              null,
              React.createElement(TabsTrigger, { value: "skins" }, "Скины"),
              React.createElement(TabsTrigger, { value: "capes" }, "Плащи"),
            ),
          ),
        ),
      ),

      React.createElement(
        "div",
        { className: "flex h-[420px] gap-6" },
        // Left Column
        React.createElement(
          "div",
          { className: "flex min-h-0 flex-1 flex-col gap-3" },
          activeTab === "skins"
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "div",
                  { className: "flex w-full gap-2" },
                  React.createElement(
                    Select,
                    {
                      value: uploadSlim ? "slim" : "classic",
                      onValueChange: (v) => setUploadSlim(v === "slim"),
                    },
                    React.createElement(
                      SelectTrigger,
                      { className: "w-[130px]" },
                      React.createElement(SelectValue, null),
                    ),
                    React.createElement(
                      SelectContent,
                      null,
                      React.createElement(
                        SelectItem,
                        { value: "classic" },
                        "Classic (4px)",
                      ),
                      React.createElement(
                        SelectItem,
                        { value: "slim" },
                        "Slim (3px)",
                      ),
                    ),
                  ),
                  React.createElement("input", {
                    type: "file",
                    accept: "image/png",
                    className: "hidden",
                    ref: fileInputRef,
                    onChange: handleSkinUpload,
                  }),
                  React.createElement(
                    Button,
                    {
                      variant: "secondary",
                      onClick: () => fileInputRef.current?.click(),
                      className: "flex-1",
                    },
                    "Загрузить скин (PNG)",
                  ),
                ),
                React.createElement(
                  "div",
                  {
                    className:
                      "border-border/50 bg-muted/20 min-h-0 flex-1 overflow-y-auto rounded-md border p-2",
                  },
                  React.createElement(
                    "div",
                    { className: "grid grid-cols-3 gap-2" },
                    wardrobe
                      .filter(
                        (s) => !s.profileId || s.profileId === activeProfile.id,
                      )
                      .map((skin) => {
                        const isSelected = selectedSkinId === skin.id;
                        return React.createElement(
                          "div",
                          {
                            key: skin.id,
                            onClick: () => setSelectedSkinId(skin.id),
                            className:
                              "relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors duration-300 " +
                              (isSelected
                                ? "border-primary bg-primary/10 shadow-md"
                                : "border-transparent bg-muted/50 hover:border-primary/50"),
                          },
                          React.createElement("img", {
                            src: skin.base64Data,
                            alt: skin.name,
                            style: { imageRendering: "pixelated" },
                            className: "h-full w-full object-contain p-2",
                          }),
                          isSelected &&
                            React.createElement(
                              "div",
                              {
                                className:
                                  "bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                              },
                              "✓",
                            ),
                          React.createElement(
                            "div",
                            {
                              className:
                                "from-background/90 absolute inset-x-0 bottom-0 truncate bg-gradient-to-t to-transparent p-1 text-center text-[10px]",
                            },
                            skin.name,
                          ),
                        );
                      }),
                  ),
                ),
              )
            : React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "div",
                  {
                    className:
                      "text-muted-foreground flex items-center justify-between text-xs",
                  },
                  React.createElement(
                    "span",
                    null,
                    "Официальные плащи Microsoft",
                  ),
                  loadingCapes &&
                    React.createElement("span", null, "Загрузка..."),
                ),
                React.createElement(
                  "div",
                  {
                    className:
                      "border-border/50 bg-muted/20 min-h-0 flex-1 overflow-y-auto rounded-md border p-2",
                  },
                  React.createElement(
                    "div",
                    { className: "grid grid-cols-3 gap-2" },
                    React.createElement(
                      "div",
                      {
                        onClick: () => setSelectedCape(null),
                        className:
                          "relative flex aspect-square cursor-pointer items-center justify-center rounded-md border-2 p-2 text-center text-xs transition-colors duration-300 " +
                          (!selectedCape
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-transparent bg-muted/50 hover:border-primary/50"),
                      },
                      "Без плаща",
                      !selectedCape &&
                        React.createElement(
                          "div",
                          {
                            className:
                              "bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                          },
                          "✓",
                        ),
                    ),
                    accountCapes.map((cape) => {
                      const isSelected = selectedCape?.id === cape.id;
                      const capeSrc = cape.base64 || cape.url;
                      return React.createElement(
                        "div",
                        {
                          key: cape.id,
                          onClick: () => setSelectedCape(cape),
                          className:
                            "relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors duration-300 " +
                            (isSelected
                              ? "border-primary bg-primary/10 shadow-md"
                              : "border-transparent bg-muted/50 hover:border-primary/50"),
                        },
                        capeSrc &&
                          React.createElement("img", {
                            src: capeSrc,
                            alt: cape.alias || "Cape",
                            style: { imageRendering: "pixelated" },
                            className: "h-full w-full object-contain p-2",
                          }),
                        isSelected &&
                          React.createElement(
                            "div",
                            {
                              className:
                                "bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                            },
                            "✓",
                          ),
                        React.createElement(
                          "div",
                          {
                            className:
                              "from-background/90 absolute inset-x-0 bottom-0 truncate bg-gradient-to-t to-transparent p-1 text-center text-[10px]",
                          },
                          cape.alias || "Плащ",
                        ),
                      );
                    }),
                  ),
                ),
              ),
        ),

        // Right Column: Preview
        React.createElement(
          "div",
          {
            className:
              "border-border/50 bg-muted/10 relative flex w-64 flex-col items-center justify-between rounded-md border p-4",
          },
          React.createElement(
            "div",
            { className: "flex w-full justify-between" },
            React.createElement(
              Button,
              {
                variant: "outline",
                size: "xs",
                onClick: () => setIsBackView((v) => !v),
              },
              isBackView ? "Вид спереди" : "Вид сзади",
            ),
            React.createElement(
              "span",
              { className: "text-muted-foreground text-xs" },
              previewSlim ? "Slim" : "Classic",
            ),
          ),
          previewSkinUrl
            ? React.createElement(SkinViewer, {
                skinUrl: previewSkinUrl,
                capeUrl: previewCapeUrl,
                slim: previewSlim,
                width: 180,
                height: 280,
                backView: isBackView,
                autoRotate: false,
              })
            : React.createElement(
                "div",
                {
                  className:
                    "text-muted-foreground flex flex-1 items-center text-xs",
                },
                "Нет скина",
              ),
          React.createElement(
            Button,
            {
              onClick: handleApply,
              disabled: isApplying,
              className: "w-full",
            },
            isApplying ? "Сохранение..." : "Применить",
          ),
        ),
      ),
    ),
  );
}

function SkinDollWidget({ api }) {
  const store = window.Obsy?.useLauncherStore();
  const state = store?.state;
  const profiles = store?.profiles || [];
  const selectedProfileId = state?.selectedProfileId;
  const selectedProfile = profiles.find((p) => p.id === selectedProfileId);

  const [isBackView, setIsBackView] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [modelWidth, setModelWidth] = useState(160);
  const [showWardrobe, setShowWardrobe] = useState(true);
  const [currentCape, setCurrentCape] = useState(null);

  const { Button } = window.Obsy?.ui || {};

  useEffect(() => {
    if (api?.storage) {
      setModelWidth(api.storage.get("modelWidth", 160));
      setShowWardrobe(api.storage.get("showWardrobeButton", true));
    }
  }, [api]);

  useEffect(() => {
    const updateCape = () => {
      const saved =
        selectedProfile?.capePng ||
        (typeof localStorage !== "undefined" && selectedProfileId
          ? localStorage.getItem(`obsy_cape_${selectedProfileId}`)
          : null);
      setCurrentCape(saved);
    };

    updateCape();
    window.addEventListener("obsy:capeChange", updateCape);
    return () => {
      window.removeEventListener("obsy:capeChange", updateCape);
    };
  }, [selectedProfileId, selectedProfile?.capePng]);

  useEffect(() => {
    if (
      selectedProfile?.microsoft &&
      !selectedProfile?.capePng &&
      store?.refreshProfileSkin
    ) {
      store.refreshProfileSkin(selectedProfile.id);
    }
  }, [selectedProfile?.id]);

  useEffect(() => {
    const unsub = api.events.on("addon:skin-3d-viewer:configChange", () => {
      setModelWidth(api.storage.get("modelWidth", 160));
      setShowWardrobe(api.storage.get("showWardrobeButton", true));
    });
    return unsub;
  }, [api]);

  if (!selectedProfile) {
    return null;
  }

  const finalSkinUrl = selectedProfile.skinPng;

  return React.createElement(
    "div",
    {
      className:
        "bg-card border-border/50 relative hidden w-64 flex-col items-center justify-between overflow-hidden rounded-xl border p-5 shadow-2xl backdrop-blur-md md:flex animate-in fade-in zoom-in-95 duration-300",
    },
    React.createElement("div", {
      className:
        "from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-bl to-transparent",
    }),

    React.createElement(
      "div",
      {
        className:
          "relative z-10 flex w-full items-center justify-between pb-1",
      },
      React.createElement(
        "span",
        {
          className:
            "text-muted-foreground max-w-[130px] truncate text-[11px] font-medium",
        },
        selectedProfile.username,
      ),
      React.createElement(
        Button,
        {
          variant: "outline",
          size: "xs",
          onClick: () => setIsBackView((prev) => !prev),
          title: isBackView ? "Вид спереди" : "Вид сзади (плащ)",
        },
        isBackView ? "Вид спереди" : "Вид сзади",
      ),
    ),

    finalSkinUrl
      ? React.createElement(
          "div",
          {
            className:
              "relative z-10 flex flex-1 items-center justify-center py-2",
          },
          React.createElement(SkinViewer, {
            skinUrl: finalSkinUrl,
            capeUrl: currentCape,
            slim: selectedProfile.slim,
            width: modelWidth,
            height: 260,
            backView: isBackView,
          }),
        )
      : React.createElement(
          "div",
          {
            className:
              "text-muted-foreground relative z-10 flex w-full flex-1 items-center justify-center py-20 text-center text-xs",
          },
          "Скин не найден",
        ),

    showWardrobe && selectedProfile.microsoft
      ? React.createElement(
          Button,
          {
            variant: "outline",
            onClick: () => setIsWardrobeOpen(true),
            className: "relative z-10 mt-3 w-full",
          },
          "Гардероб",
        )
      : null,

    isWardrobeOpen
      ? React.createElement(WardrobeModal, {
          isOpen: isWardrobeOpen,
          onClose: () => setIsWardrobeOpen(false),
          activeProfile: selectedProfile,
          store,
          api,
        })
      : null,
  );
}

export default {
  manifest: {
    id: "skin-3d-viewer",
    name: "3D Skin Doll & Wardrobe",
    version: "2.4.0",
    description:
      "Интерактивная 3D-модель персонажа с анимацией ходьбы, гардеробом скинов и установкой плащей.",
    author: "Obsy Team",
    category: "customization",
    sizeBytes: 900000,
    permissions: ["ui:slots", "storage:local", "game:profiles"],
    tags: [
      "skin",
      "cape",
      "capes",
      "3d",
      "wardrobe",
      "player",
      "model",
      "animation",
    ],
  },
  activate(api) {
    api.ui.registerSlot(
      "dashboard.side",
      "skin-doll-widget",
      SkinDollWidget,
      1,
    );
    api.logger.info("3D Skin Doll & Wardrobe addon activated");
  },
  deactivate(api) {
    api.ui.unregisterSlot("skin-doll-widget");
  },
};
