export const getDesiredColor = (color: string) => {
  switch (color) {
    case "rose":
      return "bg-rose-500";
    case "red":
      return "bg-red-500";
    case "green":
      return "bg-green-500";
    case "blue":
      return "bg-blue-500";
    case "teal":
      return "bg-teal-500";
    case "yellow":
      return "bg-yellow-500";
    case "orange":
      return "bg-orange-500";
    case "purple":
      return "bg-purple-500";
    default:
      return "";
  }
};
