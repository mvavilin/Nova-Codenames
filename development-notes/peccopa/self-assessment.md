# 📄 Self-Assessment

> 🔗 **PR с self-assessment:** _[PR #205](https://github.com/mvavilin/Nova-Codenames/pull/205)_

---

## 🧩 1. Personal Features Table

| Category             | Feature                          | Description                                                                           | Score | PR / Code                                                                                                                                                                                      |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **My Components**    | Complex Component: ComponentsAPI | Собственная система UI-компонентов (BaseComponent + менеджеры + фасад)                | +25   | _[PR#58](https://github.com/mvavilin/Nova-Codenames/pull/58)_                                                                                                                                  |
| **My Components**    | Complex Component: StateAPI      | Реализация state-менеджера (Store, Dispatcher, reducer, middleware/afterware)         | +25   | _[PR#79](https://github.com/mvavilin/Nova-Codenames/pull/79)_                                                                                                                                  |
| **My Components**    | Rich UI Screen: Welcome Page     | Главная страница с логикой, состоянием, модалками, i18n                               | +20   | _[PR#115](https://github.com/mvavilin/Nova-Codenames/pull/115)_                                                                                                                                |
| **My Components**    | Rich UI Screen: Profile Page     | Страница профиля с логикой и интеграцией i18n                                         | +20   | _[PR#173](https://github.com/mvavilin/Nova-Codenames/pull/173)_                                                                                                                                |
| **Game**             | Audio API                        | SoundManager для управления звуками                                                   | +5    | _[PR#163](https://github.com/mvavilin/Nova-Codenames/pull/163)_                                                                                                                                |
| **UI & Interaction** | i18n                             | Переключение языка (минимум 2 языка, интеграция в компоненты)                         | +10   | _[PR#104](https://github.com/mvavilin/Nova-Codenames/pull/104)_                                                                                                                                |
| **UI & Interaction** | Theme/UX improvements            | Обновление стилей модалок, UI-улучшения                                               | +10   | _[PR#196](https://github.com/mvavilin/Nova-Codenames/pull/196)_                                                                                                                                |
| **UI & Interaction** | Responsive                       | Адаптивность компонентов                                                              | +5    | _[PR#115](https://github.com/mvavilin/Nova-Codenames/pull/115)_                                                                                                                                |
| **Quality**          | Unit Tests (Basic)               | Покрытие тестами компонентов и менеджеров                                             | +10   | _[PR#125](https://github.com/mvavilin/Nova-Codenames/pull/125)_                                                                                                                                |
| **Quality**          | Unit Tests (Full)                | Расширенное покрытие (50%+)                                                           | +10   | _[PR#188](https://github.com/mvavilin/Nova-Codenames/pull/188)_                                                                                                                                |
| **Architecture**     | State Manager                    | Собственный StateAPI                                                                  | +10   | _[PR#79](https://github.com/mvavilin/Nova-Codenames/pull/58)_                                                                                                                                  |
| **Architecture**     | Design Patterns                  | Facade, Manager pattern, Observer                                                     | +10   | _[PR#58](https://github.com/mvavilin/Nova-Codenames/pull/58)_                                                                                                                                  |
| **Architecture**     | API Layer                        | Изоляция работы с API                                                                 | +10   | _[PR#58](https://github.com/mvavilin/Nova-Codenames/pull/58)_                                                                                                                                  |
| **Frameworks**       | Vanilla TS (custom architecture) | Собственная архитектура без фреймворков                                               | +5    | _[PR#58](https://github.com/mvavilin/Nova-Codenames/pull/58)_, _[PR#79](https://github.com/mvavilin/Nova-Codenames/pull/79)_                                                                   |
| **DevOps & Role**    | Architect                        | Проектирование ComponentsAPI и StateAPI                                               | +10   | _[PR#58](https://github.com/mvavilin/Nova-Codenames/pull/58)_, _[PR#79](https://github.com/mvavilin/Nova-Codenames/pull/79)_                                                                   |
| **DevOps & Role**    | Project Workflow Setup           | Шаблоны для создания issues по конкретным типам                                       | +5    | _[PR #34](https://github.com/mvavilin/Nova-Codenames/pull/34)_                                                                                                                                 |
| **DevOps & Role**    | Code Quality Automation          | Husky (pre-commit, pre-push), запуск тестов и проверок, добавлен validate-branch-name | +5    | _[PR #39](https://github.com/mvavilin/Nova-Codenames/pull/39)_, _[PR #40](https://github.com/mvavilin/Nova-Codenames/pull/40)_, _[PR #71](https://github.com/mvavilin/Nova-Codenames/pull/71)_ |

### 💯 Total: **~195 баллов (cap: 250)**

---

## 🛠 2. Description of My Work

### 📌 Общий вклад

В проекте я выступал как **Frontend-разработчик**, но по факту взял на себя часть **архитектуры приложения**.

Моя работа сфокусирована на:

- разработке **собственной компонентной системы**
- создании **state-менеджера**
- построении **UI-экранов и пользовательского взаимодействия**
- внедрении **i18n, тестов и инструментов разработки**

---

### 🧱 Основные достижения

#### 1. ComponentsAPI (с нуля)

Я разработал собственную систему компонентов:

- `BaseComponent` как основа
- декомпозиция на менеджеры:
  - ElementManager
  - VisibilityManager
  - HierarchyManager
- фасад для управления компонентом

📌 Что важно:

- отказ от монолитного класса → переход к **разделению ответственности**
- возможность масштабирования и переиспользования
- построение **иерархии компонентов**

---

#### 2. StateAPI (аналог Redux)

Реализовал собственный state-менеджер:

- Store
- Dispatcher
- reducer
- middleware + afterware

📌 Особенности:

- реактивная модель
- подписки и обновления
- универсальное решение для проекта

👉 Это была одна из самых сложных задач:

- работа с типами в TypeScript
- синхронизация с UI
- архитектурные решения

---

#### 3. UI и страницы

Реализовал:

- **Welcome Page**
  - логика состояния
  - модальные окна (Game Rules, About Us)
  - интеграция i18n
- **Profile Page**
  - переходы
  - локализация
  - структура UI

Дополнительно:

- переработал модальные окна → сделал их **переиспользуемыми**
- обновил стили (переход на светлую тему)

---

#### 4. i18n (локализация)

Реализовал:

- переключение языков
- интеграцию в компоненты
- поддержку на уровне страниц

---

#### 5. Тестирование

- написал тесты для:
  - компонентов
  - менеджеров
- достиг покрытия **>50% личного кода**

📌 Основная сложность:

- тестирование компонентов с иерархией
- мокирование зависимостей

---

#### 6. SoundManager

- реализовал управление звуками
- централизованная работа с аудио

---

#### 7. Инструменты и процессы

- Husky (проверки перед коммитом)
- правила именования веток
- шаблоны issue
- активное участие в code review

---

## 🔥 3. My 2 Key Feature Components

### 🥇 1. ComponentsAPI

**Почему это важно:**

- фундамент всего UI
- полностью написано мной
- сложная архитектура

**Что буду показывать:**

- создание компонента
- работа менеджеров
- иерархия компонентов
- пример использования

---

### 🥈 2. StateAPI

**Почему это важно:**

- управление состоянием всего приложения
- аналог Redux, реализованный вручную
- сложная логика и архитектура

**Что буду показывать:**

- Store / Dispatcher
- reducer
- подписки
- интеграция с UI

---

## ⚡ 4. Challenges & Learnings

### 💥 Основные сложности

- Декомпозиция BaseComponent (сломал всё → починил всё)
- Реализация StateAPI (особенно типы)
- Тестирование сложных структур
- Конфликты архитектурных решений в команде

---

### 🧠 Что я вынес

- Архитектура важнее скорости разработки
- Свой state-менеджер — это сложно 😄
- Тесты нужно писать сразу, а не потом
- Code review — критически важная часть разработки

---

## 🚀 5. What I’m Proud Of

- Собственная компонентная система
- Рабочий state-менеджер
- Чистая архитектура
- Большой объём написанного кода
- Покрытие тестами

---

## 📌 6. Notes for Reviewers

Во время демонстрации я покажу:

- 2 ключевые фичи (ComponentsAPI + StateAPI)
- работу UI (Welcome / Profile)
- edge cases (state, ошибки, взаимодействие)

Готов ответить на вопросы по:

- архитектуре
- trade-offs (почему не Redux / React)
- реализации компонентов и состояния

---

## 💬 (Опционально)

> Моя сильная сторона — проектирование и реализация архитектуры с нуля (ComponentsAPI и StateAPI). На презентации стоит обратить внимание на внутреннее устройство этих решений и их интеграцию в приложение. Больше всего горжусь тем, что смог реализовать собственный state-менеджер и компонентную систему. Основные сложности были связаны с декомпозицией архитектуры, типизацией в TypeScript и тестированием сложных взаимосвязанных компонентов.
