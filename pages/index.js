import Link from 'next/link';
import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faGithub, faLinkedin);

export default function Home({ title, social }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="relative w-full px-8">
        <div className="container mx-auto pt-10 max-w-7xl px-20">
          <h1 className="w-3/4 text-4xl font-regular text-gray-700 pt-20 pb-10">
            <span className="inline-block" role="img" aria-label="palette">
              🎨
            </span>
            &nbsp;
            <span className="inline-block font-bold text-gradient bg-gradient-to-r from-blue-500 via-purple-700 to-blue-600">
              A Web Artisan
            </span>
            &nbsp;who loves to work with various kinds of project and stuff.
          </h1>
        </div>
      </section>

      <section className="relative w-full px-8">
        <div className="container mx-auto max-w-7xl px-20">
          <div className="flex space-x-4">
            {social.map((social, index) => (
              <Link key={index} href={social.url} passHref={true}>
                <a target="_blank" rel="noopener noreferrer" aria-label={social.title}>
                  <span className="h-6 w-6 flex items-center justify-center text-gray-700 hover:text-blue-700 transition duration-500 ease-in-out">
                    <FontAwesomeIcon icon={['fab', social.icon]} />
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const siteData = await import('../config');

  return {
    props: {
      title: siteData.default.title + ' | Home',
      social: siteData.default.social || []
    }
  };
}
