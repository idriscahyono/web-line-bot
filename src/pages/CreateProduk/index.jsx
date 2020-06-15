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
  Dropdown
} from "semantic-ui-react";

export default class CreateProduk extends React.Component {
  state = {
    listjenis: [],
    nama: "",
    jenis: "",
    harga: 0,
    stock: 0,
    berat: 0,
    image: null
  };
  componentDidMount = () => {
    this.getJenisData();
  };

  handleNamaChange = event => {
    this.setState({
      nama: event.target.value
    });
  };

  handleJenisChange = event => {
    this.setState({
      jenis: event
    })
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

  handleBeratChange = event =>{
    this.setState({
      berat: event.target.value
    })
  }

  getJenisData=()=>{
    Axios.get("http://localhost:4000/jenisProduk",{
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((res)=>{
      var options = []
      res.data.map((listjenis)=>{
        options.push({
          text: listjenis.nama,
          value: listjenis.nama
        })
      })
      this.setState({
        listjenis: options
      })
      console.log(options)
    })
  }

  handleSubmitClick = () => {
    const { nama, harga, stock, berat, jenis} = this.state;
    Axios.post(
      "http://localhost:4000/produk",
      {
        nama,
        jenis,
        harga,
        stock,
        berat
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
        `http://localhost:4000/produk/${data._id}/upload`,
        formData
      ).then(() => {
        alert("Berhasil Menambahkan Data Baru");
        this.props.history.push("/listproduk");
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
            <Label size='large'>Berat Produk</Label>
            <FormField>
            <Input
                fluid
                type="number"
                value={this.state.berat}
                placeholder="Tulis Berat"
                onChange={this.handleBeratChange}
              />
            </FormField>
            <Label size='large'>Jenis Produk</Label>
            <FormField>
              <Dropdown
                placeholder="Pilih Jenis"
                selection
                options={this.state.listjenis}
                onChange={(event, data)=>this.handleJenisChange(data.value)}
                >
              </Dropdown>
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
