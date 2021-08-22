import React, {Component} from "react";
import './App.css';
import {Caption, Slide,Slider,Grid, Pagination, classes,TextInput,Table, Paper,ProgressBar,Row, SideNav, Button, Icon, SideNavItem, Col, Card, CardTitle} from 'react-materialize';
import axios from 'axios';

class App extends Component {

  constructor (props){
    super(props);
    this.state={
      dataApi:[],
      edit:false,
      dataPost:{
        id:0,
        nama:'',
        jabatan:'',
        jk:'',
        tLahir:''
      }
    };
    this.handleRemove=this.handleRemove.bind(this);
    this.inputChange=this.inputChange.bind(this);
    
  }


  reloadData() {
    axios.get("http://localhost:3004/posts").then(res => {
      this.setState ({
        dataApi:res.data,
        edit:false
      })
    });
  }

  handleRemove (e) {
    console.log(e.target.value);
    fetch(`http://localhost:3004/posts/${e.target.value}`, {
    method:"DELETE"
  }).then(res=> this.reloadData());
}

inputChange(e) {
  let newdataPost = {...this.state.dataPost};
  if (this.state.edit===false){
  newdataPost['id'] = new Date().getTime();
  }
  newdataPost [e.target.name] = e.target.value;

  this.setState({
    dataPost : newdataPost
  },()=>console.log(this.state.dataPost) )
}

clearData =()=> {
  let newdataPost = {...this.state.dataPost};

    newdataPost['id']="";
    newdataPost["nama"]="";
    newdataPost["jabatan"]="";
    newdataPost["jk"]="";
    newdataPost["tLahir"]="";
  
    this.setState({
      dataPost :newdataPost
    });
}

// =============
onSubmitForm =()=> {
  if (this.state.edit == false){
  axios.post(`http://localhost:3004/posts`,this.state.dataPost)
  .then (()=> {
    this.reloadData();
    this.clearData();

    
  });
} else{
  // request put
  axios.put(`http://localhost:3004/posts/${this.state.dataPost.id}`, this.state.dataPost).then(() => {
    this.reloadData();
    // menghapus value datapost
    this.clearData();

  })
}
};

getDataId=(e)=> {
  axios.get(`http://localhost:3004/posts/${e.target.value}`)
  .then(res=> {
    this.setState({
      dataPost:res.data,
      edit: true
    });
  });

};

componentDidMount() {
  this.reloadData();
}


  render () {
    return (
      <div>

{/* class data karyawan */}
        <div className="row">
          <nav>
            <div className="nav-wrapper light-blue-accent">
              <a class="brand-logo center">Data Karyawan</a>
            </div>
          </nav>
        </div>

        <Row>
          <Col s={12}>
            <ProgressBar />
          </Col>
        </Row>

        <div className="container">
          <div className="row">
            <TextInput
              label="Masukkan Nama Karyawan"
              name='nama'
              value={this.state.dataPost.nama}
              onChange={this.inputChange}
            />
            <TextInput
              label="Masukkan Jabatan"
              name='jabatan'
              value={this.state.dataPost.jabatan}
              onChange={this.inputChange}
            />
            <TextInput
              label="Masukkan Jenis Kelamnin"
              name='jk'
              value={this.state.dataPost.jk}
              onChange={this.inputChange}
            />
            <TextInput
              label="Tanggal Lahir"
              type="date"
              name='tLahir'
              value={this.state.dataPost.tLahir}
              onChange={this.inputChange}
            />
            <br/>
            <Button 
              className="waves-effect waves-light btn findbtn"
              type='submit'
              onClick={this.onSubmitForm}
            >Simpan Data</Button>

{/* source code menampilkan data sebelum edit */}
          {this.state.dataApi.map((dat,index) =>
                {
                  return (
                  <div >
                  <table key={index}>
                    <thead>
                      <tr>
                          <th>Nama</th>
                          <th>Jabatan</th>
                          <th>Jenis Kelamin</th>
                          <th>Tanggal Lahir</th>
                          <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{dat.nama}</td>
                        <td>{dat.jabatan}</td>
                        <td>{dat.jk}</td>
                        <td>{dat.tLahir}</td>
                        <td>
                          <button value={dat.id} onClick={this.handleRemove} className="waves-effect waves-light btn findgreen">Delete</button><a> </a>
                          <button value={dat.id} onClick={this.getDataId} className="waves-effect waves-light btn">Edit</button>
                        </td>
                      </tr>
                
                    </tbody>
                  </table>




                    {/* <p><br/>{dat.nama}</p>
                    <p><br/>{dat.jabatan}</p>                     */}
                    {/* <button value={dat.id} onClick={this.handleRemove}>Delete</button>
                    <button value={dat.id} onClick={this.getDataId}>Edit dataApi</button> */}
                  </div>
                  );
                })}
          </div>
        </div>

        

      </div>
    );
  }
}

export default App;