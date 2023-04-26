import { useSession } from 'next-auth/react';

type UserType = {
  id: string;
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
      user: { id: '', username: '' },
      status,
    };
  }

  return {
    user: data?.user as UserType,
    status,
  };
}

export default useUser;
