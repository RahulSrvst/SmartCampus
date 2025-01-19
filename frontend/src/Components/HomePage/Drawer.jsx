import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CustomDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          width: 240, 
          background: 'white',
          padding: '16px',
          boxShadow: 4,
          borderRadius: '8px',
        },
      }}
    >
      {/* Drawer Content */}
      <List>
        <ListItem button>
          <ListItemText primary="SOLUTIONS" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="RETAILS TYPE" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="OUR CUSTOMERS" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="APP SOLUTIONS" />
        </ListItem>
      </List>

      {/* Login & Get Started Buttons */}
      <div className="flex flex-col space-y-4 mt-8">
              <button
          className="xl:text-base text-sm font-normal bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-2 rounded-3xl hover:shadow-lg transition-shadow duration-300 "
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="xl:text-base text-sm font-normal bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-3xl hover:shadow-lg transition-shadow duration-300 ease-in-out"
          onClick={() => navigate("/Plan")}
        >
          Get Started
        </button>
      </div>

      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'linear-gradient(135deg, #f06, #4a90e2)', // Adjust close button background
          padding: '8px',
          borderRadius: '50%',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #4a90e2, #f06)',
          },
        }}
      >
        <FaArrowLeft />
      </IconButton>
    </Drawer>
  );
};

export default CustomDrawer;
