import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Notification } from "./interface";
import data from "./data.json";
import { useQuery } from "@tanstack/react-query";

export const notifications = createQueryKeys("notifications", {
  all: {
    queryKey: null,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return data as Notification[];
    },
  },
});

export const useNotifications = () => useQuery(notifications.all);
