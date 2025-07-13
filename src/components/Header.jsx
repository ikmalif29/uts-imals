import { CardSim } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const Header = () => {
    

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold tracking-wide">
        Cars Shop <CardSim />
      </h1>

      <div className="relative">
        <ShoppingCart className="w-7 h-7 cursor-pointer" />
        
      </div>
    </header>
  );
};

export default Header;
