import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { AppNavigation } from "./navigation/AppNavigation";

import reducers from "./redux/reducers/index";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["main"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(logger, thunk));
const persistor = persistStore(store);

export default function App() {
    useEffect(() => LogBox.ignoreLogs(["Remote debugger"]), []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppNavigation />
            </PersistGate>
        </Provider>
    );
}
