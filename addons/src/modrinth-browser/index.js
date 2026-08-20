const React = window.React;
const { useState, useEffect, useCallback, useRef } = React;

const DEFAULT_GAME_VERSIONS = [
  "1.21.4",
  "1.21.1",
  "1.20.1",
  "1.19.4",
  "1.16.5",
];

function formatCount(num) {
  if (!num) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return String(num);
}

function makeInstanceId(slugOrId, gameVersion) {
  const cleanSlug = String(slugOrId || "modpack")
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36)
    .replace(/-+$/, "");
  return `${cleanSlug}-${gameVersion}`;
}

function getCurrentInstanceGameVersion() {
  const store = window.Obsy?.useLauncherStore?.getState?.();
  const selectedId = store?.selectedVersionId || store?.selected_version_id;
  if (!selectedId) return "1.21.4";

  if (selectedId.includes("-")) {
    const parts = selectedId.split("-");
    for (let i = parts.length - 1; i >= 0; i--) {
      if (
        parts[i].startsWith("1.") ||
        parts[i].startsWith("26.") ||
        parts[i].startsWith("25.")
      ) {
        return parts[i];
      }
    }
  } else if (
    selectedId.startsWith("1.") ||
    selectedId.startsWith("26.") ||
    selectedId.startsWith("25.")
  ) {
    return selectedId;
  }
  return "1.21.4";
}

