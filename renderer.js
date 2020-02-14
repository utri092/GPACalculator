
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var totalRows = 0;
var selectRow = 0;

//Add first row when html has loaded
document.onload = addTableRow();

function getRowIndexAndValues(rowElement)
{
   selectRow = rowElement.rowIndex - 1; //Index starts at 1, rows start from 0
   console.log(selectRow)
   console.log(document.getElementById("grade dropdown row_" + selectRow).value)
   console.log(document.getElementById("paper value row_" + selectRow).value)
   console.log(document.getElementById("credits value row_" + selectRow).value)
}

function addTableRow()
{
    
    var newRow = document.createElement("tr");
    newRow.id = "row_" + totalRows;
    newRow.type = "button";
    newRow.setAttribute("onclick","getRowIndexAndValues(this);");

    newRow.innerHTML = '<td id="paper name row_' + totalRows + '"></td>\
                        <td id="credits row_' + totalRows + '"></td>\
                        <td id="grade col row_' + totalRows + '"></td>';
                        
    document.getElementById("gpa table body").appendChild(newRow);  

    document.getElementById("grade col row_" + totalRows).innerHTML = '<div class="nav-item dropdown">\
                                                                                <select id="grade dropdown row_' + totalRows +  '" class="nav-link dropdown-menu" role="button" aria-haspopup="true" aria-expanded="false">\
                                                                                    <div id="option list row_' + totalRows + ' class="dropdown-item">\
                                                                                        <option value="Select Grade">Select Grade</option>\
                                                                                        <option value="A+">A+</option>\
                                                                                        <option value="A">A</option>\
                                                                                        <option value="A-">A-</option>\
                                                                                    </div>\
                                                                                </select>\
                                                                        </div>';
    


    document.getElementById("paper name row_" + totalRows).innerHTML =  '<div class="form-group has-success">\
                                                                            <input type="text" value="" id="paper value row_' + totalRows + '">\
                                                                         </div>';

    document.getElementById("credits row_" + totalRows).innerHTML =  '<div class="form-group has-success">\
                                                                        <input type="text" value="" id="credits value row_' + totalRows + '">\
                                                                      </div>';
    
    totalRows += 1;
           
}


document.getElementById("add row").onclick = addTableRow;
    
document.getElementById("delete row").onclick = function(){

    if (totalRows >= 1){
        document.getElementById("gpa table").deleteRow(totalRows);
        totalRows -= 1;
    }
}


