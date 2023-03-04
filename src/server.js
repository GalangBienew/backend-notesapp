const hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
    const server = hapi.server({
        port: 8000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    })
    server.route(routes)



    await server.start()
    console.log(`server ini berjalan di ${server.info.uri}`)
}

init();