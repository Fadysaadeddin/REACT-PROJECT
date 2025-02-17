

import Navbar from "../components/Navbar"; 
import FoodCategory from "./FoodCategory"; 
import FeaturedMeals from "../components/FeaturedMeals"; 

function Home() {
  return (
    <div>
      <Navbar />

     {/* <div className="welcome-container">
  <Welcome />
</div> */}

      {/* Layout Container */}
      <div className="home-layout">
        {/* Left Side: Food Categories (70%) */}
        <div className="food-category">
          <FoodCategory />
        </div>

        {/* Right Side: Scrollable Featured Meals (30%) */}
        <div className="featured-meals">
          <FeaturedMeals />
        </div>
      </div>

  
    </div>
  );
}

export default Home;
