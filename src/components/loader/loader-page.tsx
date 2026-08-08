import { Spin } from "@/ui/antd";

export default function LoaderPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <Spin />
    </div>
  );
}
