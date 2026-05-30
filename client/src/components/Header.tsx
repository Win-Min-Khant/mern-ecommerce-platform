import { useState } from "react"
import BottomHeader from "../common/BottomHeader"
import TopHeader from "../common/TopHeader"
import CartDrawer from "./cart/CartDrawer";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  }
  return (
    <header>
      <TopHeader toggleCart={toggleCart}/>
      <BottomHeader/>
      <CartDrawer toggleCart={toggleCart} isCartOpen={isCartOpen}/>
    </header>
  )
}

export default Header
