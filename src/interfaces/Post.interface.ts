import { IUser } from "./User.interface";

export interface IPost {
  _id: string;
  author: IUser;
  image_src: string;
  likes: string[];
  numberOfComments: number;
  text: string;
  timestamp: string;
}
