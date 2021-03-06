const $menuNav= document.getElementById("menuPalanca"),
      $hamburger=document.querySelector(".hamburger"),
      $reloj_container=document.getElementById("reloj_container"),
      $button_view_reloj=document.getElementById("button-view-reloj"),
      $button_sound_inicia=document.getElementById("button-sound-inicia"),
      palancaMenu=_=>$menuNav.classList.toggle("palanca"),
      hamburgerAnimated=_=>$hamburger.classList.toggle("is-active"),
      mueveReloj=_=>{if(continuar)document.form_reloj.reloj.value=new Date().toLocaleTimeString(),setTimeout("mueveReloj()",1000)},
      play=_=>{if(continuar_play){new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3').play(),setTimeout("play()",1000)}}

let continuar,
    continuar_play

document.addEventListener("click",(e)=>{
  if(e.target.matches(".botonPalanca")||e.target.matches(".hamburger")||e.target.matches(".hamburger-inner")||e.target.matches(".hamburger-box")){
    //Para deter boton palanca cuando se sobre 1024
    if(!document.querySelector('.inRight')){
      palancaMenu(e)
      hamburgerAnimated(e)
      e.stopPropagation()
    }
  }
  if(e.target.matches("#button-view-reloj")){
    continuar=true
    mueveReloj()
    $reloj_container.style.setProperty("display","flex")
    $button_view_reloj.setAttribute("disabled","true")
    e.stopPropagation()
  }
  if(e.target.matches("#button-view-stop")){
    continuar=false
    $reloj_container.style.setProperty("display","none")
    $button_view_reloj.removeAttribute("disabled")
    e.stopPropagation()
  }
  if(e.target.matches("#button-sound-inicia")){
    continuar_play=true
    play()
    $button_sound_inicia.setAttribute("disabled","true")
    e.stopPropagation()
  }
  if(e.target.matches("#button-sound-stop")){
    continuar_play=false
    $button_sound_inicia.removeAttribute("disabled")
    e.stopPropagation()
  }
})
/////////////////////////////////////////////////////////////////////////////////// Evento Teclado
const $controladorPelota =document.getElementById("controladorPelota"),
      $Mapa =document.getElementById("mapa"),
      $pelota=document.getElementById("pelota")

$controladorPelota.addEventListener("keydown",(e)=>{
  let topPelotaNow=parseFloat(window.getComputedStyle($pelota).top.replace('px','')),
      leftPelotaNow=parseFloat(window.getComputedStyle($pelota).left.replace('px','')),
      heightMapa=parseFloat(window.getComputedStyle($Mapa).height.replace('px','')),
      widthMapa=parseFloat(window.getComputedStyle($Mapa).width.replace('px','')),
      peloHeigth=parseFloat(window.getComputedStyle($pelota).height.replace('px','')),
      peloWidth=parseFloat(window.getComputedStyle($pelota).width.replace('px','')),
      sancada=10
  if(e.key==="ArrowUp"&&topPelotaNow>sancada)topPelotaNow-=sancada;
  if(e.key==="ArrowDown"&&topPelotaNow<(heightMapa-peloHeigth-(sancada*2)))topPelotaNow+=sancada;
  $pelota.style.top=topPelotaNow+"px"
  if(e.key==="ArrowLeft"&&leftPelotaNow>sancada)leftPelotaNow-=sancada;
  if(e.key==="ArrowRight"&&leftPelotaNow<(widthMapa-peloWidth-(sancada*2)))leftPelotaNow+=sancada;
  $pelota.style.left=leftPelotaNow+"px"
  $controladorPelota.value = "";
})
$controladorPelota.addEventListener("keyup",(e)=>{
  $controladorPelota.value = "";
})

document.addEventListener("keydown",(e)=>{
  if(e.key==='a'&&e.altKey) alert(`Haz precionado ALt+${e.key}`)
  if(e.key==='p'&&e.altKey) prompt(`Haz precionado ALt+${e.key}`)
  if(e.key==='c'&&e.altKey) confirm(`Haz precionado ALt+${e.key}`)
})
/////////////////////////////////////////////////////////////////////////////////// SUma resta fecha
const countDown=(fecha=undefined)=>{
  
  let hoyMenosFecha= new Date().getTime()-fecha.getTime(),//es para convertir las fechas a milisegundos
      absR=Math.abs(hoyMenosFecha),
      arrayDiv=[31536000000, 2592000000, 86400000, 3600000, 60000, 1000],
      arrayF=[],
      arrayR=[]
  arrayF.push(Math.floor(absR/1000))
  arrayDiv.forEach(e=>{
      arrayF.push(Math.floor(absR/e));
      let rValue=(absR%e);
      arrayR.push(rValue);
      absR=rValue;
    })
  arrayF.push(Math.floor(arrayR[1]/604800000))//agregar las semanas
  arrayF.unshift(hoyMenosFecha)//si es - faltan a??os si es + pasaron
  return (arrayF)
  //return [bruto, enSegundos, a??os, meses, dias, horas, minutos, segundos, semanas]
}

const $countDownContainer = document.getElementById("relojCountDown"),
      $inputFechaCountDown=document.getElementById("fechaCountDown"),
      $btnPlayCountDown=document.getElementById("countDownPlay")
      fStopCD=_=>{
        clearInterval(controlCountDown);
        $countDownContainer.innerHTML=null
        $btnPlayCountDown.disabled=false;
        $inputFechaCountDown.disabled=false;
      },
      printHTML=(e=>{if(Math.sign(e[0])===-1){
        return `<h3>Faltan: ${e[2]}A/${e[3]}M/${e[8]}S/${e[4]}D ${e[5]}h:${e[6]}m:${e[7]}s</h3>`}
        else {return `<h3>Han pasado: ${e[2]}A/${e[3]}M/${e[8]}S/${e[4]}D ${e[5]}h:${e[6]}m:${e[7]}s</h3>`}})
        
let controlCountDown;

document.addEventListener("click", (e)=>{
  if(e.target.matches("#countDownPlay")){
    let $fecha=new Date($inputFechaCountDown.value)
    if($fecha===undefined||$fecha===NaN||$fecha.toDateString()==='Invalid Date'){ 
        alert(`No ingresaste la fecha`)
    } else {
        controlCountDown= setInterval(() => {
          eCD=countDown($fecha)
          $countDownContainer.innerHTML=printHTML(eCD)
          if(eCD[1]===0) alert(`Termino`), fStopCD(); 
        }, 1000);
        e.target.disabled= true;
        $inputFechaCountDown.disabled=true;
    }
  }
  if(e.target.matches("#countDownStop")){
    fStopCD()
  }
})
/////////////////////////////////////////////////////////////////////////////////// Top Scroll
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})
document.addEventListener("click",(e)=>{
  if(e.target.matches(".to-top")||e.target.matches(".fa-chevron-up")){
    // esto e spara validar menu chiquitito
    if(window.innerWidth<1024){
      $menuNav.classList.add("palanca")//esconde menu
      $hamburger.classList.remove("is-active")//muestra hanburgesa menu
    }
  }
})
/////////////////////////////////////////////////////////////////////////////////// Dark Mode
let lsDarkMode=localStorage.getItem('dark-mode')
const $dark_mode = document.getElementById("dark-mode-container"),
      darkModeActive=_=>{
        $dark_mode.innerHTML=`<button id="dark-mode-active" class="dark-mode-btn">????</button>`
        document.documentElement.style.setProperty('--first-color','#323330')
        document.documentElement.style.setProperty('--second-color','240,219,79')
        document.documentElement.style.setProperty('--b-B-Color','#616061')
        localStorage.setItem('dark-mode',true)
      },
      darkModeDesActive=_=>{
        $dark_mode.innerHTML=`<button id="dark-mode" class="dark-mode-btn">????</button>`
        document.documentElement.style.setProperty('--first-color','#f0db4f')
        document.documentElement.style.setProperty('--second-color','50,51,48')
        document.documentElement.style.setProperty('--b-B-Color','white')
        localStorage.removeItem('dark-mode')
      },
      inLocalStorageDarkMode=_=>{
        if(lsDarkMode) darkModeActive()
      }
