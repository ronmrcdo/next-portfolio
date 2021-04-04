import { useState, useEffect } from 'react';

export default function TreeSkill({ menuItems, menuParentId }) {
  const [parentMenu, setParentMenu] = useState([]);

  useEffect(() => {
    setParentMenu(menuItems
      .filter(item => item.parentId === menuParentId));
  }, []);

  return (
    <ul className="pl-10 list-disc leading-loose">
      {parentMenu.map((item, index) => (
        <li key={index}>
          {!item.hasSubMenu && <span>{item.name}</span>}
          
          {item.hasSubMenu && <span>{item.name}</span>}

          {item.hasSubMenu && <TreeSkill menuItems={menuItems} menuParentId={item.id} />}
        </li>
      ))}
    </ul>
  )
}