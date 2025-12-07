"use client";

import GreetingCard from "./GreetingCard";
import RealTimeMonitor from "./RealTimeMonitor";
import TeachingSchedule from "./TeachingSchedule";
import StudentTable from "./StudentTable";
import { useState } from "react";

export default function DashboardGuru() {
  const [selectedClass, setSelectedClass] = useState("Kelas XII A");

  return (
    <div className="space-y-8 p-0 md:p-1">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800">
        Dashboard Guru
      </h1>

      <GreetingCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <RealTimeMonitor
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
          />
        </div>

        <div>
          <TeachingSchedule />
        </div>
      </div>
      <StudentTable selectedClass={selectedClass} />
    </div>
  );
}
