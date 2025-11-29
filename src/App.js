import "./App.css";
import { useState } from "react";
import { UserProvider, UserSelector } from "./user";
import HomePage from "./HomePage/HomePage";
import ShoppingListPage from "./Components/ShoppingListPage";
import { Route, Routes } from "react-router-dom";
import Archived from "./HomePage/archivedRecipes";

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: "1",
      recipeName: "Carbonara",
      slug: "carbonara",
      ownerId: "123",
      ownerName: "James",
      archived: false,
    },
  ]);

  // Stav pro všechny členy
  const [allMembers, setAllMembers] = useState({
    carbonara: [
      { id: "123", name: "James" }, // owner
      { id: "234", name: "Amelia" }, // další člen
    ],
  });

  // Stav pro všechny položky
  const [allItems, setAllItems] = useState({
    carbonara: [],
  });

  return (
    <UserProvider>
      <UserSelector />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              recipes={recipes}
              setRecipes={setRecipes}
              allMembers={allMembers}
              setAllMembers={setAllMembers}
              allItems={allItems}
              setAllItems={setAllItems}
            />
          }
        />
        <Route
          path="/archived"
          element={<Archived recipes={recipes} setRecipes={setRecipes} />}
        />
        <Route
          path="/:recipeSlug"
          element={
            <ShoppingListPage
              recipes={recipes}
              setRecipes={setRecipes}
              allMembers={allMembers}
              setAllMembers={setAllMembers}
              allItems={allItems}
              setAllItems={setAllItems}
            />
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
