import { Link } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";

const FeaturedMeals = () => {
  const { data, loading, error } = UseFetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  if (loading) return <div>Loading meals...</div>;
  if (error) return <div>Error loading meals</div>;
  if (!data || !data.meals) return <div>No meals found</div>;

  const meals = data.meals.sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <div className="featured-meals">
      <h2> Top 10 Meals</h2>
      <div className="meal-list">
        {meals.map((meal) => (
          <Link
            to={`/meal/${meal.idMeal}`}
            key={meal.idMeal}
            className="meal-card"
          >
            <h4 className="meal-title">{meal.strMeal}</h4>{" "}
            {/* Title Above Image */}
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="meal-image"
            />
            <p className="meal-description">
              {meal.strInstructions.substring(0, 100)}...{" "}
              {/* Show first 100 characters */}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMeals;
