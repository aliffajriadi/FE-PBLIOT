import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, updateUser, deleteUser  } from "@/lib/api/user";
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
    onError: (error: any) => {
      console.error("Create user failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Gagal membuat user");
    },
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