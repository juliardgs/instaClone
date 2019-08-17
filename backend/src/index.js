const express = require('express'); //permite lidar com rotas, parametros e respostas
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

//aceita conexões http e websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@cluster0-bn0pi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use(cors()); //permite que todo tipo de aplicação acesse o backend

app.use((req, res, next) => { //passa o io pra todas as rotas
    req.io = io;
    next();
});

//rotas pra acessar arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); //faz a aplicação acessar a pasta resized para mostrar as imagens

app.get('/', (req, res)=> {
    return res.send('Hello World');
});
app.use(require('./routes'));
server.listen(3333);