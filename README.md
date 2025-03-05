## Старт проекта

```
npm run dev
```
## Запуск тестов

```
npm run test
```

## Технологии

- **TanStack Query** - для удобной работы с запросами, состояниями, ошибками и кешированием. Решил использовать, так как требовалось уменьшить количество шаблонного кода. В маленьком проекте использовать бы не стал.
- **html-react-parser** - для безопасного парсинга текстовых данных с тегами. Не стал переизобретать велосипед и писать собственный код для парсинга.
- **axios** - для работы с API, что немного сократитить код. Скорее всего, это ненужное решение, так как я не задействовал основные возможности (например, `interceptors`).
- **vitest** и **React Testing Library** - для тестирования.
- **MUI** - для упрощения работы с версткой.