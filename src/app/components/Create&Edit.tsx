"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useRouter, useSearchParams } from "next/navigation";
import { createEdit, Onepost } from "../features/posts/getAll";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import Sellector from "./Sellector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
  status: z.enum(["IN_PROGRESS", "DONE"]),
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description must be at most 100 characters."),
});

type Idprop = {
  id?: string;
};

type Prop = {
  title: string;
  des: string;
  status: "IN_PROGRESS" | "DONE";
  createdAt: Date;
  updatedAt: Date;
};

export function CreateEdit({ id }: Idprop) {
  const param = useSearchParams();
  const edit = param.get("edit");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { execute, isExecuting } = useAction(createEdit, {
    onSuccess() {
      toast.success("Success");
      setOpen(false);
      router.refresh();
    },
    onError(error) {
      console.log("error", error);
      toast.error("Failed");
    },
  });
  const [olddata, setOlddata] = useState<Prop | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "IN_PROGRESS",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    execute({
      id: id!,
      title: data.title,
      description: data.description,
      status: data.status,
    });
    toast.success("Success", {
      position: "top-center",
    });
    router.push("/posts");
  }

  const getOld = async (id: string) => {
    const res = await Onepost(id);
    setOlddata(res);
  };

  useEffect(() => {
    if (id) {
      getOld(id);
    }
  }, [id]);

  useEffect(() => {
    if (olddata) {
      form.reset({
        title: olddata.title,
        description: olddata.des,
        status: olddata.status,
      });
    }
  }, [olddata, form]);

  return (
    <>
      {edit === "yesedit" ? (
        <Card className="w-full mx-auto sm:max-w-md">
          <CardHeader>
            <CardTitle>
              {edit === "yesedit" ? "Edit Post" : "Create Post"}
            </CardTitle>
            <CardDescription>Stay Home,Stay Save.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Post Title
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eq.First Post"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-description">
                        Description
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="form-rhf-demo-description"
                          placeholder="Eq.Something..."
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/500 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        Include steps to reproduce, expected behavior, and what
                        actually happened.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Status</FieldLabel>

                      <Sellector
                        value={field.value}
                        onChange={field.onChange}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isExecuting} form="form-rhf-demo">
                {isExecuting ? "Loading..." : "Submit"}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            {" "}
            <Card className="w-full mx-auto sm:max-w-md">
              <CardHeader>
                <CardTitle>
                  {edit === "yesedit" ? "Edit Post" : "Create Post"}
                </CardTitle>
                <CardDescription>Stay Home,Stay Save.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-title">
                            Post Title
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-title"
                            aria-invalid={fieldState.invalid}
                            placeholder="Eq.First Post"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-description">
                            Description
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="form-rhf-demo-description"
                              placeholder="Eq.Something..."
                              rows={6}
                              className="min-h-24 resize-none"
                              aria-invalid={fieldState.invalid}
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupText className="tabular-nums">
                                {field.value.length}/500 characters
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          <FieldDescription>
                            Include steps to reproduce, expected behavior, and
                            what actually happened.
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="status"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Status</FieldLabel>

                          <Sellector
                            value={field.value}
                            onChange={field.onChange}
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter>
                <Field orientation="horizontal">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={isExecuting}
                    form="form-rhf-demo"
                  >
                    {isExecuting ? "Loading..." : "Submit"}
                  </Button>
                </Field>
              </CardFooter>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
