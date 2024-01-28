import {Sidebar} from 'sentry-docs/components/changelog/Sidebar';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-4 pb-2 pt-16 lg:pt-2 min-h-screen w-screen flex flex-col">
        {children}
      </main>
    </div>
  );
}
