import { Sequelize } from 'sequelize';

// uso el .env así es mas facil y no tengo que mostrar la constraseña 😛
const sequelize = new Sequelize('punto-moda', 'postgres', 'punto-moda-password', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

connectDB();

export default sequelize;