'use client';
import {Fragment, useEffect, useState} from 'react';
import {type Category} from '@prisma/client';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

export default function Tags({months}: {months: any}) {
  const pathname = usePathname();
  const {replace} = useRouter();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const month = params.get('before')?.toString() || '';
    setSelectedMonth(month);
  }, [searchParams]);

  const handleClick = (pickedMonth: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (pickedMonth === selectedMonth) {
      setSelectedMonth('');
      params.delete('before');
    } else {
      setSelectedMonth(pickedMonth);
      params.set('before', pickedMonth);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Fragment>
      <h3 className="text-1xl text-primary font-semibold mb-2">Jump to:</h3>
      <ul>
        {months.map((month, index) => (
          <li key={index}>
            <a
              className={`text-primary hover:text-purple-900 hover:font-extrabold ${selectedMonth === month ? 'underline' : ''}`}
              onClick={() => handleClick(month)}
            >
              {month}
            </a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
