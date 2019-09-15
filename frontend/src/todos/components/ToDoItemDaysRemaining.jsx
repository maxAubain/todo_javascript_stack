import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
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
    return daysRemaining < 0 ? "Overdue" : `Days remaining: ${daysRemaining}`;
  };

  const handleClassName = (daysRemaining, classes) => {
    if (daysRemaining > 3) {
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
