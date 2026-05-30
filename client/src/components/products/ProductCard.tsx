import { Link } from "react-router";
import RatingConverter from "./RatingConverter";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    rating_count: number;
}

interface ProductCardProps {
    product: Product
}
function ProductCard({product} : ProductCardProps) {
  return (
    <div className="shadow-md rounded-md">
        <img className="w-full object-cover rounded-md h-[250px]" src={product.image} alt={product.name} />
        <div className="p-3 space-y-3">
            <p className="text-center font-medium text-sm">{product.name}</p>
            <div className="flex items-center gap-2 justify-center">
              <RatingConverter rating_count={product.rating_count}/>
            </div>
            <p className="text-lg font-medium text-center">${product.price}</p>
            <Link to={`/products/${product._id}`}><button className="bg-black font-bold text-white text-[12px] w-full py-2 rounded-md cursor-pointer">View Detail</button></Link>
        </div>
    </div>
  )
}

export default ProductCard
