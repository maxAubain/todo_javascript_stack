import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  undefined: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "gray"
  },
  finished: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "blue"
  },
  manyDaysRemaining: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "green"
  },
  twoDaysRemaining: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "orange"
  },
  today: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "red"
  },
  overdue: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "purple"
  }
});

export const ToDoItemStatusMessage = ({ dueDate, finished }) => {
  const classes = useStyles();
  var dueDateObj = new Date(dueDate);
  dueDateObj.setHours(24); // Fix for new Date(dueDate) interpretting dueDate as GMT+0, not EST --> GMT-5
  const todaysDateObj = new Date();
  const msToDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil((dueDateObj - todaysDateObj) / msToDay);

  const handleDaysRemaining = (daysRemaining, finished) => {
    if (finished === true) {
      return "Item complete.";
    } else if (isNaN(daysRemaining)) {
      return "No due date set.";
    } else if (daysRemaining >= 1) {
      return `Days remaining: ${daysRemaining}`;
    } else if (daysRemaining === 0) {
      return "Item is due today!";
    } else {
      return "Overdue.";
    }
  };

  const handleClassName = (daysRemaining, finished, classes) => {
    if (finished === true) {
      return classes.finished;
    } else if (isNaN(daysRemaining)) {
      return classes.undefined;
    } else if (daysRemaining > 2) {
      return classes.manyDaysRemaining;
    } else if (daysRemaining <= 2 && daysRemaining >= 1) {
      return classes.twoDaysRemaining;
    } else if (daysRemaining === 0) {
      return classes.today;
    } else {
      return classes.overdue;
    }
  };

  return (
    <Typography className={handleClassName(daysRemaining, finished, classes)}>
      {handleDaysRemaining(daysRemaining, finished)}
    </Typography>
  );
};
