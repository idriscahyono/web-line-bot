import React from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ListProduk from "./pages/ListProduk";
import CreateProduk from "./pages/CreateProduk";
import Login from "./pages/Login";
import withAuth from "./withAuth";

export default class App extends React.Component {
  state = {
    activeItem: "WebChatbot"
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ token: null });
  };

  handleItemClick = (e, { name }) =>
    this.setState({
      activeItem: name
    });

  render() {
    const { activeItem } = this.state;
    return (
      <>
        <Router>
          <Menu color="black" inverted>
            <Menu.Item header name="WebChatbot" className="WebChatbot">
              WebChatbot
            </Menu.Item>
            <Menu.Item
              name="Create Produk"
              as={Link}
              to="/createproduk"
              active={activeItem === "Create Produk"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="List Produk"
              as={Link}
              to="/listproduk"
              active={activeItem === "List Produk"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Login"
              as={Link}
              to="/"
              active={activeItem === "Login"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              position="right"
              name="logout"
              as={Link}
              to="/"
              active={activeItem === "Logout"}
              onClick={this.handleLogout}
            />
          </Menu>
          <Route path="/" exact component={Login} />
          <Route
            path="/createproduk"
            exact
            component={withAuth(CreateProduk)}
          />
          <Route path="/listproduk" exact component={withAuth(ListProduk)} />
          <Route path="/logout" exact component={Login} />
        </Router>
      </>
    );
  }
}
