import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TextInput, StyleSheet, Image, Text } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";
import { AppSnackbar } from "../components/ui/AppSnackbar";

import { auth, clearErrorMessage, setErrorMessage } from "../redux/actions/mainAction";

import { THEME } from "../theme";
import { logoPath } from "../path";

export const AuthScreen = () => {
    const [email, setEmail] = useState(/*"123456@gmail.com"*/ "");
    const [password, setPassword] = useState(/*"qwerty"*/ "");
    const [visible, setVisible] = useState(false);

    const loading: boolean = useSelector((state) => state.main.loading);
    const error: string = useSelector((state) => state.main.authError);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        setVisible(!!error.length);
    }, [error]);

    const logo = () => (
        <View style={styles.imageWrapper}>
            <Image style={styles.image} source={logoPath} />
        </View>
    );

    const inputView = () => (
        <View style={styles.inputWrapper}>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Имя пользователя"
                maxLength={32}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Пароль"
                maxLength={32}
            />
        </View>
    );

    const onPressHandler = () => {
        if (!!email && !!password) {
            auth(email, password, dispatch);
        } else {
            setErrorMessage("Все поля обязательны для заполнения", dispatch);
        }
    };

    const buttonView = () => (
        <View style={styles.buttonWrapper}>
            <AppButton disabled={loading} onPress={onPressHandler}>
                <AppButtonLoaderText loading={loading} text="Вход" />
            </AppButton>
            <AppButton
                disabled={loading}
                internalStyles={styles.button}
                onPress={() => navigation.navigate("Register")}>
                <Text style={styles.buttonText}>Регистрация</Text>
            </AppButton>
        </View>
    );

    const onDismissSnackBar = () => {
        clearErrorMessage(dispatch);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            {logo()}
            {inputView()}
            {buttonView()}
            <AppSnackbar visible={visible} message={error} dismiss={onDismissSnackBar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND_COLOR,
    },
    imageWrapper: {
        width: "100%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
    inputWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        padding: 10,
        marginVertical: 8,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "80%",
    },
    buttonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    button: {
        backgroundColor: THEME.LIGHTGRAY_COLOR,
    },
    buttonText: {
        color: THEME.WHITE_COLOR,
    },
});
