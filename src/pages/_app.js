import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

import "../styles/styles.scss";
import Loading from "../components/Other/Loading";
import withReduxStore from "../common/with-redux-store";
import "../styles/app.scss";
const App = ({ Component, pageProps, reduxStore }) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Component {...pageProps} />
        <ToastContainer position="bottom-left" autoClose={3000} />
        <ScrollToTop
          smooth
          component={<i className="fal fa-arrow-to-top" />}
          style={{
            backgroundColor: "#f7f5f4",
            borderRadius: "999px",
            height: "50px",
            width: "50px",
          }}
        />

        <img
          style={{
            height: "40px",
            width: "40px",
            position: "fixed",
            bottom: 40,
           // right: 40,
            left: 40,
            border: "none",
            borderRadius: "50%",
            background: "none",
            cursor:"pointer"
          }}
          src={process.env.PUBLIC_URL + "/assets/chat.png"}
          onClick={()=> {
            window.open('https://wa.me/6386796136', '_blank')
            // window.open('https://api.whatsapp.com/', '_blank')
          }}
        />
      </PersistGate>
    </Provider>
  );
};

export default withReduxStore(App);
