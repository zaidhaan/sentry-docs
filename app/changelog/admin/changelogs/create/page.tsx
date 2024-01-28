import {Fragment, Suspense} from 'react';
import Link from 'next/link';

import {createChangelog} from 'sentry-docs/actions/changelog';
import {Button} from 'sentry-docs/components/changelog/ui/Button';
import {ForwardRefEditor} from 'sentry-docs/components/changelog/ui/ForwardRefEditor';
import {Heading} from 'sentry-docs/components/changelog/ui/Heading';
import {Input} from 'sentry-docs/components/changelog/ui/Input';
import {Select} from 'sentry-docs/components/changelog/ui/Select';
import {prisma} from 'sentry-docs/prisma';

export default async function ChangelogCreatePage() {
  const authors = await prisma.user.findMany();

  const categories = await prisma.category.findMany();

  return (
    <Fragment>
      <header className="mb-4">
        <Heading>Create Changelog</Heading>
      </header>
      <form action={createChangelog} className="px-2 max-w-xl">
        <div>
          <Input
            type="datetime-local"
            label="Published At"
            name="publishedAt"
            className="mb-2"
          />
        </div>
        <div>
          <Input type="text" label="Title" name="title" className="mb-2" required />
        </div>
        <div>
          <Input type="text" label="Content" name="content" className="mb-2" />
        </div>
        <Suspense fallback={null}>
          <ForwardRefEditor markdown="Hello **world**!" />
        </Suspense>
        <div>
          <Input
            type="checkbox"
            label="Published"
            name="published"
            className="mb-2"
            required
          />
        </div>
        <div>
          <Input type="checkbox" label="Deleted" name="deleted" className="mb-2" />
        </div>
        <div>
          <Select
            name="author"
            className="mt-1 mb-2"
            label="Author"
            placeholder="Select Author"
            options={authors.map(author => ({
              label: author.id,
              value: author.id,
            }))}
          />
        </div>
        <div>
          <Select
            name="category"
            className="mt-1 mb-2"
            label="Category"
            placeholder="Select Category"
            options={categories.map(category => ({
              label: category.id,
              value: category.id,
            }))}
          />
        </div>

        <footer className="flex items-center justify-between mt-2">
          <Link href="/changelogs" className="underline text-gray-500">
            Return to Changelogs list
          </Link>

          <Button type="submit">Create</Button>
        </footer>
      </form>
    </Fragment>
  );
}
