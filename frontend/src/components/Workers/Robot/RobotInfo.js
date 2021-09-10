import React from 'react';
import { Avatar, Typography, makeStyles } from '@material-ui/core';

import Emoji from '../../Emoji';
import { useSelector } from 'react-redux';

import { selectors as robotSelectors } from '../../../features/robots/robotsSlice';

const useStyles = makeStyles(theme => ({
  robotRow: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
    background: 'black',
    border: '2px solid #1565c0',
  },
  title: {
    fontWeight: 900,
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: 0.4,
    textTransform: 'capitalize',
    maxWidth: 230,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  typeText: {
    lineHeight: '16px',
    letterSpacing: 0.2,
    color: '#757575',
  },
  personality: {
    marginTop: 6,
    fontWeight: 600,
  },
  rightInfo: {
    marginLeft: 'auto',
    position: 'relative',
  },
  moodText: {
    position: 'absolute',
    top: -12,
    left: -32,
    color: 'chocolate',
    fontWeight: 700,
  },
  emoji: {
    display: 'block',
    fontSize: 38,
    lineHeight: '42px',
  },
}));

const RobotInfo = ({ robotId }) => {
  const classes = useStyles();

  const robot = useSelector(state => robotSelectors.selectById(state, robotId));

  const {
    name,
    type: { name: typeName, personality },
    avatar,
  } = robot;

  return (
    <div className={classes.robotRow}>
      <Avatar alt="Bot Avatar" className={classes.avatar} src={`/images/bot-avatars/${avatar}`} />
      <div className={classes.robotInfo}>
        <Typography className={classes.title}>{name}</Typography>
        <Typography variant="body2" className={classes.typeText}>
          {typeName}
        </Typography>
        <Typography variant="body2" className={classes.personality}>
          The {personality?.text} robot
        </Typography>
      </div>
      <div className={classes.rightInfo}>
        <Typography variant="caption" className={classes.moodText}>
          Mood:
        </Typography>
        <Emoji className={classes.emoji} label={personality?.text} symbol={personality?.emoji} />
      </div>
    </div>
  );
};

export default RobotInfo;
