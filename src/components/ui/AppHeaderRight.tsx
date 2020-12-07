import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

interface IAppHeaderRightProps {
    name: string;
    balance: number;
}

export const AppHeaderRight = (props: IAppHeaderRightProps) => (
    <View style={styles.center}>
        <Text style={styles.title}>{`${props.name}`}</Text>
        <Text style={styles.title}>{`${props.balance} PW`}</Text>
    </View>
);

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
    },
});
