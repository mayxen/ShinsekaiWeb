import {ThemeProvider} from "@mui/material";
import React from 'react';
import {render} from 'react-dom';
import {createInertiaApp} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';
import {createTheme} from '@material-ui/core/styles';
import {SnackbarProvider} from "notistack";

require('./bootstrap');

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
const theme = createTheme({
    palette: {
        primary: {
            main: '#de89beff'
        },
        secondary: {
            main: '#fdcff3ff'
        },
    }
});

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({el, App, props}) {
        return render(
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }} preventDuplicate
                >
                    <App {...props} />
                </SnackbarProvider>
            </ThemeProvider>, el);
    },
});

InertiaProgress.init({color: '#4B5563'});
