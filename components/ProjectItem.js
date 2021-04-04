import Link from 'next/link';

export default function ProjectItem({ project }) {
  return (
    <Link href={project.url} passHref={true}>
      <a className="px-2 mb-4 flex flex-col w-2/3 my-2" rel="noreferrer" target="_blank">
        <div className="w-full bg-white rounded-md shadow-sm border p-6 hover:shadow-lg transition duration-300 ease-in-out">
          <h3 className={(!project.isActive ? 'line-through' : '') + ' text-xl font-bold'}>
            {project.title}
          </h3>
          <p className="block font-regular py-5">{project.description}</p>
          <div className="flex flex-wrap w-full">
            {project.tags.map((tag, index) => (
              <div
                key={index}
                className="rounded-full bg-blue-300 text-sm text-white py-2 px-3 font-bold mx-1">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
}
