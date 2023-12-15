import Link from "next/link";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import menuData from "../../../data/header/navigation.json";

export default function Navigator({ data }) {
  // console.log(data);
  const [dropdownItem, setDropdownItem] = useState();
  function renderMenu() {
    return menuData.map((item, index) => {
      if (item.title === "Diseases") {
        return (
          <li className="relative" key={index}>
            <Link href="#">
              <a
                onClick={() => {
                  if (dropdownItem === "Diseases") {
                    setDropdownItem("");
                    return;
                  }
                  setDropdownItem("Diseases");
                }}
              >
                {item.title}
                <span className="dropable-icon">
                  <i
                    className={`fas ${
                      dropdownItem === "Diseases"
                        ? "fa-angle-up"
                        : "fa-angle-down"
                    }`}
                  ></i>
                </span>
              </a>
            </Link>
            <CSSTransition
              in={dropdownItem === "Diseases"}
              unmountOnExit
              timeout={200}
              classNames="dropdown-menu-mobile"
            >
              <ul className="dropdown-menu">
                {item.subMenu.map((i, index) => (
                  <li key={index}>
                    <Link href={`${process.env.PUBLIC_URL}${i.to}`}>
                      <a>{i.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </CSSTransition>
          </li>
        );
      }
      // if (item.title === "Shop") {
      //   return (
      //     <li key={index}>
      //       <Link href="#">
      //         <a
      //           onClick={() => {
      //             if (dropdownItem === "shop") {
      //               setDropdownItem("");
      //               return;
      //             }
      //             setDropdownItem("shop");
      //           }}
      //         >
      //           {item.title}
      //           <span className="dropable-icon">
      //             <i
      //               className={`fas ${
      //                 dropdownItem === "shop" ? "fa-angle-up" : "fa-angle-down"
      //               }`}
      //             ></i>
      //           </span>
      //         </a>
      //       </Link>
      //       <CSSTransition
      //         in={dropdownItem === "shop"}
      //         unmountOnExit
      //         timeout={200}
      //         classNames="dropdown-menu-mobile"
      //       >
      //         <ul className="dropdown-menu">
      //           <ul className="dropdown-menu__col">
      //             {item.subMenu.slice(0, 4).map((i, index) => (
      //               <li key={index}>
      //                 <Link href={`${process.env.PUBLIC_URL}${i.to}`}>
      //                   <a>{i.title}</a>
      //                 </Link>
      //               </li>
      //             ))}
      //           </ul>
      //           <ul className="dropdown-menu__col">
      //             {item.subMenu.slice(4, 8).map((i, index) => (
      //               <li key={index}>
      //                 <Link href={`${process.env.PUBLIC_URL}${i.to}`}>
      //                   <a>{i.title}</a>
      //                 </Link>
      //               </li>
      //             ))}
      //           </ul>
      //           <ul className="dropdown-menu__col">
      //             {item.subMenu.slice(8).map((i, index) => (
      //               <li key={index}>
      //                 <Link href={`${process.env.PUBLIC_URL}${i.to}`}>
      //                   <a>{i.title}</a>
      //                 </Link>
      //               </li>
      //             ))}
      //           </ul>
      //           <ul className="dropdown-menu__col -banner">
      //             <Link href="/shop/fullwidth-4col">
      //               <a>
      //                 <img
      //                   src="/assets/images/header/dropdown-menu-banner.png"
      //                   alt="New product banner"
      //                 />
      //               </a>
      //             </Link>
      //           </ul>
      //         </ul>
      //       </CSSTransition>
      //     </li>
      //   );
      // }
      return (
        <li key={index}>
          <Link href={item.to}>
            <a>{item.title}</a>
          </Link>
        </li>
      );
    });
  }

  function renderMegaMenu() {
    return data.map((item, index) => {
      if (item.subcategory.length > 0) {
        return (
          <li className="relative" key={index}>
            <Link href="#">
              <a
                style={{
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  if (dropdownItem === item.category_name) {
                    setDropdownItem("");
                    return;
                  }
                  setDropdownItem(item.category_name);
                }}
              >
                {item.category_name}
                <span className="dropable-icon">
                  <i
                    className={`fas ${
                      dropdownItem === item.category_name
                        ? "fa-angle-up"
                        : "fa-angle-down"
                    }`}
                  ></i>
                </span>
              </a>
            </Link>
            <CSSTransition
              in={dropdownItem === item.category_name}
              unmountOnExit
              timeout={200}
              classNames="dropdown-menu-mobile"
            >
              <ul className="dropdown-menu">
                {item.subcategory.map((i, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={`${process.env.PUBLIC_URL}/shop/search/[slug]`}
                        // href={`#`}
                        as={`${process.env.PUBLIC_URL}/shop/search/${i.name}`}
                        // as={`#`}
                      >
                        <a>{i.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CSSTransition>
          </li>
        );
      } else {
        return <></>;
      }
    });
  }

  return (
    <div className="navigator-mobile">
      <ul>{renderMenu()}</ul>
      <ul>
      <li key={1516652}>
          <Link href='profile'>
            <a>your orders</a>
          </Link>
        </li>
      </ul>
      <h4 class="divider line one-line" contenteditable>
        Our Categories
      </h4>
      <ul>{renderMegaMenu()}</ul>
    </div>
  );
}
