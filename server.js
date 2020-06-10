const express = require('express')
    , app = express()
    , fs = require('fs')
    , getState = require('util').promisify(fs.stat);

app.use(express.static('public'));

const highWaterMark = 2;

const http = require('http');


app.get('/audio', async (req, res) => {
    const filePath = './audio.ogg';

    const stat = await getState(filePath);

    console.log(stat);

    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath, {highWaterMark});

    stream.on('end', () => console.log('acabou'));

    stream.pipe(res);
});

app.listen(3000, () => console.log('App is running'));
