# zustand-di

dependency injection for [zustand](https://github.com/pmndrs/zustand) with [react context](https://react.dev/learn/passing-data-deeply-with-context). initialize zustand stores with props.

[![Build Size](https://img.shields.io/bundlephobia/minzip/zustand-di?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=zustand-di)
[![Version](https://img.shields.io/npm/v/zustand-di?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand-di)
[![Downloads](https://img.shields.io/npm/dt/zustand-di?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand-di)

## Installation

```bash
npm install react zustand zustand-di
```

> Note: `zustand-di` requires `react` and `zustand` as peer dependencies.
> For `zustand@4.1.0` and higher, you need `zustand-di@0.0.7` or higher.
> For `zustand@~4.0.0`, you need `zustand-di@0.0.6` or lower.

## Usage

```tsx
import { create } from "zustand";
import { createContext } from "zustand-di";

// 0. (TypeScript Only) Define a store
type CounterState = {
  count: number;
  inc: () => void;
};

// 1. Create the context
const [Provider, useStore] = createContext<CounterState>();

// 2. Create the store
const createStore = (initialState: { count: number }) =>
  create<CounterState>((set) => ({
    count: initialState.count,
    inc: () => set((state) => ({ count: state.count + 1 })),
  }));

// 3. Use the store in a child component
function Counter() {
  const { count, inc } = useStore((state) => state);
  return (
    <>
      <button onClick={inc}>increment</button>
      <div>count: {count}</div>
    <>
  );
}

// 4. Use the store in the app and pass in the store creator
const myInitialState = { count: 5 };

function App() {
  return (
    <Provider createStore={() => createStore(myInitialState)}>
      <Counter />
    </Provider>
  );
}
```

## Motivation

This package was originally inspired by [`createContext`](https://github.com/pmndrs/zustand/blob/main/src/context.ts) from `zustand/context` that was deprecated in v4. This package is a simplified version of that implementation:

- Removes `useStoreApi` and forces the use of a selector.
- Uses modern typescript features to simplify the code and reduce bundle size.
- Returns an array of the Provider and `useStore` hook to reduce bundle size and improve DX.

For a detailed explanation, check out TkDoDo's [blog post](https://tkdodo.eu/blog/zustand-and-react-context).

### Why is Dependency Injection useful within React?

- You can pass in props to the store creator.
  - This is useful for testing and [initializing the store with props](https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md).
  - You can also use this to create multiple instances of the same store with different props.

## API

### `createContext`

This is the only export from the package. It creates a context and returns a Provider and `useStore` hook.

```ts
interface State {
  count: number;
}

const [Provider, useStore] = createContext<State>();
```

#### `Provider`

The `Provider` component is used to wrap the application and initialize the store.

```tsx
<Provider createStore={createStore}>
  <App />
</Provider>
```

If you have default props, you can pass them to the `Provider` component.

```tsx
<Provider createStore={() => createStore(myInitialState)}>
  <MyComponent />
</Provider>
```

#### `useStore`

The `useStore` hook is used to access the store in a child component. Be sure that the child component is wrapped in the `Provider` component.

```tsx
function MyComponent = () => {
  const storeState = useStore((state) => state);
  return <div>{storeState.count}</div>;
};
```
