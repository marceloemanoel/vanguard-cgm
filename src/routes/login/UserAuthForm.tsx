import * as React from "react";

import { useAuthContext } from "@/components/AuthProvider";
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
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideHelpCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { z } from "zod";

function makeAuthFormSchema(
  requiredErrorMsg: (fieldName: string) => string,
  urlErrorMsg: string,
) {
  return z.object({
    url: z
      .string({ required_error: requiredErrorMsg("url") })
      .url({ message: urlErrorMsg ?? "" }),
    apiToken: z.string().optional(),
  });
}

type AuthFormValues = z.infer<ReturnType<typeof makeAuthFormSchema>>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // const navigate = useNavigate();
  const { authContext, setAuthContext } = useAuthContext();
  const intl = useIntl();
  const [isLoading] = useState(false);

  const requiredErrorMsg = (fieldName: string) =>
    intl.formatMessage(
      {
        defaultMessage: "{fieldName} is required",
        description: "A message describing a required field validation error",
      },
      { fieldName },
    );

  const urlFormatErrorMsg = intl.formatMessage({
    defaultMessage: "Invalid url",
    description: "A message describing an invalid url",
  });

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(
      makeAuthFormSchema(requiredErrorMsg, urlFormatErrorMsg),
    ),
    defaultValues: authContext,
  });

  async function onSubmit(data: AuthFormValues) {
    setAuthContext(data);
    // navigate(import.meta.env.BASE_URL);

    const successMsg = intl.formatMessage(
      {
        defaultMessage: "Successfully connected with Nightscout at {address}",
        description: "A successfull connection was stabelished with Nightscout",
      },
      { address: data.url },
    );

    toast({
      title: successMsg,
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage
                    defaultMessage="Nightscout URL"
                    description="Nightscout URL label on authentication form"
                  />
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} required />
                </FormControl>
                <FormDescription>
                  <FormattedMessage
                    defaultMessage="This is your Nightscout Address"
                    description="Description of Nightscout URL field on authentication form"
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  <FormattedMessage
                    defaultMessage="API Token"
                    description="Nightscout API Token label on authentication form"
                  />

                  <Tooltip>
                    <TooltipTrigger>
                      <LucideHelpCircle className="text-xs" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        <FormattedMessage
                          defaultMessage="Only required for updating nightscout data, or if your nightscout has unauthorised access switched off"
                          description="Describes the API Token Usage"
                        />
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="***" {...field} />
                </FormControl>
                <FormDescription>
                  <FormattedMessage
                    defaultMessage="This is your Nightscout API Token"
                    description="Description of Nightscout API Token on authentication form"
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <FormattedMessage
                defaultMessage="Sign In"
                description="Sign in form submit button"
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
