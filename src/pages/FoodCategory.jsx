import { Link } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";

const FoodCategory = () => {
  const { data, loading, error } = UseFetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  console.log(data);
  return (
    <div className="home-container">
      <h1>Food Categories</h1>

      <div className="grid">
        {data.categories.map((cat) => (
          <Link
            to={`/category/${cat.strCategory}`}
            key={cat.idCategory}
            className="card"
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />

            <h3>{cat.strCategory}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory;
