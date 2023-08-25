import LikedPosts from "../../../../components/user/LikedPosts";
import { getTranslator } from 'next-intl/server';

export async function generateMetadata({ params }) {
   const title = await getTranslator(params.locale, "Likes")
   return {
      title: title("header"),
      description: "User Likes"
   }
}

export default function UserLikedPosts() {
   return <LikedPosts />
}