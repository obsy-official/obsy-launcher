# Contributing to Obsy Launcher (Участие в разработке)

_(🇷🇺 Русская версия ниже)_

First off, thank you for considering contributing to Obsy Launcher! It's people like you that make open source such a great community.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check if there's already an issue for it. If not, open a new issue using our provided templates!

## Setting up your environment

1. Fork the repo and create your branch from `main`.
2. Run `npm install` in the repository root.
3. Make your changes in the `src/` (frontend) or `src-tauri/` (backend) directories.

## Code Style

This project uses `prettier` for code formatting.

Before submitting a pull request, please make sure your code is formatted correctly by running:

```bash
npm run format
```

This will format both your TypeScript/JavaScript files and Rust files (via `cargo fmt`).

---

# 🇷🇺 Участие в разработке Obsy Launcher

Прежде всего, спасибо, что решили внести свой вклад в Obsy Launcher! Именно благодаря таким людям Open Source сообщество развивается.

## С чего начать?

Если вы нашли баг или хотите предложить новую фичу, проверьте вкладку Issues — возможно, кто-то уже написал об этом. Если нет, смело создавайте новый Issue, используя наши шаблоны!

## Настройка окружения

1. Сделайте форк репозитория и создайте ветку от `main`.
2. Запустите `npm install` в корневой папке.
3. Вносите свои изменения в `src/` (фронтенд) или `src-tauri/` (бэкенд).

## Стиль кода

Этот проект использует `prettier` для форматирования кода.

Перед тем как отправить Pull Request, убедитесь, что ваш код отформатирован правильно. Для этого запустите:

```bash
npm run format
```

Эта команда отформатирует ваши TypeScript/JavaScript файлы, а также код на Rust (с помощью `cargo fmt`).
