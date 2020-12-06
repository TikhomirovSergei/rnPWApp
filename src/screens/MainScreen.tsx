import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";
import { AppLoader } from "../components/ui/AppLoader";
import { AppSnackbar } from "../components/ui/AppSnackbar";

import {
    clearUserErrorMessage,
    createTransaction,
    getUserInfo,
    setUserErrorMessage,
} from "../redux/actions/userAction";
import { IUserInfo } from "../redux/reducers/userReducer";

import { THEME } from "../theme";
import { nextPath, personPath } from "../path";

export const MainScreen = ({ navigation }) => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [visible, setVisible] = useState(false);

    const user: IUserInfo = useSelector((state) => state.user.user);
    const userLoading: boolean = useSelector((state) => state.user.loading);
    const transactionLoading: boolean = useSelector((state) => state.user.transactionLoading);
    const error: string = useSelector((state) => state.user.error);
    const token: string = useSelector((state) => state.main.token);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserInfo(token, dispatch);
    }, []);

    useEffect(() => {
        setVisible(!!error.length);
    }, [error]);

    const userInfoView = () => (
        <View style={styles.userInfoWrapper}>
            <Image style={styles.image} source={personPath} />
            <View style={styles.userInfoTextWrapper}>
                <Text style={styles.text}>Добро пожаловать</Text>
                <Text numberOfLines={1} ellipsizeMode="middle" style={styles.loginText}>
                    {user.name}
                </Text>
                <Text style={styles.text}>
                    {`Ваш баланс: `}
                    <Text style={styles.balanceText}>{`${user.balance} PW`}</Text>
                </Text>
            </View>
        </View>
    );

    const createTransactionHandler = () => {
        if (recipient.trim().length === 0) {
            setUserErrorMessage("Пользователь не выбран", dispatch);
            return;
        }

        if (amount === "" || parseInt(amount) === NaN || parseInt(amount) < 0) {
            setUserErrorMessage("Сумма транзакции должна быть положительным целым числом", dispatch);
            return;
        }

        if (user.balance < parseInt(amount)) {
            setUserErrorMessage("Недостаточно средств для перевода", dispatch);
            return;
        }

        createTransaction(token, recipient, parseInt(amount), dispatch);
    };

    const buttonView = () => (
        <View style={styles.wrapper}>
            <AppButton disabled={transactionLoading} onPress={createTransactionHandler}>
                <AppButtonLoaderText loading={transactionLoading} text="Создать транзакцию" />
            </AppButton>
            <AppButton disabled={transactionLoading} onPress={() => navigation.navigate("History")}>
                <Text style={{ color: THEME.WHITE_COLOR }}>История транзакций</Text>
            </AppButton>
        </View>
    );

    const onDismissSnackBar = () => {
        clearUserErrorMessage(dispatch);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            {userLoading ? (
                <AppLoader />
            ) : (
                <>
                    {userInfoView()}
                    <View style={styles.wrapper}>
                        <AppButton
                            disabled={transactionLoading}
                            onPress={() => navigation.navigate("UserList", { setRecipient })}
                            externalStyles={styles.recipientExternalBtnView}
                            internalStyles={styles.recipientInternalBtnView}>
                            <View style={styles.recipientView}>
                                <Text numberOfLines={1} ellipsizeMode="middle">
                                    {recipient.length ? recipient : "Получатель не выбран"}
                                </Text>
                                <Image style={styles.recipientViewImage} source={nextPath} />
                            </View>
                        </AppButton>
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Сумма транзакции"
                            maxLength={10}
                        />
                    </View>
                    {buttonView()}
                    <AppSnackbar visible={visible} message={error} dismiss={onDismissSnackBar} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND_COLOR,
    },
    userInfoWrapper: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: "hidden",
        borderColor: "red",
        borderWidth: 0.3,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    userInfoTextWrapper: {
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    loginText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    balanceText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    text: {
        fontSize: 14,
    },
    wrapper: {
        alignItems: "center",
    },
    recipientExternalBtnView: {
        width: "90%",
    },
    recipientInternalBtnView: {
        backgroundColor: THEME.BACKGROUND_COLOR,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        borderRadius: 0,
        justifyContent: "flex-start",
    },
    recipientView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginHorizontal: -5,
    },
    recipientViewImage: {
        width: 20,
        height: 20,
        marginRight: -20,
        tintColor: THEME.MAIN_COLOR,
    },
    input: {
        padding: 10,
        marginVertical: 8,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "90%",
    },
});
