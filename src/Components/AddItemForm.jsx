import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import MyItems from "./MyItem";
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";

function AddItemForm() {
  //Zobrazení modálu pro přidání položky
  const [Items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemName.trim() === "") return;

    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      checked: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName("");
    handleClose();
  };

  // Přepínání zda položku máme či ne
  const handleToggle = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Odstranění položky
  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Zobrazení pouze položek, které ještě nemáme (Unchecked)
  const [showOnlyUnchecked, setShowOnlyUnchecked] = useState(false);
  const filteredItems = showOnlyUnchecked
    ? Items.filter((item) => !item.checked)
    : Items;

  return (
    <div>
      <MyItems
        Items={filteredItems}
        onToggle={handleToggle}
        onRemove={handleRemoveItem}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddItem}>
            <Form.Group controlId="formItemName">
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                autoFocus
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <span
        className="mb-3 me-2"
        style={{
          cursor: "pointer",
          fontSize: "1.8rem",
          color: showOnlyUnchecked ? "grey" : "green",
        }}
        onClick={() => setShowOnlyUnchecked(!showOnlyUnchecked)}
      >
        {showOnlyUnchecked ? <BsToggleOff /> : <BsToggleOn />}
      </span>
      <div className="text-center">
        <Button variant="primary" onClick={handleShow}>
          Add item
        </Button>
      </div>
    </div>
  );
}

export default AddItemForm;
