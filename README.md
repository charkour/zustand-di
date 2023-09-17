# zustand-di

use react context to init zustand stores. dependency injection for zustand with react.

A simplified patch of [`createContext`](https://github.com/pmndrs/zustand/blob/main/src/context.ts) from `zustand/context` that might be deprecated in the future. This patch removes `useStoreApi`.

- This is 633 B compared to the zustand one of 831 B.
- Opinionated: forces use of selector via typescript.

## Installation

```bash
npm install zustand zustand-di
```

## Usage

See zustand [docs](https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md).
