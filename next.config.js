const path = require('path');
const fs = require('fs');

const BLOG_PATH = './content/blog';
const PROJECT_PATH = './content/projects';

const getBlogPath = () => {
  return fs
    .readdirSync(BLOG_PATH)
    .map((blogName) => {
      const trimmed = blogName.substring(0, blogName.length - 3);
      return {
        [`/blog/${trimmed}`]: {
          page: '/blog/[slug]',
          query: {
            slug: trimmed
          }
        }
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

const getProjectsPath = () => {
  return fs
    .readdirSync(PROJECT_PATH)
    .map((project) => {
      const trimmed = project.substring(0, project.length - 3);
      return {
        [`/projects/${trimmed}`]: {
          page: '/projects/[slug]',
          query: {
            slug: trimmed
          }
        }
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader'
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
      ...getBlogPath,
      ...getProjectsPath
    };
  }
};
