document.addEventListener("DOMContentLoaded", function(event)
{


document.getElementById("edit").addEventListener("click", function(event){
		event.preventDefault();

		var request=new XMLHttpRequest();
		var name=document.getElementById('name').value;
		var AuraId=document.getElementById('AuraId').value;
		var target='/editorAura?';
		if (name!="")
		{
		target+='name='+name+'&AuraId='+AuraId;


		request.open('GET',target,true)
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(null);
		request.addEventListener('load',function(){

			window.location.href="http://flip3.engr.oregonstate.edu:55558/aura-types";
		})

		}
		else
		{
			document.getElementById("error").textContent="Name cannot be empty.";
		}

		
	});
})