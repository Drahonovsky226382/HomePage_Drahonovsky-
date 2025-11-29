import ShoppingListHeader from "./ShoppingListHeader";
import AddItemForm from "./AddItemForm";
import AddMemberForm from "./AddMemberForm";

import { useUser } from "../user";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function ShoppingListPage({
  recipes,
  setRecipes,
  allMembers,
  setAllMembers,
  allItems,
  setAllItems,
}) {
  const currentUser = useUser();
  const { recipeSlug } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.slug === recipeSlug);

  if (!recipe) return <p style={{ padding: 32 }}>Recipe not found.</p>;

  const owner = { id: recipe.ownerId, name: recipe.ownerName };

  const members = allMembers?.[recipeSlug] || [];
  const items = allItems?.[recipeSlug] || [];

  const setMembersForRecipe = (newMembers) =>
    setAllMembers((prev) => ({ ...prev, [recipeSlug]: newMembers }));

  const setItemsForRecipe = (newItems) =>
    setAllItems((prev) => ({ ...prev, [recipeSlug]: newItems }));

  return (
    <div style={{ padding: 32 }}>
      <div
        onClick={() => navigate(-1)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          fontSize: "1.5rem",
          gap: "8px",
        }}
      >
        <IoArrowBack />
        <span>Back</span>
      </div>

      <ShoppingListHeader
        owner={owner}
        currentUser={currentUser}
        recipe={recipe}
        setRecipes={setRecipes}
      />

      <div className="d-flex flex-column flex-md-row gap-4 mt-3">
        <div className="flex-fill border border-dark rounded p-3">
          <AddMemberForm
            owner={owner}
            currentUser={currentUser}
            members={members}
            setMembers={setMembersForRecipe}
          />
        </div>

        <div className="flex-fill border border-dark rounded p-3">
          <AddItemForm items={items} setItems={setItemsForRecipe} />
        </div>
      </div>
    </div>
  );
}

export default ShoppingListPage;
