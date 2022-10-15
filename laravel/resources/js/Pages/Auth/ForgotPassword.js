import React from 'react';
import Web from '@/Layouts/Web';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, useForm} from '@inertiajs/inertia-react';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

export default function ForgotPassword({status}) {
    const {data, setData, post, errors} = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Web>
            <Head title="Forgot Password"/>
            <div className="containerModal">

                <h4 className="setPrimaryColor">
                    ¿Olvidaste tu contraseña? No pasa nada, pon tu email en el formulario de abajo y te enviaremos a tu
                    correo un enlace para que puedas recuperarla.
                </h4>

                <ValidationErrors errors={errors}/>

                <form className="formDefyhome" onSubmit={submit}>
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        required
                        value={data.email}
                        onChange={onHandleChange}
                    />
                    <div>
                        <Button type={'submit'}>
                            Enviar correo
                        </Button>
                    </div>
                </form>
            </div>
        </Web>
    );
}
