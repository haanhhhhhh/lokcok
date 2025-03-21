import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null;
      isAdmin?: boolean;
      avatar?: string;
    } & DefaultSession['user'];
  }

  export interface User extends DefaultUser {
    _id?: string;
    isAdmin?: boolean;
    avatar?: string;
  }
}
