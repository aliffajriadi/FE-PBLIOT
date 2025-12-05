import { api } from "../axios";
import { StatistikDashboard } from "@/types/StatistikDashboard";

export const getStatistik = async (): Promise<StatistikDashboard[]> => {
    const res = await api.get("/absensi/total", { withCredentials: true });
    return res.data.data;
};
