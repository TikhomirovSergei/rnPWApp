import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, Image, RefreshControl } from "react-native";
import { List } from "react-native-paper";

import { AppSnackbar } from "../components/ui/AppSnackbar";
import { AppHeaderRight } from "../components/ui/AppHeaderRight";

import { clearGetUserListErrorMessage, getUsers } from "../redux/actions/userListAction";
import { IUserListState } from "../redux/reducers/userListReducer";
import { IUserInfo } from "../redux/reducers/userReducer";

import { THEME } from "../theme";
import { personGrayPath } from "../path";

export const UserListScreen = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const user: IUserInfo = useSelector((state) => state.user.user);
    const users: IUserListState = useSelector((state) => state.userList.users);
    const error: string = useSelector((state) => state.userList.error);
    const token: string = useSelector((state) => state.main.token);
    const dispatch = useDispatch();

    const { setRecipient } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <AppHeaderRight name={user.name} balance={user.balance} />,
        });
    }, [navigation, user]);

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
                data={users}
                renderItem={({ item }) => (
                    <List.Item
                        style={styles.item}
                        title={item.name}
                        titleStyle={styles.title}
                        titleEllipsizeMode={"middle"}
                        left={() => <Image style={styles.image} source={personGrayPath} />}
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
        marginHorizontal: 10,
        alignSelf: "center",
    },
});
