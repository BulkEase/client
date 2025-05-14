'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, productsAPI, authAPI, pricesAPI, Price } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SuggestionFormData {
  name: string;
  phone: string;
  email: string;
  productName: string;
  productLink: string;
}

interface FakeProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

type DisplayProduct = Product | FakeProduct;

const isFakeProduct = (product: DisplayProduct): product is FakeProduct => {
  return 'id' in product;
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SuggestionFormData>({
    name: '',
    phone: '+91',
    email: '',
    productName: '',
    productLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fake products for the carousel
  const fakeProducts: FakeProduct[] = [
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
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    currentPrice: 0,
    content: '',
    stars: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [prices, setPrices] = useState<Record<string, Price>>({});

  useEffect(() => {
    fetchFeaturedProducts();
    pricesAPI.getAll().then(res => {
      const pricesMap: Record<string, Price> = {};
      res.data.prices.forEach((price: Price) => {
        pricesMap[price.product] = price;
      });
      setPrices(pricesMap);
    });
    // Fetch user profile to get the role
    authAPI.getProfile()
      .then(res => setUserRole(res.data.role))
      .catch(() => setUserRole(null)); // Not logged in or error
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.getAll();
      setFeaturedProducts(response.data.products);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      if (err.message === 'Network Error') {
        setError('Unable to connect to the server. Please check your connection or try again later.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch products');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to submit the form
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '+91',
        email: '',
        productName: '',
        productLink: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('suggestion-', '')]: value
    }));
  };

  const createProduct = () => {
    if (!imageFile) {
      setError('Image is required');
      return;
    }
    productsAPI.create(newProduct as any, imageFile)
      .then(res => {
        setFeaturedProducts(prev => [...prev, res.data]);
        setNewProduct({
          productName: '',
          productDescription: '',
          currentPrice: 0,
          content: '',
          stars: 0,
        });
        setImageFile(null);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to create product'));
  };

  const fetchProductById = (id: string) => {
    productsAPI.getById(id)
      .then(res => setSingleProduct(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch product'));
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
            <Link href="/products" className="text-green-700 font-semibold flex items-center gap-1 hover:underline">
              See all <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mb-8 text-lg text-gray-600">Check out the products we offer</p>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => fetchFeaturedProducts()}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
            </div>
          ) : (
            <div className="carousel-container">
              <Slider {...sliderSettings}>
                {(featuredProducts.length > 0 ? featuredProducts : fakeProducts).map((product: DisplayProduct) => (
                  <div key={isFakeProduct(product) ? product.id : product._id} className="px-2">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="w-full h-48 relative">
                        <img 
                          src={isFakeProduct(product) ? product.image : product.productImage.url}
                          alt={isFakeProduct(product) ? product.name : product.productName} 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/300x300?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-center mb-2 text-black h-[3.5rem] line-clamp-2">
                          {isFakeProduct(product) ? product.name : product.productName}
                        </h3>
                        <div className="text-2xl font-bold mb-2 text-black text-center">
                          ₹ {(isFakeProduct(product) ? product.price : product.currentPrice).toFixed(2)}
                        </div>
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[...Array(isFakeProduct(product) ? 5 : Math.round(product.stars))].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xl">★</span>
                            ))}
                          </div>
                          <span className="ml-2 text-gray-500">
                            ({isFakeProduct(product) ? 0 : product.stars.toFixed(1)})
                          </span>
                        </div>
                        <Link 
                          href={`/products/${isFakeProduct(product) ? product.id : product._id}`}
                          className="bg-green-800 text-white px-8 py-2 rounded font-semibold hover:bg-green-900 transition w-full block text-center"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
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
          <h2 className="text-3xl font-bold mb-10 text-center">Popular Products</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {userRole === 'admin' && (
                <>
                  <h2 className="text-xl font-bold mb-4">Create Product</h2>
                  <div className="mb-8 flex flex-col gap-2 bg-gray-50 p-4 rounded shadow">
                    <input
                      value={newProduct.productName}
                      onChange={e => setNewProduct({ ...newProduct, productName: e.target.value })}
                      placeholder="Product Name"
                      className="p-2 border rounded"
                    />
                    <input
                      value={newProduct.productDescription}
                      onChange={e => setNewProduct({ ...newProduct, productDescription: e.target.value })}
                      placeholder="Description"
                      className="p-2 border rounded"
                    />
                    <input
                      type="number"
                      value={newProduct.currentPrice}
                      onChange={e => setNewProduct({ ...newProduct, currentPrice: Number(e.target.value) })}
                      placeholder="Current Price"
                      className="p-2 border rounded"
                    />
                    <input
                      value={newProduct.content}
                      onChange={e => setNewProduct({ ...newProduct, content: e.target.value })}
                      placeholder="Content"
                      className="p-2 border rounded"
                    />
                    <input
                      type="number"
                      value={newProduct.stars}
                      onChange={e => setNewProduct({ ...newProduct, stars: Number(e.target.value) })}
                      placeholder="Stars"
                      min={0}
                      max={5}
                      className="p-2 border rounded"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setImageFile(e.target.files?.[0] || null)}
                      className="p-2"
                    />
                    <button onClick={createProduct} className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">
                      Create
                    </button>
                  </div>
                </>
              )}
              
              {featuredProducts.length === 0 ? (
                <p className="text-center py-8">No products available at the moment.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      price={prices[product._id]}
                    />
                  ))}
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-5xl font-bold mb-6 text-center text-green-800">Product Suggestions</h2>
          <p className="mb-12 text-center text-base text-gray-700 max-w-2xl mx-auto">
            We are constantly seeking to expand our product offerings and would appreciate your valuable input. If you have a product suggestion that you believe aligns with our community interest, fill the form below and we'll get back to you soon!
          </p>
          
          {submitSuccess ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Thank you for your suggestion! We'll review it and get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
              <div>
                <label htmlFor="suggestion-name" className="block mb-2 text-gray-700 text-base">Your Name</label>
                <input 
                  id="suggestion-name" 
                  type="text" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div>
                <label htmlFor="suggestion-phone" className="block mb-2 text-gray-700 text-base">Phone Number</label>
                <input 
                  id="suggestion-phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div>
                <label htmlFor="suggestion-email" className="block mb-2 text-gray-700 text-base">Email Id</label>
                <input 
                  id="suggestion-email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div>
                <label htmlFor="suggestion-productName" className="block mb-2 text-gray-700 text-base">Product Name</label>
                <input 
                  id="suggestion-productName" 
                  type="text" 
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div>
                <label htmlFor="suggestion-productLink" className="block mb-2 text-gray-700 text-base">Product Link</label>
                <input 
                  id="suggestion-productLink" 
                  type="url" 
                  value={formData.productLink}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  suppressHydrationWarning
                  required
                />
              </div>
              <div className="flex justify-center pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-green-800 text-white py-2.5 px-10 rounded-lg font-semibold text-base hover:bg-green-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  suppressHydrationWarning
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
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

      {singleProduct && (
        <div className="mt-8 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-bold mb-2">Product Details</h3>
          <p><strong>Name:</strong> {singleProduct.productName}</p>
          <p><strong>Description:</strong> {singleProduct.productDescription}</p>
          <p><strong>Price:</strong> {singleProduct.currentPrice}</p>
          <p><strong>Content:</strong> {singleProduct.content}</p>
          <p><strong>Stars:</strong> {singleProduct.stars}</p>
          <img src={singleProduct.productImage?.url} alt={singleProduct.productName} className="w-32 h-32 object-cover mt-2" />
          <button onClick={() => setSingleProduct(null)} className="mt-2 text-red-600">Close</button>
        </div>
      )}
    </div>
  );
}
