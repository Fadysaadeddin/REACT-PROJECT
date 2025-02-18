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

  const register = (name, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      return "User already registered! Try logging in.";
    }

    const newUser = {
      name,
      email,
      password,
      favorites: [],
      mealsByCategory: {},
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    login(newUser);
    return "Registration successful! You can now log in.";
  };

  const login = (userData) => {
    setUser({
      ...userData,
      mealsByCategory: userData.mealsByCategory || {},
      favorites: userData.favorites || [],
    });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addMealToUser = (category, meal) => {
    if (!user) return;

    setUser((prevUser) => {
      const updatedMeals = {
        ...prevUser.mealsByCategory,
        [category]: [...(prevUser.mealsByCategory[category] || []), meal],
      };

      const updatedUser = { ...prevUser, mealsByCategory: updatedMeals };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const addToFavorites = (meal) => {
    if (!user) return;

    setUser((prevUser) => {
      const currentFavorites = prevUser.favorites || [];

      const isFavorite = currentFavorites.some(
        (fav) => fav.idMeal === meal.idMeal
      );

      const updatedFavorites = isFavorite
        ? currentFavorites.filter((fav) => fav.idMeal !== meal.idMeal)
        : [...currentFavorites, meal];

      const updatedUser = {
        ...prevUser,
        favorites: updatedFavorites,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
     
      return updatedUser;
    });
  };

  const getCreatedMeals = () => {
    return user?.mealsByCategory || {};
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        addMealToUser,
        addToFavorites,
        getCreatedMeals,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

