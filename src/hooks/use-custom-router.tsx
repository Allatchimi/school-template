"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useCallback, useEffect } from "react";

export function useCustomRouter(): ReturnType<typeof useRouter> {
  const router = useRouter();
  const loader = useTopLoader();

  const originalPush = router.push;

  router.push = (
    ...args: Parameters<typeof router.push>
  ): ReturnType<typeof originalPush> => {
    loader.start();
    return originalPush(...args);
  };

  // add this to a top level component
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLoaderDone = useCallback(() => {
    loader.done();
  }, [loader]);

  useEffect(() => {
    setLoaderDone();
  }, [pathname, searchParams, setLoaderDone]);
  return router;
}
