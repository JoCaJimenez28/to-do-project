//invocamos a express
const express = require('express');
const app = express();

//seteamos urlencoded para capturar datos de formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//invocar a dotenv
const dotenv=require('dotenv');
dotenv.config({path:'./env/.env'});

// setear assets 
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//establecemos la plantilla ejs
app.set('view engine', 'ejs');

//invocamos a bcrypt
const bcryptjs=require('bcryptjs');

//variable de sesion
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninizialized:true
}));

//invocamos al modulo de conexion de bd
const connection= require('./database/db');

//Estableciendo rutas
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/registro', (req, res)=>{
    res.render('registro');
})

//registracion
app.post('/registro', async (req, res)=>{
    const nombre = req.body.nombre;
    const aPaterno = req.body.aPaterno;
    const aMaterno = req.body.aMaterno;
    const correo = req.body.correo;
    const rol = req.body.rol;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password, 8);
    connection.query('INSERT INTO tblUsuarios SET ?',
     {nombre:nombre, apellidoPaterno:aPaterno, apellidoMaterno:aMaterno, correo:correo, rol:rol, password:passwordHaash}, async(error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            res.render('registro', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro exitoso!",
                alertIcon: 'succes',
                showConfirmButton: false,
                timer: 1500,
                ruta:''
            })
        }
     })
})
app.listen(3000,(req, res) =>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})