window.onload=inLocalStorageDarkMode()
document.addEventListener("click",(e)=>{
  if(e.target.matches("#dark-mode")){
    darkModeActive()
  }
  if(e.target.matches("#dark-mode-active")){
    darkModeDesActive()
  }
})
/////////////////////////////////////////////////////////////////////////////////// responsible responsing designe
const $contendorYM = document.getElementById("containerYM"),
  $html640 = `<a href="https://www.youtube.com/watch?v=rqZevBiJRN8&list=RDMM&start_radio=1&rv=dQw4w9WgXcQ">Ver video</a>
                <a href="https://goo.gl/maps/eB2cKokwdp75GVu7A">Ver Mapa</a>`,
  $htmlOther = `<iframe width="580" height="326" src="https://www.youtube.com/watch?v=nfy3EGXnP98&list=RDMM&index=7" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.264447109022!2d-73.40895145990422!3d-50.943108142288374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbda51b0183dbaf07%3A0xbd9f2657451ace58!2sParque%20Nacional%20Torres%20del%20Paine!5e0!3m2!1ses!2scl!4v1600957662309!5m2!1ses!2scl" width="580" height="326" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`;
function rRDjs(){
  let widthSize=window.matchMedia("(max-width: 640px)")
  if(widthSize.matches){
    $contendorYM.innerHTML=$html640
    localStorage.setItem('Psize640',true)
  } else{
    $contendorYM.innerHTML=$htmlOther
    localStorage.setItem('Psize640',false)
  }
}
document.addEventListener("DOMContentLoaded",rRDjs);
window.addEventListener("resize",()=>{
  let wsize=window.innerWidth<640,
      Psize= localStorage.getItem('Psize640')==='false'
  if(wsize && Psize) rRDjs()
  if(!wsize && !Psize) rRDjs()
});
/////////////////////////////////////////////////////////////////////////////////// Section 5 Responsive Tester
const $url=document.getElementById('v-url'),
      $alto=document.getElementById('v-alto'),
      $ancho=document.getElementById('v-ancho'),
      $form=document.getElementById('form'),
      $btnCerrar=document.getElementById('ceVent'),
      vaForm=(e)=>{
        if(e===""||e===undefined||e===NaN) return false,console.log('vacio')
        if(typeof e ==='string'&&(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ig.test(e))) return true
        if(typeof e==='number' &&(/^[0-9]{1,4}$/g.test(e))) return true
        return false
      }
      let ventana;
