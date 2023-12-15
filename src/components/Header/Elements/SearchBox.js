import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import outsideClickHandle from "../../../common/ElementOutsideClick";

export default function SearchBox({ showSearch, setShowSearch }) {
  const { register, handleSubmit } = useForm();
  const wrapperRef = useRef(null);
  outsideClickHandle(wrapperRef, () => {
    setShowSearch(false);
  });
  function onSubmit(data) {
    console.log(data);
    window.location.replace(`/shop/search/${data.search}`)
  }
  return (
    <CSSTransition
      in={showSearch}
      unmountOnExit
      timeout={200}
      classNames="search-box"
    >
      <div ref={wrapperRef} className="search-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="What are you looking for?"
            name="search"
            ref={register}
          />
          <button>
            <img
              src="/assets/images/header/search-icon.png"
              alt="Search icon"
            />
          </button>
        </form>
      </div>
    </CSSTransition>
  );
}
