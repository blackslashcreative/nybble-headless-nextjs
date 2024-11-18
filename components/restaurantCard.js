import Link from "next/link";

export default function RestaurantCard({ restaurant }) {
  //console.log(restaurant.slug);
  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
      <img src={restaurant?.restaurantFields.image?.node?.mediaItemUrl} />
      <div className="cardBody">
        <h2 className="itemName">{restaurant?.restaurantFields?.restaurantName}</h2>
        <p className="text-sm">{restaurant?.restaurantFields?.description}</p>
      </div>
    </Link>
  )
}