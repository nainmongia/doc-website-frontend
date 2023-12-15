import React from "react";
import Link from "next/link";

function MenuFive({ data }) {
  return (
    <header className="menufiveHeader">
      <div className="menufiveContainer">
        {/* <div className="logo"></div> */}
        <nav>
          <ul>
            {data.slice(0, 11).map((item) => {
              if (item) {
                return (
                  <li>
                    {item.main_category_name.toUpperCase()}
                    {item.subcategory.length === 0 ? (
                      <></>
                    ) : (
                      <div className="megamenu">
                        {data.map((i) => {
                          if (
                            i.main_category_name === item.main_category_name
                          ) {
                            return (
                              <div className="megamenuItems">
                                <h3 style={{
                                          textTransform:"capitalize"
                                        }} >{i.category_name}</h3>

                                <ul>
                                  {i.subcategory.map((j) => {
                                    return (
                                      <Link
                                        href={`${process.env.PUBLIC_URL}/shop/search/[slug]`}
                                        // href={`#`}
                                        as={`${process.env.PUBLIC_URL}/shop/search/${j.name}`}
                                        // as={`#`}
                                      >
                                        <li style={{
                                          textTransform:"capitalize"
                                        }} >{j.name}</li>
                                      </Link>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                  </li>
                );
              } else {
                return <></>;
              }
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MenuFive;
