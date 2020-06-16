import React from "react";
import Axios from "axios";
import {
  Input,
  Button,
  Form,
  Segment,
  Label,
  FormField
} from "semantic-ui-react";

export default class CreateJenisProduk extends React.Component {
  state = {
    nama: "",
  };

  handleNamaChange = event => {
    this.setState({
      nama: event.target.value
    });
  };

  handleSubmitClick = () => {
    const { nama } = this.state;
    Axios.post(
      "https://backend-skripsi.herokuapp.com/jenisProduk",
      {
        nama,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then(res => {
      const { data } = res;
      const formData = new FormData();
      formData.append("image", this.state.image);

      Axios.post(
        `https://backend-skripsi.herokuapp.com/jenisProduk/${data._id}/upload`,
        formData
      ).then(() => {
        alert("Berhasil Menambahkan Jenis Produk Baru");
        this.props.history.push("/listjenisproduk");
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
          <h1>Tambahkan Jenis Baru</h1>
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
                onClick={this.handleSubmitClick}
              >
                Tambahkan Jenis Produk
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </>
    );
  }
}
