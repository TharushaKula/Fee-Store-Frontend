import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";
import { toast } from "sonner";

function ClothesDetailsPage(props) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { updateCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:8000/api/clothes/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    updateCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      size: product.size,
      color: product.color,
    });
    toast.success("Item added to the cart");
  };

  return (
    <section className="px-16">
      <div className="grid grid-cols-12 gap-24">
        <div className="col-span-5">
          <div className="">
            <img className="rounded-lg" src={product.image} alt="" />
          </div>
        </div>
        <div className="col-span-6">
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-4xl font-bold">{product.name}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400 fill-yellow-400 "></Star>
              <Star className="text-yellow-400 fill-yellow-400"></Star>
              <Star className="text-yellow-400 fill-yellow-400"></Star>
              <Star className="text-yellow-400 fill-yellow-400"></Star>
              <Star className="text-gray-300 "></Star>
              <p className="text-gray-500 pl-3">42 reviews</p>
            </div>
            <div>
              <p className="text-5xl font-bold">LKR{product.price}</p>
            </div>
            <div>
              <p className="text-xl font-normal">{product.description}</p>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-black text-white py-3 rounded-lg flex justify-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-shopping-bag"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 rounded-lg flex justify-center gap-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-shopping-cart"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Add to Cart
              </button>
            </div>
            <div className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-truck"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx="17" cy="18" r="2" />
                <circle cx="7" cy="18" r="2" />
              </svg>
              <p>Free delivery on orders over LKR 5000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClothesDetailsPage;
