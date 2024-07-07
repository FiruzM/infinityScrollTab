import { client } from "../client";
import { User } from "../types";

export function userInfo({ pageParam }: { pageParam: number }) {
  return client
    .get("userInfo", {
      searchParams: {
        _page: pageParam,
      },
    })
    .json<{ data: User[]; next: number }>();
}
