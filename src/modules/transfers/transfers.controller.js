import { UserService } from '../users/user.service.js';
import { TransferService } from './transfers.service.js';

export const createTransfer = async (req, res) => {
  try {
    const { amount, recipientAccountNumber, senderAccountNumber } = req.body;

    const recipientUserPromise = UserService.findOneAccount(
      recipientAccountNumber
    );
    const senderUserPromise = UserService.findOneAccount(senderAccountNumber);

    const [recipientUser, senderUser] = await Promise.all([
      recipientUserPromise,
      senderUserPromise,
    ]);

    if (!recipientUser) {
      return res.status(400).json({
        status: 'error',
        message: "Recipient account doesn't exist",
      });
    }
    if (!senderUser) {
      return res.status(400).json({
        status: 'error',
        message: "Sender account doesn't exist",
      });
    }

    if (amount > senderUser.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient balance',
      });
    }
    const newRecipientBalance = amount + recipientUser.amount;
    const newSenderBalance = senderUser.amount - amount;

    const updateSenderUserPromise = UserService.updateAmount(
      recipientUser,
      newRecipientBalance
    );
    const updateRecipientUserPromise = UserService.updateAmount(
      senderUser,
      newSenderBalance
    );
    const transferPromise = TransferService.createRecordTransfer(
      amount,
      senderUser.id,
      recipientUser.id
    );
    await Promise.all([
      updateSenderUserPromise,
      updateRecipientUserPromise,
      transferPromise,
    ]);
    return res.status(201).json({
      message: 'Transfer realized succesfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};
