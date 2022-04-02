import { useEffect, useState } from 'react';
import useSWR from 'swr';

// Client Side Rendering!
function LastSalesPage() {
  const [sales, setSales] = useState();
  const { data, error } = useSWR('...');

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
  if (!data || !sales) {
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

export default LastSalesPage;
