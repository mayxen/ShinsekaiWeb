<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <style>
        table, td, div, h1, p {
            font-family: Arial, sans-serif;
        }

        body {
            margin: 0;
            padding: 0;
        }

        .table-general {
            width: 100%;
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
            background: #ffffff;
        }

        .table-top {
            width: 602px;
            border-collapse: collapse;
            border: 1px solid #cccccc;
            border-spacing: 0;
            text-align: left;
        }

        .td-table-top {
            padding: 40px 0 30px 0;
            background: #FFB170;
        }

        .img-table-top {
            width: 200px;
            display: block;
            border-radius: 10px;
        }

        .td-message-general {
            padding: 36px 30px 42px 30px;
        }

        .table-message {
            width: 100%;
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
        }

        .td-message {
            padding: 0 0 36px 0;
            color: #153643;
        }

        .td-message h1 {
            font-size: 24px;
            margin: 0 0 20px 0;
            font-family: Arial, sans-serif;
        }

        .p-message {
            margin: 0 0 12px 0;
            font-size: 16px;
            line-height: 24px;
            font-family: Arial, sans-serif;
        }

        .p-message-link {
            margin: 0;
            font-size: 16px;
            line-height: 24px;
            font-family: Arial, sans-serif;
        }

        .p-message-link a {
            color: #4031BA;
            text-decoration: underline;
        }

        .table-message-description {
            width: 100%;
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
        }

        .figure-message-description {
            margin: 0;
            background: #eee;
            padding: 1em;
            border-radius: 1em;
        }

        .figure-message-description blockquote {
            margin: 1em;
        }

        .figure-message-description figcaption {
            margin: 1em;
        }

        .td-footer {
            padding: 30px;
            background: #FFB170;
        }

        .table-footer {
            width: 100%;
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
            font-size: 9px;
            font-family: Arial, sans-serif;
        }

        .td-footer-copyright {
            padding: 0;
            width: 50%;
        }

        .td-footer-copyright p {
            margin: 0;
            font-size: 14px;
            line-height: 16px;
            color: #ffffff;
            font-family: Arial, sans-serif;
        }

        .td-footer-social {
            padding: 0;
            width: 50%;
            float: right;
        }

        .td-footer-social table {
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
        }

        .td-footer-social table td {
            padding: 0 0 0 10px;
            width: 38px;
        }

        .td-footer-social table td img {
            height: auto;
            display: block;
            border: 0;
            width: 38px;
        }

        .td-footer-social table td img a {
            color: #4031BA;
        }
    </style>
</head>
<body>
<table role="presentation" class="table-general">
    <tr>
        <td align="center" style="padding:0;">
            <table role="presentation" class="table-top">
                <tr>
                    <td align="center" class="td-table-top">
                        <img src="{{env('APP_URL', 'http://127.0.0.1:8000')}}/storage/logo.png" alt="Logo" class="img-table-top"/>
                    </td>
                </tr>
                <tr>
                    <td class="td-message-general">
                        <table role="presentation" class="table-message">
                            <tr>
                                <td class="td-message">
                                    <h1>Hola {{$ownerName}}</h1>
                                    <p class="p-message">{{$name}} quiere '{{$reason}}' acerca de tu anuncio
                                        '{{$homeName}}'.</p>
                                    <p class="p-message-link">
                                        <a href="{{$url}}">
                                            Enlace al anuncio
                                        </a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0;">
                                    <table role="presentation" class="table-message-description">
                                        <tr>
                                            <figure class="figure-message-description">
                                                <blockquote>
                                                    <p>Datos del usuario</p>
                                                    <ul>
                                                        <li>
                                                            nombre: {{$name}}
                                                        </li>

                                                        <li>telefono: {{$phone_number}}</li>
                                                        <li>
                                                            email: {{$email}}
                                                        </li>
                                                    </ul>
                                                </blockquote>
                                                <figcaption>
                                                    &mdash; Defyhome
                                                </figcaption>
                                            </figure>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="td-footer">
                        <table role="presentation" class="table-footer">
                            <tr>
                                <td class="td-footer-copyright">
                                    <p>
                                        &reg; Defyhome 2022<br/>
                                    </p>
                                </td>
                                <td class="td-footer-social">
                                    <table role="presentation">
                                        <tr>
                                            <td>
                                                <a class="enlaceFooter" href="http://www.twitter.com/">
                                                    <img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter"/>
                                                </a>
                                            </td>
                                            <td>
                                                <a class="enlaceFooter" href="http://www.facebook.com/">
                                                    <img src="https://assets.codepen.io/210284/fb_1.png"
                                                         alt="Facebook"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
