import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Css/Register.css";
import { toast } from "react-toastify";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
  Text,
  Box,
  Select,
} from "@chakra-ui/react";

export default function DealerSignupFormBox() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [age, setAge] = useState("");
  const [minDate, setMinDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const scountry = useRef();
  const sstate = useRef();
  const scity = useRef();

  const alertError = (msg) => toast.error(msg);
  const alertSuccess = (msg) => toast.success(msg);


  const validateForm = () => {
    const errors = {};
  
    // Validate firstName
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }
  
    // Validate lastName
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }
  
    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    }
  
    // Validate country
    if (!scountry.current.value) {
      errors.country = "Country is required";
    }
  
    // Validate state
    if (!sstate.current.value) {
      errors.state = "State is required";
    }
  
    // Validate city
    if (!scity.current.value) {
      errors.city = "City is required";
    }
  
    // Validate gender
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }
  
    // Validate dateOfBirth
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    }
  
    // Validate age
    if (!age) {
      errors.age = "Age is required";
    }
  
    // Set the form errors
    setFormErrors(errors);
  
    // Update the overall form validity
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const selected = new Date(dateString);
    let age = today.getFullYear() - selected.getFullYear();
    const monthDiff = today.getMonth() - selected.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < selected.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    const minDateValue = calculateMinDate(event.target.value);
    setMinDate(minDateValue);
  };

  const calculateMinDate = (dateString) => {
    const selected = new Date(dateString);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(selected.getFullYear() + 14);
    return minAgeDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://long-plum-gazelle-fez.cyclic.app/api/countries/all"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setSelectedDate(event.target.value);
    setAge(calculateAge(formData.dateOfBirth));
    validateForm()
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const age = calculateAge(formData.dateOfBirth);
    setAge("");
    const selectedCountry = countries.find(
      (country) => country._id === scountry.current.value
    );

    const selectedState = states.find(
      (state) => state._id === sstate.current.value
    );
    const selectedCity = cities.find(
      (city) => city._id === scity.current.value
    );

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      country: selectedCountry ? selectedCountry.name : "",
      state: selectedState ? selectedState.name : "",
      city: selectedCity ? selectedCity.name : "",
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      age: age,
    };

    setLoading(true);
    try {
      await axios.post(
        "https://long-plum-gazelle-fez.cyclic.app/api/register",
        userData
      );
      alertSuccess("Register Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alertError("Register fail");
      console.log(error);
    }
  };

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;

    try {
      const response = await fetch(
        `https://long-plum-gazelle-fez.cyclic.app/api/countries/${selectedCountry}/states`
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }

    // Reset cities
    setCities([]);
  };

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    try {
      const response = await fetch(
        `https://long-plum-gazelle-fez.cyclic.app/api/states/${selectedState}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const getMaxDate = () => {
    const today = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 14);
    return minAgeDate.toISOString().split("T")[0];
  };

  if (loading) {
    return (
      <div class="loader">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
      </div>
    );
  }

  return (
    <>
      <Flex minH={"100vh"} align={"flex-start"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"} rounded={"xl"} p={6} my={2}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Become a User
          </Heading>
          <Text color={"#A0AEC0"} mb="0px">
            Enter your details to register!
          </Text>

          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Box>
          </HStack>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="name@gmail.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </FormControl>

          <HStack>
            <Box>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select
                  placeholder="Select country"
                  id="country"
                  name="country"
                  onChange={handleCountryChange}
                  ref={scountry}
                  required
                >
                  {countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Select
                  placeholder="Select state"
                  id="state"
                  name="state"
                  onChange={handleStateChange}
                  ref={sstate}
                  required
                >
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </HStack>

          <HStack>
            <Box>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Select
                  placeholder="Select city"
                  id="city"
                  name="city"
                  ref={scity}
                  required
                >
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select Gender"
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
            </Box>
          </HStack>

          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>Date Of Birth</FormLabel>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  onChange={handleChange}
                  required
                  min={minDate}
                  max={getMaxDate()}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="text"
                  value={age}
                  placeholder="age"
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </HStack>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,43,209,1) 98%, rgba(72,11,228,1) 100%)"
              color={"white"}
              w="full"
              _hover={{
                bg: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,43,209,1) 98%, rgba(72,11,228,1) 100%)",
              }}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
