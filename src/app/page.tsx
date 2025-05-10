'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, productsAPI } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fake products for the carousel
  const fakeProducts = [
    {
      id: 1,
      name: 'Claw clips',
      price: 25,
      image: 'https://placehold.co/300x300?text=Claw+Clips',
    },
    {
      id: 2,
      name: 'Cable Protector',
      price: 20,
      image: 'https://placehold.co/300x300?text=Cable+Protector',
    },
    {
      id: 3,
      name: 'Clean and Shine gel',
      price: 40,
      image: 'https://placehold.co/300x300?text=Clean+and+Shine',
    },
    {
      id: 4,
      name: 'Mosquito Racquet',
      price: 230,
      image: 'https://placehold.co/300x300?text=Mosquito+Racquet',
    },
    {
      id: 5,
      name: 'Desk Lamp',
      price: 150,
      image: 'https://placehold.co/300x300?text=Desk+Lamp',
    },
    {
      id: 6,
      name: 'Notebook',
      price: 60,
      image: 'https://placehold.co/300x300?text=Notebook',
    },
    {
      id: 7,
      name: 'Water Bottle',
      price: 80,
      image: 'https://placehold.co/300x300?text=Water+Bottle',
    },
    {
      id: 8,
      name: 'Pen Set',
      price: 35,
      image: 'https://placehold.co/300x300?text=Pen+Set',
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Custom arrow components
  function CustomNextArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className="slick-next"
        aria-label="Next"
      >
        <IoIosArrowForward size={24} />
      </button>
    );
  }

  function CustomPrevArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className="slick-prev"
        aria-label="Previous"
      >
        <IoIosArrowBack size={24} />
      </button>
    );
  }

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.getAll();
      setFeaturedProducts(response.data.slice(0, 4));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section - Matching the image */}
      <section className="bg-white text-gray-900 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="block">Join Hands,</span>
                <span className="block">Unlock Savings</span>
              </h1>
              <p className="text-xl mb-8 max-w-lg">
                Join the BulkEase revolution! By shopping together and 
                sharing deals, you help us bring better prices and 
                opportunities to everyone. Together, we make every rupee count.
              </p>
              <Link
                href="/products"
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-md font-medium transition inline-block"
              >
                Explore now
              </Link>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80 md:h-96">
                <Image
                  src="/images/hero-section-image.png"
                  alt="People joining hands in a circle"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-left text-green-800">Our latest content!</h2>
            <Link href="#" className="text-green-700 font-semibold flex items-center gap-1 hover:underline">
              See all <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mb-8 text-lg text-gray-600">Check out the products we offer</p>
          <div className="carousel-container">
            <Slider {...sliderSettings}>
              {fakeProducts.map((product) => (
                <div key={product.id} className="px-2">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="w-full h-48 relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/300x300?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-center mb-2 text-black h-[3.5rem] line-clamp-2">{product.name}</h3>
                      <div className="text-2xl font-bold mb-2 text-black text-center">₹ {product.price.toFixed(2)}</div>
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          <span className="text-yellow-400 text-xl">★</span>
                          <span className="text-yellow-400 text-xl">★</span>
                          <span className="text-yellow-400 text-xl">★</span>
                          <span className="text-yellow-400 text-xl">★</span>
                          <span className="text-yellow-400 text-xl">★</span>
                        </div>
                        <span className="ml-2 text-gray-500">(0)</span>
                      </div>
                      <button className="bg-green-800 text-white px-8 py-2 rounded font-semibold hover:bg-green-900 transition w-full">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-green-800">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Link href="/products?category=tech" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/techaccessories.webp"
                    alt="Tech Accessories"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-800 text-center min-h-[3.5rem] line-clamp-2">Tech Accessories</h3>
                </div>
              </div>
            </Link>

            <Link href="/products?category=room" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/roomaccessories.webp"
                    alt="Room Accessories"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-800 text-center min-h-[3.5rem] line-clamp-2">Room Accessories</h3>
                </div>
              </div>
            </Link>

            <Link href="/products?category=lifestyle" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/lifestyle.jpg"
                    alt="Lifestyle"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-800 text-center min-h-[3.5rem] line-clamp-2">Lifestyle</h3>
                </div>
              </div>
            </Link>

            <Link href="/products?category=fashion" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/fashion.webp"
                    alt="Fashion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-800 text-center min-h-[3.5rem] line-clamp-2">Fashion</h3>
                </div>
              </div>
            </Link>

            <Link href="/products?category=stationery" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/stationary.webp"
                    alt="Stationery"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-800 text-center min-h-[3.5rem] line-clamp-2">Stationery</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Suggestions Section */}
      <section className="py-16" style={{ backgroundColor: '#e8efee' }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-5xl font-bold mb-6 text-center text-green-800">Product Suggestions</h2>
          <p className="mb-12 text-center text-base text-gray-700 max-w-2xl mx-auto">
            We are constantly seeking to expand our product offerings and would appreciate your valuable input. If you have a product suggestion that you believe aligns with our community interest, fill the form below and we'll get back to you soon!
          </p>
          <form className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div>
              <label htmlFor="suggestion-name" className="block mb-2 text-gray-700 text-base">Your Name</label>
              <input 
                id="suggestion-name" 
                type="text" 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
              />
            </div>
            <div>
              <label htmlFor="suggestion-phone" className="block mb-2 text-gray-700 text-base">Phone Number</label>
              <input 
                id="suggestion-phone" 
                type="tel" 
                defaultValue="+91" 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
              />
            </div>
            <div>
              <label htmlFor="suggestion-email" className="block mb-2 text-gray-700 text-base">Email Id</label>
              <input 
                id="suggestion-email" 
                type="email" 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
              />
            </div>
            <div>
              <label htmlFor="suggestion-product-name" className="block mb-2 text-gray-700 text-base">Product Name</label>
              <input 
                id="suggestion-product-name" 
                type="text" 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
              />
            </div>
            <div>
              <label htmlFor="suggestion-product-link" className="block mb-2 text-gray-700 text-base">Product Link</label>
              <input 
                id="suggestion-product-link" 
                type="url" 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
              />
            </div>
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                className="bg-green-800 text-white py-2.5 px-10 rounded-lg font-semibold text-base hover:bg-green-900 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the BulkEase community today and start unlocking savings on your purchases. Group buying has never been easier!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="bg-white text-green-700 py-3 px-8 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Create an Account
            </Link>
            <Link
              href="/products"
              className="bg-green-800 text-white py-3 px-8 rounded-md font-medium hover:bg-green-900 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
