import { Box } from "@mui/material";
import dotenv from "react-dotenv";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${dotenv.REACT_APP_API_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;