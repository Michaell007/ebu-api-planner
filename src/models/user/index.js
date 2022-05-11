import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Role from "../roles";

const User = dbAuth.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    embaucheDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

User.belongsTo(Role, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
Role.hasMany(User, { foreignKey: 'RoleId' });

User.prototype.view = function() {
    return {
		id: this.id,
		username: this.username,
		email: this.email,
		isActive: this.isActive,
		isAdmin: this.isAdmin,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	};
};

export default User;