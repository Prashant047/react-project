"use client";
import { Formik, Field, Form, FormikProps, FieldProps} from 'formik';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useContext, useState } from 'react';
import { BookContext, BookType } from '@/app/book-context';


export default function BookFormDialog({
  action, children, value
}:{
  action:"edit" |"new", 
  children: ReactNode,
  value?: BookType
}) {
  const [open, setOpen] = useState(false);

  // @ts-ignore
  const {addBook, updateBook} = useContext(BookContext);

  let initialValue = {
    title: '',
    status: 'reading',
    progress: 0,
    rating: 0,
    id: null
  }
  if (value){
    initialValue.title = value.title;
    initialValue.status = value.status;
    initialValue.progress = value.progress;
    initialValue.rating = value.rating;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, { resetForm }) => {

          values.progress = Math.min(100, Math.max(0, values.progress));
          values.rating = Math.min(100, Math.max(0, values.rating));

          values.progress = values.status === "completed"?100: values.status === "wishlist"? 0 : values.progress;
          values.rating =  values.status === "completed"? values.rating: 0;

          if (action == "edit") {
            values = {
              ...values,
              // @ts-ignore
              id: value?.id
            }
            updateBook(values);
          } else if (action == "new") {
            addBook(values);
            resetForm();
          }
          setOpen(false);
        }}
      >
        {(props:FormikProps<any>) => (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{action==="edit"?"Edit":"Add"} Book</DialogTitle>
              <DialogDescription>
                {action === "edit"?"Modify details of the book":"Enter details of the new book you want to track"}
              </DialogDescription>
            </DialogHeader>
          <Form className="flex flex-col items-start gap-4">
            <Field name="title">
              {({
                field
              }:FieldProps) => (
                <div className="w-full">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" type="text" {...field}/>
                </div>
              )}
            </Field>
            <Field name="status">
              {({
                field,
                form
              }:FieldProps) => (
                <div className="">
                  <Label>Status</Label>
                  <Select value={field.value} onValueChange={(value) => form.setFieldValue(field.name, value)} >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="wishlist">Whishlist</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </Field>
            <div className="flex gap-2">
              <Field name="progress">
                {({
                  field
                }:FieldProps) => (
                <div>
                  <Label htmlFor="progress">Progress</Label>
                  <Input id="progress" type="number" {...field} min={0} max={100}/>
                </div>
                )}
              </Field>
              <Field name="rating">
                {({
                  field
                }:FieldProps) => (
                <div>
                  <Label htmlFor="rating">Score</Label>
                  <Input id="rating" type="number" {...field} min={0} max={100} />
                </div>
                )}
              </Field>
            </div>
          </Form>
          <DialogFooter>
            <Button type="submit" onClick={() => props.submitForm()}>Save</Button>
          </DialogFooter>
        </DialogContent>
        )}
      </Formik>
    </Dialog>
  )
}