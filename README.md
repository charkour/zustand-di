# zustand-di

use react context to init zustand stores. dependency injection for zustand with react.


[![Build Size](https://img.shields.io/bundlephobia/minzip/zustand-di?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=zustand-di)
[![Version](https://img.shields.io/npm/v/zustand-di?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand-di)
[![Downloads](https://img.shields.io/npm/dt/zustand-di?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand-di)

A simplified patch of [`createContext`](https://github.com/pmndrs/zustand/blob/main/src/context.ts) from `zustand/context` that might be deprecated in the future. This patch removes `useStoreApi`.

- This is 633 B compared to the zustand one of 831 B.
- Opinionated: forces use of selector via typescript.

## Installation

```bash
npm install zustand zustand-di
```

### Peer Dependencies

For `zustand-di@0.0.7` and higher

```json
{
  "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
  "zustand": "^4.1.0"
}
```

For `zustand-di@0.0.6` and below

```json
{
  "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
  "zustand": "^4.0.0"
}
```

## Usage

See zustand [docs](https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md).
