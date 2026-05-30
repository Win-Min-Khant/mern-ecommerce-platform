import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "./CartItem";

const products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 25.99,
    category: "Apparel",
    size: ["S", "M", "L", "XL"],
    colors: ["White", "Heather Gray"],
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
    ],
  },
  {
    id: 2,
    name: "Urban Denim Jacket",
    price: 89.0,
    category: "Outerwear",
    size: ["M", "L", "XL"],
    colors: ["Blue Denim", "Black"],
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
    ],
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    price: 45.5,
    category: "Apparel",
    size: ["S", "M", "L"],
    colors: ["Beige", "Navy", "Olive"],
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
    ],
  },
  {
    id: 4,
    name: "Tech Runner Sneakers",
    price: 120.0,
    category: "Footwear",
    size: ["7", "8", "9", "10", "11"],
    colors: ["Neon Green", "Stealth Black"],
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmAC_I9Gi5eKU0jgq1RUHGunHj1N0Oq-pw&s",
      },
    ],
  },
];

interface CartDrawer {
  isCartOpen: boolean;
  toggleCart(): void;
}

function CartDrawer({ isCartOpen, toggleCart }: CartDrawer) {
  const total = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l border-muted/60 bg-background shadow-2xl transition-transform duration-300 sm:w-[420px] ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-muted/60 px-6 py-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Shopping cart
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Your Cart</h3>
        </div>
        <button
          type="button"
          onClick={toggleCart}
          className="rounded-full border border-muted/60 p-2 text-muted-foreground transition hover:bg-muted"
          aria-label="Close cart"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4 border-b border-muted/60 px-6 py-4 text-sm text-muted-foreground">
        <p>{products.length} items in cart</p>
        <p>Free delivery on orders over $100</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {products.map((product) => (
            <CartItem
              key={product.id}
              image={product.images[0].url}
              name={product.name}
              price={product.price}
              color={product.colors[0]}
              size={product.size[0]}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-muted/60 px-6 py-5">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-base font-semibold text-foreground">
            ${total.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Taxes and shipping calculated at checkout.
        </p>
        <div className="mt-6 grid gap-3">
          <Button className="w-full">Proceed to checkout</Button>
          <Button variant="outline" className="w-full" onClick={toggleCart}>
            Continue shopping
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default CartDrawer;
