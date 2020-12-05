import React from "react"
import { StyleSheet, View, ActivityIndicator, StyleProp, ViewStyle } from "react-native"

import { THEME } from "../../theme"

interface IAppLoaderProps {
    styles?: StyleProp<ViewStyle>;
    size?: "small" | "large";
    color?: string;
}

export const AppLoader = (props: IAppLoaderProps) => (
    <View style={props.styles ?? styles.center}>
        <ActivityIndicator
            size={props.size ?? "large"}
            color={props.color ?? THEME.DANGER_COLOR} />
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})