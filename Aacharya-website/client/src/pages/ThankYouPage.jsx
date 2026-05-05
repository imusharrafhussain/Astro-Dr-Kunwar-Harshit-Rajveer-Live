import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiArrowLeft } from 'react-icons/fi';

export default function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-primary-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">
          Thank You!
        </h1>
        
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Your submission has been received successfully. Our team will review your details and get back to you shortly. We appreciate you reaching out to Astro Dr. Kunwar Harshit Rajveer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 font-medium transition-all"
          >
            <FiArrowLeft /> Go Back
          </button>
          
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-lg hover:shadow-primary-500/30 font-medium transition-all"
          >
            <FiHome /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
