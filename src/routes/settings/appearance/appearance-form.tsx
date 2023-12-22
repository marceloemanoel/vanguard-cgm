"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  COLORS,
  COLOR_SCHEMES,
  LIGHT_COLOR_SCHEME,
  useSystemColorScheme,
  useTheme,
} from "@/components/ThemeProvider";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const appearanceFormSchema = z.object({
  colorScheme: z.enum(COLOR_SCHEMES, {
    required_error: "Please select a theme.",
  }),
  color: z.enum(COLORS, {
    required_error: "Please select a color.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();
  const { systemColorScheme } = useSystemColorScheme();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: theme,
  });

  function onSubmit(data: AppearanceFormValues) {
    setTheme(data);
  }

  const lightTheme = (
    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
      </div>
    </div>
  );

  const darkTheme = (
    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="colorScheme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="system" className="sr-only" />
                    </FormControl>
                    {systemColorScheme === LIGHT_COLOR_SCHEME
                      ? lightTheme
                      : darkTheme}
                    <span className="block w-full p-2 text-center font-normal">
                      System Default
                    </span>
                  </FormLabel>
                </FormItem>

                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    {lightTheme}
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    {darkTheme}
                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Colors</FormLabel>
              <FormDescription>
                Select the colors for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-5 gap-8 pt-2"
              >
                {COLORS.map((color) => (
                  <FormItem key={color}>
                    <FormLabel className="flex flex-col items-center justify-center [&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value={color} className="sr-only" />
                      </FormControl>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted hover:bg-accent hover:text-accent-foreground">
                        <div
                          className={cn(
                            // needs to manually assign all the theme colors to prevent tailwind to remove them from final css
                            "h-4 w-4 rounded-full bg-theme-blue bg-theme-green bg-theme-orange bg-theme-rose bg-theme-yellow p-2",
                            `bg-theme-${color === "default" ? "rose" : color}`,
                          )}
                        ></div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal capitalize">
                        {color}
                      </span>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type="submit">Update preferences</Button>
      </form>
    </Form>
  );
}
