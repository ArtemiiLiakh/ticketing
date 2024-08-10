import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRequest } from '@/hooks/useRequest';
import Router from 'next/router';

export default function Login({ user }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { request, errors, setErrors } = useRequest();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await request({
      url: '/auth/signin',
      method: 'post',
      data: {
        email,
        password
      }
    });

    if (response) {
      Router.push('/');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      { user ? <h4>You are logged in as {user.email}</h4> : ''}

      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control 
          id="email" 
          type="text" 
          placeholder='Enter email' 
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors(undefined);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control 
          id="password" 
          type="password" 
          placeholder='Enter password' 
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors(undefined);
          }}
        />
      </Form.Group>

      { errors }
      
      <Button type="submit">Login</Button>
    </Form>
  );
}