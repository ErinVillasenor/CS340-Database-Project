document.addEventListener("DOMContentLoaded", function(event)
{


document.getElementById("edit").addEventListener("click", function(event){
		event.preventDefault();

		var request=new XMLHttpRequest();
		var first_name=document.getElementById('first_name').value;
		var last_name=document.getElementById('last_name').value;
		var race=document.getElementById('race').value;
		var CharId=document.getElementById('CharId').value;
		var target='/editorChar?';
		if (last_name!="")
		{
		target+='first_name='+first_name+'&last_name='+last_name+'&race='+race+'&CharId='+CharId;

		request.open('GET',target,true)
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(null);
		request.addEventListener('load',function(){

			window.location.href="http://flip3.engr.oregonstate.edu:55558/characters";
		})
		}
		else {
			document.getElementById("error").textContent="Last Name cannot be empty."
		}


		
	});
})