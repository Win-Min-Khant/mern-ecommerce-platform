import type { MetaProduct, Product } from "@/types/product";
import { apiSlice } from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNewArrivals: builder.query({
            query: () => '/products/new'
        }),
        getFeatured: builder.query({
            query: () => '/products/featured'
        }),
        getProductDetail: builder.query<Product, string>({
            query: (id: string) => `/products/${id}`
        }),
        getProducts: builder.query({
            query: ({ keyword, category, minPrice, maxPrice, sizes, colors, sortBy }) => {
                const searchParams = new URLSearchParams();
                if (keyword) searchParams.append("keyword", keyword);
                if (category) searchParams.append("category", category);
                if (minPrice) searchParams.append("minPrice", minPrice);
                if (maxPrice) searchParams.append("maxPrice", maxPrice);
                if (sizes && sizes.length > 0) {
                    sizes.forEach((size: string) => {
                        searchParams.append("size", size)
                    });
                }
                if (colors && colors.length > 0) {
                    colors.forEach((color: string) => {
                        searchParams.append("color", color)
                    });
                }
                if (sortBy) searchParams.append("sortBy", sortBy);

                return `/products?${searchParams.toString()}`;
            }
        }),
        getProductsMeta: builder.query<MetaProduct, string>({
            query: () => '/products/filter/meta'
        })
    })
})

export const { useGetNewArrivalsQuery, useGetFeaturedQuery, useGetProductDetailQuery, useGetProductsQuery, useGetProductsMetaQuery } = productApiSlice;