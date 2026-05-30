import { Minus, Plus, Trash } from "lucide-react";

interface CartItemProps {
  name: string;
  size: string;
  price: number;
  color: string;
  image: string;
}

function CartItem({ name, image, size, price, color }: CartItemProps) {
  return (
    <div className="rounded-3xl border border-muted/60 bg-white p-4 shadow-sm">
      <div className="flex gap-4 sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <img
            className="h-24 w-24 rounded-3xl object-cover"
            src={image}
            alt={name}
          />
          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">Size: {size}</p>
            <p className="text-sm text-muted-foreground">Color: {color}</p>
          </div>
        </div>

        <p className="text-base font-semibold text-foreground">
          ${price.toFixed(2)}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-muted/60 bg-muted px-2 py-1">
          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted/80"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="min-w-[1.5rem] text-center text-sm font-medium">
            1
          </span>
          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted/80"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-medium text-destructive transition hover:text-destructive/80"
        >
          <Trash className="h-4 w-4" />
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
