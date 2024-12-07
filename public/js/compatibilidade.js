

window.addEventListener("resize", function(event) {
    var width = window.innerWidth;  
    var um = document.querySelectorAll(".a1") ; 
    var dois = document.querySelectorAll(".a2") ;
    var tres = document.querySelectorAll(".a3") ;
    var cinco = document.querySelectorAll(".a5") ;
    
    if(width<700){
        um.forEach((a1) => {
            a1.classList.remove('col-6');
        });
        dois.forEach((a2) => {
            a2.classList.remove('col-2');
        });
        tres.forEach((a3) => {
            a3.classList.remove('col-4');
            a3.classList.add('text-center');
        });
        cinco.forEach((a5) => {
            a5.classList.remove('col-5');
        });

      }else{
        um.forEach((a1) => {
            a1.classList.add('col-6');
        });
        dois.forEach((a2) => {
            a2.classList.add('col-2');
        });
        tres.forEach((a3) => {
            a3.classList.add('col-4');
            a3.classList.remove('text-center');
        });
        cinco.forEach((a5) => {
            a5.classList.add('col-5');
        });

      }
    }, true);