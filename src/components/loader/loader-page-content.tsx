import { Spin } from "@/ui/antd";

export default function LoaderPageContent() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <Spin />
    </div>
  );
}
