import {Fragment} from 'react';
import Link from 'next/link';

import {editCategory} from 'sentry-docs/actions/category';
import {Button} from 'sentry-docs/components/changelog/ui/Button';
import {Heading} from 'sentry-docs/components/changelog/ui/Heading';
import {Input} from 'sentry-docs/components/changelog/ui/Input';
import {Select} from 'sentry-docs/components/changelog/ui/Select';
import {prisma} from 'sentry-docs/prisma';

export default async function CategoryEditPage({params}: {params: {id: string}}) {
  const category = await prisma.category.findUnique({
    where: {id: params.id},
    include: {
      changelogs: true,
    },
  });

  const changelogs = await prisma.changelog.findMany();

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
      <header className="mb-4">
        <Heading>Edit Category</Heading>
      </header>
      <form action={editCategory} className="px-2 max-w-xl">
        <div>
          <Input
            type="text"
            label="Name"
            name="name"
            className="mb-2"
            defaultValue={category.name}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            label="Slug"
            name="slug"
            className="mb-2"
            defaultValue={category.slug}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            label="Description"
            name="description"
            className="mb-2"
            defaultValue={category.description}
          />
        </div>
        <div>
          <Input
            type="checkbox"
            label="Deleted"
            name="deleted"
            className="mb-2"
            defaultChecked={category.deleted === true}
            required
          />
        </div>
        <div>
          <Select
            name="changelogs"
            className="mt-1 mb-2"
            label="Changelogs"
            placeholder="Select Changelogs"
            defaultValue={category.changelogs.map(changelog => ({
              label: changelog.id,
              value: changelog.id,
            }))}
            isMulti
            options={changelogs.map(changelog => ({
              label: changelog.id,
              value: changelog.id,
            }))}
          />
        </div>

        <input type="hidden" name="id" value={category.id} />

        <footer className="flex items-center justify-between mt-2">
          <Link href="/categories" className="underline text-gray-500">
            Return to Categories list
          </Link>

          <Button type="submit">Update</Button>
        </footer>
      </form>
    </Fragment>
  );
}
