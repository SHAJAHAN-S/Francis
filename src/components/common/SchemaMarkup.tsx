import { Helmet } from 'react-helmet-async';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'St. Francis Matriculation Higher Secondary School',
    alternateName: 'St. Francis Mat. Hr. School',
    url: 'https://stfrancissaram.edu.in',
    logo: 'https://stfrancissaram.edu.in/favicon.svg',
    description: 'St. Francis Matriculation Higher Secondary School, Saram, Tindivanam. Affiliated to Tamil Nadu State Board. Nurturing excellence in education since 1994.',
    foundingDate: '1994',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Saram',
      addressLocality: 'Tindivanam',
      addressRegion: 'Tamil Nadu',
      postalCode: '604001',
      addressCountry: 'IN',
    },
    telephone: '+914147123456',
    email: 'info@stfrancissaram.edu.in',
    sameAs: ['https://facebook.com', 'https://youtube.com', 'https://instagram.com'],
    numberOfStudents: 1200,
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

export function EventSchema({ title, date, time, venue, description }: {
  title: string; date: string; time: string; venue: string; description: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    startDate: date,
    location: { '@type': 'Place', name: venue, address: { '@type': 'PostalAddress', addressLocality: 'Tindivanam', addressRegion: 'Tamil Nadu' } },
    description,
    organizer: { '@type': 'Organization', name: 'St. Francis Mat. Hr. School' },
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

export function ArticleSchema({ title, date, excerpt, url }: {
  title: string; date: string; excerpt: string; url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: date,
    description: excerpt,
    url,
    publisher: { '@type': 'Organization', name: 'St. Francis Mat. Hr. School' },
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}
