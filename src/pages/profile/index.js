import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LayoutFour from "../../components/Layout/LayoutOne";
import axios from "axios";
import { baseUrl } from "../../../config";
import Loading from "../../components/Other/Loading";
import { formatDate } from "../../common/utils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap:"20px";
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Card = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 15px 0px rgba(17, 30.999999999999996, 98.00000000000001, 0.1);
  border-radius: 10px;
  padding: 20px 2em 20px 2em;
  margin-bottom: 40px;
  @media only screen and (max-width: 553px) {
    width: 100%;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OrderDate = styled.div`
  font-weight: bold;
  @media only screen and (max-width: 553px) {
    font-size: 10px;
  }
`;

const Status = styled.div`
  border-radius: 10px;
  color: white;
  background-color: green;
  width: max-content;
  padding: 10px;
  height: auto;
  @media only screen and (max-width: 553px) {
    font-size: 10px;
  }
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  overflow-x: auto;
`;

const ProductTableHead = styled.thead`
  background-color: #f2f2f2;
`;

const ProductTableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const ProductTableHeader = styled.th`
  text-align: left;
  padding: 10px;
`;

const ProductTableData = styled.td`
  padding: 10px;
  @media only screen and (max-width: 553px) {
    text-align: justify;
    font-size: 10px;
    line-height: normal;
  }
`;

const Price = styled.span``;

const TotalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const TotalLabel = styled.p`
  font-weight: bold;
`;

const TotalAmount = styled.span``;

const AddressInfo = styled.div`
  margin-top: 10px;
  line-height: 2;
`;

const ProductImage = styled.div`
  padding: 10px;
  width: 65px;
  height: 65px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 55px;
    height: 55px;
    object-fit: contain;
  }
`;

export default function () {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.userReducer.user);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/get/all/orders/user`,{
        user: currentUser?.user._id
      }, {
        withCredentials: true,
      });
      console.log(res);
      if(res?.data?.success === false){
        setData([]);
        setLoading(false);
        return toast.error(res?.data?.message);
      }

      setData(res?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(data);

  return (
    <LayoutFour title="Order History">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="container">
          {data.length === 0 ? (
            <>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <iframe
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    height: "400px",
                    width: "100%",
                  }}
                  src="https://lottie.host/?file=591b9b0c-8270-47e1-89bf-e4c20d9be7a4/fE5YV4HSPk.json"
                ></iframe>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  You don't have any orders{" "}
                </span>
              </div>
            </>
          ) : (
            <Container>
              <Title>My Orders</Title>
              {data?.map((item) => {
                return (
                  <Card>
                    <OrderInfo>
                      <OrderDate>
                        Ordered on: {formatDate(item?.createdAt)}
                      </OrderDate>
                      <Status>{item?.order_status}</Status>
                    </OrderInfo>
                    <ProductTable>
                      <ProductTableHead>
                        <ProductTableRow>
                          <ProductTableHeader>Product</ProductTableHeader>
                          <ProductTableHeader>Description</ProductTableHeader>
                          <ProductTableHeader>Price</ProductTableHeader>
                        </ProductTableRow>
                      </ProductTableHead>
                      <tbody>
                        {item?.products?.map((i) => {
                          return (
                            <ProductTableRow>
                              <ProductTableData>
                                <ProductImage>
                                  <img
                                    src={i?.images[0]?.image_url}
                                    alt="Product"
                                  />
                                </ProductImage>
                              </ProductTableData>
                              <ProductTableData>
                                {i?.name} X {i?.cartQuantity}
                              </ProductTableData>
                              <ProductTableData>
                                ₹ {i?.price * i?.cartQuantity}
                              </ProductTableData>
                            </ProductTableRow>
                          );
                        })}
                        {/* Add more product rows as needed */}
                        <ProductTableRow>
                          <ProductTableData></ProductTableData>
                          <ProductTableData>
                            <TotalLabel>Total</TotalLabel>
                          </ProductTableData>
                          <ProductTableData>
                            <TotalAmount> {item?.total_amount}</TotalAmount>
                          </ProductTableData>
                        </ProductTableRow>
                      </tbody>
                    </ProductTable>
                    <AddressInfo>
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Address :
                      </span>{" "}
                      {item?.shipping_address}
                    </AddressInfo>
                    <AddressInfo>
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        TransactionID :
                      </span>{" "}
                      {item?.tid}
                    </AddressInfo>
                  </Card>
                );
              })}
            </Container>
          )}
        </div>
      )}
    </LayoutFour>
  );
}
