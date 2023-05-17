import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, isSuccessResponse, Response } from '../../types/response'
import { RootState } from "../store";

export const login = createAsyncThunk(
    'auth/login',
    async (body: { login: string, password: string }) => {
        const data: Response<{ accessToken: string, refreshToken: string }> = await fetch(
            'http://localhost:3142/auth/login',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        ).then(res => res.json())
        return data;
    }
)

export const refresh = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const refresh = state.auth.refreshToken;

        if (!refresh) {
            return { success: false } as ErrorResponse;
        }

        const data: Response<{ accessToken: string, refreshToken: string }> = await fetch(
            'http://localhost:3142/auth/refresh',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ refresh })
            }
        ).then(res => res.json())
        return data;
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const accessToken = state.auth.accessToken;

        if (!accessToken) {
            return false;
        }

        const data: Response = await fetch(
            'http://localhost:3142/auth/check',
            {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json())
        console.log("!!!!!!!", data);
        if (!data.success) {
            const refreshResult = (await thunkApi.dispatch(refresh())) as PayloadAction<Response>;

            if (isSuccessResponse(refreshResult.payload)) {
                return true;
            }
        }

        // return data.success;
        return true
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const accessToken = state.auth.accessToken;

        const data: Response = await fetch(
            'http://localhost:3142/auth/logout',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json())

        return data.success;
    }
)
