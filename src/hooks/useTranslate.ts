import { useCallback } from 'react';
import { useIntl } from 'react-intl';

function useTranslate() {
  const intl = useIntl();
  const translate = useCallback((id: string) => intl.formatMessage({ id }), [intl]);

  return translate;
}
export default useTranslate;
