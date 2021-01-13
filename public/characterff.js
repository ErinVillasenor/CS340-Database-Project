document.addEventListener("DOMContentLoaded", function(event)
{

	function deleteRow(id1,id2)
	{
        
		  var request= new XMLHttpRequest();
        request.open("GET","/deleteCharFF?id1="+id1+"&id2="+id2,true)
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
		
        var target="/selectFF?charId="+id;
        
        
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
    			
    			newRow.textContent=xx.first_name+" "+xx.last_name;
                if(xx.first_name==null)
                {
                    newRow.textContent=xx.last_name;
                }
               
                if (xx.character_friends.data[0]==1)
                {
                    newRow.textContent=newRow.textContent+" is friends with this character.";
                }
                if (xx.character_friends.data[0]==0)
                {
                    newRow.textContent=newRow.textContent+" is enemies with this character.";
                }

    				
    			
    			
    			
    			
    			

    			newButton=document.createElement("button");
    			newButton.textContent="Delete";
    			newButton.check1=xx.character_id2;
    			newButton.check2=xx.character_id1;
    			
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

            var dropdownx=dropdown[1]; 
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

            var dropdownx=dropdown[3]; 
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
         
    
        })

    }
    document.getElementById("add").addEventListener("click", function(event){
        event.preventDefault();

        var request=new XMLHttpRequest();
        var id1=document.getElementById('character1').value;
        
        var id2=document.getElementById('character2').value;
        var ff=document.getElementById('FF').value;
        if (id1!=id2)
        {

        var target='/insertCharFF?';

        target+='id1='+id1+'&id2='+id2+'&ff='+ff;


        request.open('GET',target,true)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);
        request.addEventListener('load',function(){
            showDrop();
           
        })

        }
        else
        {
            document.getElementById("error").textContent="A character cannot be in a relationship with themselves.";
        }

        
    });

    document.getElementById("populate").addEventListener("click", function(event){

        event.preventDefault();

        showTable(document.getElementById("character3").value);
        
    });
    showDrop();
	

})