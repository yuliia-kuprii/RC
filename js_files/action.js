const PROJECT_NAME = document.getElementById("project-name-1");
const UL_LIST = document.getElementById("project-list")
const SAVE_BUTTON = document.getElementById("save-button");
const CANCEL_BUTTON = document.getElementById("cancel-button");
PROJECT_NAME.focus();
actionsMakeWithProjectInput(PROJECT_NAME)



function projectNameChangeToButton(event) {
    projectEntityChildren(event)
    actionsMakeWithProjectButtons(saveButton, cancelButton)
    if (event.keyCode === 13 && input.type === "text" && validateInput(input.value)) {
        actionsForProjectInput(input);
        removeActionButtons(saveButton, cancelButton);        
    }
}

function saveProjectNameWithButton(event){
    projectEntityChildren(event);
    if (input.type === "text" && validateInput(input.value)) {
        actionsForProjectInput(input);
        removeActionButtons(saveButton, cancelButton);
    }
}

function clearProjectName(event) {
    projectEntityChildren(event);
    /*
    return { sb: saveEl, cb: canEl, i: inputEl} 
    */
    // const {input, saveButton, cancelButton} = dictChildren
    // const { sb, cb, i } = fun(cancelButton)
    input.value = "";
    console.log(input)
    input.focus();
}

function projectEntityChildren(event){
    const childElement = event.target;
    const parentElement = childElement.parentElement;
    const parentAllChildren = parentElement.children;
    const dictChildren = {
        input: parentAllChildren[0],
        saveButton: parentAllChildren[1],
        cancelButton: parentAllChildren[2],
    }
    return {input, saveButton, cancelButton} = dictChildren
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
    projectEntityChildren(event)
    const value = input.value;
    if(value.length >= 71){
        const cuttedNameString = value.substring(0, 70);
        input.value = cuttedNameString;
    }
}

function actionsForProjectInput(input){
    input.type = "button";
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
    saveButton.type = "button";
    cancelButton.type = "button";
    saveButton.textContent = "SAVE";
    cancelButton.textContent = "CANCEL";
    saveButton.id = "save-button";
    cancelButton.id = "cancel-button";
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


    

