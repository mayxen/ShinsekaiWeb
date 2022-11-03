//icons
import CloseIcon from '@mui/icons-material/Close';

import React, {useState} from 'react';
import {Head, useForm} from '@inertiajs/inertia-react';
import Web from "@/Layouts/Web";
import Button from "@mui/material/Button";
import {
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TextField
} from "@mui/material";
import Breadcrumb from "@/Components/Breadcrumb";
import {InputAdornment} from "@material-ui/core";
import {DatePicker} from "@mui/lab";
import moment from "moment";

export default function Search(props) {
    const {data, setData, post, reset} = useForm({
        homeType: props?.homeType || "",
        purchaseType: props?.purchaseType || -1,
        location: props?.location || "",
        construction_year: props?.construction_year || "1900",
        square_meter: props?.square_meter || "",
        rooms: props?.rooms || 0,
        bedrooms: props?.bedrooms || 0,
        bathrooms: props?.bathrooms || 0,
        priceMin: props?.priceMin || 0,
        priceMax: props?.priceMax || 0,
        garage: props?.garage || false,
        pets: props?.pets || false,
        elevator: props?.elevator || false,
        terrace: props?.terrace || false,
        heating: props?.heating || false,
        smoker: props?.smoker || false,
        furnished: props?.furnished || false,
        garden: props?.garden || false,
        page: props?.page || 1,
    });

    const currentYear = new Date();

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleChangePage = (event, value) => {
        data.page = value; //no usar el setdata aquí porque es muy lento y no se carga
        submitFilter(event);
    }

    const submitFilter = e => {
        e.preventDefault();
        post(route('search'));
    }

    const [filter, setFilter] = useState(screen.width >= 834);

    const ToggleFilter = () => {
        setFilter(!filter);
    }

    const submitFilterWithReset = e => {
        data.page = 1;
        e.preventDefault();
        post(route('search'));
    }

    function cleanAllForm() {
        reset();
    }

    return (
        <Web>
            <Head title="Defyhome - Búsqueda"/>
            <Breadcrumb/>
            <SearchHome
                submitReset={submitFilterWithReset}
                cities={props.cities}
                data={data}
                setData={setData}
                post={post}
                purchaseTypeList={props.purchaseTypeList}
                homeTypeList={props.homeTypeList}
                filter={ToggleFilter}
            />
            <div className="searchFlex">
                <div className={"filterForm"}>
                    <div className="setSticky">

                        <form style={{display: filter ? 'block' : 'none'}} className="formDefyhome searchDefy"
                              onSubmit={submitFilterWithReset}>
                            {screen.width <= 834 &&
                                <div className="closeButton">
                                    <IconButton size="small" onClick={() => setFilter(false)}>
                                        <CloseIcon fontSize="inherit"/>
                                    </IconButton>
                                </div>
                            }
                            <div>
                                <p className={"filter-title"}><b>FILTROS DE BÚSQUEDA</b></p>
                            </div>
                            {/*Año de construcción*/}
                            <div>
                                <InputLabel id="construction_year">Año de construcción</InputLabel>
                                <DatePicker
                                    views={['year']}
                                    id="construction_year"
                                    name="construction_year"
                                    value={data.construction_year}
                                    maxDate={moment(currentYear)}
                                    onChange={(newValue) => {
                                        setData("construction_year", newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null}/>}
                                />
                            </div>
                            {/*Metros cuadrados*/}
                            <div className={"filter-element"}>
                                <TextField
                                    margin="dense"
                                    name="square_meter"
                                    label="Metros cuadrados"
                                    type="number"
                                    variant="standard"
                                    value={data.square_meter}
                                    onChange={onHandleChange}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
                                    }}
                                />
                            </div>
                            {/*Habitaciones*/}
                            <div>
                                <InputLabel className={"filter-element-redundant-title"}
                                            id="rooms-select">Habitaciones</InputLabel>
                                <Select
                                    labelId="rooms-select"
                                    id="rooms-select"
                                    name="rooms"
                                    margin="dense"
                                    fullWidth
                                    value={data.rooms}
                                    onChange={onHandleChange}
                                >
                                    <MenuItem value={0}>Nº de habitaciones</MenuItem>
                                    <Divider/>
                                    {Array.from({length: 10}, (_, i) => i + 1).map((choice, i) =>
                                        <MenuItem key={i} value={choice}>{choice}</MenuItem>
                                    )}
                                </Select>
                            </div>
                            {/*Dormitorios*/}
                            <div>
                                <InputLabel className={"filter-element-redundant-title"}
                                            id="bedrooms-select">Dormitorios</InputLabel>
                                <Select
                                    labelId="bedrooms-select"
                                    id="bedrooms-select"
                                    name="bedrooms"
                                    margin="dense"
                                    fullWidth
                                    value={data.bedrooms}
                                    onChange={onHandleChange}
                                >
                                    <MenuItem value={0}>Nº de dormitorios</MenuItem>
                                    <Divider/>
                                    {Array.from({length: 10}, (_, i) => i + 1).map((choice, i) =>
                                        <MenuItem key={i} value={choice}>{choice}</MenuItem>
                                    )}
                                </Select>
                            </div>
                            {/*Baños*/}
                            <div>
                                <InputLabel className={"filter-element-redundant-title"}
                                            id="bathrooms-select">Baños</InputLabel>
                                <Select
                                    labelId="bathrooms-select"
                                    id="bathrooms-select"
                                    name="bathrooms"
                                    margin="dense"
                                    fullWidth
                                    value={data.bathrooms}
                                    onChange={onHandleChange}
                                >
                                    <MenuItem value={0}>Nº de baños</MenuItem>
                                    <Divider/>
                                    {Array.from({length: 10}, (_, i) => i + 1).map((choice, i) =>
                                        <MenuItem key={i} value={choice}>{choice}</MenuItem>
                                    )}
                                </Select>
                            </div>
                            {/*Precio Mínimo*/}
                            <div>
                                <div className={"filter-element"}>
                                    <TextField id="minPrice"
                                               margin="dense"
                                               name="priceMin"
                                               label="Desde"
                                               value={data.priceMin}
                                               type="number"
                                               variant="standard"
                                               InputProps={{
                                                   endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                               }}
                                               onChange={onHandleChange}
                                    />
                                </div>
                                {/*Precio Máximo*/}
                                <div className={"filter-element"}>
                                    <TextField id="maxPrice"
                                               margin="dense"
                                               name="priceMax"
                                               label="Hasta"
                                               type="number"
                                               value={data.priceMax}
                                               variant="standard"
                                               InputProps={{
                                                   endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                               }}
                                               onChange={onHandleChange}
                                    />
                                </div>
                            </div>
                            {/*Extras*/}
                            <div>
                                <fieldset>
                                    <legend>Extras</legend>
                                    <FormControl sx={{m: 1, minWidth: 75}}>
                                        {/*Garaje*/}
                                        <FormControlLabel label="Garaje" control={
                                            <Checkbox checked={data.garage}
                                                      name="garage"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                        {/*Mascotas*/}
                                        <FormControlLabel label="Mascotas" control={
                                            <Checkbox checked={data.pets}
                                                      name="pets"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                        {/*Ascensor*/}
                                        <FormControlLabel label="Ascensor" control={
                                            <Checkbox checked={data.elevator}
                                                      name="elevator"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                        {/*Terraza*/}
                                        <FormControlLabel label="Terraza" control={
                                            <Checkbox checked={data.terrace}
                                                      name="terrace"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                        {/*Calefacción*/}
                                        <FormControlLabel label="Calefacción" control={
                                            <Checkbox checked={data.heating}
                                                      name="heating"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                        {/*Fumador*/}
                                        <FormControlLabel label="Fumador" control={
                                            <Checkbox checked={data.smoker}
                                                      name="smoker"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                        {/*Amueblado*/}
                                        <FormControlLabel label="Amueblado" control={
                                            <Checkbox checked={data.furnished}
                                                      name="furnished"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                        {/*Jardín*/}
                                        <FormControlLabel label="Jardín" control={
                                            <Checkbox checked={data.garden}
                                                      name="garden"
                                                      onChange={onHandleChange}
                                            />}
                                        />
                                    </FormControl>
                                </fieldset>
                            </div>
                            <Button type="submit" fullWidth variant={"contained"} onClick={() => {
                                if (window.screen >= 630)
                                    setFilter(false);
                            }}>
                                Filtrar</Button>
                            <Button fullWidth variant={"contained"} onClick={() => {
                                cleanAllForm();
                            }}>
                                Reset</Button>
                        </form>
                    </div>
                </div>
                <div className="dataWelcome">
                    <h2>{props.home.data.length > 0 ? "Datos encontrados" : "No se han encontrado datos con tu filtro pero te recomendamos la siguientes"}</h2>
                    <div className="homeCards">
                        {props.home.data.length > 0
                            ?
                            props.home.data.map((home, i) =>
                                <HomeCard key={i} home={home}/>
                            )
                            :
                            props.homeAlt.data.map((home, i) =>
                                <HomeCard key={i} home={home}/>
                            )
                        }
                    < /div>
                    <Pagination className={"pagination-element"} count={props.lastPage} page={props.page}
                                size="large" onChange={handleChangePage}/>
                </div>
            </div>
        </Web>
    );
}
