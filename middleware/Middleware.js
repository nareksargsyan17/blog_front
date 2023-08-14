import {useRouter} from "next/navigation";

const Middleware = ({children}) => {
  const router = useRouter()

  const token =localStorage.getItem("token");
  console.log(token)
  if (token) {
    return router.replace("/")
  } else {
    return children
  }
};

export default Middleware;