import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
const MyCreatedMeals = () => {
  const { getCreatedMeals } = useContext(AuthContext);
  const createdMeals = getCreatedMeals();

  return (
    <>
      <Navbar />
      <div className="created-meals-container">
        <h2 className="title">My Created Meals</h2>

        {createdMeals.length === 0 ? (
          <p className="no-meals-message">You haven't created any meals yet.</p>
        ) : (
          <div className="meals-grid">
            {createdMeals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-image"
                />
                <div className="meal-content">
                  <h4 className="meal-title">{meal.strMeal}</h4>
                  <p className="meal-description">
                    <strong>Preparation:</strong> {meal.strInstructions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCreatedMeals;
