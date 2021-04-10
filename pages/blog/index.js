import matter from 'gray-matter';
import BlogItem from '../../components/BlogItem';

export default function Blog({ blogs }) {
  return (
    <>
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

export async function getStaticProps() {
  const fs = require('fs');

  const files = fs.readdirSync(`${process.cwd()}/content`, 'utf-8');

  const items = files
    .filter((fn) => fn.endsWith('.md'))
    .map(async (item) => await getMetadata(item));

  /*eslint no-undef: 0*/
  const blogs = await Promise.all(items);

  return {
    props: {
      blogs
    }
  };
}

const getMetadata = async (item) => {
  const content = await import(`../../content/${item}`);

  const { data } = matter(content.default);

  const path = item.substring(0, item.lastIndexOf('.'));

  return {
    ...data,
    path
  };
};
