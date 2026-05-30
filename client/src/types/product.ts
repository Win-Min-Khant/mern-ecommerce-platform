export interface ProductImage {
    url: string;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    images: ProductImage[];
    rating_count: number;
    category: string;
    size: string[];
    color: string[];
    description: string;
}

export interface MetaProduct {
    colors: string[],
    sizes: string[],
    minPrice: number,
    maxPrice: number
}

export interface FilteredProduct {
    keyword: string;
    category: string;
    colors: string[];
    sizes: string[];
    minPrice: string;
    maxPrice: string;
}