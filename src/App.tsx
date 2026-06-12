import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Breadcrumb from './components/common/Breadcrumb';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import BackToTop from './components/common/BackToTop';
import { OrganizationSchema } from './components/common/SchemaMarkup';
import { useHotkeys, KeyboardShortcutsModal } from './hooks/useHotkeys';
import PageSkeleton from './components/common/SkeletonLoader';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Faculty = lazy(() => import('./pages/Faculty'));
const Gallery = lazy(() => import('./pages/Gallery'));
const News = lazy(() => import('./pages/News').then(m => ({ default: m.News })));
const NewsDetail = lazy(() => import('./pages/News').then(m => ({ default: m.NewsDetail })));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
// New pages
const Alumni = lazy(() => import('./pages/Alumni'));
const BlogList = lazy(() => import('./pages/Blog').then(m => ({ default: m.BlogList })));
const BlogDetail = lazy(() => import('./pages/Blog').then(m => ({ default: m.BlogDetail })));
const VirtualTour = lazy(() => import('./pages/VirtualTour'));
const PayFees = lazy(() => import('./pages/PayFees'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));

function AppContent() {
  useHotkeys();

  return (
    <>
      <ScrollToTop />
      <OrganizationSchema />
      {/* Skip to content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Breadcrumb />
      <div id="main-content">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            {/* New routes */}
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/virtual-tour" element={<VirtualTour />} />
            <Route path="/pay-fees" element={<PayFees />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <KeyboardShortcutsModal />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
