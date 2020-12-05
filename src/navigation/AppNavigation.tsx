import { createStackNavigator, HeaderStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useSelector } from "react-redux";

import { AuthScreen } from "../screens/AuthScreen";
import { ReqisterScreen } from "../screens/RegisterScreen";
import { MainScreen } from "../screens/MainScreen";
import { UserListScreen } from "../screens/UserListScreen";
import { HistoryScreen } from "../screens/HistoryScreen";

const Stack = createStackNavigator();

const NavStack = () => {
    const isLoggedIn: boolean = useSelector((state) => state.main.isLoggedIn);

    return isLoggedIn ? (
        <Stack.Navigator
            initialRouteName="Main"
            headerMode={"screen"}
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                gestureEnabled: true,
            }}>
            <Stack.Screen name="Main" component={MainScreen} options={{ title: "Главная" }} />
            <Stack.Screen name="UserList" component={UserListScreen} options={{ title: "Получатели" }} />
            <Stack.Screen name="History" component={HistoryScreen} options={{ title: "История транзакций" }} />
        </Stack.Navigator>
    ) : (
        <Stack.Navigator
            initialRouteName="Auth"
            headerMode={"screen"}
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                gestureEnabled: true,
            }}>
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false, title: "Авторизация" }} />
            <Stack.Screen name="Register" component={ReqisterScreen} options={{ title: "Регистрация" }} />
        </Stack.Navigator>
    );
};

export const AppNavigation = () => (
    <NavigationContainer>
        <NavStack />
    </NavigationContainer>
);
