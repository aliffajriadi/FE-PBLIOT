import { CheckCircle, Hourglass, XCircle, Ban, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let colorClass = "";
  let icon = null;
  let text = status;

  switch (status) {
    case "Hadir":
      colorClass = "bg-green-100 text-green-700";
      icon = <CheckCircle className="w-4 h-4" />;
      break;
    case "Terlambat":
      colorClass = "bg-yellow-100 text-yellow-700";
      icon = <Hourglass className="w-4 h-4" />;
      break;
    case "Tidak Masuk":
      colorClass = "bg-red-100 text-red-700";
      icon = <XCircle className="w-4 h-4" />;
      text = "Tidak Hadir";
      break;
    case "Izin":
      colorClass = "bg-blue-100 text-blue-700";
      icon = <Ban className="w-4 h-4" />;
      break;
    case "Sakit":
      colorClass = "bg-orange-100 text-orange-700";
      icon = <Ban className="w-4 h-4" />;
      break;
    default:
      colorClass = "bg-gray-100 text-gray-700";
      icon = <Clock className="w-4 h-4" />;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {icon}
      {text}
    </span>
  );
}
