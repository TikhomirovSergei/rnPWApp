import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, Text, RefreshControl } from "react-native";
import { List } from "react-native-paper";

import { AppSnackbar } from "../components/ui/AppSnackbar";
import { AppHeaderRight } from "../components/ui/AppHeaderRight";

import { clearGetUserTransactionsErrorMessage, getUserTransactions } from "../redux/actions/userTransactionsAction";
import { TState } from "../redux/reducers";

import { THEME } from "../theme";

export const HistoryScreen = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const user = useSelector((state: TState) => state.user.user);
    const history = useSelector((state: TState) => state.userTransactions.history);
    const error = useSelector((state: TState) => state.userTransactions.error);
    const token = useSelector((state: TState) => state.main.token);
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <AppHeaderRight name={user.name} balance={user.balance} />,
        });
    }, [navigation, user]);

    React.useEffect(() => {
        setVisible(!!error.length);
    }, [error]);

    React.useEffect(() => {
        onRefresh();
    }, []);

    const onRefresh = React.useCallback(() => {
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

    const balanceView = (balance: number) => {
        return (
            <View style={styles.date}>
                <Text>Баланс</Text>
                <Text>{balance}</Text>
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
                        title={`${item.username}`}
                        titleStyle={styles.title}
                        titleEllipsizeMode={"middle"}
                        description={`Переведено: ${item.amount} PW`}
                        descriptionNumberOfLines={1}
                        left={() => dateView(item.date)}
                        right={() => balanceView(item.balance)}
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
