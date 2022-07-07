window.addEventListener('load', ()=>{
  let transition = document.getElementsByClassName('transition')[0];
  
  ScrollOut({
    cssProps: {
      visibleY: true,
      viewportY: true
    }
  });
  let wavesurfers = [
    WaveSurfer.create({
    container: '#wave_pc',
    waveColor: '#9FA1CC',
    progressColor: '#404298',
    barHeight: 0.8,
    height: 64,
    }),
    WaveSurfer.create({
    container: '#wave_sp',
    waveColor: '#9FA1CC',
    progressColor: '#404298',
    barHeight: 0.6,
    height: 35,
    }),
  ]

  const pause = document.getElementsByClassName('pause');
  const play = document.getElementsByClassName('play');
  wavesurfers.forEach((wavesurfer, i) => {
    wavesurfer.load('../dest/mp3/beat.mp3');
    pause[i].addEventListener('click', ()=>{
      if(pause[i].classList.contains('active')){
        play[i].classList.toggle('active');
        pause[i].classList.toggle('active');
        wavesurfer.pause();
      }
    })
    play[i].addEventListener('click', ()=>{
      if(play[i].classList.contains('active')){
        play[i].classList.toggle('active');
        pause[i].classList.toggle('active');
        wavesurfer.play();
      }
    });
  });
});


// window.addEventListener('scroll', ()=>{
//   let transition = document.getElementsByClassName('transition')[0];
//   let transition_posY = transition.getBoundingClientRect().top;
//   // console.log(-transition_posY + window.parent.screen.height/2);
//   // if(window.pageYOffset > transition_posY){
//   //   if(-transition_posY + window.parent.screen.height/2 < 1920){
//   //     transition.style.height = -transition_posY + window.parent.screen.height/2 + 'px';
//   //   }
//   // }
// });