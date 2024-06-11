"use server";
import { cookies } from 'next/headers'

export async function setDataCookie(descriptionData:string ,data: any) {
  cookies().set(descriptionData, data);
}

export async function getDataCookie(data:any) {
  const dataCookie = cookies().get(data);
  return dataCookie?.value
}

export async function deleteDataCookie(data:any) {
  cookies().delete(data);
}