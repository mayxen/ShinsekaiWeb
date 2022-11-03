//icons
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CottageIcon from '@mui/icons-material/Cottage';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import React, {useState} from 'react';
import {useForm, usePage} from "@inertiajs/inertia-react";
import {Link, Menu, MenuItem} from "@mui/material";

export default function Header() {

    const {post} = useForm({});
    const {auth} = usePage().props;
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const submitLogout = () => {
        post(route('logout'));
    };

    return (
        <div className={'header'}>
            <div className={'logo'}>
                <img src="/storage/logo.png" alt="Defyhome Logo" onClick={() => window.location = "/"}/>
            </div>
            {!auth.user && (
                <div className={'links'}>
                    <Link href={route("login")}>
                        login
                    </Link>
                </div>
            )}
            {auth.user && (
                <div className={'links'}>
                    <Link
                        onClick={handleMenuOpen}
                    >
                        <MenuOpenIcon className="menu-icon"/>
                    </Link>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openMenu}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 40,
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <MenuItem onClick={() => {
                            window.location.assign(route('index'))
                        }}>
                            <CottageIcon/> Inicio
                        </MenuItem>

                        <MenuItem onClick={() => {
                            window.location.assign(route('profile'))
                        }}>
                            <AssignmentIndIcon/> Mi perfil
                        </MenuItem>

                        {auth.isAdmin && (
                            <MenuItem onClick={() => {
                                window.location.assign(route('admin_home'))
                            }}>
                                <SupervisorAccountIcon/> Admin
                            </MenuItem>
                        )}

                        <MenuItem onClick={submitLogout}>
                            <LogoutIcon/> Salir
                        </MenuItem>
                    </Menu>
                </div>
            )}
        </div>
    );
}
