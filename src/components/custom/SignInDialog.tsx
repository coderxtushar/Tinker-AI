"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/userDetailsContext";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function SignInDialog({ openDialog, closeDialog }: { openDialog: boolean, closeDialog: (open: boolean) => void }) {
  const { setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo', 
        {
          headers: {
            Authorization: 'Bearer ' + tokenResponse.access_token
          }
        }
      );

      console.log(userInfo);
      // Setting up of Database
      const user = userInfo.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4()
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }

      setUserDetail(user);
      closeDialog(false);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center gap-3 items-center">
                <h2 className="font-bold text-2xl text-center text-white">{Lookup.SIGNIN_HEADING}</h2>
                <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                <Button onClick={() => googleLogin()} className="bg-blue-500 text-white hover:bg-blue-400 mt-3">Sign In with Google</Button>
                <p className="text-xs">{Lookup.SIGNIN_AGREEMENT_TEXT}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignInDialog;

function uuid4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}