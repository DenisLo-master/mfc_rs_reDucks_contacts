import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { isSuccessResponse, Response } from '../../types/response'
import { IFavorite } from '../../types/favorite'
import { refresh } from '../auth'
import { RootState } from '../store'

const retryWithRefresh = retry(
    async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: 'http://localhost:3142/favorites',
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

export const favoriteSlice = createApi({
    reducerPath: 'favorite',
    baseQuery: retryWithRefresh,
    tagTypes: ['favorites'],
    endpoints: builder => ({
        getFavorites: builder.query<Response<IFavorite[]>, void>({
            query() {
                return {
                    url: '/'
                }
            },
            providesTags: ['favorites']
        }),
        addFavorite: builder.mutation<Response<IFavorite>, IFavorite['contactsId']>({
            query: (contactsId) => ({
                url: '/',
                method: 'POST',
                body: { contactsId }
            }),
            async onQueryStarted(_, api) {
                const { data } = await api.queryFulfilled;
                if (isSuccessResponse(data)) {
                    api.dispatch(
                        favoriteSlice.util.updateQueryData(
                            'getFavorites',
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
        deleteFavorite: builder.mutation<Response<IFavorite[]>, IFavorite['id']>({
            query(favoriteId) {
                return {
                    url: `/${favoriteId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['favorites']
        })
    })
})
