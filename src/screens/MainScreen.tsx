import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

import { AppButton } from "../components/ui/AppButton";
import { AppButtonLoaderText } from "../components/ui/AppButtonLoaderText";
import { nextPath, personPath } from "../path";

import { THEME } from "../theme";

export const MainScreen = () => {
    const [username, _] = useState("myLogin");
    const [userBalance, setUserBalance] = useState(500);
    const [user, setUser] = useState("");
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const userInfoView = () => (
        <View style={styles.userInfoWrapper}>
            <Image style={styles.image} source={personPath} />
            <View style={styles.userInfoTextWrapper}>
                <Text style={styles.text}>Добро пожаловать</Text>
                <Text style={styles.loginText}>{username}</Text>
                <Text style={styles.text}>
                    {`Ваш баланс: `}
                    <Text style={styles.balanceText}>{`${userBalance} PW`}</Text>
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
            {userInfoView()}
            <View style={styles.wrapper}>
                <AppButton
                    onPress={() => navigation.navigate("UserList")}
                    externalStyles={styles.recipientExternalBtnView}
                    internalStyles={styles.recipientInternalBtnView}>
                    <View style={styles.recipientView}>
                        <Text>{user.length ? user : "Получатель не выбран"}</Text>
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
