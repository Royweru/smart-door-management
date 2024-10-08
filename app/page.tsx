import { Landing } from "@/components/landing";
import { UserProfile } from "@/components/user-profile";
import { serverUser } from "@/lib/serverUser";


export default async function Home() {

  const user = await serverUser()
  return (
   <>
   
    <Landing  user={user}/>
   </>
  );
}
