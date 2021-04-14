import Head from 'next/head';
import ProjectItem from '../components/ProjectItem';

const importProjects = async () => {
  const mdFiles = require
    .context('../content/projects', false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    mdFiles.map(async (path) => {
      const markdown = await import(`../content/projects/${path}`);
      return {
        ...markdown.attributes
      };
    })
  );
};

function Projects({ projects, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="section--wrapper">
        <div className="section--container">
          <h1 className="page--title">Projects</h1>

          <div className="item--list">
            {projects.map((project, index) => (
              <ProjectItem key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Projects.getInitialProps = async () => {
  const siteData = await import('../config');
  const projectFiles = await importProjects();
  const projects = projectFiles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    projects,
    title: siteData.default.title + ' | Projects'
  };
};

export default Projects;
