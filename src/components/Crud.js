import React from 'react';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import App from '../App.css';
import Message from './Message';

const data = [
    { id: 1, personaje: "Batman", team: "A" },
    { id: 2, personaje: "Batwoman V", team: "A" },
    { id: 3, personaje: "Robin", team: "A" },
    { id: 4, personaje: "Agent Zero", team: "B" },
    { id: 5, personaje: "Ghost Rider", team: "B" },
    { id: 6, personaje: "Hellcat", team: "C" },
];

class Crud extends React.Component {
    state = {
        data: data,
        form:{
            id:'',
            personaje:'',
            team:''
        },
        modalInsertar: false,
        modalEditar: false,
    };

handleChange=e=>{
this.setState({
    form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
    }
});
}

mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
}

ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
}

mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
}

ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
}

insertar=()=>{
    var valorNuevo = {...this.state.form};
    console.log(this.state.data);
    valorNuevo.id = (this.state.data.length > 0) ? this.state.data[this.state.data.length-1].id + 1 : 1;

    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
}
editar=(dato)=>{
    var contador = 0;
    var lista=this.state.data;
    lista.map((registro)=>{
        if(dato.id===registro.id){
            lista[contador].personaje=dato.personaje;
            lista[contador].team=dato.team;
        }
        contador++;
        return registro;
    });

    this.setState({data: lista,modalEditar: false});
}

eliminar=(dato)=>{
    var opcion=window.confirm("Realmente desea eliminar el registro" + dato.id + "?")
    if(opcion){
        var contador = 0;
        var lista = this.state.data;
        lista.map((registro)=>{
            if(registro.id===dato.id){
                lista.splice(contador, 1)
            }
            contador++
            return registro;
        })
        this.setState({data: lista});
    }
}

    render() {
        return (
            <>
                <Message/>
                <Container>
                    <br></br>
                    <button className="btn btn-success" onClick={()=>this.mostrarModalInsertar()}>Ingresar un nuevo superheroe</button>

                    <Table>
                        <thead>
                            <tr>
                                <th id="id">ID:</th>
                                <th id="personaje">Personaje:</th>
                                <th id="team">Team:</th>
                                <th id="acciones">Acciones:</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((elemento) => (
                                <tr>
                                    <td>{elemento.id}</td>
                                    <td>{elemento.personaje}</td>
                                    <td>{elemento.team}</td>
                                    <td><Button className="btn btn-warning" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                                    {"  "}
                                    <Button className="btn btn-danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>

                </Container>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Registro</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>ID:</label>
                            <input className="form-Control" readOnly type="text" value={this.state.data.length + 1} />
                        </FormGroup>

                        <FormGroup>
                            <label>Personaje:</label>
                            <input className="form-control" name="personaje" type="text" onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <label>Team:</label>
                            <input className="form-control" name="team" type="text" onChange={this.handleChange}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button className="btn btn-info" onClick={()=>this.insertar()}>Insertar</Button>
                        <Button className="btn btn-danger" onClick={()=>this.ocultarModalInsertar()} >Cancelar</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Registro</h3>
                    </div>
                </ModalHeader>

                <ModalBody>
                        <FormGroup>
                            <label>ID:</label>
                            <input className="form-control" readOnly type="text" value={this.state.form.id} />
                        </FormGroup>

                        <FormGroup>
                            <label>Personaje:</label>
                            <input className="form-control" name="personaje" type="text" onChange={this.handleChange} value={this.state.form.personaje} />
                        </FormGroup>

                        <FormGroup>
                            <label>Team:</label>
                            <input className="form-control" name="team" type="text" onChange={this.handleChange} value={this.state.form.team}/>
                        </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button className="btn btn-success" onClick={()=>this.editar(this.state.form)} >Editar</Button>
                    <Button className="btn btn-danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
                </ModalFooter>

                </Modal>
            </>)
    }
}

export default Crud;