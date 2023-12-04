import Transfers from './transfers.model.js';

export class TransferService {
  static async createRecordTransfer(amount, senderUserId, receiverUserId) {
    return await Transfers.create({ amount, senderUserId, receiverUserId });
  }
  static async getTransferByUser(userId) {
    return await Transfers.findAll({
      where: {
        senderUserId: userId,
      },
    });
  }
}
