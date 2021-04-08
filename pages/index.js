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
      <section className="section--wrapper">
        <div className="section--container">
          <h1 className="page--description text-center lg:text-left">
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

      <section className="section--wrapper">
        <div className="section--container">
          <div className="social--list justify-center md:justify-start">
            {social.map((social, index) => (
              <Link key={index} href={social.url} passHref={true}>
                <a target="_blank" rel="noopener noreferrer" aria-label={social.title}>
                  <span className="social--item">
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
