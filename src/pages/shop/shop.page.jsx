import { useState, useEffect } from "react";
import { getAllClothes } from "../../services/api/clothes";
import { getAllColors } from "../../services/api/colors";
import { getAllSizes } from "../../services/api/sizes";
import { Link } from "react-router-dom";

function ShopPage() {
  const [clothes, setClothes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortOption, setSortOption] = useState(""); // New state for sorting option

  const [filteredClothes, setFilteredClothes] = useState([]);

  useEffect(() => {
    Promise.all([getAllClothes(), getAllColors(), getAllSizes()])
      .then(([clothesData, colorsData, sizesData]) => {
        setClothes(clothesData);
        setColors(colorsData);
        setSizes(sizesData);
        setFilteredClothes(clothesData);
      })
      .catch((e) => {
        setIsError(true);
        setError(e.message);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = clothes;

    if (selectedColor) {
      filtered = filtered.filter((item) => item.color === selectedColor);
    }

    if (selectedSize) {
      filtered = filtered.filter((item) => item.size === selectedSize);
    }

    // Sort by price if sortOption is selected
    if (sortOption === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredClothes(filtered);
  }, [selectedColor, selectedSize, sortOption, clothes]);

  const getColorName = (id) =>
    colors.find((color) => color._id === id)?.name || "Unknown";
  const getSizeName = (id) =>
    sizes.find((size) => size._id === id)?.name || "Unknown";

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;

  return (
    <section className="px-16">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3 space-y-4">
          <div>
            <p className="text-2xl font-medium">Colors</p>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="">All Colors</option>
              {colors.map((color) => (
                <option key={color._id} value={color._id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-2xl font-medium">Sizes</p>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="">All Sizes</option>
              {sizes.map((size) => (
                <option key={size._id} value={size._id}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-2xl font-medium">Sort by</p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="">Default</option>
              <option value="highToLow">Price: Low to High</option>
              <option value="lowToHigh">Price: High to Low</option>
            </select>
          </div>

          <div className="pt-5">
            <Link to="/OrderHistory">
              <p className="border rounded-lg py-4 text-2xl font-bold text-center hover:bg-black hover:text-white cursor-pointer">
                Order History
              </p>
            </Link>
          </div>

          <hr />
        </div>

        <div className="col-span-9">
          <div className="grid grid-cols-4 gap-3">
            {filteredClothes.length === 0 ? (
              <p>No clothes found</p>
            ) : (
              filteredClothes.map((item) => (
                <Link to={`/ClothesDetails/${item._id}`} key={item._id}>
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      className="w-full rounded-lg object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm font-bold">Price: {item.price}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopPage;
