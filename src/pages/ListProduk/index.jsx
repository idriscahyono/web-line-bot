import {
  Card,
  Image,
  Segment,
  Gird,
  CardHeader,
  CardContent,
  Button
} from "semantic-ui-react";
import React from "react";
import Axios from "axios";

export default class ListProduk extends React.Component {
  state = {
    produk: []
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    Axios.get("http://localhost:3000/produk").then(res => {
      this.setState({
        produk: res.data
      });
    });
  };

  deleteData = id => {
    Axios.delete(`http://localhost:3000/produk/${id}`).then(res => {
      this.getData();
    });
  };

  handleButtonDeleteClick = id => {
    this.deleteData(id);
  };

  handleCardClick = (produk, urlImage) => {
    produk.urlImage = urlImage;
    this.props.history.push("/detailproduk", { produk });
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
