import { Fragment } from "react";
import { IntlProvider } from "react-intl";
import messages from "./messages";
import flatten from "flat";

interface ProviderProps {
  children: React.ReactNode;
  locale: TLocale;
}

function LocaleProvider({ children, locale = "en-EN" }: ProviderProps) {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={flatten(messages[locale])}
    >
      {children}
    </IntlProvider>
  );
}

export default LocaleProvider;
