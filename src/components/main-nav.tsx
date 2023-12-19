import { cn } from "@/lib/utils";
import {
  CalculatorIcon,
  CrossIcon,
  FileSpreadsheetIcon,
  HomeIcon,
  PizzaIcon,
  SettingsIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex items-center justify-around gap-6 space-x-4 lg:space-x-6 h-full",
        className,
      )}
      {...props}
    >
      <NavLink
        to={`${import.meta.env.BASE_URL}/`}
        end
        className={({ isActive }) =>
          cn(
            "flex flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary h-full",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <HomeIcon /> Home
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/careportal`}
        className={({ isActive }) =>
          cn(
            "flex flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary h-full",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <CrossIcon /> Care Portal
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/bolus-wizard`}
        className={({ isActive }) =>
          cn(
            "flex flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary h-full",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <CalculatorIcon /> Bolus Wizard
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/food`}
        className={({ isActive }) =>
          cn(
            "flex flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary h-full",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <PizzaIcon /> Food
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/reports`}
        className={({ isActive }) =>
          cn(
            "flex flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary h-full",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <FileSpreadsheetIcon /> Reports
        </span>
      </NavLink>
      <NavLink
        to={`${import.meta.env.BASE_URL}/settings`}
        className={({ isActive }) =>
          cn(
            "flex flex-col justify-center px-4 text-sm font-medium transition-colors hover:text-primary h-full",
            isActive ? "text-primary" : "",
          )
        }
      >
        <span className="flex items-center gap-1">
          <SettingsIcon /> Settings
        </span>
      </NavLink>
    </nav>
  );
}
