import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight, Clock, X, Share2, Bookmark, Copy, Check } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import API from '../api/axios';
import { toast } from 'react-hot-toast';
import './BlogPage.css';

const CATEGORIES = ['All', 'Vedic Astrology', 'Horoscope', 'Vastu', 'Gemstone', 'Numerology', 'Spiritual'];

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const fetchBlogs = useCallback(async (category = 'All') => {
        setLoading(true);
        try {
            const url = category === 'All' ? '/articles' : `/articles?category=${category}`;
            const response = await API.get(url);
            if (response.data.success) {
                const data = response.data.data;
                setBlogs(data);
                if (category === 'All') {
                    setLatestBlogs(data.slice(0, 3));
                }
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs(activeCategory);
    }, [activeCategory, fetchBlogs]);

    // Carousel Auto-play
    useEffect(() => {
        if (latestBlogs.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % latestBlogs.length);
            }, 6000);
            return () => clearInterval(timer);
        }
    }, [latestBlogs.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % latestBlogs.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + latestBlogs.length) % latestBlogs.length);

    const openBlog = async (blog) => {
        setLoading(true);
        try {
            const response = await API.get(`/articles/${blog.slug || blog._id}`);
            if (response.data.success) {
                setSelectedBlog(response.data.data);
            }
        } catch (error) {
            console.error('Error opening blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeBlog = () => {
        setSelectedBlog(null);
        setShowShareMenu(false);
    };

    const copyLink = () => {
        const url = window.location.origin + '/blog/' + (selectedBlog.slug || selectedBlog._id);
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const shareUrl = window.location.origin + '/blog/' + (selectedBlog?.slug || selectedBlog?._id);

    if (loading && blogs.length === 0) {
        return (
            <div className="blog-page-container flex items-center justify-center">
                <div className="loader">Loading Cosmic Wisdom...</div>
            </div>
        );
    }

    return (
        <div className="blog-page-container">
            {/* Hero Carousel */}
            {latestBlogs.length > 0 && activeCategory === 'All' && (
                <section className="blog-hero-section">
                    <div className="blog-carousel">
                        <AnimatePresence mode='wait'>
                            {latestBlogs.map((blog, index) => (
                                index === currentSlide && (
                                    <motion.div 
                                        key={blog._id}
                                        className="carousel-slide active"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <img 
                                            src={blog.imageUrl || "https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=2070&auto=format&fit=crop"} 
                                            alt={blog.title} 
                                            className="carousel-image" 
                                        />
                                        <div className="carousel-content">
                                            <span className="category-tag">{blog.category?.name || 'General'}</span>
                                            <h2>{blog.title}</h2>
                                            <p>{blog.description}</p>
                                            <button onClick={() => openBlog(blog)} className="filter-btn active">
                                                Read Full Article <ArrowRight size={18} className="inline ml-2" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>

                        <button className="carousel-nav prev" onClick={prevSlide}><ChevronLeft size={32} /></button>
                        <button className="carousel-nav next" onClick={nextSlide}><ChevronRight size={32} /></button>

                        <div className="carousel-dots">
                            {latestBlogs.map((_, i) => (
                                <span 
                                    key={i} 
                                    className={`dot ${i === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(i)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="container mx-auto">
                <div className="text-center mb-12 mt-16">
                    <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#5D1916' }}>Cosmic Insights & Wisdom</h2>
                    <p className="text-lg" style={{ color: '#666' }}>Explore the depths of ancient astrology and modern spirituality</p>
                </div>

                <div className="category-filter-container">
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="blog-grid">
                    <AnimatePresence>
                        {blogs.map((blog) => (
                            <motion.div 
                                key={blog._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="blog-card"
                                onClick={() => openBlog(blog)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card-image-wrapper">
                                    <img 
                                        src={blog.imageUrl || "https://images.unsplash.com/photo-1532960401447-7ee0506a7941?q=80&w=1974&auto=format&fit=crop"} 
                                        alt={blog.title} 
                                        className="card-image" 
                                    />
                                    <span className="card-category">{blog.category?.name || 'General'}</span>
                                </div>
                                <div className="card-content">
                                    <div className="card-meta">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {blog.readTime || 5} min read
                                        </span>
                                    </div>
                                    <h3 className="card-title">{blog.title}</h3>
                                    <p className="card-excerpt">{blog.description}</p>
                                    
                                    <div className="card-footer">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <User size={14} /> {blog.authorName || 'Team Astro'}
                                        </div>
                                        <span className="read-more-link">
                                            Explore <ArrowRight size={18} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Blog Modal Popup */}
            <AnimatePresence>
                {selectedBlog && (
                    <div className="blog-modal-overlay" onClick={closeBlog}>
                        <motion.div 
                            className="blog-modal-content"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={closeBlog}><X size={24} /></button>
                            
                            <div className="modal-header-image">
                                <img src={selectedBlog.imageUrl || "https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=2070&auto=format&fit=crop"} alt={selectedBlog.title} />
                                <div className="modal-image-overlay">
                                    <span className="modal-category">{selectedBlog.category?.name}</span>
                                </div>
                            </div>

                            <div className="modal-body">
                                <div className="modal-meta">
                                    <span><Calendar size={16} className="inline mr-2" /> {new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                                    <span><User size={16} className="inline mr-2" /> {selectedBlog.authorName}</span>
                                    <span><Clock size={16} className="inline mr-2" /> {selectedBlog.readTime || 5} min read</span>
                                </div>
                                <h2 className="modal-title">{selectedBlog.title}</h2>
                                <div className="modal-text-content" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                                
                                <div className="modal-footer">
                                    <button 
                                        className="modal-action-btn share-trigger"
                                        onClick={() => setShowShareMenu(true)}
                                    >
                                        <Share2 size={20} /> Share
                                    </button>
                                    <button className="modal-action-btn"><Bookmark size={20} /> Save</button>
                                </div>
                            </div>

                            {/* YouTube-style Share Sub-Modal */}
                            <AnimatePresence>
                                {showShareMenu && (
                                    <div className="share-popup-overlay" onClick={() => setShowShareMenu(false)}>
                                        <motion.div 
                                            className="share-popup-content"
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 100 }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="share-popup-header">
                                                <h3>Share</h3>
                                                <button className="share-close" onClick={() => setShowShareMenu(false)}><X size={20} /></button>
                                            </div>
                                            
                                            <div className="share-icons-grid">
                                                <button 
                                                    className="share-target whatsapp"
                                                    onClick={() => window.open(`https://api.whatsapp.com/send?text=Check out this cosmic insight: ${selectedBlog.title} - ${shareUrl}`, '_blank')}
                                                >
                                                    <div className="icon-circle"><FaWhatsapp /></div>
                                                    <span>WhatsApp</span>
                                                </button>
                                                <button 
                                                    className="share-target facebook"
                                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                                                >
                                                    <div className="icon-circle"><FaFacebook /></div>
                                                    <span>Facebook</span>
                                                </button>
                                                <button 
                                                    className="share-target instagram"
                                                    onClick={() => copyLink()} // Instagram doesn't have a direct share URL for web
                                                >
                                                    <div className="icon-circle"><FaInstagram /></div>
                                                    <span>Instagram</span>
                                                </button>
                                                <button 
                                                    className="share-target x-twitter"
                                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedBlog.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                                                >
                                                    <div className="icon-circle"><FaXTwitter /></div>
                                                    <span>X</span>
                                                </button>
                                            </div>

                                            <div className="share-copy-link">
                                                <input type="text" readOnly value={shareUrl} />
                                                <button onClick={copyLink}>
                                                    {copied ? <Check size={18} /> : 'Copy'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogPage;
