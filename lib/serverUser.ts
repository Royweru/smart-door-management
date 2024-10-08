import { auth } from "@/auth"
import db from '@/lib/prisma'

export const serverUser  = async () => {
    try {
        const session = await auth()
        const user = await db.user.findUnique({
            where:{
                id:session?.user.id
            }
        })
        return user
    } catch (error) {
       console.error(error)
       return null 
    }
    
}