function ShowLoadingScreen() {
    var elem = document.getElementById("mainLoader");
    elem.style.display = "block";
}

function RemoveLoadingScreen() {
    var elem = document.getElementById("mainLoader");
    elem.style.display = "none";
}

function OnLoad() {

}

function SetRobotStatus(status) {
    // Getting the response json from the robot and parsing it; it can contain any json string
    var obj = JSON.parse(status);

    // Updating an element
    document.getElementById('statusCheck').innerHTML = obj['status'];

    // Closing the Loading screen
    RemoveLoadingScreen();
}

function SubmitValues() {
    // Creating the PropertiesDictionary that will be sent to the UiPath Robot
    var props = {};
    props["Close"] = "now";

    // This property contains the name of the Javascript method to be executed after the UiPath nested activities have been run
    props["uipath-invokemethodwithinput"] = "ResponseFunction"; // ResponseFunction is a function in this js file
    props["uipath-method"] = "getResposeFromRobot"; // getResposeFromRobot is the string switch from the robot

    // Send all data to the UiPath Executor and launch the activities inside the form
    window.external.TriggerActivities(JSON.stringify(props));

    // Showing the loading screen
    ShowLoadingScreen();
}

function ResponseFunction(status) {
    // Getting the response json from the robot and parsing it; it can contain any json string
    var obj = JSON.parse(status);

    // Closing the Loading screen
    RemoveLoadingScreen();

    // Updating an element
    if(obj['uipath-killform'] == "1")
	{
		Close();
	}
}

function MyClose(status) {
	window.alert("Hello world");
	Close();
}

function Close() {
    // Creating the PropertiesDictionary that will be sent to the UiPath Robot
    var props = {};
    props["uipath-killform"] = "1";
    // Launch initial Job to kill the current usecase
    window.external.TriggerActivities(JSON.stringify(props));
}
