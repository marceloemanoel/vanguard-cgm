import { cn } from "@/lib/utils";
import {
  CalculatorIcon,
  CrossIcon,
  FileSpreadsheetIcon,
  HomeIcon,
  PizzaIcon,
  SettingsIcon,
} from "lucide-react";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex h-full items-center justify-around gap-6 space-x-4 lg:space-x-6",
        className,
      )}
      {...props}
    >
      <NavLink
        to={`${import.meta.env.BASE_URL}/`}
        end
        className={({ isActive }) =>
          cn(
            "flex h-full flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <HomeIcon />{" "}
          <FormattedMessage
            defaultMessage="Home"
            description="Home link at the top level navigation"
          />
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/careportal`}
        className={({ isActive }) =>
          cn(
            "flex h-full flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <CrossIcon />{" "}
          <FormattedMessage
            defaultMessage="Care Portal"
            description="Care Portal link at the top level navigation"
          />
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/bolus-wizard`}
        className={({ isActive }) =>
          cn(
            "flex h-full flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <CalculatorIcon />{" "}
          <FormattedMessage
            defaultMessage="Bolus Wizard"
            description="Bolus Wizard link at the top level navigation"
          />
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/food`}
        className={({ isActive }) =>
          cn(
            "flex h-full flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <PizzaIcon />{" "}
          <FormattedMessage
            defaultMessage="Food"
            description="Food link at the top level navigation"
          />
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/reports`}
        className={({ isActive }) =>
          cn(
            "flex h-full flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <FileSpreadsheetIcon />{" "}
          <FormattedMessage
            defaultMessage="Reports"
            description="Reports link at the top level navigation"
          />
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/settings`}
        className={({ isActive }) =>
          cn(
            "flex h-full flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <SettingsIcon />{" "}
          <FormattedMessage
            defaultMessage="Settings"
            description="Settings link at the top level navigation"
          />
        </span>
      </NavLink>
    </nav>
  );
}
