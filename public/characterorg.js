document.addEventListener("DOMContentLoaded", function(event)
{

	function deleteRow(id1,id2)
	{
        
		  var request= new XMLHttpRequest();
        request.open("GET","/deleteCharOrg?id1="+id1+"&id2="+id2,true)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);
        request.addEventListener('load',function()
        {
            showTable(id2);
        })
       
	}



	function showTable(id)
	{
		var request= new XMLHttpRequest();
		
        var target="/selectCharOrg?charId="+id;
        
        
		request.open('GET',target,true);
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(null);
		request.addEventListener('load',function()
		{

			if(request.status >= 200 && request.status < 400){

				var rows=JSON.parse(request.responseText);
				
			}
			var oldTable=document.getElementById("fflist");
			
			var newTable = document.createElement("ul");
			newTable.id="fflist";
			

    		/*for (x in rows[0])
    		{
    			var newHead = document.createElement("th");
    			newHead.textContent=x;
    			newRow.appendChild(newHead);

    		}*/
            
    		for(var i=0;i<rows.length;i++)
    		{
    			newRow = document.createElement("li");
				newTable.appendChild(newRow);
    			var xx=rows[i];
    			
    			newRow.textContent="This character is part of "+xx.Name;
                
    				
    			
    			
    			
    			
    		

    			newButton=document.createElement("button");
    			newButton.textContent="Delete";
    			newButton.check1=xx.OrgId;
    			newButton.check2=xx.character_id;
    			
    			newRow.appendChild(newButton);
    			newButton.addEventListener("click",function(){deleteRow(this.check1,this.check2)})
    		}

    		
    		
    		document.getElementsByTagName("body")[0].removeChild(oldTable);
            document.getElementsByTagName("body")[0].appendChild(newTable);
    		
		})
		

	}


function showDrop()
    {
        var request2= new XMLHttpRequest();
        request2.open('GET','/selectChar',true)
        request2.setRequestHeader('Content-Type', 'application/json');
        request2.send(null);
        request2.addEventListener('load',function()
        {

            if(request2.status >= 200 && request2.status < 400){

                var rows=JSON.parse(request2.responseText);
                
            }
            
            
        
            var dropdown = document.getElementsByTagName("select");
            
            var dropdownx=dropdown[0]; 
            while (dropdownx.firstChild){
                dropdownx.removeChild(dropdownx.firstChild);
            }
            for(var i=0;i<rows.length;i++)
            {
                var newOption=document.createElement("option");
                dropdownx.appendChild(newOption);
                var xx=rows[i];
                
                newOption.textContent=xx.first_name+" "+xx.last_name;
                newOption.value=xx.character_id;

            }

            var dropdownx=dropdown[2]; 
            while (dropdownx.firstChild){
                dropdownx.removeChild(dropdownx.firstChild);
            }
            for(var i=0;i<rows.length;i++)
            {
                var newOption=document.createElement("option");
                dropdownx.appendChild(newOption);
                var xx=rows[i];
                
                newOption.textContent=xx.first_name+" "+xx.last_name;
                newOption.value=xx.character_id;

           
            


            }
         
    
        })}
    function showDrop2()
        {

        var request2= new XMLHttpRequest();
        request2.open('GET','/selectOrg',true)
        request2.setRequestHeader('Content-Type', 'application/json');
        request2.send(null);
        request2.addEventListener('load',function()
        {

            if(request2.status >= 200 && request2.status < 400){

                var rows=JSON.parse(request2.responseText);
                
            }
            
            
        
            var dropdown = document.getElementsByTagName("select");
            
            var dropdownx=dropdown[1]; 
            while (dropdownx.firstChild){
                dropdownx.removeChild(dropdownx.firstChild);
            }
            for(var i=0;i<rows.length;i++)
            {
                var newOption=document.createElement("option");
                dropdownx.appendChild(newOption);
                var xx=rows[i];
                
                newOption.textContent=xx.Name;
                newOption.value=xx.OrgId;

            }

            

          }) 
            

        }
           

    
    document.getElementById("add").addEventListener("click", function(event){
        event.preventDefault();

        var request=new XMLHttpRequest();
        var id1=document.getElementById('character').value;
        
        var id2=document.getElementById('Organization').value;
     
       

        var target='/insertCharOrg?';

        target+='CharId='+id1+'&OrgId='+id2;


        request.open('GET',target,true)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);
        request.addEventListener('load',function(){
            showDrop();
            showDrop2();
        })



        
    });

    document.getElementById("populate").addEventListener("click", function(event){

        event.preventDefault();

        showTable(document.getElementById("character3").value);
        
    });
    showDrop();
    showDrop2();
	

})