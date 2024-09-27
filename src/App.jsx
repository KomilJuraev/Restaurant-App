import { useState, useEffect, useRef } from "react";

import Header from "./components/Header";
import MenuCard from "./components/MenuCard";
import CartModal from "./components/CartModal";
import { getMealList } from "./http-requests";

function App() {
  const dialog = useRef();

  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [numOfOrders, setNumOfOrders] = useState(0);

  useEffect(() => {
    async function getMenuItems() {
      try {
        const menu = await getMealList();
        setMeals(menu);
      } catch (error) {
        console.error('Failed to fetch menu items');
      }
    }
    getMenuItems();
  }, []);

  useEffect(() => {
    let sum = 0;
    selectedMeals.map((eachMeal) => {
      sum = sum + eachMeal.count;
    })
    setNumOfOrders(sum);
  }, [selectedMeals])

  function handleSelectMeal(mealId, mealName, price) {
    setSelectedMeals((prevVal) => {
      const mealExists = prevVal.find((meal) => meal.id === mealId);

      if (mealExists) {
        return prevVal.map((meal) => (
          meal.id === mealId ? { ...meal, count: meal.count + 1 } : meal
        ))
      } else {
        return [...prevVal, { id: mealId, name: mealName, price: price, count: 1 }];
      }
    })
  }

  function decrement(id) {
    setSelectedMeals((prevVal) => {
      return (
        prevVal.map((meal) => (meal.id === id ? { ...meal, count: meal.count - 1 } : meal))
          .filter((meal) => meal.count > 0)
      )
    })
  }

  function increment(id) {
    setSelectedMeals((prevVal) => {
      return (
        prevVal.map((meal) => (meal.id === id ? { ...meal, count: meal.count + 1 } : meal))
      )
    })
  }

  function handleCartClick() {
    if (selectedMeals.length > 0) {
      dialog.current.showModal();
    }
  }

  return (
    <div className="App">
      <CartModal ref={dialog} selectedMeals={selectedMeals} onDecrement={decrement} onIncrement={increment} onReset={() => setSelectedMeals([])} />
      <Header number={numOfOrders} onCartClick={handleCartClick} />
      <table>
        <tbody className="menu-container">
          {
            meals.length > 0 && (
              meals.map((eachMeal) => (
                <tr key={eachMeal.id}>
                  <MenuCard meal={eachMeal} onSelect={() => handleSelectMeal(eachMeal.id, eachMeal.name, eachMeal.price)} />
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
