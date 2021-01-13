document.addEventListener("DOMContentLoaded", function(event)
{

	function deleteRow(id)
	{

				var request= new XMLHttpRequest();
		request.open("GET","/deleteOrg?id="+id,true)
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(null);
		request.addEventListener('load',function()
		{
			showTable();
			showDrop();
		})
		
	}



	function showTable()
	{
		var request= new XMLHttpRequest();
		

		request.open('GET','/selectOrg2',true)
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

    			
    			var href="/editOrg";
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
    			newButton.check=xx.OrgId;
    			newCell=document.createElement("td");
    			newRow.appendChild(newCell);
    			newCell.appendChild(newButton);
    			newButton.addEventListener("click",function(){deleteRow(this.check)})
    		}

    		
    		
    		document.getElementsByTagName("body")[0].replaceChild(newTable,oldTable);
    		
    		
		})
		


	}
	function showDrop()
	{
			var request2= new XMLHttpRequest();
		request2.open('GET','/selectLoc',true)
		request2.setRequestHeader('Content-Type', 'application/json');
		request2.send(null);
		request2.addEventListener('load',function()
		{

			if(request2.status >= 200 && request2.status < 400){

				var rows=JSON.parse(request2.responseText);
				
			}
			
			
		
			var dropdown = document.getElementById("location");
			

    
    		
    		for(var i=0;i<rows.length;i++)
    		{
    			var newOption=document.createElement("option");
				dropdown.appendChild(newOption);
    			var xx=rows[i];
    			
    			newOption.textContent=xx.Name;
    			newOption.value=xx.LocID;

    		}

	
		})

	}

		document.getElementById("add").addEventListener("click", function(event){
		event.preventDefault();

		var request=new XMLHttpRequest();
		var name=document.getElementById('name').value;
		var alignment=document.getElementById('alignment').value;
		var location=document.getElementById('location').value;
		var target='/insertOrg?';
		if (name!="")
		{
			
		target+='name='+name+'&location='+location+'&alignment='+alignment;
		console.log(target);

		request.open('GET',target,true)
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(null);
		request.addEventListener('load',function(){
			showDrop();
			showTable();
		})

		}
		else
		{
			document.getElementById("error").textContent="Name cannot be empty";
		}

		
	});
		showDrop();
		showTable();

})