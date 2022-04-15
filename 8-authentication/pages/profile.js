import { getSession } from 'next-auth/client';
import { useContext } from 'react';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export function getServerSideProps(context) {
  const session = await getSession({ req: useContext.req }); // Finds cookie
  // REDIRECT from server side!
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {session}
  }
}

export default ProfilePage;
