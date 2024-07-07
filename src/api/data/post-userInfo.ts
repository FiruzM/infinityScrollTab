import { client } from "../client";
import { UserProps } from "../types";

export function postUserInfo(data: UserProps) {
  return client.post("userInfo", { json: data }).json();
}
