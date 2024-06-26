import { IUser } from "../../interfaces/User.interface";
import { getDesiredColor } from "../../utils/getDesiredColor";

const Avatar = ({ user, size }: { user: IUser; size: string }) => {
  const finalColor = getDesiredColor(user.profile_color);

  return user.profile_pic_src ? (
    <div className={`max-h-[${size}] max-w-[${size}] `}>
      <img
        src={user.profile_pic_src}
        className={`flex rounded-full object-cover object-center`}
        style={{
          maxHeight: size,
          minWidth: size,
          maxWidth: size,
          minHeight: size,
        }}
      />
    </div>
  ) : (
    <div
      className={`flex items-center justify-center rounded-full ${finalColor} `}
      style={{
        maxHeight: size,
        minWidth: size,
        maxWidth: size,
        minHeight: size,
      }}
    >
      {user.first_name.slice(0, 1).toUpperCase()}
    </div>
  );
};

export default Avatar;
