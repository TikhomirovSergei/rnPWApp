import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TextInput, StyleSheet, Image, Text } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";
import { AppSnackbar } from "../components/ui/AppSnackbar";

import { asyncAuth, clearErrorMessage, setErrorMessage, startLoading } from "../redux/mainSlice";
import { RootState } from "../redux/rootReducer";

import { validateEmail } from "../utils/validateUtils";

import { THEME } from "../theme";
import { logoPath } from "../path";

export const AuthScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    const loading = useSelector((state: RootState) => state.main.loading);
    const error = useSelector((state: RootState) => state.main.authError);
    const dispatch = useDispatch();

    React.useEffect(() => {
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
                secureTextEntry={true}
                style={styles.input}
                placeholder="Пароль"
                maxLength={32}
            />
        </View>
    );

    const onPressHandler = () => {
        if (!!email && !!password) {
            if (!validateEmail(email)) {
                dispatch(setErrorMessage("Некорректный email"));
                return;
            }

            dispatch(startLoading());
            dispatch(asyncAuth({ email, password }));
        } else {
            dispatch(setErrorMessage("Все поля обязательны для заполнения"));
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
        dispatch(clearErrorMessage());
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
