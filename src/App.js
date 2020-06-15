import React from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import CreateProduk from "./pages/CreateProduk";
import EditProduk from "./pages/EditProduk";
import ListProduk from "./pages/ListProduk";
import CreateJenisProduk from "./pages/CreateJenisProduk";
import EditJenisProduk from "./pages/EditJenisProduk";
import ListJenisProduk from "./pages/ListJenisProduk";
import Login from "./pages/Login";
import withAuth from "./withAuth";

export default class App extends React.Component {
  state = {
    activeItem: "WebChatbot",
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ token: null });
  };

  handleItemClick = (e, { name }) =>
    this.setState({
      activeItem: name,
    });

  render() {
    const { activeItem } = this.state;
    const NotFound = ()=>{
      return(
        <h3>
          404 - Not Found
        </h3>
      )
    }
    return (
      <>
      {!localStorage.getItem("token")?(
      <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/createproduk" component={NotFound} />
        <Route path="/createjenisproduk" component={NotFound} />
        <Route path="/editproduk" component={NotFound} />
        <Route path="/editjenisproduk" component={NotFound} />
        <Route path="/logout" component={NotFound} />
      </Router>       
      ):(
        <Router>
          <Menu color="black" inverted>
            <Menu.Item header name="WebChatbot" className="WebChatbot">
              WebChatbot
            </Menu.Item>
            <Menu.Item
              name="Tambah Produk"
              as={Link}
              to="/createproduk"
              active={activeItem === "Create Produk"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Tambah Jenis Produk"
              as={Link}
              to="/createjenisproduk"
              active={activeItem === "Create Jenis Produk"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="List Jenis Produk"
              as={Link}
              to="/listjenisproduk"
              active={activeItem === "List Jenis Produk"}
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
              position="right"
              name="logout"
              as={Link}
              to="/"
              active={activeItem === "Logout"}
              onClick={this.handleLogout}
            />
          </Menu>
          <Route path="/createproduk" component={CreateProduk} />
          <Route path="/createjenisproduk" component={CreateJenisProduk} />
          <Route path="/listjenisproduk" component={ListJenisProduk} />
          <Route path="/listproduk" component={ListProduk}/>
          <Route path="/editproduk" component={EditProduk} />
          <Route path="/editjenisproduk" component={EditJenisProduk} />
          <Route path="/logout" component={Login} />
        </Router>
      )} 
      </>
    );

  }
}
