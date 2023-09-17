# zustand-di

use react context to init zustand stores. dependency injection for zustand with react.

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
