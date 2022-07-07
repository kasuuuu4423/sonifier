window.addEventListener('load',  () =>{
  let nav = document.getElementsByClassName('nav')[0];
  let ham = document.getElementsByClassName('ham')[0];
  ham.addEventListener('click', (e)=>{
    toggleActive(nav);
    let target;
    if(e.target.classList.contains('line')){
      target = e.target;
    }
    else{
      target = e.target.getElementsByClassName('line')[0];
    }
    toggleActive(target);
    toggleActive(ham);
    let circles = document.getElementsByClassName('circle_link');
    if(circles[0].classList.contains('active')){
      reset_circle_position(circles);
    }
    else{
      set_circle_position(circles);
    }
  });
});

const set_circle_position = (circles) =>{
  let num = circles.length;
  let deg = 360.0 / num / 3;
  let red = (deg * Math.PI / 180.0);
  let circle_r = circles[0].clientWidth * 2.5;
  let translate = 82;
  //circle_r = 100;
  for(let i = 0; i < num; i++){
    let x = Math.cos(red * i) * circle_r + circle_r;
    let y = Math.sin(red * i) * circle_r + circle_r;
    circles[i].style.left = -x + translate + 'px';
    circles[i].style.top = -y + translate + 'px';
    toggleActive(circles[i]);
  }
}

const reset_circle_position = (circles) =>{
  for(let i = 0; i < circles.length; i++){
    circles[i].style.left = '';
    circles[i].style.top = '';
    toggleActive(circles[i]);
  }
}

const toggleActive = (elm, display=null) =>{
  if(!elm.classList.contains('active')){
    elm.classList.remove('passive');
    elm.classList.add('active');
    if(display != null){
      elm.style.display = display;
    }
  }
  else{
    elm.classList.add('passive');
    elm.classList.remove('active');
    if(display != null){
      elm.style.display = 'none';
    }
  }
}