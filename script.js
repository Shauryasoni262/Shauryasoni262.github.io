function revealToSpan(){

    document.querySelectorAll(".reveal")
    .forEach(function(elem){
       var parent = document.createElement("span");
       var child = document.createElement("span");
       
       
       parent.classList.add("parent");
       child.classList.add("child");
       
       
       //with this we created <span class="parent">
           child.innerHTML = elem.innerHTML;
           parent.appendChild(child);
           
           elem.innerHTML="";
           elem.appendChild(parent)
    });
    }

function valueSetters(){
  gsap.set("#nav a", {
        y:"-100%", opacity:0 });  
      gsap.set("#home .parent .child", {y:"100%"})
      gsap.set("#home .row img", { opacity:0})
      
      document.querySelectorAll("#Visual>g>g>path, #Visual>g>g>polyline ").forEach(function(e){
            var character = e
        
            character.style.strokeDasharray = character.getTotalLength() + 'px';
            character.style.strokeDashoffset = character.getTotalLength() + 'px';
          })
}

    function loaderAnimation(){
        var tl = gsap.timeline()
    
    tl

    .from("#loader .child span", {
        x:100,
        stagger: .2,
        duration: 1.4,
        ease: Power3.easeInout
    })
    .to("#loader .parent .child", {
        y:"-100%",
        duration: 1,
        ease: Circ.easeInout
    })
    .to("#loader", {
      height: 0,
        duration: 1,
        ease: Circ.easeInout
    })
    .to("#green", {
      top:0,
      height:"100%",
        duration: 1,
        delay:-.8,
        ease: Circ.easeInout
    })
    .to("#green", {
        height:"0%",
        delay:-.5,
        duration: 1,
        ease: Circ.easeInout,
        onComplete: function(){
          animateHomepage();
        }
    })
    
    }
    function animateSvg(){
         
        
        gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
            strokeDashoffset: 0,
            duration:2,
            ease: Expo.easeInOut
        })
    }
    function animateHomepage(){
      
      
      var tl = gsap.timeline();
      tl
      .to("#nav a", {
        y:0,
        opacity: 1,
        stagger: .05,
        ease:Expo.easeInOut
      })
            .to("#home .parent .child", {
        y:0,
        stagger: 0.1,
        duration: 1.5,
        ease:Expo.easeInOut
      })
       .to("#home .row img", {
        opacity:1,
        delay: -.5,
        ease:Expo.easeInOut,
        onComplete:function(){
          animateSvg();
        }
      })
    }
    
    
    revealToSpan();
    valueSetters();
    loaderAnimation();