import { useParams } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";
import Navbar from "../components/Navbar";
const MealPage = () => {
  const { id } = useParams();
  const { data, loading, error } = UseFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data || !data.meals || data.meals.length === 0)
    return <div>No meal found</div>;

  const meal = data.meals[0];

  return (
    <div className="meal-page">
      <Navbar />

      <div className="meal-container">
        <h1>{meal.strMeal}</h1>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meal-image"
        />

        <h2>Ingredients:</h2>
        <ul>
          {Object.keys(meal)
            .filter((key) => key.includes("strIngredient") && meal[key])
            .map((key, index) => (
              <li key={index}>{meal[key]}</li>
            ))}
        </ul>

        <h2>Preparation:</h2>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealPage;
