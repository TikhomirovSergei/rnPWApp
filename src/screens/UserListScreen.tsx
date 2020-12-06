import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { List } from "react-native-paper";

import { getUserTransactions } from "../redux/actions/userTransactionsAction";
import { IUserTransactions } from "../redux/reducers/userTransactionsReducer";

import { THEME } from "../theme";
import { personPath } from "../path";

export const UserListScreen = ({ route, navigation }) => {
    const users: IUserTransactions = useSelector((state) => state.userTransactions.users);
    const token: string = useSelector((state) => state.main.token);
    const dispatch = useDispatch();

    const { setRecipient } = route.params;

    useEffect(() => {
        getUserTransactions(token, dispatch);
    }, []);

    const onPresshandler = (username) => {
        setRecipient(username);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <List.Item
                        style={styles.item}
                        title={item.username}
                        titleStyle={styles.title}
                        titleEllipsizeMode={"middle"}
                        description={`Баланс: ${item.balance}`}
                        descriptionNumberOfLine={1}
                        left={() => <Image style={styles.image} source={personPath} />}
                        onPress={() => onPresshandler(item.username)}
                    />
                )}
                keyExtractor={(item) => String(item.id)}
            />
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
        fontWeight: "bold",
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderColor: "red",
        borderWidth: 0.3,
        marginHorizontal: 10,
        alignSelf: "center",
    },
});
