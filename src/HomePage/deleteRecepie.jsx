import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteRecipe({ recipe, currentUser, onDelete, children }) {
  const [show, setShow] = useState(false);
  const isOwner = recipe.ownerId === currentUser.id;

  if (!isOwner) return null;

  // Klik na koš musí zabránit otevření detailu receptu
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShow(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    onDelete(recipe.id);
    setShow(false);
  };

  return (
    <>
      <span onClick={handleDeleteClick}>{children}</span>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete recipe</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRecipe;
