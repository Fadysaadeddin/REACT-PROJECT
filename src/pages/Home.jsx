import Navbar from "../components/Navbar";
import FoodCategory from "./FoodCategory";
import FeaturedMeals from "../components/FeaturedMeals";

function Home() {
  return (
    <div>
      <Navbar />

      <div className="home-layout">
        <div className="food-category">
          <FoodCategory />
        </div>

        <div className="featured-meals">
          <FeaturedMeals />
        </div>
      </div>
    </div>
  );
}

export default Home;
