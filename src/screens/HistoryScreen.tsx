import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, Text, RefreshControl } from "react-native";
import { List } from "react-native-paper";

import { AppSnackbar } from "../components/ui/AppSnackbar";

import { clearGetUserTransactionsErrorMessage, getUserTransactions } from "../redux/actions/userTransactionsAction";
import { IUserTransactions } from "../redux/reducers/userTransactionsReducer";

import { THEME } from "../theme";

export const HistoryScreen = () => {
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const history: IUserTransactions[] = useSelector((state) => state.userTransactions.history);
    const error: string = useSelector((state) => state.userTransactions.error);
    const token: string = useSelector((state) => state.main.token);
    const dispatch = useDispatch();

    useEffect(() => {
        setVisible(!!error.length);
    }, [error]);

    useEffect(() => {
        onRefresh();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getUserTransactions(token, dispatch, () => setRefreshing(false));
    }, []);

    const addZero = (num: number): string => {
        return num < 10 ? "0" + num : "" + num;
    };

    const dateView = (date: string) => {
        const d = new Date(date);
        const title = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
        const description = addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds());
        return (
            <View style={styles.date}>
                <Text>{title}</Text>
                <Text>{description}</Text>
            </View>
        );
    };

    const onDismissSnackBar = () => {
        clearGetUserTransactionsErrorMessage(dispatch);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl colors={[THEME.DANGER_COLOR]} refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={history}
                renderItem={({ item }) => (
                    <List.Item
                        style={styles.item}
                        title={`Кому: ${item.username}`}
                        titleStyle={styles.title}
                        titleEllipsizeMode={"middle"}
                        description={`Переведено: ${item.amount} PW`}
                        descriptionNumberOfLine={1}
                        left={() => dateView(item.date)}
                    />
                )}
                keyExtractor={(item) => String(item.id)}
            />
            <AppSnackbar visible={visible} message={error} dismiss={onDismissSnackBar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND_COLOR,
    },
    item: {
        borderBottomColor: THEME.LIGHTGRAY_COLOR,
        borderBottomWidth: 0.5,
    },
    title: {
        fontSize: 18,
    },
    date: {
        justifyContent: "center",
        alignItems: "center",
    },
});
