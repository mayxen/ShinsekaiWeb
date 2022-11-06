import React, {useEffect} from 'react';
import Web from '@/Layouts/Web';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, useForm} from '@inertiajs/inertia-react';
import Button from "@mui/material/Button";
import {Link} from '@mui/material';
import TextField from "@mui/material/TextField";

export default function Login({canResetPassword}) {
    const {data, setData, post, errors, reset} = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Web>
            <Head title="Log in"/>
            <div className="containerModal">
                <div className="errorsModal">
                    <div className="">¡Esta Parte es exclusiva para miembros de shinsekai!</div>
                </div>
                <ValidationErrors errors={errors}/>

                <form className="formContactHome" onSubmit={submit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={data.email}
                        required
                        onChange={onHandleChange}
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
                        onChange={onHandleChange}
                    />

                    <div className="">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className=""
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}

                        <Button className="" type="submit">
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </Web>
    );
}
