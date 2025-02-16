import React from 'react';
import { Plus, Minus, Heart, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, description, category }: ProductCardProps) {
  const [quantity, setQuantity] = React.useState(0);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted } = useWishlistStore();

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(0, prev - 1));

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem({ id, name, price, image }, quantity);
      setQuantity(0);
      toast.success('Added to cart!');
    }
  };

  const toggleWishlist = () => {
    if (isWishlisted(id)) {
      removeFromWishlist(id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(id);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] group">
      <div className="relative aspect-w-4 aspect-h-3">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-48 object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors transform hover:scale-110"
          aria-label={isWishlisted(id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted(id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        <div className="absolute bottom-2 left-2 flex items-center bg-white/90 px-2 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-sm font-medium">4.5</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-navy-900 px-2 py-1 bg-gray-100 rounded-full">
            {category}
          </span>
          <span className="text-sm text-gray-500">In Stock</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-navy-900 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-navy-900">₹{price.toLocaleString('en-IN')}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="p-1 rounded-full bg-navy-900 text-white hover:bg-navy-800 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-1 rounded-full bg-yellow-400 text-navy-900 hover:bg-yellow-500 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <button
          className={`w-full py-2 rounded-lg transition-all transform hover:translate-y-[-2px] ${
            quantity === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-navy-900 text-white hover:bg-navy-800'
          }`}
          onClick={handleAddToCart}
          disabled={quantity === 0}
        >
          {quantity === 0 ? 'Select Quantity' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}