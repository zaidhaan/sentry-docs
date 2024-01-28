import {Fragment} from 'react';
import Link from 'next/link';

import {Heading} from 'sentry-docs/components/changelog/ui/Heading';
import {prisma} from 'sentry-docs/prisma';

export default async function CategoryPage({params}: {params: {id: string}}) {
  const category = await prisma.category.findUnique({
    where: {id: params.id},
  });

  if (!category) {
    return (
      <Fragment>
        <header>
          <Heading>Category not found</Heading>
        </header>
        <footer>
          <Link href="/categories">Return to Categories list</Link>
        </footer>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <header className="mt-2 mb-4">
        <Heading>Category #{category.id.substring(0, 6)}...</Heading>
      </header>

      <section className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xl mb-4">
        <span className="absolute inset-x-0 bottom-0 h-21 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-600" />
        <p className="text-gray-700 mb-4 last:mb-0">
          <strong className="text-gray-900">Name:</strong> {category.name}
        </p>
        <p className="text-gray-700 mb-4 last:mb-0">
          <strong className="text-gray-900">Slug:</strong> {category.slug}
        </p>
        <p className="text-gray-700 mb-4 last:mb-0">
          <strong className="text-gray-900">Description:</strong> {category.description}
        </p>
        <p className="text-gray-700 mb-4 last:mb-0">
          <strong className="text-gray-900">Deleted:</strong>{' '}
          {category.deleted ? 'Yes' : 'No'}
        </p>
      </section>

      <footer>
        <Link href="/categories" className="underline text-gray-500">
          Return to Categories list
        </Link>
      </footer>
    </Fragment>
  );
}
