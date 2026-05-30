import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApiSlice";
import ProductList from "../components/products/ProductList";

function Home() {
  const { data: newArrivals, isLoading: isNewLoading } =
    useGetNewArrivalsQuery(undefined);
  const { data: featured, isLoading: isFeaturedLoading } =
    useGetFeaturedQuery(undefined);

  if (isNewLoading || isFeaturedLoading) {
    return <div className="text-center my-20">Loading Products...</div>;
  }

  return (
    <main className="my-20 px-4 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-xl text-center font-bold uppercase mb-10">
          New Arrivals
        </h1>
        <ProductList products={newArrivals} />
      </section>
      <section className="mx-auto max-w-6xl mt-20">
        <h1 className="text-xl text-center font-bold uppercase mb-10">
          Best Deals
        </h1>
        <ProductList products={featured} />
      </section>
    </main>
  );
}

export default Home;
