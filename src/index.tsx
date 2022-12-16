import React, { createContext as createReactContext, useContext, useRef } from 'react';
import { StoreApi, useStore as useZustandStore } from 'zustand';

export const createContext = <State, Store extends StoreApi<State> = StoreApi<State>>() => {
    const StoreContext = createReactContext<Store | null>(null);
    const useStore = <T,>(
        selector: (state: State) => T = (state) => state as unknown as T,
        equalityFn: (left: T, right: T) => boolean = Object.is
    ) => {
        const store = useContext(StoreContext);
        if (!store) {
            throw new Error('useProductListStore must be used within a ProductListProvider');
        }
        return useZustandStore(store, selector, equalityFn);
    };

    const Provider: React.FC<{ createStore: () => Store; children?: React.ReactNode }> = ({
        createStore,
        children,
    }) => {
        const store = useRef(createStore()).current;
        return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
    };
    return {
        Provider,
        useStore,
    };
};
