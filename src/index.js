const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const Handlebars  =  require('handlebars') ;
const {allowInsecurePrototypeAccess}  =  require ( '@handlebars/allow-prototype-access' );
//Inicializaciones
const app = express();

app.set('views',path.join(__dirname,'views'));

app.engine('.hbs',exphbs({  //Configuro handlebars
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    handlebars : allowInsecurePrototypeAccess ( Handlebars ) 
}));

app.set('view engine','.hbs');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use("/api/productos",require("./productosController"));


//Listen
app.listen(8080,(req,res)=>{
    console.log("Servidor escuchando en el puerto 8080");
})