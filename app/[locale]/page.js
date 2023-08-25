import MainBar from "../../components/main/MainBar";
import {getTranslator} from "next-intl/server";

export async function generateMetadata({ params }) {
  const title = await getTranslator(params.locale, "Blog")
  return {
    title: title("header"),
    description: "Blog"
  }
}

function Home() {
  return (
      <MainBar/>
  )
}

export default Home