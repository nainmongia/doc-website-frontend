import React, { useState, useEffect } from "react";
import classNames from "classnames";

import { product } from "../../common/variables";

export default function Quantity({
  className,
  defaultQuantity,
  getQuantity,
  onDecrease,
  onIncrease,
  maxValue,
}) {
  const [quantity, setQuantity] = useState(
    defaultQuantity || product.DEFAULT_QUANTITY
  );
  useEffect(() => {
    getQuantity && getQuantity(quantity);
  }, [quantity]);
  return (
    <div className={`quantity-controller ${classNames(className)}`}>
      <div
        className="quantity-controller__btn -descrease"
        onClick={() => {
          if (quantity < 2) {
            return;
          }
          setQuantity(quantity - 1);
          onDecrease && onDecrease();
        }}
      >
        -
      </div>
      <h5 className="quantity-controller__number">{quantity}</h5>
      <div
        className="quantity-controller__btn -increase"
        onClick={() => {
          if (quantity >= maxValue) {
            return;
          }
          setQuantity(quantity + 1);
          onIncrease && onIncrease();
        }}
      >
        +
      </div>
    </div>
  );
}
