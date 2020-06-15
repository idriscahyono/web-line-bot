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
  
  export default class ListJenisProduk extends React.Component {
    state = {
      jenis: [],
    };
  
    componentDidMount = () => {
      this.getData();
    };
  
    getData = () => {
      Axios.get("http://localhost:4000/jenisProduk", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        this.setState({
          jenis: res.data,
        });
      });
    };
  
    deleteData = (id) => {
      Axios.delete(`http://localhost:4000/jenisProduk/${id}`, {
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
  
    handleCardClick = (jenis, urlImage) => {
        jenis.image_url = urlImage;
        this.props.history.push("/editjenisproduk", { jenis });
    };
  
    render() {
      return (
        <>
          <Segment basic>
            <Card.Group>
              {this.state.jenis.map((jenis, index) => (
                <Card centered color="green">
                  <Image src={jenis.image_url} wrapped ui={true} />
                  <Card.Content onClick={() => this.handleCardClick(jenis)}>
                    <CardHeader>
                      <p>{jenis.nama}</p>
                    </CardHeader>
                  </Card.Content>
                  <CardContent>
                    <Button
                      onClick={() => this.handleButtonDeleteClick(jenis._id)}
                    >
                      Hapus Jenis Produk
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
  