import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    SlackProvider({
      clientId: <string>process.env.SLACK_CLIENT_ID,
      clientSecret: <string>process.env.SLACK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.slackId =
          (profile as any)["https://slack.com/user_id"] ||
          profile.sub ||
          account.providerAccountId ||
          account.userId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).slackId = token.slackId;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
