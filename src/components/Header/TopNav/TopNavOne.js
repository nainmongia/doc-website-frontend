import React, { useState } from "react";
import { Container } from "reactstrap";
import Link from "next/link";
import axios from "axios";
import SocialIcons from "../../Other/SocialIcons";
import Select from "../../Control/Select";
import { renderContainer } from "../../../common/utils";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../../config";
import { logoutUser } from "../../../redux/reducers/userReducer";
import { toast } from "react-toastify";

export default function TopNavOne({ container }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/logout`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(logoutUser());
      return toast.success("logout successfully");
    } catch (error) {
      return toast.error("something went wrong");
    }
  };

  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("ENG");

  return (
    <div className="top-nav .-style-1">
      <div className={renderContainer(container)}>
        <div className="top-nav__wrapper">
          <SocialIcons className="-white" />
          <p className="top-nav__wrapper__promo">
            Bringing You The Best Healthcare
          </p>
          <div className="top-nav__wrapper__selectors">
            {/* selec
            <Select
              id="cur"
              options={["USD", "VND", "YEN"]}
              getValue={(val) => setCurrency(val)}
              className="-white -borderless"
            /> */}
            {/* <Select
              id="lang"
              options={["EN", "VI", "JP"]}
              getValue={(val) => setLanguage(val)}
              className="-white -borderless"
            /> */}
            {isAuthenticated ? (
              <div style={{
                display:'flex', justifyContent:"space-between",alignItems:"center",gap:20
              }}>
              <Link
                  href={`${process.env.PUBLIC_URL}/profile`}
                  // href={`#`}
                  as={`${process.env.PUBLIC_URL}/profile`}
                >
                  <a className="top-nav__auth" >Your Orders</a>
                </Link>
              <button onClick={handleLogout} className="logoutbutton">
                logout
              </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <a className="top-nav__auth">Login/Register</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
