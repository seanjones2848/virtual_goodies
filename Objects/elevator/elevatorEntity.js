// I've made an elevator script that works with as many points as you want that you are welcome to use:
// it consists of these 3 files

// (goes under the script url of trigger entity)
// https://hifi-content.s3.amazonaws.com/milad/ROLC/Organize/Projects/Domains/Rust/Elevator/ElevatorClient.js

// (goes under the serverURLs field of a platform entity)
// https://hifi-content.s3.amazonaws.com/milad/ROLC/Organize/Projects/Domains/Rust/Elevator/ElevatorServer.js

// (this is an animation library the server script depends on)
// https://hifi-content.s3.amazonaws.com/milad/ROLC/Organize/Projects/Domains/Rust/Elevator/Tween.js

// The Server goes on the platform you would like to move and it is looking for the following user data

var serverUserData = {
    "grabbableKey": {
        "grabbable": false
    },
    "points": [
        {
            "point": {
                "x": -73.8,
                "y": -4989.3,
                "z": -7.1
            },
            "moveToTime": 4,
            "pauseTime": 2
        },
        {
            "point": {
                "x": -73.8,
                "y": -4988.3,
                "z": -7.1
            },
            "moveToTime": 4,
            "pauseTime": 2
        }
    ]
};

// The client script would go as a collionless box or a zone entity that triggers it and is expecting the following:

var clientUserData = {
    "grabbableKey": {
        "grabbable": true
    },
    "elevatorName": "elevatorName",
    "searchRadius": 2
};