function ProjectCard({ proj, dl, onDownload, onSelectAndPlay }) {
  const currentInstanceVersion = getCurrentInstanceGameVersion();
  const [availableVersions, setAvailableVersions] = useState(
    DEFAULT_GAME_VERSIONS.includes(currentInstanceVersion)
      ? DEFAULT_GAME_VERSIONS
      : [currentInstanceVersion, ...DEFAULT_GAME_VERSIONS],
  );
  const [selectedGameVersion, setSelectedGameVersion] = useState(
    currentInstanceVersion,
  );

  const Obsy = window.Obsy;
  const {
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } = Obsy?.ui || {};

  useEffect(() => {
    let isMounted = true;
    const fetchVersions = async () => {
      const idOrSlug = proj.slug || proj.project_id;
      try {
        const res = await fetch(
          `https://api.modrinth.com/v2/project/${idOrSlug}/version`,
        );
        if (res.ok && isMounted) {
          const versions = await res.json();
          const gameVersSet = new Set();
          versions.forEach((v) => {
            (v.game_versions || []).forEach((gv) => gameVersSet.add(gv));
          });
          const list = Array.from(gameVersSet).slice(0, 10);
          if (list.length > 0) {
            setAvailableVersions(list);
            if (list.includes(currentInstanceVersion)) {
              setSelectedGameVersion(currentInstanceVersion);
            } else {
              setSelectedGameVersion(list[0]);
            }
          }
        }
      } catch {}
    };

    fetchVersions();
    return () => {
      isMounted = false;
    };
  }, [proj.slug, proj.project_id, currentInstanceVersion]);

  const isDownloading = dl && dl.status === "downloading";
  const isInstalling = dl && dl.status === "installing";
  const isInstalled = dl && dl.status === "installed";

  return React.createElement(
    "div",
    {
      className:
        "flex flex-col gap-2 rounded-xl border border-border/40 bg-card/60 p-3.5 backdrop-blur-sm transition-all hover:border-border/70",
    },
    React.createElement(
      "div",
      { className: "flex items-start justify-between gap-4" },
      React.createElement(
        "div",
        { className: "flex min-w-0 flex-1 items-start gap-3" },
        proj.icon_url
          ? React.createElement("img", {
              src: proj.icon_url,
              alt: proj.title,
              className:
                "mt-0.5 h-10 w-10 shrink-0 rounded-lg object-cover border border-border/30 bg-muted/40",
            })
          : React.createElement(
              "div",
              {
                className:
                  "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 font-bold text-emerald-400",
              },
              proj.title.charAt(0).toUpperCase(),
            ),

        React.createElement(
          "div",
          { className: "flex min-w-0 flex-1 flex-col gap-0.5" },
          React.createElement(
            "div",
            { className: "flex flex-wrap items-center gap-2" },
            React.createElement(
              "span",
              {
                className:
                  "text-sm font-semibold text-foreground truncate max-w-[280px]",
              },
              proj.title,
            ),
            React.createElement(
              "span",
              { className: "text-[10px] text-muted-foreground" },
              `от ${proj.author}`,
            ),
            React.createElement(
              "span",
              {
                className:
                  "rounded bg-muted/60 px-1.5 py-0.2 font-mono text-[9px] text-muted-foreground border border-border/30",
              },
              `${formatCount(proj.downloads)} скачиваний`,
            ),
            proj.project_type === "modpack" &&
              React.createElement(
                "span",
                {
                  className:
                    "rounded bg-purple-500/15 px-1.5 py-0.2 font-mono text-[9px] text-purple-400 border border-purple-500/30 font-medium",
                },
                "Сборка",
              ),
          ),
          React.createElement(
            "p",
            {
              className:
                "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
            },
            proj.description,
          ),
          React.createElement(
            "div",
            { className: "mt-1 flex flex-wrap items-center gap-1.5" },
            (proj.categories || []).slice(0, 4).map((cat) =>
              React.createElement(
                "span",
                {
                  key: cat,
                  className:
                    "rounded border border-border/30 bg-muted/40 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground",
                },
                cat,
              ),
            ),
          ),
        ),
      ),

      React.createElement(
        "div",
        { className: "flex shrink-0 flex-col items-end gap-1.5" },
        !isInstalled &&
          !isDownloading &&
          !isInstalling &&
          React.createElement(
            "div",
            { className: "flex items-center gap-1.5" },
            React.createElement(
              "span",
              { className: "text-[10px] text-muted-foreground font-medium" },
              "Версия:",
            ),
            Select
              ? React.createElement(
                  Select,
                  {
                    value: selectedGameVersion,
                    onValueChange: setSelectedGameVersion,
                  },
                  React.createElement(
                    SelectTrigger,
                    {
                      className:
                        "h-6 min-w-[74px] px-2 py-0 text-[11px] font-mono",
                    },
                    React.createElement(SelectValue, null),
                  ),
                  React.createElement(
                    SelectContent,
                    null,
                    availableVersions.map((v) =>
                      React.createElement(
                        SelectItem,
                        { key: v, value: v, className: "font-mono text-xs" },
                        v,
                      ),
                    ),
                  ),
                )
              : React.createElement(
                  "select",
                  {
                    value: selectedGameVersion,
                    onChange: (e) => setSelectedGameVersion(e.target.value),
                    className:
                      "h-6 rounded border border-border/50 bg-card px-1.5 text-[11px] font-mono text-foreground",
                  },
                  availableVersions.map((v) =>
                    React.createElement("option", { key: v, value: v }, v),
                  ),
                ),
          ),

        isInstalled
          ? React.createElement(
              Button || "button",
              {
                variant: "default",
                size: "sm",
                onClick: () => onSelectAndPlay(proj, dl?.instanceId),
              },
              "Выбрать и играть",
            )
          : isDownloading || isInstalling
            ? React.createElement(
                "div",
                {
                  className:
                    "flex h-8 items-center gap-2 rounded-lg border border-border/50 bg-muted/60 px-3 text-xs text-muted-foreground font-mono",
                },
                React.createElement("div", {
                  className:
                    "h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent",
                }),
                dl.progress + "%",
              )
            : React.createElement(
                Button || "button",
                {
                  variant: "default",
                  size: "sm",
                  onClick: () => onDownload(proj, selectedGameVersion),
                },
                proj.project_type === "modpack"
                  ? `Установить ${selectedGameVersion}`
                  : `Скачать ${selectedGameVersion}`,
              ),
      ),
    ),

    (isDownloading || isInstalling) &&
      React.createElement(
        "div",
        { className: "mt-1 flex flex-col gap-1" },
        React.createElement(
          "div",
          {
            className:
              "flex items-center justify-between text-[11px] font-mono text-muted-foreground",
          },
          React.createElement("span", null, dl.mb),
          React.createElement(
            "span",
            { className: "text-primary font-semibold" },
            dl.progress + "%",
          ),
        ),
        React.createElement(
          "div",
          {
            className: "h-1.5 w-full overflow-hidden rounded-full bg-muted/60",
          },
          React.createElement("div", {
            className:
              "h-full rounded-full bg-primary transition-all duration-200",
            style: { width: `${dl.progress}%` },
          }),
        ),
      ),
  );
}

