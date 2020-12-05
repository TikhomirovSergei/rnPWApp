import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";

import { THEME } from "../theme";
import { logoPath } from "../path";

export const AuthScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const logo = () => (
        <View style={styles.imageWrapper}>
            <Image style={styles.image} source={logoPath} />
        </View>
    );

    const inputView = () => (
        <View style={styles.inputWrapper}>
            <TextInput
                value={username}
                onChangeText={setUsername}
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

    const buttonView = () => (
        <View style={styles.buttonWrapper}>
            <AppButton disabled={loading} onPress={() => navigation.navigate("Main")}>
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

    return (
        <View style={styles.container}>
            {logo()}
            {inputView()}
            {buttonView()}
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
