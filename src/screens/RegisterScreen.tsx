import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TextInput, StyleSheet } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";
import { AppSnackbar } from "../components/ui/AppSnackbar";

import { clearErrorMessage, register, seRegErrorMessage } from "../redux/actions/mainAction";
import { TState } from "../redux/reducers";

import { validateEmail } from "../utils/validateUtils";

import { THEME } from "../theme";

export const ReqisterScreen = ({}) => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    const loading = useSelector((state: TState) => state.main.loading);
    const error = useSelector((state: TState) => state.main.regError);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setVisible(error.length);
    }, [error]);

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
                secureTextEntry={true}
                style={styles.input}
                placeholder="Пароль"
                maxLength={32}
            />
            <TextInput
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={true}
                style={styles.input}
                placeholder="Подтверждение пароля"
                maxLength={32}
            />
        </View>
    );

    const onPressHandler = () => {
        if (!!username && !!email && !!password && !!confirm) {
            if (!validateEmail(email)) {
                seRegErrorMessage("Некорректный email", dispatch);
                return;
            }

            if (password.trim() !== confirm.trim()) {
                seRegErrorMessage("Пароли не совпадают", dispatch);
                return;
            }

            register(username, email, password, dispatch);
        } else {
            seRegErrorMessage("Все поля обязательны для заполнения", dispatch);
        }
    };

    const buttonView = () => (
        <View style={styles.wrapper}>
            <AppButton disabled={loading} onPress={onPressHandler}>
                <AppButtonLoaderText loading={loading} text="Регистрация" />
            </AppButton>
        </View>
    );

    const onDismissSnackBar = () => {
        clearErrorMessage(dispatch);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
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
