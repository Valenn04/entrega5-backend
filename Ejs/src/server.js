const express = require('express');
const app = express();
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('productos.json');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/productos', (req, res) => {
    const productos = contenedor.getAll();
    res.render('pages/list',{productos});
})

app.get('/', (req, res) => {
    res.render('pages/form', {})
})

app.post('/productos', (req, res) => {
    const {body} = req;
    contenedor.save(body);
    res.redirect('/');
})

const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server started at port:${PORT}`);
})
server.on('error', (err) => console.log(err));