function ProjectCardSkeleton() {
  return React.createElement(
    "div",
    {
      className:
        "flex flex-col gap-2 rounded-xl border border-border/30 bg-card/40 p-3.5 animate-pulse",
    },
    React.createElement(
      "div",
      { className: "flex items-start justify-between gap-4" },
      React.createElement(
        "div",
        { className: "flex min-w-0 flex-1 items-start gap-3" },
        React.createElement("div", {
          className: "mt-0.5 h-10 w-10 shrink-0 rounded-lg bg-muted/60",
        }),
        React.createElement(
          "div",
          { className: "flex min-w-0 flex-1 flex-col gap-2" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement("div", {
              className: "h-4 w-36 rounded bg-muted/70",
            }),
            React.createElement("div", {
              className: "h-3 w-16 rounded bg-muted/40",
            }),
          ),
          React.createElement("div", {
            className: "h-3 w-full max-w-[340px] rounded bg-muted/50",
          }),
          React.createElement("div", {
            className: "h-3 w-3/4 max-w-[260px] rounded bg-muted/40",
          }),
          React.createElement(
            "div",
            { className: "mt-1 flex items-center gap-1.5" },
            React.createElement("div", {
              className: "h-4 w-12 rounded bg-muted/40",
            }),
            React.createElement("div", {
              className: "h-4 w-14 rounded bg-muted/40",
            }),
            React.createElement("div", {
              className: "h-4 w-10 rounded bg-muted/40",
            }),
          ),
        ),
      ),
      React.createElement(
        "div",
        { className: "flex shrink-0 flex-col items-end gap-2" },
        React.createElement("div", {
          className: "h-5 w-20 rounded bg-muted/40",
        }),
        React.createElement("div", {
          className: "h-8 w-28 rounded-lg bg-muted/60",
        }),
      ),
    ),
  );
}

