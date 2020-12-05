import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";

import { THEME } from "../theme";

export const ReqisterScreen = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const inputView = () => (
        <View style={styles.wrapper}>
            <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholder="Имя пользователя"
                maxLength={32}
            />
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email" maxLength={32} />
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Пароль"
                maxLength={32}
            />
            <TextInput
                value={confirm}
                onChangeText={setConfirm}
                style={styles.input}
                placeholder="Подтверждение пароля"
                maxLength={32}
            />
        </View>
    );

    const buttonView = () => (
        <View style={styles.wrapper}>
            <AppButton onPress={() => console.log("")}>
                <AppButtonLoaderText loading={loading} text="Регистрация" />
            </AppButton>
        </View>
    );

    return (
        <View style={styles.container}>
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
    wrapper: {
        alignItems: "center",
    },
    input: {
        padding: 10,
        marginVertical: 8,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "90%",
    },
});
