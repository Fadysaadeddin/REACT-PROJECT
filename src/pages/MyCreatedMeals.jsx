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
        <h2>My Created Meals</h2>
        {Object.keys(createdMeals).length === 0 ? (
          <p>You haven't created any meals yet.</p>
        ) : (
          Object.keys(createdMeals).map((category) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
                {createdMeals[category].map((meal) => (
                  <li key={meal.idMeal}>
                    <h4>{meal.strMeal}</h4>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <p>
                      <strong>Preparation:</strong> {meal.strInstructions}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyCreatedMeals;
