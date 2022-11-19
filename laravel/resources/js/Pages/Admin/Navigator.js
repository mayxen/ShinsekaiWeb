import * as React from 'react';
import {useEffect, useState} from "react";
import {Link as RouterLink} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

// icons
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const {...other} = props;

    const [categories, setCategories] = useState([
        {
            id: 'Manager',
            children: [
                {
                    id: 'Dashboard',
                    icon: <HomeIcon/>,
                    active: false,
                    ruta: '/admin/home',
                },
                {
                    id: 'Usuarios',
                    icon: <PeopleIcon/>,
                    active: false,
                    ruta: '/admin/users'
                },
                {
                    id: 'News',
                    icon: <PeopleIcon/>,
                    active: false,
                    ruta: '/admin/new'
                },
                {
                    id: 'Events',
                    icon: <PeopleIcon/>,
                    active: false,
                    ruta: '/admin/event'
                },
            ]
        },
    ]);

    useEffect(() => {
        if (categories[0].children.find(i => i.ruta === window.location.pathname))
            categories[0].children.find(i => i.ruta === window.location.pathname).active = true;
    }, []);

    const handleActive = (id) => {
        const elementsIndex = categories[0].children.findIndex(element => element.id == id);
        let newArray = [...categories];
        newArray[0].children[elementsIndex] = {...newArray[0].children[elementsIndex], active: true}
        newArray[0].children.map((element, index) => {
            if (index != elementsIndex) {
                newArray[0].children[index] = {...newArray[0].children[index], active: false}
            }
        });
        setCategories(newArray);
    }

    return (

        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
                    Admin Panel
                </ListItem>
                <ListItem sx={{...item, ...itemCategory}}>
                    <ListItemButton selected={categories[0].children[0].active} sx={item} component={RouterLink}
                                    to={categories[0].children[0].ruta}
                                    onClick={() => {
                                        handleActive(categories[0].children[0].id);
                                    }}>
                        <ListItemIcon>
                            {categories[0].children[0].icon}
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemButton>
                </ListItem>
                {categories.map(({id, children}) => (
                    <Box key={id} sx={{bgcolor: '#101F33'}}>
                        <ListItem sx={{py: 2, px: 3}}>
                            <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, active, ruta}, index) => (
                            index !== 0 && <ListItem disablePadding key={childId}>
                                <ListItemButton selected={active} sx={item} component={RouterLink} to={ruta}
                                                onClick={() => {
                                                    handleActive(childId);
                                                }}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{mt: 2}}/>
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}
