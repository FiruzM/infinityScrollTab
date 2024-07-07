import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserInfo } from "../../api/data/post-userInfo";
import { UserProps } from "../../api/types";
import { useState } from "react";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  fatherName: z.string().min(2, {
    message: "Father name must be at least 2 characters.",
  }),
  gender: z
    .string({
      required_error: "Choose at least one gender.",
    })
    .min(1),
  email: z.string().email({ message: "Please enter a valid email address." }),
  age: z.string().min(1, { message: "Age must be at least 1 characters." }),
  phoneNumber: z.string().min(9, {
    message: "Phone number must be at least 9 characters.",
  }),
});
function PopupForm() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      fatherName: "",
      gender: "",
      email: "",
      age: "",
      phoneNumber: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserProps) => postUserInfo(data),

    onError: async () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersInfo"] });
      setModalOpen(false);

      toast({
        title: "Success",
        description: "Your data has been added successfully.",
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <div className="flex justify-end">
      <Dialog
        open={modalOpen}
        onOpenChange={(open: boolean) => {
          setModalOpen(open);
        }}
      >
        <DialogTrigger className="mb-10 bg-[#4f99db] rounded-md p-2 text-white">
          Add new data
        </DialogTrigger>
        <DialogContent className="max-w-[720px]">
          <DialogHeader>
            <DialogTitle>Please field the form</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4f99db]">
                            Firtst name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter first name"
                              {...field}
                              className="border-[#4f99db]"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4f99db]">
                            Last name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last name"
                              {...field}
                              className="border-[#4f99db]"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4f99db]">
                            Father name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter father name"
                              {...field}
                              className="border-[#4f99db]"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4f99db]">
                            Gender
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-[#4f99db] placeholder:text-[#4f99db]">
                                <SelectValue placeholder="Select a gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#4f99db]">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4f99db]">Age</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter age"
                              {...field}
                              className="border-[#4f99db]"
                              type="number"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4f99db]">
                            Phone number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter phone number"
                              {...field}
                              className="border-[#4f99db]"
                              type="number"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-[#4f99db]">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter email"
                              {...field}
                              className="border-[#4f99db]"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button disabled={isPending} type="submit">
                    {isPending ? (
                      <Loader2 className="animate-spin stroke-white" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PopupForm;
