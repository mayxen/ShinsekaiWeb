<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <style>
        h1 {
            color: #FF8927;
        }

        img {
            width: 500px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <img src="{{env('APP_URL', 'http://127.0.0.1:8000')}}/storage/logo.png" alt="logo">
    <h1>Usa esta clave para recuperar tu contraseña</h1>
    <a href="{{$url}}">Recuperar contraseña</a>
    <p>En caso de que fallé el enlace copia y pega esto en tu navegador: {{$url}}</p>
</body>
</html>
