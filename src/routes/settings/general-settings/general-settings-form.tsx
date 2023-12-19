"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LOCALES, useLocale } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { FormattedMessage } from "react-intl";

const languages = [
  { label: "English", value: "en-US" },
  { label: "Português", value: "pt" },
  { label: "Português Brasileiro", value: "pt-BR" },
  { label: "Français", value: "fr" },
] as const;

const accountFormSchema = z.object({
  language: z.enum(LOCALES, {
    required_error: "Please select a language.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function GeneralSettingsForm() {
  const { locale, setLocale } = useLocale();

  const defaultValues: Partial<AccountFormValues> = {
    language: locale,
  };
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    setLocale(data.language);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormattedMessage
                  defaultMessage="Language"
                  description="Language Label on general settings page"
                />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      <span
                        className={`fi fi-${
                          new Intl.Locale(
                            language.value,
                          ).region?.toLowerCase() || language.value
                        }`}
                      ></span>{" "}
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
