import {Fragment} from 'react';

import {deleteCategory} from 'sentry-docs/actions/category';
import {Breadcrumbs} from 'sentry-docs/components/changelog/ui/Breadcrumbs';
import {Button} from 'sentry-docs/components/changelog/ui/Button';
import {Heading} from 'sentry-docs/components/changelog/ui/Heading';
import {prisma} from 'sentry-docs/prisma';

export default async function CategoriesListPage() {
  const categories = await prisma.category.findMany();

  const breadcrumbs = [
    {name: 'Dashboard', href: '/'},
    {name: 'Categories', href: '#'},
  ];

  return (
    <Fragment>
      <Breadcrumbs elements={breadcrumbs} className="my-2" />

      <header className="flex justify-between mb-4">
        <Heading>All Categories</Heading>
        <Button as="a" href="/changelog/admin/categories/create" className="font-medium">
          New Category
        </Button>
      </header>

      <section className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Slug
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Deleted
              </th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No categories found
                </td>
              </tr>
            )}

            {categories.map(category => (
              <tr key={category.id}>
                <td className="px-4 py-2 text-gray-700">{category.name}</td>
                <td className="px-4 py-2 text-gray-700">{category.slug}</td>
                <td className="px-4 py-2 text-gray-700">{category.description}</td>
                <td className="px-4 py-2 text-gray-700">
                  {category.deleted ? 'Yes' : 'No'}
                </td>

                <td className="px-4 py-2">
                  <div className="flex gap-x-1 h-full justify-center">
                    <Button
                      as="a"
                      href={`/changelog/admin/categories/${category.id}`}
                      variant="ghost"
                      size="sm"
                      className="font-medium"
                    >
                      Show
                    </Button>
                    <Button
                      as="a"
                      href={`/changelog/admin/categories/${category.id}/edit`}
                      variant="ghost"
                      size="sm"
                      className="font-medium"
                    >
                      Edit
                    </Button>
                    <form action={deleteCategory} className="inline-block">
                      <input type="hidden" name="id" value={category.id} />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="font-medium text-red-600 hover:bg-red-100 disabled:bg-red-100"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Fragment>
  );
}
