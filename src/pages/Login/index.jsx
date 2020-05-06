import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export default class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  setToken = token => {
    localStorage.setItem("token", token);
    this.setState({ token });
  };

  handleSubmitClick = () => {
    const { username, password } = this.state;
    Axios.post("http://localhost:4000/user/login", {
      username,
      password
    }).then(res => {
      if (res.data.success) {
        this.setToken(res.data.token);
        this.props.history.push("/listproduk");
      } else {
        alert("username atau password salah");
      }
    });
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="green" textAlign="center">
            Login
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />

              <Button
                color="green"
                fluid
                size="large"
                onClick={this.handleSubmitClick}
              >
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
