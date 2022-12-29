(()=>{var N=!0,H=!0,Y=!1;var F=function(){let t=[],e=!1;function i(){e||(e=!0,window.requestAnimationFrame?window.requestAnimationFrame(a):setTimeout(a,66))}function a(){t.forEach(function(s){s()}),e=!1}return{add:function(s){t.length||window.addEventListener("resize",i),t.push(s)},disable:function(){window.removeEventListener("resize",i)},reEnable:function(){window.addEventListener("resize",i)}}}();function G(t,e,i){let a="#"+t+" {  position: relative;}."+e+"-figure {  background-color: #D5D5D5;  overflow: hidden;  left: 0;  position: absolute;  top: 0;  margin: 0;}."+e+"-figure img {  left: 0;  position: absolute;  top: 0;  height: 100%;  width: 100%;  opacity: 0;  transition: "+(i/1e3).toString(10)+"s ease opacity;  -webkit-transition: "+(i/1e3).toString(10)+"s ease opacity;}."+e+"-figure img."+e+"-thumbnail {  -webkit-filter: blur(30px);  filter: blur(30px);  left: auto;  position: relative;  width: auto;}."+e+"-figure img."+e+"-loaded {  opacity: 1;}",s=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",o.styleSheet?o.styleSheet.cssText=a:o.appendChild(document.createTextNode(a)),s.appendChild(o)}function U(t,e){for(let i in e)e.hasOwnProperty(i)&&(t[i]=e[i])}function Z(t){let e=0;do isNaN(t.offsetTop)||(e+=t.offsetTop),t=t.offsetParent;while(t);return e}function d(t,e){return this.inRAF=!1,this.isTransitioning=!1,this.minAspectRatioRequiresTransition=!1,this.minAspectRatio=null,this.latestYOffset=0,this.lastWindowWidth=window.innerWidth,this.scrollDirection="down",this.visibleImages=[],this.settings={containerId:"pig",scroller:window,classPrefix:"pig",figureTagName:"figure",spaceBetweenImages:8,transitionSpeed:500,primaryImageBufferHeight:1e3,secondaryImageBufferHeight:300,thumbnailSize:20,urlForSize:function(i,a){return"/img/"+a.toString(10)+"/"+i},styleForElement:function(i){return""},onClickHandler:null,getMinAspectRatio:function(i){return i<=640?2:i<=1280?4:i<=1920?5:6},getImageSize:function(i){return i<=640?100:i<=1920?250:500}},U(this.settings,e||{}),this.container=document.getElementById(this.settings.containerId),this.container||console.error("Could not find element with ID "+this.settings.containerId),this.scroller=this.settings.scroller,this.images=this._parseImageData(t),G(this.settings.containerId,this.settings.classPrefix,this.settings.transitionSpeed),this}d.prototype._getTransitionTimeout=function(){return this.settings.transitionSpeed*1.5};d.prototype._getTransitionString=function(){return this.isTransitioning?(this.settings.transitionSpeed/1e3).toString(10)+"s transform ease":"none"};d.prototype._recomputeMinAspectRatio=function(){let t=this.minAspectRatio;this.minAspectRatio=this.settings.getMinAspectRatio(this.lastWindowWidth),t!==null&&t!==this.minAspectRatio?this.minAspectRatioRequiresTransition=!0:this.minAspectRatioRequiresTransition=!1};d.prototype._parseImageData=function(t){let e=[];return t.forEach(function(i,a){let s=new v(i,a,this);e.push(s)}.bind(this)),e};d.prototype._computeLayout=function(){let t=parseInt(this.container.clientWidth,10),e=[],i=0,a=0,s=0;this._recomputeMinAspectRatio(),!this.isTransitioning&&this.minAspectRatioRequiresTransition&&(this.isTransitioning=!0,setTimeout(function(){this.isTransitioning=!1},this._getTransitionTimeout()));let o=this._getTransitionString();[].forEach.call(this.images,function(r,u){if(s+=parseFloat(r.aspectRatio),e.push(r),s>=this.minAspectRatio||u+1===this.images.length){s=Math.max(s,this.minAspectRatio);let f=(t-this.settings.spaceBetweenImages*(e.length-1))/s;e.forEach(function(m){let h=f*m.aspectRatio;m.style={width:parseInt(h,10),height:parseInt(f,10),translateX:i,translateY:a,transition:o},i+=h+this.settings.spaceBetweenImages}.bind(this)),e=[],s=0,a+=parseInt(f,10)+this.settings.spaceBetweenImages,i=0}}.bind(this)),this.totalHeight=a-this.settings.spaceBetweenImages};d.prototype._doLayout=function(){this.container.style.height=this.totalHeight+"px";let t=this.scrollDirection==="up"?this.settings.primaryImageBufferHeight:this.settings.secondaryImageBufferHeight,e=this.scrollDirection==="down"?this.settings.secondaryImageBufferHeight:this.settings.primaryImageBufferHeight,i=Z(this.container),a=this.scroller===window?window.innerHeight:this.scroller.offsetHeight,s=this.latestYOffset-i-t,o=this.latestYOffset-i+a+e;this.images.forEach(function(r){r.style.translateY+r.style.height<s||r.style.translateY>o?r.hide():r.load()}.bind(this))};d.prototype._getOnScroll=function(){let t=this;return function(){let i=t.scroller===window?window.pageYOffset:t.scroller.scrollTop;t.previousYOffset=t.latestYOffset||i,t.latestYOffset=i,t.scrollDirection=t.latestYOffset>t.previousYOffset?"down":"up",t.inRAF||(t.inRAF=!0,window.requestAnimationFrame(function(){t._doLayout(),t.inRAF=!1}))}};d.prototype.enable=function(){this.onScroll=this._getOnScroll(),this.scroller.addEventListener("scroll",this.onScroll),this.onScroll(),this._computeLayout(),this._doLayout();let t=()=>this.scroller===window?window.innerWidth:this.scroller.offsetWidth;return F.add(function(){this.lastWindowWidth=t(),this._computeLayout(),this._doLayout();let e=t();e!==this.lastWindowWidth&&(this.lastWindowWidth=e,this._computeLayout(),this._doLayout())}.bind(this)),this};d.prototype.disable=function(){return this.scroller.removeEventListener("scroll",this.onScroll),F.disable(),this};function v(t,e,i){return this.existsOnPage=!1,this.aspectRatio=t.aspectRatio,this.filename=t.filename,this.index=e,this.pig=i,this.classNames={figure:i.settings.classPrefix+"-figure",thumbnail:i.settings.classPrefix+"-thumbnail",loaded:i.settings.classPrefix+"-loaded"},this}v.prototype.load=function(){this.existsOnPage=!0,this._updateStyles(),this.pig.container.appendChild(this.getElement()),setTimeout(function(){!this.existsOnPage||(this.thumbnail||(this.thumbnail=new Image,this.thumbnail.src=this.pig.settings.urlForSize(this.filename,this.pig.settings.thumbnailSize),this.thumbnail.className=this.classNames.thumbnail,this.thumbnail.onload=function(){this.thumbnail&&(this.thumbnail.className+=" "+this.classNames.loaded)}.bind(this),this.getElement().appendChild(this.thumbnail)),this.fullImage||(this.fullImage=new Image,this.fullImage.src=this.pig.settings.urlForSize(this.filename,this.pig.settings.getImageSize(this.pig.lastWindowWidth)),this.fullImage.onload=function(){this.fullImage&&(this.fullImage.className+=" "+this.classNames.loaded)}.bind(this),this.getElement().appendChild(this.fullImage)))}.bind(this),100)};v.prototype.hide=function(){this.getElement()&&(this.thumbnail&&(this.thumbnail.src="",this.getElement().removeChild(this.thumbnail),delete this.thumbnail),this.fullImage&&(this.fullImage.src="",this.getElement().removeChild(this.fullImage),delete this.fullImage)),this.existsOnPage&&this.pig.container.removeChild(this.getElement()),this.existsOnPage=!1};v.prototype.getElement=function(){if(!this.element){this.element=document.createElement(this.pig.settings.figureTagName),this.element.className=this.classNames.figure;let t=this.pig.settings.styleForElement(this.filename);this.style&&(this.element.style=t),this.pig.settings.onClickHandler!==null&&this.element.addEventListener("click",function(){this.pig.settings.onClickHandler(this.filename)}.bind(this)),this._updateStyles()}return this.element};v.prototype._updateStyles=function(){this.getElement().style.transition=this.style.transition,this.getElement().style.width=this.style.width+"px",this.getElement().style.height=this.style.height+"px",this.getElement().style.transform="translate3d("+this.style.translateX+"px,"+this.style.translateY+"px, 0)"};function W(t,e){var a={touchstart:{x:-1,y:-1},touchmove:{x:-1,y:-1}};a.direction=function(){if(this.touchmove.x==-1)return"";let o=this.touchmove.x-this.touchstart.x;if(Math.abs(o)<50){let r=this.touchmove.y-this.touchstart.y;return Math.abs(r)<50?"":r>0?"down":"up"}return o>0?"right":"left"},a.reset=function(){this.touchstart.x=-1,this.touchstart.y=-1,this.touchmove.x=-1,this.touchmove.y=-1},a.update=function(o,r){this[o.type].x=r.pageX,this[o.type].y=r.pageY};var s=function(o){if(typeof o<"u"&&typeof o.touches<"u"){var r=o.touches[0];switch(o.type){case"touchstart":a.reset(),a.update(o,r);break;case"touchmove":a.update(o,r);break;case"touchend":let u=a.direction();u&&e(u);break;default:break}}};t.addEventListener("touchstart",s,{passive:!0}),t.addEventListener("touchmove",s,{passive:!0}),t.addEventListener("touchend",s,{passive:!0})}var z=function(){},j={init:async function(){let t="gallerydeluxe",e="data-gd-image-data-url",i=document.getElementById(t);if(!i)throw new Error(`No element with id ${t} found.`);let a=i.getAttribute(e);if(!a)throw new Error(`No ${e} attribute found.`);let s,o=document.getElementById("gd-modal"),r=document.getElementById("gd-modal-close"),u=function(n){n.preventDefault()},I=n=>{n&&n.preventDefault(),o.removeEventListener("touchmove",u),o.style.display="none",document.body.style.overflow="auto"};r.addEventListener("click",function(){I()});let f=function(n){switch(z("swipe",n),n){case"left":s=s.next,m();break;case"right":s=s.prev,m();break;default:I();break}};W(o,function(n){f(n)}),document.addEventListener("keydown",function(n){switch(n.key){case"ArrowLeft":f("right");break;case"ArrowRight":f("left");break;case"Escape":I(n);break}});let m=()=>{o.addEventListener("touchmove",u);let n="gd-modal-loaded",l="gd-modal-thumbnail";document.body.style.overflow="hidden";let y=o.querySelectorAll(".gd-modal-content"),T=!1,g=()=>{T||(T=!0,y.forEach(w=>{w.remove()}))};if(s){let w=document.getElementById("gd-modal");if(N){let p=document.getElementById("gd-modal-exif"),_="gd-modal-exif-ontimeout";p.classList.remove(_);let S=p.lastElementChild;for(;S;)p.removeChild(S),S=p.lastElementChild;let R=document.createElement("dl");p.appendChild(R);let k=(x,$)=>{let D=document.createElement("dt");D.innerText=J(x),R.appendChild(D);let B=document.createElement("dd");B.innerText=$,R.appendChild(B)},C=new Date(s.exif.Date);var q=new Date(C.getTime()-C.getTimezoneOffset()*6e4).toISOString().split("T")[0];k("Date",q);let O=s.exif.Tags;for(let x in O)k(x,O[x]);setTimeout(()=>{p.classList.add(_)},1e3)}let c=new Image;c.classList.add("gd-modal-content"),c.width=s.width,c.height=s.height,c.style.aspectRatio=s.width/s.height;let b=c.cloneNode(!1);c.classList.add(l),b.src=s.full,c.src=s[20],c.onload=function(){c&&(w.appendChild(c),g())},b.onload=function(){b&&(w.appendChild(b),b.classList.add(n),c&&c.classList.add(n),g())},w.style.display="block"}setTimeout(function(){g()},1e3)},h=await(await fetch(a)).json();Y?h=h.map(n=>({value:n,sort:Math.random()})).sort((n,l)=>n.sort-l.sort).map(({value:n})=>n):H&&(h=h.reverse());let E=new Map,L=[];for(let n=0;n<h.length;n++){let l=h[n];l.prev=h[(n+h.length-1)%h.length],l.next=h[(n+1)%h.length],L.push({filename:l.name,aspectRatio:l.width/l.height,image:l}),E.set(l.name,l)}var P={onClickHandler:function(n){z("onClickHandler",n),s=E.get(n),s&&m()},containerId:t,classPrefix:"gd",spaceBetweenImages:1,urlForSize:function(n,l){return E.get(n)[l]},styleForElement:function(n){let l=E.get(n);if(!l||l.colors.size<1)return"";let y=l.colors,T=y[0],g="#ccc";return y.length>1&&(g=y[1]),` background: linear-gradient(15deg, ${T}, ${g});`}};new d(L,P).enable()}};function J(t){return t.replace(/([A-Z])/g," $1").replace(/^./,function(e){return e.toUpperCase()})}var M=j;M.init();})();
