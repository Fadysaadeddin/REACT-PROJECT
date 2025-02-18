import { Link, useParams } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const MealCategory = () => {
  const { name } = useParams();
  const { data, loading, error } = UseFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
  );
  const { user, addToFavorites } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="category-container">
      <Navbar />
      <h1>{name} Dishes</h1>
      <div className="grid">
        {data?.meals?.map((meal) => (
          <div key={meal.idMeal} className="card">
            <FaHeart
              className={`heart-icon ${
                user?.favorites?.some((fav) => fav.idMeal === meal.idMeal)
                  ? "favorite"
                  : ""
              }`}
              onClick={() => addToFavorites(meal)}
            />
            <Link to={`/meal/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCategory;
