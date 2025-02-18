import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FoodCategory from "./pages/FoodCategory";
import MealPage from "./pages/MealPage";
import MealCategory from "./pages/MealCategory";
import FavoritesPage from "./pages/FavoritesPage";
import SearchResults from "./pages/SearchResults";
import CreateMeal from "./pages/CreateMeal";
import MyCreatedMeals from "./pages/MyCreatedMeals";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="food" element={<FoodCategory />} />
        <Route path="/category/:name" element={<MealCategory />} />
        <Route path="/meal/:id" element={<MealPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/my-created-meals" element={<MyCreatedMeals />} />
        <Route path="/create-meal" element={<CreateMeal />} />
      </Routes>
    </Router>
  );
}

export default App;
