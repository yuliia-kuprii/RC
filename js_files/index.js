const PROJECT_NAME = document.getElementById("project-name-1");
const UL_LIST = document.getElementById("project-list")
const SUBMIT_BUTTON = document.getElementById("submit-button");
const RESET_BUTTON = document.getElementById("reset-button");
PROJECT_NAME.focus();
actionsMakeWithProjectInput(PROJECT_NAME)


function addListenerToRedirectProjectDetails(projectNameButton) {
    projectNameButton.addEventListener("click", redirectToProjectDetails)
}


function redirectToProjectDetails(event) {
    const input = event.target;
    const projectName = input.value;
    window.location.href = "./project-details.html?project_name=" + projectName;
}

function projectNameChangeToButton(event) {
    const {input, saveButton, cancelButton} = projectEntityChildren(event);
    actionsMakeWithProjectButtons(saveButton, cancelButton)
    if (event.keyCode === 13 && input.type === "text" && validateInput(input.value)) {
        event.preventDefault();
        actionsForProjectInput(input);
        removeActionButtons(saveButton, cancelButton);        
    }
}

function saveProjectNameWithButton(event){
    const {input, saveButton, cancelButton} = projectEntityChildren(event);
    if (input.type === "text" && validateInput(input.value)) {
        actionsForProjectInput(input);
        removeActionButtons(saveButton, cancelButton);
    }
}

function clearProjectName(event) {
    const {input, saveButton, cancelButton} = projectEntityChildren(event);
    input.value = "";
    input.focus();
}

function projectEntityChildren(event){
    const childElement = event.target;
    const parentElement = childElement.parentElement;
    const parentAllChildren = parentElement.children;
    return {
        input: parentAllChildren[0],
        saveButton: parentAllChildren[1],
        cancelButton: parentAllChildren[2],
    }
}

function validateInput(value) {
    let valueLengh = value.length
    if (value === "" || valueLengh >= 71) {
        alert("This is a required field. 70 symbols is a maximum");
        return false;
    }
    return true;
}

function preventExtraLetterInput(event) {
    const {input, saveButton, cancelButton} = projectEntityChildren(event);
    const value = input.value;
    if(value.length >= 71){
        const cuttedNameString = value.substring(0, 70);
        input.value = cuttedNameString;
    }
}

function actionsForProjectInput(input){
    input.type = "button";
    addListenerToRedirectProjectDetails(input)
    const newInput = addNewProjectName(input.id);
    setTimeout(() => {
        newInput.focus();
    }, 0)
}


function actionsMakeWithProjectButtons(saveButton, cancelButton){
    saveButton.addEventListener("click", saveProjectNameWithButton);
    cancelButton.addEventListener("click", clearProjectName);
}

function removeActionButtons(buttonOne, buttonTwo){
    buttonOne.remove(); 
    buttonTwo.remove();
}

function actionsMakeWithProjectInput(input){
    input.addEventListener("keydown", projectNameChangeToButton);
    input.addEventListener("input", preventExtraLetterInput);
}

function addNewProjectName(prevInputId) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const newId = createNewProjectId(prevInputId);
    li.className = "table-row-inputs"
    input.className = "inputs-data"
    input.autocomplete = "off"
    input.id = newId;
    input.type = "text";
    input.placeholder = "project name";
    input.required = true;
    UL_LIST.appendChild(li);
    li.appendChild(input);
    actionsMakeWithProjectInput(input);
    addActionButtons(li);
    return input;
}

function addActionButtons(li){
    const saveButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    saveButton.className = "action-buttons";
    cancelButton.className = "secondary-action-buttons";
    saveButton.type = "submit";
    cancelButton.type = "reset";
    saveButton.textContent = "SAVE";
    cancelButton.textContent = "CLEAR";
    saveButton.id = "submit-button";
    cancelButton.id = "reset-button";
    li.appendChild(saveButton);
    li.appendChild(cancelButton);
    UL_LIST.appendChild(li);
}

function createNewProjectId(prevInputId) {
    const splitString = prevInputId.split('-');
    const lastIndex = splitString.length - 1;
    const prevInputIdNumber = parseInt(splitString[lastIndex]);
    const newInputIdNumber = prevInputIdNumber + 1
    let projectInputName = `project-name-${newInputIdNumber}`;
    return projectInputName;
}




    

