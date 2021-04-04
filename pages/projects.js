import { useState, useEffect } from 'react';
import Head from 'next/head';
import { projects } from '../constant';
import ProjectItem from '../components/ProjectItem';

export default function Projects({ title }) {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    setProjectList(projects.sort((a, b) => b.id - a.id));
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="relative w-full px-8">
        <div className="container mx-auto pt-10 max-w-7xl px-20">
          <h1 className="text-4xl font-bold text-gray-700">Projects</h1>

          <div className="w-full flex flex-col justify-center items-center py-10">
            {projectList.map((project, index) => (
              <ProjectItem key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const siteData = await import('../config');

  return {
    props: {
      title: siteData.default.title + ' | Projects'
    }
  };
}
