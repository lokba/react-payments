import { initialCardInfo } from 'context/cardInfoProvider';
import { CardInfo } from 'types';

const ACTION_TYPES = {
  LOAD: 'load',
  ALIAS: 'alias',
  THEME: 'theme',
  COMPANY: 'company',
  CARD_NUMBER: 'cardNumber',
  EXPIRY_DATE: 'expiryDate',
  OWNER_NAME: 'ownerName',
  PRIVACY_CODE: 'privacyCode',
  PASSWORD: 'password',
  RESET: 'reset',
};

type Action = keyof typeof ACTION_TYPES;

const reducer = (state: CardInfo, action: { type: Action; name: string; value: any }) => {
  const { type, name, value } = action;

  switch (type) {
    case ACTION_TYPES.LOAD:
      return value;

    case ACTION_TYPES.ALIAS:
      return {
        ...state,
        [ACTION_TYPES.ALIAS]: value,
      };

    case ACTION_TYPES.THEME:
      return {
        ...state,
        [ACTION_TYPES.THEME]: value,
      };

    case ACTION_TYPES.COMPANY:
      return {
        ...state,
        [ACTION_TYPES.COMPANY]: value,
      };

    case ACTION_TYPES.CARD_NUMBER:
      return {
        ...state,
        [ACTION_TYPES.CARD_NUMBER]: {
          ...state[type],
          [name]: value,
        },
      };

    case ACTION_TYPES.EXPIRY_DATE:
      return {
        ...state,
        [ACTION_TYPES.EXPIRY_DATE]: {
          ...state[ACTION_TYPES.EXPIRY_DATE],
          [name]: value,
        },
      };

    case ACTION_TYPES.OWNER_NAME:
      return {
        ...state,
        [ACTION_TYPES.OWNER_NAME]: value,
      };

    case ACTION_TYPES.PRIVACY_CODE:
      return {
        ...state,
        [ACTION_TYPES.PRIVACY_CODE]: value,
      };

    case ACTION_TYPES.PASSWORD:
      return {
        ...state,
        [ACTION_TYPES.PASSWORD]: {
          ...state[ACTION_TYPES.PASSWORD],
          [name]: value,
        },
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialCardInfo,
      };

    default:
      return state;
  }
};

export default reducer;
