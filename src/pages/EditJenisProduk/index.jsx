import React from "react";
import Axios from "axios";
import {
  Input,
  Button,
  Form,
  Segment,
  Label,
  FormField,
} from "semantic-ui-react";

export default class EditJenisProduk extends React.Component {
  jenis = this.props.location.state.jenis;
  state = {
    id: this.jenis._id,
    nama: this.jenis.nama,
  };

  handleNamaChange = (event) => {
    this.setState({
      nama: event.target.value,
    });
  };

  handleSubmitClick = (id) => {
    const { nama} = this.state;
    Axios.put(
      `https://backend-skripsi.herokuapp.com/jenisProduk/${id}`,
      {
        nama,
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
        `https://backend-skripsi.herokuapp.com/jenisProduk/${this.state.id}/upload`,
        formData
      ).then(() => {
        alert("Berhasil Edit Jenis Produk");
        this.props.history.push("/listjenisproduk");
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
          <h1>Edit Jenis Produk</h1>
        </Segment>
        <Segment basic>
          <Form>
            <Label size="large">Jenis Produk</Label>
            <Form.Field>
              <Input
                fluid
                value={this.state.nama}
                placeholder="Tulis Jenis Produk"
                onChange={this.handleNamaChange}
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
                onClick={this.handleSubmitClick(this.state.id)}
              >
                Edit jenis Produk
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </>
    );
  }
}
