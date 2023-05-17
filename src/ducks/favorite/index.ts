import { favoriteSlice } from "./slice";

export const favoriteReducer = favoriteSlice.reducer;
export const favoriteReducerPath = favoriteSlice.reducerPath;
export const favoriteMiddleware = favoriteSlice.middleware;

export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
} = favoriteSlice
