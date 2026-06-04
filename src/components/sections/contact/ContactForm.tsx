"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  submitContactForm,
  type ContactFormInput,
} from "@/lib/actions/contact";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  message: z.string().min(10, "Please describe what you need"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      message: "",
      budget: "",
      timeline: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    const payload: ContactFormInput = {
      name: data.name,
      company: data.company,
      message: data.message,
    };
    if (data.budget) payload.budget = data.budget;
    if (data.timeline) payload.timeline = data.timeline;

    const result = await submitContactForm(payload);
    if (result.ok) {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-text flex-col gap-6"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" autoComplete="name" {...register("name")} />
        {errors.name ? (
          <p className="text-sm text-ink/60">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" autoComplete="organization" {...register("company")} />
        {errors.company ? (
          <p className="text-sm text-ink/60">{errors.company.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">What you need</Label>
        <Textarea id="message" rows={5} {...register("message")} />
        {errors.message ? (
          <p className="text-sm text-ink/60">{errors.message.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="budget">Budget range (optional)</Label>
        <Input id="budget" {...register("budget")} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="timeline">Timeline (optional)</Label>
        <Input id="timeline" {...register("timeline")} />
      </div>

      <Button type="submit" variant="accent" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
