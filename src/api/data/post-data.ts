import { client } from "../client";
import { DataProps } from "../types";

export function postData(data: DataProps) {
  return client.post("table", { json: data }).json();
}
