import Profile from "../../../../components/user/Profile";


export async function generateMetadata({ params: { id } }) {

   const user = await fetch(`http://localhost:3001/api/guest/user/get/${id}`).then((res) => res.json())

   return {
      title: `Profile | ${user.data.firstName} ${user.data.lastName} `,
      description: `${user.data.firstName} ${user.data.lastName} `
   }
}


export default function UserProfile({ params: { id } }) {
   return <Profile id={id} />
}