import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar/index";


const HomePage = () => {
    //const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    //const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
        </Box>
    )
};

export default HomePage;