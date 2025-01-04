document.addEventListener('DOMContentLoaded', function habits(){
   const li = document.querySelectorAll('.todo');
li.forEach(task => {
   task.addEventListener('click', function () {
    task.style.display ='none';
    done();
   });
 });
 let count = 3;
 function done() {
   count--;
   if(count === 0){
     const text = document.querySelector('h4');
     text.innerHTML = "YOU DID IT!";
     text.style.backgroundColor = 'black';
     text.style.color = 'white';
     text.style.borderRadius = '26px';
   }
 }
});
