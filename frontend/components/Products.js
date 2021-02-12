import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data);
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        {data.allProducts.map(product => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    </div>
  );
}