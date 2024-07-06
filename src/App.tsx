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
import { ScrollArea } from "./components/ui/scroll-area";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
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
  });

  const { ref, inView } = useInView();

  const dataList = data?.pages.map((items) =>
    items.data.map((item) => {
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

  console.log(inView);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
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

        <ScrollArea className="h-[525px]">
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
          <Button
            ref={ref}
            disabled={isFetchingNextPage || !hasNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
          {isFetchingNextPage && <p className="text-center">Loading more...</p>}
        </ScrollArea>
      </div>
    </>
  );
}

export default App;
