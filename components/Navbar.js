import Link from 'next/link';
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  
  return (
    <header className="relative w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-wrap items-center justify-between py-10 px-20 mx-auto max-w-7xl md:flex-row">
        <h2 className="relative z-10 flex items-center w-auto leading-none select-none text-2xl font-bold tracking-tight text-gray-700 space-x-2">
          <span>Hi, I&rsquo;m Ron</span>
          <span className="inline-block animate-wiggle" role="img" aria-label="hand waving">
            👋
          </span>
        </h2>

        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            <Link href="/">
              <a 
                className={(router.pathname === '/' ? 'text-blue-700 text-bold'
                  : '') + 
                  "text-gray-700 px-3 py-2 rounded-md text-medium font-medium hover:text-blue-700 hover:text-bold transition duration-500 ease-in-out"
                }
              >
                Home
              </a>
            </Link>

            <Link href="/about">
              <a 
                className={(router.pathname === '/about' ? 'text-blue-700 text-bold'
                  : '') + 
                  "text-gray-700 px-3 py-2 rounded-md text-medium font-medium hover:text-blue-700 hover:text-bold transition duration-500 ease-in-out"
                }
              >
                About
              </a>
            </Link>

            <Link href="/blog">
              <a 
                className={(router.pathname === '/blog' ? 'text-blue-700 text-bold'
                  : '') + 
                  "text-gray-700 px-3 py-2 rounded-md text-medium font-medium hover:text-blue-700 hover:text-bold transition duration-500 ease-in-out"
                }
              >
                Blog
              </a>
            </Link>

            <Link href="/projects">
              <a 
                className={(router.pathname == '/projects' ? 'text-blue-700 text-bold'
                  : '') + 
                  "text-gray-700 px-3 py-2 rounded-md text-medium font-medium hover:text-blue-700 hover:text-bold transition duration-500 ease-in-out"
                }
              >
                Projects
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
