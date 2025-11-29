import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Members from "./Members";
import Form from "react-bootstrap/Form";

function AddMemberForm({ owner, currentUser, members = [], setMembers }) {
  const [show, setShow] = useState(false);
  const [warning, setWarning] = useState("");
  const [deleteWarning, setDeleteWarning] = useState("");
  const [newMemberName, setNewMemberName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setWarning("");
    setShow(true);
  };

  // Přidání člena
  const handleAddMember = (e) => {
    e.preventDefault();

    if (currentUser.id !== owner.id) {
      setWarning("Only owner can add members.");
      return;
    }

    if (newMemberName.trim() === "") return;

    const newMember = {
      id: Date.now().toString(),
      name: newMemberName,
    };

    setMembers([...members, newMember]);
    setNewMemberName("");
    handleClose();
  };

  // Odstranění člena
  const handleRemoveMember = (id) => {
    if (currentUser.id !== owner.id) {
      if (id !== currentUser.id) {
        setDeleteWarning("Only owner can delete members!");
        return;
      }
    }

    setMembers(members.filter((member) => member.id !== id));
    setDeleteWarning("");
  };

  return (
    <>
      <div>
        <Members
          owner={owner}
          members={members}
          onRemove={handleRemoveMember}
          deleteWarning={deleteWarning}
        />
        <div className="text-center mt-2">
          <Button variant="primary" onClick={handleShow}>
            Add member
          </Button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {warning && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {warning}
              </div>
            )}
            <Form onSubmit={handleAddMember}>
              <Form.Group controlId="formMemberName">
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  autoFocus
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default AddMemberForm;
