import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetRepositoriesType, GitHubRepository, PaginationParams } from './types';

const githubApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    getRepositories: builder.query<GetRepositoriesType, PaginationParams & { query: string }>({
      query: ({ page, perPage, query }) =>
        `search/repositories?q=${query}&page=${page}&per_page=${perPage}`,
    }),
    getRepositoryById: builder.query<GitHubRepository, { id: string }>({
      query: ({ id }) =>
        `/repositories/${id}`,
    }),
  }),
});

export const { 
  useGetRepositoriesQuery,
  useGetRepositoryByIdQuery
 } = githubApi;


export default githubApi;