import React from "react";
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

import { THEME } from "../../theme";

interface IAppButtonProps {
    disabled?: boolean;
    externalStyles?: StyleProp<ViewStyle>;
    internalStyles?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    onPress(): void;
}

export const AppButton = (props: IAppButtonProps): React.ReactNode => (
    <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled ?? false}
        activeOpacity={0.7}
        style={{ ...styles.wrap, ...props.externalStyles }}>
        <View style={{ ...styles.button, ...props.internalStyles }}>{props.children}</View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    wrap: {
        width: "80%",
        paddingVertical: 8,
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.MAIN_COLOR,
    },
});
