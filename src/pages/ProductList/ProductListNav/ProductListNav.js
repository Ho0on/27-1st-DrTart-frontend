import React, { useEffect, useState } from 'react';
import ProductListMenu from './ProductListMenu/ProductListMenu';
import './ProductListNav.scss';

function ProductListNav() {
  const [isProductNavLoading, setIsProductNavLoading] = useState(false);
  const [productNavData, setProductNavData] = useState([]);

  useEffect(() => {
    (async () => {
      setIsProductNavLoading(true);
      await productNavFetchData();
      setIsProductNavLoading(false);
    })();
  }, []);

  const productNavFetchData = async () => {
    const data = await fetch('/data/product_nav_data.json');
    const res = await data.json();
    setProductNavData(res);
  };

  return (
    <nav className="productListNav">
      <h1 className="productListNavHead">제품</h1>
      <ul className="productListMenuContainer">
        <ProductListMenu list_name="모든 제품" />
        {!isProductNavLoading &&
          productNavData.map(({ id, list_name, small_category }) => (
            <ProductListMenu
              key={id}
              list_name={list_name}
              small_category={small_category}
            />
          ))}
      </ul>
    </nav>
  );
}

export default ProductListNav;
