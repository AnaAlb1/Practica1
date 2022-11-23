menu();
function menu(){
   const toggle=document.querySelector('#toggle');
   const navUl=document.querySelector('.nav__ul')
   toggle.addEventListener('click',()=>{
      const navIcon=document.querySelector('.nav__icon');
      if(navUl.classList.contains('actived')){
         navUl.classList.remove('actived')
         navIcon.textContent = 'menu'
      }else{
         navUl.classList.add('actived')
         navIcon.textContent = 'close'
      }
   })
};