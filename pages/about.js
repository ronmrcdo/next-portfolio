import Link from 'next/link';
import Head from 'next/head';
import TreeSkill from '../components/TreeSkill';
import { skillTree } from '../constant';

export default function About({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="relative w-full px-8">
        <div className="container mx-auto pt-10 max-w-7xl px-20">
          <h1 className="text-4xl font-bold text-gray-700">About Me</h1>
          <p className="text-gray-700 py-10 w-2/3">
            I practice the habit of learning and adapting in the fast-paced changes in technology. I
            have a background with CI/CD and also applying the best practices and technologies to my
            software development career.
          </p>
          <div className="block">
            <span className="inline-block text-gray-700 font-bold mr-1">Email Address:</span>
            <Link href="mailto:ronmercadoaa@gmail.com">
              <a className="text-blue-700">ronmercadoaa@gmail.com</a>
            </Link>
          </div>
        </div>
      </section>

      <hr className="mt-10" />

      <section className="relative w-full px-8">
        <div className="container mx-auto pt-10 max-w-7xl px-20">
          <h1 className="text-4xl font-bold text-gray-700 mb-5">Skills</h1>
          <TreeSkill menuItems={skillTree} menuParentId={0} />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const siteData = await import('../config');

  return {
    props: {
      title: siteData.default.title + ' | About'
    }
  };
}
