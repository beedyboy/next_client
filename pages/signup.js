import React, { Component } from "react";
import { Form, Label, Input, Button } from 'reactstrap';

export default class SignUp extends Component {
    render() {
        return (
            <Form>
                 <h3>Sign Up</h3>

                <div className="form-group">
                    <Label>Email address</Label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <Label>Password</Label>
                    <Input type="password" className="form-control" placeholder="Enter password" />
                </div> 

                <Button type="submit" color="primary" className=" btn-block">Register</Button>
                 
            </Form>
            
        );
    }
}