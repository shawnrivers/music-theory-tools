import { useRouter } from 'next/router';
import classnames from 'classnames';
import { LinkTo } from 'components/LinkTo';

const NAV_ITEMS = [
  {
    label: 'Home',
    page: '/',
  },
  {
    label: 'Chord',
    page: '/chord',
  },
  {
    label: 'Key',
    page: '/key',
  },
] as const;

export const Header: React.VFC = () => {
  const { pathname } = useRouter();

  console.log(pathname);

  return (
    <header className="block h-16 px-4 mb-8 text-center">
      <nav>
        <ul className="list-none">
          {NAV_ITEMS.map(({ label, page }) => (
            <li className="inline-block px-2 py-4" key={label}>
              <LinkTo
                href={page}
                className={classnames(
                  'text-xl font-bold',
                  pathname === page ? 'text-indigo-500' : undefined,
                )}
              >
                {label}
              </LinkTo>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
