import type { CreateProductInput } from "@/schema/product";
import ProductForm from "./ProductForm";

function ProductCreate() {
  const isLoading = false;
  const onSubmit = async (data: CreateProductInput) => {};
  return <ProductForm isLoading={isLoading} onSubmit={onSubmit} />;
}

export default ProductCreate;
