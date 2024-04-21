import Image from "next/image";
import {Code} from "lucide-react";
import {Dashboard} from "@/app/dashboard/page";
import {Lessons} from "@/components/lessons";

export default function Home() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
