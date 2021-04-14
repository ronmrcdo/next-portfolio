import Head from 'next/head';
import content from '../content/about.md';

export default function About({ title }) {
  const { attributes, html } = content;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="section--wrapper">
        <div className="section--container">
          <h1 className="page--title">{attributes.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const siteData = await import('../config');

  return {
    props: {
      title: siteData.default.title + ' | About',
      email: siteData.default.author.email
    }
  };
}
