import { User } from '../models/index.js';

export const seedUsers = async () => {
    await User.bulkCreate([
      { username: 'ibrew919', email: 'ibrew919@gmail.com', password: 'password' },
      { username: 'mutedatruth', email: 'mutedatruth@icloud.com', password: 'password' },
      { username: 'generalB', email: 'generalB@gmail.com', password: 'password' },
    ], { individualHooks: true });
  };
  