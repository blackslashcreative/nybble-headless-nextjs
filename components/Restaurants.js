import { gql, useQuery } from "@apollo/client";
import RestaurantCard from "./restaurantCard";
import Loader from "./Loader";

const GET_RESTAURANTS = gql`
query getRestaurants {
  restaurants {
    nodes {
      restaurantFields {
        restaurantName
        description
        image {
          node {
            databaseId
            mediaItemUrl
          }
        }
      }
      databaseId
      slug
    }
  }
}`;

export default function Restaurants() {
  const {loading, error, data} = useQuery(GET_RESTAURANTS);

  if (loading) return (<Loader></Loader>);
  if (error) return "Error! ${error.message}";
  //console.log(data.restaurants.nodes);

  return (
    <ul className="gallery">
      {data.restaurants.nodes.map((restaurant) => (
        <li className="galleryCard" key={restaurant.databaseId}>
          <RestaurantCard restaurant={restaurant} />
        </li>
      ))}
    </ul>
  );
}