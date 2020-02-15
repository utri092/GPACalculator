
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var totalRows = 0;
var gpaJson = [];
//Key NZ grade: Value Country Grade
var australiaDict = {'A+': 7, 'A': 7, 'A-': 7, 
                     'B+': 6.5, 'B': 6, 'B-': 5.5,
                     'C+': 5, 'C': 4.5, 'C-': 4.0, 
                     'D+, D, D-, DNS, DNC': 0};
//var usaDict = {'A+', ''};



//Add first row when html has loaded
document.onload = addTableRow();

function getRowIndexAndValues()
{
    
    //selectRow = rowElement.rowIndex - 1; //Index starts at 1, rows start from 0
   for(var i = 0; i  < totalRows; i++){
        
        var grade =  document.getElementById("grade dropdown row_" + i).value;
        var subject = (document.getElementById("paper value row_" + i).value);
        var credits =  (document.getElementById("credits value row_" + i).value);
        //Create JSON obj
        var entry = {
            'grade' : grade,
            'subject' : subject,
            'credits' : credits
        }

        gpaJson.push(entry);
   }
//    calculateGPA(gpaJson);
//    console.log(gpaJson);
}

// function calculateGPA(){

    
//     console.log("Worked!");
    
//     pdf.create(html, options).toFile('./hey.pdf', function(err, res) {
//         if (err) return console.log(err);
//         console.log(res); // { filename: '/app/businesscard.pdf' }
//     });
// }


function addTableRow()
{
    
    var newRow = document.createElement("tr");
    newRow.id = "row_" + totalRows;
    newRow.type = "button";

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
                                                                                        <option value="B+>B+</option>\
                                                                                        <option value="B">B</option>\
                                                                                        <option value="B-">B-</option>\
                                                                                        <option value="C+">C+</option>\
                                                                                        <option value="C">C</option>\
                                                                                        <option value="C-">C-</option>\
                                                                                        <option value="D+, D, D-, DNS, DNC">D+, D, D-, DNS, DNC</option>\
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

document.getElementById("Calculate").onclick = window.pdf.print_pdf;
    
document.getElementById("delete row").onclick = function(){

    if (totalRows >= 1){
        document.getElementById("gpa table").deleteRow(totalRows);
        totalRows -= 1;
    }
}


 

  