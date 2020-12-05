import { AnyAction } from "redux";

const initialState = {
    loading: false,
};

export function journal(state = initialState, action: AnyAction) {
    switch (action.type) {
        default:
            return state;
    }
}
