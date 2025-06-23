import { baseApi } from "../../api/baseApi";

const questionApi = baseApi.injectEndpoints({
    endpoints: (builder: any) => ({
        createQuestions: builder.mutation({
            query: (data:any) => ({
                url: `/questions/create-question`,
                method: "POST",
                body: data,
            }),
        }),

        getQuestionsByCategory: builder.query({
            query: (category: string) => ({
                url: `/questions?category=${category}`,
                method: "GET",
            }),
            transformResponse: (response: any) => response?.data,
        }),
    }),
});

export const { useGetQuestionsByCategoryQuery, useCreateQuestionsMutation } = questionApi;
