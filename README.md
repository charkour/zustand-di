# zustand-di

zustand + react content to init stores

A simplified patch of [`createContext`](https://github.com/pmndrs/zustand/blob/main/src/context.ts) from `zustand/context` that might be deprecated in the future. This patch removes `useStoreApi`.

- This is 610 B compared to the zustand one of 645 B.
- Opinionated: forces use of selector via typescript.

## Installation

```bash
npm install zustand-di
```

## Usage

See zustand [docs](https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md).
