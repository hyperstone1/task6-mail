import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './index.scss';
import { simulateLoading } from '../../utils/loading';

const Login = () => {
  const [name, setName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      simulateLoading().then(() => {
        setLoading(false);
      });
      navigate('/profile');
    }
  }, [isLoading, navigate]);

  const handleClick = () => {
    localStorage.setItem('name', name);
    setLoading(true);
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <div className="loginPage">
      <h2>Авторизация</h2>
      <Form className="form" onSubmit={handleClick}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control
            value={name}
            onChange={onChangeInput}
            type="email"
            placeholder="Введите имя"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={!isLoading ? handleClick : null}
        >
          {isLoading ? <Spinner animation="border" /> : 'Войти'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
