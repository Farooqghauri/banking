/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { signInProps } from "@/types";

export const signIn = async ({email , password} : signInProps) => {
   
    try {
        
      const { account } = await createAdminClient();
      const response = await account.createEmailPasswordSession(email,password);
      return parseStringify(response);
    } catch (error) {
        console.log('Error signing in:', error);
    }

}


export const signUp = async (userData: SignUpParams) => {

    const { email , password , firstName , lastName } = userData;
   
    try {
        const { account } = await createAdminClient();

  const newuserAccount = await account.create(
    ID.unique(), 
    email, 
    password, 
    `${firstName} ${lastName}`);
  const session = await account.createEmailPasswordSession(email, password);

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  return parseStringify(newuserAccount);

    } catch (error) {
        console.log('Error signing up:', error);
    }

}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }
  
export const logoutAccount = async () => {

  try{

    const {account} = await createSessionClient();

     (await cookies()).delete("appwrite-session");
     await account.deleteSession("current");

  } catch (error) {
    return null;
  }

}