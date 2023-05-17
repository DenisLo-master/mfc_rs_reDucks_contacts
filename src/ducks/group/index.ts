import { groupSlice } from "./slice";

export const groupReducer = groupSlice.reducer;
export const groupReducerPath = groupSlice.reducerPath;
export const groupMiddleware = groupSlice.middleware;

export const {
    useGetGroupsQuery,
    useCreateGroupMutation,
    useDeleteGroupMutation,
    useEditGroupMutation,
} = groupSlice
