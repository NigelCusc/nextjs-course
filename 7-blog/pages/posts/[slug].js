import { Fragment } from 'react';
import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostsFiles, getPostData } from '../../lib/posts-util';

function PostDetailPage(props) {
  const { post } = props;
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((x) => x.replace(/\.md$/, ''));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
