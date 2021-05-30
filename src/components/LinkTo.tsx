// https://gist.github.com/zackdotcomputer/d7af9901e7db87364aad7fbfadb5c99b
import Link, { LinkProps } from 'next/link';

type PropTypes = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export const LinkTo: React.VFC<PropTypes> = props => {
  const {
    children,
    href,
    as,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...anchorProps
  } = props;

  return (
    <Link {...{ href, as, replace, scroll, shallow, prefetch, locale }}>
      <a {...anchorProps}>{children}</a>
    </Link>
  );
};
