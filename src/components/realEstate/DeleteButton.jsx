import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const Body = styled.div`
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Button = styled.button`
  border-radius: 6px;
  margin: 10px;
`;

const DeleteButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
    closeModal();
  };
  return (
    <div style={{ margin: 5 }}>
      <button style={{ borderRadius: 4 }} onClick={openModal}>
        {props.title}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation Modal"
      >
        <Body>
          <h2>Are you sure you want to delete this item?</h2>
          <div>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={closeModal}>No</Button>
          </div>
        </Body>
      </Modal>
    </div>
  );
};

export default DeleteButton;
