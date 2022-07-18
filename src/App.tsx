// //Components
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { LinearProgress, Grid, Drawer, Badge } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";

// // styles
// import { Wrapper } from "./App.styles";
//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  // console.log("data",data)
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => (ack += item.amount), 0);
  const handleAddtoCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      //1. check is item in the cart
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //firts time add to item
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Somethimg went wrong...</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddtoCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge color="error" badgeContent={getTotalItems(cartItems)}>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddtoCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
