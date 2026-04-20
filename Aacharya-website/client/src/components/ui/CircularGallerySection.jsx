import React from 'react';
import { CircularGallery } from './circular-gallery';
import zodiacAries from '../../assets/zodiac_aries.webp';
import zodiacTaurus from '../../assets/zodiac_taurus.webp';
import zodiacGemini from '../../assets/zodiac_gemini.webp';
import zodiacCancer from '../../assets/zodiac_cancer.webp';
import zodiacLeo from '../../assets/zodiac_leo.webp';
import zodiacVirgo from '../../assets/zodiac_virgo.webp';
import zodiacLibra from '../../assets/zodiac_libra.webp';
import zodiacScorpio from '../../assets/zodiac_scorpio.webp';
import zodiacSagittarius from '../../assets/zodiac_sagittarius.webp';
import zodiacCapricorn from '../../assets/zodiac_capricorn.webp';
import zodiacAquarius from '../../assets/zodiac_aquarius.webp';
import zodiacPisces from '../../assets/zodiac_pisces.webp';

const galleryData = [
	{
		common: 'Aries',
		binomial: 'March 21 - April 19',
		photo: {
			url: zodiacAries,
			text: 'Aries zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Taurus',
		binomial: 'April 20 - May 20',
		photo: {
			url: zodiacTaurus,
			text: 'Taurus zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Gemini',
		binomial: 'May 21 - June 20',
		photo: {
			url: zodiacGemini,
			text: 'Gemini zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Cancer',
		binomial: 'June 21 - July 22',
		photo: {
			url: zodiacCancer,
			text: 'Cancer zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Leo',
		binomial: 'July 23 - August 22',
		photo: {
			url: zodiacLeo,
			text: 'Leo zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Virgo',
		binomial: 'August 23 - September 22',
		photo: {
			url: zodiacVirgo,
			text: 'Virgo zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Libra',
		binomial: 'September 23 - October 22',
		photo: {
			url: zodiacLibra,
			text: 'Libra zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Scorpio',
		binomial: 'October 23 - November 21',
		photo: {
			url: zodiacScorpio,
			text: 'Scorpio zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Sagittarius',
		binomial: 'November 22 - December 21',
		photo: {
			url: zodiacSagittarius,
			text: 'Sagittarius zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Capricorn',
		binomial: 'December 22 - January 19',
		photo: {
			url: zodiacCapricorn,
			text: 'Capricorn zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Aquarius',
		binomial: 'January 20 - February 18',
		photo: {
			url: zodiacAquarius,
			text: 'Aquarius zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	},
	{
		common: 'Pisces',
		binomial: 'February 19 - March 20',
		photo: {
			url: zodiacPisces,
			text: 'Pisces zodiac card',
			pos: '50% 50%',
			by: 'Zodiac Collection'
		}
	}
];

const CircularGallerySection = () => {
  return (
    <div className="w-full relative z-10 mt-10 py-16 overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center pt-14 md:pt-20">
        <div className="text-center mb-8 z-10 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-[0.08em] font-serif mb-2">
            <span className="text-[#5a0f0f]" style={{ textShadow: '0 2px 8px rgba(90,15,15,0.25)' }}>Zodiac</span>{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(180deg, #f4dc8e 0%, #d7ab2c 55%, #9b7420 100%)',
                textShadow: '0 2px 10px rgba(156,116,28,0.25)',
              }}
            >
              Power Profiles
            </span>
          </h2>
          <p className="text-lg md:text-xl opacity-90">
            <span className="text-[var(--brand-dark-brown)]">Each sign reveals your </span>
            <span style={{ color: '#9d1b2e', fontWeight: 600 }}>strengths</span>
            <span className="text-[var(--brand-dark-brown)]">, </span>
            <span style={{ color: '#9d1b2e', fontWeight: 600 }}>personality</span>
            <span className="text-[var(--brand-dark-brown)]">, and </span>
            <span style={{ color: '#9d1b2e', fontWeight: 600 }}>life direction.</span>
          </p>
        </div>
        <div className="w-full h-[320px]">
          <CircularGallery 
            items={typeof window !== 'undefined' && window.innerWidth < 768 ? galleryData : [...galleryData, ...galleryData]} 
            radius={typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 800} 
          />
        </div>
        <div className="w-full max-w-6xl mt-8 px-4 flex justify-center">
          <p className="text-center text-[24px] md:text-[32px] lg:text-[40px] font-black uppercase tracking-[0.06em] font-serif leading-snug">
            <span className="text-[#2b2b2b]" style={{ textShadow: '0 1px 4px rgba(43,43,43,0.18)' }}>Discover</span>{' '}
            <span style={{ color: '#8f1023', textShadow: '0 2px 8px rgba(143,16,35,0.28)' }}>who you truly are</span>{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(180deg, #f5e1a0 0%, #d6a72f 58%, #a97b1d 100%)',
                textShadow: '0 2px 8px rgba(169,123,29,0.25)',
              }}
            >
              through ancient Vedic astrology
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CircularGallerySection;
