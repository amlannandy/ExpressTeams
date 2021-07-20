import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const DeleteConfirmModal = ({
  title = 'Confirmation',
  description,
  onCancel,
  onConfirm,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <div className='card'>
        <div className='card-header'>
          <p className='lead font-weight-bold'>{title}</p>
        </div>
        <div className='card-body'>
          <p>{description}</p>
        </div>
        <div className='card-footer'>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-danger' onClick={onCancel}>
              Cancel
            </button>
            <button className='btn btn-success' onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
