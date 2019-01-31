var dir = 'log';
var source = dir;

const io = require('socket.io-client');
const fs = require('fs');
const socket = io("https://io.lightstream.bitflyer.com", { transports: ["websocket"] });

socket.on("connect", () => {
    socket.emit("subscribe", "lightning_ticker_FX_BTC_JPY");
    socket.emit("subscribe", "lightning_board_FX_BTC_JPY");
    socket.emit("subscribe", "lightning_board_snapshot_FX_BTC_JPY");
    socket.emit("subscribe", "lightning_executions_FX_BTC_JPY");

    socket.emit("subscribe", "lightning_ticker_BTC_JPY");
    socket.emit("subscribe", "lightning_board_BTC_JPY");
    socket.emit("subscribe", "lightning_board_snapshot_BTC_JPY");
    socket.emit("subscribe", "lightning_executions_BTC_JPY");
});
function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}

function get_time(){
        var d = new Date();
        var date = zeroPadding((d.getYear() + 1900),4) +''+ zeroPadding((d.getMonth() + 1),2) +''+ zeroPadding(d.getDate(),2);
        var time = d.getTime();
        return {
                'date' : date,
                'time' : time
        };
}

function save(data,type){
        var json = JSON.stringify(data);
        var d = get_time();
        fs.appendFile(source + '/'+ d.date + '_'+ type +'.log' , d.time+"\t"+json+"\n",function(){});
}


socket.on('lightning_ticker_FX_BTC_JPY', message => {
        save(message,'ticker_FX_BTC_JPY');
});

socket.on('lightning_board_FX_BTC_JPY', message => {
	save(message,'board_FX_BTC_JPY');
});

socket.on('lightning_board_snapshot_FX_BTC_JPY', message => {
	save(message,'board_snapshot_FX_BTC_JPY');
});

socket.on('lightning_executions_FX_BTC_JPY', message => {
        save(message,'executions_FX_BTC_JPY');
});

/////////////////////////////////////////////////////////////////
socket.on('lightning_ticker_BTC_JPY', message => {
        save(message,'ticker_BTC_JPY');
});

socket.on('lightning_board_BTC_JPY', message => {
        save(message,'board_BTC_JPY');
});

socket.on('lightning_board_snapshot_BTC_JPY', message => {
        save(message,'board_snapshot_BTC_JPY');
});

socket.on('lightning_executions_BTC_JPY', message => {
        save(message,'executions_BTC_JPY');
});
