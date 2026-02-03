import { DataTypes } from "sequelize";

const User = (sequelize) =>
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

export default User;



