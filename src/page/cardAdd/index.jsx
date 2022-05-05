import { useEffect, useReducer } from 'react';

import FormInput from 'components/common/FormInput';
import CardPreview from 'components/CardPreview';
import Modal from 'components/common/Modal';
import Header from 'components/common/Header';
import Button from 'components/common/Button';
import Tooltip from 'components/common/Tooltip';
import Circle from '../../components/common/Circle';
import Message from '../../components/common/Message';
import useModal from 'hooks/useModal';
import useIsFilled from 'hooks/useIsFilled';
import useToggle from 'hooks/useToggle';
import { ReactComponent as PrevIcon } from 'assets/prev_icon.svg';

import { validator } from './validator';
import {
  CARD_NUMBER,
  COMPANY,
  CRYPTO_STRING,
  EXPIRY_DATE,
  INPUT_MAX_LENGTH,
  PASSWORD,
  PRIVACY_CODE,
} from 'constants';
import {
  cardNumberInputInfoList,
  expiryDateInputInfoList,
  cardOwnerNameInputInfoList,
  privacyCodeInputInfoList,
  cardPasswordInputInfoList,
  cardCompanyList,
} from 'page/cardAdd/data';
import { Link } from 'react-router-dom';
import reducer from './reducer';

const initialCardInfo = {
  theme: '',
  company: '',
  cardNumber: {
    first: '',
    second: '',
    third: '',
    fourth: '',
  },
  expiryDate: {
    month: '',
    year: '',
  },
  ownerName: '',
  privacyCode: '',
  password: {
    first: '',
    second: '',
    third: CRYPTO_STRING,
    fourth: CRYPTO_STRING,
  },
};

const CardAppPage = () => {
  const [cardInfo, dispatch] = useReducer(reducer, initialCardInfo);
  const { cardNumber, ownerName, expiryDate, company, theme, password, privacyCode } = cardInfo;

  const [isCompanyFilled] = useIsFilled(COMPANY, company, false);
  const [isCardNumberFilled] = useIsFilled(CARD_NUMBER, cardNumber, false);
  const [isExpiryDateFilled] = useIsFilled(EXPIRY_DATE, expiryDate, false);
  const [isPrivacyCodeFilled] = useIsFilled(PRIVACY_CODE, privacyCode, false);
  const [isPasswordFilled] = useIsFilled(PASSWORD, password, false);
  const [modalVisible, handleModal] = useModal(false);
  const [isCardFront, handleCardPosition] = useToggle(true);

  const isFullFilled =
    isCompanyFilled &&
    isCardNumberFilled &&
    isExpiryDateFilled &&
    isPrivacyCodeFilled &&
    isPasswordFilled;

  const handleChange = ({ target }, type) => {
    const { name, value } = target;

    if (!validator[type](value, name)) {
      return;
    }

    dispatch({ type, name, value });
  };

  const handleCompanyClick = (company, theme) => {
    dispatch({ type: 'company', value: company });
    dispatch({ type: 'theme', value: theme });

    handleModal();
  };

  return (
    <div>
      <Header title="카드 추가">
        <Link to="/">
          <Button>
            <PrevIcon />
          </Button>
        </Link>
      </Header>
      <CardPreview
        cardInfo={cardInfo}
        isCardFront={isCardFront}
        handleModal={handleModal}
        handleCardPosition={handleCardPosition}
      />
      <Message name="company" isFilled={isCompanyFilled} align="text-center" />

      <FormInput
        type="cardNumber"
        inputTitle="카드 번호"
        inputInfoList={cardNumberInputInfoList}
        inputValue={cardNumber}
        handleChange={handleChange}
        theme={theme}
        maxLength={INPUT_MAX_LENGTH.CARD_NUMBER}
      />
      <Message name="cardNumber" isFilled={isCardNumberFilled} />

      <FormInput
        className="w-50"
        type="expiryDate"
        inputTitle="만료일"
        inputInfoList={expiryDateInputInfoList}
        inputValue={expiryDate}
        handleChange={handleChange}
        theme={theme}
        maxLength={INPUT_MAX_LENGTH.EXPIRY_DATE}
      />
      <Message name="expiryDate" isFilled={isExpiryDateFilled} />

      <FormInput
        type="ownerName"
        inputTitle="카드 소유자 이름(선택)"
        inputInfoList={cardOwnerNameInputInfoList}
        inputValue={ownerName}
        handleChange={handleChange}
        theme={theme}
        maxLength={INPUT_MAX_LENGTH.OWNER_NAME}
      >
        <div className="owner-name-length">
          {ownerName.length} / {INPUT_MAX_LENGTH.OWNER_NAME}
        </div>
      </FormInput>

      <FormInput
        type="privacyCode"
        inputTitle="보안코드(CVC/CVV)"
        inputInfoList={privacyCodeInputInfoList}
        handleChange={handleChange}
        inputValue={privacyCode}
        theme={theme}
        maxLength={INPUT_MAX_LENGTH.PRIVACY_CODE}
      >
        <Tooltip type="PRIVACY_CODE" />
      </FormInput>
      <Message name="privacyCode" isFilled={isPrivacyCodeFilled} />

      <FormInput
        type="password"
        inputTitle="카드 비밀번호"
        inputInfoList={cardPasswordInputInfoList}
        inputValue={password}
        handleChange={handleChange}
        theme={theme}
        maxLength={INPUT_MAX_LENGTH.PASSWORD}
      />
      <Message name="password" isFilled={isPasswordFilled} />
      {/* next button */}
      {isFullFilled && (
        <div className="flex-right right-bottom-edge">
          <Link to="/confirm">
            <Button theme={theme}>다음</Button>
          </Link>
        </div>
      )}
      {/* modal */}
      {modalVisible && (
        <Modal handleModal={handleModal}>
          <div className="flex-wrap">
            {cardCompanyList.map(({ id, company, theme }) => (
              <div
                key={id}
                className="modal-item-container"
                onClick={() => handleCompanyClick(company, theme)}
              >
                <Circle theme={theme} />
                <span className="modal-item-name">{company}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CardAppPage;
