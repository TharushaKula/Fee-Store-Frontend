import Hero from "./components/Hero"; //! ./ => Inside the same folder
import Products from "./components/Products";

function HomePage() {
  const name = "Manupa";

  return (
    <div>      
      <Hero />
      <Products />
    </div>
  );
}

export default HomePage;
