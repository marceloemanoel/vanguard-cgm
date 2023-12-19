import { Separator } from "@/components/ui/separator";
import { GeneralSettingsForm } from "./general-settings-form";
import { FormattedMessage } from "react-intl";

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          <FormattedMessage
            defaultMessage="General Settings"
            description="General Settings Tab on settings page"
          />
        </h3>
        <p className="text-sm text-muted-foreground">
          <FormattedMessage
            defaultMessage="Update your settings. Set your preferred language and timezone."
            description="General Settings tab description"
          />
        </p>
      </div>
      <Separator />
      <GeneralSettingsForm />
    </div>
  );
}
