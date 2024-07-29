import { Sequelize } from "sequelize";

const db = new Sequelize('', 'root', '', {
    host: "",
    dialect: ""
})

export default db;