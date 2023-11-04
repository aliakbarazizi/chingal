import { createQueryKeys } from "@lukemorales/query-key-factory";
import { api } from "../../api";
import { User } from ".";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const users = createQueryKeys("users", {
  all: {
    queryKey: null,
    queryFn: async () => (await api.get<User[]>("users")).data,
  },
  detail: (userId: string) => ({
    queryKey: [userId],
    queryFn: async () => (await api.get<User>(`users/${userId}`)).data,
  }),
});

export const useUsers = () => useQuery(users.all);

export const useUserDetail = (userId?: string) =>
  useQuery({ ...users.detail(userId || ""), enabled: userId !== undefined });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post<User>("users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(users.all);
    },
  });
};

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.put<User>(`users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(users.all);
      queryClient.invalidateQueries(users.detail(userId));
    },
  });
};

export const useCreateOrUpdate = (userId?: string) => {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser(userId || "");

  return userId ? updateUser : createUser;
};

export const useDeleteUser = (userId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete(`users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(users.all);
      queryClient.removeQueries(users.detail(userId || ""));
    },
  });
};
