
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var totalRows = 1;
var selectRow = 1;
var selectTableRowElement;

//Add first row
document.onload = addTableRow();

function getRowIndexandValue(rowElement)
{
   selectTableRowElement = rowElement;
   selectRow = selectTableRowElement.rowIndex;
   console.log(selectRow)
   console.log(document.getElementById("grade dropdown row_" + selectRow).value)
}

function addTableRow()
{
    
    var newRow = document.createElement("tr");
    newRow.id = "row_" + totalRows;
    newRow.type = "button";
    newRow.setAttribute("onclick","getRowIndexandValue(this);");
    newRow.innerHTML = '<th scope="row">Default</th>\
                        <td>Column content</td>\
                        <td>Column content</td>\
                        <td id="grade col row_' + totalRows + '"></td>'
    
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
                                                                        </div>'
                                             
    totalRows += 1;
           
}


document.getElementById("add row").onclick = function(){
    addTableRow();
}

document.getElementById("delete row").onclick = function(){

    if (totalRows >= 1){
        document.getElementById("gpa table").deleteRow(totalRows);
        totalRows -= 1;
    }
}


