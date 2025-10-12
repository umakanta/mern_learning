import React from "react"
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <header className="App-header">
      <main className="mw-500 text-center px-3">
        <section>
          <h1>Register to BookMyShow</h1>
        </section>
        <section>
          <Form layout="vertical">
             <Form.Item
              label="Name"
              name="name"
              htmlFor="name" className="d-block"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input id="name" type="text" placeholder="Enter your Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              htmlFor="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input type="email" placeholder="Enter your Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              htmlFor="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input type="password" placeholder="Enter your Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            Already a User ? <Link to="/login">Login Now</Link>
          </p>
        </section>
      </main>
    </header>
  );
}

export default Register