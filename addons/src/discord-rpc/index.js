const React = window.React;
const { useState, useEffect } = React;

const DISCORD_CLIENT_ID = "1129482123891724398";
let socket = null;
let reconnectTimer = null;

function sendDiscordActivity(api, inGameVersion = null) {
  const isEnabled = api.storage.get("rpc_enabled", true);
  if (!isEnabled) {
    clearDiscordActivity();
    return;
  }

  const showProfile = api.storage.get("showProfile", true);
  const showVersion = api.storage.get("showVersion", true);
  const customDetails = api.storage.get(
    "customDetails",
    "Играет в Obsy Launcher",
  );

  const profile = api.game.getSelectedProfile();
  const version = api.game.getSelectedVersion();

  let details = customDetails;
  let state = "";

  if (inGameVersion) {
    details = "В игре Minecraft " + inGameVersion;
    if (showProfile && profile) {
      state = "Ник: " + profile.username;
    }
  } else {
    if (showProfile && profile) {
      state = "Профиль: " + profile.username;
    }
    if (showVersion && version) {
      state += (state ? " • " : "") + version.id;
    }
  }

  const payload = {
    cmd: "SET_ACTIVITY",
    args: {
      pid: 1,
      activity: {
        details: details || "Obsy Launcher",
        state: state || "В главном меню",
        timestamps: {
          start: Math.floor(Date.now() / 1000),
        },
        assets: {
          large_image: "obsy_logo",
          large_text: "Obsy Launcher",
        },
      },
    },
    nonce: String(Date.now()),
  };

  if (socket && socket.readyState === WebSocket.OPEN) {
    try {
      socket.send(JSON.stringify(payload));
    } catch {
      // Ignore socket errors
    }
  } else {
    connectToDiscordRpc(() => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
      }
    });
  }
}

function connectToDiscordRpc(onReady) {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  try {
    socket = new WebSocket(
      `ws://127.0.0.1:6463/?v=1&client_id=${DISCORD_CLIENT_ID}`,
    );

    socket.onopen = () => {
      if (onReady) onReady();
    };

    socket.onmessage = (event) => {
      // Heartbeat or event response
    };

    socket.onerror = () => {
      if (socket) socket.close();
    };

    socket.onclose = () => {
      socket = null;
    };
  } catch {
    socket = null;
  }
}

function clearDiscordActivity() {
  if (socket) {
    try {
      socket.close();
    } catch {}
    socket = null;
  }
}

function DiscordRpcWidget({ api }) {
  const [enabled, setEnabled] = useState(() =>
    api.storage.get("rpc_enabled", true),
  );

  useEffect(() => {
    sendDiscordActivity(api);

    const unsub = api.events.on("addon:discord-rpc:configChange", () => {
      sendDiscordActivity(api);
    });

    return () => {
      unsub();
      clearDiscordActivity();
    };
  }, [api]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    api.storage.set("rpc_enabled", next);
    if (next) {
      sendDiscordActivity(api);
      api.ui.showToast("Discord RPC включен", "success");
    } else {
      clearDiscordActivity();
      api.ui.showToast("Discord RPC выключен", "info");
    }
  };

  return React.createElement(
    "button",
    {
      type: "button",
      onClick: toggle,
      title: enabled ? "Discord RPC активен" : "Discord RPC выключен",
      className:
        "relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer " +
        (enabled
          ? "bg-[#5865F2]/15 text-[#5865F2] border border-[#5865F2]/30 hover:bg-[#5865F2]/25"
          : "bg-muted text-muted-foreground border border-border/40 hover:bg-muted/80"),
    },
    React.createElement(
      "span",
      { className: "text-xs" },
      enabled ? "🎮 Discord: On" : "🎮 Discord: Off",
    ),
  );
}

export default {
  manifest: {
    id: "discord-rpc",
    name: "Discord Rich Presence",
    version: "1.2.0",
    description:
      "Отображает статус в Discord: версию Minecraft, выбранный профиль и время игры (100% модульный, без утяжеления лаунчера).",
    author: "Obsy Team",
    category: "integration",
    sizeBytes: 124800,
    permissions: [
      "game:lifecycle",
      "game:profiles",
      "ui:slots",
      "storage:local",
      "network:fetch",
    ],
    tags: ["discord", "rpc", "status", "social"],
  },
  activate(api) {
    api.ui.registerSlot("header.actions", "rpc-btn", DiscordRpcWidget, 10);
    sendDiscordActivity(api);

    api.services.provide("discord-presence", {
      getStatus: () => api.storage.get("rpc_enabled", true),
      setStatusText: (text) => {
        api.storage.set("customDetails", text);
        sendDiscordActivity(api);
      },
    });

    api.game.onBeforeLaunch((ctx) => {
      sendDiscordActivity(api, ctx.versionId);
    });
  },
  deactivate(api) {
    clearDiscordActivity();
    api.ui.unregisterSlot("rpc-btn");
  },
};
