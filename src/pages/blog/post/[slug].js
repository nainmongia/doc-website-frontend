import { useRouter } from "next/router";

import data from "../../../data/blog/blog.json";
import LayoutFour from "../../../components/Layout/LayoutFour";
import { getPostBySlug } from "../../../common/postSelect";
import BlogSidebar from "../../../components/Blog/BlogSidebar";
import PostContent from "../../../components/Blog/PostContent";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";

export default function () {
  const router = useRouter();
  const { slug } = router.query;
  const foundPost = getPostBySlug(data, slug);
  return (
    foundPost !== null && (
      <LayoutFour tilte={foundPost.title}>
        <div className="post">
          <div className="post__cover">
            <img src={foundPost.coverImage} alt={foundPost.title} />
          </div>
          <div className="post__body">
            <div className="container">
              <div className="row no-gutters">
                <div className="col-12 col-md-3">
                  <div className="post__sidebar">
                    <BlogSidebar limit={5} popularPostData={data} />
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <div className="post__content">
                    <PostContent data={foundPost} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InstagramTwo />
      </LayoutFour>
    )
  );
}
