import { client } from "../client";
import { Data } from "../types";

export function getDatas({ pageParam }: { pageParam: number }) {
  return client
    .get("table", {
      searchParams: {
        _page: pageParam,
      },
    })
    .json<{ data: Data[], next: number }>();
}
