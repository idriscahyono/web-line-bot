import {
  Card,
  Image,
  Segment,
  CardHeader,
  CardContent,
  Button,
  FormField,
  Dropdown,
  CardMeta,
  CardDescription
} from "semantic-ui-react";
import React from "react";
import Axios from "axios";

export default class ListProduk extends React.Component {
  state = {
    produk: [],
    listjenis: [],
    jenis:""
  };

  componentDidMount = () => {
    this.getData();
    this.getJenisData();
  };

  handleJenisChange = event => {
    this.setState({
      jenis: event
    })
  };

  getJenisData=()=>{
    Axios.get("https://backend-skripsi.herokuapp.com/jenisProduk", {
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

  getData = () => {
    Axios.get(`https://backend-skripsi.herokuapp.com/produk`, {
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
    Axios.delete(`https://backend-skripsi.herokuapp.com/produk/${id}`, {
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
    const listProduk = this.state.produk.filter((produk)=>{
      return produk.jenis.indexOf(this.state.jenis)>=0
    }).map((produk, index)=>{
      return(
        <Card centered color="green">
          <Image src={produk.image_url} wrapped ui={true} />
            <Card.Content onClick={() => this.handleCardClick(produk)}>
              <CardHeader>
                <p>{produk.nama}</p>
              </CardHeader>
              <CardDescription>
                <p>Harga : Rp.{produk.harga}</p>
                <p>Stock : {produk.stock}</p>
                <p>Berat : {produk.berat}gr</p>
              </CardDescription>
            </Card.Content>
            <CardContent>
              <Button
                onClick={() => this.handleButtonDeleteClick(produk._id)}
                  >
                Hapus Produk
              </Button>
            </CardContent>
        </Card>       
      )
    })
    return (
      <>
      <Segment basic>
        <FormField>
          <Dropdown
          fluid
          placeholder="Pilih Jenis"
          selection
          options={this.state.listjenis}
          onChange={(event, data)=>this.handleJenisChange(data.value)}
          >
          </Dropdown>
        </FormField>
      </Segment>
        <Segment basic>
          <Card.Group>
          {listProduk}
          </Card.Group>
        </Segment>
      </>
    );
  }
}
