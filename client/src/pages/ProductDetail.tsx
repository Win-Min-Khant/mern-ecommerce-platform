import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingConverter from "../components/products/RatingConverter";
import { Minus, Plus } from "lucide-react";
import { useGetProductDetailQuery } from "@/store/slices/productApiSlice";

function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailQuery(id as string);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (product) {
      if (product.images.length > 0) {
        setSelectedImage(product.images[0].url);
      }

      if (product.color.length > 0) {
        setColor(product.color[0]);
      }

      if (product.size.length > 0) {
        setSelectedSize(product.size[0]);
      }
    }
  }, [product]);

  if (isLoading) {
    return <div>Product is loading...</div>;
  }

  if (!product) {
    <div>Product not found!</div>;
  }
  return (
    <main className="grid grid-cols-2 max-w-6xl mx-auto my-12.5">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 flex justify-between flex-col gap-4">
          {product?.images.map((image, index) => (
            <div
              className={`${selectedImage === image.url ? "border-3 w-fit rounded-xl border-gray-500" : ""}`}
              key={index}
            >
              <img
                onClick={() => setSelectedImage(image.url)}
                className="cursor-pointer w-30 h-30 rounded-xl border-3 border-transparent"
                src={image.url}
              />
            </div>
          ))}
        </div>
        <img
          className="col-span-3 w-full h-[550px] object-cover rounded-xl"
          src={selectedImage}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 h-full justify-center px-10">
        <h2 className="text-xl font-medium">{product?.name}</h2>
        <div className="flex items-center gap-3">
          <RatingConverter rating_count={product?.rating_count!} />
        </div>
        <p className="text-sm text-gray-400">{product?.description}</p>
        <p className="text-xl font-bold">${product?.price}</p>
        <div>
          <p className="font-bold mb-2">Colors</p>
          <div className="flex gap-3 items-center">
            {product?.color.map((c, index) => (
              <p
                key={index}
                className={`w-6 h-6 rounded-full cursor-pointer transition-all ${color === c ? "border-2 border-black scale-110" : "border border-gray-300"}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              ></p>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold mb-2">Size</p>
          <div className="flex items-center gap-3">
            {product?.size.map((s, i) => (
              <p
                key={i}
                onClick={() => setSelectedSize(s)}
                className={`py-1 cursor-pointer border text-black w-20 text-sm rounded-full text-center ${s === selectedSize ? "text-white bg-black" : "bg-gray-200 "}`}
              >
                {s}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center mt-10 gap-25">
          <div className="flex items-center gap-5">
            <button
              onClick={() =>
                setQuantity((prev) => (prev === 1 ? prev : prev - 1))
              }
              className="py-1.5 px-3 cursor-pointer bg-black text-white"
            >
              <Minus className="w-3 h-3" />
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="py-1.5 cursor-pointer px-3 bg-black text-white"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button className="w-full bg-black text-white py-2 text-sm rounded-full cursor-pointer">
            Add To Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
