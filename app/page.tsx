import { Landing } from "@/components/landing";

import { serverUser } from "@/lib/serverUser";


export default async function Home() {

  const user = await serverUser()
  return (
   <>
   
    <Landing  user={user}/>
   </>
  );
}
