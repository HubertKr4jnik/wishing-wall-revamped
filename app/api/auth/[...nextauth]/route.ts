import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";

export const authOptions = {
  providers: [
    SlackProvider({
      clientId: <string>process.env.SLACK_CLIENT_ID,
      clientSecret: <string>process.env.SLACK_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
