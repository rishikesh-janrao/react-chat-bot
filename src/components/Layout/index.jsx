import { useEffect, useState } from "react";
import "./Layout.css";
import Loader from "../Common/Loader";

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
    </>
  );
}

export default Layout;
