import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { UserDao } from '../../../../server/dao';
import type { UserType } from '@/hooks/useUser';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'text' },
      },
      // @ts-ignore
      // authorize 要求的返回值是
      // id: string
      // name?: string | null
      // email?: string | null
      // image?: string | null
      // 强制将返回值转换为 UserType 类型
      authorize: async (credentials) => {
        try {
          const user = await UserDao.findOne({ where: { username: credentials?.username } });

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            username: user.username,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = (user as unknown as UserType).id;
        token.username = (user as unknown as UserType).username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        (session.user as UserType).id = token.id as number;
        (session.user as UserType).username = token.username as string;

        delete session.user.name;
        delete session.user.email;
        delete session.user.image;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    signOut: undefined,
    error: undefined,
    verifyRequest: undefined,
    newUser: undefined,
  },
};

export default NextAuth(authOptions);
