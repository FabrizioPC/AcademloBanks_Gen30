import Users from './users.model.js';

export class UserService {
  static async createUser(data) {
    return await Users.create(data);
  }
  static async login(data) {
    return await Users.findOne({
      where: {
        status: true,
        accountNumber: data.accountNumber,
        password: data.password,
      },
    });
  }
  static async findOneAccount(accountNumber) {
    return await Users.findOne({
      where: {
        status: true,
        accountNumber: accountNumber,
      },
    });
  }
  static async findOneAccountById(id) {
    return await Users.findOne({
      where: {
        status: true,
        id: id,
      },
    });
  }
  static async updateAmount(account, newAmount) {
    return await account.update({ amount: newAmount });
  }
}
