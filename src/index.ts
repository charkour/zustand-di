import {
  createContext as createReactContext,
  useContext,
  useRef,
  createElement,
} from "react";
import { type StoreApi, useStore as useZustandStore } from "zustand";

type ExtractState<Store> = Store extends { getState: () => infer T }
  ? T
  : never;

// Inspired from: https://github.com/pmndrs/zustand/blob/main/src/context.ts
export const createContext = <
  State,
  Store extends StoreApi<State> = StoreApi<State>
>() => {
  const StoreContext = createReactContext<Store | undefined>(undefined);

  const Provider: React.FC<{
    createStore: () => Store;
    children?: React.ReactNode;
  }> = ({ createStore, children }) => {
    const store = useRef(createStore()).current;
    return createElement(StoreContext.Provider, { value: store }, children);
  };

  const useStore = <StateSlice = ExtractState<Store>>(
    selector: (state: ExtractState<Store>) => StateSlice,
    equalityFn?: (left: StateSlice, right: StateSlice) => boolean
  ) => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error(
        "Seems like you have not used zustand provider as an ancestor"
      );
    }
    return useZustandStore(store, selector, equalityFn);
  };

  return {
    Provider,
    useStore,
  };
};
