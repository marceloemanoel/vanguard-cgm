import { Separator } from "@/components/ui/separator";
import { GeneralSettingsForm } from "./general-settings-form";
import { FormattedMessage } from "react-intl";

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          <FormattedMessage
            defaultMessage="General Settings"
            description="General Settings Header on settings page"
          />
        </h3>
        <p className="text-sm text-muted-foreground">
          <FormattedMessage
            defaultMessage="Update your settings. Set your preferred language and timezone."
            description="General Settings section description"
          />
        </p>
      </div>
      <Separator />
      <GeneralSettingsForm />
    </div>
  );
}
