import { DataTypes, Sequelize, Model, Optional} from 'sequelize';


//DEfine the attributes for the Cocktail model
interface CocktailAttributes {
    id: number;
    name: string;
}

//Define the optional attributes for creating a new Cocktail 
interface CocktailCreationAttributes extends Optional<CocktailAttributes, 'id'> {}

export class Cocktail extends Model<CocktailAttributes, CocktailCreationAttributes> implements CocktailAttributes {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export function CocktailFactory(sequelize: Sequelize): typeof Cocktail {
    Cocktail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'cocktails',
            sequelize: sequelize 
        }
    );
    return Cocktail;
}
