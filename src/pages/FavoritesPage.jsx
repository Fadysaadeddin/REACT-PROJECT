import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import NavBar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext"; // ✅ Import AuthContext

const FavoritesPage = () => {
  const { user, addToFavorites } = useContext(AuthContext); // ✅ Use context

  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <h1>Favorite Meals</h1>
      <div className="grid">
        {user?.favorites?.length > 0 ? (
          user.favorites.map((meal) => (
            <div key={meal.idMeal} className="card">
              <FaHeart
                className="heart-icon favorite"
                onClick={() => addToFavorites(meal)} // ✅ Use addToFavorites to toggle
              />
              <Link to={`/meal/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
              </Link>
            </div>
          ))
        ) : (
          <div className="gridP"> {/* Ensure this uses flex for centering */}
          <p className="empty">No favorite meals added yet.</p>
        </div>
      


        
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
