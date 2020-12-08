import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

import { AppNavigation } from "./navigation/AppNavigation";
import store from "./redux/store";

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(["Remote debugger", "Non-serializable values were found in the navigation state"]);
    }, []);

    return (
        <Provider store={store}>
            <PaperProvider children={<AppNavigation />} />
        </Provider>
    );
}
