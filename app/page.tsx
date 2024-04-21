import Image from "next/image";
import {Code} from "lucide-react";
import {CodeWindow} from "@/components/code-window";
import {Dashboard} from "@/components/dashboard";
import {Lessons} from "@/components/lessons";

export default function Home() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
