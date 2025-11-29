import OneRecipe from "./oneRecepie";
import AddRecipe from "./addRecepie";
import { useUser } from "../user";

function HomePage({
  recipes,
  setRecipes,
  allMembers,
  setAllMembers,
  allItems,
  setAllItems,
}) {
  const currentUser = useUser();

  return (
    <div>
      <OneRecipe
        recipes={recipes}
        setRecipes={setRecipes}
        currentUser={currentUser}
        allMembers={allMembers}
      />
      <AddRecipe
        setRecipes={setRecipes}
        currentUser={currentUser}
        setAllMembers={setAllMembers}
        setAllItems={setAllItems}
      />
    </div>
  );
}

export default HomePage;
