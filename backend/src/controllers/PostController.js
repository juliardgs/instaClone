const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req,res) {
        //console.log(req.body);
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`

        await sharp(req.file.path)
            .resize(500) //ajusta para 500px de largura
            .jpeg({ quality: 90 }) //qualidade da imagem
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName) //pega o caminho da imagem no computador e depois envia para a pasta resized já com o tamnah alterado
            )
        
            fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post); //emite pra todos usuários. nome e os dados

        return res.json(post);
    }
};