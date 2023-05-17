import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { isSuccessResponse, Response } from '../../types/response'
import { IGroup } from '../../types/group'
import { refresh } from '../auth'
import { RootState } from '../store'

const retryWithRefresh = retry(
    async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: 'http://localhost:3142/groups',
            prepareHeaders(headers, api) {
                const state = api.getState() as RootState;
                headers.append('authorization', `Bearer ${state.auth.accessToken}`)
            },
        })(args, api, extraOptions)

        if (result.error?.status === 403) {
            await api.dispatch(refresh())
        }

        return result;
    },
    { maxRetries: 1 }
)

export const groupSlice = createApi({
    reducerPath: 'group',
    baseQuery: retryWithRefresh,
    tagTypes: ['groups'],
    endpoints: builder => ({
        getGroups: builder.query<Response<IGroup[]>, void>({
            query() {
                return {
                    url: '/'
                }
            },
            providesTags: ['groups']
        }),
        createGroup: builder.mutation<Response<IGroup>, IGroup>({
            query: (group) => ({
                url: '/',
                method: 'POST',
                body: { group }
            }),
            async onQueryStarted(_, api) {
                const { data } = await api.queryFulfilled;

                if (isSuccessResponse(data)) {
                    api.dispatch(
                        groupSlice.util.updateQueryData(
                            'getGroups',
                            undefined,
                            (draft) => {
                                if (draft.success) {
                                    draft.data.push(
                                        data.data
                                    )
                                }
                            }
                        )
                    )
                }
            }
        }),
        editGroup: builder.mutation<Response<IGroup>, IGroup>({
            query(group) {
                return {
                    url: `/${group.id}`,
                    method: 'PATCH',
                    body: group
                }
            },
            invalidatesTags: ['groups']
        }),
        deleteGroup: builder.mutation<Response<IGroup[]>, IGroup['id']>({
            query(groupId) {
                return {
                    url: `/${groupId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['groups']
        })
    })
})