$form.addEventListener('submit',(e)=>{
  if(vaForm($url.value)&&vaForm(parseInt($alto.value))&&vaForm(parseInt($ancho.value))){
      ventana=window.open($url.value,'',`width=${$ancho}`,`height=${$alto}`)
      e.preventDefault()
    } else {
      alert(`revisar los parametros de url, altura y ancho`)
      e.preventDefault()
    }
    e.preventDefault()
})
$btnCerrar.addEventListener("click",e=>{
  ventana.close()
  $url.value=""
  $alto.value=""
  $ancho.value=""
})
/////////////////////////////////////////////////////////////////////////////////// Section 6 Deteccion de dispositivos (User Agent)
const $idDiv=document.getElementById('user-device')
document.addEventListener("DOMContentLoaded",(e)=>{
  isMobile={
    android:()=>navigator.userAgent.match(/android/i),
    ios:()=>navigator.userAgent.match(/iphone|ipad|ipod/i),
    windows:()=>navigator.userAgent.match(/windows phone/i),
    any:function(){
      return this.android()||this.ios()||this.windows();
    }
  },
  isDesktop={
    linux:()=>navigator.userAgent.match(/linux/i),
    mac:()=>navigator.userAgent.match(/mac os/i),
    windows:()=>navigator.userAgent.match(/windows nt/i),
    any:function(){
      return this.linux()||this.mac()||this.windows();
    }
  },
  isBrowser={
    chrome:()=>navigator.userAgent.match(/chrome/i),
    safarai:()=>navigator.userAgent.match(/safarai/i),
    firefox:()=>navigator.userAgent.match(/firefox/i),
    opera:()=>navigator.userAgent.match(/opera|opera mini/i),
    ie:()=>navigator.userAgent.match(/msie|iemobile/i),
    edge:()=>navigator.userAgent.match(/edge/i),
    any:function(){
      return(
        this.ie()||
        this.edge()||
        this.chrome()||
        this.safarai()||
        this.firefox()||
        this.opera()
      );
    }
  }
  $idDiv.innerHTML=`
  <ul>
      <li>User agent: <b>${navigator.userAgent}</b></li>
      <li>Plataforma: <b>${isMobile.any()? isMobile.any():isDesktop.any()}</b></li>
      <li>Navegador: <b>${isBrowser.any()}</b></li>
  </ul>
  `;
//Contenido exclusivo
  if(isBrowser.chrome()){
    $idDiv.innerHTML+=`<p>Este contenido es exclusivo Chrome</p>`
  }
  if(isBrowser.firefox()){
    $idDiv.innerHTML+=`<p>Este contenido es exclusivo Firefox</p>`
  }
//redireccionando
  if(isMobile.android()){
    let option = confirm(`Estas desde Android, quieres abrir el github`)
    if(option)window.location.href='https://github.com/Stev-189/Ejercicio_DOM'
  }
})

