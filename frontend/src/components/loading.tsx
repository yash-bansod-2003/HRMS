import { Circle } from "lucide-react";
export const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Circle className="h-8 w-8 animate-spin" />
    </div>
  );
}