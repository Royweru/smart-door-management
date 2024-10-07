import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "./schemas";
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "./data/getUser";
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashedPassword) return null;
      
          const confirmPwd = await bcrypt.compare(password,user.hashedPassword)

          if(confirmPwd){
            return user
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig;
