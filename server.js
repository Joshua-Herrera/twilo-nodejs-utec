//Atrapando excepciones de inicio en produccion
if (process.env.NODE_ENV === 'prod') {
    procces.on('uncaughtException', (err) => {
        console.log(err.name, err.message);
        console.log('Se ha encontrado una exception no especificada, cerrando app...')
        process.exit(1)
    })
}

const app = require('./app');

//Inicio del servidor de nodejs en express
const server = app.listen(3000, () => {
    console.log(`App corriendo en el puerto 3000...`)
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Rechazo inesperado, cerrando app...');
    server.close(() => {
        process.exit(1);
    });
})