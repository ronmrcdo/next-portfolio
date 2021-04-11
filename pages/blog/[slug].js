import matter from 'gray-matter';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import Custom404 from '../404';

function BlogTemplate({ content, data, err }) {
  if (err) {
    return <Custom404 />;
  }

  const { title, description, keywords } = data;

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
            <ReactMarkdown source={content} />
          </article>
        </div>
      </section>
    </>
  );
}

BlogTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;

  try {
    const content = await import(`../../content/${slug}.md`);

    const data = matter(content.default);

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
