import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

type UseRouterQueryHookType = [string | undefined, Dispatch<SetStateAction<string | undefined>>];

function useRouterQuery(): UseRouterQueryHookType {
  const [chatId, setChatId] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    setChatId((router.query as { chatId?: string }).chatId);
  }, [router.query]);

  return [chatId, setChatId];
}

export default useRouterQuery;