/////////////////////////////////////////////////////////////////////////////////// Status Conexion
///https://www.youtube.com/watch?v=hIaGzJ3txqM //https://www.freecodecamp.org/news/how-to-check-internet-connection-status-with-javascript/
const $sCon=document.getElementById('sConexion')
//funcion para enviar info a HTML
const toHTMLRed=((e, c, str)=>{
  e.classList.remove()
  e.innerHTML=`<h3>Conexion ${str}</h3>`;
  e.classList.add(c);
  setTimeout(() => {
    e.classList.remove(c)
    e.innerHTML=``;
  }, 2000);
})

//funcion asincrona de espera des respuesta confirmando conexion
const checkOnlineStatus = async () => {
  try {
    let online = await fetch("https://randomuser.me/api/");//se solicta una respuetsa a una busqueda
    return online.status >= 200 && online.status < 300;//200 a 299 estatus conexion
  } catch (err) {
    return false; 
  }
};
//verifica el estatus de la red
const inRed =async (e)=>{
  let online =await checkOnlineStatus();
  if(online)toHTMLRed(e,'inConextion','establecida');
  if(!online)toHTMLRed(e,'offConexion','perdida');
}
// para verificar correctamente el status de connecion de internet es necesario verificar un fetch a un requerimiento
//pero no lo puede hacer funcionar ademas que las funciones deben ser llmadas por asincronas
//window.addEventListener("load", inRed($sCon))
//window.addEventListener("offline", inRed($sCon))
//window.addEventListener("online", inRed($sCon))
//sino funciona la anerior simplemente ocupar window add event listenner

window.addEventListener("load", (e) => {
  navigator.onLine?toHTMLRed($sCon,'inConextion','establecida'):toHTMLRed($sCon,'offConexion','perdida')
});
window.addEventListener("offline", (e) => {
  navigator.onLine?toHTMLRed($sCon,'inConextion','establecida'):toHTMLRed($sCon,'offConexion','perdida')
});
window.addEventListener("online", (e) => {
  navigator.onLine?toHTMLRed($sCon,'inConextion','establecida'):toHTMLRed($sCon,'offConexion','perdida')
});
///////////////////////////////////////////////////////////////////////////////////Section 7 Deteccion de dispositivo (Camara)
let statusV=false//control del estado del video
  const capVideo=async(e,$btn,$cV,$btnS)=>{
    let stream,
        cVideo=document.querySelector($cV)
    if(!statusV){
      if(e.target.matches($btn)){
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                          audio: true,
                          video: true
                        })
            cVideo.srcObject = stream
            statusV=true
            cVideo.removeAttribute('hidden')
            } catch (error) {
            alert(`NO SE PUEDE REALIZAR CONEXION A DISPOSITIVO
${error.name} `)
            /* track.error(error) */
            }
      }
    }
    if(e.target.matches($btnS)){
      if(statusV){
        let tracks = cVideo.srcObject.getTracks();
        tracks.forEach(q=>q.stop());
        cVideo.srcObject = null;
        cVideo.setAttribute('hidden','true')
        statusV=false
      }
    }
  } 

document.addEventListener('click',e=>capVideo(e,'#initVid','#vContainer','#stopVid'))
///////////////////////////////////////////////////////////////////////////////////Section 8 Geoposicionamiento
let geoTHTML
 function loadLocation (e) {
   geoTHTML=e
 navigator.geolocation.getCurrentPosition(viewMap,ViewError,{timeout:5000,enableHighAccuracy:true});//,maximumAge:0
}

