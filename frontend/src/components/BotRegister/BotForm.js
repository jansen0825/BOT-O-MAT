import React from 'react';
import { Grid, Typography, TextField, IconButton, Button, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  botContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > :first-child': {
      marginRight: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1, 0),
    '&.bottom': {
      marginTop: 0,
    },
  },
  label: {
    width: 220,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
  },
  delete: {
    marginLeft: theme.spacing(1),
  },
}));

const BotForm = ({ botName, botNamesArr, textError, handleTextChange, onAddField, onDelete, onSubmit }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.names}>
        <TextField
          fullWidth
          label="Robot Name"
          placeholder="Enter a name"
          value={botName}
          onChange={handleTextChange}
          error={Boolean(textError)}
          helperText={textError}
        />
      </div>
      <div>
        <Button
          fullWidth
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={onAddField}
          disabled={botNamesArr[3] !== undefined}
        >
          Add Another Bot
        </Button>
        <Button className={`${classes.button} bottom`} fullWidth variant="contained" color="primary" onClick={onSubmit}>
          Build Bot(s)
        </Button>
      </div>
      <Grid container spacing={1}>
        {botNamesArr.map((name, index) => (
          <Grid key={index} item sm={6} className={classes.botContainer}>
            <Typography variant="h6">&bull;</Typography>

            <Typography className={classes.label} variant="h6">
              {name}
            </Typography>
            <IconButton className={classes.delete} onClick={() => onDelete(index)}>
              <Delete color="secondary" />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BotForm;
