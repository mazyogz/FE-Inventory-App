"use client";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetail() {
  const [productDetail, setProductDetail] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false); 
  const cancelButtonRef = useRef(null);
  const productId = router.query.id
  console.log(productId)


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const response = await fetch(
            `http://localhost:5000/api/v1/product-id/${productId}`
          );
          const data = await response.json();
          setProductDetail(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  const toggleModal = (productId) => {
    setModalOpen(!isModalOpen);
    setSelectedProductId(productId);
  };
  console.log(productDetail);

  const handleAgree = async () => {
    try {
      if (selectedProductId) {
        let accessToken = null;

        const cookiesArray = document.cookie.split("; ");
        const accessTokenCookie = cookiesArray.find((cookie) =>
          cookie.startsWith("accessToken=")
        );

        if (accessTokenCookie) {
          accessToken = accessTokenCookie.split("=")[1];
        }

        if (!accessToken) {
          router.push("/auth/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/v1/add-to-cart`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_id:selectedProductId
            }),
          }
        );

        if (response.ok) {
          setSuccessDialogOpen(true);
          console.log("Order placed successfully!");
        } else {
          console.error(
            "Failed to place order:",
            response.status,
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (!productDetail) {
    return <div>Loading...</div>;
  }
  console.log(productDetail);

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Product Details
          </h1>

          <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Event number&nbsp;</dt>
              <dd className="font-medium text-gray-900">
                {productDetail.data.id}
              </dd>
              <dt>
                <span className="sr-only">Date</span>
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &middot;
                </span>
              </dt>
            </dl>
          </div>

          <div className="mt-8">
            <h2 className="sr-only">Products purchased</h2>
            <div className="space-y-24">
              <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
                <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={productDetail.data.image}
                      alt={productDetail.data.name}
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    <p>{productDetail.data.name}</p>
                  </h3>
                  <p className="mt-1 font-medium text-gray-900">
                    {productDetail.data.name}
                  </p>
                  <p className="mt-3 text-gray-500">{productDetail.data.description}</p>
                </div>
                <div className="sm:col-span-12 md:col-span-7">
                  <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-4 sm:grid-cols-2 sm:gap-x-6 sm:py-4 md:py-4">
                  </dl>
                  <p className="mt-6 font-medium text-gray-900 md:mt-10">
                    Checkout {productDetail.data.name} sekarang 
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <button
                key={productDetail.data.id}
                onClick={() => {
                  if (productDetail.data.id !== "Sold Out") {
                    toggleModal(productDetail.data.id);
                  }
                }}
                disabled={productDetail.data.id === "Sold Out"}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                {isModalOpen && (
                  <div
                    className="relative z-10"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                  />
                                </svg>
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3
                                  className="text-base font-semibold leading-6 text-gray-900"
                                  id="modal-title"
                                >
                                  Lakukan Transaksi
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Anda akan melanjutkan transaksi, {productDetail.data.name} yang
                                    anda pilih akan dimasukkan kedalam keranjang
                                    dan menunggu pembayaran.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                              onClick={handleAgree}
                            >
                              Setuju
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="w-0 flex-1">
                      <dl>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Rp.{productDetail.data.price},00
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div className="flex-shrink-0">
                      {productDetail.data.id === "Sold Out" ? (
                        <XCircleIcon
                          className="h-6 w-6 text-red-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircleIcon
                          className="h-6 w-6 text-green-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            
          </div>
        </div>
      </div>

      <Transition.Root show={successDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setSuccessDialogOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Pemesanan Berhasil
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Pemesanan {productDetail.data.name}{" "}
                          {productDetail.data.name} berhasil
                          ditambahkan, silakan cek pada laman pemesanan untuk
                          melanjutkan pembayaran.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => {
                        setSuccessDialogOpen(false);
                        router.push("/cart");
                      }}
                    >
                      Lihat Pesanan
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setSuccessDialogOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Batal
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Footer />
    </>
  );
}

export default ProductDetail;
