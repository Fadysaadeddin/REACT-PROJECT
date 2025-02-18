import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../App.css";
import Navbar from "../components/Navbar"; 

function CreateMeal() {
  const { user, addMealToUser } = useContext(AuthContext);
  const [mealTitle, setMealTitle] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message , setMessage] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("You need to be logged in to create a meal.");
      return;
    }

    if (!mealTitle || !category || !instructions || !imageUrl) {
      setMessage("Please fill in all fields.");
      return;
    }

    const newMeal = {
      idMeal: Date.now().toString(),
      strMeal: mealTitle,
      strCategory: category,
      strInstructions: instructions,
      strMealThumb: imageUrl,
    };

    addMealToUser( newMeal); 
    setMessage(`Meal added successfully!`);

    setTimeout(() => {
      navigate('/my-created-meals');
    }, 2000);

  };

  return (
    <>
    <Navbar/>
       <div className="create-meal-container">
      <h2>Create Your Own Meal</h2>
      <form onSubmit={handleSubmit} className="meal-form">
        <label>
          Meal Title:
          <input type="text" value={mealTitle} onChange={(e) => setMealTitle(e.target.value)} />
        </label>

        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>

        <label>
          Preparation:
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </label>

        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>

        <button type="submit" className="submit-button">Add Meal</button>
      </form>
       <h4 className="message">{message}</h4>
    </div>
    </>
 
  );
}

export default CreateMeal;
