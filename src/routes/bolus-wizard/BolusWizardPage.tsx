import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";

export function BolusWizardPage() {
  return (
    <>
      <Helmet>
        <title>Bolus Wizard</title>
        <meta
          name="description"
          content="Manage your account settings and set e-mail preferences."
        />
      </Helmet>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Bolus Wizard</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"></div>
      </div>
    </>
  );
}
