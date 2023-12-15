import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useRouter } from "next/router";

import BlogSidebar from "../../components/Blog/BlogSidebar";
import LayoutFour from "../../components/Layout/LayoutFour";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import blogData from "../../data/blog/blog.json";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import { getPostByKeyword } from "../../common/postSelect";
import BlogContent from "../../components/Blog/BlogContent";

export default function index() {
  const router = useRouter();
  const search = router.query.search;
  const pageLimit = 7;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    if (!search || search.length === 0) {
      setCurrentData(blogData);
    } else {
      setCurrentData(getPostByKeyword(blogData, search));
    }
  }, [offset, search]);

  return (
    <LayoutFour title="Blog">
      <Breadcrumb title="Blog">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Blog" current />
      </Breadcrumb>
      <div className="blog">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3">
              <BlogSidebar limit={5} popularPostData={blogData} />
            </div>
            <div className="col-12 col-lg-9">
              <BlogContent offset={offset} search={search} data={currentData} />
              <Paginator
                pageContainerClass="paginator"
                totalRecords={currentData.length}
                pageLimit={pageLimit}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <InstagramTwo />
    </LayoutFour>
  );
}
