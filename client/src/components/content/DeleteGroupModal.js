import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

export default function DeleteGroupModal(props) {
    return (
        <div>
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE THIS GROUP</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger" >Are you sure you want to delete this group</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button  variant="danger" onClick={props.deleteGroup}>
            Delete Group
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}
