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

export const useUserDetail = (userId: string) => useQuery(users.detail(userId));

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Omit<User, "id">) => {
      const { data } = await api.post<User>("users", user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(users.all);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const { data } = await api.put<User>(`users/${user.id}`, user);
      return data;
    },
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries(users.all);
      queryClient.invalidateQueries(users.detail(variables.id));
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await api.delete(`users/${userId}`);
    },
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries(users.all);
      queryClient.removeQueries(users.detail(variables));
    },
  });
};
