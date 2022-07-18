import { Wrapper } from "./Item.styles";
import { Button } from "@mui/material";
//types
import { CartItemType } from "../App";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
    </div>
    <Button onClick={()=>handleAddToCart(item)}>Add to Cart</Button>
  </Wrapper>
);

export default Item;
