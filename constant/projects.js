class Project {
  constructor(id, title, description, url, tags = [], isActive = true) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.url = url;
    this.tags = tags;
    this.isActive = isActive;
  }
}

export const projects = [
  new Project(
    1,
    'Laravel Inventory',
    'A package the provides the product database design and inventory.',
    'https://github.com/ronmrcdo/laravel-inventory',
    ['Laravel', 'Lumen', 'Product Variation', 'Inventory', 'Package'],
    false
  ),

  new Project(
    2,
    'Nuxt Tailwindcss Landing Starter',
    'Starter landing page built using Nuxt and Tailwindcss',
    'https://github.com/ronmrcdo/nuxt-tailwind-landing',
    ['Nuxt', 'Vue', 'Tailwindcss', 'Landing Page']
  ),

  new Project(
    3,
    'My Portfolio',
    'I made my portfolio an open sourced built using Next.js, Tailwindcss, Sass, and etc.',
    'https://github.com/ronmrcdo/next-portfolio',
    ['Next.js', 'Tailwindcss', 'Portfolio', 'SCSS']
  )
];
