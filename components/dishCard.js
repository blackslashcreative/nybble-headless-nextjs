import { useAppContext } from '../appContext';
import { HiOutlinePlusCircle } from "react-icons/hi";
import { BsCartCheck } from "react-icons/bs";

export default function DishCard({ dish }) {
  
  const { cart, addItem } = useAppContext();
  let {items} = cart;
  console.log('items in cart (inside dishcard component)...');
  console.log(items);

  let itemInCart = false;
  console.log('dish.slug = ' + dish.slug);
  if(items.length > 0) {
    itemInCart = items.find((i) => i.slug === dish.slug);
    if(itemInCart) itemInCart = true;
    console.log('founditem... ' + JSON.stringify(itemInCart));
  }
  
  //console.log(restaurant.slug);
  return (
    <>
      <img src={dish?.dishFields.image?.node?.mediaItemUrl} />
      <div className="cardBody">
        <h2 className="itemName">{dish?.dishFields?.dishName}</h2>
        <p className="text-sm">{dish?.dishFields?.dishDescription}</p>
        <div className="cardFooter">
          {itemInCart && <div className="mr-auto text-purple-800 text-xs">Item Added :)</div>}
          <div className={"add-to-cart " + (itemInCart ? "item-in-cart" : "false")}
            onClick={() => { 
              console.log("Adding item... ");
              console.dir(dish);
              addItem(dish);
            }}
          >
            <BsCartCheck className="icon-cart-check" />
            <HiOutlinePlusCircle className="icon-plus-circle" />
          </div>
          <p className="price">${dish?.dishFields?.price.toFixed(2)}</p>
        </div>
      </div>
    </>
  )
}