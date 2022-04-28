import PropTypes from 'prop-types';
import { CRYPTO_STRING, DEFAULT_CARD_INFO } from '../constants';
import Button from './common/Button';

const propTypes = {
  cardInfo: PropTypes.object.isRequired,
  isCardFront: PropTypes.bool,
  handleModal: PropTypes.func,
  handleCardPosition: PropTypes.func,
};

const CardPreview = ({ cardInfo, isCardFront, handleModal, handleCardPosition }) => {
  const { number, ownerName, expiryDate, company, theme, privacyCode } = cardInfo;
  const { first, second, third, fourth } = number;
  const upperCaseOwnerName = ownerName.toUpperCase() || DEFAULT_CARD_INFO.OWNER_NAME;
  const month = expiryDate.month || DEFAULT_CARD_INFO.EXPIRY_MONTH;
  const year = expiryDate.year || DEFAULT_CARD_INFO.EXPIRY_YEAR;

  return (
    <div className="card-box">
      <div className={`empty-card bg-${theme}`} onClick={handleModal}>
        {isCardFront ? (
          <>
            <div className="card-top">
              <span className="card-text">{company}</span>
            </div>
            <div className="card-middle">
              <div className="small-card__chip"></div>
            </div>
            <div className="card-bottom">
              <div className="card-bottom__number">
                <span className="card-text card-text__default">{first}</span>
                <span className="card-text card-text__default">{second}</span>
                <span className="card-text card-text__default card-text__privacy">
                  {CRYPTO_STRING.repeat(third.length)}
                </span>
                <span className="card-text card-text__default card-text__privacy">
                  {CRYPTO_STRING.repeat(fourth.length)}
                </span>
              </div>
              <div className="card-bottom__info">
                <span className="card-text card-text__control">{upperCaseOwnerName}</span>
                <span className="card-text">
                  {month} / {year}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card-black-line"></div>
            <div className="card-white-line">{privacyCode}</div>
            <div className="card-back">
              <div className="small-card__chip"></div>
              <div className="card-back__info">
                이 카드를 도난 분실하면 일주일 이내로 연락 바랍니다.
              </div>
            </div>
          </>
        )}
        {!company && <div className="card-add-button">+</div>}
      </div>
      <Button className="change-button" onClick={handleCardPosition}>
        {isCardFront ? 'Back' : 'Front'}
      </Button>
    </div>
  );
};

CardPreview.propTypes = propTypes;

export default CardPreview;
