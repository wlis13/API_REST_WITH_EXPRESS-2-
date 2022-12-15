const app = require('./service');

const PORT = 3001;

app.listen(PORT, () => console.log(`Servidor ouvindo na porta: ${ PORT }`));