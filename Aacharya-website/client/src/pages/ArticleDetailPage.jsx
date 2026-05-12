import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import API from '../api/axios';
import './ArticleDetailPage.css';

const ArticleDetailPage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await API.get(`/articles/${slug}`);
                if (response.data.success) {
                    setArticle(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="article-detail-container flex items-center justify-center min-h-screen">
                <div className="loader">Channelling Wisdom...</div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="article-detail-container flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-3xl mb-4">Article Not Found</h2>
                <Link to="/blog" className="back-to-blog" style={{ position: 'static' }}>
                    <ArrowLeft size={20} /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="article-detail-container">
            <Link to="/blog" className="back-to-blog">
                <ArrowLeft size={20} /> Back to Insights
            </Link>

            {/* Hero Section */}
            <section className="article-hero">
                <img 
                    src={article.imageUrl || "https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=2070&auto=format&fit=crop"} 
                    alt={article.title} 
                    className="article-hero-image" 
                />
                <div className="article-hero-overlay">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="article-category-badge"
                    >
                        {article.category?.name || 'General'}
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="article-title"
                    >
                        {article.title}
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="article-meta-info"
                    >
                        <span className="flex items-center gap-2">
                            <Calendar size={18} /> {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={18} /> {article.authorName || 'Team Astro'}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={18} /> {article.readTime || 5} min read
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="article-body-wrapper"
            >
                {/* Floating Actions */}
                <div className="flex justify-end gap-4 mb-8">
                    <button className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-white transition-colors" title="Bookmark">
                        <Bookmark size={20} />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-white transition-colors" title="Share">
                        <Share2 size={20} />
                    </button>
                </div>

                <div 
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Footer Tag Cloud */}
                {article.tags && article.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <h4 className="text-lg font-semibold mb-4 text-white">Explore More Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ArticleDetailPage;
