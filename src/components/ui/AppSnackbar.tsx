import React from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

import { THEME } from "../../theme";

interface IAppSnackbarProps {
    visible: boolean;
    message: string;
    dismiss(): void;
}

export const AppSnackbar = (props: IAppSnackbarProps) => {
    const onDismissSnackBar = () => props.dismiss();

    return (
        <Snackbar
            visible={props.visible}
            style={styles.snackbar}
            onDismiss={onDismissSnackBar}
            theme={{ colors: { accent: "#000000" } }}
            action={{
                label: "Закрыть",
                onPress: () => onDismissSnackBar(),
            }}>
            <Text style={styles.text}>{props.message}</Text>
        </Snackbar>
    );
};

const styles = StyleSheet.create({
    snackbar: {
        backgroundColor: "#ffffff",
        borderColor: THEME.MAIN_COLOR,
        borderWidth: 1,
        tintColor: "red",
    },
    text: {
        color: "red",
    },
});
