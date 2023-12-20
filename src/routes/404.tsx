import NightscoutIcon from "@/components/NightscoutIcon";
import { useRouteError } from "react-router-dom";

export function NotFoundPage() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 py-12">
      <h1 className="flex flex-row items-center justify-center gap-1 ">
        <span className="text-9xl">4</span>
        <NightscoutIcon width="128" height="128"/>
        <span className="text-9xl">4</span>
      </h1>
      <h2 className="text-3xl uppercase">page unavailable</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
