
/* ---------- modal : cookie ---------- */

const modal = document.querySelector('.modal');
const input = modal.querySelector('input[type="checkbox"]');
const modal_close =modal.querySelector('.modal_close');


modal_close.addEventListener('click',(e)=>{
  e.preventDefault();
  // console.log(in5660put.checked);
  if(input.checked){
    //쿠키생성
    setCookie('Portfolio','resserafim', 1);
  }else{
    //쿠키삭제
    delCookie('Portfolio');
  }
  modal.classList.add('hide');
});
function setCookie(name, val, day){
    let date = new Date();
    date.setDate(date.getDate()+day);
    document.cookie = `${name}=${val};Expires=${date}`;
  }
  function delCookie(name){
    let date = new Date();
    date.setDate(date.getDate()-1);
    document.cookie = `${name}='';Expires=${date}`;
  }

  function checkCookie(name){
    let cookieArr = document.cookie.split(';');
    let visited = false;

    for(let cookie of cookieArr){
      if(cookie.indexOf(name) > -1) {
        visited = true;
      }
    }
    if(visited) {
      modal.classList.add('hide');
    } else {
      modal.classList.remove('hide');
    }
  }
  checkCookie('resserafim');


/* ---------- HEADER 고정 ---------- */
const header = document.querySelector('header');
const headerOst = header.offsetTop;

window.addEventListener('scroll',()=>{
  
  let scrollAmt = window.scrollY;
  console.log(scrollAmt);


  if(scrollAmt > 491){
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');  
  }

  if(scrollAmt > 3710){
    document.querySelector('.company_txt').style.top='0px';
    document.querySelector('.company_txt').style.opacity='1';
  }
});

/* ---------- HEADER : NAV ---------- */
const menuBtn = document.querySelector('header div> span.menu');
const logo = document.querySelector('.logo')
const nav = document.querySelector('nav');
const closeBtn = nav.querySelector('.close');
const sns = document.getElementById('sns');
menuBtn.addEventListener('click',()=>{
  nav.style.left = '0';
  menuBtn.style.opacity = 0;
  sns.style.left = '50px';
});
closeBtn.addEventListener('click',()=>{
  nav.style.left = '100%';
  menuBtn.style.opacity = 1;
  sns.style.left = '-50px';
});

/* ---------- HEADER : NAV 섹션이동 ---------- */
const menu =  document.querySelectorAll('#top_menu a');
const section =  document.querySelectorAll('#contents > section');

for(let m of menu){
  m.addEventListener('click',(e)=>{
    e.preventDefault();
    let targetId = m.getAttribute('href');
    console.log(targetId);
    let targetSection = document.querySelector(targetId);
    let targetOST = targetSection.offsetTop;
    window.scrollTo({left:0, top: targetOST, behavior:'smooth' });

    m.closest('#top_menu').style.display = 'none';
    menuBtn.style.opacity = 1;
    sns.style.left = '-50px'; 
  });
}

/* ---------- ASIDE : SNS ---------- */ 

sns.addEventListener('click',()=>{
  sns.classList.toggle('toggle');
});

/* ---------- MAIN: BANNER ---------- */

let slideWrapper = document.querySelector('.slide-wrapper'), 
    slideContainer = slideWrapper.querySelector('.slide-container'),  
    slides =slideContainer.querySelectorAll('li'),
    videos = slideContainer.querySelectorAll('video'), 
    slideCount = slides.length,
    currentSlideIdx = 0,
    pager = slideWrapper.querySelector('.pager'),
    timer,
    pagerHTML = '',
    prevBtn = slideWrapper.querySelector('#prev'), 
    nextBtn = slideWrapper.querySelector('#next');

if(slideCount > 1){
  slides.forEach((item, idx)=>{
    item.style.left = `${idx*100}%`;
    pagerHTML += `<a href="">${idx}</a>`;    
  });
}
pager.innerHTML = pagerHTML;
let pagerBtn = pager.querySelectorAll('a');

function moveSlide(num){
  slideContainer.style.left = `${-num*100}%`;
  currentSlideIdx = num;
  console.log(currentSlideIdx);

  if(currentSlideIdx === slideCount -1){
    nextBtn.classList.add('disabled');
  } else{
    nextBtn.classList.remove('disabled');
  }
  if(currentSlideIdx === 0){
    prevBtn.classList.add('disabled');
  } else{
    prevBtn.classList.remove('disabled');
  }
  for(let sl of slides){
    sl.classList.remove('active');
  }
  slides[currentSlideIdx].classList.add('active');
  for(let pb of pagerBtn){
    pb.classList.remove('active');
  }
  pagerBtn[currentSlideIdx].classList.add('active');
  for(let video of videos){
    video.pause();
  }
  if(slides[currentSlideIdx].querySelectorAll('video').length > 0){
    slides[currentSlideIdx].querySelector('video').play();
  }
}
moveSlide(0);
nextBtn.addEventListener('click',()=>{
  if(currentSlideIdx < slideCount -1){
    moveSlide(currentSlideIdx + 1);
  }
});
prevBtn.addEventListener('click',()=>{
  if(currentSlideIdx > 0){
    moveSlide(currentSlideIdx - 1);
  }
});

// 페이저로 슬라이드 이동하기
pagerBtn.forEach((item,idx)=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    moveSlide(idx);
  });
});

