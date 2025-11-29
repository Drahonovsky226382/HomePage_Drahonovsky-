import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function AddRecipe({ setRecipes, currentUser, setAllMembers, setAllItems }) {
  const [show, setShow] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState("");
  const navigate = useNavigate();

  if (!currentUser) return null; // bezpečnostní kontrola

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (newRecipeName.trim() === "") return;

    const slug = newRecipeName.toLowerCase().replace(/\s/g, "");
    const newRecipe = {
      id: Date.now().toString(),
      recipeName: newRecipeName,
      slug,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      archived: false,
    };

    // Přidání receptu
    setRecipes((prev) => [...prev, newRecipe]);

    // Inicializace členů – owner
    setAllMembers((prev) => ({
      ...prev,
      [slug]: [{ id: currentUser.id, name: currentUser.name }],
    }));

    // Inicializace položek
    setAllItems((prev) => ({
      ...prev,
      [slug]: [],
    }));

    setNewRecipeName("");
    handleClose();
  };

  return (
    <div style={{ padding: 32 }} className="d-flex justify-content-between">
      <Button variant="primary" onClick={handleShow}>
        Add recipe
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddRecipe}>
            <Form.Group className="mb-3" controlId="formRecipeName">
              <Form.Control
                type="text"
                placeholder="Enter recipe"
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <button
        className="btn btn-secondary "
        onClick={() => navigate("/archived")}
      >
        View Archived
      </button>
    </div>
  );
}

export default AddRecipe;
