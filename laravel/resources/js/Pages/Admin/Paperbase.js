import * as React from 'react';
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from './Navigator';
import ContentHomes from './ContentHomes';
import ContentHomeTypes from "./ContentHomeTypes";
import ContentUser from "./ContentUser";
import AdminHome from "./AdminHome";
import Admin from "@/Layouts/Admin";

const drawerWidth = 256;

export default function Paperbase({users, types, homes, purchaseTypes, cities}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = null;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Admin isSmUp={isSmUp}>
            <Box sx={{display: 'flex', minHeight: '100vh'}}>
                <CssBaseline/>
                <Box
                    component="nav"
                    sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                >
                    {isSmUp ? null : (
                        <Navigator
                            PaperProps={{style: {width: drawerWidth}}}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}
                    <Navigator
                        PaperProps={{style: {width: drawerWidth}}}
                        sx={{display: {sm: 'block', xs: 'none'}}}
                    />
                </Box>
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{height: '100vh', py: 5, px: 5, bgcolor: '#eaeff1'}}>
                        <Routes>
                            <Route path='/admin/home' element={<AdminHome/>}/>
                            <Route path='/admin/users' element={<ContentUser data={users}/>}/>
                            <Route path='/admin/home_types' element={<ContentHomeTypes data={types}/>}/>
                            <Route path='/admin/homes' element={<ContentHomes data={homes.data} hometypes={types}
                                                                              homepurchasetypes={purchaseTypes}
                                                                              cities={cities}/>}/>
                            {/*<Route path='/admin/highlighted_homes' element={<ContentHighlightedHome setPageLoaded={setPageLoaded}/>}/>*/}
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </Admin>
    );
}