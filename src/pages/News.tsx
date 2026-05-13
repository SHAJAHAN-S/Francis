import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiArrowLeft, FiArrowRight, FiImage } from 'react-icons/fi';
import { newsItems } from '../data/news';
import { formatDate, getCategoryColor } from '../utils/helpers';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categories = ['All', 'Achievement', 'Academic', 'Sports', 'Events'];

export function News() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;
  const { ref, isVisible } = useScrollAnimation();

  const filtered = useMemo(() => {
    return newsItems.filter(n => {
      const matchCat = cat === 'All' || n.category === cat;
      const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [cat, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const featured = newsItems[0];

  return (
    <>
      <Helmet>
        <title>News & Updates — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Latest news, achievements, and updates from St. Francis School." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-10 right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">News & Updates</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Stay informed about the latest from St. Francis.</p>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`section-container transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Featured */}
          <Link to={`/news/${featured.id}`} className="block card card-hover-lift mb-12 overflow-hidden group">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <FiImage size={64} className="text-white/20" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className={`badge ${getCategoryColor(featured.category)} mb-3 self-start`}>{featured.category}</span>
                <h2 className="text-2xl font-display font-bold text-primary group-hover:text-secondary transition-colors mb-3">{featured.title}</h2>
                <div className="flex items-center gap-2 text-gray-mid text-sm mb-4"><FiCalendar size={14} />{formatDate(featured.date)}</div>
                <p className="text-gray-mid font-body text-sm leading-relaxed">{featured.excerpt}</p>
              </div>
            </div>
          </Link>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-mid" />
              <input type="text" placeholder="Search news..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => { setCat(c); setPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-label font-medium transition-all ${cat === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-dark hover:bg-gray-200'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map(news => (
              <Link key={news.id} to={`/news/${news.id}`} className="card card-hover-lift overflow-hidden group border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-primary/80 to-primary-light flex items-center justify-center">
                  <FiImage size={40} className="text-white/20" />
                </div>
                <div className="p-6">
                  <span className={`badge ${getCategoryColor(news.category)} mb-3`}>{news.category}</span>
                  <h3 className="font-display font-bold text-primary group-hover:text-secondary transition-colors mb-2 line-clamp-2">{news.title}</h3>
                  <div className="flex items-center gap-2 text-gray-mid text-xs mb-3"><FiCalendar size={12} />{formatDate(news.date)}</div>
                  <p className="text-gray-mid font-body text-sm line-clamp-3">{news.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && <div className="text-center py-16 text-gray-mid font-body">No news found.</div>}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"><FiArrowLeft /></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-label text-sm ${page === i + 1 ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"><FiArrowRight /></button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export function NewsDetail() {
  const { id } = useParams();
  const news = newsItems.find(n => n.id === Number(id));

  if (!news) return (
    <div className="section-container text-center">
      <h1 className="text-3xl font-display font-bold text-primary mb-4">Article Not Found</h1>
      <Link to="/news" className="btn btn-primary">Back to News</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{news.title} — ST. Francis Mat. Hr. School</title>
        <meta name="description" content={news.excerpt} />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/news" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 font-label text-sm transition-colors">
              <FiArrowLeft /> Back to News
            </Link>
            <span className={`badge ${getCategoryColor(news.category)} mb-4`}>{news.category}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{news.title}</h1>
            <div className="flex items-center gap-2 text-white/60 text-sm"><FiCalendar />{formatDate(news.date)}</div>
          </div>
        </section>
        <section className="section-container">
          <article className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-xl flex items-center justify-center mb-10">
              <FiImage size={64} className="text-primary/20" />
            </div>
            <div className="prose prose-lg max-w-none font-body text-gray-dark leading-relaxed">
              {news.content.split('\n\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default News;
