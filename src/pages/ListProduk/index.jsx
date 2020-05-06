import {
  Card,
  Image,
  Segment,
  Gird,
  CardHeader,
  CardContent,
  Button,
} from "semantic-ui-react";
import React from "react";
import Axios from "axios";

export default class ListProduk extends React.Component {
  state = {
    produk: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    Axios.get("http://localhost:4000/produk", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      this.setState({
        produk: res.data,
      });
    });
  };

  deleteData = (id) => {
    Axios.delete(`http://localhost:4000/produk/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      this.getData();
    });
  };

  handleButtonDeleteClick = (id) => {
    this.deleteData(id);
  };

  handleCardClick = (produk, urlImage) => {
    produk.image_url = urlImage;
    this.props.history.push("/editproduk", { produk });
  };

  render() {
    return (
      <>
        <Segment basic>
          <Card.Group>
            {this.state.produk.map((produk, index) => (
              <Card centered color="green">
                <Image src={produk.image_url} wrapped ui={true} />
                <Card.Content onClick={() => this.handleCardClick(produk)}>
                  <CardHeader>
                    <p>{produk.nama}</p>
                    <p>Stock : {produk.stock}</p>
                    <p>Berat : {produk.berat}</p>
                  </CardHeader>
                </Card.Content>
                <CardContent>
                  <Button
                    onClick={() => this.handleButtonDeleteClick(produk._id)}
                  >
                    Hapus Produk
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      </>
    );
  }
}
