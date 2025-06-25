import React from "react";
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const Course = ({ selectCourse, setSelectCourse }) => {

    const handleSelect = (course, popupState) => {
        setSelectCourse(course)
        popupState.close()
    }

  return (
    <div>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant='outlined'
 {...bindTrigger(popupState)}>
             {selectCourse ? `Course: ${selectCourse}` : "Select a Course"}
          </Button>
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
                  onClick={() => handleSelect(course, popupState)}
                >
                  {course}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>

      {selectCourse && (
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          You selected: <strong>{selectCourse}</strong>
        </Typography>
      )}
    </div>
  );
};

export default Course;