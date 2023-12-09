import {
  createElement,
  createContext as reactCreateContext,
  useContext,
  useRef,
} from "react";
import type { StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

type ExtractState<Store> = Store extends { getState: () => infer T }
  ? T
  : never;

// Inspired from: https://github.com/pmndrs/zustand/blob/main/src/context.ts
export const createContext = <
  State,
  Store extends StoreApi<State> = StoreApi<State>
>() => {
  const StoreContext = reactCreateContext<Store | undefined>(undefined);

  const Provider = ({
    createStore,
    children,
  }: {
    createStore: () => Store;
    children: React.ReactNode;
  }) => {
    const storeRef = useRef<Store>(createStore());
    return createElement(
      StoreContext.Provider,
      { value: storeRef.current, children },
    );
  };

  const useStore = <StateSlice = ExtractState<Store>>(
    selector: (state: ExtractState<Store>) => StateSlice,
    equalityFn?: (left: StateSlice, right: StateSlice) => boolean
  ) => {
    const store = useContext(StoreContext);
    if (store) {
      return useStoreWithEqualityFn(store, selector, equalityFn);
    }

    throw new Error(
      "Seems like you have not used zustand provider as an ancestor."
    );
  };

  return {
    Provider,
    useStore,
  };
};
