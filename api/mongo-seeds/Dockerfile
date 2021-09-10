# This container seeds the Mongop DB with the tasks defined on the robot-tasks.json file
FROM mongo:latest
COPY robot-tasks.json /robot-tasks.json
CMD mongoimport --host mongodb --db RobotDB --collection tasks --drop --file /robot-tasks.json --jsonArray
