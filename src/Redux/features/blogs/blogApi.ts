import { baseApi } from "@/Redux/api/baseApi";
import { IBlog } from "@/types";

// Define the response type
interface ApiResponse<T> {
    message: string;
    statusCode: number;
    success: boolean;
    data: T;
}

const blogsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation for adding a blog
        addBlog: builder.mutation({
            query: (blog) => ({
                url: "/blogs",
                method: "POST",
                body: blog,
            }),
        }),

        // Query to get all blogs
        getBlog: builder.query<IBlog[], void>({
            query: () => ({
                url: "/blogs",
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<IBlog[]>) => response.data,
        }),

        // Query to get a single blog by its ID
        getBlogById: builder.query<IBlog, string>({
            query: (blogId) => ({
                url: `/blogs/${blogId}`,
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<IBlog>) => response.data,
        }),

        // Query to get blogs by user ID
        getBlogByUserId: builder.query<IBlog[], string>({
            query: (userId) => ({
                url: `/blogs/user/${userId}`,
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<IBlog[]>) => response.data,
        }),

        // Mutation to update a blog
        updateBlog: builder.mutation<ApiResponse<IBlog>, { blogId: string, updatedProject: Partial<IBlog> }>({
            query: ({ blogId, updatedProject }) => ({
                url: `/blogs/${blogId}`,
                method: "PATCH",
                body: updatedProject,
            }),
        }),

        // Mutation to delete a blog
        deleteBlog: builder.mutation<ApiResponse<null>, string>({
            query: (blogId) => ({
                url: `/blogs/${blogId}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useAddBlogMutation,
    useGetBlogQuery,
    useGetBlogByIdQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useGetBlogByUserIdQuery,
} = blogsApi;
