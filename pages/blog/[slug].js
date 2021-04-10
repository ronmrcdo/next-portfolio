import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Custom404 from '../404';

function BlogTemplate({ content, data, err }) {
  const frontMatter = data;

  if (err) {
    return <Custom404 />;
  }

  return (
    <>
      <section className="section--wrapper">
        <div className="section--container">
          <h1 className="page--title">{frontMatter.title}</h1>

          <div id="content--markdown" className="my-3">
            <ReactMarkdown source={content} />
          </div>
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
