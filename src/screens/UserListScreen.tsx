import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, Image, RefreshControl } from "react-native";
import { List } from "react-native-paper";

import { AppSnackbar } from "../components/ui/AppSnackbar";

import { clearGetUserListErrorMessage, getUsers } from "../redux/actions/userListAction";
import { IUserListState } from "../redux/reducers/userListReducer";

import { THEME } from "../theme";
import { personPath } from "../path";

export const UserListScreen = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const users: IUserListState = useSelector((state) => state.userList.users);
    const error: string = useSelector((state) => state.userList.error);
    const token: string = useSelector((state) => state.main.token);
    const dispatch = useDispatch();

    const { setRecipient } = route.params;

    useEffect(() => {
        setVisible(!!error.length);
    }, [error]);

    useEffect(() => {
        onRefresh();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getUsers(token, dispatch, () => setRefreshing(false));
    }, []);

    const onPresshandler = (name) => {
        setRecipient(name);
        navigation.goBack();
    };

    const onDismissSnackBar = () => {
        clearGetUserListErrorMessage(dispatch);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl colors={[THEME.DANGER_COLOR]} refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={users.users}
                renderItem={({ item }) => (
                    <List.Item
                        style={styles.item}
                        title={item.name}
                        titleStyle={styles.title}
                        titleEllipsizeMode={"middle"}
                        left={() => <Image style={styles.image} source={personPath} />}
                        onPress={() => onPresshandler(item.name)}
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
