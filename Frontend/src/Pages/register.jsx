import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';
import Header from '../Components/customer_header'; 
import Footer from '../Components/customer_footer';
import RegisterImg from '../Images/register.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [staffId, setStaffId] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, position: '' }));
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, department: '' }));
  };

  const handleContactChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setContact(value);
      setErrors((prevErrors) => ({ ...prevErrors, contact: '' }));
    }
  };  

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };


  const validateFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!staffId) newErrors.staffId = "Staff ID is required";
    if (!name) newErrors.name = "Name is required";
    if (!dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (validateAge(dob) < 18) {
      newErrors.dob = "User must be at least 18 years old";
    }
    if (!address) newErrors.address = "Address is required";
    if (!position) newErrors.position = "Position is required";
    if (!department) newErrors.department = "Department is required";
    if (!contact) newErrors.contact = "Contact number is required";
    else if (contact.length !== 10) newErrors.contact = "Contact number must be exactly 10 digits";  // Validation for 10 digits
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email format";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser = {
      staffId,
      name,
      dob,
      address,
      position,
      department,
      contact,
      email,
      password
    };

    try {
      await axios.post('http://localhost:3001/staff/add-staff', newUser);
      swal("Success", "Registration successful!", "success")
      .then(() => {
        navigate("/login");
      });    
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div style={{backgroundColor:'#2E4857'}}>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{
          marginBottom: '40px',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/154724104.jpg?k=0a6828e20e694f3b73f1dada7375632cd2fd394b2a4882337186e66495a2c891&o=&hp=1")', // Add the path to your background image here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          display="flex"
          flexDirection="row"  // Change flex direction to row
          alignItems="center"
          justifyContent="center"
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            padding: '40px',
            width: '100%',
            maxWidth: '1200px',  // Adjust max width to accommodate image
            marginTop: '20px',
            marginBottom:'20px'
          }}
        >
          {/* Form Section */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              width: '150%', 
              marginRight: '20px', 
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{color:'green', fontWeight:'600'}}
            >
              Register
            </Typography>

            <Box component="form" width="100%" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Staff Member ID"
                variant="outlined"
                value={staffId}
                onChange={(e) => {
                  setStaffId(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, staffId: '' }));
                }}
                error={!!errors.staffId}
                helperText={errors.staffId}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
                }}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                label="DOB"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, dob: '' }));
                }}
                error={!!errors.dob}
                helperText={errors.dob}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, address: '' }));
                }}
                error={!!errors.address}
                helperText={errors.address}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact"
                variant="outlined"
                value={contact}
                onChange={handleContactChange}
                error={!!errors.contact}
                helperText={errors.contact}
              />
              <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.position}>
                <InputLabel>Position</InputLabel>
                <Select
                  value={position}
                  onChange={handlePositionChange}
                  label="Position"
                >
                  <MenuItem value="Store Manager">Store Manager</MenuItem>
                  <MenuItem value="Customer Service Representative">Customer Service Representative</MenuItem>
                  <MenuItem value="E-commerce Specialist">E-commerce Specialist</MenuItem>
                  <MenuItem value="Baker/Confectioner">Baker/Confectioner</MenuItem>
                  <MenuItem value="Marketing Coordinator">Marketing Coordinator</MenuItem>
                  <MenuItem value="Order Fulfillment Specialist">Order Fulfillment Specialist</MenuItem>
                </Select>
                {errors.position && <Typography color="error">{errors.position}</Typography>}
              </FormControl>
              <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={department}
                  onChange={handleDepartmentChange}
                  label="Department"
                >
                  <MenuItem value="Management">Management</MenuItem>
                  <MenuItem value="Customer Service">Customer Service</MenuItem>
                  <MenuItem value="Production">Production</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
                {errors.department && <Typography color="error">{errors.department}</Typography>}
              </FormControl>

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}
                helperText={errors.password}
              />

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Button fullWidth type="submit" variant="contained" color="primary" style={{backgroundColor:'	#CC5500'}}>
                Register
              </Button>

              {/* Already have an account? Login text */}
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'blue', textDecoration: 'none', fontWeight: 'bold' }}>
                  Login
                </Link>
              </Typography>
            </Box>

            </Box>
          </Box>

          {/* Image Section */}
          <Box
            width="100%" 
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src="https://images.pexels.com/photos/6232000/pexels-photo-6232000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Registration"
              style={{ width: '100%', height: 'auto', borderRadius: '8px', marginLeft:'30px' }}
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Register;
