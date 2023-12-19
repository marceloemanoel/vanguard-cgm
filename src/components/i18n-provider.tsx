import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IntlProvider } from "react-intl";
import { z } from "zod";

export const LOCALE_EN = "en-US" as const;
export const LOCALE_PT = "pt" as const;
export const LOCALE_PTBR = "pt-BR" as const;
export const LOCALE_FR = "fr" as const;

export const LOCALES = [LOCALE_EN, LOCALE_PT, LOCALE_PTBR, LOCALE_FR] as const;

export const LocaleSchema = z.enum(LOCALES, {
  description: "Locales avaible in the application",
  required_error: "Application locale is required",
});

type Locale = z.infer<typeof LocaleSchema>;

type I18NProviderState = {
  locale: Locale;
  setLocale(locale: Locale): void;
};

const initialState: I18NProviderState = {
  locale: LOCALE_EN,
  setLocale: () => {},
};

const I18NProviderContext = createContext<I18NProviderState>(initialState);

type I18NProviderProps = {
  defaultLocale?: Locale;
  storageKey?: string;
};

export default function I18NProvider({
  defaultLocale = LOCALE_EN,
  storageKey = "locale",
  children,
}: PropsWithChildren<I18NProviderProps>) {
  const [locale, setLocale] = useState<Locale>(() => {
    const existingLocale = localStorage.getItem(storageKey);

    const parseResult = LocaleSchema.safeParse(
      existingLocale ? existingLocale : undefined,
    );

    return parseResult.success ? parseResult.data : defaultLocale;
  });
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const intlLocale = new Intl.Locale(locale);

    async function load() {
      const loadMessages = (locale: string) =>
        import(`../lang/compiled/${locale}.json`).then((data) => {
          setMessages(data?.default);
          localStorage.setItem(storageKey, locale);
        });

      try {
        await loadMessages(intlLocale.baseName);
      } catch (error) {
        console.error((error as Error).message);
        console.info(`falling back to language '${intlLocale.language}'`);
        await loadMessages(intlLocale.language);
      }
    }
    load();
  }, [locale, setMessages, storageKey]);

  const value = {
    locale,
    setLocale,
  };

  return (
    <I18NProviderContext.Provider value={value}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </I18NProviderContext.Provider>
  );
}

export const useLocale = () => {
  const context = useContext(I18NProviderContext);

  if (context === undefined)
    throw new Error("useLocale must be used within a I18NProvider");

  return context;
};
