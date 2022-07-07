window.addEventListener('load', ()=>{
  window.addEventListener('click', (e)=>{
    let target = e.target;
    if(target.closest('.artist') != null){
      show_detail();
      tgl_active(target.closest('.artist'));
    }
    else if(target.classList.contains('artist_detail_closeBtn')){
      hidden_detail();
    }
  });
});

const show_detail = () =>{
  let detail = document.getElementsByClassName('artist_detail')[0];
  add_class(detail, 'd_active', ()=>{
    let wrapper = detail.getElementsByClassName('wrap_artist_detail')[0];
    setTimeout(tgl_active, 50, detail, ()=>{
      setTimeout(()=>{
        detail.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 100);
    });
    setTimeout(tgl_active, 400, wrapper);
  });
}

const hidden_detail = () =>{
  let detail = document.getElementsByClassName('artist_detail')[0];
  tgl_passive(detail, ()=>{
    let wrapper = detail.getElementsByClassName('wrap_artist_detail')[0];
    tgl_passive(wrapper);
    setTimeout(()=>{
      remove_class(detail, 'd_active');
    }, 400);
  });
}

const add_class = (elm, className, func=()=>{}) =>{
  if(!elm.classList.contains(className)){
    elm.classList.add(className);
    //elm.classList.remove('passive');
    func();
  }
}

const remove_class = (elm, className, func=()=>{}) =>{
  if(elm.classList.contains(className)){
    elm.classList.remove(className);
    //elm.classList.remove('passive');
    func();
  }
} 

const tgl_active = (elm, func = () =>{}) =>{
  add_class(elm, 'active', func);
}

const tgl_passive = (elm, func = () =>{}) =>{
  remove_class(elm, 'active', func);
}