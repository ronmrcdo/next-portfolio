import Head from 'next/head';
import BlogItem from '../../components/BlogItem';

const importBlogs = async () => {
  const mdFiles = require
    .context('../../content/blog', false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    mdFiles.map(async (path) => {
      const markdown = await import(`../../content/blog/${path}`);
      return {
        ...markdown.attributes,
        slug: path.substring(0, path.length - 3)
      };
    })
  );
};

function Blog({ blogs, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="section--wrapper">
        <div className="section--container">
          <h1 className="page--title">Blog</h1>

          <div className="item--list">
            {blogs.map((blog, index) => (
              <BlogItem key={index} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Blog.getInitialProps = async () => {
  const siteData = await import('../../config');
  const blogFiles = await importBlogs();
  const blogs = blogFiles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    blogs,
    title: siteData.default.title + ' | Blog'
  };
};

export default Blog;
