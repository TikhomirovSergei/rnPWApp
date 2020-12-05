import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";
import { AppLoader } from "../components/ui/AppLoader";

import { getUserInfo } from "../redux/actions/userAction";
import { IUserInfo } from "../redux/reducers/userReducer";

import { THEME } from "../theme";
import { nextPath, personPath } from "../path";

export const MainScreen = () => {
    const [recipient, setRecipient] = useState("");
    const [balance, setBalance] = useState(0);

    const user: IUserInfo = useSelector((state) => state.user.user);
    const userLoading: boolean = useSelector((state) => state.user.loading);
    const token: string = useSelector((state) => state.main.token);
    const loading: boolean = useSelector((state) => state.main.loading);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        getUserInfo(token, dispatch);
    }, []);

    const userInfoView = () => (
        <View style={styles.userInfoWrapper}>
            <Image style={styles.image} source={personPath} />
            <View style={styles.userInfoTextWrapper}>
                <Text style={styles.text}>Добро пожаловать</Text>
                <Text style={styles.loginText}>{user.name}</Text>
                <Text style={styles.text}>
                    {`Ваш баланс: `}
                    <Text style={styles.balanceText}>{`${user.balance} PW`}</Text>
                </Text>
            </View>
        </View>
    );

    const buttonView = () => (
        <View style={styles.wrapper}>
            <AppButton onPress={() => console.log("")}>
                <AppButtonLoaderText loading={loading} text="Создать транзакцию" />
            </AppButton>
            <AppButton onPress={() => navigation.navigate("History")}>
                <Text style={{ color: THEME.WHITE_COLOR }}>История транзакций</Text>
            </AppButton>
        </View>
    );

    return (
        <View style={styles.container}>
            {userLoading ? (
                <AppLoader />
            ) : (
                <>
                    {userInfoView()}
                    <View style={styles.wrapper}>
                        <AppButton
                            onPress={() => navigation.navigate("UserList")}
                            externalStyles={styles.recipientExternalBtnView}
                            internalStyles={styles.recipientInternalBtnView}>
                            <View style={styles.recipientView}>
                                <Text>{recipient.length ? recipient : "Получатель не выбран"}</Text>
                                <Image style={styles.recipientViewImage} source={nextPath} />
                            </View>
                        </AppButton>
                        <TextInput
                            value={String(balance)}
                            onChangeText={(value) => setBalance(parseInt(value))}
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Сумма транзакции"
                            maxLength={32}
                        />
                    </View>
                    {buttonView()}
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
