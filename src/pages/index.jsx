import { fetchProductData } from "@/pages/api/product/product";
import React, { useRef } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useRouter } from 'next/router';


export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const productData = await fetchProductData(page);
  return {
    props: {
      productData,
      currentPage: parseInt(page, 10)
    },
  };
}

export default function Home({ productData, currentPage  }) {
  console.log({ productData });
  const productsSectionRef = useRef(null);
  const router = useRouter();

  const scrollToProducts = () => {
    productsSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePageChange = (page) => {
    router.push(`/?page=${page}`);
  };
  return (
    <>
      <Navbar />

      <div ref={productsSectionRef} className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {productData.data.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover object-center"
                    alt={product.name}
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{product.price}</p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-sm italic text-gray-500">
                      {product.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            
          </div>
          <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Next
              </button>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
