


     24 <!--Loader--> 
     
     55            <!--Next page-->
     
     85   /* loader css */
     
     48  /* shaurya soni text this👇 */
     
     
     
     
     

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
        x:150,
        stagger: .2,
        duration: 1.5,
        opacity:.8,
        ease: Power3.easeInout
    })
    .to("#loader .parent .child", {
        y:"-100%",
        duration: 1,
        ease: Circ.easeInout
    })
    .to("#loader .loader-container", {
      opacity: 0,
      duration: 0.5,
      ease: Circ.easeInOut,
    }, "-=0.5") 
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
     
     function locoInitialize(){
        const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
        });
        /*
      
        
        document.querySelectorAll('#nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();  // Prevent the default anchor behavior

            const targetId = this.getAttribute('href').substring(1); // Get the target section id
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                scroll.scrollTo(targetElement, {   // Smooth scroll to the target element
                    offset: 0, // Optional: You can add offset if you need
                    duration: 1000 // Scroll duration (1 second)
                });
            }
        });
    });  */
     }
    
    revealToSpan();
    valueSetters();
    loaderAnimation();
   locoInitialize();  

    
    
    
    
    2
    
    
    
    
    
    /

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
        x:150,
        stagger: .2,
        duration: 1.5,
        opacity:.8,
        ease: Power3.easeInout
    })
    .to("#loader .parent .child", {
        y:"-100%",
        duration: 1,
        ease: Circ.easeInout
    })
    .to("#loader .loader-container", {
      opacity: 0,
      duration: 0.5,
      ease: Circ.easeInOut,
    }, "-=0.5") 
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
     
     function locoInitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'), // Ensure #main wraps your scrollable content
        smooth: true,
    });

}

// Initialize animations and scroll
revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();




    
    
    
    
    
    
    document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href').substring(1); // Get target section ID
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Smooth scroll to the section
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

    
    
    
    
    
    