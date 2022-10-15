//icons
import FilterListIcon from '@mui/icons-material/FilterList';

import React, {useEffect, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import {
    Autocomplete,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

export default function SearchHome({data, setData, post, purchaseTypeList, homeTypeList, cities, submitReset, filter}) {

    const [backgroundImage, setBackgroundImage] = useState("backgroundSearchBox backgroundImage");
    const NUMBER_OF_IMAGES = 5;

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    function submit(e) {
        e.preventDefault();
        post(route('search'));
    }

    useEffect(() => {
        setBackgroundImage("backgroundSearchBox backgroundImage" + (Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1));
    }, []);

    return (
        <div className={backgroundImage}>
            <div className="searchBox">
                <h3>Encuentra tu hogar!</h3>
                <form onSubmit={submitReset ? submitReset : submit}>
                    <FormControl className="searchSelect" sx={{m: 1, minWidth: 120}}>
                        <InputLabel id="purchaseType">¿Que buscas?</InputLabel>
                        <Select
                            labelId="¿Que buscas?"
                            label="¿Que buscas?"
                            id="purchaseType"
                            name="purchaseType"
                            value={data.purchaseType}
                            onChange={onHandleChange}
                        >
                            <MenuItem value={-1}>Cualquiera</MenuItem>
                            {purchaseTypeList.map((purchaseType, i) =>
                                <MenuItem key={i} value={purchaseType.id}>{purchaseType.type}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl className="searchSelect" sx={{m: 1, minWidth: 120}}>
                        <InputLabel id="homeType">Tipo</InputLabel>
                        <Select
                            labelId="Tipo"
                            label="Tipo"
                            id="homeType"
                            name="homeType"
                            value={data.homeType}
                            onChange={onHandleChange}
                        >
                            <MenuItem value={-1}>Cualquiera</MenuItem>
                            {homeTypeList.map(homeType =>
                                <MenuItem key={homeType.id} value={homeType.id}>{homeType.type}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    {filter && screen.width <= 834 &&
                        <FormControl className="searchSelect" sx={{m: 1, minWidth: 120}}>
                            <Button onClick={filter}>
                                más filtros<FilterListIcon/>
                            </Button>
                        </FormControl>
                    }
                    <div className={'searchInput'}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs className={'searchInput-cities'}>
                                <Autocomplete
                                    selectOnFocus
                                    clearOnBlur
                                    disablePortal
                                    handleHomeEndKeys
                                    options={cities}
                                    autoFocus
                                    type={'text'}
                                    fullWidth
                                    value={data.location}
                                    placeholder="¿Donde quieres tu vivienda?"
                                    name="location"
                                    variant="standard"
                                    renderInput={(params) =>
                                        <TextField {...params} label="Ciudades"/>
                                    }
                                    onChange={(event, newValue) => {
                                        if (typeof newValue === 'string') {
                                            setData("location", newValue);
                                        } else if (newValue && newValue.inputValue) {
                                            setData("location", newValue.inputValue);
                                        } else {
                                            setData("location", newValue);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit"><SearchIcon color="inherit" sx={{display: 'block'}}/></Button>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        </div>
    );
}
