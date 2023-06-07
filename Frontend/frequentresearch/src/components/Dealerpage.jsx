import React from "react";
// import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { Box, Text } from "@chakra-ui/react";
import DealerSignupFormBox from "./Dealer";

import { Link } from "react-router-dom";
export default function DealerSignup() {
  return (
    <>
      

      <Box w="100%" minHeight={"100vh"} display="flex" flexDirection={"column"}>
        <Box display={"grid"} gridTemplateColumns={"1fr 1fr"}>
          <Box minH="80vh" p="0px 100px">
            <Box minH="80vh">
              <DealerSignupFormBox />
            </Box>
          </Box>

          <Box minH="100px">
            <Box  color="white" fontSize={"30px"} 
              bg="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,43,209,1) 98%, rgba(72,11,228,1) 100%)"
              minH={"100vh"}
              borderRadius={"0px 0px 0px 250px"}
            > <Link to="/alluser"><Text >See All The Users Click Here!</Text></Link></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
