// Find web-elements:
const ROW_PROJECT_DETAILS = document.getElementById("row-project-details");
const ROW_DATA_PROJECT_DETAILS = document.getElementById("row-data-project-details");
const SAVE_BUTTON = document.getElementById("submit-button");
const RESET_BUTTON = document.getElementById("reset-button");
const TABLE_IN_FORM = document.getElementById("project-details-table-wrap-in-form");
const TABLE = document.getElementById("table-project-details");
const T_BODY = document.getElementById("table-tbody");

const INPUTS = [
    document.getElementById('build-number'),
    document.getElementById('release-number'),
    document.getElementById("platform-type"),
    document.getElementById("env-name"),
    document.getElementById("build-url"),
    document.getElementById("build-date")
];



// Create event listeners:
RESET_BUTTON.addEventListener("click", resetInputs);
SAVE_BUTTON.addEventListener("click", (e) => {
    e.preventDefault();
    putInputTextInTextNode(SAVE_BUTTON);
});


INPUTS.forEach((input) => {
    input.addEventListener("input", checkSubmitButtonActive);
})



// Handlers:
function checkSubmitButtonActive() {
    let areNotAllInputsFilled = false;
    for (let i = 0; i < INPUTS.length; i++) {
        if (INPUTS[i].value === "") {
            areNotAllInputsFilled = true;
            break;
        }
    }
    SAVE_BUTTON.disabled = areNotAllInputsFilled;
    
}

function resetInputs(){
    TABLE_IN_FORM.reset();
}
    
function getInputValues(){
    let dict = {};
    INPUTS.forEach((input) => {
        dict[input.id] = input.value;
    });
    return dict;
}



function putInputValueInInputField(event) {
    const editButton = event.target;
    const tdEditButton = editButton.parentElement;
    const tdsParent = tdEditButton.parentElement;
    const trChildren = tdsParent.children;
    for (i = 0; i < INPUTS.length; i++){
        tdsParent.replaceWith(ROW_PROJECT_DETAILS)
        INPUTS[i].value = trChildren[i].innerText;
    }
}


function putInputTextInTextNode(buttonSave){
    const buttonSaveParent = buttonSave.parentElement;
    const tdParent = buttonSaveParent.parentElement;
    const inputValues = getInputValues();
    const tr = document.createElement("tr");
    tr.className = "inputs-data"
    for (key in inputValues) {
        const td = document.createElement("td");
        const textNodeValue = document.createTextNode(inputValues[key]);
        td.appendChild(textNodeValue);
        tr.appendChild(td);
        if (td.innerText.startsWith("http")){
            const string = td.innerText;
            td.innerText = "";
            const anchor = document.createElement("a");
            anchor.setAttribute('href', string);
            anchor.innerText = string;
            td.appendChild(anchor);
        }
    }
    const { tdEditButton, tdDeleteButton } = createEditDeleteButtons();
    tr.append(tdEditButton);
    tr.append(tdDeleteButton);
    T_BODY.insertBefore(tr, T_BODY.children[2]);
    tdParent.replaceWith(tr);
    T_BODY.insertBefore(ROW_PROJECT_DETAILS, T_BODY.children[1]);

    resetInputs();
    checkSubmitButtonActive();
    // return T_BODY;
}


function createEditDeleteButtons() {
    const editButton = document.createElement("button");
    const tdEditTag = document.createElement("td");
    editButton.className = "action-buttons";
    editButton.type = "button";
    editButton.id = "edit-button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", putInputValueInInputField)

    const deleteButton = document.createElement("button");
    const tdDeleteTag = document.createElement("td");
    deleteButton.className = "secondary-action-buttons";
    deleteButton.type = "button";
    deleteButton.id = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTableRowWithData);

    tdEditTag.appendChild(editButton);
    tdDeleteTag.appendChild(deleteButton);

    return { tdEditButton: tdEditTag, tdDeleteButton: tdDeleteTag };
}

function createSaveClearButtons(){
    const tdTagSave = document.createElement("td");
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.id = "submit-button";
    saveButton.textContent = "Save";
    
    const tdTagClear = document.createElement("td");
    const clearButton = document.createElement("button")
    clearButton.type = "reset";
    clearButton.id = "reset-button";
    clearButton.textContent = "Clear";
    
    tdTagSave.appendChild(saveButton)
    tdTagClear.appendChild(clearButton)

    return { tdSaveButton: tdTagSave, tdClearButton: tdTagClear };
}

function removeElementsWhenEdit(emptyRowInput){
    emptyRowInput.remove();
}

function deleteTableRowWithData(event) {
    const deleteButton = event.target;
    const tdDeleteButton = deleteButton.parentElement;
    const tableRowParent = tdDeleteButton.parentElement;
    tableRowParent.remove();
}