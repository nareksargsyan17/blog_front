import Profile from "../../../components/user/Profile";

export const metadata = {
   title: "Profile"
}

export default function UserProfile({ params: { id } }) {
   return <Profile id={id} />
}