function viewMap (pos) {
  const $conGeo=document.getElementById(geoTHTML)
	let lon = pos.coords.longitude,	//guardamos la longitud
      lat = pos.coords.latitude,		//guardamos la latitud
      pre = pos.coords.accuracy
  let link = "http://maps.google.com/?ll="+lat+","+lon+"&z=16";
  if(!document.getElementById(`${geoTHTML}Div`)){
    $conGeo.insertAdjacentHTML('afterend',
     `<div id=${geoTHTML}Div>
        <label>Longitud: ${lon}</label>
        <label>Latitud: ${lat}</label>
        <label>Precision: ${pre}m</label>
        <a href="${link}" target="_blank" rel="noopener">Enlace al mapa</a>
      </div>`
    )
  setTimeout(() => {
    if(document.getElementById(`${geoTHTML}Div`)){
      let nodoPadre = document.getElementById(`${geoTHTML}Div`).parentNode;
		  nodoPadre.removeChild(document.getElementById(`${geoTHTML}Div`));
    }
  }, 10000);
  }
}

function ViewError(err){alert(err)}	

document.addEventListener('click',e=>{
  if(e.target.matches('#btnGeo'))loadLocation('btnGeo')
})
///////////////////////////////////////////////////////////////////////////////////Section 9 Buscar
let arrayApi=['Tech','Animals','People','Arch','Nature','Animals','People','Arch','Nature'],
   $intBuscar=document,
   comp=false,
   $contDiv

const addElement=(e,arr)=>{
  let container=document.getElementById(e)
  arr.forEach((e,n)=>{ let {titulo, link}=e
    container.insertAdjacentHTML('beforeend',
      ` <figure class="card ${titulo.toLocaleLowerCase()}">
          <img src="${link}" alt="${titulo}">
          <figcaption>${titulo}</figcaption>
        </figure>` 
    )})}

function simularApi(e){
  if(!document.getElementById(`${e}Div`)){
    let rAApi=[]
    const $conEl=document.getElementById(e)
    arrayApi.forEach(e=>rAApi.push({titulo:e,link:`https://placeimg.com/200/200/${e.toLocaleLowerCase()}`}))
    $conEl.insertAdjacentHTML('afterend',`<div id=${e}Div></div>`)
    $conEl.insertAdjacentHTML('afterend',`<input type="text" id=${e}Input placeholder='Ingrese elemento a buscar' >`)
    comp=`${e}Input`
    $intBuscar=document.getElementById(`${e}Input`)
    $contDiv=document.getElementById(`${e}Div`)
    addElement(`${e}Div`,rAApi)
  }}
  
$intBuscar.addEventListener("keyup",(e)=>{
  if(e.key==='Escape') e.target.value=''
  if(comp===e.target.id){
    let $class=$contDiv.querySelectorAll('.card'),
        regex=RegExp(e.target.value,'i')
    if(e.target.value.length===0){
      $class.forEach(e=>e.classList.remove('fHidden'))
    } else{
      $class.forEach(e=>regex.test(e.classList[1])
        ?e.classList.remove('fHidden')
        :e.classList.add('fHidden'))
    }}})

document.addEventListener('click',e=>{
  if(e.target.matches('#btnIFiltro'))simularApi(e.target.id)
})
///////////////////////////////////////////////////////////////////////////////////Section 10 Random win
const arrSort=[],
      clearIATSF=e=>document.getElementById(e).value='',
      clearArrSort=_=>arrSort.splice(0,arrSort.length),
      aLiSorteo=(ul,v)=>document.getElementById(ul).insertAdjacentHTML('beforeend',`<li>${v}</li>`),
      anyToLiSort=(ul,m)=>document.getElementById(ul).innerHTML=m;

function reinSorteo(e,ul){
  clearIATSF(e)
  clearArrSort()
  anyToLiSort(ul,``)
}

function vStringATSF(e){
    if(!e) return {check:false, message:`El campo esta vacio`};
    if(typeof e!=='string') return {check:false, message:`No es un texto`};
    return {check:true, message:`ok`};
  }

function addToSorteoF(e,ul){
  let $intSValue=document.getElementById(e).value,
      {check,message}=vStringATSF($intSValue);
  if(check){
    arrSort.push($intSValue);
    aLiSorteo(ul,$intSValue)
    clearIATSF(e);
  } else {alert(message)}
}

const sSorteando=(ul)=>{
  let result = arrSort[Math.round(Math.random()*(arrSort.length-1))]
  anyToLiSort(ul,`<h3>El ganador es: ${result}</h3>`)
  return result;
}

