"use server"
import { getCodeByEmail } from "@/data/getVerficationCode";
import db from "@/lib/prisma";

const generateCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
  return code;
};

export const newCodeGenerate = async (email: string) => {
  try {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const exisitingCode = await getCodeByEmail(email);

    if (exisitingCode) {
      await db.verificationCode.delete({
        where: {
          id: exisitingCode.id,
        },
      });
    }

   const code =  await db.verificationCode.create({
      data: {
        email,
        code: generateCode(),
        expires,
      },
    });

    return {
      verificationCode:code.code,
      expiry:code.expires
    }
  } catch (error) {
    console.error(error);
    return null
  }
};
