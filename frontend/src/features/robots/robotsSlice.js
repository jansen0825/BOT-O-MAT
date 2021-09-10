import { normalize } from 'normalizr';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { PURGE } from 'redux-persist';

import { BOT_TASK_ARR, BOT_TYPES, AVATARS_ARR } from './constants';
import { botSchema } from './schemas';
import { getRandomArrayIndex, getRandomArrayElement } from '../../utils';

export const NAME = 'robots';

const botsAdapter = createEntityAdapter({
  selectId: robot => robot.id,
  sortComparer: (a, b) => (b.createdAt || 0) - (a.createdAt || 0),
});

// Initial state
const initialState = botsAdapter.getInitialState({
  types: BOT_TYPES,
  tasks: {},
  avatars: {
    collection: AVATARS_ARR,
    default: 'bot-default.png',
  },
});

// Thunks
export const fetchTasks = createAsyncThunk(`${NAME}/fetchTasks`, async () => {
  // If the API env variable is active, fetch the users from it. If it doesn't fallback to the frontend list.
  if (process.env.REACT_APP_IS_API_ACTIVE === 'true') {
    const response = await fetch(`${process.env.REACT_APP_API_URL}tasks`);
    const tasks = (await response.json()) || [];
    return { tasks };
  } else {
    return { tasks: BOT_TASK_ARR };
  }
});

export const executeTask = createAsyncThunk(`${NAME}/executeTask`, async ({ robotId, taskIndex }, thunkAPI) => {
  const robot = thunkAPI.getState()[NAME].entities[robotId];
  const selectedTask = robot.tasks[taskIndex];

  await new Promise(resolve => {
    setTimeout(() => resolve(), selectedTask.eta);
  });
});

// Slice
export const robotSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    // ADD_BOTS
    addRobots: (state, action) => {
      const robotNames = action.payload;
      // Read types and tasks from the state.
      const { types, tasks: taskArr, avatars } = state;

      // Copy the avatar array to prevent duplication and mutating it when iterating over the new bots.
      const avatarCollectionCopy = avatars.collection.slice(0);

      // Proceed to create the new robots payload by randomly assigning a type, and a 5 task list.
      const newRobots = robotNames.map((name, index) => {
        // First we make a copy of the state tasks Array for each robot, to prevent mutating our state.
        const tempTaskArr = taskArr.slice(0);
        // Then we create a new array of 5 elements and map through it,
        // to fill it with random elements from the copied tasks Array.
        const tasks = [...Array(5)].map(() => {
          const randomIndex = getRandomArrayIndex(tempTaskArr);
          const randomElement = tempTaskArr[randomIndex];
          // We need to remove the selected element from the copied tasks Array,
          // to prevent the algorithm form selecting the same task twice.
          tempTaskArr.splice(randomIndex, 1);
          return randomElement;
        });

        // Asigns a new random avatar to the bot if we still have available, or fallbach to a default avatar.
        const avatarIndex = avatarCollectionCopy.length ? getRandomArrayIndex(avatarCollectionCopy) : -1;
        const avatar = avatarIndex > -1 ? avatarCollectionCopy[avatarIndex] : avatars.default;
        if (avatarCollectionCopy.length) {
          avatarCollectionCopy.splice(avatarIndex, 1);
        }

        return {
          id: uuidv4(),
          name,
          avatar,
          type: getRandomArrayElement(Object.values(types)),
          tasks,
          // We add one millisecond difference between multiple additions to
          // prevent loosing robot order when updating robot values on state.
          createdAt: Date.now() + Number(index),
          totalTasks: 0,
        };
      });

      const {
        entities: { robots },
      } = normalize(newRobots, [botSchema]);

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.avatars.collection = avatarCollectionCopy;
      botsAdapter.upsertMany(state, robots);
    },
    // REMOVE ROBOT
    removeRobot: (state, action) => {
      const botId = action.payload;
      botsAdapter.removeOne(state, botId);
    },
    // RESET_LAST_FINISHED
    resetLastFinishedBot: state => {
      state.lastFinishedBot = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      const { tasks } = action.payload;

      return {
        ...state,
        tasks,
      };
    });

    builder.addCase(executeTask.pending, (state, action) => {
      const {
        meta: {
          arg: { robotId, taskIndex },
        },
      } = action;

      const robot = state.entities[robotId];
      botsAdapter.upsertOne(state, { ...robot, workingTaskIndex: taskIndex });
    });

    builder.addCase(executeTask.fulfilled, (state, action) => {
      const {
        meta: {
          arg: { robotId, taskIndex },
        },
      } = action;

      const robot = state.entities[robotId];
      const tasks = [...robot.tasks.slice(0, taskIndex), ...robot.tasks.slice(taskIndex + 1, robot.tasks.length)];
      const updatedRobot = { ...robot, workingTaskIndex: undefined, tasks, totalTasks: robot.totalTasks + 1 };
      botsAdapter.upsertOne(state, updatedRobot);

      // If the robot finished the last task, set lastFinishedBot to trigger notifications.
      if (robot.tasks.length && !updatedRobot.tasks.length) {
        state.lastFinishedBot = updatedRobot;
      }
    });

    // Clears state persisted data when the PURGE action is dispatched
    builder.addCase(PURGE, state => {
      botsAdapter.removeAll(state);
      state.avatars = initialState.avatars;
    });
  },
});

export const selectors = {
  ...botsAdapter.getSelectors(state => state[NAME]),
  getBotTypes: state => Object.values(state[NAME].types),
  getLastFinishedBot: state => state[NAME].lastFinishedBot,
  getEntitiesByTaskScoe: state => Object.values(state[NAME].entities || {}).sort((a, b) => b.totalTasks - a.totalTasks),
};

export const { actions } = robotSlice;

export default robotSlice.reducer;
