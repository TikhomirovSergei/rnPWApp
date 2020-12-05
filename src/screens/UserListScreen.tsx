import React from "react";
import { View, StyleSheet } from "react-native";

import { THEME } from "../theme";

export const UserListScreen = () => {
    return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND_COLOR,
    },
});
