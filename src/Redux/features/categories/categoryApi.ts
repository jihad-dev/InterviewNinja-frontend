import { baseApi } from "../../api/baseApi";

const questionApi = baseApi.injectEndpoints({
    endpoints: (builder: any) => ({
        createQuestions: builder.mutation({
            query: (data: any) => ({
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
        getAllQuestions: builder.query({
            query: ({ page = 1, search = "" }) =>
                `/questions/all-questions?page=${page}&limit=10&search=${search}`,
        }),
    }),
});

export const { useGetQuestionsByCategoryQuery, useCreateQuestionsMutation, useGetAllQuestionsQuery } = questionApi;
