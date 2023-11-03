import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

export const useUser = () => {
  const [user] = useLocalStorage<string | undefined>("user", undefined);
  return user;
};

export const useSetUser = () => {
  const [, setUser] = useLocalStorage<string | undefined>("user", undefined);
  return setUser;
};

export const useSignin = () => {
  const setUser = useSetUser();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      // fake auth
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username === "admin" && password === "admin") {
        setUser(username);
        return;
      }

      throw new Error("Invalid credentials");
    },
  });
};

export const useSignout = () => {
  const setUser = useSetUser();

  return useMutation({
    mutationFn: async () => {
      // fake auth
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser(undefined);
    },
  });
};
