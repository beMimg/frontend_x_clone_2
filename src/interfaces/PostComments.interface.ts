import { IUser } from "./User.interface";

export interface IPostComments {
  post_id: string | undefined;
  rerenderOnlyComments: number;
  setRerenderOnlyComments: React.Dispatch<React.SetStateAction<number>>;
  user: IUser;
}
