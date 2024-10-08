"use client";
import React, {
  useEffect,
  useState,
  useTransition,
  CSSProperties,
} from "react";
import { Card, CardContent } from "./ui/card";
import BeatLoader from "react-spinners/BeatLoader";

import { Logout } from "@/actions/logout";
import { User } from "@prisma/client";
import { newCodeGenerate } from "@/actions/generateVerificationCode";
import { Button } from "./ui/button";
import { Copy, CopyCheck, Loader } from "lucide-react";
import { toast } from "sonner";

export const LandingCard = ({ user }: { user: User | null }) => {
  const [specialCode, setSpecialCode] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const onLogout = () => {
    Logout();
  };

  const onSubmit = async () => {
    startTransition(() => {
      if (!user?.email) return;

      newCodeGenerate(user?.email).then((data) => {
        setSpecialCode(data?.verificationCode);
      });
    });
  };

  const onCopy = async () => {
    setCopied(true);
    navigator.clipboard.writeText(specialCode as string);
    toast.success("Code copied successfully",{
      style:{
        "backgroundColor":"green"
      }
    })
    setCopied(false)
  };

  return (
    <Card>
      <CardContent className=" bg-white rounded-xl shadow-md lg:w-[500px] md:w-[400px] sm:w-[350px] w-full sm:mx-0 mx-4">
        <div className=" w-full p-2 space-y-3">
          <div className=" text-center text-md">
            <h3 className="  font-semibold font-mono text-black text-xl">
              Hey user your special code is being generated
            </h3>
          </div>
          {
            specialCode && !isPending&&(
              <h2 className=" lg:text-xl  md:text-xl text-lg font-semibold text-center tracking-wide text-maroon">
              Your special code is
            </h2>
            )
          }
         
          {isPending && (
            <div className=" w-full flex items-center justify-center">
              <Loader className=" text-maroon animate-spin" />
            </div>
          )}
        {!isPending && specialCode &&(
            <h1 className=" font-bold lg:text-3xl md:text-2xl text-xl text-center font-mono">
            {specialCode}
          </h1>
        )}

          {specialCode && (
            <Button
              className=" w-full justify-center gap-x-2 items-center flex font-semibold text-red"
              variant={"ghost"}
              onClick={onCopy}
            >
              {copied ? (
                <CopyCheck className=" text-black font-semibold" />
              ) : (
                <Copy className=" text-black font-semibold" />
              )}
              Copy code
            </Button>
          )}
          <Button
            variant={"secondary"}
            size={"lg"}
            className=" font-semibold w-full"
            onClick={onSubmit}
          >
            Generate Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
