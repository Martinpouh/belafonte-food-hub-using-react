import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MealList from './MealList';
import Header from "./Header";
import Home from "./Home";
import NewMealForm from './NewMealForm';
import MealDetail from './MealDetail';
import NotFound from './NotFound';
import './App.css'
import './Navbar.css'

const mealsAPI = "http://localhost:8004/meals/";


function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8004/meals/")
     .then(res => res.json())
     .then(data => setMeals(data))
  }, []);

  async function addMeal(meal) {
    const res = await fetch(mealsAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });
    const data = await res.json();
    setMeals([...meals, data]);
    return data;
  }

  function handleCardClick(meal) {
    // console.log("Meal Name: ",Meal.name);
  }
  return (
    <div className="appContainer">
        <Router>
          <Header />
          <Switch>
            <Route path="/idMeal">
              <div className="appContentContainer">
                <MealDetail />
              </div>
            </Route>
            <Route exact path="/create">
              <div className="appContentContainer">
                <NewMealForm addMeal={addMeal}/>
              </div>
            </Route>
            <Route exact path="/meals" >
              <div className="appContentContainer">
                < MealList meals={meals} handleCardClick={handleCardClick} />
              </div>
            </Route>
            <Route exact path="/">
              <div className="appContentContainer">
                <Home meals={meals} />
              </div>
            </Route>
            <Route>
              <NotFound />
            </Route>

          </Switch>
        </Router>
    </div>
  )
}

export default App