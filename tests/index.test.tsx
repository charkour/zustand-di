import {
  Component as ClassComponent,
  ReactNode,
  StrictMode,
  useCallback,
  useEffect,
} from "react";
import { render } from "@testing-library/react";
import { afterEach, it, vi } from "vitest";
import { create } from "zustand";
import type { StoreApi } from "zustand";
import { createContext } from "../src";

// from https://github.com/pmndrs/zustand/blob/main/tests/context.test.tsx
const consoleError = console.error;
afterEach(() => {
  console.error = consoleError;
});

type CounterState = {
  count: number;
  inc: () => void;
};

it("creates and uses context store", async () => {
  const { Provider, useStore } = createContext<StoreApi<CounterState>>();

  const createStore = () =>
    create<CounterState>((set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }));

  function Counter() {
    const { count, inc } = useStore((state) => state);
    useEffect(inc, [inc]);
    return <div>count: {count * 1}</div>;
  }

  const { findByText } = render(
    <>
      <Provider createStore={createStore}>
        <Counter />
      </Provider>
    </>
  );

  await findByText("count: 1");
});

it("uses context store with selectors", async () => {
  const { Provider, useStore } = createContext<StoreApi<CounterState>>();

  const createStore = () =>
    create<CounterState>((set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }));

  function Counter() {
    const count = useStore((state) => state.count);
    const inc = useStore((state) => state.inc);
    useEffect(inc, [inc]);
    return <div>count: {count * 1}</div>;
  }

  const { findByText } = render(
    <>
      <Provider createStore={createStore}>
        <Counter />
      </Provider>
    </>
  );

  await findByText("count: 1");
});

it("throws error when not using provider", async () => {
  console.error = vi.fn();

  class ErrorBoundary extends ClassComponent<
    { children?: ReactNode | undefined },
    { hasError: boolean }
  > {
    constructor(props: { children?: ReactNode | undefined }) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
      return { hasError: true };
    }
    render() {
      return this.state.hasError ? <div>errored</div> : this.props.children;
    }
  }

  const { useStore } = createContext<StoreApi<CounterState>>();
  function Component() {
    useStore((state) => state);
    return <div>no error</div>;
  }

  const { findByText } = render(
    <StrictMode>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </StrictMode>
  );
  await findByText("errored");
});

it("useCallback with useStore infers types correctly", async () => {
  const { useStore } = createContext<StoreApi<CounterState>>();
  function _Counter() {
    const _x = useStore(useCallback((state) => state.count, []));
    expectAreTypesEqual<typeof _x, number>().toBe(true);
  }
});

const expectAreTypesEqual = <A, B>() => ({
  toBe: (
    _: (<T>() => T extends B ? 1 : 0) extends <T>() => T extends A ? 1 : 0
      ? true
      : false
  ) => {},
});
