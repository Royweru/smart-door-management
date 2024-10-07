import db from '@/lib/prisma'

export const getCodeByEmail = async (email:string) => {
     const  token = await db.verificationCode.findFirst({
        where:{
            email
        }
     }) 
    if(!token ) return null
     return token
}
export const getCodeByCode = async (code:string) => {
     const  token = await db.verificationCode.findUnique({
        where:{
            code
        }
     }) 
    if(!token ) return null
     return token
}