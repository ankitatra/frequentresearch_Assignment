import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
const DataView = () => {
  const [Data, setdata] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await fetch(
        `https://long-plum-gazelle-fez.cyclic.app/api/register/user/all`
      );
      const data = await response.json();
      console.log(data);
      setdata(data);
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };
  return (
    <div>
      <Box fontSize={"30px"}>All Register User List</Box>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Sr.No</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Country</Th>
              <Th>State</Th>
              <Th>City</Th>
              <Th>Gender</Th>
              <Th>DOB</Th>
              <Th>Age</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Data.map((user,i) => (
              <Tr>
                <Td>{i+1}.</Td>
                <Td>
                  {user.firstName} {user.lastName}
                </Td>
                <Td>{user.email}</Td>
                <Td>{user.country}</Td>
                <Td>{user.state}</Td>
                <Td>{user.city}</Td>
                <Td>{user.gender}</Td>
                <Td>{user.dateOfBirth}</Td>
                <Td>{user.age}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataView;
