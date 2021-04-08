import Link from 'next/link';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react'
import { useState } from 'react';
import { menuItems } from '../constant';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setMenuState] = useState(false);
  const toggle = () => setMenuState(!isMenuOpen);

  return (
    <header className="header--wrapper">
      <div className="header--container">
        <Link href="/">
          <a>
            <h2 className="logo">
              <span>Hi, I&rsquo;m Ron</span>
              <span className="inline-block animate-wiggle" role="img" aria-label="hand waving">
                👋
              </span>
            </h2>
          </a>
        </Link>

        <button className="inline-block md:hidden w-8 h-8 text-gray-600 p-1" onClick={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Transition
          show={isMenuOpen}
          as="nav"
          className={ (isMenuOpen 
            ? 'flex' 
            : 'hidden' 
          ) + ' navbar--mobile'}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {menuItems.map((link, index) => (
            <Link key={index} href={link.path}>
              <a
                className={
                  (router.pathname === link.path ? 'text-blue-700 text-bold' : '') +
                  ' text-gray-700 px-3 py-2 rounded-md text-medium font-medium hover:text-blue-700 hover:text-bold transition duration-500 ease-in-out'
                }
                rel="noopener noreferrer"
                aria-label={link.label}
                onClick={toggle}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </Transition>
        
        <nav className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            {menuItems.map((link, index) => (
              <Link key={index} href={link.path}>
                <a
                  className={
                    (router.pathname === link.path ? 'text-blue-700 text-bold' : '') +
                    ' text-gray-700 px-3 py-2 rounded-md text-medium font-medium hover:text-blue-700 hover:text-bold transition duration-500 ease-in-out'
                  }
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
