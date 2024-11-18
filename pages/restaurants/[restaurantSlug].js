import { gql, useQuery } from "@apollo/client";
import { useState } from 'react';
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import Link from "next/link";
import DishCard from "../../components/dishCard";
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../../components';
import { MdRestaurantMenu } from "react-icons/md";

const GET_RESTAURANT_DETAILS = gql`
query GetRestaurantDetails($restaurantSlug: ID!) {
  restaurant(id: $restaurantSlug, idType: SLUG) {
    restaurantFields {
      restaurantName
      description
      image {
        node {
          mediaItemUrl
        }
      }
      menuItems {
        nodes {
          ... on Dish {
            id
            slug
            dishId
            dishFields {
              dishName
              dishDescription
              price
              image {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export default function Restaurant(props) {  

  const [search, setSearch] = useState("");
  console.log(search);

  const { query = {} } = useRouter();
  const { restaurantSlug } = query;
  //console.log(`slug: ${restaurantSlug}`);

  const {loading, error, data} = useQuery(GET_RESTAURANT_DETAILS, {
    variables: { restaurantSlug }
  });

  if (loading) return (<Loader></Loader>);
  if (error) return `Error! ${error.message}`;

  const restaurantData = data?.restaurant?.restaurantFields;
  let dishes = restaurantData.menuItems.nodes;
  if (search.length > 0) {
    console.log('searching...');
    dishes = dishes.filter((dish) => 
      dish.slug.toLowerCase().includes(search)
    );
  }
  //console.dir(searchResults);

  return (
    <>
      <SEO title={restaurantData.restaurantName} description={restaurantData.description} />
        <Header
          //title={restaurantData.restaurantName}
          //description={restaurantData.description}
          //menuItems={primaryMenu}
        />
      <Main>
        <Container>
          <h1 className="hero">{restaurantData.restaurantName}</h1>
          <p className="details">{restaurantData.description}</p>
          <input
            type="text"
            placeholder="Search for something to nybble on..."
            autoComplete="false"
            className="search input"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value.toLocaleLowerCase())
            }
          />
          <div className="breadcrumbs">
            <MdRestaurantMenu /> <Link href="/">Restaurants</Link><div className="spacer">/</div>{restaurantData.restaurantName}
          </div>
          <ul className="gallery">
            {dishes.length > 0 ? dishes.map((dish) => (
              <li className="galleryCard" key={dish.id}>
                <DishCard dish={dish} />
              </li>
            )) : <div>Oops! Nothing found...</div>}
          </ul>
        </Container>
      </Main>
      <Footer title="nybble"/>
    </>
  );
}