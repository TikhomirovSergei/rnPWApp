import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { AppLoader } from "./AppLoader";

import { THEME } from "../../theme";

interface IAppButtonLoaderTextProps {
    loading: boolean;
    text: string;
}

export const AppButtonLoaderText = (props: IAppButtonLoaderTextProps): React.ReactNode => (
    <View style={styles.wrap}>
        {props.loading ? <AppLoader styles={styles.loader} size="small" color={"#ffffff"} /> : null}
        <Text style={styles.text}>{props.text}</Text>
    </View>
);

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        position: "absolute",
        right: 0,
    },
    text: {
        color: THEME.WHITE_COLOR,
    },
});
