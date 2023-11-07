// import { Sequelize, Model, DataTypes } from "sequelize";
// import dbAuth from "../../helpers/databaseAuth";

// const Role = dbAuth.define('Role', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     libelle: {
//         type: DataTypes.STRING,
//         validate: {
//             isIn: [[
//                 'ADMIN_USER', 
//                 'ADMIN_DG',  //Dir, General
//                 'ADMIN_CG',  //Comptable General
//                 'ADMIN_GG',   //Gestionnaire General
//                 'ADMIN_SUPER'   //Super admin
//             ]],
//         }
//     },
//     description: { type: DataTypes.TEXT },
//     // Timestamps
//     createdAt: Sequelize.DATE,
//     updatedAt: Sequelize.DATE,
// });

// export default Role;