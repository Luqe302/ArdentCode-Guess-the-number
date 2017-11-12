const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');

    const randomNumber = Math.floor(Math.random() * 10000 + 1),
    usedNumbers = [];

    console.log(randomNumber);

    socket.on('selectedNumber', (data) => {

        const selectedNumber = data;

        if(selectedNumber > randomNumber) {
			socket.emit('textInfo', 'Your number is too high.')
		} else if(selectedNumber < randomNumber) {
			socket.emit('textInfo', 'Your number is too low.')
		} else {
			socket.emit('textInfo', `Your number ${selectedNumber} is correct.`)
		}

		usedNumbers.push(selectedNumber);
        socket.emit('usedNumbers', usedNumbers);

    });

});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
