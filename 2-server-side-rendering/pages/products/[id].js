import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises'; // Used only in getStaticProps

function ProductDetailPage(props) {
  const { product } = props;
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.id;

  const data = await getData();
  const product = data.products.find((p) => p.id === productId);
  return {
    product,
  };
}

export async function getStaticPaths() {
  // Geneate Static for each product!

  const data = await getData();
  const ids = data.products.map((p) => p.id);
  const pathsWithParams = ids.map((id) => ({ params: { id } }));
  return {
    paths: pathsWithParams,
    //fallback: true, //  Prerender only some. props will be null briefly
    fallback: 'blocking', // Prerender only some. Rest are generated just in time
  };
}

export default ProductDetailPage;
