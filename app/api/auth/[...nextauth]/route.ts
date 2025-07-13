import NextAuth from "next-auth";
import SlakcProvider from "next-auth/providers/slack";

export const authOptions = {
    providers: [
        SlakcProvider({
            clientId: <string>process.env.SLACK_CLIENT_ID,
            clientSecret: <string>process.env.SLACK_CLIENT_SECRET
        })
    ]
}

const handler =  NextAuth(authOptions)

export {handler as GET, handler as POST}