import { DataTypes } from "sequelize";

const MyList = (sequelize) =>
  sequelize.define(
    "MyList",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "movies",
          key: "id",
        },
      },
    },
    {
      tableName: "my_list",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "movie_id"],
        },
      ],
    }
  );

export default MyList;
