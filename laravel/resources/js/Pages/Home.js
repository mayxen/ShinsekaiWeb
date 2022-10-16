import React, {useState} from 'react';
import Web from "@/Layouts/Web";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Home(props) {

    return (
        <Web>
            <div className="tarjetas">
                <p className="rotate">Noticias</p>
                <div className="noticias">
                    <div className="noticia">
                        <a href="">
                            <img src="img/logo_final.png" alt=""/>
                            <p>prueba de prueba de texto</p>
                        </a>
                    </div>

                    <div className="noticia">
                        <a href="">
                            <img src="img/logo_final.png" alt=""/>
                            <p>prueba de prueba de texto</p>
                        </a>
                    </div>

                    <div className="noticia">
                        <a href="">
                            <img src="img/logo_final.png" alt=""/>
                            <p>prueba de prueba de texto</p>
                        </a>
                    </div>

                    <div className="noticia">
                        <a href="">
                            <img src="img/logo_final.png" alt=""/>
                            <p>prueba de prueba de texto</p>
                        </a>
                    </div>

                    <div className="noticia">
                        <a href="">
                            <img src="img/logo_final.png" alt=""/>
                            <p>prueba de prueba de texto</p>
                        </a>
                    </div>

                    <div className="noticia">
                        <a href="">
                            <img src="img/logo_final.png" alt=""/>
                            <p>prueba de prueba de texto</p>
                        </a>
                    </div>

                </div>
                <div className="tarjetas">
                    <p className="rotate">Eventos</p>
                    <div className="noticias">
                        <div className="noticia">
                            <a href="">
                                <img src="img/logo_final.png" alt=""/>
                                <p>prueba de prueba de texto</p>
                            </a>
                        </div>

                        <div className="noticia">
                            <a href="">
                                <img src="img/logo_final.png" alt=""/>
                                <p>prueba de prueba de texto</p>
                            </a>
                        </div>

                        <div className="noticia">
                            <a href="">
                                <img src="img/logo_final.png" alt=""/>
                                <p>prueba de prueba de texto</p>
                            </a>
                        </div>

                        <div className="noticia">
                            <a href="">
                                <img src="img/logo_final.png" alt=""/>
                                <p>prueba de prueba de texto</p>
                            </a>
                        </div>

                        <div className="noticia">
                            <a href="">
                                <img src="img/logo_final.png" alt=""/>
                                <p>prueba de prueba de texto</p>
                            </a>
                        </div>

                        <div className="noticia">
                            <a href="">
                                <img src="img/logo_final.png" alt=""/>
                                <p>prueba de prueba de texto</p>
                            </a>
                        </div>

                    </div>
                    <div className="tarjetas">
                        <p className="rotate">Galería</p>
                        <div className="noticias">
                            <div className="noticia">
                                <a href="">
                                    <img src="img/logo_final.png" alt=""/>
                                    <p>prueba de prueba de texto</p>
                                </a>
                            </div>

                            <div className="noticia">
                                <a href="">
                                    <img src="img/logo_final.png" alt=""/>
                                    <p>prueba de prueba de texto</p>
                                </a>
                            </div>

                            <div className="noticia">
                                <a href="">
                                    <img src="img/logo_final.png" alt=""/>
                                    <p>prueba de prueba de texto</p>
                                </a>
                            </div>

                            <div className="noticia">
                                <a href="">
                                    <img src="img/logo_final.png" alt=""/>
                                    <p>prueba de prueba de texto</p>
                                </a>
                            </div>

                            <div className="noticia">
                                <a href="">
                                    <img src="img/logo_final.png" alt=""/>
                                    <p>prueba de prueba de texto</p>
                                </a>
                            </div>

                            <div className="noticia">
                                <a href="">
                                    <img src="img/logo_final.png" alt=""/>
                                    <p>prueba de prueba de texto</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Web>
    );
}