function winSorteo(e,ul){
  if(arrSort.length!==0){
    let r= sSorteando(ul)
    setTimeout(() => {
      let rCon=confirm(`El resultado fue ${r}\n??Sortear nuevamente?`)
      if(rCon){winSorteo(e,ul)} else {reinSorteo(e,ul)}
    }, 5000);
  } else {alert(`No hay elemntos para participar en le sorteo`)}
}

document.addEventListener('click',e=>{
  if(e.target.matches('#btnAddToSorteo'))addToSorteoF('inputTSorteo','ilContSort')
  if(e.target.matches('#btnReiniciarSorteo'))reinSorteo('inputTSorteo','ilContSort')
  if(e.target.matches('#btnWinSorteo'))winSorteo('inputTSorteo','ilContSort')
})
///////////////////////////////////////////////////////////////////////////////////Section 11 Slider
function ordSlider(nowNumber,sUlt){
  if(sUlt+1===1) return[nowNumber,nowNumber,nowNumber];
  if(nowNumber===sUlt)return[nowNumber-1,nowNumber,0];
  if(nowNumber===0)return[sUlt,nowNumber,nowNumber+1];
  else return[nowNumber-1,nowNumber,nowNumber+1];
}

function sliderArr(arr,sUlt,idbtn){
  let nArr=[], pArr, arrObj=[]
  arr.forEach(e=>nArr.push(`slide${e}`))// nombre dle id de los img
  if(idbtn==='btnRight'){
    pArr=ordSlider(arr[2],sUlt)
    nArr.push(`slide${pArr[2]}`)// nombre dle id de los img
    arrObj=[
      {n:nArr[0], r:'sliderLeft',a:'sliderNone'},//importante los nombres de ubicaciones d elso slider
      {n:nArr[1], r:'sliderView',a:'sliderLeft'},
      {n:nArr[2], r:'sliderRight',a:'sliderView'},
      {n:nArr[3], r:'sliderNone',a:'sliderRight'}
    ]}
  if(idbtn==='btnLeft'){
    pArr=ordSlider(arr[0],sUlt)
    nArr.unshift(`slide${pArr[0]}`)// nombre dle id de los img
    arrObj=[
      {n:nArr[0], r:'sliderNone',a:'sliderLeft'},
      {n:nArr[1], r:'sliderLeft',a:'sliderView'},
      {n:nArr[2], r:'sliderView',a:'sliderRight'},
      {n:nArr[3], r:'sliderRight',a:'sliderNone'}
    ]}
    arrObj.forEach(e=>{
      document.querySelector(`#${e.n}`).classList.remove(e.r)
      document.querySelector(`#${e.n}`).classList.add(e.a)
    })
}

function slideActual(slider,view,idbtn){
  let $slider=document.querySelectorAll(slider),
      sUlt=$slider.length-1,
      nowNumber='',
      arr
  $slider.forEach(e=>{if(e.classList[1]===view)nowNumber=parseInt(e.id.charAt(5),10)})
  arr=ordSlider(nowNumber,sUlt)
  sliderArr(arr,sUlt,idbtn)
}

setInterval(() => {
  slideActual('.slider','sliderView','btnRight')
}, 5000);

document.addEventListener('click',e=>{
if(e.target.matches('#btnRight')||e.target.matches('#btnLeft')){slideActual('.slider','sliderView',e.target.id)}
})
/////////////////////////////////////////////////////////////////////////////////// Spyscroll

function verPantalla(){
  let widthSize=window.matchMedia("(min-width: 1024px)")
  if(widthSize.matches){
    document.querySelector(`#menuPalanca`).classList.add("inRight")
    document.querySelector(`#menuPalanca`).classList.remove("palanca")
    document.querySelector(`#botonPalancaContainer`).classList.add("btnHidden")
    document.querySelector(`.to-top`).classList.add("to-topInLeft")
    localStorage.setItem('Psize1024',true)
  } else{
    document.querySelector(`#menuPalanca`).classList.remove("inRight")
    document.querySelector(`#menuPalanca`).classList.add("palanca")
    document.querySelector(`#botonPalancaContainer`).classList.remove("btnHidden")
    document.querySelector(`.to-top`).classList.remove("to-topInLeft")
    document.querySelector(`.hamburger`).classList.remove("is-active")
    localStorage.setItem('Psize1024',false)
  }
}

