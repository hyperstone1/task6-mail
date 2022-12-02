import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getMessagesReceived, getMessagesSended } from '../../http/userAPI';
import moment from 'moment';
import Accordion from 'react-bootstrap/Accordion';
import './index.scss';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Context from '../../utils/context/Context';
import { GoPrimitiveDot } from 'react-icons/go';
import MessageAlert from '../../components/MessageAlert';

const Profile = () => {
  const name = localStorage.getItem('name');
  const [user, setUser] = useState(name);
  const [showIncoming, setShowIncoming] = useState(true);
  const [showOutgoing, setShowOutgoing] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [messagesReceived, setMessagesReceived] = useState();
  const [messagesSended, setMessagesSended] = useState();
  const [show, setShow] = useState(false);
  const [dateNow, setDateNow] = useState();
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    setDateNow(moment().format('MMM'));
  }, []);

  useEffect(() => {
    getMessagesReceived(user).then((data) => {
      setMessagesReceived(data.reverse());
    });

    getMessagesSended(user).then((data) => {
      setMessagesSended(data.reverse());
    });
  }, [showOutgoing, showIncoming, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessagesReceived(user).then((data) => {
        if (
          data.length !== messagesReceived.length ||
          data[data.length - 1].messageId !== messagesReceived[0].messageId
        ) {
          setMessagesReceived(data.reverse());
          setNewMessage([...newMessage, data[0].messageId]);
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [messagesReceived, newMessage, user]);

  const handleSelectItem = (id) => {
    console.log(id);
    if (newMessage.includes(id)) {
      setNewMessage(newMessage.filter((item) => item !== id));
    }
  };

  return user ? (
    <Context.Provider
      value={{
        user,
        setUser,
        showIncoming,
        showOutgoing,
        receiverName,
        setReceiverName,
        messagesReceived,
        messagesSended,
        setMessagesSended,
        setShowIncoming,
        setShowOutgoing,
        show,
        setShow,
      }}
    >
      <div>
        <Header />
        <div className="messages">
          {messagesReceived && (
            <MessageAlert messagesReceived={messagesReceived} newMessage={newMessage} />
          )}
          <div className="all_messages">
            <Menu />
            {messagesReceived && showIncoming && (
              <Accordion defaultActiveKey="0">
                {messagesReceived.map((item, id) => (
                  <div key={id}>
                    <Accordion.Item style={{ position: 'relative' }} eventKey={id}>
                      {newMessage && newMessage.includes(item.messageId) && (
                        <GoPrimitiveDot
                          style={{
                            position: 'absolute',
                            top: '17px',
                            zIndex: '111',
                            left: '19px',
                          }}
                          fill={'red'}
                        />
                      )}
                      <Accordion.Header onClick={() => handleSelectItem(item.messageId)}>
                        <div className="message">
                          <div className="sender mail">
                            <b>From:</b> {item.nameSender}
                          </div>
                          <div className="title mail" style={{ textAlign: 'center' }}>
                            <b>Title:</b> {item.title}
                          </div>
                          <div className="time mail">
                            <b>
                              {dateNow !== moment(item.createdAt).format('MMM') ? 'Date' : 'Time'}:
                            </b>{' '}
                            {dateNow !== moment(item.createdAt).format('MMM')
                              ? moment(item.createdAt).format('DD MMM')
                              : moment(item.createdAt).format(`HH:mm:ss`)}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body style={{ textAlign: 'center' }}>
                        {item.messageBody}
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                ))}
              </Accordion>
            )}
            {messagesSended && showOutgoing && (
              <Accordion defaultActiveKey="0">
                {messagesSended.map((item, id) => (
                  <div key={id}>
                    <Accordion.Item eventKey={id}>
                      <Accordion.Header>
                        <div className="message">
                          <div className="sender mail">
                            <b>To:</b> {item.receiverName}
                          </div>
                          <div className="title mail" style={{ textAlign: 'center' }}>
                            <b>Title:</b> {item.title}
                          </div>
                          <div className="time mail">
                            <b>Time:</b>{' '}
                            {dateNow !== moment(item.createdAt).format('MMM')
                              ? moment(item.createdAt).format('DD.MMM')
                              : moment(item.createdAt).format(`HH:mm:ss`)}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body style={{ textAlign: 'center' }}>
                        {item.messageBody}
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  ) : (
    <Navigate to="/login" />
  );
};

export default Profile;
