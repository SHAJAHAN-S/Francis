import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { BreadcrumbSchema } from './SchemaMarkup';

const pathLabels: Record<string, string> = {
  about: 'About Us',
  academics: 'Academics',
  admissions: 'Admissions',
  faculty: 'Faculty',
  gallery: 'Gallery',
  news: 'News & Updates',
  events: 'Events',
  contact: 'Contact',
  alumni: 'Alumni',
  blog: 'Blog',
  'virtual-tour': 'Virtual Tour',
  portal: 'Parent Portal',
  'pay-fees': 'Pay Fees',
  'privacy-policy': 'Privacy Policy',
  sitemap: 'Sitemap',
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  if (pathParts.length === 0) return null;

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...pathParts.map((part, index) => ({
      name: pathLabels[part] || part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      url: '/' + pathParts.slice(0, index + 1).join('/'),
    })),
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm font-body flex-wrap">
            <li>
              <Link to="/" className="text-gray-mid hover:text-primary transition-colors flex items-center gap-1">
                <FiHome size={14} />
                <span>Home</span>
              </Link>
            </li>
            {pathParts.map((part, index) => {
              const path = '/' + pathParts.slice(0, index + 1).join('/');
              const isLast = index === pathParts.length - 1;
              const label = pathLabels[part] || part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              return (
                <li key={path} className="flex items-center gap-2">
                  <FiChevronRight size={12} className="text-gray-300" />
                  {isLast ? (
                    <span className="text-primary font-semibold" aria-current="page">{label}</span>
                  ) : (
                    <Link to={path} className="text-gray-mid hover:text-primary transition-colors">{label}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
