'use client';

import {Fragment} from 'react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <Fragment>
      <aside className="flex h-screen flex-col justify-between border-e bg-indigo-50">
        <div className="px-4 py-6">
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                href="/changelog/admin/users"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-gray-700"
              >
                Users
              </Link>
            </li>

            <li>
              <Link
                href="/changelog/admin/categories"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-gray-700"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                href="/changelog/admin/changelogs"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-gray-700"
              >
                Changelogs
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </Fragment>
  );
}
