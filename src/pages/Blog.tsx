import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiArrowLeft, FiUser, FiTag, FiImage } from 'react-icons/fi';
import { blogPosts } from '../data/blog';
import { formatDate, getCategoryColor } from '../utils/helpers';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SocialShare from '../components/common/SocialShare';
import { ArticleSchema } from '../components/common/SchemaMarkup';

const categories = ['All', 'Study Tips', 'Parenting', 'School Life', 'Career Guidance', 'Resources'];

export function BlogList() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const { ref, isVisible } = useScrollAnimation();

  const filtered = useMemo(() => blogPosts.filter(p => {
    const matchCat = cat === 'All' || p.category === cat;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  }), [cat, search]);

  return (
    <>
      <Helmet>
        <title>Blog & Resources — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Educational articles, study tips, parenting advice, and resources from St. Francis School." />
        <meta property="og:title" content="Blog & Resources — St. Francis Mat. Hr. School" />
        <meta property="og:description" content="Educational articles and resources for students and parents." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Blog & Resources</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Educational articles, study tips, and resources for students and parents.</p>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`section-container transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-mid" />
              <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-label font-medium transition-all ${cat === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-dark hover:bg-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card card-hover-lift overflow-hidden group border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-primary/80 to-primary-light flex items-center justify-center">
                  <FiImage size={40} className="text-white/20" />
                </div>
                <div className="p-6">
                  <span className={`badge ${getCategoryColor(post.category)} mb-3`}>{post.category}</span>
                  <h3 className="font-display font-bold text-primary group-hover:text-secondary transition-colors mb-2 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-mid mb-3">
                    <span className="flex items-center gap-1"><FiCalendar size={12} />{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><FiUser size={12} />{post.author.split(',')[0]}</span>
                  </div>
                  <p className="text-gray-mid font-body text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-mid bg-gray-50 px-2 py-0.5 rounded-full"><FiTag size={10} />{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center py-16 text-gray-mid font-body">No articles found.</p>}
        </div>
      </main>
    </>
  );
}

export function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return (
    <div className="section-container text-center">
      <h1 className="text-3xl font-display font-bold text-primary mb-4">Article Not Found</h1>
      <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{post.title} — ST. Francis Mat. Hr. School</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>
      <ArticleSchema title={post.title} date={post.date} excerpt={post.excerpt} url={window.location.href} />
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 font-label text-sm"><FiArrowLeft /> Back to Blog</Link>
            <span className={`badge ${getCategoryColor(post.category)} mb-4`}>{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-2"><FiCalendar />{formatDate(post.date)}</span>
              <span className="flex items-center gap-2"><FiUser />{post.author}</span>
            </div>
          </div>
        </section>
        <section className="section-container">
          <article className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none font-body text-gray-dark leading-relaxed">
              {post.content.split('\n\n').map((p, i) => <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)}
            </div>
            <div className="flex flex-wrap gap-2 mt-8 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-primary bg-accent px-3 py-1 rounded-full"><FiTag size={12} />{tag}</span>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-6">
              <SocialShare title={post.title} description={post.excerpt} />
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default BlogList;
