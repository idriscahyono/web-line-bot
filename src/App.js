import React from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ListProduk from "./pages/ListProduk";
import CreateProduk from "./pages/CreateProduk";

export default class App extends React.Component {
  state = {
    activeItem: "WebChatbot"
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
          </Menu>
          <Route path="/" exact component={ListProduk} />
          <Route path="/createproduk" exact component={CreateProduk} />
        </Router>
      </>
    );
  }
}
