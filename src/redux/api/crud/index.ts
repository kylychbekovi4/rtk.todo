import { api as index } from "..";
import { CRUD } from "./types";

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTodo: builder.query<CRUD.GetCrudResponse, CRUD.GetCrudRequest>({
			query: () => ({
				url: "",
				method: "GET",
			}),
			providesTags: ["crud"],
		}),

		createTodo: builder.mutation<
			CRUD.CreateCrudResponse,
			CRUD.CreateCrudRequest
		>({
			query: ({ title, img, price }) => ({
				url: "",
				method: "POST",
				body: { title, img, price },
			}),
			invalidatesTags: ["crud"],
		}),

		deleteTodo: builder.mutation<CRUD.DeleteResponse, CRUD.DeleteRequest>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["crud"],
		}),
		patch: builder.mutation({
			query: ({ _id, newData }) => ({
				url: `/${_id}`,
				method: "PATCH",
				body: newData,
			}),
			invalidatesTags: ["crud"],
		}),
		deleteAll: builder.mutation<void, void>({
			query: () => ({
				url: "",
				method: "DELETE",
			}),
			invalidatesTags: ["crud"],
		}),
	}),
});

export const {
	useGetTodoQuery,
	useCreateTodoMutation,
	useDeleteTodoMutation,
	usePatchMutation,
	useDeleteAllMutation,
} = api;
