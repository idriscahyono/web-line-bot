import { Card, Image, Segment, Gird, CardHeader } from "semantic-ui-react";
import React from "react";
import Axios from "axios";

export default class ListProduk extends React.Component {
  state = {
    produk: []
  };

  componentDidMount = () => {
    Axios.get("http://localhost:3000/produk").then(res => {
      this.setState({
        produk: res.data
      });
    });
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
              <Card
                centered
                color="red"
                onClick={() => this.handleCardClick(produk)}
              >
                <Image wrapped ui={true} />
                <Card.Content>
                  <CardHeader>
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "260px"
                      }}
                    >
                      {produk.name}
                    </p>
                  </CardHeader>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      </>
    );
  }
}
