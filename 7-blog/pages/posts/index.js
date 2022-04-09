import { Fragment } from 'react';
import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All My Posts</title>
        <meta name="description" content="A list of all my posts" />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 1800,
  };
}
export default AllPostsPage;
