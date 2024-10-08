import { User } from "@prisma/client";
import { Button } from "./ui/button";
import { LandingCard } from "./landing-card";
import { MarketingCard } from "./marketing-card";
import { UserProfile } from "./user-profile";

export const Landing = ({ user }: { user: User | null }) => {
  return (
    <div
      className=' min-h-screen bg-[url("/hero.jpeg")] bg-contain 
    bg-center lg:p-24 md:p-16 sm:p-8 p-6 flex flex-col justify-center items-center w-full gap-y-3'
    >
      {!user ? (
        <MarketingCard />
      ) : (
        <>
          <UserProfile user={user} />
          <LandingCard  user={user}/>
        </>
      )}
    </div>
  );
};
