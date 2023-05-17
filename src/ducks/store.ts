import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from "./auth";
import { favoriteMiddleware, favoriteReducer, favoriteReducerPath } from "./favorite";
import { groupMiddleware, groupReducer, groupReducerPath } from "./group";
// import { todoMiddleware, todoReducer, todoReducerPath } from "./todo";

const rootReducer = combineReducers({
    auth: authReducer,
    [favoriteReducerPath]: favoriteReducer,
    [groupReducerPath]: groupReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([
            favoriteMiddleware,
            groupMiddleware
        ])
    },
})

export type RootState = ReturnType<typeof rootReducer>;
