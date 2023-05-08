import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { UserDao } from '../../../../server/dao';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'text' },
      },
      authorize: async (credentials) => {
        try {
          const user = await UserDao.findOne({ where: { username: credentials?.username } });

          if (!user) {
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.username,
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
        token.id = user.id;
        token.username = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { username: string }).username = token.username as string;
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
