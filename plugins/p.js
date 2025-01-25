let handler = async (m, { conn, usedPrefix }) => {
   
    let mensaje = "<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comandos de Neko's Club</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: #fff;
            color: white;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            transition: background-color 0.3s, color 0.3s;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background: linear-gradient(90deg, #c964de, #5a4fff);
            box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
            height: 60px;
            transition: background-color 0.3s;
        }

        .menu-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
        }

        .menu-icon {
            font-size: 24px;
            color: white;
            cursor: pointer;
        }

        .profile {
            position: relative;
            display: flex;
            align-items: center;
        }

        .profile img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid white;
        }

        .active-indicator {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background-color: #34c759;
            border-radius: 50%;
            border: 2px solid white;
        }

        .dark-mode-icon {
            font-size: 24px;
            cursor: pointer;
            margin-left: 20px;
        }

        .title {
            text-align: center;
            margin: 15px 0;
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
            transition: color 0.3s;
        }

        .dropdown {
            width: 60%;
            margin: 20px auto;
            text-align: center;
        }

        .dropdown select {
            width: 100%;
            padding: 12px;
            border-radius: 10px;
            border: none;
            background-color: #f0f0f0;
            color: black;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s, color 0.3s;
        }

        .container {
            flex-grow: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        footer {
            text-align: center;
            font-size: 0.8rem;
            background: #fff;
            color: black;
            padding: 10px;
            box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s, color 0.3s;
            position: relative;
            width: 100%;
            margin-top: auto;
        }

        footer a {
            color: #007bff;
            text-decoration: none;
        }

        footer a:hover {
            text-decoration: underline;
        }

        .heart {
            color: red;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.2);
            }
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: -250px;
            width: 250px;
            height: 100%;
            background: #ffffff; /* Blanco */
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s;
            z-index: 1000;
        }

        .sidebar.open {
            left: 0;
        }

        .sidebar-header {
            padding: 20px;
            background: linear-gradient(90deg, #c964de, #5a4fff);
            color: black;
            height: 75px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .sidebar-header img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .sidebar-header h3 {
            font-size: 18px;
            margin-bottom: 10px;
            color: white;
        }

        .close-sidebar {
            cursor: pointer;
            font-size: 18px;
            color: white;
        }

        .sidebar ul {
            list-style: none;
            padding: 20px;
            background-color: white;
        }

        .sidebar ul li {
            margin-bottom: 15px;
        }

        .sidebar ul li a {
            color: black;
            text-decoration: none;
            font-size: 16px;
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 10px;
            transition: background-color 0.3s, transform 0.3s ease;
        }

        .sidebar ul li a i {
            margin-right: 10px;
        }

        .sidebar ul li a:hover {
            background: linear-gradient(90deg, #c964de, #5a4fff);
            color: white;
        }

        /* Estilos para el modo oscuro */
        .dark-mode body {
            background: linear-gradient(90deg, #c964de, #5a4fff);
            color: white;
        }

        .dark-mode .header {
            background: linear-gradient(90deg, #c964de, #5a4fff);
        }

        .dark-mode footer {
            background: linear-gradient(90deg, #c964de, #5a4fff);
            color: white;
        }

        .dark-mode .dropdown select {
            background: linear-gradient(90deg, #c964de, #5a4fff);
            color: white;
        }

        .dark-mode .sidebar {
            background: linear-gradient(90deg, #c964de, #5a4fff);
            color: white;
        }

        .dark-mode .sidebar ul li a {
            color: white;
            background: linear-gradient(90deg, #c964de, #5a4fff);
        }

        .dark-mode .sidebar ul {
            background: linear-gradient(90deg, #c964de, #5a4fff);
        }

        .dark-mode .sidebar-header {
            background: linear-gradient(90deg, #c964de, #5a4fff);
            color: white;
        }

        .dark-mode .sidebar ul li a:hover {
           
            color: white;
        }

        .dark-mode .sidebar-header h3 {
            color: white;
        }

        .dark-mode .sidebar ul li a i {
            color: white;
        }
        .dark-mode .menu-icon{
            color: white;
        }
        .dark-mode .dark-mode-icon{
            color: white;
        }

        .dark-mode .close-sidebar{
            color: white;
        }
        
    </style>
</head>

<body>
    <div class="header">
        <div class="menu-container">
            <i class="fas fa-bars menu-icon" id="menuToggle"></i>
            <i class="fas fa-moon dark-mode-icon" id="toggleDarkMode"></i>
        </div>
        <div class="profile">
            <img src="https://i.ibb.co/Y7mhFdf/file.jpg" alt="Perfil" />
            <div class="active-indicator"></div>
        </div>
    </div>

    <div class="dropdown">
        <div class="title">Comandos de DarkCore Club</div>
        <select>
            <option value="anime">Anime</option>
            <option value="musica">Música</option>
            <option value="juegos">Juegos</option>
            <option value="otros">Otros</option>
        </select>
    </div>

    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <img src="https://i.ibb.co/Y7mhFdf/file.jpg" alt="Perfil">
            <h3>DarkCore Club</h3>
            <i class="fas fa-times close-sidebar" id="closeSidebar"></i>
        </div>
        <ul>
            <li><a href="#"><i class="fas fa-home"></i> Inicio</a></li>
            <li><a href="#"><i class="fas fa-book"></i> Comandos</a></li>
            <li><a href="#"><i class="fas fa-user"></i> Perfil</a></li>
            <li><a href="#"><i class="fas fa-cog"></i> Configuración</a></li>
        </ul>
    </div>

    <footer>
        © 2025 Made With <span class="heart">❤</span> By
        <a href="#">LightningDark</a> & <a href="#">DarkCore</a>
    </footer>

    <script>
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const toggleDarkMode = document.getElementById('toggleDarkMode');
        const body = document.body;

        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });

        toggleDarkMode.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        });
    </script>
</body>

</html>";

    // Enviar el mensaje al chat
    conn.sendMessage(m.chat, mensaje, MessageType.text);
};
h
