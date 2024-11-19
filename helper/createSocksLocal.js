const socks = require("socksv5");
const { SocksClient } = require("socks");
const net = require("net");

async function findFreePort() {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(0, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on("error", reject);
    });
}

function parseProxyString(proxyString) {
    const [host, port, userId, password] = proxyString.split(":");
    return {
        host: host,
        port: parseInt(port, 10),
        type: 5, // SOCKS5
        userId: userId,
        password: password,
        command: "connect", // Default command
    };
}

async function setProxy(proxy) {
    let server;
    try {
        const proxyOptions = parseProxyString(proxy);
        const localPort = await findFreePort();

        server = socks.createServer((info, accept, deny) => {
            const { dstAddr, dstPort } = info;

            const connectionOptions = {
                proxy: {
                    ipaddress: proxyOptions.host,
                    port: proxyOptions.port,
                    type: proxyOptions.type,
                    userId: proxyOptions.userId,
                    password: proxyOptions.password,
                },
                command: proxyOptions.command,
                destination: {
                    host: dstAddr,
                    port: dstPort,
                },
            };

            SocksClient.createConnection(connectionOptions)
                .then(({ socket }) => {
                    const outbound = accept(true);

                    // Handle data forwarding
                    outbound.pipe(socket);
                    socket.pipe(outbound);

                    // Handle connection errors
                    socket.on("error", (err) => {
                        outbound.end();
                    });

                    outbound.on("error", (err) => {
                        socket.end();
                    });
                })
                .catch((err) => {
                    deny();
                });
        });

        server.listen(localPort, () => {});

        server.on("error", (err) => {});

        server.useAuth(socks.auth.None());
        return { server, localPort };
    } catch (error) {
        if (server) {
            server.close(() => {});
        }
        return { server: null, localPort: null };
    }
}
module.exports = setProxy;
