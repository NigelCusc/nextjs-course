function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// Totally Dynamic
export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}
