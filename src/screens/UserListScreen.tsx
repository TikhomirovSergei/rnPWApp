import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, Image, RefreshControl } from "react-native";
import { List } from "react-native-paper";

import { AppSnackbar } from "../components/ui/AppSnackbar";
import { AppHeaderRight } from "../components/ui/AppHeaderRight";

import { asyncGetUsers, clearGetUserListErrorMessage } from "../redux/userListSlice";
import { RootState } from "../redux/rootReducer";

import { THEME } from "../theme";
import { personGrayPath } from "../path";

export const UserListScreen = ({ route, navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const user = useSelector((state: RootState) => state.user.user);
    const users = useSelector((state: RootState) => state.userList.users);
    const error = useSelector((state: RootState) => state.userList.error);
    const token = useSelector((state: RootState) => state.main.token);
    const dispatch = useDispatch();

    const { setRecipient } = route.params;

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
        dispatch(asyncGetUsers({ token, cb: () => setRefreshing(false) }));
    }, []);

    const onPresshandler = (name) => {
        setRecipient(name);
        navigation.goBack();
    };

    const onDismissSnackBar = () => {
        dispatch(clearGetUserListErrorMessage());
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
