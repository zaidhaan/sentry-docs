'use client';

import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

export default function Search({placeholder}: {placeholder: string}) {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const pathname = usePathname();
  const {replace} = useRouter();
  let timeoutId: NodeJS.Timeout | null = null;

  function handleSearch(term: string) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
  }

  return (
    <input
      aria-label={placeholder}
      type="text"
      placeholder={placeholder}
      defaultValue={searchParams.get('query')?.toString()}
      className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500"
      onChange={e => {
        handleSearch(e.target.value);
      }}
    />
  );
}
