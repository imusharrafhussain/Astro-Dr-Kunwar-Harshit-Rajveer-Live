import React, { useState } from 'react';
import '../App.css';
import rubyImg from '../assets/ruby_stone.webp';
import rudrakshaImg from '../assets/rudraksha_mala.webp';
import pyramidImg from '../assets/crystal_pyramid.webp';
import sapphireImg from '../assets/blue_sapphire.webp';
import ganeshImg from '../assets/ganesh_idol.webp';
import incenseImg from '../assets/sandalwood_incense.webp';
import ComingSoonModal from '../components/ui/ComingSoonModal';

const MartPage = () => {
    const [showComingSoon, setShowComingSoon] = useState(false);

    const products = [
        { id: 1, name: "Natural Ruby (Manik)", category: "Gemstone", price: "₹15,000", image: rubyImg },
        { id: 2, name: "5 Mukhi Rudraksha", category: "Rudraksha", price: "₹500", image: rudrakshaImg },
        { id: 3, name: "Crystal Pyramids", category: "Vastu", price: "₹1,200", image: pyramidImg },
        { id: 4, name: "Blue Sapphire (Neelam)", category: "Gemstone", price: "₹45,000", image: sapphireImg },
        { id: 5, name: "Ganesh Idol (Brass)", category: "Idols", price: "₹3,500", image: ganeshImg },
        { id: 6, name: "Sandalwood Incense", category: "Puja Samagri", price: "₹250", image: incenseImg },
    ];

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Digital Mart</h1>
                <p>Authentic spiritual products for your wellbeing</p>
            </div>

            <section className="container">
                <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {products.map(product => (
                        <div key={product.id} className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ height: '300px', marginBottom: '1rem', overflow: 'hidden', borderRadius: '8px' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3>{product.name}</h3>
                            <p style={{ color: '#666', marginBottom: '0.5rem' }}>{product.category}</p>
                            <p className="text-gold" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>{product.price}</p>
                            <button className="btn btn-secondary" onClick={() => setShowComingSoon(true)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
        </div>
    );
};

export default MartPage;
