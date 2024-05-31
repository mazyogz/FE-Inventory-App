import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/router";

const products = [
  {
    id: 1,
    name: "Artwork Tee",
    href: "#",
    price: "$32.00",
    color: "Mint",
    size: "Medium",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg",
    imageAlt: "Front side of mint cotton t-shirt with wavey lines pattern.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Charcoal",
    inStock: false,
    leadTime: "7-8 years",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front side of charcoal cotton t-shirt.",
  },
  // More products...
];

export default function Example() {
  const [cartData, setCartData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    const isLoggedInSessionStorage = sessionStorage.getItem("isLoggedIn");

    if (isLoggedInLocalStorage || isLoggedInSessionStorage) {
      setIsLoggedIn(true);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    } else {
      const fetchData = async () => {
        try {
          let accessToken = null;

          if (typeof window !== "undefined") {
            // Check if running on the client side
            const cookiesArray = document.cookie.split("; ");
            const accessTokenCookie = cookiesArray.find((cookie) =>
              cookie.startsWith("accessToken=")
            );

            if (accessTokenCookie) {
              accessToken = accessTokenCookie.split("=")[1];
            }

            const response = await fetch(`http://localhost:5000/api/v1/cart`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            });

            const data = await response.json();
            setCartData(data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn]);

  console.log(cartData);

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cartData && cartData.length > 0 ? (
                  cartData.map((cart) => (
                    <li key={cart.id} className="flex py-6">
                      <div className="flex-shrink-0">
                        <img
                          src={cart.product.image}
                          alt={cart.product.name}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <a
                                href={cart.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {cart.product.name}
                              </a>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              {cart.price}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {cart.color}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {cart.size}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-1 items-end justify-between">
                          <p className="flex items-center space-x-2 text-sm text-gray-700">
                            {cart.inStock ? (
                              <CheckIcon
                                className="h-5 w-5 flex-shrink-0 text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ClockIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-300"
                                aria-hidden="true"
                              />
                            )}

                            <span>
                              {cart.inStock
                                ? "In stock"
                                : `Will ship in ${cart.leadTime}`}
                            </span>
                          </p>
                          <div className="ml-4">
                            <button
                              type="button"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
              </ul>
            </section>

            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      $96.00
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm">
                <p>
                  or
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </p>
              </div>
            </section>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
