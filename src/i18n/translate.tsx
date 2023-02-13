import { FormattedMessage } from 'react-intl';

function translate(id: string) {
  return <FormattedMessage id={id} />;
}

export default translate;
