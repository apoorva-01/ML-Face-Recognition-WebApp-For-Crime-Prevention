import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'John',
      storeName: 'kela',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
    },
    {
      name: 'Jane',
      storeName: 'jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
    },
  ]
};
export default data;
