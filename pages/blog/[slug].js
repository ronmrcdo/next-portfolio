import Head from 'next/head';
import Custom404 from '../404';

function BlogTemplate({ attributes, html, err }) {
  if (err) {
    return <Custom404 />;
  }

  const { title, description, keywords } = attributes;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <section className="section--wrapper">
        <div className="section--container">
          <h1 className="page--title">{title}</h1>

          <article id="content--markdown" className="my-3">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </div>
      </section>
    </>
  );
}

BlogTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;

  try {
    const data = await import(`../../content/blog/${slug}.md`);

    return data;
  } catch (err) {
    return {
      err: {
        statusCode: 404
      }
    };
  }
};

export default BlogTemplate;
