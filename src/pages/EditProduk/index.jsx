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
  FormField,
} from "semantic-ui-react";

export default class EditProduk extends React.Component {
  produk = this.props.location.state.produk;
  state = {
    id: this.produk._id,
    nama: this.produk.nama,
    harga: this.produk.harga,
    stock: this.produk.stock,
    berat: this.produk.berat,
    urlImage: this.produk.image_url,
  };

  handleNamaChange = (event) => {
    this.setState({
      nama: event.target.value,
    });
  };

  handleHargaChange = (event) => {
    this.setState({
      harga: event.target.value,
    });
  };

  handleStockChange = (event) => {
    this.setState({
      stock: event.target.value,
    });
  };

  handleBeratChange = (event) => {
    this.setState({
      berat: event.target.value,
    });
  };

  handleSubmitClick = (id) => {
    const { nama, harga, stock, berat, image } = this.state;
    Axios.put(
      `https://backend-skripsi.herokuapp.com/produk/${id}`,
      {
        nama,
        harga,
        stock,
        berat,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      const { data } = res;
      const formData = new FormData();
      formData.append("image", this.state.image);
      Axios.post(
        `https://backend-skripsi.herokuapp.com/produk/${this.state.id}/upload`,
        formData
      ).then(() => {
        alert("Berhasil Edit Data Produk");
        this.props.history.push("/listproduk");
      });
    });
  };

  handleFileChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  render() {
    return (
      <>
        <Segment basic>
          <h1>Edit Data Produk</h1>
        </Segment>
        <Segment basic>
          <Form>
            <Label size="large">Nama Produk</Label>
            <Form.Field>
              <Input
                fluid
                value={this.state.nama}
                placeholder="Tulis Nama Produk"
                onChange={this.handleNamaChange}
              />
            </Form.Field>
            <Label size="large">Harga Produk</Label>
            <Form.Field>
              <Input
                fluid
                type="number"
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
            <Label size="large">Berat Produk</Label>
            <FormField>
              <Input
                fluid
                type="number"
                value={this.state.berat}
                placeholder="Tulis Berat"
                onChange={this.handleBeratChange}
              />
            </FormField>
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
                onClick={this.handleSubmitClick(this.state.id)}
              >
                Edit Produk
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </>
    );
  }
}
