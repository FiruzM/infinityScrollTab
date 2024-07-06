import { getDatas } from "./api/data/get-datas";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

import PopupForm from "./components/PopupForm/PopupForm";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

function App() {
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["datas"],
    queryFn: getDatas,
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
      console.log(index, "item");
      console.log(items.data.length, "items.data.length");

      if (items.data.length === index + 1) {
        return (
          <TableRow ref={ref} key={item.id}>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.fatherName}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phoneNumber}</TableCell>
          </TableRow>
        );
      }
      return (
        <TableRow key={item.id}>
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

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return status === "pending" ? (
    <div className="flex justify-center mt-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="animate-spin stroke-[#4f99db]"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  ) : status === "error" ? (
    <div className="flex justify-center mt-20">
      <p>Error: {error.message}</p>
    </div>
  ) : (
    <>
      <div className="max-w-[1300px] mx-auto py-20 px-10 border rounded-lg mt-20 shadow-md bg-white">
        <Dialog
          open={modalOpen}
          onOpenChange={(open: boolean) => {
            setModalOpen(open);
          }}
        >
          <div className="flex justify-end">
            <DialogTrigger className="mb-10 bg-[#4f99db] rounded-md p-2 text-white">
              Add new data
            </DialogTrigger>
          </div>
          <DialogContent className="max-w-[720px]">
            <DialogHeader>
              <DialogTitle>Please field the form</DialogTitle>
              <DialogDescription>
                <PopupForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

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
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="animate-spin stroke-[#4f99db]"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
