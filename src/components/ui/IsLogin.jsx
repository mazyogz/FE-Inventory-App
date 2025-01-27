import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IsLoginUi() {
    const router = useRouter(); 
    
    const handleLogout = async () => {
        try {
          sessionStorage.removeItem("isLoggedIn");
          sessionStorage.removeItem("userData");
          sessionStorage.removeItem("accessToken");
          Cookies.remove("accessToken");
          router.push("/");
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Akun
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/cart"
                  className={classNames(
                    active ? 'bg-gray-100 text-black-900' : 'text-black-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Cart
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="/">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-right text-sm'
                    )}
                  >
                    Keluar
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
