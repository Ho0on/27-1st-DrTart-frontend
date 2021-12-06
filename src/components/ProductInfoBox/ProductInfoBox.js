import React, { useState } from 'react';
import '../ProductInfoBox/ProductInfoBox.scss';
import NumBtn from '../ProductInfoBox/NumBtn/NumBtn';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';

const ProductInfoBox = ({
  category,
  productId,
  koreanName,
  price,
  sugarLevel,
  isVegan,
}) => {
  const [numValue, setNumValue] = useState(1);
  price = 100000;
  const minusOne = () => {
    numValue === 1 ? setNumValue(1) : setNumValue(numValue - 1);
  };

  const plusOne = () => {
    setNumValue(numValue + 1);
  };

  const totalPrice = price * numValue;

  const navigate = useNavigate();

  const btnOnClick = () => {
    fetch('API주소', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
        korean_name: koreanName,
        price: totalPrice,
      }),
    })
      .then(response => response.json())
      .then(result => result.message === 'SUCCESS')
      .then(navigate('./'));
  };

  return (
    <div className="productInfoBox">
      <div className="stickerWrap">
        <div className="stickerBest">BEST</div>
        {isVegan && <div className="stickerVegan">VEGAN</div>}
      </div>
      <h3 className="productName">{koreanName}</h3>
      <p className="infoTag">{category}</p>
      <div className="price">
        <p className="originPrice">{price.toLocaleString()}</p>
      </div>
      <ul className="tabBar">
        <li className="infoToBuy">구매정보</li>
      </ul>
      <div className="tabContents">
        <dl className="list">
          <dt className="title">수량</dt>
          <dd className="defines">
            <NumBtn minusOne={minusOne} plusOne={plusOne} numValue={numValue} />
          </dd>
        </dl>
        <dl className="list">
          <dt className="title">당도</dt>
          <dt>{sugarLevel}</dt>
        </dl>
      </div>
      <div className="totalPriceInfo">
        <p className="totalPriceTitle">총 구매금액</p>
        <p className="totalPrice">{(price * numValue).toLocaleString}</p>
      </div>
      <Button btnOnClick={btnOnClick}>바로구매</Button>
    </div>
  );
};

export default ProductInfoBox;
