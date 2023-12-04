import { TransferService } from '../transfers/transfers.service.js';
import { UserService } from './user.service.js';

export const signup = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.floor(Math.random() * 900000) + 100000;

    const user = await UserService.createUser({
      name,
      password,
      accountNumber,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const user = await UserService.login({ accountNumber, password });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `AccountNumber or password incorrect or doesn't exist`,
      });
    }

    return res.status(201).json({
      message: 'You logged succesfully.',
      user,
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
export const getHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.findOneAccountById(id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: "User with this id doens't exist",
      });
    }
    const transferHistory = await TransferService.getTransferByUser(user.id);

    return res.status(201).json(transferHistory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};
