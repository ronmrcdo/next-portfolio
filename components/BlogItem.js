import Link from 'next/link';
import Tag from './Tag';

export default function BlogItem({ blog }) {
  return (
    <Link href={'/blog/' + blog.slug} passHref={true}>
      <a className="item--wrapper">
        <div className="item--card">
          <h3 className="text-2xl font-bold text-gray-700">{blog.title}</h3>
          <div>
            <span className="text-sm text-gray-500 font-bold inline-block mr-2">
              Date Published:
            </span>
            <span className="text-sm text-gray-600">{blog.date}</span>
          </div>
          <p className="block py-5 text-gray-500">{blog.description}</p>
          <div className="flex flex-wrap w-full">
            {blog.keywords.split(',').map((keyword, index) => (
              <Tag key={index} title={keyword} />
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
}
