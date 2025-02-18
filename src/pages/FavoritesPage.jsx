import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import NavBar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const FavoritesPage = () => {
  const { user, addToFavorites } = useContext(AuthContext);

  return (
    <div>
      <NavBar />

      <h1>Favorite Meals</h1>
      <div className="grid">
        {user?.favorites?.length > 0 ? (
          user.favorites.map((meal) => (
            <div key={meal.idMeal} className="card">
              <FaHeart
                className="heart-icon favorite"
                onClick={() => addToFavorites(meal)}
              />
              <Link to={`/meal/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
              </Link>
            </div>
          ))
        ) : (
          
            <p>No favorite meals added yet.</p>
         
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
