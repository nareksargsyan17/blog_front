import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const Middleware = ({children}) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined'  && window.localStorage) {
      let token = localStorage.getItem("token");
      setToken(token);
    }
  }, [token])

  if (token) {
    return router.replace("/")
  } else {
    return children
  }
};

export default Middleware;