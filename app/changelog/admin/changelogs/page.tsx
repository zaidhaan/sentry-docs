import {Fragment} from 'react';

import {deleteChangelog} from 'sentry-docs/actions/changelog';
import {Breadcrumbs} from 'sentry-docs/components/changelog/ui/Breadcrumbs';
import {Button} from 'sentry-docs/components/changelog/ui/Button';
import {Heading} from 'sentry-docs/components/changelog/ui/Heading';
import {prisma} from 'sentry-docs/prisma';

export default async function ChangelogsListPage() {
  const changelogs = await prisma.changelog.findMany();

  const breadcrumbs = [
    {name: 'Dashboard', href: '/'},
    {name: 'Changelogs', href: '#'},
  ];

  return (
    <Fragment>
      <Breadcrumbs elements={breadcrumbs} className="my-2" />

      <header className="flex justify-between mb-4">
        <Heading>All Changelogs</Heading>
        <Button as="a" href="/changelog/admin/changelogs/create" className="font-medium">
          New Changelog
        </Button>
      </header>

      <section className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Published At
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Content
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Published
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Deleted
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author Id
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category Id
              </th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {changelogs.length === 0 && (
              <tr>
                <td colSpan={12} className="text-center text-gray-500 py-4">
                  No changelogs found
                </td>
              </tr>
            )}

            {changelogs.map(changelog => (
              <tr key={changelog.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {new Date(changelog.publishedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-gray-700">{changelog.title}</td>
                <td className="px-4 py-2 text-gray-700">{changelog.content}</td>
                <td className="px-4 py-2 text-gray-700">
                  {changelog.published ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {changelog.deleted ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-2 text-gray-700">{changelog.authorId}</td>
                <td className="px-4 py-2 text-gray-700">{changelog.categoryId}</td>

                <td className="px-4 py-2">
                  <div className="flex gap-x-1 h-full justify-center">
                    <Button
                      as="a"
                      href={`/changelog/admin/changelogs/${changelog.id}`}
                      variant="ghost"
                      size="sm"
                      className="font-medium"
                    >
                      Show
                    </Button>
                    <Button
                      as="a"
                      href={`/changelog/admin/changelogs/${changelog.id}/edit`}
                      variant="ghost"
                      size="sm"
                      className="font-medium"
                    >
                      Edit
                    </Button>
                    <form action={deleteChangelog} className="inline-block">
                      <input type="hidden" name="id" value={changelog.id} />
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
