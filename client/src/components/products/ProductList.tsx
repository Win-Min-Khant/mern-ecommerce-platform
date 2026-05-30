import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Product[]
}

function ProductList({products}: ProductListProps) {
  return (
    <div className="grid grid-cols-4 gap-10">
        {products?.map(product => <ProductCard product={{
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0].url,
          rating_count: product.rating_count
        }} 
        key={product._id}/>)}
    </div>
  )
}

export default ProductList
