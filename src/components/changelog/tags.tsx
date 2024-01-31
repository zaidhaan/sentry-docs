'use client';

import {useEffect, useState} from 'react';
import {type Category} from '@prisma/client';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import Tag from './tag';

export default function Tags({categories}: {categories: Category[]}) {
  const pathname = usePathname();
  const {replace} = useRouter();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const [selectedTags, setSelectedTags] = useState<Category[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const tags = params.get('tags')?.toString().split(',') || [];
    setSelectedTags(categories.filter(category => tags.includes(category.name)));
  }, [searchParams, categories]);

  const handleClick = (category: Category) => {
    const params = new URLSearchParams(searchParams);
    let length = 0;
    params.set('page', '1');
    if (selectedTags.includes(category)) {
      setSelectedTags(selectedTags.filter(t => t !== category));
      const newTags = selectedTags.filter(t => t !== category).map(t => t.name);
      params.set('tags', newTags.join(','));
      length = newTags.length;
    } else {
      setSelectedTags([...selectedTags, category]);
      const newTags = [...selectedTags, category].map(t => t.name);
      params.set('tags', newTags.join(','));
      length = newTags.length;
    }
    if (length === 0) {
      params.delete('tags');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return categories.map(category => {
    return (
      <a onClick={() => handleClick(category)} key={category.id}>
        <Tag text={category.name} active={selectedTags.includes(category)} pointer />
      </a>
    );
  });
}