// 자동 슬라이드 
function autoSlide(){
  timer = setInterval(()=>{
    //let nextIdx = currentSlideIdx + 1;
    let nextIdx = (currentSlideIdx + 1) % slideCount;
    moveSlide(nextIdx);
  }, 3000);
}
autoSlide();

slideWrapper.addEventListener('mouseenter',()=>{
  clearInterval(timer);
});
slideWrapper.addEventListener('mouseleave',()=>{
  autoSlide();
});

/* ---------- MAIN : ALBUM ---------- */
const album = document.querySelectorAll('.album_box .list li');

for(let li of album){
  li.addEventListener('click',(e)=>{
    for(let a of album){
      a.classList.remove('active2');
    }
    e.currentTarget.classList.add('active2');
  });
  
}


/* ---------- MAIN:GOODS---------- */
const g_slideWrapper = document.querySelector('.goods_slide_wrapper');
const g_slideContainer = g_slideWrapper.querySelector('.goods_slides');
const g_slides = g_slideContainer.querySelectorAll('li');
let g_currentIdx = 0;
const g_slideCount = g_slides.length;
const slideWidth = 276;
const slideMargin = 20;
const slideToShow = 4;
const s_prevBtn = document.querySelector('.small_prev_btn');
const s_nextBtn = document.querySelector('.small_next_btn');

g_slideContainer.style.width = '1168px';

function moveSlide2(idx){
  g_slideContainer.style.transform = `translateX(${-idx*(slideWidth + slideMargin)}px)`;
  g_currentIdx = idx;
  console.log(g_currentIdx);
}

s_nextBtn.addEventListener('click',()=>{
  if(g_currentIdx == (g_slideCount - slideToShow)){ 
    moveSlide2(0);
  }else{
    moveSlide2(g_currentIdx+1);
  }
});

s_prevBtn.addEventListener('click',()=>{
  if(g_currentIdx == 0){ 
    moveSlide2(g_slideCount - slideToShow);
  }else{
    moveSlide2(g_currentIdx-1);
  }
});

/* ---------- MAIN : SCHEDULE - POPUP ---------- */

var calendarEl = document.getElementById('calendar');
let popup = document.querySelector('dialog');
const closeCalender = document.querySelector('dialog button');

var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'dayGridMonth',
  googleCalendarApiKey: 'AIzaSyDfixLPrEr2-za6038iwvm-MzGiRJUjdHc',
  events: {
    googleCalendarId: '940e6a5675cd87e70f2e9c261f1168d3cc9d917573e66c26e25d540c3223f136@group.calendar.google.com'
  },
  eventClick: function(info) {
    info.jsEvent.preventDefault();
    //alert('Event: ' + info.event.title);
    //console.log(info.event.extendedProps.description);

    popup.querySelector('div').innerHTML = `
      <h3>${info.event.title}</h3>
      <div>${info.event.extendedProps.description}</div>
    `;
    popup.setAttribute('open','open')
    let randomNumber = Math.floor(Math.random() * 5);
      popup.style.backgroundImage = `url(../images/random0${randomNumber}.png)`;
    }
});
calendar.render();



popup.querySelector('button').addEventListener('click',()=>{
  popup.removeAttribute('open');
});



/* ---------- MAIN:COMPANY ---------- */
let slideUi = document.querySelector('.company_slide_contents');
let slide3 = document.querySelectorAll('.company_slide_contents li');
let cpSlideCount = slide3.length;
let currentIdx = 0;

slide3[0].classList.add('cpactive');


function autoSlide (){
  let timer = setInterval(()=>{
  let nextIdx = (currentIdx + 1) % cpSlideCount;
  slide3[currentIdx].classList.remove('cpactive');
  slide3[nextIdx].classList.add('cpactive');

  currentIdx = nextIdx;
}, 3000);
}

autoSlide();

/* ---------- MAIN:COMPANY 지도api ---------- */
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5306844,126.9702218), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.5306844,126.9702218); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

var iwContent = '<div style="padding:5px;">SORCEMUSIC<br><a href="https://map.kakao.com/link/map/Hello World!,37.5306844,126.9702218" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,37.5306844,126.9702218" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(37.5306844,126.9702218); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
});
  
// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker); 

const mapbtn = document.querySelector('.map_btn');
const mapClosebtn = document.querySelector('.map_close');
const mapwrapper = document.querySelector('.map_wrapper');
  mapbtn.addEventListener('click',()=>{
    mapwrapper.style.left = '0px';
  });
  mapClosebtn.addEventListener('click',()=>{
    mapwrapper.style.left = '100%';
  });


/* ---------- FOOTER : FAMLIY SITE ---------- */
const footer = document.querySelector('.f_site');
const mainMenu = footer.querySelectorAll('.f_site ul > li');
const initHeight = footer.offsetHeight;
let tallestHeight = 0;

for(let li of mainMenu){
	let smheight = li.querySelector('ul').offsetHeight;
	if(smheight > tallestHeight){
		tallestHeight = smheight;
	}
	let footerHeight = tallestHeight + footer.offsetHeight + 50;
	footer.addEventListener('mouseover',()=>{
		footer.style.height = `${footerHeight}px`;
	});
	footer.addEventListener('mouseleave',()=>{
		footer.style.height = `${initHeight}px`;
	});
}
