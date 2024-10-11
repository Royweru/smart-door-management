"use server"
import { SignupSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/prisma";
import { getUserByEmail } from "@/data/getUser";
export const Register = async (vals: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(vals);

  if (!validatedFields.success) return { error: "Problem validating fields" };

  const { name, email, password } = validatedFields.data;

  const exisistingUser = await getUserByEmail(email)

  if(exisistingUser) return {error:"User with such an email already exists in our database! try a different email"}

  const hashedPwd = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      hashedPassword: hashedPwd,
    },
  });

  return {success:`${name} has been successfully registered`}
};
