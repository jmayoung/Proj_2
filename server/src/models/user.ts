import { Sequelize, DataTypes, Model } from 'sequelize';


export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export function UserFactory(sequelize: Sequelize): typeof User {
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Ensure that usernames are unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  // Password must be provided
    },
  },
  {
    sequelize,  // Pass the Sequelize instance
    tableName: 'users',  // The name of your database table
    timestamps: true,    // Automatically add createdAt and updatedAt timestamps
  }
)
return User;
};
