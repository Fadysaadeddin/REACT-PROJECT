
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../App.css";
import useFetch from "../hooks/UseFetch";
import NavBar from "../components/Navbar";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; // Get the search query from URL

  const [searchResults, setSearchResults] = useState([]);

  // Fetch meal data from the API (search across all meals)
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}` // Pass search query to filter meals by name or ingredient
  );
console.log(data)
  // Filter meals when data is fetched or searchQuery changes
  useEffect(() => {
    if (data?.meals) {
      const filteredMeals = data.meals.filter((meal) => 
        // Match query in strMeal (meal name) or strInstructions (meal instructions)
        // meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) 
        // ||
        meal.strInstructions.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredMeals); // Set the filtered results
    } else {
      setSearchResults([]); // Reset if no meals are found
    }
  }, [data, searchQuery]);

  return (
    <div className="search-results-container">
      <NavBar />
      <br /><br /><br /><br /><br />
      <h2>Search Results for "{searchQuery}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {searchResults.length > 0 ? (
        <div className="grid">
          {searchResults.map((meal) => (
            <div key={meal.idMeal} className="card">
              <Link to={`/meal/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
                <p>{meal.strInstructions.substring(0, 100)}...</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No meals found.</p>
      )}
    </div>
  );
}

export default SearchResults;



