  
document.addEventListener("DOMContentLoaded", function(event){


  var slideNum=1;
  showSlide(slideNum);

  function showSlide(n)
  {
    var imgs = document.getElementsByClassName("slide");
    
    var dots = document.getElementsByClassName("dot");
    console.log(slideNum);
    if (n > imgs.length)
    {
      slideNum=1;
    }
    else if (n<1)
    {
      slideNum=imgs.length;
    }

    var i;

    for (i=0;i<imgs.length; i++)
    {
      imgs[i].style.display="none";
      
    }

    for(i=0;i<dots.length;i++)
    {
      dots[i].className=dots[i].className.replace(" active","");
    }
    imgs[slideNum-1].style.display = "block";
    
    dots[slideNum-1].className += " active";
  
  }


  function incrementSlide(n)
  {
    slideNum+=n;
    showSlide(slideNum);
  }

  function setSlide(n)
  {
    slideNum=n;
    showSlide(slideNum);
  }

  document.getElementById("prev").addEventListener("click",function(){incrementSlide(-1)});
  document.getElementById("next").addEventListener("click",function(){incrementSlide(1)});
  document.getElementById("one").addEventListener("click",function(){setSlide(1)});
  document.getElementById("two").addEventListener("click",function(){setSlide(2)});
  document.getElementById("three").addEventListener("click",function(){setSlide(3)});


})

