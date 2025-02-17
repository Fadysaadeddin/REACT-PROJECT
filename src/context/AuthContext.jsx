
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });




  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

    // Registration functionality
    const register = (name, email, password) => {
      // Get existing users or create an empty array
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      // Check if user already exists
      const userExists = existingUsers.some(user => user.email === email);
      if (userExists) {
        alert("User already registered! Try logging in.");
        return;
      }
  
      // Create new user object
      const newUser = {
        name,
        email,
        password,
        favorites: [],
        mealsByCategory: {} // Store meals created by user
      };
  
      // Add new user to the list
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
  
      // Log in the new user
      login(newUser); // Automatically log in after registering
    };

  const login = (userData) => {
    setUser({
      ...userData,
      mealsByCategory: userData.mealsByCategory || {}, // Ensure meals storage
      favorites: userData.favorites || [] // Ensure favorites storage
    });
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Persist user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ Clear localStorage on logout
  };









  const addMealToUser = (category, meal) => {
    if (!user) return;

    setUser((prevUser) => {
      const updatedMeals = {
        ...prevUser.mealsByCategory,
        [category]: [...(prevUser.mealsByCategory[category] || []), meal],
      };

      const updatedUser = { ...prevUser, mealsByCategory: updatedMeals };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Persist changes
      return updatedUser;
    });
  };







  const addToFavorites = (meal) => {
    if (!user) return;
  
    setUser((prevUser) => {
      // Ensure favorites array exists
      const currentFavorites = prevUser.favorites || [];
  
      // Check if the meal is already in favorites
      const isFavorite = currentFavorites.some((fav) => fav.idMeal === meal.idMeal);
  
      // Toggle favorite: remove if already there, add if not
      const updatedFavorites = isFavorite
        ? currentFavorites.filter((fav) => fav.idMeal !== meal.idMeal)
        : [...currentFavorites, meal];
  
      // Update user object with new favorites
      const updatedUser = { 
        ...prevUser, 
        favorites: updatedFavorites
      };
  
      // Save changes to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return updatedUser;
    });
  };
  
  const getCreatedMeals = () => {
    return user?.mealsByCategory || {};
  };
  

  return (
    <AuthContext.Provider value={{ user, register,login, logout, addMealToUser, addToFavorites , getCreatedMeals }}>
      {children}
    </AuthContext.Provider>
  );
};



