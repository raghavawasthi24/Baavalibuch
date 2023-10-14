import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Login = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <img
        src="images/loginBg.jpg"
        className="w-full h-full absolute top-0 -z-10"
      />
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full bg-white flex justify-center items-center">
        <Box sx={{ width: "60%", height: "60%", margin: "auto" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ width: "100%" }}
            >
              <Tab label="Login" {...a11yProps(0)} sx={{ width: "50%" }} />
              <Tab label="SignUp" {...a11yProps(1)} sx={{ width: "50%" }} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              sx={{ width: "100%",margin:"1rem 0" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              sx={{ width: "100%",margin:"1rem 0" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" sx={{ width: "40%",margin:"2rem 0",float:"right", borderRadius:"2rem" }}>
              Continue
            </Button>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            SingUp
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Login;
