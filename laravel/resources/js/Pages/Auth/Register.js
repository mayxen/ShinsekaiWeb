import React, {useEffect} from 'react';
import Web from '@/Layouts/Web';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, useForm} from '@inertiajs/inertia-react';
import Button from "@mui/material/Button";
import {Link} from '@mui/material';
import TextField from "@mui/material/TextField";

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Web>
            <Head title="Register"/>
            <div className="containerModal">
                <ValidationErrors errors={errors}/>

                <form className="formContactHome" onSubmit={submit}>

                    {/*name*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={data.name}
                        onChange={(e) => {
                            onHandleChange(e);
                        }}
                    />

                    {/*Email*/}
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        required
                        value={data.email}
                        onChange={(e) => {
                            onHandleChange(e);
                        }}
                    />

                    {/*phone*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        label="Teléfono"
                        type="tel"
                        fullWidth
                        variant="standard"
                        value={data.phone}
                        onChange={(e) => {
                            onHandleChange(e);
                        }}
                    />

                    {/*Contraseña*/}
                    <TextField
                        margin="dense"
                        name="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                        required
                        value={data.password}
                        onChange={(e) => {
                            onHandleChange(e);
                        }}
                    />

                    {/*Contraseña*/}
                    <TextField
                        margin="dense"
                        name="password_confirmation"
                        label="Confirmar contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                        required
                        value={data.password_confirmation}
                        onChange={(e) => {
                            onHandleChange(e);
                        }}
                    />
                    <span className={'forgotPassword'}>
                            <Link href={route('login')}>
                                ¿ya estás registrado?
                            </Link>
                        </span>
                    <Button type={'submit'}>Registrame</Button>
                </form>
            </div>
        </Web>
    );
}
