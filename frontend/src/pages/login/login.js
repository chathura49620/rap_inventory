
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import "./login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const handleInputChange = (event) => {
    const {name, value } = event.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
      })
      const result = await response.json();
      localStorage.setItem("token",result.token)
      console.log(result);
      navigate("/login")
    } catch (error) {
        console.error(error.message);
    } finally {
        setFormData({
          f_name:"",
          l_name:"",
          phone:"",
          email:"",
          password:"",
        })
    }
    // console.log("f_name",formData.f_name);
    // console.log("l_name",formData.l_name);
    // console.log("phone",formData.phone);
    // console.log("email",formData.email);
    // console.log("password",formData.password);
  } 

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
          type="email"
          name="email"
          placeholder='Enter email'
          value={formData.email}
          onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password"
          name="password"
          placeholder='Enter Password'
          value={formData.password}
          onChange={handleInputChange}
          />
        </Form.Group>
        <Button varient="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
}
export default Login;