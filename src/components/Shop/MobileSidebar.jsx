import React, { useState } from "react";
import {
  setFilterCategory,
  setFilterBrand,
  setFilterPriceRange,
  resetFilter,
} from "../../redux/actions/shopActions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const MobileSidebar = ({
  categoriesData,
  filterData,
  setFilter,
  filter,
  fetchData,
  setCurrentPage,
  setPrice,
}) => {
  const [isOptionMenuActive, setOptionMenuActive] = useState(false);

  const toggleOptionMenu = () => {
    setOptionMenuActive(!isOptionMenuActive);
  };

  const dispatch = useDispatch();
  // const filterData = useSelector((state) => state.shopReducers.filter);
  useEffect(() => {
    dispatch(resetFilter());
  }, []);

  return (
    <div className={`select-menu ${isOptionMenuActive ? "active" : ""}`}>
      <div onClick={toggleOptionMenu} className="select-btn">
        <span className="sBtn-text">Filter by Categories</span>
        <i className="fa fa-angle-down"></i>
      </div>
      <ul className="options">
        <li className="option">
          <button
            style={{ background: "none", border: "none" }}
            onClick={(e) => {
              e.preventDefault();
              // dispatch(resetFilter());
              setFilter("all");
              setCurrentPage(0);
              fetchData(0, "all");
            }}
          >
            <span className="option-text">All</span>
          </button>
        </li>
        <li className="option">
          <button
            style={{ background: "none", border: "none" }}
            onClick={async (e) => {
              e.preventDefault();
              // dispatch(resetFilter());
              //  setFilter("all");
              //  setCurrentPage(0);
              // fetchData(0,"all");
              await setPrice(-1);
              await new Promise((resolve) => setTimeout(resolve, 300));
              if (filter === "all") {
                fetchData(0, "all", -1);
              } else {
                filterData(0, filter, -1);
              }
            }}
          >
            <span className="option-text">Price: Low to high</span>
          </button>
        </li>
        <li className="option">
          <button
            style={{ background: "none", border: "none" }}
            onClick={async (e) => {
              e.preventDefault();
              // dispatch(resetFilter());
              //  setFilter("all");
              //  setCurrentPage(0);
              //  fetchData(0,"all");
              await setPrice(1);
              await new Promise((resolve) => setTimeout(resolve, 300));
              if (filter === "all") {
                fetchData(0, "all", 1);
              } else {
                filterData(0, filter, 1);
              }
            }}
          >
            <span className="option-text">Price: High to low</span>
          </button>
        </li>
        {categoriesData.map((it, index) => (
          <li className="option" key={index}>
            <button
              style={{ background: "none", border: "none" }}
              onClick={(e) => {
                e.preventDefault();
                // dispatch(setFilterCategory(it.main_category_name));
                setFilter(it.main_category_name);
                setCurrentPage(0);
                filterData(0, it.main_category_name);
              }}
            >
              <span className="option-text">{it.main_category_name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
