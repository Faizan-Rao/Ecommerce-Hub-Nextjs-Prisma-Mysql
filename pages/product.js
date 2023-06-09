import ProductCard from "@/components/User/ProductCard";
import {
  useDynamicSearchQuery,
  useGetAllProductQuery,
} from "@/services/userApiSlice";
import React, { useDeferredValue, useState } from "react";

const Products = () => {
  const { data: AllProduct, isLoading: isLoadingAll } = useGetAllProductQuery();
  const [search, setSearch] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });
  const deferredSearch = useDeferredValue(search);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const { data: SearchProduct, isLoading: isLoadingSearch } =
    useDynamicSearchQuery(deferredSearch);

  return (
    <>
      {/* Product Searching */}
      <div className="flex item-center justify-center gap-8 flex-wrap m-5">
        <div className="flex items-center gap-2">
          {" "}
          <span>Search: </span>
          <input
            type="search"
            onChange={handleChange}
            className="p-1 rounded-lg outline-none inline-block border-2"
            name="search"
            id="search"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <span>Min: </span>
          <input
            type="number"
            className="p-1 rounded-lg outline-none inline-block border-2"
            onChange={handleChange}
            name="minPrice"
            placeholder="0"
            id=""
          />
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <span>Max: </span>
          <input
            type="number"
            className="p-1 rounded-lg outline-none inline-block border-2"
            onChange={handleChange}
            name="maxPrice"
            placeholder="0"
            id=""
            
          />
        </div>
      </div>
      {/* All Product Grid */}
      <div className="m-5 ">
        <h1 className="text-3xl p-5">Products</h1>
      </div>
      {SearchProduct?.data?.length <= 0 && (
        <div
          className={"flex items-center justify-around flex-wrap gap-4 my-4 "}
        >
          {isLoadingAll ? (
            <p>Loading</p>
          ) : (
            AllProduct?.data?.map((e) => {
              return <ProductCard key={e.product_id} data={e} />;
            })
          )}
        </div>
      )}
      {SearchProduct && (
        <div
          className={"flex items-center justify-around  flex-wrap gap-4 my-4 "}
        >
          {isLoadingSearch ? (
            <p>Loading</p>
          ) : (
            SearchProduct?.data?.map((e) => {
              return <ProductCard key={e.product_id} data={e} />;
            })
          )}
        </div>
      )}
    </>
  );
};

export default Products;
