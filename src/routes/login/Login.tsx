import NightscoutIcon from "@/components/NightscoutIcon";
import { Toaster } from "@/components/ui/toaster";
import { UserAuthForm } from "@/routes/login/UserAuthForm";
import { Helmet } from "react-helmet-async";
import { FormattedMessage } from "react-intl";

export function Login() {
  return (
    <>
      <Helmet>
        <title>Vangard CGM - Authentication</title>
        <meta
          name="description"
          content="Authentication forms built using the components."
        />
      </Helmet>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col items-center justify-center bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 dark:bg-zinc-900" />
          <div className="relative z-20 flex flex-col items-center justify-center gap-4 text-lg font-medium">
            <NightscoutIcon width="256" height="256" />
            <span className="text-6xl uppercase text-black dark:text-white">
              Vangard CGM
            </span>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                <FormattedMessage
                  defaultMessage="Sign In"
                  description="Sign in form header"
                />
              </h1>
              <p className="text-sm text-muted-foreground">
                <FormattedMessage
                  defaultMessage="Enter your Nighscout Address and API Token to access your data"
                  description="Sign in form description"
                />
              </p>
            </div>
            <UserAuthForm />
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
}
