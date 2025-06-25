import React from "react";
import { Stack, Button, Menu, MenuItem, Typography } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const Course = ({ selectCourse, setSelectCourse }) => {
    const handleSelect = (course, popupState) => {
        setSelectCourse(course)
        popupState.close()
    }
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <Stack spacing={2} m={5} alignItems='center'>
              <Button
                color="primary"
                variant='contained'
                sx={{ margin: "auto", mt: 1, p: 1 }}
                {...bindTrigger(popupState)}
              >
                {selectCourse
                  ? `Course: ${selectCourse}`
                  : "Select Course"}
              </Button>

      {selectCourse && (
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          You selected: <strong>{selectCourse}</strong>
        </Typography>
      )}
</Stack>
            <Menu {...bindMenu(popupState)}>

              {[
                "Intro to Programming",
                "React.js",
                "Node Express",
                "Ruby on Rails",
                "Python",
              ].map((course) => (
                <MenuItem
                  key={course}
                  onClick={() => {
                    handleSelect(course, popupState)
                  }}
                >
                  {course}
                </MenuItem>
              ))}
            </Menu>
</>
        )}
      </PopupState> 
      </>
  );
};

export default Course;
