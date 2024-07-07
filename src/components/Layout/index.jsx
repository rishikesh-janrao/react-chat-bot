import { useEffect, useState } from "react";
import "./Layout.css";
import Loader from "../Common/Loader";
import ChatWindow from "../Chat";

function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ChatWindow />
    </>
  );
}

export default Layout;
