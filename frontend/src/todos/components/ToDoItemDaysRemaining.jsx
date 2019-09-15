import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  undefined: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center"
  },
  manyDaysRemaining: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "green"
  },
  threeDaysRemaining: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "orange"
  },
  overdue: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150,
    textAlign: "center",
    color: "red"
  }
});

export const ToDoItemDaysRemaining = ({ dueDate }) => {
  const classes = useStyles();

  const dueDateObj = new Date(dueDate);
  const todaysDateObj = new Date();

  const msToDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.floor((dueDateObj - todaysDateObj) / msToDay);

  const handleDaysRemaining = daysRemaining => {
    if (isNaN(daysRemaining)) {
      return "Please set a due date";
    } else if (daysRemaining >= 0) {
      return `Days remaining: ${daysRemaining}`;
    } else {
      return "Overdue";
    }
  };

  const handleClassName = (daysRemaining, classes) => {
    if (isNaN(daysRemaining)) {
      return classes.undefined;
    } else if (daysRemaining > 3) {
      return classes.manyDaysRemaining;
    } else if (daysRemaining <= 3 && daysRemaining >= 0) {
      return classes.threeDaysRemaining;
    } else {
      return classes.overdue;
    }
  };

  return (
    <Typography className={handleClassName(daysRemaining, classes)}>
      {handleDaysRemaining(daysRemaining)}
    </Typography>
  );
};
