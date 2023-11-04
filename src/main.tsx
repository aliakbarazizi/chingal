import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import {
  QueryClientProvider,
  QueryClient,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      toast.error("خطا در اتصال به سرور", {
        position: "bottom-center",
        theme: "dark",
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: () => {
      toast.error("خطا در اتصال به سرور", {
        position: "bottom-center",
        theme: "dark",
      });
      console.log("error");
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);
