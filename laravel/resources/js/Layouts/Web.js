import React from 'react';
import Header from "@/Layouts/Header";
import Footer from "@/Layouts/Footer";
import DateAdapter from "@mui/lab/AdapterMoment";
import {LocalizationProvider} from "@mui/lab";

export default function Web({children}) {
    return (
        <div>
            <Header/>
            <main>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    {children}
                </LocalizationProvider>
            </main>
            <Footer/>
        </div>
    );
}
