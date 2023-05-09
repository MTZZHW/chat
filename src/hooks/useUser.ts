import { useSession } from 'next-auth/react';

export type UserType = {
  id: number;
  username: string;
};

type UseUserHookType = {
  user: UserType;
  status: 'authenticated' | 'loading';
};

function useUser(): UseUserHookType {
  const { data, status } = useSession({ required: true });

  if (status === 'loading') {
    return {
      user: { id: 0, username: '' },
      status,
    };
  }

  return {
    user: data?.user as UserType,
    status,
  };
}

export default useUser;
