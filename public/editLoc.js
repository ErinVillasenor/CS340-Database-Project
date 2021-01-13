document.addEventListener("DOMContentLoaded", function(event)
{

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
document.getElementById("edit").addEventListener("click", function(event){
		event.preventDefault();

		var request=new XMLHttpRequest();
		var name=document.getElementById('name').value;
		var LocId=document.getElementById('LocId').value;
		var target='/editorLoc?';

		target+='name='+name+'&LocId='+LocId;
		if (name!="")
		{

		request.open('GET',target,true)
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(null);
		request.addEventListener('load',function(){

			window.location.href="http://flip3.engr.oregonstate.edu:55558/locations";
		})
		}
		else
		{
			document.getElementById("error").textContent="Name cannot be empty.";
		}


		
	});
showDrop();
})