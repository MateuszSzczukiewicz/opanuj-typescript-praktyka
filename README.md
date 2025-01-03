# Opanuj TypeScript - Repozytorium dla uczestnika

![](https://opanujtypescript.pl/img/logo-main.jpg)

## Wymagania

- Node.js 20

## Instalacja bibliotek

```bash
npm install
```

## 🚀 Praca z zadaniami

### 📝 Uruchomienie weryfikacji (wybór zadania z listy)

```bash
npm run list <nazwa-modułu>  # core-pro lub react-pro
```

Tryb obserwatora (automatycznie ponawia testy po każdej zmianie w plikach):

```bash
npm run list <nazwa-modułu> -- --watch
```

### 🔍 Uruchomienie weryfikacji po nazwie zadania

```bash
npm run verify <nazwa-zadania> # np. 004-literals-code lub literals-code
```

Tryb obserwatora:

```bash
npm run verify <nazwa-zadania> -- --watch
```

### 🧑🏻‍💻 Uruchamianie środowiska developerskiego dla zadań React Pro

```bash
npm run dev # Uruchamia dashboard z wyborem wszystkich zadań

npm run dev <nazwa-zadania> # Uruchamia konkretne zadanie, np. 211-type-props lub type-props
```

### 📊 Dashboard z podsumowaniem testów

Podgląd wyników testów:

```bash
npm run summary
```

Podgląd szczegółów testów:

```bash
npm run summary:vitest
```
