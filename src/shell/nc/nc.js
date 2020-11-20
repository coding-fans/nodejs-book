#! /usr/bin/env node

const net = require('net');

const DEFAULT_PORT = 8888;
let argvs = process.argv
argvs.shift();
argvs.shift();
console.log(argvs);

if (argvs[0] === '-l') {
  let port = argvs[1] || DEFAULT_PORT;
  createNetServer(port);
}

if (argvs[0] === '-h') {
  let host = argvs[1] || 'localhost';
  let port = argvs[3] || DEFAULT_PORT;
  createNetClient(host, port);
}

// process.stdin.on('readable', () => {
//   let chunk;
//   while((chunk === process.stdin.read()) !== null) {
//     process.stdout.write(`数据：${chunk}`)
//   }
// });

function createNetServer (port) {
  let server = net.createServer((client) => {
    console.log('client connect');

    client.on('end', () => {
      console.log('client stop connect');
    })

    client.write('hello from server\r\n');
    client.pipe(client);
  })

  server.on('error', (err) => {
    throw err;
  })

  server.listen(port, () => {
    console.log('server listen port: ', port);
  })
}

function createNetClient(host ,port) {
  let client = net.createConnection({
    host,
    port
  }, () => {
    console.log('连接服务器');
    client.write('你好\r\n')
  })

  client.on('data', (data) => {
    console.log(data.toString());
  })

  client.on('end', () => {
    console.log('已从服务器断开');
  })

  client.on('error', () => {
    console.log('fail');
  })
}