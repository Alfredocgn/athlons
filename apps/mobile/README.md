# @athlons/mobile

App mobile de Athlons — Expo Router + React Native.

## Requisitos

- Node >= 20
- pnpm (instalado desde la raíz del monorepo)
- Expo CLI (`npx expo`)

## Desarrollo

Desde la raíz del monorepo:

```bash
pnpm install
cd apps/mobile
pnpm start
```

O directamente:

```bash
pnpm start          # Expo dev server
pnpm android        # Android emulator
pnpm ios            # iOS simulator
```

## Stack

- **Expo SDK 54** + Expo Router (file-based routing)
- **Apollo Client** + GraphQL
- **React Navigation** (bottom tabs)
- **React Native Maps** + expo-location
