import React from "react";
import Store from "../stores/Store";

export const StoreContext = React.createContext<Store | null>(null)

const useStore = () => {
    const store = React.useContext(StoreContext);
    if (!store) throw new Error("Some problems happened");
    return store;
}

export default useStore;