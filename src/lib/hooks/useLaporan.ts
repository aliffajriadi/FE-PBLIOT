import { useQuery } from "@tanstack/react-query";
import * as laporan from "@/lib/api/laporan";

export const useStatistik = () => {
    return useQuery({
        queryKey: ["last-activity"],
        queryFn: laporan.getLastActivity,
        staleTime: 1000 * 60,
    });
};