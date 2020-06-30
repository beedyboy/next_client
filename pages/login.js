import React, { useState, useEffect } from "react";
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';

const Login = (props) => { 
    const [formState, setFormState] = useState({
        referred: false,
        goto: '',
        email: '',
        password: ''
    });
    useEffect(() => {
    //    console.log(formState);
    }, [formState]);

    const handleChange = e => {
        e.persist();
        setFormState(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }
        return (
            <Form>
                 <h3>Sign In</h3>

                <FormGroup>
                <Label>Email address</Label>
                    <Input type="email" name="email" value={formState.email} onChange={handleChange} className="form-control" placeholder="Enter email" />
                </FormGroup>
                
                <FormGroup>
                <Label>Password</Label>
                    <Input type="password" name="password" value={formState.password} onChange={handleChange}  className="form-control" placeholder="Enter password" />
             
                </FormGroup>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <Label className="custom-control-label" htmlFor="customCheck1">Remember me</Label>
                    </div>
                </div> */}

                <Button type="submit" color="primary" className=" btn-block">Submit</Button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </Form>
            
        );
    }
    export default Login;