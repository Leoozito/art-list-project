"use server";
import { cookies } from 'next/headers'

export async function setToken(token: string) {
  cookies().set("token", token);
}

export async function getDataCookie(data:any) {
  const dataCookie = cookies().get(data);
  return dataCookie?.value
}

export async function getToken() {
  const token = cookies().get("token");
  return token?.value;
}

export async function deleteToken() {
  const token = cookies().delete("token");
}