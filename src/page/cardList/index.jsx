import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import CardPreview from 'components/CardPreview';
import Button from 'components/common/Button';
import Header from 'components/common/Header';
import DeleteIcon from 'assets/delete_icon.png';

import CARD_API from 'api';
import { CONFIRM_MESSAGE } from 'constants';
import LoadingSpinner from 'components/common/LoadingSpinner';

const CardListPage = () => {
  const [cardList, setCardList] = useState([]);
  const isLoading = useRef(true);

  const handleDeleteCard = async (e, cardId) => {
    e.preventDefault();

    if (window.confirm(CONFIRM_MESSAGE)) {
      await CARD_API.deleteCard(cardId);
      await CARD_API.getCardList().then((response) => setCardList(response));
    }
  };

  useEffect(() => {
    CARD_API.getCardList().then((response) => {
      isLoading.current = false;
      setCardList(response);
    });
  }, []);

  if (isLoading.current) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Header title="보유 카드 목록 💳" />
      <div className="card-list mt-10">
        {cardList.map((card) => (
          <Link key={card.id} to={`/react-payments/modify/${card.id}`}>
            <div className="flex-column-center card-item-wrapper">
              <CardPreview cardInfo={card} isVisibleButton="hide" theme="red" />
              <span className="text-center">{card.alias}</span>
              <Button
                className="card-delete-button"
                theme="red"
                handleClick={(e) => handleDeleteCard(e, card.id)}
              >
                <img src={DeleteIcon} alt="카드삭제버튼" />
              </Button>
            </div>
          </Link>
        ))}
        {/* 카드 추가하는 템플릿*/}
        <div className="card-item">
          <div className="card-box">
            <Link to="/react-payments/add" className="empty-card">
              <Button className="card-add-button">+</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
