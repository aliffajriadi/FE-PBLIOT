import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, updateUser, deleteUser, getUserById,getCurrentUser  } from "@/lib/api/user";
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
    onSuccess: (data,variables) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["user", variables.id] });
    },
    onError: (error: unknown) => { // <=== TAMBAHKAN PENANGANAN ERROR DI SINI
      if (error instanceof Error) {
        console.error("Update user failed:", error.message);
        alert(error.message);
      } else if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        console.error("Update user failed:", err.response?.data || err);
        alert(err.response?.data?.message || "Gagal memperbarui user");
      } else {
        console.error("Update user failed:", error);
        alert("Gagal memperbarui user");
      }
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

export const useCurrentUser = () => {
   return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(), 
  });
};