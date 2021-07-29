import App from '../App.css';
import FacebookLogin from 'react-facebook-login';
import { useHistory } from 'react-router';
import Message from './Message';


function Facebook() {

    let history = useHistory();

    const respuestaFacebook = (respuesta) => {
        console.log("response", respuesta);

        if(respuesta!== undefined && respuesta.status === 'unknown') {
            alert("Ocurrio un error...."); 
            //return;
        } else {
            console.log('Esta todo ok, se registró sin problemas');
        }
        
        history.push('/Crud');
    }

    return(  
        <div>
            <Message/>
            <center>
            <br></br>
            <FacebookLogin
            appId="1563114517225736"
            autoLoad={false}
            fields="name,email,picture"
            callback={respuestaFacebook}
            textButton="Inicia Sesion Con Facebook"
            icon="fa-facebook"
            />
            </center>
        </div>
    );
}

export default Facebook;