// components/layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <Link href="/">
          My Blog
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}