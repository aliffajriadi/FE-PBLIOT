import * as classApi from "@/lib/api/ClassApi";
import { useQuery } from "@tanstack/react-query";

export const useAbsensiClassDetail = (id: number) => {
    return useQuery({
        queryKey: ["classes", id],
        queryFn: () => classApi.getDetailClassAbsensi(id),
        staleTime: 1000 * 60,
    });
};