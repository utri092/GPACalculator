
const ipc = require('electron').ipcRenderer

function addTableRows(tableNo, rowJsonArray){

    var subject, credits, grade;
    var paperName, creditsName, gradeName

    var tableBody = document.getElementsByTagName('table')[tableNo].childNodes[1];

    for (var i = 0; i < rowJsonArray.length; i++){

		subject = rowJsonArray[i]['subject'];
		credits = rowJsonArray[i]['credits'];
		grade = rowJsonArray[i]['grade'];

        var newRow = document.createElement("tr");

        var newCell_0 = document.createElement("td");
        var newCell_1 = document.createElement("td");
        var newCell_2 = document.createElement("td");

        newRow.appendChild(newCell_0);
        newRow.appendChild(newCell_1);
        newRow.appendChild(newCell_2);
    
        
        paperName = document.createElement('p');
        paperName.setAttribute("class", "lead");
        var text = document.createTextNode(subject);
        paperName.appendChild(text);
 

        creditsName = document.createElement('p');
        creditsName.setAttribute("class", "lead");
        text = document.createTextNode(credits);
        creditsName.appendChild(text);
        
        gradeName = document.createElement('p');
        gradeName.setAttribute("class", "lead");
        text = document.createTextNode(grade);
        gradeName.appendChild(text);
        
        newRow.cells[0].appendChild(paperName);

        newRow.cells[1].appendChild(creditsName);

        newRow.cells[2].appendChild(gradeName);

        tableBody.appendChild(newRow);

    }
                                
}


function addTable(tableNo){

	var transcriptSection = document.getElementById("Transcript Section");

    var newTable = document.createElement('table');
    newTable.setAttribute("class", "table table-hover");

    //Table Header
    var tableHeader = document.createElement('thead');
    var headerRow = document.createElement('tr');
    headerRow.setAttribute("class", "table-primary");

    var headerCol_0 = document.createElement('th');
    var headerCol_1 = document.createElement('th');
    var headerCol_2 = document.createElement('th');
    
    headerCol_0.innerText = "Paper Name";
    headerCol_1.innerText = "Credits";
    headerCol_2.innerText = "Grade";
    headerRow.appendChild(headerCol_0);
    headerRow.appendChild(headerCol_1);
    headerRow.appendChild(headerCol_2);
    
    //Table Body
    var tableBody = document.createElement('tbody');
   
    tableHeader.appendChild(headerRow);
    newTable.appendChild(tableHeader);
	newTable.appendChild(tableBody);
    transcriptSection.appendChild(newTable);
    
}


ipc.on('print-pdf', function(error, messages){
	
	const gpaJsonArray = messages['gpaInfo'];
    const totalTables = gpaJsonArray['totalTables'];
    
    var section = document.getElementsByTagName('section');

    //Remove section
    for (var i = 0; i < section.length; i++){
        document.body.removeChild(section[i]);
    }
	
	document.body.prepend(document.createElement('section'));
    
    //Get table section
    section = document.body.childNodes[0];
	section.setAttribute("id", "Transcript Section");

	for (var tableNo = 0; tableNo < totalTables; tableNo++){

		addTable();
        addTableRows(tableNo, gpaJsonArray[tableNo]);
		
	}

	ipc.send('print-pdf-done');

});

	
	



