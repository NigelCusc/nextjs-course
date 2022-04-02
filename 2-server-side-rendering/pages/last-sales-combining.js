import { useEffect, useState } from 'react';
import useSWR from 'swr';

// Client Side Rendering!
function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const { data, error } = useSWR('...');

  // Client Side
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  });

  if (error) {
    return <p>Error</p>;
  }
  if (!data && !sales) {
    return <p>Loading</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>{sale.username}</li>
      ))}
    </ul>
  );
}

// Server side
export async function getStaticProps() {
  const response = await fetch('...');
  const data = await response.json();

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
