import { baseApi } from "@/Redux/api/baseApi";

export interface IProject {
    title: string;
    coverImage: string;
    description: string;
    liveLink?: string;
    clientCodeLink?: string;
    serverCodeLink?: string;
    underDevelopment: boolean;
    features: string[];
    usedTechnologies: string[];
    serial: string;
    projectType: string;
}

// Define the response type
interface ApiResponse<T> {
    message: string;
    success: boolean;
    data: T;
    meta: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        perPage: number;
    };
}


const projectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation for adding a product
        addProject: builder.mutation({
            query: (product) => ({
                url: "/projects",
                method: "POST",
                body: product,
            }),
        }),

        // Query for fetching products with filters, sorting, and pagination
        getProjects: builder.query({
            query: () => ({
                url: "/projects",
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<IProject[]>) => response,
        }),

        // Query to get a single product by its ID
        getProjectById: builder.query({
            query: (productId) => ({
                url: `/projects/${productId}`,
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<IProject>) => response.data,
        }),

        // Mutation to update a product by its ID
        updateProject: builder.mutation<ApiResponse<IProject>, { projectId: string, updatedProject: Partial<IProject> }>({
            query: ({ projectId, updatedProject }) => ({
                url: `/products/${projectId}`,
                method: "PATCH",
                body: updatedProject,
            }),
        }),

        // Mutation to delete a product by its ID
        deleteProject: builder.mutation<ApiResponse<null>, string>({
            query: (projectId) => ({
                url: `/projects/${projectId}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useAddProjectMutation,
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsApi;
