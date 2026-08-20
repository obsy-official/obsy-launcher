# 🧩 Obsy Launcher Addons Guide (Руководство по созданию аддонов)

_(🇷🇺 Русская версия руководства ниже)_

Obsy Launcher features a modular Addon Engine that allows developers to extend the launcher with custom widgets, themes, integrations (e.g. Discord RPC, Server Monitors), and tools without modifying the core launcher codebase.

---

## 🏗 Addon Structure

An addon is distributed as a `.zip` archive containing at least `addon.json` and `index.js`:

```text
my-addon.zip
├── addon.json     # Manifest with metadata, permissions, and config schema
├── index.js       # Compiled ESM bundle exporting the addon lifecycle hooks
└── style.css      # (Optional) Injected CSS styles
```

### Manifest Example (`addon.json`)

```json
{
  "id": "my-cool-addon",
  "name": "My Cool Addon",
  "version": "1.0.0",
  "description": "Adds a custom widget and launch sound to the launcher.",
  "author": "YourName",
  "category": "customization",
  "permissions": ["ui:slots", "storage:local"],
  "tags": ["widget", "customization"],
  "configSchema": {
    "showWidget": {
      "type": "boolean",
      "label": "Enable Widget",
      "description": "Show the widget on the main launcher screen",
      "default": true
    }
  }
}
```

### Lifecycle & API (`src/index.js` or `src/index.tsx`)

```javascript
export function activate(context) {
  console.log("Addon activated with context:", context);

  // 1. Register a UI slot component (React component or DOM renderer)
  context.ui.registerSlot("main:hero:widget", () => {
    return React.createElement(
      "div",
      { className: "p-3 rounded-lg bg-card/60 border border-border text-xs" },
      "Hello from My Addon!",
    );
  });

  // 2. Subscribe to game launch events (requires "game:lifecycle" permission)
  if (context.game) {
    context.game.onBeforeLaunch(async (profile) => {
      console.log(`Starting Minecraft profile: ${profile.name}`);
    });
  }
}

export function deactivate() {
  console.log("Addon deactivated. Cleaning up resources...");
}

export function onConfigChange(newConfig) {
  console.log("Addon configuration updated:", newConfig);
}
```

---

## 🚀 How to Publish & Share Community Addons

### Option 1: Direct Sharing (No approval needed)

1. Build your addon into a `.zip` file.
2. Publish it on GitHub Releases, your Discord, or website.
3. Users can install it directly in Obsy Launcher by clicking **"Install from URL"** or **"Install .zip"**.

### Option 2: Add to Official Store (Pull Request)

1. Fork the `obsy-launcher` repository.
2. Add your addon source code to `addons/src/<your-addon-id>/` (or host it in your own repo).
3. Add your addon manifest entry to [`addons/catalog.json`](./catalog.json).
4. Submit a Pull Request. Once approved and merged, your addon will automatically appear in the launcher Store for all users!

---

---

# 🇷🇺 Руководство по разработке аддонов для Obsy Launcher

Obsy Launcher оснащен модульным движком аддонов, который позволяет разработчикам создавать кастомные виджеты, темы оформления, интеграции (Discord RPC, мониторинг серверов, браузер модов) и хуки запуска без изменения исходного кода лаунчера.

---

## 🏗 Структура аддона

Аддон распространяется в виде `.zip` архива, содержащего `addon.json` и точку входа `index.js`:

```text
my-addon.zip
├── addon.json     # Манифест: ID, версия, запрашиваемые права и схема настроек
├── index.js       # Скомпилированный JavaScript модуль с хуками жизненного цикла
└── style.css      # (Опционально) CSS-стили, автоматически внедряемые в интерфейс
```

### 1. Манифест (`addon.json`)

```json
{
  "id": "my-cool-addon",
  "name": "Мой крутой аддон",
  "version": "1.0.0",
  "description": "Добавляет полезный виджет на главный экран лаунчера.",
  "author": "ВашНик",
  "category": "customization",
  "permissions": ["ui:slots", "storage:local"],
  "tags": ["widget", "customization"],
  "configSchema": {
    "showWidget": {
      "type": "boolean",
      "label": "Показывать виджет",
      "description": "Отображать виджет на главном экране",
      "default": true
    },
    "customText": {
      "type": "string",
      "label": "Текст виджета",
      "placeholder": "Введите текст...",
      "default": "Привет, мир!"
    }
  }
}
```

### 2. Права доступа (`permissions`)

Лаунчер изолирует возможности аддонов. Указывайте только те права, которые действительно нужны вашему модулю:

- `ui:slots` — встраивание компонентов в слоты интерфейса лаунчера.
- `game:lifecycle` — перехват параметров запуска Minecraft (JVM-аргументы, хуки до и после старта).
- `game:profiles` — доступ к имени выбранного профиля и версии игры.
- `network:fetch` — выполнение сетевых запросов к внешним API.
- `storage:local` — сохранение данных и настроек на диск.
- `fs:instances` — доступ к папкам установленных версий и скриншотам.

### 3. Логика аддона (`src/index.js` или `src/index.tsx`)

```javascript
export function activate(context) {
  console.log("Аддон активирован!");

  // Регистрация компонента в интерфейсе
  context.ui.registerSlot("main:hero:widget", (props) => {
    return React.createElement(
      "div",
      {
        className:
          "rounded-xl border border-primary/20 bg-primary/10 p-3 text-xs",
      },
      `Пользовательский виджет! Настройка: ${context.config.customText || ""}`,
    );
  });
}

export function deactivate() {
  console.log("Аддон отключен, очищаем ресурсы...");
}

export function onConfigChange(newConfig) {
  console.log("Настройки изменены пользователем:", newConfig);
}
```

---

## 🛠 Разработка и локальное тестирование

1. **Создайте папку аддона** в [`addons/src/<id-вашего-аддона>/`](./src).
2. **Соберите архивы:**
   ```bash
   bun run build:addons
   ```
   Скрипт автоматически соберет ESM-бандл и упакует архив в `addons/dist/<id>.zip`.
3. **Проверьте в лаунчере:**
   - Откройте окно «Аддоны» в запущенном лаунчере.
   - Нажмите **«Установить .zip»** и выберите собранный архив из `addons/dist/`.
   - Аддон запустится сразу без перезагрузки приложения!

---

## 🌐 Публикация аддонов

### Способ 1: Прямая ссылка (для собственных релизов)

- Загрузите собранный `.zip` в Releases своего GitHub-репозитория или поделитесь им в Discord.
- Пользователи смогут установить ваш аддон в один клик через кнопку **«По ссылке»** в лаунчере.

### Способ 2: Публикация в официальный каталог Obsy Store

1. Сделайте Fork репозитория [obsy-launcher](https://github.com/obsy-official/obsy-launcher).
2. Добавьте запись о вашем аддоне в [`addons/catalog.json`](./catalog.json) (с ссылкой на ваш `.zip` или с исходниками в `addons/src/`).
3. Отправьте Pull Request.
4. После проверки и слияния PR ваш аддон **автоматически появится в общем каталоге у всех пользователей лаунчера**!
