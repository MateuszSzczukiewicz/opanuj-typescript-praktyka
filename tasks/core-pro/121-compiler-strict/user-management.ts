import { UserModule, UserType } from './task.ts';

const userModule = new UserModule();

userModule.addUser({ id: 1, name: 'John' });
userModule.addUser({ id: 2, name: 'Jane' });
userModule.addUser({ id: 3, name: 'Jim' });

userModule.removeUser(2);

userModule.filterUsers((user: UserType) => user.name.startsWith('J'));
