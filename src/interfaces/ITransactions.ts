import { IUser } from "./IUser";

export interface ITransaction {
  id: number;
  amount: number;
  type: string;
  timestamp: string;
  senderId: IUser;
  receiverId: IUser;
  status: number;
}
