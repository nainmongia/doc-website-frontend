import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import products from "../../../data/products.json";
import { getProductBySlug } from "../../../common/productSelect";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";
import LayoutFour from "../../../components/Layout/LayoutOne";
import { baseUrl } from "../../../../config.js";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../components/Other/Breadcrumb";
import ProductSlideTwo from "../../../components/Sections/ProductThumb/ProductSlide/ProductSlideTwo";
import Loading from "../../../components/Other/Loading";
import { toast } from "react-toastify";

export default function () {
  const router = useRouter();
  const { slug } = router.query;
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(slug);
  const [foundProduct, setFoundProduct] = useState({
    productID: "",
    id: "",
    category: "",
    name: "",
    rate: 0,
    price: 0,
    new: true,
    brand: "",
    code: "",
    point: 0,
    quantity: 0,
    variation: [],
    thumbImage: [],
    images: [],
    description: "",
    slug: "",
  });
  const [originalData, setOriginalData] = useState();
  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `${baseUrl}/api/get/single/product/${slug}`;

      const res = await axios.get(url, { withCredentials: true });
      setOriginalData(res?.data);
      console.log(res?.data);
      setFoundProduct({
        productID: res?.data._id,
        id: res?.data.product_id,
        category: res?.data.product_main_category,
        name: res?.data.product_name,
        rate: 4,
        regular_price: res?.data.product_regular_price,
        price: res?.data.product_sale_price,
        new: res?.data.new_arrival,
        brand: res?.data?.product_brand,
        code: res?.data.product_code,
        point: 0,
        quantity: res?.data?.quantity,
        variation: [],
        thumbImage: res?.data.product_images,
        images: res?.data.product_images,
        description: res?.data.product_description,
        slug: res?.data.product_slug,
      });
      await fetchrec();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  async function fetchrec() {
    try {
      const url = `${baseUrl}/api/rec`;
      console.log(foundProduct?.category);
      const res = await axios.post(
        url,
        {
          id: slug,
        },
        { withCredentials: true }
      );
      setSimilar(res.data?.allProducts);
    } catch (error) {
      console.log(error);
    }
  }

  useState(() => {
    fetchData();
    // fetchrec();
  }, []);

  useEffect(() => {
    fetchData();
    // fetchrec();
  }, [slug]);
  // let foundProduct = getProductBySlug(products, slug);
  console.log(foundProduct);
  const onReviewSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      {loading ? (
        <>
          {" "}
          <Loading />{" "}
        </>
      ) : (
        <LayoutFour title={foundProduct.name}>
          <Breadcrumb title="Product Detail">
            <BreadcrumbItem name="Home" />
            <BreadcrumbItem name="Shop" />
            <BreadcrumbItem name={foundProduct.name} current />
          </Breadcrumb>
          <ProductDetail
            original={originalData}
            data={foundProduct}
            onReviewSubmit={onReviewSubmit}
          />
          <ProductSlideTwo data={similar} />
          {/* <InstagramTwo /> */}
        </LayoutFour>
      )}
    </>
  );
}
