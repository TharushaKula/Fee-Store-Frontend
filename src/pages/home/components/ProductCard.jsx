import { Heart } from "lucide-react";
import { useState } from "react";
import { CartContext } from "../../../context/cartContext";
import { useContext } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const { updateCart } = useContext(CartContext);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    updateCart({
      _id: props._id,
      name: props.name,
      price: props.price,
      image: props.image,
      description: props.description,
    });
    toast.success("Item added to the cart");
  };

  return (
    <div className="h-[432px] relative">
      {isLiked ? (
        <Heart
          className="absolute top-4 right-4 cursor-pointer z-10 text-red-500 fill-red-500"
          onClick={handleClick}
        />
      ) : (
        <Heart
          className="absolute top-4 right-4 cursor-pointer z-10 text-red-500 "
          onClick={handleClick}
        />
      )}
      <Link to={`/productDetails/${props._id}`}>
        <div className={`h-64 rounded-xl bg-[#f4f8f9] relative`}>
          <img
            src={props.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4">
          <div className=" flex items-center justify-between">
            <span className="block text-2xl font-semibold">{props.name}</span>
            <span className="block font-semibold">${props.price}</span>
          </div>
          <p className="text-sm">{props.description}</p>
        </div>
      </Link>
      <div className="mt-2">
        <button
          onClick={handleAddToCart}
          type="button"
          className="border-2 border-black px-4 py-1 text-lg rounded-lg mt-2 font-medium hover:bg-black hover:text-white transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
