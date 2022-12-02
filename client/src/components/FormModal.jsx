import React, { useState, useContext, useEffect, useCallback } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { simulateLoading } from '../utils/loading';
import Context from '../utils/context/Context';
import { submitMessage } from '../http/userAPI';
import { getMessagesSended } from '../http/userAPI';

const FormModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const { user, receiverName, setReceiverName, setShow, show, setMessagesSended } =
    useContext(Context);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const onChangeReceiver = (e) => {
    setReceiverName(e.target.value);
  };

  const getSendedMail = useCallback(
    (data) => {
      setMessagesSended(data.reverse());
    },
    [setMessagesSended],
  );

  useEffect(() => {
    getMessagesSended(user).then((data) => {
      getSendedMail(data);
    });
  }, [isLoading, user, getSendedMail]);

  useEffect(() => {
    if (isLoading) {
      simulateLoading().then(() => {
        setIsLoading(false);
        handleClose();
        Swal.fire('Сообщение отправлено.');
      });
    }
  }, [isLoading, show, handleClose]);

  function handleSubmitMessage(e) {
    e.preventDefault();
    submitMessage(user, receiverName, messageBody, title).then((data) => {
      console.log(data);
    });
    setIsLoading(true);
  }

  return (
    <Modal
      centered
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header id="contained-modal-title-vcenter" closeButton>
        <Modal.Title>Новое сообщение</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Выберите получателя</Form.Label>
            <Form.Control
              onChange={onChangeReceiver}
              value={receiverName}
              placeholder="name"
              disabled={isLoading ? true : false}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Напишите тему письма</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="email"
              placeholder="deadline is comming..."
              autoFocus
              disabled={isLoading ? true : false}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Сообщение</Form.Label>
            <Form.Control
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
              as="textarea"
              rows={3}
              disabled={isLoading ? true : false}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading ? true : false}>
          Закрыть
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={(e) => handleSubmitMessage(e)}
          disabled={isLoading ? true : false}
        >
          {isLoading ? <Spinner animation="border" /> : 'Отправить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
