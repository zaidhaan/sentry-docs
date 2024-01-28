import {Fragment} from 'react';
import Link from 'next/link';

import {createCategory} from 'sentry-docs/actions/category';
import {Button} from 'sentry-docs/components/changelog/ui/Button';
import {Heading} from 'sentry-docs/components/changelog/ui/Heading';
import {Input} from 'sentry-docs/components/changelog/ui/Input';
import {Select} from 'sentry-docs/components/changelog/ui/Select';
import {prisma} from 'sentry-docs/prisma';

export default async function CategoryCreatePage() {
  const changelogs = await prisma.changelog.findMany();

  return (
    <Fragment>
      <header className="mb-4">
        <Heading>Create Category</Heading>
      </header>
      <form action={createCategory} className="px-2 max-w-xl">
        <div>
          <Input type="text" label="Name" name="name" className="mb-2" required />
        </div>
        <div>
          <Input type="text" label="Slug" name="slug" className="mb-2" required />
        </div>
        <div>
          <Input type="text" label="Description" name="description" className="mb-2" />
        </div>
        <div>
          <Input type="checkbox" label="Deleted" name="deleted" className="mb-2" />
        </div>
        <div>
          <Select
            name="changelogs"
            className="mt-1 mb-2"
            label="Changelogs"
            placeholder="Select Changelogs"
            isMulti
            options={changelogs.map(changelog => ({
              label: changelog.id,
              value: changelog.id,
            }))}
          />
        </div>

        <footer className="flex items-center justify-between mt-2">
          <Link href="/categories" className="underline text-gray-500">
            Return to Categories list
          </Link>

          <Button type="submit">Create</Button>
        </footer>
      </form>
    </Fragment>
  );
}
