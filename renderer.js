//import { ipcRenderer } from "electron";

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var totalTables = 0;

//Key NZ grade: Value Country Grade
var australiaDict = {'A+': 7, 'A': 7, 'A-': 7, 
                     'B+': 6.5, 'B': 6, 'B-': 5.5,
                     'C+': 5, 'C': 4.5, 'C-': 4.0, 
                     'D+, D, D-, DNS, DNC': 0};

//var usaDict = {'A+', ''};

//Add first row when html has loaded
document.onload = addTable();

function getTableAndValues(){

   var tableElem, rowElem, divElem;
   var grade, subject, credits, entry;
   var gpaJsonArray = {};


   gpaJsonArray['totalTables'] = totalTables;

   for(var i = 0; i < totalTables; i++){
       tableElem = document.getElementsByTagName('table')[i];

        //Init Values Array
        gpaJsonArray[i] = [];

        var totalRows = tableElem.rows.length;
        //j = 1 for ignoring header row
        for(var j = 1; j < totalRows; j++){

            rowElem = tableElem.rows[j];

            //Extract Paper Name from Div
            divElem = rowElem.cells[0].childNodes[0];
            subject = divElem.childNodes[1].value;
            //divElem.childNodes[1].setAttribute("value", subject);
            
            //Extract Credits from Div
            divElem = rowElem.cells[1].childNodes[0];
            credits = divElem.childNodes[1].value;
            //divElem.childNodes[1].setAttribute("value", credits);
            
            //Extract Grade from DropDown
            divElem = rowElem.cells[2].childNodes[1];
            grade = divElem.childNodes[1].value;
        
            entry = {   'grade' : grade,
                        'subject' : subject,
                        'credits' : credits
                    };

            

            gpaJsonArray[i].push(entry);
            
        }

        
   }

   return gpaJsonArray

};


function generateTranscript(){
    
    const gpaInfo = getTableAndValues();

    const payload = {'gpaInfo': gpaInfo};

    window.transcript.generateTranscript(payload);

}

function deleteTableRow(cellElement){

    const cellParent = cellElement.parentElement;

    const rowParent = cellParent.parentElement;

    const tableBodyParent = rowParent.parentElement;

    const tableParent = tableBodyParent.parentElement;

    tableParent.deleteRow(rowParent.rowIndex);

}

function deleteTable(buttonElement){

    const tableBodyParent = buttonElement.parentElement;
    //Remove Table
    tableBodyParent.parentElement.remove();
    totalTables -= 1;

}

function addTableRows(buttonElem){

    const tableBodyElem = buttonElem.parentElement.parentElement;

    //Get input form value
    var noRows = buttonElem.parentElement.childNodes[1].value;

    noRows = parseInt(noRows, 10);
    
    if (isNaN(noRows)) noRows = 1;

    for (var i = 0; i < noRows; i++){

        var newRow = document.createElement("tr");

        var newCell_0 = document.createElement("td");
        var newCell_1 = document.createElement("td");
        var newCell_2 = document.createElement("td");
        var newCell_3 = document.createElement("td");

        newRow.appendChild(newCell_0);
        newRow.appendChild(newCell_1);
        newRow.appendChild(newCell_2);
        newRow.appendChild(newCell_3);
        
        
        
        const formHTML = '<div class="form-group has-success">\
                            <input type="text" value="">\
                        </div>';

        newRow.cells[0].innerHTML =  formHTML;

        newRow.cells[1].innerHTML =  formHTML;

        newRow.cells[2].innerHTML = '   <div class="nav-item dropdown">\
                                            <select class="nav-link dropdown-menu" role="button" aria-haspopup="true" aria-expanded="false">\
                                                <div class="dropdown-item">\
                                                    <option value="Select Grade">Select Grade</option>\
                                                    <option value="A+">A+</option>\
                                                    <option value="A">A</option>\
                                                    <option value="A-">A-</option>\
                                                    <option value="B+">B+</option>\
                                                    <option value="B">B</option>\
                                                    <option value="B-">B-</option>\
                                                    <option value="C+">C+</option>\
                                                    <option value="C">C</option>\
                                                    <option value="C-">C-</option>\
                                                    <option value="D+, D, D-, DNS, DNC">D+, D, D-, DNS, DNC</option>\
                                                </div>\
                                            </select>\
                                        </div>';

        newRow.cells[3].innerHTML = '<button class="btn btn-primary" onclick="deleteTableRow(this)">X</button>';

        //Make Row first child
        tableBodyElem.prepend(newRow); 

    }
                                
}


function addTable(){

    // Table Section Parent 1:- Child Table
    var tableSection = document.getElementById("Table Section");

    //Table Parent 2:- Children=below
    var newTable = document.createElement('table');
    newTable.setAttribute("class", "table table-hover");

    //Table Header
    var tableHeader = document.createElement('thead');
    var headerRow = document.createElement('tr');
    headerRow.setAttribute("class", "table-primary");

    var headerCol_0 = document.createElement('th');
    var headerCol_1 = document.createElement('th');
    var headerCol_2 = document.createElement('th');
    var headerCol_3 = document.createElement('th');
    
    headerCol_0.innerText = "Paper Name";
    headerCol_1.innerText = "Credits";
    headerCol_2.innerText = "Grade";
    headerCol_3.innerText = "";
    headerRow.appendChild(headerCol_0);
    headerRow.appendChild(headerCol_1);
    headerRow.appendChild(headerCol_2);
    headerRow.appendChild(headerCol_3);
    
    //Table Body
    var tableBody = document.createElement('tbody');

    //Add Row Option
    var addRowForm = document.createElement('div');
    addRowForm.setAttribute("class", "form-group");
    //inline-block for putting label left to text
    addRowForm.setAttribute("style", "display: inline-block;");

    var formLabel = document.createElement('label');
    formLabel.innerHTML = '<p class="mb-0">Number of rows to add:</p>';
    formLabel.setAttribute("class", "col-form-label-sm");
    formLabel.setAttribute("style", "margin-left: 5px; font-size: 15px")

    var formInput = document.createElement('input');
    formInput.setAttribute("class", "form-control-sm");
    formInput.setAttribute("style", "margin-left: 10px;")
    formInput.setAttribute("type", "text");

    var addRowBtn = document.createElement('button');
    addRowBtn.setAttribute("class", "btn btn-info");
    addRowBtn.setAttribute("style", "font-size:15px; padding:0.25em; margin-left: 5px;");
    addRowBtn.setAttribute("onclick", "addTableRows(this)");
    addRowBtn.innerText = "+";
    
    addRowForm.appendChild(formLabel);
    addRowForm.appendChild(formInput);
    addRowForm.appendChild(addRowBtn);
    tableHeader.appendChild(headerRow);
    tableBody.appendChild(addRowForm);

    var delTableBtn = document.createElement('button');
    delTableBtn.setAttribute("class", "btn btn-warning");
    delTableBtn.setAttribute("onclick", "deleteTable(this)");
    delTableBtn.setAttribute("style", "font-size:15px; padding:0.25em; float:left; margin-left: 5px;");
    delTableBtn.innerText = "Delete Table";

    tableBody.appendChild(document.createElement('br'));
    tableBody.appendChild(delTableBtn);

    newTable.appendChild(tableHeader);
    newTable.appendChild(tableBody);
    
    tableSection.appendChild(newTable);

    totalTables += 1;
}

document.getElementById("calculate").onclick = generateTranscript;

document.getElementById("add Table").onclick = addTable;

    


 

  