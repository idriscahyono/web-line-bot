import React from "react";
import Axios from "axios";
import {
  Input,
  Button,
  Form,
  TextArea,
  Grid,
  Segment,
  Label,
  FormField
} from "semantic-ui-react";

export default class CreateProduk extends React.Component {
  state = {
    nama: "",
    harga: "",
    stock: 0,
    image: null
  };

  handleNamaChange = event => {
    this.setState({
      nama: event.target.value
    });
  };

  handleHargaChange = event => {
    this.setState({
      harga: event.target.value
    });
  };

  handleStockChange = event => {
    this.setState({
      stock: event.target.value
    });
  };

  handleSubmitClick = () => {
    const { nama, harga, stock, image } = this.state;
    Axios.post("http://localhost:3000/produk", {
      nama,
      harga,
      stock
    }).then(res => {
      const { data } = res;
      const formData = new FormData();
      formData.append("image", this.state.image);

      Axios.post(
        `http://localhost:3000/produk/${data._id}/upload`,
        formData
      ).then(() => {
        alert("Berhasil Menambahkan Data Baru");
        this.props.history.push("/");
      });
    });
  };

  handleFileChange = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  render() {
    return (
      <>
        <Segment basic>
          <h1>Tambahkan Data Baru</h1>
        </Segment>
        <Segment basic>
          <Form>
            <Label size="large">Nama Produk</Label>
            <Form.Field>
              <Input
                fluid
                value={this.state.nama}
                placeholder="Tulis Resep"
                onChange={this.handleNamaChange}
              />
            </Form.Field>
            <Label size="large">Harga Produk</Label>
            <Form.Field>
              <Input
                fluid
                value={this.state.harga}
                placeholder="Tulis Harga"
                onChange={this.handleHargaChange}
              />
            </Form.Field>
            <Label size="large">Stock Produk</Label>
            <Form.Field>
              <Input
                fluid
                type="number"
                value={this.state.stock}
                placeholder="Tulis Stock"
                onChange={this.handleStockChange}
              />
            </Form.Field>
            <FormField>
              <Label size="large">Gambar</Label>
              <Input type="file" onChange={this.handleFileChange} />
            </FormField>
            <Form.Field>
              <Button
                fluid
                size="huge"
                color="green"
                icon="minus"
                onClick={this.handleSubmitClick}
              >
                Tambahkan Produk
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </>
    );
  }
}