function ModrinthExplorerModal({ isOpen, onClose, api }) {
  const [query, setQuery] = useState("");
  const [projectType, setProjectType] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloads, setDownloads] = useState({});
  const activeIntervals = useRef({});

  const Obsy = window.Obsy;
  const {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Tabs,
    TabsList,
    TabsTrigger,
  } = Obsy?.ui || {};

  const fetchModrinth = useCallback(async (searchQuery, type) => {
    setLoading(true);
    setError(null);
    try {
      let facets = [];
      if (type && type !== "all") {
        facets.push([`project_type:${type}`]);
      }

      const params = new URLSearchParams({
        query: searchQuery || "",
        limit: "20",
        index: "downloads",
      });

      if (facets.length > 0) {
        params.append("facets", JSON.stringify(facets));
      }

      const res = await fetch(
        `https://api.modrinth.com/v2/search?${params.toString()}`,
      );
      if (!res.ok) {
        throw new Error(
          `Ошибка Modrinth API (${res.status} ${res.statusText})`,
        );
      }
      const data = await res.json();
      setProjects(data.hits || []);
    } catch (err) {
      setError(
        err?.message || "Не удалось загрузить данные с серверов Modrinth",
      );
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        fetchModrinth(query, projectType);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [query, projectType, isOpen, fetchModrinth]);

  useEffect(() => {
    return () => {
      Object.values(activeIntervals.current).forEach(clearInterval);
    };
  }, []);

  const handleStartDownload = async (proj, gameVersion) => {
    const id = proj.project_id;
    const isPack = proj.project_type === "modpack";
    const totalMb = isPack ? 54.2 : 6.4;
    const instanceId = makeInstanceId(
      proj.slug || proj.project_id,
      gameVersion,
    );

    setDownloads((prev) => ({
      ...prev,
      [id]: {
        status: "downloading",
        progress: 10,
        mb: `1.2 / ${totalMb} MB`,
        instanceId,
        gameVersion,
      },
    }));

    let currentProgress = 10;
    const interval = setInterval(async () => {
      currentProgress += Math.floor(Math.random() * 20) + 12;

      if (currentProgress < 100) {
        const downloadedMb = ((currentProgress / 100) * totalMb).toFixed(1);
        setDownloads((prev) => ({
          ...prev,
          [id]: {
            status: "downloading",
            progress: currentProgress,
            mb: `${downloadedMb} / ${totalMb} MB`,
            instanceId,
            gameVersion,
          },
        }));
      } else {
        clearInterval(interval);
        delete activeIntervals.current[id];

        setDownloads((prev) => ({
          ...prev,
          [id]: {
            status: "installing",
            progress: 100,
            mb: `Создание инстанса ${gameVersion} и распаковка файлов...`,
            instanceId,
            gameVersion,
          },
        }));

        try {
          const invoke =
            window.__TAURI_INTERNALS__?.invoke ||
            window.__TAURI__?.core?.invoke;

          if (typeof invoke === "function") {
            await invoke("create_instance", {
              id: instanceId,
              baseVersion: gameVersion,
              files: null,
            });

            const idOrSlug = proj.slug || proj.project_id;
            const res = await fetch(
              `https://api.modrinth.com/v2/project/${idOrSlug}/version?game_versions=%5B%22${gameVersion}%22%5D`,
            );

            if (res.ok) {
              const versionData = await res.json();
              if (versionData && versionData.length > 0) {
                const targetVer = versionData[0];
                const files = targetVer.files || [];
                const primary = files.find((f) => f.primary) || files[0];

                if (primary && primary.url) {
                  const isMrpack =
                    primary.filename?.endsWith(".mrpack") ||
                    proj.project_type === "modpack";

                  if (isMrpack) {
                    await invoke("download_instance_file", {
                      instanceId: instanceId,
                      subpath: "temp_pack.mrpack",
                      url: primary.url,
                    });

                    try {
                      await invoke("extract_instance_zip_folder", {
                        instanceId: instanceId,
                        zipSubpath: "temp_pack.mrpack",
                        folderInZip: "overrides",
                        destSubpath: ".",
                      });
                      await invoke("delete_instance_file", {
                        instanceId: instanceId,
                        subpath: "temp_pack.mrpack",
                      });
                    } catch (e) {
                      console.warn("Override extraction warning:", e);
                    }
                  } else {
                    const subfolder =
                      proj.project_type === "shader"
                        ? "shaderpacks"
                        : proj.project_type === "resourcepack"
                          ? "resourcepacks"
                          : "mods";

                    await invoke("download_instance_file", {
                      instanceId: instanceId,
                      subpath: `${subfolder}/${primary.filename || "file.jar"}`,
                      url: primary.url,
                    });
                  }
                }
              }
            }

            const Obsy = window.Obsy;
            if (Obsy && Obsy.useLauncherStore) {
              await Obsy.useLauncherStore.getState().fetchVersions();
            }
          }

          setDownloads((prev) => ({
            ...prev,
            [id]: {
              status: "installed",
              progress: 100,
              mb: "Готово к запуску",
              instanceId,
              gameVersion,
            },
          }));

          api.ui.showToast(
            `Успешно установлено! Создан инстанс «${instanceId}»`,
            "success",
          );
        } catch (err) {
          api.ui.showToast(`Ошибка установки: ${err?.message || err}`, "error");
          setDownloads((prev) => ({
            ...prev,
            [id]: {
              status: "idle",
              progress: 0,
              mb: "",
            },
          }));
        }
      }
    }, 450);

    activeIntervals.current[id] = interval;
  };

  const handleSelectAndPlay = async (proj, existingInstanceId) => {
    const instanceId =
      existingInstanceId ||
      makeInstanceId(proj.slug || proj.project_id, "1.21.4");

    const Obsy = window.Obsy;
    if (Obsy && Obsy.useLauncherStore) {
      await Obsy.useLauncherStore.getState().fetchVersions();
      await Obsy.useLauncherStore.getState().selectVersion(instanceId);
    }

    api.ui.showToast(
      `Выбран инстанс «${instanceId}». Нажмите «ИГРАТЬ»!`,
      "info",
    );
    onClose();
  };

  if (!isOpen) return null;

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
      { className: "sm:max-w-3xl max-h-[80vh] flex flex-col p-5 gap-3" },
      React.createElement(
        DialogHeader,
        null,
        React.createElement(
          "div",
          { className: "flex items-center justify-between pr-6" },
          React.createElement(
            "div",
            null,
            React.createElement(DialogTitle, null, "Каталог Modrinth"),
            React.createElement(
              "p",
              { className: "text-muted-foreground text-xs mt-0.5" },
              "Сборки, моды, шейдеры и текстуры с автоматической установкой",
            ),
          ),
          React.createElement(
            Tabs,
            {
              value: projectType,
              onValueChange: setProjectType,
            },
            React.createElement(
              TabsList,
              null,
              React.createElement(
                TabsTrigger,
                { value: "all", className: "px-3 py-1 text-xs" },
                "Все",
              ),
              React.createElement(
                TabsTrigger,
                { value: "modpack", className: "px-3 py-1 text-xs" },
                "Сборки",
              ),
              React.createElement(
                TabsTrigger,
                { value: "mod", className: "px-3 py-1 text-xs" },
                "Моды",
              ),
              React.createElement(
                TabsTrigger,
                { value: "shader", className: "px-3 py-1 text-xs" },
                "Шейдеры",
              ),
              React.createElement(
                TabsTrigger,
                { value: "resourcepack", className: "px-3 py-1 text-xs" },
                "Ресурспаки",
              ),
            ),
          ),
        ),
      ),

      React.createElement(
        "div",
        { className: "relative flex items-center gap-3 py-0.5" },
        React.createElement(Input, {
          type: "text",
          placeholder: "Поиск на Modrinth...",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          className: "h-8 text-xs pr-8",
        }),
        loading &&
          React.createElement("div", {
            className:
              "absolute right-2.5 top-2.5 h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent",
          }),
      ),

      React.createElement(
        "div",
        {
          className:
            "flex flex-1 min-h-0 max-h-[380px] flex-col gap-2.5 overflow-y-auto pr-1",
        },
        loading
          ? React.createElement(
              React.Fragment,
              null,
              React.createElement(ProjectCardSkeleton, null),
              React.createElement(ProjectCardSkeleton, null),
              React.createElement(ProjectCardSkeleton, null),
              React.createElement(ProjectCardSkeleton, null),
            )
          : error
            ? React.createElement(
                "div",
                {
                  className:
                    "flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center",
                },
                React.createElement(
                  "div",
                  { className: "text-sm text-destructive font-medium" },
                  error,
                ),
                React.createElement(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => fetchModrinth(query, projectType),
                  },
                  "Повторить попытку",
                ),
              )
            : projects.length === 0
              ? React.createElement(
                  "div",
                  {
                    className:
                      "flex flex-1 flex-col items-center justify-center py-16 text-muted-foreground text-xs",
                  },
                  "Ничего не найдено по запросу.",
                )
              : projects.map((proj) =>
                  React.createElement(ProjectCard, {
                    key: proj.project_id,
                    proj,
                    dl: downloads[proj.project_id],
                    onDownload: handleStartDownload,
                    onSelectAndPlay: handleSelectAndPlay,
                  }),
                ),
      ),
    ),
  );
}

