window.addEventListener('load', () =>{
  let cal_btn = document.getElementsByClassName('cal_btn')[0];
  let cal = document.getElementsByClassName('calendar')[0];
  event_cal_btn(cal_btn, cal);
  
  const cats = document.getElementsByClassName('cat');
  event_cat(cats);
});

const event_cal_btn = (btn, cal) =>{
  btn.addEventListener('click', (e)=>{
    toggleActive(cal);
    toggleActive(btn);
  });
}

const event_cat = (cats) =>{
  for(let i = 0; i < cats.length; i++){
    cats[i].addEventListener('click', (e)=>{
      if(!e.target.closest('.active')){
        for(let i_cats = 0; i < cats.length; i++){
          console.log(i);
          let cat = cats[i_cats];
          if(cat == e.target.closest('.cat')){
            cat.classList.remove('active');
          }
          else{
            cat.classList.add('active');
          }
        }
      }
    });
  }
}