
# Local Development

To run the server locally, you need to install [Docker for Mac](https://docs.docker.com/docker-for-mac/install/) or [Docker for Windows](https://docs.docker.com/docker-for-windows/)

After which, you can run the stack by using `docker-compose up --build` the first time, then just execute `docker-compose up`.

This will start the following services:

- Backend MongoDB
- Backend MongoDB Seeds (Seeds the robot tasks given above into a `tasks` collection in Mongo)
- Backend API (Running on port 4000)
- Backend Worker
- [A Local Frontend](http://localhost:3000) (Port 3000)

## Installing new packages

This can be done in two ways:

- Rebuild image by executing `docker-compose build --no-cache` (if your local `package.json` already contains new dependencies that are not yet installed in container). This is prefered as it will persist changes. NOTE: remember to use the correct node version when installing packages, recommended to do `fnm use`.
- Execute `docker-compose exec <container_name_or_id> yarn add <package_name>`. This is going to install package directly in running docker container. This method is not recommended as it won't sync `package.json` and `yarn.lock` on host machine, and moreover changes are not going to persist if container gets removed (by e.g. executing `docker-compose down`).

## Notes on local development and docker-compose setup

**Important: requires docker-compose file version >= 3.4**
docker-compose.yml utilizes standard yaml notation, mainly anchors (&) and references (\*) to avoid content duplications.

# Documentation

Some specific container documentation is split out into its own README and can be accessed here:

- [Frontend](frontend/README.md)
- [API](api/README.md)



# BOT-O-MAT CHALLENGE
Use any language to complete this challenge. The implementation is up to you. Having a graphical user interface is highly encouraged, especially with interactive elements. The requirements are:
1. Start the application by pairing a random robot name with one of the types from the list below. For example: Larry, Bipedal.
2. Assign the Robot a set of five random tasks.
3. Define methods to complete each task.
4. Send a notification when all the tasks are finished.
## Robot
- The Robot must complete each task within the given duration (specified in milliseconds).
- When a task is completed, it should be removed from the list.
## Tasks
Tasks have a description and an estimated time to complete.
```
[
  {
    description: 'do the dishes',
    eta: 1000,
  },{
    description: 'sweep the house',
    eta: 3000,
  },{
    description: 'do the laundry',
    eta: 10000,
  },{
    description: 'take out the recycling',
    eta: 4000,
  },{
    description: 'make a sammich',
    eta: 7000,
  },{
    description: 'mow the lawn',
    eta: 20000,
  },{
    description: 'rake the leaves',
    eta: 18000,
  },{
    description: 'give the dog a bath',
    eta: 14500,
  },{
    description: 'bake some cookies',
    eta: 8000,
  },{
    description: 'wash the car',
    eta: 20000,
  },
]
```
## Types
```
{ 
  UNIPEDAL: 'Unipedal',
  BIPEDAL: 'Bipedal',
  QUADRUPEDAL: 'Quadrupedal',
  ARACHNID: 'Arachnid',
  RADIAL: 'Radial',
  AERONAUTICAL: 'Aeronautical'
}
```
## Bonus Features
***note: be creative and have fun! Use this list or create your own. Do as much or as little as you want.***
- Allow users to create multiple robots at one time
- Create a UI with a leaderboard for tasks completed by each Robot
- Give each each Robot a personality based on their type
- Give each Robot a random avatar
- If you make a UI, make it responsive (mobile, tablet, desktop)
- Create an API to give you the list of tasks and request them from the application
- Can you find clever ways to send the completion notification?
- Create tasks specific for each robot type, this could work in conjunction with the leaderboard. For e.g. robots that are assigned tasks that their type can't perform won't get "credit" for finishing the task.
- Add persistance for tasks, bots and leaderboard stats
## Authors
- Scott Hoffman <https://github.com/scottshane>
- Olivia Osby <https://github.com/oosby>



