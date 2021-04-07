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
      <section className="section--layout">
        <div className="section--container">
          <h1 className="page--title">Projects</h1>

          <div className="project--list">
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
