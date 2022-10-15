import * as React from 'react';
import {useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {Switch} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        editable: true,
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Destacar producto',
        width: 150,
        getActions: () => [
            <Switch/>
        ]
    }
];

const rows = [
    {id: 1, name: 'Caja personalizada'}
];

export default function ContentHighlightedHome({setPageLoaded}) {

    useEffect(() => {
        setPageLoaded(true);
    }, []);


    return (
        <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{display: 'block'}}/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Buscar producto destacado"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" sx={{mr: 1}}>
                                Destacar producto
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                No hay productos destacados
            </Typography>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </Paper>
    );
}