function enMenuPosition(e){
  let wsize=window.innerWidth>1024,
    Psize= localStorage.getItem('Psize1024')===e
  if(wsize && Psize) verPantalla()
  if(!wsize && !Psize) verPantalla()
}

document.addEventListener("DOMContentLoaded", enMenuPosition('true'))

window.addEventListener("resize",()=>{
  let wsize=window.innerWidth>1024,
    Psize= localStorage.getItem('Psize1024')==='false'
if(wsize && Psize) verPantalla()
if(!wsize && !Psize) verPantalla()
});

document.addEventListener("DOMContentLoaded", () => {
 (function scrollSpy() {
  const targets = document.querySelectorAll(".section"),
   options = {
    threshold: 0.5
   };
  if ("IntersectionObserver" in window) {
   (() => {
    const inView = target => {
     const interSecObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
       const elem = entry.target;
       let currentNav = document.querySelector(`a[href='#${elem.id}']`);
       entry.isIntersecting
        ? currentNav.classList.add("inViewNav")
        : currentNav.classList.remove("inViewNav");
      });
     }, options);
     interSecObs.observe(target);
    };
    targets.forEach(inView);
   })();
  }
 })();
});

///////////////////////////////////////////////////////////////////////////////////Section 12 Smart Video
const $video =  document.getElementById('myVideo'),options = {threshold: 1}
function callback(entries,observe){
  if(entries[0].isIntersecting){$video.play()}
  else {$video.pause()}
}
const observer=new IntersectionObserver(callback,options)// se ingresa un call back y las opciones
observer.observe($video)

document.addEventListener("visibilitychange", ()=> {
  if (document.visibilityState === 'visible') {
    $video.play();
  } else {
    $video.pause();
  }
});
///////////////////////////////////////////////////////////////////////////////////Section 13 form
document.addEventListener('submit', (e)=>{
  if(e.target.matches('#contactoForm'))
  e.preventDefault()
})
const fValidar=(e)=>{
  let $cMensaje=document.getElementById(`${e.target.id}Div`),
      $elemento=document.getElementById(e.target.id),
      isValido=e.target.validity.valid,
      mensaje=e.target.title,
      textInput=e.target.value
  if(e.target.id==='aContacto')(textInput.length>=5 && textInput.length<=255)? isValido=true: isValido=false;
  console.log(isValido,textInput,textInput.length)
  if(isValido){
    $cMensaje.innerHTML=``
    $elemento.classList.add('bValid')
    $elemento.classList.remove('nValid')
    
  } else {
    $cMensaje.innerHTML=`<h6 class="smallMsj">${mensaje}</h6>`
    $elemento.classList.add('nValid')
    $elemento.classList.remove('bValid')
    // remueve classe hidden 
  }
}

document.addEventListener('keyup',(e)=>{
  if(e.target.matches('.inputContacto')) fValidar(e)
})
///////////////////////////////////////////////////////////////////////////////////Section 13 Narrador
function speechReader(){
  const $speechSelect = document.getElementById("speech-select"),
        $speechTexarea=document.getElementById("speech-text"),
        $speechBtn=document.getElementById("speech-btn"),
        speechMessage = new SpeechSynthesisUtterance();//nos permite interactiar con las voces del sistema operativo
  //console.log(speechMessage)
  let voices=[];
  document.addEventListener("DOMContentLoaded",e=>{
    //window.speechSynthesis.getVoices();//no se puede ejecutar llaque las voces de deven lamamar individualemnte como evento
    window.speechSynthesis.addEventListener("voiceschanged",e=>{
      voices=window.speechSynthesis.getVoices()//cargamos las array d evicess detectadas a voice
      //console.log(voices)// las 22 voces
      voices.forEach(voice=>{
        const $option=document.createElement("option");
        $option.value=voice.name;
        $option.textContent=`${voice.name} - ${voice.lang}`;
        $speechSelect.appendChild($option)
      })
    })
  })
  document.addEventListener("change",e=>{
    if(e.target===$speechSelect){
      speechMessage.voice=voices.find(voice=>voice.name===e.target.value)//asignamos la voz la voz que tenga como name el select

    }
  })
  document.addEventListener("click",e=>{
    if(e.target===$speechBtn){
      speechMessage.text=$speechTexarea.value;
      window.speechSynthesis.speak(speechMessage);
    }
  })
}
speechReader()