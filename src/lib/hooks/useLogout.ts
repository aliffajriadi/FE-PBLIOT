import { useMutation } from "@tanstack/react-query";
import { LogoutRequest } from "../api/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: LogoutRequest,
    onSuccess: () => {
      toast.success("Logout berhasil!");
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error("Logout gagal");
    },
  });
};
