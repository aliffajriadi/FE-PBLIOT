import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, updateUser, deleteUser, getUserById  } from "@/lib/api/user";
import { CreateUserPayload } from "@/types/user";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    
  });
};

export const useCreateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => {
      console.log("sending data:", data);
      return createUser(data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Create user failed:", error.message);
        alert(error.message);
      } else if (typeof error === "object" && error !== null && "response" in error) {
        // jika error dari axios
        const err = error as { response?: { data?: { message?: string } } };
        console.error("Create user failed:", err.response?.data || err);
        alert(err.response?.data?.message || "Gagal membuat user");
      } else {
        console.error("Create user failed:", error);
        alert("Gagal membuat user");
      }
    }

  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateUserPayload>;
    }) => updateUser(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUserById = (id: number) => {

   return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id), // Atau pakai endpoint khusus getUserById
    enabled: !!id, // hanya fetch kalau id ada
  });
};