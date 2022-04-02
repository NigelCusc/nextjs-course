function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// Totally Dynamic
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Max',
    },
  };
}
