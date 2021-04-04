class Skill {
  constructor(id, name, hasSubMenu = false, parentId = 0) {
    this.id = id;
    this.name = name;
    this.hasSubMenu = hasSubMenu;
    this.parentId = parentId;
  }
}

export const skillTree = [
  new Skill(1, 'PHP', true, 0),
  new Skill(1.1, 'Laravel/Lumen', false, 1),
  new Skill(1.2, 'PHPUnit', false, 1),

  new Skill(2, 'JavaScript', true, 0),
  new Skill(2.1, 'TypeScript', false, 2),
  new Skill(2.2, 'Angular', true, 2),
  new Skill(2.3, 'NGXS', false, 2.2),
  new Skill(2.4, 'RxJs', false, 2.2),

  new Skill(3, 'Vue', true, 2),
  new Skill(3.1, 'Vuex', false, 3),
  new Skill(3.2, 'Nuxt', false, 3),

  new Skill(4, 'React', true, 2),
  new Skill(4.1, 'Gatsby', false, 4),
  new Skill(4.2, 'Next.js', false, 4),

  new Skill(5, 'Karma.js', false, 2),
  new Skill(6, 'Jest', false, 2),

  new Skill(7, 'NodeJs', true, 0),
  new Skill(7.1, 'Express', false, 7),

  new Skill(8, 'Linux', false, 0),
  new Skill(9, 'Docker', true, 0),
  new Skill(9.1, 'Docker Swarm', false, 9),

  new Skill(10, 'Test Driven Development', false, 0)
];
