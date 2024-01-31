'use client';

import {useState} from 'react';
import {type Category} from '@prisma/client';

import Tag from './tag';

export default function Tags({categories}: {categories: Category[]}) {
  const [selectedTags, setSelectedTags] = useState<Category[]>([]);

  return categories.map(category => {
    return (
      <a
        onClick={() => {
          if (selectedTags.includes(category)) {
            setSelectedTags(selectedTags.filter(t => t !== category));
          } else {
            setSelectedTags([...selectedTags, category]);
          }
        }}
        key={category.id}
      >
        <Tag text={category.name} active={selectedTags.includes(category)} pointer />
      </a>
    );
  });
}
