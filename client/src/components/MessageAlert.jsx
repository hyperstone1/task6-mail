import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import moment from 'moment';

const MessageAlert = ({ messagesReceived, newMessage }) => {
  const [newToast, setNewToast] = useState(newMessage);

  useEffect(() => {
    setNewToast([...newMessage, newMessage[newMessage.length - 1]]);
  }, [newMessage]);

  function closeToast(id) {
    setNewToast(newToast.filter((i) => i !== id));
  }
  return (
    <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
      {newToast &&
        messagesReceived.map(
          (item, id) =>
            newToast.includes(item.messageId) && (
              <Toast key={id} onClose={() => closeToast(item.messageId)}>
                <Toast.Header>
                  <strong className="me-auto">{item.nameSender}</strong>
                  <small>{moment(item.createdAt).format(`HH:mm:ss`)}</small>
                </Toast.Header>
                <Toast.Body>{item.title}</Toast.Body>
              </Toast>
            ),
        )}
    </div>
  );
};

export default MessageAlert;
