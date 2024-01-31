import {Fragment, Suspense} from 'react';
import * as Sentry from '@sentry/nextjs';
import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

import List from 'sentry-docs/components/changelog/list';
import Pagination from 'sentry-docs/components/changelog/pagination';
import Search from 'sentry-docs/components/changelog/search';
import Tags from 'sentry-docs/components/changelog/tags';
import {prisma} from 'sentry-docs/prisma';

const ENTRIES_PER_PAGE = 10;

export default async function ChangelogList({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const matchingCategories = await prisma.category.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  const matchingCategoryIds = matchingCategories.map(category => category.id);
  const totalCount = await prisma.changelog.count();
  const categories = await prisma.category.findMany();
  const changelogs = await prisma.changelog.findMany({
    include: {
      categories: true,
    },
    where: {
      published: true,
      OR: [
        {title: {contains: query}},
        {summary: {contains: query}},
        {content: {contains: query}},
        {categories: {some: {id: {in: matchingCategoryIds}}}},
      ],
    },
    orderBy: {
      publishedAt: 'desc',
    },
    skip: (currentPage - 1) * ENTRIES_PER_PAGE,
    take: 10,
  });

  // iterate over all posts and create a list of months & years
  const months = changelogs.reduce((allMonths: any, post: any) => {
    const date = post.publishedAt as Date;
    const year = date.getFullYear();
    const month = date.toLocaleString('default', {
      month: 'long',
    });
    const monthYear = `${month} ${year}`;
    return [...new Set([...allMonths, monthYear])];
  }, []);

  const monthsCopy = [...months];

  const pagination = {
    currentPage,
    totalPages: totalCount / ENTRIES_PER_PAGE,
  };

  return (
    <Fragment>
      <div className="w-full mx-auto h-96 relative bg-darkPurple">
        <div className="relative w-full lg:max-w-7xl mx-auto px-4 lg:px-8 pt-8 grid grid-cols-12 items-center">
          <Image
            className="justify-self-center col-span-10 z-20 hidden lg:block"
            src="/changelog/assets/hero.png"
            alt="Sentry Changelog"
            height={400}
            width={450}
          />
          <div className="relative col-span-12 mt-32 lg:absolute lg:w-96 lg:right-1/4 lg:-bottom-2">
            <h1 className="justify-self-center text-white font-bold text-4xl text-center lg:text-left">
              Sentry Changelog
            </h1>
            <h2 className="justify-self-center z-20 text-gold text-1xl text-center lg:text-left">
              Stay up to date on everything big and small, from product updates to SDK
              changes with the Sentry Changelog.
            </h2>
          </div>
        </div>
        <div className="hero-bottom-left-down-slope absolute bottom-0 w-full h-10 bg-gray-200" />
      </div>
      <div className="w-full mx-auto grid grid-cols-12 bg-gray-200">
        <div className="hidden md:block md:col-span-2 pl-5 pt-10">
          <h3 className="text-2xl text-primary font-semibold mb-2">Categories:</h3>
          <div className="flex flex-wrap gap-1 py-1">
            <Tags categories={categories} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="max-w-3xl mx-auto px-4 pb-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center py-6 space-x-4">
              <Search placeholder="Search..." />
              <div className="flex space-x-4">
                <Link className="text-gray-500 hover:text-gray-700" href="#">
                  Twitter
                </Link>
              </div>
            </div>

            <Suspense
              key={
                query + searchParams + months
              } /* fallback={<InvoicesTableSkeleton />} */
            >
              <List changelogs={changelogs} months={months} />
            </Suspense>
            {/* {!filteredBlogPosts.length && (
              <div className="flex items-center my-4">
                <div className="flex-1 border-t-[1px] border-gray-400" />
                <span className="px-3 text-gray-500">No posts found.</span>
                <div className="flex-1 border-t-[1px] border-gray-400" />
              </div>
            )} */}

            {/* {pagination && pagination.totalPages > 1 && !searchValue && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )} */}
          </div>
        </div>
        <div className="hidden md:block md:col-span-2 pl-5 pt-10">
          <h3 className="text-1xl text-primary font-semibold mb-2">Jump to:</h3>
          <ul>
            {/* {monthsCopy.map((month, index) => (
              <li key={index}>
                <a
                  className={`text-primary hover:text-purple-900 hover:font-extrabold ${selectedMonth === month ? 'underline' : ''}`}
                  href={`#${month}`}
                  onClick={e => {
                    e.preventDefault();
                    if (selectedMonth === month) {
                      setSelectedMonth(null);
                    } else {
                      setSelectedMonth(month);
                    }
                  }}
                >
                  {month}
                </a>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export function generateMetadata(): Metadata {
  return {
    description:
      'Stay up to date on everything big and small, from product updates to SDK changes with the Sentry Changelog.',
    other: {
      'sentry-trace': Sentry.getActiveSpan()?.toTraceparent(),
    },
  };
}
