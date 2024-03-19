import { Button } from '@nextui-org/react';
function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <Button color='warning' onClick={props.toggleModal}>Cerrar</Button>
        </div>
    );
}

export default Login;