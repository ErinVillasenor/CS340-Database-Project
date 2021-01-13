document.addEventListener("DOMContentLoaded", function(event)
{

	function deleteRow(id)
	{
        console.log(id);
		    var request= new XMLHttpRequest();
        request.open("GET","/deleteChar?id="+id,true)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);
        request.addEventListener('load',function()
        {
            showTable();
        })
       
	}



	function showTable()
	{
		var request= new XMLHttpRequest();
		

		request.open('GET','/selectChar2',true)
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(null);
		request.addEventListener('load',function()
		{

			if(request.status >= 200 && request.status < 400){

				var rows=JSON.parse(request.responseText);
				
			}
			var oldTable=document.getElementsByTagName("table")[0];
			
			var newTable = document.createElement("table");
			var newRow = document.createElement("tr");
			newTable.appendChild(newRow);

    		for (x in rows[0])
    		{
    			var newHead = document.createElement("th");
    			newHead.textContent=x;
    			newRow.appendChild(newHead);

    		}
    		for(var i=0;i<rows.length;i++)
    		{
    			newRow = document.createElement("tr");
				newTable.appendChild(newRow);
    			var xx=rows[i];
    			for (x in xx)
    			{
    				var newCell = document.createElement("td");
    				newCell.textContent=xx[x];

    				
    				newRow.appendChild(newCell);
    			}
    			var newForm=document.createElement("form");
    			var newButton=document.createElement("button");

    			newButton.textContent="Edit";
    			
    			newCell=document.createElement("td");
    			newRow.appendChild(newCell);
    			newCell.appendChild(newForm);
    			newForm.appendChild(newButton);
    			newButton.type="submit";

    			
    			var href="/editChar";
    			newForm.action=href;
    			for(x in xx)
    			{
    				var newInput=document.createElement("input");
    				newInput.type="hidden";
    				newInput.name=x;
    				newInput.value=xx[x];
    				newForm.appendChild(newInput);

    			}
    			
    			

    			newButton=document.createElement("button");
    			newButton.textContent="Delete";
    			newButton.check=xx.Id;
    			newCell=document.createElement("td");
    			newRow.appendChild(newCell);
    			newCell.appendChild(newButton);
    			newButton.addEventListener("click",function(){deleteRow(this.check)})
    		}

    		
    		
    		document.getElementsByTagName("body")[0].replaceChild(newTable,oldTable);
    		
    		
		})
		

	}

   

    document.getElementById("add").addEventListener("click", function(event){
        event.preventDefault();

        var request=new XMLHttpRequest();
        var first_name=document.getElementById('fname').value;
        var last_name=document.getElementById('lname').value;
        var race=document.getElementById('race').value;
       
        
        if (last_name!="")
        {
           
        
        var target='/insertChar?';

        target+='first_name='+first_name+'&last_name='+last_name+'&race='+race;
    

        request.open('GET',target,true)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);
        request.addEventListener('load',function(){

            showTable();
        })

        }
        else{
            document.getElementById("error").textContent="Last name cannot be empty.";
        }

        
    });

	showTable();

})