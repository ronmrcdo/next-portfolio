import Link from 'next/link';

export default function ProjectItem({ project }) {
  return (
    <Link href={project.url} passHref={true}>
      <a className="project--item" rel="noreferrer" target="_blank">
        <div className="project--card">
          <h3 className={(!project.isActive ? 'line-through' : '') + ' text-xl font-bold'}>
            {project.title}
          </h3>
          <p className="block font-regular py-5">{project.description}</p>
          <div className="flex flex-wrap w-full">
            {project.tags.map((tag, index) => (
              <div
                key={index}
                className="tag--item tag--rounded bg-blue-300">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
}
