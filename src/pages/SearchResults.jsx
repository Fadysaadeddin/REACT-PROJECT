
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../App.css";
import useFetch from "../hooks/UseFetch";
import NavBar from "../components/Navbar";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; 

  const [searchResults, setSearchResults] = useState([]);

  
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}` 
  );
console.log(data)
  useEffect(() => {
    if (data?.meals) {
      const filteredMeals = data.meals.filter((meal) => 
    
         meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) 
         ||
        meal.strInstructions.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredMeals); 
    } else {
      setSearchResults([]); 
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



