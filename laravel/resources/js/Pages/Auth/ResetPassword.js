import React, {useEffect} from 'react';
import Web from '@/Layouts/Web';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, useForm} from '@inertiajs/inertia-react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ResetPassword({token, email}) {
    const {data, setData, post, errors, reset} = useForm({
        token: token,
        email: email || "",
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <Web>
            <Head title="Reset Password"/>

            <div className="containerModal">
                <ValidationErrors errors={errors}/>

                <form className="formDefyhome" onSubmit={submit}>
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
                    <TextField
                        margin="dense"
                        name="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={data.password}
                        required
                        onChange={onHandleChange}
                    />

                    <TextField
                        margin="dense"
                        name="password_confirmation"
                        label="Confirmar contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={data.password_confirmation}
                        required
                        onChange={onHandleChange}
                    />

                    <div>
                        <Button type={"submit"}>
                            Cambiar contraseña
                        </Button>
                    </div>
                </form>
            </div>
        </Web>
    );
}
