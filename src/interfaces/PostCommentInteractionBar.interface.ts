import { IUser } from "./User.interface";

export interface IPostCommentInteractionBar {
  post_id: string | undefined;
  comment: any;
  setRerenderOnlyComments: React.Dispatch<React.SetStateAction<number>>;
  user: IUser;
}