function ModrinthWidget({ api }) {
  const [isOpen, setIsOpen] = useState(false);

  const Obsy = window.Obsy;
  const Button = Obsy?.ui?.Button || Obsy?.Button || "button";

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("obsy:openModrinth", handleOpen);
    return () => {
      window.removeEventListener("obsy:openModrinth", handleOpen);
    };
  }, []);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => setIsOpen(true),
        title: "Modrinth (моды и сборки)",
        className:
          "border-border/40 bg-card/40 hover:border-emerald-500/40 hover:bg-accent/40 flex h-9 cursor-pointer items-center gap-2 px-3 text-xs backdrop-blur-sm transition-all font-semibold",
      },
      React.createElement(
        "svg",
        {
          viewBox: "0 0 24 24",
          width: 15,
          height: 15,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "text-emerald-400 shrink-0",
        },
        React.createElement("path", {
          d: "m7.5 4.27 9 5.15a1.8 1.8 0 0 1 0 3.16l-9 5.15A1.8 1.8 0 0 1 5 16.15V7.85a1.8 1.8 0 0 1 2.5-1.58Z",
        }),
      ),
      "Modrinth",
    ),
    isOpen
      ? React.createElement(ModrinthExplorerModal, {
          isOpen,
          onClose: () => setIsOpen(false),
          api,
        })
      : null,
  );
}

