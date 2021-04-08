import Link from 'next/link';
import Tag from './Tag';

export default function ProjectItem({ project }) {
  return (
    <Link href={project.url} passHref={true}>
      <a className="item--wrapper" rel="noreferrer" target="_blank">
        <div className="item--card">
          <h3 className={(!project.isActive ? 'line-through' : '') + ' text-xl font-bold'}>
            {project.title}
          </h3>
          <p className="block py-5">{project.description}</p>
          <div className="flex flex-wrap w-full">
            {project.tags.map((tag, index) => (
              <Tag key={index} title={tag} />
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
}
