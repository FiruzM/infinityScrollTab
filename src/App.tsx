import { userInfo } from "./api/data/get-userInfo";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

import PopupForm from "./components/PopupForm/PopupForm";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

function App() {
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["usersInfo"],
    queryFn: userInfo,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.next ? allPage.length + 1 : undefined;
      return nextPage;
    },
    refetchOnWindowFocus: false,
  });

  const { ref, inView } = useInView();

  const dataList = data?.pages.map((items) =>
    items.data.map((item, index) => {
      return (
        <TableRow
          ref={items.data.length === index + 1 ? ref : undefined}
          key={item.id}
        >
          <TableCell>{item.lastName}</TableCell>
          <TableCell>{item.firstName}</TableCell>
          <TableCell>{item.fatherName}</TableCell>
          <TableCell>{item.age}</TableCell>
          <TableCell>{item.gender}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.phoneNumber}</TableCell>
        </TableRow>
      );
    })
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="max-w-[1300px] mx-auto py-20 px-10 border rounded-lg mt-20 shadow-md bg-white">
        <PopupForm />

        {status === "pending" ? (
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin stroke-[#4f99db]"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        ) : status === "error" ? (
          <h1>{error.message}</h1>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Last Name</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Father Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{dataList}</TableBody>
          </Table>
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin stroke-[#4f99db]" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