function ModrinthVersionFooter({ api }) {
  const Obsy = window.Obsy;
  const Button = Obsy?.ui?.Button || Obsy?.Button || "button";

  return React.createElement(
    "div",
    { className: "border-border/40 border-t p-1.5" },
    React.createElement(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className:
          "text-muted-foreground hover:text-foreground hover:bg-muted/50 w-full cursor-pointer justify-start gap-2 text-xs font-normal",
        onClick: () => {
          window.dispatchEvent(new CustomEvent("obsy:openModrinth"));
        },
      },
      React.createElement(
        "svg",
        {
          viewBox: "0 0 24 24",
          width: 14,
          height: 14,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "text-emerald-400 shrink-0",
        },
        React.createElement("path", {
          d: "m7.5 4.27 9 5.15a1.8 1.8 0 0 1 0 3.16l-9 5.15A1.8 1.8 0 0 1 5 16.15V7.85a1.8 1.8 0 0 1 2.5-1.58Z",
        }),
      ),
      React.createElement("span", null, "Каталог модов и сборок Modrinth..."),
    ),
  );
}

export default {
  manifest: {
    id: "modrinth-browser",
    name: "Modrinth Explorer",
    version: "2.1.0",
    description:
      "Каталог сборок, модов, шейдеров и текстур с Modrinth с установкой инстансов в один клик.",
    author: "Obsy Team",
    category: "content",
    sizeBytes: 215000,
    permissions: [
      "ui:slots",
      "network:fetch",
      "game:instances",
      "storage:local",
    ],
    tags: ["modrinth", "mods", "modpacks", "shaders", "textures", "instances"],
  },
  activate(api) {
    api.ui.registerSlot(
      "header.actions",
      "modrinth-header-btn",
      ModrinthWidget,
      5,
    );
    api.ui.registerSlot(
      "version.footer",
      "modrinth-version-footer",
      ModrinthVersionFooter,
      1,
    );
    api.logger.info("Modrinth Explorer activated with standard UI components");
  },
  deactivate(api) {
    api.ui.unregisterSlot("modrinth-header-btn");
    api.ui.unregisterSlot("modrinth-version-footer");
  },
};
