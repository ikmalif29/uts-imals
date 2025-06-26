import React, { useState, useEffect } from 'react';
import { Info, Heart, MessageCircle, ShoppingCart, X, Plus, Minus } from 'lucide-react';

const Cars = ({ cars }) => {
    const [likedCars, setLikedCars] = useState(new Set());
    const [cartItems, setCartItems] = useState({});
    const [selectedCar, setSelectedCar] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [commentCar, setCommentCar] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState({});

    // Load cart data from localStorage on component mount
    useEffect(() => {
        try {
            const cartData = JSON.parse(localStorage.getItem("cart")) || {};
            setCartItems(cartData);
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
        }
    }, []);

    // Save cart data to localStorage whenever cartItems changes
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [cartItems]);

    const handleLike = (carId) => {
        const newLikedCars = new Set(likedCars);
        if (newLikedCars.has(carId)) {
            newLikedCars.delete(carId);
        } else {
            newLikedCars.add(carId);
        }
        setLikedCars(newLikedCars);
    };

    const handleAddToCart = (carId) => {
        const car = cars.find(c => c.id === carId);
        if (car) {
            setCartItems(prev => {
                const newCartItems = {
                    ...prev,
                    [carId]: (prev[carId] || 0) + 1
                };
                return newCartItems;
            });
        }
    };

    const handleRemoveFromCart = (carId) => {
        setCartItems(prev => {
            const newCartItems = {
                ...prev,
                [carId]: Math.max((prev[carId] || 0) - 1, 0)
            };

            // Remove item from cart if quantity becomes 0
            if (newCartItems[carId] === 0) {
                delete newCartItems[carId];
            }

            return newCartItems;
        });
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
    };

    const handleShowInfo = (car) => {
        setSelectedCar(car);
        setShowPopup(true);
    };

    const handleComment = (car) => {
        setCommentCar(car);
    };

    const submitComment = () => {
        if (commentText.trim() && commentCar) {
            setComments(prev => ({
                ...prev,
                [commentCar.id]: [...(prev[commentCar.id] || []), commentText.trim()]
            }));
            setCommentText('');
            setCommentCar(null);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Premium Cars Collection
                    </h1>
                    <p className="text-gray-600 text-lg">Discover luxury and performance in every drive</p>

                    {/* Cart Badge */}
                    <div className="fixed top-6 right-6 z-50">
                        <div className="relative">
                            <div className="bg-white rounded-full p-3 shadow-lg border">
                                <ShoppingCart className="w-6 h-6 text-gray-700" />
                            </div>
                            {getTotalCartItems() > 0 && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {getTotalCartItems()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                                {/* Like Button Overlay */}
                                <button
                                    onClick={() => handleLike(car.id)}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md"
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-colors duration-200 ${likedCars.has(car.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {car.name}
                                    </h3>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-bold text-blue-600">
                                            {formatPrice(car.price)}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-4 h-4 rounded-full border-2 border-gray-300"
                                                style={{ backgroundColor: car.color.toLowerCase() }}
                                            ></div>
                                            <span className="text-sm text-gray-500 capitalize">{car.color}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Display */}
                                {comments[car.id] && comments[car.id].length > 0 && (
                                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Latest Comment:</p>
                                        <p className="text-sm text-gray-700 italic">"{comments[car.id][comments[car.id].length - 1]}"</p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col space-y-3">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleShowInfo(car)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <Info className="w-4 h-4" />
                                            <span className="text-sm font-medium">Info</span>
                                        </button>

                                        <button
                                            onClick={() => handleComment(car)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">Comment</span>
                                        </button>
                                    </div>

                                    {/* Cart Controls */}
                                    <div className="flex items-center space-x-3">
                                        {cartItems[car.id] > 0 ? (
                                            <div className="flex items-center space-x-3 flex-1">
                                                <button
                                                    onClick={() => handleRemoveFromCart(car.id)}
                                                    className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <div className="flex-1 text-center">
                                                    <span className="text-lg font-bold text-gray-700">{cartItems[car.id]}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleAddToCart(car.id)}
                                                    className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleAddToCart(car.id)}
                                                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                <span className="font-medium">Add to Cart</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Popup */}
                {showPopup && selectedCar && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="relative">
                                <img
                                    src={selectedCar.image}
                                    alt={selectedCar.name}
                                    className="w-full h-64 object-cover rounded-t-2xl"
                                />
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCar.name}</h2>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Price</h3>
                                        <p className="text-3xl font-bold text-blue-600">{formatPrice(selectedCar.price)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Color</h3>
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-8 h-8 rounded-full border-2 border-gray-300"
                                                style={{ backgroundColor: selectedCar.color.toLowerCase() }}
                                            ></div>
                                            <span className="text-xl capitalize text-gray-800">{selectedCar.color}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Description</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        The {selectedCar.name} represents the pinnacle of automotive excellence, combining cutting-edge technology
                                        with luxurious design. This premium vehicle offers an unparalleled driving experience with its
                                        sophisticated engineering and attention to detail.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Specifications</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Model ID:</span>
                                            <span className="font-medium">#{selectedCar.id.toString().padStart(3, '0')}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Category:</span>
                                            <span className="font-medium">Luxury Sports</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Engine:</span>
                                            <span className="font-medium">V8 Turbo</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Transmission:</span>
                                            <span className="font-medium">8-Speed Automatic</span>
                                        </div>
                                    </div>
                                </div>

                                {comments[selectedCar.id] && comments[selectedCar.id].length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Comments</h3>
                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                                            {comments[selectedCar.id].map((comment, index) => (
                                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                                    <p className="text-gray-700 italic">"{comment}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Comment Modal */}
                {commentCar && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">Add Comment</h3>
                                    <button
                                        onClick={() => setCommentCar(null)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-600 mb-2">Comment on: <span className="font-semibold">{commentCar.name}</span></p>
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Share your thoughts about this car..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        rows="4"
                                    />
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setCommentCar(null)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={submitComment}
                                        disabled={!commentText.trim()}
                                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cars;