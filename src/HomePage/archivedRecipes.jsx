import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Archived({ recipes, setRecipes }) {
  const navigate = useNavigate();

  const handleUnarchive = (id) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, archived: false } : r))
    );
  };

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
      <h2>Archived Recipes</h2>

      {recipes
        .filter((r) => r.archived)
        .map((r) => (
          <div
            key={r.id}
            className="border rounded p-2 mb-2 d-flex justify-content-between"
          >
            <h5>{r.recipeName}</h5>
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleUnarchive(r.id)}
            >
              Unarchive
            </button>
          </div>
        ))}
    </div>
  );
}

export default Archived;
