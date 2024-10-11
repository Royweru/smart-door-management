"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent } from "./ui/card";

import { User } from "@prisma/client";
import { newCodeGenerate, CodeType } from "@/actions/generateVerificationCode";
import { Button } from "./ui/button";
import { Copy, CopyCheck, Loader } from "lucide-react";
import { toast } from "sonner";

export const LandingCard = ({ user }: { user: User | null }) => {
  const [specialCode, setSpecialCode] = useState<string | undefined>("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time left for expiry in seconds

  // Function to calculate time left for expiry
  const calculateTimeLeft = () => {
    if (expiryDate) {
      const now = new Date().getTime();
      const expiryTime = new Date(expiryDate).getTime();
      return Math.max(Math.floor((expiryTime - now) / 1000), 0); // Return time in seconds
    }
    return 0;
  };

  // Update time left every second if there is an expiry date
  useEffect(() => {
    if (expiryDate) {
      const intervalId = setInterval(() => {
        const time = calculateTimeLeft();
        setTimeLeft(time);
        if (time === 0) {
          clearInterval(intervalId); // Stop when expired
        }
      }, 1000);
      return () => clearInterval(intervalId); // Clean up on unmount
    }
  }, [expiryDate]);

  const onSubmit = async () => {
    startTransition(() => {
      if (!user?.email) return;

      newCodeGenerate(user?.email).then((data: CodeType) => {
        if (data) {
          setSpecialCode(data.verificationCode);
          setExpiryDate(new Date(data.expiry)); // Set expiry date from the response
          toast.success("Code generated and expires in 5 minutes");
        }
      });
    });
  };

  const onCopy = async () => {
    setCopied(true);
    navigator.clipboard.writeText(specialCode as string);
    toast.success("Code copied successfully", {
      style: {
        backgroundColor: "green",
      },
    });
    setCopied(false);
  };

  return (
    <Card>
      <CardContent className="bg-white rounded-xl shadow-md lg:w-[500px] md:w-[400px] sm:w-[350px] w-full sm:mx-0 mx-4">
        <div className="w-full p-2 space-y-3">
          <div className="text-center text-md">
            {!specialCode && !isPending && (
              <h3 className="font-semibold  tracking-wide text-purple-800 text-xl">
                Hey {user?.name}, click on the generate button to get your
                special code
              </h3>
            )}
          </div>
          {specialCode && !isPending && (
            <h2 className="lg:text-xl md:text-xl text-lg font-semibold text-center tracking-wide text-maroon">
              Your special code is
            </h2>
          )}

          {isPending && (
            <div className="w-full flex items-center justify-center">
              <Loader className="text-maroon animate-spin" />
            </div>
          )}

          {!isPending && specialCode && (
            <h1 className="font-bold lg:text-3xl md:text-2xl text-xl text-center font-mono">
              {specialCode}
            </h1>
          )}

          {specialCode && (
            <Button
              className="w-full justify-center gap-x-2 items-center flex font-semibold text-red"
              variant={"ghost"}
              onClick={onCopy}
            >
              {copied ? (
                <CopyCheck className="text-black font-semibold" />
              ) : (
                <Copy className="text-black font-semibold" />
              )}
              Copy code
            </Button>
          )}

          <Button
            variant={"secondary"}
            size={"lg"}
            className="font-semibold w-full"
            onClick={onSubmit}
            disabled={timeLeft > 0} // Disable the button if timeLeft is greater than 0
          >
            {timeLeft > 0
              ? `Generate Code (Available in ${Math.floor(timeLeft / 60)}m ${
                  timeLeft % 60
                }s)`
              : "Generate Code"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
