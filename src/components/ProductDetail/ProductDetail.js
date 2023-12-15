import React from "react";

import ProductDetailInfo from "./Elements/ProductDetailInfo";
import ProductDetailSlideTwo from "./Elements/ProductDetailSlideTwo";
import ProductDetailSlideOne from "./Elements/ProductDetailSlideOne";

export default function ProductDetail({ data, onReviewSubmit,original }) {
  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail__wrapper">
          <div className="row">
            <div className="col-12 col-md-6">
              <ProductDetailSlideTwo data={data} product_images={data?.images} />
            </div>
            <div className="col-12 col-md-6">
              <ProductDetailInfo original={original} data={data} onReviewSubmit={onReviewSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
