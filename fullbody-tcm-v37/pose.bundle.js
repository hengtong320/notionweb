(()=>{var Mn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},hn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ou=0,Ol=1,au=2;var Fl=1,lu=2,Fn=3,yn=0,Wt=1,jt=2,ei=0,Pi=1,Bl=2,kl=3,zl=4,cu=5,pi=100,hu=101,uu=102,du=103,fu=104,pu=200,mu=201,gu=202,_u=203,yo=204,vo=205,xu=206,yu=207,vu=208,bu=209,Mu=210,Su=211,Tu=212,Eu=213,wu=214,zo=0,Ho=1,Vo=2,Li=3,Go=4,Wo=5,Xo=6,qo=7,Hl=0,Au=1,Ru=2,ti=0,Cu=1,Iu=2,Pu=3,Yo=4,Lu=5,Du=6,Nu=7,El="attached",Uu="detached",Vl=300,zi=301,Hi=302,Zo=303,Ko=304,Dr=306,mi=1e3,An=1001,ms=1002,Lt=1003,$o=1004;var Vi=1005;var Gt=1006,Is=1007;var Sn=1008;var Tn=1009,Gl=1010,Wl=1011,Ps=1012,Jo=1013,vi=1014,un=1015,Ls=1016,jo=1017,Qo=1018,Ds=1020,Xl=35902,ql=35899,Yl=1021,Zl=1022,rn=1023,gs=1026,Ns=1027,ea=1028,ta=1029,Kl=1030,na=1031;var ia=1033,Nr=33776,Ur=33777,Or=33778,Fr=33779,sa=35840,ra=35841,oa=35842,aa=35843,la=36196,ca=37492,ha=37496,ua=37808,da=37809,fa=37810,pa=37811,ma=37812,ga=37813,_a=37814,xa=37815,ya=37816,va=37817,ba=37818,Ma=37819,Sa=37820,Ta=37821,Ea=36492,wa=36494,Aa=36495,Ra=36283,Ca=36284,Ia=36285,Pa=36286;var Di=2300,Ni=2301,xo=2302,wl=2400,Al=2401,Rl=2402,Ou=2500;var $l=0,Br=1,Us=2,Fu=3200,Bu=3201;var Jl=0,ku=1,ni="",gt="srgb",Dt="srgb-linear",or="linear",Je="srgb";var Ii=7680;var Cl=519,zu=512,Hu=513,Vu=514,jl=515,Gu=516,Wu=517,Xu=518,qu=519,bo=35044;var Ql="300 es",_n=2e3,ar=2001;var Cn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sh=1234567,sr=Math.PI/180,Ui=180/Math.PI;function xn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function ze(i,e,t){return Math.max(e,Math.min(t,i))}function ec(i,e){return(i%e+e)%e}function Jd(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function jd(i,e,t){return i!==e?(t-i)/(e-i):0}function rr(i,e,t){return(1-t)*i+t*e}function Qd(i,e,t,n){return rr(i,e,1-Math.exp(-t*n))}function ef(i,e=1){return e-Math.abs(ec(i,e*2)-e)}function tf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function nf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function sf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function rf(i,e){return i+Math.random()*(e-i)}function of(i){return i*(.5-Math.random())}function af(i){i!==void 0&&(Sh=i);let e=Sh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lf(i){return i*sr}function cf(i){return i*Ui}function hf(i){return(i&i-1)===0&&i!==0}function uf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function df(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ff(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*h,c*d,a*l);break;case"YZY":i.set(c*d,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*d,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function gn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $e(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var It={DEG2RAD:sr,RAD2DEG:Ui,generateUUID:xn,clamp:ze,euclideanModulo:ec,mapLinear:Jd,inverseLerp:jd,lerp:rr,damp:Qd,pingpong:ef,smoothstep:tf,smootherstep:nf,randInt:sf,randFloat:rf,randFloatSpread:of,seededRandom:af,degToRad:lf,radToDeg:cf,isPowerOfTwo:hf,ceilPowerOfTwo:uf,floorPowerOfTwo:df,setQuaternionFromProperEuler:ff,normalize:$e,denormalize:gn},Ae=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Nt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==d||l!==p||u!==g){let m=1-a,f=c*d+l*p+u*g+h*_,E=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){let R=Math.sqrt(S),w=Math.atan2(R,f*E);m=Math.sin(m*w)/R,a=Math.sin(a*w)/R}let v=a*E;if(c=c*m+d*v,l=l*m+p*v,u=u*m+g*v,h=h*m+_*v,m===1-a){let R=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=R,l*=R,u*=R,h*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*p-l*d,e[t+1]=c*g+u*d+l*h-a*p,e[t+2]=l*g+u*p+a*d-c*h,e[t+3]=u*g-a*h-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h+d*p*g;break;case"YZX":this._x=d*u*h+l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h-d*p*g;break;case"XZY":this._x=d*u*h-l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>h){let p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>h){let p=2*Math.sqrt(1+a-n-h);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Th.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Th.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ja.copy(this).projectOnVector(e),this.sub(Ja)}reflect(e){return this.sub(Ja.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ja=new C,Th=new Nt,Ue=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],E=s[1],S=s[4],v=s[7],R=s[2],w=s[5],I=s[8];return r[0]=o*_+a*E+c*R,r[3]=o*m+a*S+c*w,r[6]=o*f+a*v+c*I,r[1]=l*_+u*E+h*R,r[4]=l*m+u*S+h*w,r[7]=l*f+u*v+h*I,r[2]=d*_+p*E+g*R,r[5]=d*m+p*S+g*w,r[8]=d*f+p*v+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,d=a*c-u*r,p=l*r-o*c,g=t*h+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=h*_,e[1]=(s*l-u*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ja.makeScale(e,t)),this}rotate(e){return this.premultiply(ja.makeRotation(-e)),this}translate(e,t){return this.premultiply(ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ja=new Ue;function tc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function _s(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Yu(){let i=_s("canvas");return i.style.display="block",i}var Eh={};function xs(i){i in Eh||(Eh[i]=!0,console.warn(i))}function Zu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var wh=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ah=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pf(){let i={enabled:!0,workingColorSpace:Dt,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Je&&(s.r=Zn(s.r),s.g=Zn(s.g),s.b=Zn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Je&&(s.r=ps(s.r),s.g=ps(s.g),s.b=ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ni?or:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Dt]:{primaries:e,whitePoint:n,transfer:or,toXYZ:wh,fromXYZ:Ah,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gt},outputColorSpaceConfig:{drawingBufferColorSpace:gt}},[gt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:wh,fromXYZ:Ah,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gt}}}),i}var We=pf();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var es,Mo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{es===void 0&&(es=_s("canvas")),es.width=e.width,es.height=e.height;let s=es.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=es}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=_s("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Zn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zn(t[n]/255)*255):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},mf=0,ys=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=xn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Qa(s[o].image)):r.push(Qa(s[o]))}else r=Qa(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Qa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Mo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var gf=0,el=new C,Rt=class i extends Cn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=An,s=An,r=Gt,o=Sn,a=rn,c=Tn,l=i.DEFAULT_ANISOTROPY,u=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=xn(),this.name="",this.source=new ys(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(el).x}get height(){return this.source.getSize(el).y}get depth(){return this.source.getSize(el).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Vl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mi:e.x=e.x-Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case ms:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mi:e.y=e.y-Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case ms:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Vl;Rt.DEFAULT_ANISOTROPY=1;var Ye=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,v=(p+1)/2,R=(f+1)/2,w=(u+d)/4,I=(h+_)/4,N=(g+m)/4;return S>v&&S>R?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=w/n,r=I/n):v>R?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=N/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=I/r,s=N/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(h-_)/E,this.z=(d-u)/E,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},So=class extends Cn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ye(0,0,e,t),this.scissorTest=!1,this.viewport=new Ye(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Rt(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ys(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends So{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},lr=class extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var To=class extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ct=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,fn):fn.fromBufferAttribute(r,o),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)),qr.applyMatrix4(e.matrixWorld),this.union(qr)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($s),Yr.subVectors(this.max,$s),ts.subVectors(e.a,$s),ns.subVectors(e.b,$s),is.subVectors(e.c,$s),ai.subVectors(ns,ts),li.subVectors(is,ns),wi.subVectors(ts,is);let t=[0,-ai.z,ai.y,0,-li.z,li.y,0,-wi.z,wi.y,ai.z,0,-ai.x,li.z,0,-li.x,wi.z,0,-wi.x,-ai.y,ai.x,0,-li.y,li.x,0,-wi.y,wi.x,0];return!tl(t,ts,ns,is,Yr)||(t=[1,0,0,0,1,0,0,0,1],!tl(t,ts,ns,is,Yr))?!1:(Zr.crossVectors(ai,li),t=[Zr.x,Zr.y,Zr.z],tl(t,ts,ns,is,Yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Vn=[new C,new C,new C,new C,new C,new C,new C,new C],fn=new C,qr=new Ct,ts=new C,ns=new C,is=new C,ai=new C,li=new C,wi=new C,$s=new C,Yr=new C,Zr=new C,Ai=new C;function tl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ai.fromArray(i,r);let a=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),c=e.dot(Ai),l=t.dot(Ai),u=n.dot(Ai);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var _f=new Ct,Js=new C,nl=new C,Zt=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):_f.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);let t=Js.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Js,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(nl)),this.expandByPoint(Js.copy(e.center).sub(nl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Gn=new C,il=new C,Kr=new C,ci=new C,sl=new C,$r=new C,rl=new C,Kn=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){il.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(il);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Kr),a=ci.dot(this.direction),c=-ci.dot(Kr),l=ci.lengthSq(),u=Math.abs(1-o*o),h,d,p,g;if(u>0)if(h=o*c-a,d=o*a-c,g=r*u,h>=0)if(d>=-g)if(d<=g){let _=1/u;h*=_,d*=_,p=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(il).addScaledVector(Kr,d),p}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);let n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,s,r){sl.subVectors(t,e),$r.subVectors(n,e),rl.crossVectors(sl,$r);let o=this.direction.dot(rl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,e);let c=a*this.direction.dot($r.crossVectors(ci,$r));if(c<0)return null;let l=a*this.direction.dot(sl.cross(ci));if(l<0||c+l>o)return null;let u=-a*ci.dot(rl);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fe=class i{constructor(e,t,n,s,r,o,a,c,l,u,h,d,p,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,d,p,g,_,m)}set(e,t,n,s,r,o,a,c,l,u,h,d,p,g,_,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ss.setFromMatrixColumn(e,0).length(),r=1/ss.setFromMatrixColumn(e,1).length(),o=1/ss.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=o*u,p=o*h,g=a*u,_=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*u,p=c*h,g=l*u,_=l*h;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*u,p=c*h,g=l*u,_=l*h;t[0]=d-_*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*u,p=o*h,g=a*u,_=a*h;t[0]=c*u,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*h,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-d*h,t[8]=g*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*h+g,t[10]=d-_*h}else if(e.order==="XZY"){let d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+_,t[5]=o*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xf,e,yf)}lookAt(e,t,n){let s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),hi.crossVectors(n,nn),hi.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),hi.crossVectors(n,nn)),hi.normalize(),Jr.crossVectors(nn,hi),s[0]=hi.x,s[4]=Jr.x,s[8]=nn.x,s[1]=hi.y,s[5]=Jr.y,s[9]=nn.y,s[2]=hi.z,s[6]=Jr.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],E=n[3],S=n[7],v=n[11],R=n[15],w=s[0],I=s[4],N=s[8],M=s[12],b=s[1],P=s[5],F=s[9],z=s[13],G=s[2],q=s[6],W=s[10],te=s[14],H=s[3],re=s[7],ce=s[11],Se=s[15];return r[0]=o*w+a*b+c*G+l*H,r[4]=o*I+a*P+c*q+l*re,r[8]=o*N+a*F+c*W+l*ce,r[12]=o*M+a*z+c*te+l*Se,r[1]=u*w+h*b+d*G+p*H,r[5]=u*I+h*P+d*q+p*re,r[9]=u*N+h*F+d*W+p*ce,r[13]=u*M+h*z+d*te+p*Se,r[2]=g*w+_*b+m*G+f*H,r[6]=g*I+_*P+m*q+f*re,r[10]=g*N+_*F+m*W+f*ce,r[14]=g*M+_*z+m*te+f*Se,r[3]=E*w+S*b+v*G+R*H,r[7]=E*I+S*P+v*q+R*re,r[11]=E*N+S*F+v*W+R*ce,r[15]=E*M+S*z+v*te+R*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*h-s*l*h-r*a*d+n*l*d+s*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-s*o*p+s*l*u-r*c*u)+m*(+t*l*h-t*a*p-r*o*h+n*o*p+r*a*u-n*l*u)+f*(-s*a*u-t*c*h+t*a*d+s*o*h-n*o*d+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],E=h*m*l-_*d*l+_*c*p-a*m*p-h*c*f+a*d*f,S=g*d*l-u*m*l-g*c*p+o*m*p+u*c*f-o*d*f,v=u*_*l-g*h*l+g*a*p-o*_*p-u*a*f+o*h*f,R=g*h*c-u*_*c-g*a*d+o*_*d+u*a*m-o*h*m,w=t*E+n*S+s*v+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/w;return e[0]=E*I,e[1]=(_*d*r-h*m*r-_*s*p+n*m*p+h*s*f-n*d*f)*I,e[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*f+n*c*f)*I,e[3]=(h*c*r-a*d*r-h*s*l+n*d*l+a*s*p-n*c*p)*I,e[4]=S*I,e[5]=(u*m*r-g*d*r+g*s*p-t*m*p-u*s*f+t*d*f)*I,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*f-t*c*f)*I,e[7]=(o*d*r-u*c*r+u*s*l-t*d*l-o*s*p+t*c*p)*I,e[8]=v*I,e[9]=(g*h*r-u*_*r-g*n*p+t*_*p+u*n*f-t*h*f)*I,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*I,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*p-t*a*p)*I,e[12]=R*I,e[13]=(u*_*s-g*h*s+g*n*d-t*_*d-u*n*m+t*h*m)*I,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*I,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*d+t*a*d)*I,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,d=r*l,p=r*u,g=r*h,_=o*u,m=o*h,f=a*h,E=c*l,S=c*u,v=c*h,R=n.x,w=n.y,I=n.z;return s[0]=(1-(_+f))*R,s[1]=(p+v)*R,s[2]=(g-S)*R,s[3]=0,s[4]=(p-v)*w,s[5]=(1-(d+f))*w,s[6]=(m+E)*w,s[7]=0,s[8]=(g+S)*I,s[9]=(m-E)*I,s[10]=(1-(d+_))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ss.set(s[0],s[1],s[2]).length(),o=ss.set(s[4],s[5],s[6]).length(),a=ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],pn.copy(this);let l=1/r,u=1/o,h=1/a;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=h,pn.elements[9]*=h,pn.elements[10]*=h,t.setFromRotationMatrix(pn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=_n,c=!1){let l=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),p=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===_n)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===ar)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=_n,c=!1){let l=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),p=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===_n)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===ar)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ss=new C,pn=new Fe,xf=new C(0,0,0),yf=new C(1,1,1),hi=new C,Jr=new C,nn=new C,Rh=new Fe,Ch=new Nt,vn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vn.DEFAULT_ORDER="XYZ";var cr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},vf=0,Ih=new C,rs=new Nt,Wn=new Fe,jr=new C,js=new C,bf=new C,Mf=new Nt,Ph=new C(1,0,0),Lh=new C(0,1,0),Dh=new C(0,0,1),Nh={type:"added"},Sf={type:"removed"},os={type:"childadded",child:null},ol={type:"childremoved",child:null},ot=class i extends Cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new vn,n=new Nt,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new Ue}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(Ph,e)}rotateY(e){return this.rotateOnAxis(Lh,e)}rotateZ(e){return this.rotateOnAxis(Dh,e)}translateOnAxis(e,t){return Ih.copy(e).applyQuaternion(this.quaternion),this.position.add(Ih.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ph,e)}translateY(e){return this.translateOnAxis(Lh,e)}translateZ(e){return this.translateOnAxis(Dh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jr.copy(e):jr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(js,jr,this.up):Wn.lookAt(jr,js,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Wn),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nh),os.child=e,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sf),ol.child=e,this.dispatchEvent(ol),ol.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nh),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,bf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,Mf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};ot.DEFAULT_UP=new C(0,1,0);ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mn=new C,Xn=new C,al=new C,qn=new C,as=new C,ls=new C,Uh=new C,ll=new C,cl=new C,hl=new C,ul=new Ye,dl=new Ye,fl=new Ye,fi=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),mn.subVectors(e,t),s.cross(mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){mn.subVectors(s,t),Xn.subVectors(n,t),al.subVectors(e,t);let o=mn.dot(mn),a=mn.dot(Xn),c=mn.dot(al),l=Xn.dot(Xn),u=Xn.dot(al),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,p=(l*c-a*u)*d,g=(o*u-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,qn.x),c.addScaledVector(o,qn.y),c.addScaledVector(a,qn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return ul.setScalar(0),dl.setScalar(0),fl.setScalar(0),ul.fromBufferAttribute(e,t),dl.fromBufferAttribute(e,n),fl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ul,r.x),o.addScaledVector(dl,r.y),o.addScaledVector(fl,r.z),o}static isFrontFacing(e,t,n,s){return mn.subVectors(n,t),Xn.subVectors(e,t),mn.cross(Xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),mn.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;as.subVectors(s,n),ls.subVectors(r,n),ll.subVectors(e,n);let c=as.dot(ll),l=ls.dot(ll);if(c<=0&&l<=0)return t.copy(n);cl.subVectors(e,s);let u=as.dot(cl),h=ls.dot(cl);if(u>=0&&h<=u)return t.copy(s);let d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(as,o);hl.subVectors(e,r);let p=as.dot(hl),g=ls.dot(hl);if(g>=0&&p<=g)return t.copy(r);let _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(ls,a);let m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Uh.subVectors(r,s),a=(h-u)/(h-u+(p-g)),t.copy(s).addScaledVector(Uh,a);let f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(as,o).addScaledVector(ls,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ku={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function pl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ee=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=We.workingColorSpace){if(e=ec(e,1),t=ze(t,0,1),n=ze(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=pl(o,r,e+1/3),this.g=pl(o,r,e),this.b=pl(o,r,e-1/3)}return We.colorSpaceToWorking(this,s),this}setStyle(e,t=gt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){let n=Ku[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return We.workingToColorSpace(Bt.copy(this),e),Math.round(ze(Bt.r*255,0,255))*65536+Math.round(ze(Bt.g*255,0,255))*256+Math.round(ze(Bt.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.workingToColorSpace(Bt.copy(this),t);let n=Bt.r,s=Bt.g,r=Bt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=We.workingColorSpace){return We.workingToColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=gt){We.workingToColorSpace(Bt.copy(this),e);let t=Bt.r,n=Bt.g,s=Bt.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Qr);let n=rr(ui.h,Qr.h,t),s=rr(ui.s,Qr.s,t),r=rr(ui.l,Qr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Bt=new Ee;Ee.NAMES=Ku;var Tf=0,Kt=class extends Cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=xn(),this.name="",this.type="Material",this.blending=Pi,this.side=yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=vo,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=Li,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yo&&(n.blendSrc=this.blendSrc),this.blendDst!==vo&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Li&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},kt=class extends Kt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var _t=new C,eo=new Ae,Ef=0,yt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ef++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bo,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)eo.fromBufferAttribute(this,t),eo.applyMatrix3(e),this.setXY(t,eo.x,eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$e(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bo&&(e.usage=this.usage),e}};var hr=class extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ur=class extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var pt=class extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}},wf=0,ln=new Fe,ml=new ot,cs=new C,sn=new Ct,Qs=new Ct,At=new C,Ut=class i extends Cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tc(e)?ur:hr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return ml.lookAt(e),ml.updateMatrix(),this.applyMatrix4(ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ct);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Qs.setFromBufferAttribute(a),this.morphTargetsRelative?(At.addVectors(sn.min,Qs.min),sn.expandByPoint(At),At.addVectors(sn.max,Qs.max),sn.expandByPoint(At)):(sn.expandByPoint(Qs.min),sn.expandByPoint(Qs.max))}sn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)At.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(At));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)At.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(e,l),At.add(cs)),s=Math.max(s,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new C,c[N]=new C;let l=new C,u=new C,h=new C,d=new Ae,p=new Ae,g=new Ae,_=new C,m=new C;function f(N,M,b){l.fromBufferAttribute(n,N),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,b),d.fromBufferAttribute(r,N),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,b),u.sub(l),h.sub(l),p.sub(d),g.sub(d);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(P),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),a[N].add(_),a[M].add(_),a[b].add(_),c[N].add(m),c[M].add(m),c[b].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let N=0,M=E.length;N<M;++N){let b=E[N],P=b.start,F=b.count;for(let z=P,G=P+F;z<G;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let S=new C,v=new C,R=new C,w=new C;function I(N){R.fromBufferAttribute(s,N),w.copy(R);let M=a[N];S.copy(M),S.sub(R.multiplyScalar(R.dot(M))).normalize(),v.crossVectors(w,M);let P=v.dot(c[N])<0?-1:1;o.setXYZW(N,S.x,S.y,S.z,P)}for(let N=0,M=E.length;N<M;++N){let b=E[N],P=b.start,F=b.count;for(let z=P,G=P+F;z<G;z+=3)I(e.getX(z+0)),I(e.getX(z+1)),I(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new C,r=new C,o=new C,a=new C,c=new C,l=new C,u=new C,h=new C;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u),p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let f=0;f<u;f++)d[g++]=l[p++]}return new yt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let d=l[u],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){let p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Oh=new Fe,Ri=new Kn,to=new Zt,Fh=new C,no=new C,io=new C,so=new C,gl=new C,ro=new C,Bh=new C,oo=new C,st=class extends ot{constructor(e=new Ut,t=new kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ro.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(gl.fromBufferAttribute(h,e),o?ro.addScaledVector(gl,u):ro.addScaledVector(gl.sub(t),u))}t.add(ro)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(r),Ri.copy(e.ray).recast(e.near),!(to.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(to,Fh)===null||Ri.origin.distanceToSquared(Fh)>(e.far-e.near)**2))&&(Oh.copy(r).invert(),Ri.copy(e.ray).applyMatrix4(Oh),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],E=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=E,R=S;v<R;v+=3){let w=a.getX(v),I=a.getX(v+1),N=a.getX(v+2);s=ao(this,f,e,n,l,u,h,w,I,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let E=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);s=ao(this,o,e,n,l,u,h,E,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],E=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=E,R=S;v<R;v+=3){let w=v,I=v+1,N=v+2;s=ao(this,f,e,n,l,u,h,w,I,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let E=m,S=m+1,v=m+2;s=ao(this,o,e,n,l,u,h,E,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Af(i,e,t,n,s,r,o,a){let c;if(e.side===Wt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===yn,a),c===null)return null;oo.copy(a),oo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(oo);return l<t.near||l>t.far?null:{distance:l,point:oo.clone(),object:i}}function ao(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,no),i.getVertexPosition(c,io),i.getVertexPosition(l,so);let u=Af(i,e,t,n,no,io,so,Bh);if(u){let h=new C;fi.getBarycoord(Bh,no,io,so,h),s&&(u.uv=fi.getInterpolatedAttribute(s,a,c,l,h,new Ae)),r&&(u.uv1=fi.getInterpolatedAttribute(r,a,c,l,h,new Ae)),o&&(u.normal=fi.getInterpolatedAttribute(o,a,c,l,h,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new C,materialIndex:0};fi.getNormal(no,io,so,d.normal),u.face=d,u.barycoord=h}return u}var Pn=class i extends Ut{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(u,3)),this.setAttribute("uv",new pt(h,2));function g(_,m,f,E,S,v,R,w,I,N,M){let b=v/I,P=R/N,F=v/2,z=R/2,G=w/2,q=I+1,W=N+1,te=0,H=0,re=new C;for(let ce=0;ce<W;ce++){let Se=ce*P-z;for(let He=0;He<q;He++){let nt=He*b-F;re[_]=nt*E,re[m]=Se*S,re[f]=G,l.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[f]=w>0?1:-1,u.push(re.x,re.y,re.z),h.push(He/I),h.push(1-ce/N),te+=1}}for(let ce=0;ce<N;ce++)for(let Se=0;Se<I;Se++){let He=d+Se+q*ce,nt=d+Se+q*(ce+1),lt=d+(Se+1)+q*(ce+1),Ze=d+(Se+1)+q*ce;c.push(He,nt,Ze),c.push(nt,lt,Ze),H+=6}a.addGroup(p,H,M),p+=H,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Gi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function zt(i){let e={};for(let t=0;t<i.length;t++){let n=Gi(i[t]);for(let s in n)e[s]=n[s]}return e}function Rf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}var $u={clone:Gi,merge:zt},Cf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,If=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends Kt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cf,this.fragmentShader=If,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gi(e.uniforms),this.uniformsGroups=Rf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},dr=class extends ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},di=new C,kh=new Ae,zh=new Ae,xt=class extends dr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ui*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ui*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(di.x,di.y).multiplyScalar(-e/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-e/di.z)}getViewSize(e,t){return this.getViewBounds(e,kh,zh),t.subVectors(zh,kh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(sr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},hs=-90,us=1,Eo=class extends ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new xt(hs,us,e,t);s.layers=this.layers,this.add(s);let r=new xt(hs,us,e,t);r.layers=this.layers,this.add(r);let o=new xt(hs,us,e,t);o.layers=this.layers,this.add(o);let a=new xt(hs,us,e,t);a.layers=this.layers,this.add(a);let c=new xt(hs,us,e,t);c.layers=this.layers,this.add(c);let l=new xt(hs,us,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===_n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},fr=class extends Rt{constructor(e=[],t=zi,n,s,r,o,a,c,l,u){super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},wo=class extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pn(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:ei});r.uniforms.tEquirect.value=t;let o=new st(s,r),a=t.minFilter;return t.minFilter===Sn&&(t.minFilter=Gt),new Eo(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Pt=class extends ot{constructor(){super(),this.isGroup=!0,this.type="Group"}},Pf={type:"move"},vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Pf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Pt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var pr=class extends ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},bs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=bo,this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Vt=new C,Ms=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$e(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Hh=new C,Vh=new Ye,Gh=new Ye,Lf=new C,Wh=new Fe,lo=new C,_l=new Zt,Xh=new Fe,xl=new Kn,mr=class extends st{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=El,this.bindMatrix=new Fe,this.bindMatrixInverse=new Fe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ct),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lo),this.boundingBox.expandByPoint(lo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Zt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lo),this.boundingSphere.expandByPoint(lo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_l.copy(this.boundingSphere),_l.applyMatrix4(s),e.ray.intersectsSphere(_l)!==!1&&(Xh.copy(s).invert(),xl.copy(e.ray).applyMatrix4(Xh),!(this.boundingBox!==null&&xl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ye,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===El?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Uu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Vh.fromBufferAttribute(s.attributes.skinIndex,e),Gh.fromBufferAttribute(s.attributes.skinWeight,e),Hh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Gh.getComponent(r);if(o!==0){let a=Vh.getComponent(r);Wh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Lf.copy(Hh).applyMatrix4(Wh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Ss=class extends ot{constructor(){super(),this.isBone=!0,this.type="Bone"}},gr=class extends Rt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Lt,u=Lt,h,d){super(null,o,a,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},qh=new Fe,Df=new Fe,_r=class i{constructor(e=[],t=[]){this.uuid=xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Fe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Fe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Df;qh.multiplyMatrices(a,t[r]),qh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new gr(t,e,e,rn,un);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ss),this.bones.push(o),this.boneInverses.push(new Fe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},gi=class extends yt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ds=new Fe,Yh=new Fe,co=[],Zh=new Ct,Nf=new Fe,er=new st,tr=new Zt,xr=class extends st{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Nf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ct),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),Zh.copy(e.boundingBox).applyMatrix4(ds),this.boundingBox.union(Zh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),tr.copy(e.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(er.geometry=this.geometry,er.material=this.material,er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tr.copy(this.boundingSphere),tr.applyMatrix4(n),e.ray.intersectsSphere(tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ds),Yh.multiplyMatrices(n,ds),er.matrixWorld=Yh,er.raycast(e,co);for(let o=0,a=co.length;o<a;o++){let c=co[o];c.instanceId=r,c.object=this,t.push(c)}co.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new gi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new gr(new Float32Array(s*this.count),s,this.count,ea,un));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},yl=new C,Uf=new C,Of=new Ue,cn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=yl.subVectors(n,t).cross(Uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(yl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Of.getNormalMatrix(e),s=this.coplanarPoint(yl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ci=new Zt,Ff=new Ae(.5,.5),ho=new C,Ts=class{constructor(e=new cn,t=new cn,n=new cn,s=new cn,r=new cn,o=new cn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_n,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],h=r[5],d=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],E=r[12],S=r[13],v=r[14],R=r[15];if(s[0].setComponents(l-o,p-u,f-g,R-E).normalize(),s[1].setComponents(l+o,p+u,f+g,R+E).normalize(),s[2].setComponents(l+a,p+h,f+_,R+S).normalize(),s[3].setComponents(l-a,p-h,f-_,R-S).normalize(),n)s[4].setComponents(c,d,m,v).normalize(),s[5].setComponents(l-c,p-d,f-m,R-v).normalize();else if(s[4].setComponents(l-c,p-d,f-m,R-v).normalize(),t===_n)s[5].setComponents(l+c,p+d,f+m,R+v).normalize();else if(t===ar)s[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){Ci.center.set(0,0,0);let t=Ff.distanceTo(e.center);return Ci.radius=.7071067811865476+t,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ho.x=s.normal.x>0?e.max.x:e.min.x,ho.y=s.normal.y>0?e.max.y:e.min.y,ho.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ho)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var _i=class extends Kt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ao=new C,Ro=new C,Kh=new Fe,nr=new Kn,uo=new Zt,vl=new C,$h=new C,xi=class extends ot{constructor(e=new Ut,t=new _i){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ao.fromBufferAttribute(t,s-1),Ro.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ao.distanceTo(Ro);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(s),uo.radius+=r,e.ray.intersectsSphere(uo)===!1)return;Kh.copy(s).invert(),nr.copy(e.ray).applyMatrix4(Kh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){let f=u.getX(_),E=u.getX(_+1),S=fo(this,e,nr,c,f,E,_);S&&t.push(S)}if(this.isLineLoop){let _=u.getX(g-1),m=u.getX(p),f=fo(this,e,nr,c,_,m,g-1);f&&t.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){let f=fo(this,e,nr,c,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){let _=fo(this,e,nr,c,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function fo(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Ao.fromBufferAttribute(a,s),Ro.fromBufferAttribute(a,r),t.distanceSqToSegment(Ao,Ro,vl,$h)>n)return;vl.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(vl);if(!(l<e.near||l>e.far))return{distance:l,point:$h.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Jh=new C,jh=new C,Es=class extends xi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Jh.fromBufferAttribute(t,s),jh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Jh.distanceTo(jh);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},yr=class extends xi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ws=class extends Kt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Qh=new Fe,Il=new Kn,po=new Zt,mo=new C,vr=class extends ot{constructor(e=new Ut,t=new ws){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(s),po.radius+=r,e.ray.intersectsSphere(po)===!1)return;Qh.copy(s).invert(),Il.copy(e.ray).applyMatrix4(Qh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){let m=l.getX(g);mo.fromBufferAttribute(h,m),eu(mo,m,c,s,e,t,this)}}else{let d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=d,_=p;g<_;g++)mo.fromBufferAttribute(h,g),eu(mo,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function eu(i,e,t,n,s,r,o){let a=Il.distanceSqToPoint(i);if(a<t){let c=new C;Il.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var br=class extends Rt{constructor(e,t,n=vi,s,r,o,a=Lt,c=Lt,l,u=gs,h=1){if(u!==gs&&u!==Ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ys(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Mr=class extends Rt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Co=class i extends Ut{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],d=[],p=[],g=0,_=[],m=n/2,f=0;E(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new pt(h,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(p,2));function E(){let v=new C,R=new C,w=0,I=(t-e)/n;for(let N=0;N<=r;N++){let M=[],b=N/r,P=b*(t-e)+e;for(let F=0;F<=s;F++){let z=F/s,G=z*c+a,q=Math.sin(G),W=Math.cos(G);R.x=P*q,R.y=-b*n+m,R.z=P*W,h.push(R.x,R.y,R.z),v.set(q,I,W).normalize(),d.push(v.x,v.y,v.z),p.push(z,1-b),M.push(g++)}_.push(M)}for(let N=0;N<s;N++)for(let M=0;M<r;M++){let b=_[M][N],P=_[M+1][N],F=_[M+1][N+1],z=_[M][N+1];(e>0||M!==0)&&(u.push(b,P,z),w+=3),(t>0||M!==r-1)&&(u.push(P,F,z),w+=3)}l.addGroup(f,w,0),f+=w}function S(v){let R=g,w=new Ae,I=new C,N=0,M=v===!0?e:t,b=v===!0?1:-1;for(let F=1;F<=s;F++)h.push(0,m*b,0),d.push(0,b,0),p.push(.5,.5),g++;let P=g;for(let F=0;F<=s;F++){let G=F/s*c+a,q=Math.cos(G),W=Math.sin(G);I.x=M*W,I.y=m*b,I.z=M*q,h.push(I.x,I.y,I.z),d.push(0,b,0),w.x=q*.5+.5,w.y=W*.5*b+.5,p.push(w.x,w.y),g++}for(let F=0;F<s;F++){let z=R+F,G=P+F;v===!0?u.push(G,G+1,z):u.push(G+1,G,z),N+=3}l.addGroup(f,N,v===!0?1:2),f+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Io=class i extends Co{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Oi=class i extends Ut{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){let E=f*d-o;for(let S=0;S<l;S++){let v=S*h-r;g.push(v,-E,0),_.push(0,0,1),m.push(S/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let E=0;E<a;E++){let S=E+l*f,v=E+l*(f+1),R=E+1+l*(f+1),w=E+1+l*f;p.push(S,v,w),p.push(v,R,w)}this.setIndex(p),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var As=class i extends Ut{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],h=new C,d=new C,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){let E=[],S=f/n,v=0;f===0&&o===0?v=.5/t:f===n&&c===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){let w=R/t;h.x=-e*Math.cos(s+w*r)*Math.sin(o+S*a),h.y=e*Math.cos(o+S*a),h.z=e*Math.sin(s+w*r)*Math.sin(o+S*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(w+v,1-S),E.push(l++)}u.push(E)}for(let f=0;f<n;f++)for(let E=0;E<t;E++){let S=u[f][E+1],v=u[f][E],R=u[f+1][E],w=u[f+1][E+1];(f!==0||o>0)&&p.push(S,v,w),(f!==n-1||c<Math.PI)&&p.push(v,R,w)}this.setIndex(p),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ln=class extends Kt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},$t=class extends Ln{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Po=class extends Kt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Lo=class extends Kt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function go(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Bf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function kf(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function tu(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Ju(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var $n=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Do=class extends $n{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wl,endingEnd:wl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Al:r=e,a=2*t-n;break;case Rl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Al:o=e,c=2*n-t;break;case Rl:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,E=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,S=(-1-p)*m+(1.5+p)*_+.5*g,v=p*m-p*_;for(let R=0;R!==a;++R)r[R]=f*o[u+R]+E*o[l+R]+S*o[c+R]+v*o[h+R];return r}},No=class extends $n{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==a;++d)r[d]=o[l+d]*h+o[c+d]*u;return r}},Uo=class extends $n{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Jt=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=go(t,this.TimeBufferType),this.values=go(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:go(e.times,Array),values:go(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Do(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Di:t=this.InterpolantFactoryMethodDiscrete;break;case Ni:t=this.InterpolantFactoryMethodLinear;break;case xo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Di;case this.InterpolantFactoryMethodLinear:return Ni;case this.InterpolantFactoryMethodSmooth:return xo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Bf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===xo,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{let h=a*n,d=h-n,p=h+n;for(let g=0;g!==n;++g){let _=t[h+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Jt.prototype.ValueTypeName="";Jt.prototype.TimeBufferType=Float32Array;Jt.prototype.ValueBufferType=Float32Array;Jt.prototype.DefaultInterpolation=Ni;var Jn=class extends Jt{constructor(e,t,n){super(e,t,n)}};Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=Di;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Sr=class extends Jt{constructor(e,t,n,s){super(e,t,n,s)}};Sr.prototype.ValueTypeName="color";var Dn=class extends Jt{constructor(e,t,n,s){super(e,t,n,s)}};Dn.prototype.ValueTypeName="number";var Oo=class extends $n{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let u=l+a;l!==u;l+=4)Nt.slerpFlat(r,0,o,l-a,o,l,c);return r}},Nn=class extends Jt{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Oo(this.times,this.values,this.getValueSize(),e)}};Nn.prototype.ValueTypeName="quaternion";Nn.prototype.InterpolantFactoryMethodSmooth=void 0;var jn=class extends Jt{constructor(e,t,n){super(e,t,n)}};jn.prototype.ValueTypeName="string";jn.prototype.ValueBufferType=Array;jn.prototype.DefaultInterpolation=Di;jn.prototype.InterpolantFactoryMethodLinear=void 0;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Un=class extends Jt{constructor(e,t,n,s){super(e,t,n,s)}};Un.prototype.ValueTypeName="vector";var Tr=class{constructor(e="",t=-1,n=[],s=Ou){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=xn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Hf(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Jt.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=kf(c);c=tu(c,1,u),l=tu(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Dn(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],d=s[h];d||(s[h]=d=[]),d.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,p,g,_){if(p.length!==0){let m=[],f=[];Ju(p,m,f,g),m.length!==0&&_.push(new h(d,m,f))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(let _ in p){let m=[],f=[];for(let E=0;E!==d[g].morphTargets.length;++E){let S=d[g];m.push(S.time),f.push(S.morphTarget===_?1:0)}s.push(new Dn(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{let p=".bones["+t[h].name+"]";n(Un,p+".position",d,"pos",s),n(Nn,p+".quaternion",d,"rot",s),n(Un,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function zf(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Dn;case"vector":case"vector2":case"vector3":case"vector4":return Un;case"color":return Sr;case"quaternion":return Nn;case"bool":case"boolean":return Jn;case"string":return jn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Hf(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=zf(i.type);if(i.times===void 0){let t=[],n=[];Ju(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Rn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Fo=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){let p=l[h],g=l[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},ju=new Fo,On=class{constructor(e){this.manager=e!==void 0?e:ju,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};On.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yn={},Pl=class extends Error{constructor(e,t){super(e),this.response=t}},Rs=class extends On{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Rn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Yn[e]!==void 0){Yn[e].push({onLoad:t,onProgress:n,onError:s});return}Yn[e]=[],Yn[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=Yn[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0,_=0,m=new ReadableStream({start(f){E();function E(){h.read().then(({done:S,value:v})=>{if(S)f.close();else{_+=v.byteLength;let R=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let w=0,I=u.length;w<I;w++){let N=u[w];N.onProgress&&N.onProgress(R)}f.enqueue(v),E()}},S=>{f.error(S)})}}});return new Response(m)}else throw new Pl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Rn.add(`file:${e}`,l);let u=Yn[e];delete Yn[e];for(let h=0,d=u.length;h<d;h++){let p=u[h];p.onLoad&&p.onLoad(l)}}).catch(l=>{let u=Yn[e];if(u===void 0)throw this.manager.itemError(e),l;delete Yn[e];for(let h=0,d=u.length;h<d;h++){let p=u[h];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var fs=new WeakMap,Bo=class extends On{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Rn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=fs.get(o);h===void 0&&(h=[],fs.set(o,h)),h.push({onLoad:t,onError:s})}return o}let a=_s("img");function c(){u(),t&&t(this);let h=fs.get(this)||[];for(let d=0;d<h.length;d++){let p=h[d];p.onLoad&&p.onLoad(this)}fs.delete(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),Rn.remove(`image:${e}`);let d=fs.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(h)}fs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Rn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Er=class extends On{constructor(e){super(e)}load(e,t,n,s){let r=new Rt,o=new Bo(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Fi=class extends ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},wr=class extends Fi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},bl=new Fe,nu=new C,iu=new C,Ar=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.mapType=Tn,this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ts,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;nu.setFromMatrixPosition(e.matrixWorld),t.position.copy(nu),iu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(iu),t.updateMatrixWorld(),bl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(bl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ll=class extends Ar{constructor(){super(new xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ui*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Rr=class extends Fi{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.target=new ot,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ll}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},su=new Fe,ir=new C,Ml=new C,Dl=class extends Ar{constructor(){super(new xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new Ye(2,1,1,1),new Ye(0,1,1,1),new Ye(3,1,1,1),new Ye(1,1,1,1),new Ye(3,0,1,1),new Ye(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ir.setFromMatrixPosition(e.matrixWorld),n.position.copy(ir),Ml.copy(n.position),Ml.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ml),n.updateMatrixWorld(),s.makeTranslation(-ir.x,-ir.y,-ir.z),su.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(su,n.coordinateSystem,n.reversedDepth)}},Cr=class extends Fi{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Dl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Bi=class extends dr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Nl=class extends Ar{constructor(){super(new Bi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},yi=class extends Fi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.target=new ot,this.shadow=new Nl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Qn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Sl=new WeakMap,Ir=class extends On{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Rn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{if(Sl.has(o)===!0)s&&s(Sl.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Rn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Sl.set(c,l),Rn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Rn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ko=class extends xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var ic="\\[\\]\\.:\\/",Vf=new RegExp("["+ic+"]","g"),sc="[^"+ic+"]",Gf="[^"+ic.replace("\\.","")+"]",Wf=/((?:WC+[\/:])*)/.source.replace("WC",sc),Xf=/(WCOD+)?/.source.replace("WCOD",Gf),qf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",sc),Yf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",sc),Zf=new RegExp("^"+Wf+Xf+qf+Yf+"$"),Kf=["material","materials","bones","map"],Ul=class{constructor(e,t,n){let s=n||tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},tt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Vf,"")}static parseTrackName(e){let t=Zf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Kf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};tt.Composite=Ul;tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray];tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var dx=new Float32Array(1);var Cs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Pr=class extends Es{constructor(e=10,t=10,n=4473924,s=8947848){n=new Ee(n),s=new Ee(s);let r=t/2,o=e/t,a=e/2,c=[],l=[];for(let d=0,p=0,g=-a;d<=t;d++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);let _=d===r?n:s;_.toArray(l,p),p+=3,_.toArray(l,p),p+=3,_.toArray(l,p),p+=3,_.toArray(l,p),p+=3}let u=new Ut;u.setAttribute("position",new pt(c,3)),u.setAttribute("color",new pt(l,3));let h=new _i({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var ru=new C,_o,Tl,ki=class extends ot{constructor(e=new C(0,0,1),t=new C(0,0,0),n=1,s=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",_o===void 0&&(_o=new Ut,_o.setAttribute("position",new pt([0,0,0,0,1,0],3)),Tl=new Io(.5,1,5,1),Tl.translate(0,-.5,0)),this.position.copy(t),this.line=new xi(_o,new _i({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new st(Tl,new kt({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{ru.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(ru,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};var Lr=class extends Cn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function rc(i,e,t,n){let s=$f(n);switch(t){case Yl:return i*e;case ea:return i*e/s.components*s.byteLength;case ta:return i*e/s.components*s.byteLength;case Kl:return i*e*2/s.components*s.byteLength;case na:return i*e*2/s.components*s.byteLength;case Zl:return i*e*3/s.components*s.byteLength;case rn:return i*e*4/s.components*s.byteLength;case ia:return i*e*4/s.components*s.byteLength;case Nr:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Or:case Fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ra:case aa:return Math.max(i,16)*Math.max(e,8)/4;case sa:case oa:return Math.max(i,8)*Math.max(e,8)/2;case la:case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case da:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case fa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case pa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ga:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case _a:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case xa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ya:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case va:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ba:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Sa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ea:case wa:case Aa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ra:case Ca:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ia:case Pa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $f(i){switch(i){case Tn:case Gl:return{byteLength:1,components:1};case Ps:case Wl:case Ls:return{byteLength:2,components:1};case jo:case Qo:return{byteLength:2,components:4};case vi:case Jo:case un:return{byteLength:4,components:1};case Xl:case ql:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Md(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function jf(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<h.length;p++){let g=h[d],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let p=0,g=h.length;p<g;p++){let _=h[p];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ep=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,np=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ap=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,lp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,up=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,dp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Mp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Sp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ep=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ip=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Xp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,qp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$p=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Jp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,em=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,am=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,um=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_m=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Em=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Am=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Rm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Im=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,km=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ym=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Jm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ig=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,og=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ag=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_g=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Sg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ag=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ig=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:Qf,alphahash_pars_fragment:ep,alphamap_fragment:tp,alphamap_pars_fragment:np,alphatest_fragment:ip,alphatest_pars_fragment:sp,aomap_fragment:rp,aomap_pars_fragment:op,batching_pars_vertex:ap,batching_vertex:lp,begin_vertex:cp,beginnormal_vertex:hp,bsdfs:up,iridescence_fragment:dp,bumpmap_pars_fragment:fp,clipping_planes_fragment:pp,clipping_planes_pars_fragment:mp,clipping_planes_pars_vertex:gp,clipping_planes_vertex:_p,color_fragment:xp,color_pars_fragment:yp,color_pars_vertex:vp,color_vertex:bp,common:Mp,cube_uv_reflection_fragment:Sp,defaultnormal_vertex:Tp,displacementmap_pars_vertex:Ep,displacementmap_vertex:wp,emissivemap_fragment:Ap,emissivemap_pars_fragment:Rp,colorspace_fragment:Cp,colorspace_pars_fragment:Ip,envmap_fragment:Pp,envmap_common_pars_fragment:Lp,envmap_pars_fragment:Dp,envmap_pars_vertex:Np,envmap_physical_pars_fragment:Xp,envmap_vertex:Up,fog_vertex:Op,fog_pars_vertex:Fp,fog_fragment:Bp,fog_pars_fragment:kp,gradientmap_pars_fragment:zp,lightmap_pars_fragment:Hp,lights_lambert_fragment:Vp,lights_lambert_pars_fragment:Gp,lights_pars_begin:Wp,lights_toon_fragment:qp,lights_toon_pars_fragment:Yp,lights_phong_fragment:Zp,lights_phong_pars_fragment:Kp,lights_physical_fragment:$p,lights_physical_pars_fragment:Jp,lights_fragment_begin:jp,lights_fragment_maps:Qp,lights_fragment_end:em,logdepthbuf_fragment:tm,logdepthbuf_pars_fragment:nm,logdepthbuf_pars_vertex:im,logdepthbuf_vertex:sm,map_fragment:rm,map_pars_fragment:om,map_particle_fragment:am,map_particle_pars_fragment:lm,metalnessmap_fragment:cm,metalnessmap_pars_fragment:hm,morphinstance_vertex:um,morphcolor_vertex:dm,morphnormal_vertex:fm,morphtarget_pars_vertex:pm,morphtarget_vertex:mm,normal_fragment_begin:gm,normal_fragment_maps:_m,normal_pars_fragment:xm,normal_pars_vertex:ym,normal_vertex:vm,normalmap_pars_fragment:bm,clearcoat_normal_fragment_begin:Mm,clearcoat_normal_fragment_maps:Sm,clearcoat_pars_fragment:Tm,iridescence_pars_fragment:Em,opaque_fragment:wm,packing:Am,premultiplied_alpha_fragment:Rm,project_vertex:Cm,dithering_fragment:Im,dithering_pars_fragment:Pm,roughnessmap_fragment:Lm,roughnessmap_pars_fragment:Dm,shadowmap_pars_fragment:Nm,shadowmap_pars_vertex:Um,shadowmap_vertex:Om,shadowmask_pars_fragment:Fm,skinbase_vertex:Bm,skinning_pars_vertex:km,skinning_vertex:zm,skinnormal_vertex:Hm,specularmap_fragment:Vm,specularmap_pars_fragment:Gm,tonemapping_fragment:Wm,tonemapping_pars_fragment:Xm,transmission_fragment:qm,transmission_pars_fragment:Ym,uv_pars_fragment:Zm,uv_pars_vertex:Km,uv_vertex:$m,worldpos_vertex:Jm,background_vert:jm,background_frag:Qm,backgroundCube_vert:eg,backgroundCube_frag:tg,cube_vert:ng,cube_frag:ig,depth_vert:sg,depth_frag:rg,distanceRGBA_vert:og,distanceRGBA_frag:ag,equirect_vert:lg,equirect_frag:cg,linedashed_vert:hg,linedashed_frag:ug,meshbasic_vert:dg,meshbasic_frag:fg,meshlambert_vert:pg,meshlambert_frag:mg,meshmatcap_vert:gg,meshmatcap_frag:_g,meshnormal_vert:xg,meshnormal_frag:yg,meshphong_vert:vg,meshphong_frag:bg,meshphysical_vert:Mg,meshphysical_frag:Sg,meshtoon_vert:Tg,meshtoon_frag:Eg,points_vert:wg,points_frag:Ag,shadow_vert:Rg,shadow_frag:Cg,sprite_vert:Ig,sprite_frag:Pg},se={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},Bn={basic:{uniforms:zt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:zt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ee(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:zt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:zt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:zt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Ee(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:zt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:zt([se.points,se.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:zt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:zt([se.common,se.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:zt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:zt([se.sprite,se.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:zt([se.common,se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:zt([se.lights,se.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};Bn.physical={uniforms:zt([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var La={r:0,b:0,g:0},Wi=new vn,Lg=new Fe;function Dg(i,e,t,n,s,r,o){let a=new Ee(0),c=r===!0?0:1,l,u,h=null,d=0,p=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1,R=g(S);R===null?f(a,c):R&&R.isColor&&(f(R,1),v=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,v){let R=g(v);R&&(R.isCubeTexture||R.mapping===Dr)?(u===void 0&&(u=new st(new Pn(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Gi(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,I,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Wi.copy(v.backgroundRotation),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(Wi)),u.material.toneMapped=We.getTransfer(R.colorSpace)!==Je,(h!==R||d!==R.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=R,d=R.version,p=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new st(new Oi(2,2),new bn({name:"BackgroundMaterial",uniforms:Gi(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=We.getTransfer(R.colorSpace)!==Je,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(h!==R||d!==R.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=R,d=R.version,p=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function f(S,v){S.getRGB(La,nc(i)),n.buffers.color.setClear(La.r,La.g,La.b,v,o)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),c=v,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(a,c)},render:_,addToRenderList:m,dispose:E}}function Ng(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(b,P,F,z,G){let q=!1,W=h(z,F,P);r!==W&&(r=W,l(r.object)),q=p(b,z,F,G),q&&g(b,z,F,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(b,P,F,z),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return i.createVertexArray()}function l(b){return i.bindVertexArray(b)}function u(b){return i.deleteVertexArray(b)}function h(b,P,F){let z=F.wireframe===!0,G=n[b.id];G===void 0&&(G={},n[b.id]=G);let q=G[P.id];q===void 0&&(q={},G[P.id]=q);let W=q[z];return W===void 0&&(W=d(c()),q[z]=W),W}function d(b){let P=[],F=[],z=[];for(let G=0;G<t;G++)P[G]=0,F[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:z,object:b,attributes:{},index:null}}function p(b,P,F,z){let G=r.attributes,q=P.attributes,W=0,te=F.getAttributes();for(let H in te)if(te[H].location>=0){let ce=G[H],Se=q[H];if(Se===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(Se=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(Se=b.instanceColor)),ce===void 0||ce.attribute!==Se||Se&&ce.data!==Se.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(b,P,F,z){let G={},q=P.attributes,W=0,te=F.getAttributes();for(let H in te)if(te[H].location>=0){let ce=q[H];ce===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(ce=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(ce=b.instanceColor));let Se={};Se.attribute=ce,ce&&ce.data&&(Se.data=ce.data),G[H]=Se,W++}r.attributes=G,r.attributesNum=W,r.index=z}function _(){let b=r.newAttributes;for(let P=0,F=b.length;P<F;P++)b[P]=0}function m(b){f(b,0)}function f(b,P){let F=r.newAttributes,z=r.enabledAttributes,G=r.attributeDivisors;F[b]=1,z[b]===0&&(i.enableVertexAttribArray(b),z[b]=1),G[b]!==P&&(i.vertexAttribDivisor(b,P),G[b]=P)}function E(){let b=r.newAttributes,P=r.enabledAttributes;for(let F=0,z=P.length;F<z;F++)P[F]!==b[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function S(b,P,F,z,G,q,W){W===!0?i.vertexAttribIPointer(b,P,F,G,q):i.vertexAttribPointer(b,P,F,z,G,q)}function v(b,P,F,z){_();let G=z.attributes,q=F.getAttributes(),W=P.defaultAttributeValues;for(let te in q){let H=q[te];if(H.location>=0){let re=G[te];if(re===void 0&&(te==="instanceMatrix"&&b.instanceMatrix&&(re=b.instanceMatrix),te==="instanceColor"&&b.instanceColor&&(re=b.instanceColor)),re!==void 0){let ce=re.normalized,Se=re.itemSize,He=e.get(re);if(He===void 0)continue;let nt=He.buffer,lt=He.type,Ze=He.bytesPerElement,Y=lt===i.INT||lt===i.UNSIGNED_INT||re.gpuType===Jo;if(re.isInterleavedBufferAttribute){let $=re.data,fe=$.stride,Le=re.offset;if($.isInstancedInterleavedBuffer){for(let Me=0;Me<H.locationSize;Me++)f(H.location+Me,$.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Me=0;Me<H.locationSize;Me++)m(H.location+Me);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Me=0;Me<H.locationSize;Me++)S(H.location+Me,Se/H.locationSize,lt,ce,fe*Ze,(Le+Se/H.locationSize*Me)*Ze,Y)}else{if(re.isInstancedBufferAttribute){for(let $=0;$<H.locationSize;$++)f(H.location+$,re.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let $=0;$<H.locationSize;$++)m(H.location+$);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let $=0;$<H.locationSize;$++)S(H.location+$,Se/H.locationSize,lt,ce,Se*Ze,Se/H.locationSize*$*Ze,Y)}}else if(W!==void 0){let ce=W[te];if(ce!==void 0)switch(ce.length){case 2:i.vertexAttrib2fv(H.location,ce);break;case 3:i.vertexAttrib3fv(H.location,ce);break;case 4:i.vertexAttrib4fv(H.location,ce);break;default:i.vertexAttrib1fv(H.location,ce)}}}}E()}function R(){N();for(let b in n){let P=n[b];for(let F in P){let z=P[F];for(let G in z)u(z[G].object),delete z[G];delete P[F]}delete n[b]}}function w(b){if(n[b.id]===void 0)return;let P=n[b.id];for(let F in P){let z=P[F];for(let G in z)u(z[G].object),delete z[G];delete P[F]}delete n[b.id]}function I(b){for(let P in n){let F=n[P];if(F[b.id]===void 0)continue;let z=F[b.id];for(let G in z)u(z[G].object),delete z[G];delete F[b.id]}}function N(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function Ug(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,n,1)}function c(l,u,h,d){if(h===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],u[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Og(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==rn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let N=I===Ls&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Tn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==un&&!N)}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:R,maxSamples:w}}function Fg(i){let e=this,t=null,n=0,s=!1,r=!1,o=new cn,a=new Ue,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let p=h.length!==0||d||n!==0||s;return s=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){let g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{let E=r?0:n,S=E*4,v=f.clippingState||null;c.value=v,v=u(g,d,S,p);for(let R=0;R!==S;++R)v[R]=t[R];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,g){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let f=p+_*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,v=p;S!==_;++S,v+=4)o.copy(h[S]).applyMatrix4(E,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Bg(i){let e=new WeakMap;function t(o,a){return a===Zo?o.mapping=zi:a===Ko&&(o.mapping=Hi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Zo||a===Ko)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new wo(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Fs=4,Qu=[.125,.215,.35,.446,.526,.582],Yi=20,oc=new Bi,ed=new Ee,ac=null,lc=0,cc=0,hc=!1,qi=(1+Math.sqrt(5))/2,Os=1/qi,td=[new C(-qi,Os,0),new C(qi,Os,0),new C(-Os,0,qi),new C(Os,0,qi),new C(0,qi,-Os),new C(0,qi,Os),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],kg=new C,Ua=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=kg}=r;ac=this._renderer.getRenderTarget(),lc=this._renderer.getActiveCubeFace(),cc=this._renderer.getActiveMipmapLevel(),hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=id(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ac,lc,cc),this._renderer.xr.enabled=hc,e.scissorTest=!1,Da(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===Hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ac=this._renderer.getRenderTarget(),lc=this._renderer.getActiveCubeFace(),cc=this._renderer.getActiveMipmapLevel(),hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:Ls,format:rn,colorSpace:Dt,depthBuffer:!1},s=nd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zg(r)),this._blurMaterial=Hg(r,e,t)}return s}_compileMaterial(e){let t=new st(this._lodPlanes[0],e);this._renderer.compile(t,oc)}_sceneToCubeUV(e,t,n,s,r){let c=new xt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(ed),h.toneMapping=ti,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let _=new kt({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),m=new st(new Pn,_),f=!1,E=e.background;E?E.isColor&&(_.color.copy(E),e.background=null,f=!0):(_.color.copy(ed),f=!0);for(let S=0;S<6;S++){let v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[S],r.y,r.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[S]));let R=this._cubeSize;Da(s,v*R,S>2?R:0,R,R),h.setRenderTarget(s),f&&h.render(m,c),h.render(e,c)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=p,h.autoClear=d,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===zi||e.mapping===Hi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=id());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new st(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Da(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,oc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=td[(s-r-1)%td.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new st(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Yi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Yi;m>Yi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yi}`);let f=[],E=0;for(let I=0;I<Yi;++I){let N=I/_,M=Math.exp(-N*N/2);f.push(M),I===0?E+=M:I<m&&(E+=2*M)}for(let I=0;I<f.length;I++)f[I]=f[I]/E;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;let v=this._sizeLods[s],R=3*v*(s>S-Fs?s-S+Fs:0),w=4*(this._cubeSize-v);Da(t,R,w,3*v,2*v),c.setRenderTarget(t),c.render(h,oc)}};function zg(i){let e=[],t=[],n=[],s=i,r=i-Fs+1+Qu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Fs?c=Qu[o-i+Fs-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,f=1,E=new Float32Array(_*g*p),S=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let w=0;w<p;w++){let I=w%3*2/3-1,N=w>2?0:-1,M=[I,N,0,I+2/3,N,0,I+2/3,N+1,0,I,N,0,I+2/3,N+1,0,I,N+1,0];E.set(M,_*g*w),S.set(d,m*g*w);let b=[w,w,w,w,w,w];v.set(b,f*g*w)}let R=new Ut;R.setAttribute("position",new yt(E,_)),R.setAttribute("uv",new yt(S,m)),R.setAttribute("faceIndex",new yt(v,f)),e.push(R),s>Fs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function nd(i,e,t){let n=new In(i,e,t);return n.texture.mapping=Dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Da(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Hg(i,e,t){let n=new Float32Array(Yi),s=new C(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function id(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function sd(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function vc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vg(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Zo||c===Ko,u=c===zi||c===Hi;if(l||u){let h=e.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ua(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Ua(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Gg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&xs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Wg(i,e,t,n){let s={},r=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(h){let d=h.attributes;for(let p in d)e.update(d[p],i.ARRAY_BUFFER)}function l(h){let d=[],p=h.index,g=h.attributes.position,_=0;if(p!==null){let E=p.array;_=p.version;for(let S=0,v=E.length;S<v;S+=3){let R=E[S+0],w=E[S+1],I=E[S+2];d.push(R,w,w,I,I,R)}}else if(g!==void 0){let E=g.array;_=g.version;for(let S=0,v=E.length/3-1;S<v;S+=3){let R=S+0,w=S+1,I=S+2;d.push(R,w,w,I,I,R)}}else return;let m=new(tc(d)?ur:hr)(d,1);m.version=_;let f=r.get(h);f&&e.remove(f),r.set(h,m)}function u(h){let d=r.get(h);if(d){let p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Xg(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),t.update(p,n,1)}function l(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*o,g),t.update(p,n,g))}function u(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function h(d,p,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let E=0;E<g;E++)f+=p[E]*_[E];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function qg(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Yg(i,e,t){let n=new WeakMap,s=new Ye;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],S=0;p===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let v=a.attributes.position.count*S,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let w=new Float32Array(v*R*4*h),I=new lr(w,v,R,h);I.type=un,I.needsUpdate=!0;let N=S*4;for(let b=0;b<h;b++){let P=m[b],F=f[b],z=E[b],G=v*R*4*b;for(let q=0;q<P.count;q++){let W=q*N;p===!0&&(s.fromBufferAttribute(P,q),w[G+W+0]=s.x,w[G+W+1]=s.y,w[G+W+2]=s.z,w[G+W+3]=0),g===!0&&(s.fromBufferAttribute(F,q),w[G+W+4]=s.x,w[G+W+5]=s.y,w[G+W+6]=s.z,w[G+W+7]=0),_===!0&&(s.fromBufferAttribute(z,q),w[G+W+8]=s.x,w[G+W+9]=s.y,w[G+W+10]=s.z,w[G+W+11]=z.itemSize===4?s.w:1)}}d={count:h,texture:I,size:new Ae(v,R)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Zg(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var Sd=new Rt,rd=new br(1,1),Td=new lr,Ed=new To,wd=new fr,od=[],ad=[],ld=new Float32Array(16),cd=new Float32Array(9),hd=new Float32Array(4);function ks(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=od[s];if(r===void 0&&(r=new Float32Array(s),od[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fa(i,e){let t=ad[e];t===void 0&&(t=new Int32Array(e),ad[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Kg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $g(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function Jg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function jg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function Qg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;hd.set(n),i.uniformMatrix2fv(this.addr,!1,hd),St(t,n)}}function e_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;cd.set(n),i.uniformMatrix3fv(this.addr,!1,cd),St(t,n)}}function t_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;ld.set(n),i.uniformMatrix4fv(this.addr,!1,ld),St(t,n)}}function n_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function i_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function s_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function r_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function o_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function a_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function l_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function c_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function h_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(rd.compareFunction=jl,r=rd):r=Sd,t.setTexture2D(e||r,s)}function u_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ed,s)}function d_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||wd,s)}function f_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Td,s)}function p_(i){switch(i){case 5126:return Kg;case 35664:return $g;case 35665:return Jg;case 35666:return jg;case 35674:return Qg;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return n_;case 35667:case 35671:return i_;case 35668:case 35672:return s_;case 35669:case 35673:return r_;case 5125:return o_;case 36294:return a_;case 36295:return l_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return h_;case 35679:case 36299:case 36307:return u_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return f_}}function m_(i,e){i.uniform1fv(this.addr,e)}function g_(i,e){let t=ks(e,this.size,2);i.uniform2fv(this.addr,t)}function __(i,e){let t=ks(e,this.size,3);i.uniform3fv(this.addr,t)}function x_(i,e){let t=ks(e,this.size,4);i.uniform4fv(this.addr,t)}function y_(i,e){let t=ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function v_(i,e){let t=ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function b_(i,e){let t=ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function M_(i,e){i.uniform1iv(this.addr,e)}function S_(i,e){i.uniform2iv(this.addr,e)}function T_(i,e){i.uniform3iv(this.addr,e)}function E_(i,e){i.uniform4iv(this.addr,e)}function w_(i,e){i.uniform1uiv(this.addr,e)}function A_(i,e){i.uniform2uiv(this.addr,e)}function R_(i,e){i.uniform3uiv(this.addr,e)}function C_(i,e){i.uniform4uiv(this.addr,e)}function I_(i,e,t){let n=this.cache,s=e.length,r=Fa(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Sd,r[o])}function P_(i,e,t){let n=this.cache,s=e.length,r=Fa(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ed,r[o])}function L_(i,e,t){let n=this.cache,s=e.length,r=Fa(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||wd,r[o])}function D_(i,e,t){let n=this.cache,s=e.length,r=Fa(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Td,r[o])}function N_(i){switch(i){case 5126:return m_;case 35664:return g_;case 35665:return __;case 35666:return x_;case 35674:return y_;case 35675:return v_;case 35676:return b_;case 5124:case 35670:return M_;case 35667:case 35671:return S_;case 35668:case 35672:return T_;case 35669:case 35673:return E_;case 5125:return w_;case 36294:return A_;case 36295:return R_;case 36296:return C_;case 35678:case 36198:case 36298:case 36306:case 35682:return I_;case 35679:case 36299:case 36307:return P_;case 35680:case 36300:case 36308:case 36293:return L_;case 36289:case 36303:case 36311:case 36292:return D_}}var dc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=p_(t.type)}},fc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=N_(t.type)}},pc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},uc=/(\w+)(\])?(\[|\.)?/g;function ud(i,e){i.seq.push(e),i.map[e.id]=e}function U_(i,e,t){let n=i.name,s=n.length;for(uc.lastIndex=0;;){let r=uc.exec(n),o=uc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ud(t,l===void 0?new dc(a,i,e):new fc(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new pc(a),ud(t,h)),t=h}}}var Bs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);U_(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function dd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var O_=37297,F_=0;function B_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var fd=new Ue;function k_(i){We._getMatrix(fd,We.workingColorSpace,i);let e=`mat3( ${fd.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(i)){case or:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function pd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+B_(i.getShaderSource(e),a)}else return r}function z_(i,e){let t=k_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function H_(i,e){let t;switch(e){case Cu:t="Linear";break;case Iu:t="Reinhard";break;case Pu:t="Cineon";break;case Yo:t="ACESFilmic";break;case Du:t="AgX";break;case Nu:t="Neutral";break;case Lu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Na=new C;function V_(){We.getLuminanceCoefficients(Na);let i=Na.x.toFixed(4),e=Na.y.toFixed(4),t=Na.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function G_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kr).join(`
`)}function W_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function X_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function kr(i){return i!==""}function md(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function mc(i){return i.replace(q_,Z_)}var Y_=new Map;function Z_(i,e){let t=ke[e];if(t===void 0){let n=Y_.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return mc(t)}var K_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _d(i){return i.replace(K_,$_)}function $_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function J_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Fl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===lu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Fn&&(e="SHADOWMAP_TYPE_VSM"),e}function j_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case zi:case Hi:e="ENVMAP_TYPE_CUBE";break;case Dr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Q_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Hi:e="ENVMAP_MODE_REFRACTION";break}return e}function e0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hl:e="ENVMAP_BLENDING_MULTIPLY";break;case Au:e="ENVMAP_BLENDING_MIX";break;case Ru:e="ENVMAP_BLENDING_ADD";break}return e}function t0(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function n0(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=J_(t),l=j_(t),u=Q_(t),h=e0(t),d=t0(t),p=G_(t),g=W_(r),_=s.createProgram(),m,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(kr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(kr).join(`
`),f.length>0&&(f+=`
`)):(m=[xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),f=[xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?ke.tonemapping_pars_fragment:"",t.toneMapping!==ti?H_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,z_("linearToOutputTexel",t.outputColorSpace),V_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kr).join(`
`)),o=mc(o),o=md(o,t),o=gd(o,t),a=mc(a),a=md(a,t),a=gd(a,t),o=_d(o),a=_d(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let S=E+m+o,v=E+f+a,R=dd(s,s.VERTEX_SHADER,S),w=dd(s,s.FRAGMENT_SHADER,v);s.attachShader(_,R),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function I(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(_)||"",z=s.getShaderInfoLog(R)||"",G=s.getShaderInfoLog(w)||"",q=F.trim(),W=z.trim(),te=G.trim(),H=!0,re=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,w);else{let ce=pd(s,R,"vertex"),Se=pd(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+q+`
`+ce+`
`+Se)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(W===""||te==="")&&(re=!1);re&&(P.diagnostics={runnable:H,programLog:q,vertexShader:{log:W,prefix:m},fragmentShader:{log:te,prefix:f}})}s.deleteShader(R),s.deleteShader(w),N=new Bs(s,_),M=X_(s,_)}let N;this.getUniforms=function(){return N===void 0&&I(this),N};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,O_)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=F_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=w,this}var i0=0,gc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new _c(e),t.set(e,n)),n}},_c=class{constructor(e){this.id=i0++,this.code=e,this.usedTimes=0}};function s0(i,e,t,n,s,r,o){let a=new cr,c=new gc,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,b,P,F,z){let G=F.fog,q=z.geometry,W=M.isMeshStandardMaterial?F.environment:null,te=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),H=te&&te.mapping===Dr?te.image.height:null,re=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let ce=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Se=ce!==void 0?ce.length:0,He=0;q.morphAttributes.position!==void 0&&(He=1),q.morphAttributes.normal!==void 0&&(He=2),q.morphAttributes.color!==void 0&&(He=3);let nt,lt,Ze,Y;if(re){let Ke=Bn[re];nt=Ke.vertexShader,lt=Ke.fragmentShader}else nt=M.vertexShader,lt=M.fragmentShader,c.update(M),Ze=c.getVertexShaderID(M),Y=c.getFragmentShaderID(M);let $=i.getRenderTarget(),fe=i.state.buffers.depth.getReversed(),Le=z.isInstancedMesh===!0,Me=z.isBatchedMesh===!0,Xe=!!M.map,Ot=!!M.matcap,A=!!te,ct=!!M.aoMap,Ne=!!M.lightMap,Ie=!!M.bumpMap,ge=!!M.normalMap,ht=!!M.displacementMap,_e=!!M.emissiveMap,Be=!!M.metalnessMap,wt=!!M.roughnessMap,mt=M.anisotropy>0,T=M.clearcoat>0,x=M.dispersion>0,O=M.iridescence>0,X=M.sheen>0,K=M.transmission>0,V=mt&&!!M.anisotropyMap,be=T&&!!M.clearcoatMap,ne=T&&!!M.clearcoatNormalMap,xe=T&&!!M.clearcoatRoughnessMap,ye=O&&!!M.iridescenceMap,Q=O&&!!M.iridescenceThicknessMap,le=X&&!!M.sheenColorMap,Ce=X&&!!M.sheenRoughnessMap,ve=!!M.specularMap,oe=!!M.specularColorMap,Oe=!!M.specularIntensityMap,L=K&&!!M.transmissionMap,ee=K&&!!M.thicknessMap,ie=!!M.gradientMap,de=!!M.alphaMap,J=M.alphaTest>0,Z=!!M.alphaHash,me=!!M.extensions,De=ti;M.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(De=i.toneMapping);let it={shaderID:re,shaderType:M.type,shaderName:M.name,vertexShader:nt,fragmentShader:lt,defines:M.defines,customVertexShaderID:Ze,customFragmentShaderID:Y,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Me,batchingColor:Me&&z._colorsTexture!==null,instancing:Le,instancingColor:Le&&z.instanceColor!==null,instancingMorph:Le&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:$===null?i.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Dt,alphaToCoverage:!!M.alphaToCoverage,map:Xe,matcap:Ot,envMap:A,envMapMode:A&&te.mapping,envMapCubeUVHeight:H,aoMap:ct,lightMap:Ne,bumpMap:Ie,normalMap:ge,displacementMap:d&&ht,emissiveMap:_e,normalMapObjectSpace:ge&&M.normalMapType===ku,normalMapTangentSpace:ge&&M.normalMapType===Jl,metalnessMap:Be,roughnessMap:wt,anisotropy:mt,anisotropyMap:V,clearcoat:T,clearcoatMap:be,clearcoatNormalMap:ne,clearcoatRoughnessMap:xe,dispersion:x,iridescence:O,iridescenceMap:ye,iridescenceThicknessMap:Q,sheen:X,sheenColorMap:le,sheenRoughnessMap:Ce,specularMap:ve,specularColorMap:oe,specularIntensityMap:Oe,transmission:K,transmissionMap:L,thicknessMap:ee,gradientMap:ie,opaque:M.transparent===!1&&M.blending===Pi&&M.alphaToCoverage===!1,alphaMap:de,alphaTest:J,alphaHash:Z,combine:M.combine,mapUv:Xe&&_(M.map.channel),aoMapUv:ct&&_(M.aoMap.channel),lightMapUv:Ne&&_(M.lightMap.channel),bumpMapUv:Ie&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:ht&&_(M.displacementMap.channel),emissiveMapUv:_e&&_(M.emissiveMap.channel),metalnessMapUv:Be&&_(M.metalnessMap.channel),roughnessMapUv:wt&&_(M.roughnessMap.channel),anisotropyMapUv:V&&_(M.anisotropyMap.channel),clearcoatMapUv:be&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:le&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&_(M.sheenRoughnessMap.channel),specularMapUv:ve&&_(M.specularMap.channel),specularColorMapUv:oe&&_(M.specularColorMap.channel),specularIntensityMapUv:Oe&&_(M.specularIntensityMap.channel),transmissionMapUv:L&&_(M.transmissionMap.channel),thicknessMapUv:ee&&_(M.thicknessMap.channel),alphaMapUv:de&&_(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(ge||mt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!q.attributes.uv&&(Xe||de),fog:!!G,useFog:M.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:fe,skinning:z.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:He,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:Xe&&M.map.isVideoTexture===!0&&We.getTransfer(M.map.colorSpace)===Je,decodeVideoTextureEmissive:_e&&M.emissiveMap.isVideoTexture===!0&&We.getTransfer(M.emissiveMap.colorSpace)===Je,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===jt,flipSided:M.side===Wt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:me&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&M.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return it.vertexUv1s=l.has(1),it.vertexUv2s=l.has(2),it.vertexUv3s=l.has(3),l.clear(),it}function f(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let P in M.defines)b.push(P),b.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(E(b,M),S(b,M),b.push(i.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function E(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function S(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){let b=g[M.type],P;if(b){let F=Bn[b];P=$u.clone(F.uniforms)}else P=M.uniforms;return P}function R(M,b){let P;for(let F=0,z=u.length;F<z;F++){let G=u[F];if(G.cacheKey===b){P=G,++P.usedTimes;break}}return P===void 0&&(P=new n0(i,b,M,r),u.push(P)),P}function w(M){if(--M.usedTimes===0){let b=u.indexOf(M);u[b]=u[u.length-1],u.pop(),M.destroy()}}function I(M){c.remove(M)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:R,releaseProgram:w,releaseShaderCache:I,programs:u,dispose:N}}function r0(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function o0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function yd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function vd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,d,p,g,_,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=_,f.group=m),e++,f}function a(h,d,p,g,_,m){let f=o(h,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(h,d,p,g,_,m){let f=o(h,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(h,d){t.length>1&&t.sort(h||o0),n.length>1&&n.sort(d||yd),s.length>1&&s.sort(d||yd)}function u(){for(let h=e,d=i.length;h<d;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function a0(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new vd,i.set(n,[o])):s>=r.length?(o=new vd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function l0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Ee};break;case"SpotLight":t={position:new C,direction:new C,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function c0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var h0=0;function u0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function d0(i){let e=new l0,t=c0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);let s=new C,r=new Fe,o=new Fe;function a(l){let u=0,h=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,E=0,S=0,v=0,R=0,w=0,I=0;l.sort(u0);for(let M=0,b=l.length;M<b;M++){let P=l[M],F=P.color,z=P.intensity,G=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=F.r*z,h+=F.g*z,d+=F.b*z;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],z);I++}else if(P.isDirectionalLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let te=P.shadow,H=t.get(P);H.shadowIntensity=te.intensity,H.shadowBias=te.bias,H.shadowNormalBias=te.normalBias,H.shadowRadius=te.radius,H.shadowMapSize=te.mapSize,n.directionalShadow[p]=H,n.directionalShadowMap[p]=q,n.directionalShadowMatrix[p]=P.shadow.matrix,E++}n.directional[p]=W,p++}else if(P.isSpotLight){let W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(F).multiplyScalar(z),W.distance=G,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[_]=W;let te=P.shadow;if(P.map&&(n.spotLightMap[R]=P.map,R++,te.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[_]=te.matrix,P.castShadow){let H=t.get(P);H.shadowIntensity=te.intensity,H.shadowBias=te.bias,H.shadowNormalBias=te.normalBias,H.shadowRadius=te.radius,H.shadowMapSize=te.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=q,v++}_++}else if(P.isRectAreaLight){let W=e.get(P);W.color.copy(F).multiplyScalar(z),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let te=P.shadow,H=t.get(P);H.shadowIntensity=te.intensity,H.shadowBias=te.bias,H.shadowNormalBias=te.normalBias,H.shadowRadius=te.radius,H.shadowMapSize=te.mapSize,H.shadowCameraNear=te.camera.near,H.shadowCameraFar=te.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=W,g++}else if(P.isHemisphereLight){let W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(z),W.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[f]=W,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let N=n.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==f||N.numDirectionalShadows!==E||N.numPointShadows!==S||N.numSpotShadows!==v||N.numSpotMaps!==R||N.numLightProbes!==I)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=I,N.directionalLength=p,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=f,N.numDirectionalShadows=E,N.numPointShadows=S,N.numSpotShadows=v,N.numSpotMaps=R,N.numLightProbes=I,n.version=h0++)}function c(l,u){let h=0,d=0,p=0,g=0,_=0,m=u.matrixWorldInverse;for(let f=0,E=l.length;f<E;f++){let S=l[f];if(S.isDirectionalLight){let v=n.directional[h];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(S.isSpotLight){let v=n.spot[p];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(S.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){let v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function bd(i){let e=new d0(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function f0(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new bd(i),e.set(s,[a])):r>=o.length?(a=new bd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var p0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function g0(i,e,t){let n=new Ts,s=new Ae,r=new Ae,o=new Ye,a=new Po({depthPacking:Bu}),c=new Lo,l={},u=t.maxTextureSize,h={[yn]:Wt,[Wt]:yn,[jt]:jt},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:p0,fragmentShader:m0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Ut;g.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new st(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fl;let f=this.type;this.render=function(w,I,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let M=i.getRenderTarget(),b=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(ei),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let z=f!==Fn&&this.type===Fn,G=f===Fn&&this.type!==Fn;for(let q=0,W=w.length;q<W;q++){let te=w[q],H=te.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let re=H.getFrameExtents();if(s.multiply(re),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/re.x),s.x=r.x*re.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/re.y),s.y=r.y*re.y,H.mapSize.y=r.y)),H.map===null||z===!0||G===!0){let Se=this.type!==Fn?{minFilter:Lt,magFilter:Lt}:{};H.map!==null&&H.map.dispose(),H.map=new In(s.x,s.y,Se),H.map.texture.name=te.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();let ce=H.getViewportCount();for(let Se=0;Se<ce;Se++){let He=H.getViewport(Se);o.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),F.viewport(o),H.updateMatrices(te,Se),n=H.getFrustum(),v(I,N,H.camera,te,this.type)}H.isPointLightShadow!==!0&&this.type===Fn&&E(H,N),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(M,b,P)};function E(w,I){let N=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new In(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(I,null,N,d,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(I,null,N,p,_,null)}function S(w,I,N,M){let b=null,P=N.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)b=P;else if(b=N.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let F=b.uuid,z=I.uuid,G=l[F];G===void 0&&(G={},l[F]=G);let q=G[z];q===void 0&&(q=b.clone(),G[z]=q,I.addEventListener("dispose",R)),b=q}if(b.visible=I.visible,b.wireframe=I.wireframe,M===Fn?b.side=I.shadowSide!==null?I.shadowSide:I.side:b.side=I.shadowSide!==null?I.shadowSide:h[I.side],b.alphaMap=I.alphaMap,b.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,b.map=I.map,b.clipShadows=I.clipShadows,b.clippingPlanes=I.clippingPlanes,b.clipIntersection=I.clipIntersection,b.displacementMap=I.displacementMap,b.displacementScale=I.displacementScale,b.displacementBias=I.displacementBias,b.wireframeLinewidth=I.wireframeLinewidth,b.linewidth=I.linewidth,N.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let F=i.properties.get(b);F.light=N}return b}function v(w,I,N,M,b){if(w.visible===!1)return;if(w.layers.test(I.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===Fn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,w.matrixWorld);let z=e.update(w),G=w.material;if(Array.isArray(G)){let q=z.groups;for(let W=0,te=q.length;W<te;W++){let H=q[W],re=G[H.materialIndex];if(re&&re.visible){let ce=S(w,re,M,b);w.onBeforeShadow(i,w,I,N,z,ce,H),i.renderBufferDirect(N,null,z,ce,w,H),w.onAfterShadow(i,w,I,N,z,ce,H)}}}else if(G.visible){let q=S(w,G,M,b);w.onBeforeShadow(i,w,I,N,z,q,null),i.renderBufferDirect(N,null,z,q,w,null),w.onAfterShadow(i,w,I,N,z,q,null)}}let F=w.children;for(let z=0,G=F.length;z<G;z++)v(F[z],I,N,M,b)}function R(w){w.target.removeEventListener("dispose",R);for(let N in l){let M=l[N],b=w.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}var _0={[zo]:Ho,[Vo]:Xo,[Go]:qo,[Li]:Wo,[Ho]:zo,[Xo]:Vo,[qo]:Go,[Wo]:Li};function x0(i,e){function t(){let L=!1,ee=new Ye,ie=null,de=new Ye(0,0,0,0);return{setMask:function(J){ie!==J&&!L&&(i.colorMask(J,J,J,J),ie=J)},setLocked:function(J){L=J},setClear:function(J,Z,me,De,it){it===!0&&(J*=De,Z*=De,me*=De),ee.set(J,Z,me,De),de.equals(ee)===!1&&(i.clearColor(J,Z,me,De),de.copy(ee))},reset:function(){L=!1,ie=null,de.set(-1,0,0,0)}}}function n(){let L=!1,ee=!1,ie=null,de=null,J=null;return{setReversed:function(Z){if(ee!==Z){let me=e.get("EXT_clip_control");Z?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),ee=Z;let De=J;J=null,this.setClear(De)}},getReversed:function(){return ee},setTest:function(Z){Z?$(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(Z){ie!==Z&&!L&&(i.depthMask(Z),ie=Z)},setFunc:function(Z){if(ee&&(Z=_0[Z]),de!==Z){switch(Z){case zo:i.depthFunc(i.NEVER);break;case Ho:i.depthFunc(i.ALWAYS);break;case Vo:i.depthFunc(i.LESS);break;case Li:i.depthFunc(i.LEQUAL);break;case Go:i.depthFunc(i.EQUAL);break;case Wo:i.depthFunc(i.GEQUAL);break;case Xo:i.depthFunc(i.GREATER);break;case qo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=Z}},setLocked:function(Z){L=Z},setClear:function(Z){J!==Z&&(ee&&(Z=1-Z),i.clearDepth(Z),J=Z)},reset:function(){L=!1,ie=null,de=null,J=null,ee=!1}}}function s(){let L=!1,ee=null,ie=null,de=null,J=null,Z=null,me=null,De=null,it=null;return{setTest:function(Ke){L||(Ke?$(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(Ke){ee!==Ke&&!L&&(i.stencilMask(Ke),ee=Ke)},setFunc:function(Ke,Hn,wn){(ie!==Ke||de!==Hn||J!==wn)&&(i.stencilFunc(Ke,Hn,wn),ie=Ke,de=Hn,J=wn)},setOp:function(Ke,Hn,wn){(Z!==Ke||me!==Hn||De!==wn)&&(i.stencilOp(Ke,Hn,wn),Z=Ke,me=Hn,De=wn)},setLocked:function(Ke){L=Ke},setClear:function(Ke){it!==Ke&&(i.clearStencil(Ke),it=Ke)},reset:function(){L=!1,ee=null,ie=null,de=null,J=null,Z=null,me=null,De=null,it=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},h={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,E=null,S=null,v=null,R=null,w=null,I=new Ee(0,0,0),N=0,M=!1,b=null,P=null,F=null,z=null,G=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,te=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=te>=1):H.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=te>=2);let re=null,ce={},Se=i.getParameter(i.SCISSOR_BOX),He=i.getParameter(i.VIEWPORT),nt=new Ye().fromArray(Se),lt=new Ye().fromArray(He);function Ze(L,ee,ie,de){let J=new Uint8Array(4),Z=i.createTexture();i.bindTexture(L,Z),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let me=0;me<ie;me++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,de,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(ee+me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return Z}let Y={};Y[i.TEXTURE_2D]=Ze(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),$(i.DEPTH_TEST),o.setFunc(Li),Ie(!1),ge(Ol),$(i.CULL_FACE),ct(ei);function $(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function fe(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function Le(L,ee){return h[L]!==ee?(i.bindFramebuffer(L,ee),h[L]=ee,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ee),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Me(L,ee){let ie=p,de=!1;if(L){ie=d.get(ee),ie===void 0&&(ie=[],d.set(ee,ie));let J=L.textures;if(ie.length!==J.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,me=J.length;Z<me;Z++)ie[Z]=i.COLOR_ATTACHMENT0+Z;ie.length=J.length,de=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,de=!0);de&&i.drawBuffers(ie)}function Xe(L){return g!==L?(i.useProgram(L),g=L,!0):!1}let Ot={[pi]:i.FUNC_ADD,[hu]:i.FUNC_SUBTRACT,[uu]:i.FUNC_REVERSE_SUBTRACT};Ot[du]=i.MIN,Ot[fu]=i.MAX;let A={[pu]:i.ZERO,[mu]:i.ONE,[gu]:i.SRC_COLOR,[yo]:i.SRC_ALPHA,[Mu]:i.SRC_ALPHA_SATURATE,[vu]:i.DST_COLOR,[xu]:i.DST_ALPHA,[_u]:i.ONE_MINUS_SRC_COLOR,[vo]:i.ONE_MINUS_SRC_ALPHA,[bu]:i.ONE_MINUS_DST_COLOR,[yu]:i.ONE_MINUS_DST_ALPHA,[Su]:i.CONSTANT_COLOR,[Tu]:i.ONE_MINUS_CONSTANT_COLOR,[Eu]:i.CONSTANT_ALPHA,[wu]:i.ONE_MINUS_CONSTANT_ALPHA};function ct(L,ee,ie,de,J,Z,me,De,it,Ke){if(L===ei){_===!0&&(fe(i.BLEND),_=!1);return}if(_===!1&&($(i.BLEND),_=!0),L!==cu){if(L!==m||Ke!==M){if((f!==pi||v!==pi)&&(i.blendEquation(i.FUNC_ADD),f=pi,v=pi),Ke)switch(L){case Pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bl:i.blendFunc(i.ONE,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}E=null,S=null,R=null,w=null,I.set(0,0,0),N=0,m=L,M=Ke}return}J=J||ee,Z=Z||ie,me=me||de,(ee!==f||J!==v)&&(i.blendEquationSeparate(Ot[ee],Ot[J]),f=ee,v=J),(ie!==E||de!==S||Z!==R||me!==w)&&(i.blendFuncSeparate(A[ie],A[de],A[Z],A[me]),E=ie,S=de,R=Z,w=me),(De.equals(I)===!1||it!==N)&&(i.blendColor(De.r,De.g,De.b,it),I.copy(De),N=it),m=L,M=!1}function Ne(L,ee){L.side===jt?fe(i.CULL_FACE):$(i.CULL_FACE);let ie=L.side===Wt;ee&&(ie=!ie),Ie(ie),L.blending===Pi&&L.transparent===!1?ct(ei):ct(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let de=L.stencilWrite;a.setTest(de),de&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),_e(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(L){b!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),b=L)}function ge(L){L!==ou?($(i.CULL_FACE),L!==P&&(L===Ol?i.cullFace(i.BACK):L===au?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),P=L}function ht(L){L!==F&&(W&&i.lineWidth(L),F=L)}function _e(L,ee,ie){L?($(i.POLYGON_OFFSET_FILL),(z!==ee||G!==ie)&&(i.polygonOffset(ee,ie),z=ee,G=ie)):fe(i.POLYGON_OFFSET_FILL)}function Be(L){L?$(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function wt(L){L===void 0&&(L=i.TEXTURE0+q-1),re!==L&&(i.activeTexture(L),re=L)}function mt(L,ee,ie){ie===void 0&&(re===null?ie=i.TEXTURE0+q-1:ie=re);let de=ce[ie];de===void 0&&(de={type:void 0,texture:void 0},ce[ie]=de),(de.type!==L||de.texture!==ee)&&(re!==ie&&(i.activeTexture(ie),re=ie),i.bindTexture(L,ee||Y[L]),de.type=L,de.texture=ee)}function T(){let L=ce[re];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(){try{i.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{i.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ne(){try{i.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xe(){try{i.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{i.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function le(L){nt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),nt.copy(L))}function Ce(L){lt.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),lt.copy(L))}function ve(L,ee){let ie=l.get(ee);ie===void 0&&(ie=new WeakMap,l.set(ee,ie));let de=ie.get(L);de===void 0&&(de=i.getUniformBlockIndex(ee,L.name),ie.set(L,de))}function oe(L,ee){let de=l.get(ee).get(L);c.get(ee)!==de&&(i.uniformBlockBinding(ee,de,L.__bindingPointIndex),c.set(ee,de))}function Oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},re=null,ce={},h={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,E=null,S=null,v=null,R=null,w=null,I=new Ee(0,0,0),N=0,M=!1,b=null,P=null,F=null,z=null,G=null,nt.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:$,disable:fe,bindFramebuffer:Le,drawBuffers:Me,useProgram:Xe,setBlending:ct,setMaterial:Ne,setFlipSided:Ie,setCullFace:ge,setLineWidth:ht,setPolygonOffset:_e,setScissorTest:Be,activeTexture:wt,bindTexture:mt,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:ye,texImage3D:Q,updateUBOMapping:ve,uniformBlockBinding:oe,texStorage2D:ne,texStorage3D:xe,texSubImage2D:X,texSubImage3D:K,compressedTexSubImage2D:V,compressedTexSubImage3D:be,scissor:le,viewport:Ce,reset:Oe}}function y0(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ae,u=new WeakMap,h,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return p?new OffscreenCanvas(T,x):_s("canvas")}function _(T,x,O){let X=1,K=mt(T);if((K.width>O||K.height>O)&&(X=O/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let V=Math.floor(X*K.width),be=Math.floor(X*K.height);h===void 0&&(h=g(V,be));let ne=x?g(V,be):h;return ne.width=V,ne.height=be,ne.getContext("2d").drawImage(T,0,0,V,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+V+"x"+be+")."),ne}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,x,O,X,K=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let V=x;if(x===i.RED&&(O===i.FLOAT&&(V=i.R32F),O===i.HALF_FLOAT&&(V=i.R16F),O===i.UNSIGNED_BYTE&&(V=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(V=i.R8UI),O===i.UNSIGNED_SHORT&&(V=i.R16UI),O===i.UNSIGNED_INT&&(V=i.R32UI),O===i.BYTE&&(V=i.R8I),O===i.SHORT&&(V=i.R16I),O===i.INT&&(V=i.R32I)),x===i.RG&&(O===i.FLOAT&&(V=i.RG32F),O===i.HALF_FLOAT&&(V=i.RG16F),O===i.UNSIGNED_BYTE&&(V=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(V=i.RG8UI),O===i.UNSIGNED_SHORT&&(V=i.RG16UI),O===i.UNSIGNED_INT&&(V=i.RG32UI),O===i.BYTE&&(V=i.RG8I),O===i.SHORT&&(V=i.RG16I),O===i.INT&&(V=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(V=i.RGB8UI),O===i.UNSIGNED_SHORT&&(V=i.RGB16UI),O===i.UNSIGNED_INT&&(V=i.RGB32UI),O===i.BYTE&&(V=i.RGB8I),O===i.SHORT&&(V=i.RGB16I),O===i.INT&&(V=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(V=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(V=i.RGBA16UI),O===i.UNSIGNED_INT&&(V=i.RGBA32UI),O===i.BYTE&&(V=i.RGBA8I),O===i.SHORT&&(V=i.RGBA16I),O===i.INT&&(V=i.RGBA32I)),x===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(V=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(V=i.R11F_G11F_B10F)),x===i.RGBA){let be=K?or:We.getTransfer(X);O===i.FLOAT&&(V=i.RGBA32F),O===i.HALF_FLOAT&&(V=i.RGBA16F),O===i.UNSIGNED_BYTE&&(V=be===Je?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(V=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(V=i.RGB5_A1)}return(V===i.R16F||V===i.R32F||V===i.RG16F||V===i.RG32F||V===i.RGBA16F||V===i.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function v(T,x){let O;return T?x===null||x===vi||x===Ds?O=i.DEPTH24_STENCIL8:x===un?O=i.DEPTH32F_STENCIL8:x===Ps&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===vi||x===Ds?O=i.DEPTH_COMPONENT24:x===un?O=i.DEPTH_COMPONENT32F:x===Ps&&(O=i.DEPTH_COMPONENT16),O}function R(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Lt&&T.minFilter!==Gt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function w(T){let x=T.target;x.removeEventListener("dispose",w),N(x),x.isVideoTexture&&u.delete(x)}function I(T){let x=T.target;x.removeEventListener("dispose",I),b(x)}function N(T){let x=n.get(T);if(x.__webglInit===void 0)return;let O=T.source,X=d.get(O);if(X){let K=X[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&M(T),Object.keys(X).length===0&&d.delete(O)}n.remove(T)}function M(T){let x=n.get(T);i.deleteTexture(x.__webglTexture);let O=T.source,X=d.get(O);delete X[x.__cacheKey],o.memory.textures--}function b(T){let x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let K=0;K<x.__webglFramebuffer[X].length;K++)i.deleteFramebuffer(x.__webglFramebuffer[X][K]);else i.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)i.deleteFramebuffer(x.__webglFramebuffer[X]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=T.textures;for(let X=0,K=O.length;X<K;X++){let V=n.get(O[X]);V.__webglTexture&&(i.deleteTexture(V.__webglTexture),o.memory.textures--),n.remove(O[X])}n.remove(T)}let P=0;function F(){P=0}function z(){let T=P;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function G(T){let x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function q(T,x){let O=n.get(T);if(T.isVideoTexture&&Be(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){let X=T.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,T,x);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function W(T,x){let O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Y(O,T,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function te(T,x){let O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Y(O,T,x);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function H(T,x){let O=n.get(T);if(T.version>0&&O.__version!==T.version){$(O,T,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}let re={[mi]:i.REPEAT,[An]:i.CLAMP_TO_EDGE,[ms]:i.MIRRORED_REPEAT},ce={[Lt]:i.NEAREST,[$o]:i.NEAREST_MIPMAP_NEAREST,[Vi]:i.NEAREST_MIPMAP_LINEAR,[Gt]:i.LINEAR,[Is]:i.LINEAR_MIPMAP_NEAREST,[Sn]:i.LINEAR_MIPMAP_LINEAR},Se={[zu]:i.NEVER,[qu]:i.ALWAYS,[Hu]:i.LESS,[jl]:i.LEQUAL,[Vu]:i.EQUAL,[Xu]:i.GEQUAL,[Gu]:i.GREATER,[Wu]:i.NOTEQUAL};function He(T,x){if(x.type===un&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Gt||x.magFilter===Is||x.magFilter===Vi||x.magFilter===Sn||x.minFilter===Gt||x.minFilter===Is||x.minFilter===Vi||x.minFilter===Sn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,re[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,re[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,re[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ce[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ce[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Se[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Lt||x.minFilter!==Vi&&x.minFilter!==Sn||x.type===un&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function nt(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",w));let X=x.source,K=d.get(X);K===void 0&&(K={},d.set(X,K));let V=G(x);if(V!==T.__cacheKey){K[V]===void 0&&(K[V]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),K[V].usedTimes++;let be=K[T.__cacheKey];be!==void 0&&(K[T.__cacheKey].usedTimes--,be.usedTimes===0&&M(x)),T.__cacheKey=V,T.__webglTexture=K[V].texture}return O}function lt(T,x,O){return Math.floor(Math.floor(T/O)/x)}function Ze(T,x,O,X){let V=T.updateRanges;if(V.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,O,X,x.data);else{V.sort((Q,le)=>Q.start-le.start);let be=0;for(let Q=1;Q<V.length;Q++){let le=V[be],Ce=V[Q],ve=le.start+le.count,oe=lt(Ce.start,x.width,4),Oe=lt(le.start,x.width,4);Ce.start<=ve+1&&oe===Oe&&lt(Ce.start+Ce.count-1,x.width,4)===oe?le.count=Math.max(le.count,Ce.start+Ce.count-le.start):(++be,V[be]=Ce)}V.length=be+1;let ne=i.getParameter(i.UNPACK_ROW_LENGTH),xe=i.getParameter(i.UNPACK_SKIP_PIXELS),ye=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Q=0,le=V.length;Q<le;Q++){let Ce=V[Q],ve=Math.floor(Ce.start/4),oe=Math.ceil(Ce.count/4),Oe=ve%x.width,L=Math.floor(ve/x.width),ee=oe,ie=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Oe),i.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,Oe,L,ee,ie,O,X,x.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ne),i.pixelStorei(i.UNPACK_SKIP_PIXELS,xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function Y(T,x,O){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);let K=nt(T,x),V=x.source;t.bindTexture(X,T.__webglTexture,i.TEXTURE0+O);let be=n.get(V);if(V.version!==be.__version||K===!0){t.activeTexture(i.TEXTURE0+O);let ne=We.getPrimaries(We.workingColorSpace),xe=x.colorSpace===ni?null:We.getPrimaries(x.colorSpace),ye=x.colorSpace===ni||ne===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let Q=_(x.image,!1,s.maxTextureSize);Q=wt(x,Q);let le=r.convert(x.format,x.colorSpace),Ce=r.convert(x.type),ve=S(x.internalFormat,le,Ce,x.colorSpace,x.isVideoTexture);He(X,x);let oe,Oe=x.mipmaps,L=x.isVideoTexture!==!0,ee=be.__version===void 0||K===!0,ie=V.dataReady,de=R(x,Q);if(x.isDepthTexture)ve=v(x.format===Ns,x.type),ee&&(L?t.texStorage2D(i.TEXTURE_2D,1,ve,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,ve,Q.width,Q.height,0,le,Ce,null));else if(x.isDataTexture)if(Oe.length>0){L&&ee&&t.texStorage2D(i.TEXTURE_2D,de,ve,Oe[0].width,Oe[0].height);for(let J=0,Z=Oe.length;J<Z;J++)oe=Oe[J],L?ie&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,oe.width,oe.height,le,Ce,oe.data):t.texImage2D(i.TEXTURE_2D,J,ve,oe.width,oe.height,0,le,Ce,oe.data);x.generateMipmaps=!1}else L?(ee&&t.texStorage2D(i.TEXTURE_2D,de,ve,Q.width,Q.height),ie&&Ze(x,Q,le,Ce)):t.texImage2D(i.TEXTURE_2D,0,ve,Q.width,Q.height,0,le,Ce,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){L&&ee&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,ve,Oe[0].width,Oe[0].height,Q.depth);for(let J=0,Z=Oe.length;J<Z;J++)if(oe=Oe[J],x.format!==rn)if(le!==null)if(L){if(ie)if(x.layerUpdates.size>0){let me=rc(oe.width,oe.height,x.format,x.type);for(let De of x.layerUpdates){let it=oe.data.subarray(De*me/oe.data.BYTES_PER_ELEMENT,(De+1)*me/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,De,oe.width,oe.height,1,le,it)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,oe.width,oe.height,Q.depth,le,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,ve,oe.width,oe.height,Q.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ie&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,oe.width,oe.height,Q.depth,le,Ce,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,ve,oe.width,oe.height,Q.depth,0,le,Ce,oe.data)}else{L&&ee&&t.texStorage2D(i.TEXTURE_2D,de,ve,Oe[0].width,Oe[0].height);for(let J=0,Z=Oe.length;J<Z;J++)oe=Oe[J],x.format!==rn?le!==null?L?ie&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,oe.width,oe.height,le,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,J,ve,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ie&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,oe.width,oe.height,le,Ce,oe.data):t.texImage2D(i.TEXTURE_2D,J,ve,oe.width,oe.height,0,le,Ce,oe.data)}else if(x.isDataArrayTexture)if(L){if(ee&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,ve,Q.width,Q.height,Q.depth),ie)if(x.layerUpdates.size>0){let J=rc(Q.width,Q.height,x.format,x.type);for(let Z of x.layerUpdates){let me=Q.data.subarray(Z*J/Q.data.BYTES_PER_ELEMENT,(Z+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,le,Ce,me)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,Ce,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,Q.width,Q.height,Q.depth,0,le,Ce,Q.data);else if(x.isData3DTexture)L?(ee&&t.texStorage3D(i.TEXTURE_3D,de,ve,Q.width,Q.height,Q.depth),ie&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,Ce,Q.data)):t.texImage3D(i.TEXTURE_3D,0,ve,Q.width,Q.height,Q.depth,0,le,Ce,Q.data);else if(x.isFramebufferTexture){if(ee)if(L)t.texStorage2D(i.TEXTURE_2D,de,ve,Q.width,Q.height);else{let J=Q.width,Z=Q.height;for(let me=0;me<de;me++)t.texImage2D(i.TEXTURE_2D,me,ve,J,Z,0,le,Ce,null),J>>=1,Z>>=1}}else if(Oe.length>0){if(L&&ee){let J=mt(Oe[0]);t.texStorage2D(i.TEXTURE_2D,de,ve,J.width,J.height)}for(let J=0,Z=Oe.length;J<Z;J++)oe=Oe[J],L?ie&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le,Ce,oe):t.texImage2D(i.TEXTURE_2D,J,ve,le,Ce,oe);x.generateMipmaps=!1}else if(L){if(ee){let J=mt(Q);t.texStorage2D(i.TEXTURE_2D,de,ve,J.width,J.height)}ie&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,Ce,Q)}else t.texImage2D(i.TEXTURE_2D,0,ve,le,Ce,Q);m(x)&&f(X),be.__version=V.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function $(T,x,O){if(x.image.length!==6)return;let X=nt(T,x),K=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);let V=n.get(K);if(K.version!==V.__version||X===!0){t.activeTexture(i.TEXTURE0+O);let be=We.getPrimaries(We.workingColorSpace),ne=x.colorSpace===ni?null:We.getPrimaries(x.colorSpace),xe=x.colorSpace===ni||be===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let ye=x.isCompressedTexture||x.image[0].isCompressedTexture,Q=x.image[0]&&x.image[0].isDataTexture,le=[];for(let Z=0;Z<6;Z++)!ye&&!Q?le[Z]=_(x.image[Z],!0,s.maxCubemapSize):le[Z]=Q?x.image[Z].image:x.image[Z],le[Z]=wt(x,le[Z]);let Ce=le[0],ve=r.convert(x.format,x.colorSpace),oe=r.convert(x.type),Oe=S(x.internalFormat,ve,oe,x.colorSpace),L=x.isVideoTexture!==!0,ee=V.__version===void 0||X===!0,ie=K.dataReady,de=R(x,Ce);He(i.TEXTURE_CUBE_MAP,x);let J;if(ye){L&&ee&&t.texStorage2D(i.TEXTURE_CUBE_MAP,de,Oe,Ce.width,Ce.height);for(let Z=0;Z<6;Z++){J=le[Z].mipmaps;for(let me=0;me<J.length;me++){let De=J[me];x.format!==rn?ve!==null?L?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me,0,0,De.width,De.height,ve,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me,Oe,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me,0,0,De.width,De.height,ve,oe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me,Oe,De.width,De.height,0,ve,oe,De.data)}}}else{if(J=x.mipmaps,L&&ee){J.length>0&&de++;let Z=mt(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,de,Oe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){L?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,le[Z].width,le[Z].height,ve,oe,le[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Oe,le[Z].width,le[Z].height,0,ve,oe,le[Z].data);for(let me=0;me<J.length;me++){let it=J[me].image[Z].image;L?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me+1,0,0,it.width,it.height,ve,oe,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me+1,Oe,it.width,it.height,0,ve,oe,it.data)}}else{L?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ve,oe,le[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Oe,ve,oe,le[Z]);for(let me=0;me<J.length;me++){let De=J[me];L?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me+1,0,0,ve,oe,De.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,me+1,Oe,ve,oe,De.image[Z])}}}m(x)&&f(i.TEXTURE_CUBE_MAP),V.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function fe(T,x,O,X,K,V){let be=r.convert(O.format,O.colorSpace),ne=r.convert(O.type),xe=S(O.internalFormat,be,ne,O.colorSpace),ye=n.get(x),Q=n.get(O);if(Q.__renderTarget=x,!ye.__hasExternalTextures){let le=Math.max(1,x.width>>V),Ce=Math.max(1,x.height>>V);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,V,xe,le,Ce,x.depth,0,be,ne,null):t.texImage2D(K,V,xe,le,Ce,0,be,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),_e(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,K,Q.__webglTexture,0,ht(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,K,Q.__webglTexture,V),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(T,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){let X=x.depthTexture,K=X&&X.isDepthTexture?X.type:null,V=v(x.stencilBuffer,K),be=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=ht(x);_e(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,V,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,V,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,V,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,T)}else{let X=x.textures;for(let K=0;K<X.length;K++){let V=X[K],be=r.convert(V.format,V.colorSpace),ne=r.convert(V.type),xe=S(V.internalFormat,be,ne,V.colorSpace),ye=ht(x);O&&_e(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,xe,x.width,x.height):_e(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,xe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,xe,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),q(x.depthTexture,0);let K=X.__webglTexture,V=ht(x);if(x.depthTexture.format===gs)_e(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(x.depthTexture.format===Ns)_e(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Xe(T){let x=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){let X=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){let K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=X}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let X=T.texture.mipmaps;X&&X.length>0?Me(x.__webglFramebuffer[0],T):Me(x.__webglFramebuffer,T)}else if(O){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=i.createRenderbuffer(),Le(x.__webglDepthbuffer[X],T,!1);else{let K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,V)}}else{let X=T.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Le(x.__webglDepthbuffer,T,!1);else{let K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,V)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(T,x,O){let X=n.get(T);x!==void 0&&fe(X.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Xe(T)}function A(T){let x=T.texture,O=n.get(T),X=n.get(x);T.addEventListener("dispose",I);let K=T.textures,V=T.isWebGLCubeRenderTarget===!0,be=K.length>1;if(be||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,o.memory.textures++),V){O.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[ne]=[];for(let xe=0;xe<x.mipmaps.length;xe++)O.__webglFramebuffer[ne][xe]=i.createFramebuffer()}else O.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let ne=0;ne<x.mipmaps.length;ne++)O.__webglFramebuffer[ne]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(be)for(let ne=0,xe=K.length;ne<xe;ne++){let ye=n.get(K[ne]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&_e(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ne=0;ne<K.length;ne++){let xe=K[ne];O.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ne]);let ye=r.convert(xe.format,xe.colorSpace),Q=r.convert(xe.type),le=S(xe.internalFormat,ye,Q,xe.colorSpace,T.isXRRenderTarget===!0),Ce=ht(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,le,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,O.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(V){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),He(i.TEXTURE_CUBE_MAP,x);for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)fe(O.__webglFramebuffer[ne][xe],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe);else fe(O.__webglFramebuffer[ne],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(x)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ne=0,xe=K.length;ne<xe;ne++){let ye=K[ne],Q=n.get(ye),le=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,Q.__webglTexture),He(le,ye),fe(O.__webglFramebuffer,T,ye,i.COLOR_ATTACHMENT0+ne,le,0),m(ye)&&f(le)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ne=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,X.__webglTexture),He(ne,x),x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)fe(O.__webglFramebuffer[xe],T,x,i.COLOR_ATTACHMENT0,ne,xe);else fe(O.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,ne,0);m(x)&&f(ne),t.unbindTexture()}T.depthBuffer&&Xe(T)}function ct(T){let x=T.textures;for(let O=0,X=x.length;O<X;O++){let K=x[O];if(m(K)){let V=E(T),be=n.get(K).__webglTexture;t.bindTexture(V,be),f(V),t.unbindTexture()}}}let Ne=[],Ie=[];function ge(T){if(T.samples>0){if(_e(T)===!1){let x=T.textures,O=T.width,X=T.height,K=i.COLOR_BUFFER_BIT,V=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(T),ne=x.length>1;if(ne)for(let ye=0;ye<x.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let xe=T.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ye=0;ye<x.length;ye++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);let Q=n.get(x[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,O,X,0,0,O,X,K,i.NEAREST),c===!0&&(Ne.length=0,Ie.length=0,Ne.push(i.COLOR_ATTACHMENT0+ye),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ne.push(V),Ie.push(V),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ie)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let ye=0;ye<x.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);let Q=n.get(x[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,Q,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ht(T){return Math.min(s.maxSamples,T.samples)}function _e(T){let x=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Be(T){let x=o.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function wt(T,x){let O=T.colorSpace,X=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==Dt&&O!==ni&&(We.getTransfer(O)===Je?(X!==rn||K!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=F,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=te,this.setTextureCube=H,this.rebindTextures=Ot,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=_e}function v0(i,e){function t(n,s=ni){let r,o=We.getTransfer(s);if(n===Tn)return i.UNSIGNED_BYTE;if(n===jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ql)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gl)return i.BYTE;if(n===Wl)return i.SHORT;if(n===Ps)return i.UNSIGNED_SHORT;if(n===Jo)return i.INT;if(n===vi)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===Ls)return i.HALF_FLOAT;if(n===Yl)return i.ALPHA;if(n===Zl)return i.RGB;if(n===rn)return i.RGBA;if(n===gs)return i.DEPTH_COMPONENT;if(n===Ns)return i.DEPTH_STENCIL;if(n===ea)return i.RED;if(n===ta)return i.RED_INTEGER;if(n===Kl)return i.RG;if(n===na)return i.RG_INTEGER;if(n===ia)return i.RGBA_INTEGER;if(n===Nr||n===Ur||n===Or||n===Fr)if(o===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sa||n===ra||n===oa||n===aa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===la||n===ca||n===ha)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===la||n===ca)return o===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ha)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===ya||n===va||n===ba||n===Ma||n===Sa||n===Ta)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ua)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===da)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ma)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ga)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_a)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ya)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===va)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ba)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ma)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ta)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ea||n===wa||n===Aa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ea)return o===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Aa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ra||n===Ca||n===Ia||n===Pa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ra)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ca)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ia)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var b0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Mr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new bn({vertexShader:b0,fragmentShader:M0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new Oi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yc=class extends Cn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,g=null,_=typeof XRWebGLBinding<"u",m=new xc,f={},E=t.getContextAttributes(),S=null,v=null,R=[],w=[],I=new Ae,N=null,M=new xt;M.viewport=new Ye;let b=new xt;b.viewport=new Ye;let P=[M,b],F=new ko,z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=R[Y];return $===void 0&&($=new vs,R[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=R[Y];return $===void 0&&($=new vs,R[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=R[Y];return $===void 0&&($=new vs,R[Y]=$),$.getHandSpace()};function q(Y){let $=w.indexOf(Y.inputSource);if($===-1)return;let fe=R[$];fe!==void 0&&(fe.update(Y.inputSource,Y.frame,l||o),fe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",te);for(let Y=0;Y<R.length;Y++){let $=w[Y];$!==null&&(w[Y]=null,R[Y].disconnect($))}z=null,G=null,m.reset();for(let Y in f)delete f[Y];e.setRenderTarget(S),p=null,d=null,h=null,s=null,v=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",W),s.addEventListener("inputsourceschange",te),E.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(I),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Le=null,Me=null;E.depth&&(Me=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=E.stencil?Ns:gs,Le=E.stencil?Ds:vi);let Xe={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Xe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new In(d.textureWidth,d.textureHeight,{format:rn,type:Tn,depthTexture:new br(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let fe={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,fe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new In(p.framebufferWidth,p.framebufferHeight,{format:rn,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(Y){for(let $=0;$<Y.removed.length;$++){let fe=Y.removed[$],Le=w.indexOf(fe);Le>=0&&(w[Le]=null,R[Le].disconnect(fe))}for(let $=0;$<Y.added.length;$++){let fe=Y.added[$],Le=w.indexOf(fe);if(Le===-1){for(let Xe=0;Xe<R.length;Xe++)if(Xe>=w.length){w.push(fe),Le=Xe;break}else if(w[Xe]===null){w[Xe]=fe,Le=Xe;break}if(Le===-1)break}let Me=R[Le];Me&&Me.connect(fe)}}let H=new C,re=new C;function ce(Y,$,fe){H.setFromMatrixPosition($.matrixWorld),re.setFromMatrixPosition(fe.matrixWorld);let Le=H.distanceTo(re),Me=$.projectionMatrix.elements,Xe=fe.projectionMatrix.elements,Ot=Me[14]/(Me[10]-1),A=Me[14]/(Me[10]+1),ct=(Me[9]+1)/Me[5],Ne=(Me[9]-1)/Me[5],Ie=(Me[8]-1)/Me[0],ge=(Xe[8]+1)/Xe[0],ht=Ot*Ie,_e=Ot*ge,Be=Le/(-Ie+ge),wt=Be*-Ie;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(wt),Y.translateZ(Be),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Me[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let mt=Ot+Be,T=A+Be,x=ht-wt,O=_e+(Le-wt),X=ct*A/T*mt,K=Ne*A/T*mt;Y.projectionMatrix.makePerspective(x,O,X,K,mt,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Se(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let $=Y.near,fe=Y.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),F.near=b.near=M.near=$,F.far=b.far=M.far=fe,(z!==F.near||G!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),z=F.near,G=F.far),F.layers.mask=Y.layers.mask|6,M.layers.mask=F.layers.mask&3,b.layers.mask=F.layers.mask&5;let Le=Y.parent,Me=F.cameras;Se(F,Le);for(let Xe=0;Xe<Me.length;Xe++)Se(Me[Xe],Le);Me.length===2?ce(F,M,b):F.projectionMatrix.copy(M.projectionMatrix),He(Y,F,Le)};function He(Y,$,fe){fe===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(fe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ui*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return f[Y]};let nt=null;function lt(Y,$){if(u=$.getViewerPose(l||o),g=$,u!==null){let fe=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let Le=!1;fe.length!==F.cameras.length&&(F.cameras.length=0,Le=!0);for(let A=0;A<fe.length;A++){let ct=fe[A],Ne=null;if(p!==null)Ne=p.getViewport(ct);else{let ge=h.getViewSubImage(d,ct);Ne=ge.viewport,A===0&&(e.setRenderTargetTextures(v,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(v))}let Ie=P[A];Ie===void 0&&(Ie=new xt,Ie.layers.enable(A),Ie.viewport=new Ye,P[A]=Ie),Ie.matrix.fromArray(ct.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(ct.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),A===0&&(F.matrix.copy(Ie.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Le===!0&&F.cameras.push(Ie)}let Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=n.getBinding();let A=h.getDepthInformation(fe[0]);A&&A.isValid&&A.texture&&m.init(A,s.renderState)}if(Me&&Me.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let A=0;A<fe.length;A++){let ct=fe[A].camera;if(ct){let Ne=f[ct];Ne||(Ne=new Mr,f[ct]=Ne);let Ie=h.getCameraImage(ct);Ne.sourceTexture=Ie}}}}for(let fe=0;fe<R.length;fe++){let Le=w[fe],Me=R[fe];Le!==null&&Me!==void 0&&Me.update(Le,$,l||o)}nt&&nt(Y,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let Ze=new Md;Ze.setAnimationLoop(lt),this.setAnimationLoop=function(Y){nt=Y},this.dispose=function(){}}},Xi=new vn,S0=new Fe;function T0(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,nc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,E,S,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,E,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Wt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Wt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let E=e.get(f),S=E.envMap,v=E.envMapRotation;S&&(m.envMap.value=S,Xi.copy(v),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),m.envMapRotation.value.setFromMatrix4(S0.makeRotationFromEuler(Xi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,E,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=S*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Wt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function E0(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,S){let v=S.program;n.uniformBlockBinding(E,v)}function l(E,S){let v=s[E.id];v===void 0&&(g(E),v=u(E),s[E.id]=v,E.addEventListener("dispose",m));let R=S.program;n.updateUBOMapping(E,R);let w=e.render.frame;r[E.id]!==w&&(d(E),r[E.id]=w)}function u(E){let S=h();E.__bindingPointIndex=S;let v=i.createBuffer(),R=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let S=s[E.id],v=E.uniforms,R=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,I=v.length;w<I;w++){let N=Array.isArray(v[w])?v[w]:[v[w]];for(let M=0,b=N.length;M<b;M++){let P=N[M];if(p(P,w,M,R)===!0){let F=P.__offset,z=Array.isArray(P.value)?P.value:[P.value],G=0;for(let q=0;q<z.length;q++){let W=z[q],te=_(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,F+G,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,G),G+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,S,v,R){let w=E.value,I=S+"_"+v;if(R[I]===void 0)return typeof w=="number"||typeof w=="boolean"?R[I]=w:R[I]=w.clone(),!0;{let N=R[I];if(typeof w=="number"||typeof w=="boolean"){if(N!==w)return R[I]=w,!0}else if(N.equals(w)===!1)return N.copy(w),!0}return!1}function g(E){let S=E.uniforms,v=0,R=16;for(let I=0,N=S.length;I<N;I++){let M=Array.isArray(S[I])?S[I]:[S[I]];for(let b=0,P=M.length;b<P;b++){let F=M[b],z=Array.isArray(F.value)?F.value:[F.value];for(let G=0,q=z.length;G<q;G++){let W=z[G],te=_(W),H=v%R,re=H%te.boundary,ce=H+re;v+=re,ce!==0&&R-ce<te.storage&&(v+=R-ce),F.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=te.storage}}}let w=v%R;return w>0&&(v+=R-w),E.__size=v,E.__cache={},this}function _(E){let S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){let S=E.target;S.removeEventListener("dispose",m);let v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function f(){for(let E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}var Oa=class{constructor(e={}){let{canvas:t=Yu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,f=null,E=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,R=!1;this._outputColorSpace=gt;let w=0,I=0,N=null,M=-1,b=null,P=new Ye,F=new Ye,z=null,G=new Ee(0),q=0,W=t.width,te=t.height,H=1,re=null,ce=null,Se=new Ye(0,0,W,te),He=new Ye(0,0,W,te),nt=!1,lt=new Ts,Ze=!1,Y=!1,$=new Fe,fe=new C,Le=new Ye,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function Ot(){return N===null?H:1}let A=n;function ct(y,D){return t.getContext(y,D)}try{let y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",J,!1),A===null){let D="webgl2";if(A=ct(D,y),A===null)throw ct(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ne,Ie,ge,ht,_e,Be,wt,mt,T,x,O,X,K,V,be,ne,xe,ye,Q,le,Ce,ve,oe,Oe;function L(){Ne=new Gg(A),Ne.init(),ve=new v0(A,Ne),Ie=new Og(A,Ne,e,ve),ge=new x0(A,Ne),Ie.reversedDepthBuffer&&d&&ge.buffers.depth.setReversed(!0),ht=new qg(A),_e=new r0,Be=new y0(A,Ne,ge,_e,Ie,ve,ht),wt=new Bg(v),mt=new Vg(v),T=new jf(A),oe=new Ng(A,T),x=new Wg(A,T,ht,oe),O=new Zg(A,x,T,ht),Q=new Yg(A,Ie,Be),ne=new Fg(_e),X=new s0(v,wt,mt,Ne,Ie,oe,ne),K=new T0(v,_e),V=new a0,be=new f0(Ne),ye=new Dg(v,wt,mt,ge,O,p,c),xe=new g0(v,O,Ie),Oe=new E0(A,ht,Ie,ge),le=new Ug(A,Ne,ht),Ce=new Xg(A,Ne,ht),ht.programs=X.programs,v.capabilities=Ie,v.extensions=Ne,v.properties=_e,v.renderLists=V,v.shadowMap=xe,v.state=ge,v.info=ht}L();let ee=new yc(v,A);this.xr=ee,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let y=Ne.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=Ne.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(y){y!==void 0&&(H=y,this.setSize(W,te,!1))},this.getSize=function(y){return y.set(W,te)},this.setSize=function(y,D,B=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=y,te=D,t.width=Math.floor(y*H),t.height=Math.floor(D*H),B===!0&&(t.style.width=y+"px",t.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(W*H,te*H).floor()},this.setDrawingBufferSize=function(y,D,B){W=y,te=D,H=B,t.width=Math.floor(y*B),t.height=Math.floor(D*B),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(P)},this.getViewport=function(y){return y.copy(Se)},this.setViewport=function(y,D,B,k){y.isVector4?Se.set(y.x,y.y,y.z,y.w):Se.set(y,D,B,k),ge.viewport(P.copy(Se).multiplyScalar(H).round())},this.getScissor=function(y){return y.copy(He)},this.setScissor=function(y,D,B,k){y.isVector4?He.set(y.x,y.y,y.z,y.w):He.set(y,D,B,k),ge.scissor(F.copy(He).multiplyScalar(H).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(y){ge.setScissorTest(nt=y)},this.setOpaqueSort=function(y){re=y},this.setTransparentSort=function(y){ce=y},this.getClearColor=function(y){return y.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,B=!0){let k=0;if(y){let U=!1;if(N!==null){let j=N.texture.format;U=j===ia||j===na||j===ta}if(U){let j=N.texture.type,ae=j===Tn||j===vi||j===Ps||j===Ds||j===jo||j===Qo,pe=ye.getClearColor(),ue=ye.getClearAlpha(),Re=pe.r,Pe=pe.g,Te=pe.b;ae?(g[0]=Re,g[1]=Pe,g[2]=Te,g[3]=ue,A.clearBufferuiv(A.COLOR,0,g)):(_[0]=Re,_[1]=Pe,_[2]=Te,_[3]=ue,A.clearBufferiv(A.COLOR,0,_))}else k|=A.COLOR_BUFFER_BIT}D&&(k|=A.DEPTH_BUFFER_BIT),B&&(k|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",J,!1),ye.dispose(),V.dispose(),be.dispose(),_e.dispose(),wt.dispose(),mt.dispose(),O.dispose(),oe.dispose(),Oe.dispose(),X.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",wn),ee.removeEventListener("sessionend",_h),Ti.stop()};function ie(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let y=ht.autoReset,D=xe.enabled,B=xe.autoUpdate,k=xe.needsUpdate,U=xe.type;L(),ht.autoReset=y,xe.enabled=D,xe.autoUpdate=B,xe.needsUpdate=k,xe.type=U}function J(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Z(y){let D=y.target;D.removeEventListener("dispose",Z),me(D)}function me(y){De(y),_e.remove(y)}function De(y){let D=_e.get(y).programs;D!==void 0&&(D.forEach(function(B){X.releaseProgram(B)}),y.isShaderMaterial&&X.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,B,k,U,j){D===null&&(D=Me);let ae=U.isMesh&&U.matrixWorld.determinant()<0,pe=Xd(y,D,B,k,U);ge.setMaterial(k,ae);let ue=B.index,Re=1;if(k.wireframe===!0){if(ue=x.getWireframeAttribute(B),ue===void 0)return;Re=2}let Pe=B.drawRange,Te=B.attributes.position,Ge=Pe.start*Re,je=(Pe.start+Pe.count)*Re;j!==null&&(Ge=Math.max(Ge,j.start*Re),je=Math.min(je,(j.start+j.count)*Re)),ue!==null?(Ge=Math.max(Ge,0),je=Math.min(je,ue.count)):Te!=null&&(Ge=Math.max(Ge,0),je=Math.min(je,Te.count));let ft=je-Ge;if(ft<0||ft===1/0)return;oe.setup(U,k,pe,B,ue);let rt,et=le;if(ue!==null&&(rt=T.get(ue),et=Ce,et.setIndex(rt)),U.isMesh)k.wireframe===!0?(ge.setLineWidth(k.wireframeLinewidth*Ot()),et.setMode(A.LINES)):et.setMode(A.TRIANGLES);else if(U.isLine){let we=k.linewidth;we===void 0&&(we=1),ge.setLineWidth(we*Ot()),U.isLineSegments?et.setMode(A.LINES):U.isLineLoop?et.setMode(A.LINE_LOOP):et.setMode(A.LINE_STRIP)}else U.isPoints?et.setMode(A.POINTS):U.isSprite&&et.setMode(A.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)xs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))et.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let we=U._multiDrawStarts,ut=U._multiDrawCounts,qe=U._multiDrawCount,en=ue?T.get(ue).bytesPerElement:1,Qi=_e.get(k).currentProgram.getUniforms();for(let tn=0;tn<qe;tn++)Qi.setValue(A,"_gl_DrawID",tn),et.render(we[tn]/en,ut[tn])}else if(U.isInstancedMesh)et.renderInstances(Ge,ft,U.count);else if(B.isInstancedBufferGeometry){let we=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ut=Math.min(B.instanceCount,we);et.renderInstances(Ge,ft,ut)}else et.render(Ge,ft)};function it(y,D,B){y.transparent===!0&&y.side===jt&&y.forceSinglePass===!1?(y.side=Wt,y.needsUpdate=!0,Xr(y,D,B),y.side=yn,y.needsUpdate=!0,Xr(y,D,B),y.side=jt):Xr(y,D,B)}this.compile=function(y,D,B=null){B===null&&(B=y),f=be.get(B),f.init(D),S.push(f),B.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),y!==B&&y.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();let k=new Set;return y.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let j=U.material;if(j)if(Array.isArray(j))for(let ae=0;ae<j.length;ae++){let pe=j[ae];it(pe,B,U),k.add(pe)}else it(j,B,U),k.add(j)}),f=S.pop(),k},this.compileAsync=function(y,D,B=null){let k=this.compile(y,D,B);return new Promise(U=>{function j(){if(k.forEach(function(ae){_e.get(ae).currentProgram.isReady()&&k.delete(ae)}),k.size===0){U(y);return}setTimeout(j,10)}Ne.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Ke=null;function Hn(y){Ke&&Ke(y)}function wn(){Ti.stop()}function _h(){Ti.start()}let Ti=new Md;Ti.setAnimationLoop(Hn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(y){Ke=y,ee.setAnimationLoop(y),y===null?Ti.stop():Ti.start()},ee.addEventListener("sessionstart",wn),ee.addEventListener("sessionend",_h),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(D),D=ee.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,D,N),f=be.get(y,S.length),f.init(D),S.push(f),$.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),lt.setFromProjectionMatrix($,_n,D.reversedDepth),Y=this.localClippingEnabled,Ze=ne.init(this.clippingPlanes,Y),m=V.get(y,E.length),m.init(),E.push(m),ee.enabled===!0&&ee.isPresenting===!0){let j=v.xr.getDepthSensingMesh();j!==null&&Ka(j,D,-1/0,v.sortObjects)}Ka(y,D,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(re,ce),Xe=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Xe&&ye.addToRenderList(m,y),this.info.render.frame++,Ze===!0&&ne.beginShadows();let B=f.state.shadowsArray;xe.render(B,y,D),Ze===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=m.opaque,U=m.transmissive;if(f.setupLights(),D.isArrayCamera){let j=D.cameras;if(U.length>0)for(let ae=0,pe=j.length;ae<pe;ae++){let ue=j[ae];yh(k,U,y,ue)}Xe&&ye.render(y);for(let ae=0,pe=j.length;ae<pe;ae++){let ue=j[ae];xh(m,y,ue,ue.viewport)}}else U.length>0&&yh(k,U,y,D),Xe&&ye.render(y),xh(m,y,D);N!==null&&I===0&&(Be.updateMultisampleRenderTarget(N),Be.updateRenderTargetMipmap(N)),y.isScene===!0&&y.onAfterRender(v,y,D),oe.resetDefaultState(),M=-1,b=null,S.pop(),S.length>0?(f=S[S.length-1],Ze===!0&&ne.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Ka(y,D,B,k){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||lt.intersectsSprite(y)){k&&Le.setFromMatrixPosition(y.matrixWorld).applyMatrix4($);let ae=O.update(y),pe=y.material;pe.visible&&m.push(y,ae,pe,B,Le.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||lt.intersectsObject(y))){let ae=O.update(y),pe=y.material;if(k&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Le.copy(y.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),Le.copy(ae.boundingSphere.center)),Le.applyMatrix4(y.matrixWorld).applyMatrix4($)),Array.isArray(pe)){let ue=ae.groups;for(let Re=0,Pe=ue.length;Re<Pe;Re++){let Te=ue[Re],Ge=pe[Te.materialIndex];Ge&&Ge.visible&&m.push(y,ae,Ge,B,Le.z,Te)}}else pe.visible&&m.push(y,ae,pe,B,Le.z,null)}}let j=y.children;for(let ae=0,pe=j.length;ae<pe;ae++)Ka(j[ae],D,B,k)}function xh(y,D,B,k){let U=y.opaque,j=y.transmissive,ae=y.transparent;f.setupLightsView(B),Ze===!0&&ne.setGlobalState(v.clippingPlanes,B),k&&ge.viewport(P.copy(k)),U.length>0&&Wr(U,D,B),j.length>0&&Wr(j,D,B),ae.length>0&&Wr(ae,D,B),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function yh(y,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[k.id]===void 0&&(f.state.transmissionRenderTarget[k.id]=new In(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Ls:Tn,minFilter:Sn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));let j=f.state.transmissionRenderTarget[k.id],ae=k.viewport||P;j.setSize(ae.z*v.transmissionResolutionScale,ae.w*v.transmissionResolutionScale);let pe=v.getRenderTarget(),ue=v.getActiveCubeFace(),Re=v.getActiveMipmapLevel();v.setRenderTarget(j),v.getClearColor(G),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Xe&&ye.render(B);let Pe=v.toneMapping;v.toneMapping=ti;let Te=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),f.setupLightsView(k),Ze===!0&&ne.setGlobalState(v.clippingPlanes,k),Wr(y,B,k),Be.updateMultisampleRenderTarget(j),Be.updateRenderTargetMipmap(j),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let je=0,ft=D.length;je<ft;je++){let rt=D[je],et=rt.object,we=rt.geometry,ut=rt.material,qe=rt.group;if(ut.side===jt&&et.layers.test(k.layers)){let en=ut.side;ut.side=Wt,ut.needsUpdate=!0,vh(et,B,k,we,ut,qe),ut.side=en,ut.needsUpdate=!0,Ge=!0}}Ge===!0&&(Be.updateMultisampleRenderTarget(j),Be.updateRenderTargetMipmap(j))}v.setRenderTarget(pe,ue,Re),v.setClearColor(G,q),Te!==void 0&&(k.viewport=Te),v.toneMapping=Pe}function Wr(y,D,B){let k=D.isScene===!0?D.overrideMaterial:null;for(let U=0,j=y.length;U<j;U++){let ae=y[U],pe=ae.object,ue=ae.geometry,Re=ae.group,Pe=ae.material;Pe.allowOverride===!0&&k!==null&&(Pe=k),pe.layers.test(B.layers)&&vh(pe,D,B,ue,Pe,Re)}}function vh(y,D,B,k,U,j){y.onBeforeRender(v,D,B,k,U,j),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(v,D,B,k,y,j),U.transparent===!0&&U.side===jt&&U.forceSinglePass===!1?(U.side=Wt,U.needsUpdate=!0,v.renderBufferDirect(B,D,k,U,y,j),U.side=yn,U.needsUpdate=!0,v.renderBufferDirect(B,D,k,U,y,j),U.side=jt):v.renderBufferDirect(B,D,k,U,y,j),y.onAfterRender(v,D,B,k,U,j)}function Xr(y,D,B){D.isScene!==!0&&(D=Me);let k=_e.get(y),U=f.state.lights,j=f.state.shadowsArray,ae=U.state.version,pe=X.getParameters(y,U.state,j,D,B),ue=X.getProgramCacheKey(pe),Re=k.programs;k.environment=y.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(y.isMeshStandardMaterial?mt:wt).get(y.envMap||k.environment),k.envMapRotation=k.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Re===void 0&&(y.addEventListener("dispose",Z),Re=new Map,k.programs=Re);let Pe=Re.get(ue);if(Pe!==void 0){if(k.currentProgram===Pe&&k.lightsStateVersion===ae)return Mh(y,pe),Pe}else pe.uniforms=X.getUniforms(y),y.onBeforeCompile(pe,v),Pe=X.acquireProgram(pe,ue),Re.set(ue,Pe),k.uniforms=pe.uniforms;let Te=k.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Te.clippingPlanes=ne.uniform),Mh(y,pe),k.needsLights=Yd(y),k.lightsStateVersion=ae,k.needsLights&&(Te.ambientLightColor.value=U.state.ambient,Te.lightProbe.value=U.state.probe,Te.directionalLights.value=U.state.directional,Te.directionalLightShadows.value=U.state.directionalShadow,Te.spotLights.value=U.state.spot,Te.spotLightShadows.value=U.state.spotShadow,Te.rectAreaLights.value=U.state.rectArea,Te.ltc_1.value=U.state.rectAreaLTC1,Te.ltc_2.value=U.state.rectAreaLTC2,Te.pointLights.value=U.state.point,Te.pointLightShadows.value=U.state.pointShadow,Te.hemisphereLights.value=U.state.hemi,Te.directionalShadowMap.value=U.state.directionalShadowMap,Te.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Te.spotShadowMap.value=U.state.spotShadowMap,Te.spotLightMatrix.value=U.state.spotLightMatrix,Te.spotLightMap.value=U.state.spotLightMap,Te.pointShadowMap.value=U.state.pointShadowMap,Te.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=Pe,k.uniformsList=null,Pe}function bh(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=Bs.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function Mh(y,D){let B=_e.get(y);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function Xd(y,D,B,k,U){D.isScene!==!0&&(D=Me),Be.resetTextureUnits();let j=D.fog,ae=k.isMeshStandardMaterial?D.environment:null,pe=N===null?v.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Dt,ue=(k.isMeshStandardMaterial?mt:wt).get(k.envMap||ae),Re=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Pe=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Te=!!B.morphAttributes.position,Ge=!!B.morphAttributes.normal,je=!!B.morphAttributes.color,ft=ti;k.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ft=v.toneMapping);let rt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,et=rt!==void 0?rt.length:0,we=_e.get(k),ut=f.state.lights;if(Ze===!0&&(Y===!0||y!==b)){let Ht=y===b&&k.id===M;ne.setState(k,y,Ht)}let qe=!1;k.version===we.__version?(we.needsLights&&we.lightsStateVersion!==ut.state.version||we.outputColorSpace!==pe||U.isBatchedMesh&&we.batching===!1||!U.isBatchedMesh&&we.batching===!0||U.isBatchedMesh&&we.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&we.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&we.instancing===!1||!U.isInstancedMesh&&we.instancing===!0||U.isSkinnedMesh&&we.skinning===!1||!U.isSkinnedMesh&&we.skinning===!0||U.isInstancedMesh&&we.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&we.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&we.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&we.instancingMorph===!1&&U.morphTexture!==null||we.envMap!==ue||k.fog===!0&&we.fog!==j||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ne.numPlanes||we.numIntersection!==ne.numIntersection)||we.vertexAlphas!==Re||we.vertexTangents!==Pe||we.morphTargets!==Te||we.morphNormals!==Ge||we.morphColors!==je||we.toneMapping!==ft||we.morphTargetsCount!==et)&&(qe=!0):(qe=!0,we.__version=k.version);let en=we.currentProgram;qe===!0&&(en=Xr(k,D,U));let Qi=!1,tn=!1,Ks=!1,dt=en.getUniforms(),on=we.uniforms;if(ge.useProgram(en.program)&&(Qi=!0,tn=!0,Ks=!0),k.id!==M&&(M=k.id,tn=!0),Qi||b!==y){ge.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),dt.setValue(A,"projectionMatrix",y.projectionMatrix),dt.setValue(A,"viewMatrix",y.matrixWorldInverse);let Yt=dt.map.cameraPosition;Yt!==void 0&&Yt.setValue(A,fe.setFromMatrixPosition(y.matrixWorld)),Ie.logarithmicDepthBuffer&&dt.setValue(A,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&dt.setValue(A,"isOrthographic",y.isOrthographicCamera===!0),b!==y&&(b=y,tn=!0,Ks=!0)}if(U.isSkinnedMesh){dt.setOptional(A,U,"bindMatrix"),dt.setOptional(A,U,"bindMatrixInverse");let Ht=U.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),dt.setValue(A,"boneTexture",Ht.boneTexture,Be))}U.isBatchedMesh&&(dt.setOptional(A,U,"batchingTexture"),dt.setValue(A,"batchingTexture",U._matricesTexture,Be),dt.setOptional(A,U,"batchingIdTexture"),dt.setValue(A,"batchingIdTexture",U._indirectTexture,Be),dt.setOptional(A,U,"batchingColorTexture"),U._colorsTexture!==null&&dt.setValue(A,"batchingColorTexture",U._colorsTexture,Be));let an=B.morphAttributes;if((an.position!==void 0||an.normal!==void 0||an.color!==void 0)&&Q.update(U,B,en),(tn||we.receiveShadow!==U.receiveShadow)&&(we.receiveShadow=U.receiveShadow,dt.setValue(A,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(on.envMap.value=ue,on.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&D.environment!==null&&(on.envMapIntensity.value=D.environmentIntensity),tn&&(dt.setValue(A,"toneMappingExposure",v.toneMappingExposure),we.needsLights&&qd(on,Ks),j&&k.fog===!0&&K.refreshFogUniforms(on,j),K.refreshMaterialUniforms(on,k,H,te,f.state.transmissionRenderTarget[y.id]),Bs.upload(A,bh(we),on,Be)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Bs.upload(A,bh(we),on,Be),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&dt.setValue(A,"center",U.center),dt.setValue(A,"modelViewMatrix",U.modelViewMatrix),dt.setValue(A,"normalMatrix",U.normalMatrix),dt.setValue(A,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let Ht=k.uniformsGroups;for(let Yt=0,$a=Ht.length;Yt<$a;Yt++){let Ei=Ht[Yt];Oe.update(Ei,en),Oe.bind(Ei,en)}}return en}function qd(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function Yd(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(y,D,B){let k=_e.get(y);k.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),_e.get(y.texture).__webglTexture=D,_e.get(y.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:B,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){let B=_e.get(y);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0};let Zd=A.createFramebuffer();this.setRenderTarget=function(y,D=0,B=0){N=y,w=D,I=B;let k=!0,U=null,j=!1,ae=!1;if(y){let ue=_e.get(y);if(ue.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(A.FRAMEBUFFER,null),k=!1;else if(ue.__webglFramebuffer===void 0)Be.setupRenderTarget(y);else if(ue.__hasExternalTextures)Be.rebindTextures(y,_e.get(y.texture).__webglTexture,_e.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Te=y.depthTexture;if(ue.__boundDepthTexture!==Te){if(Te!==null&&_e.has(Te)&&(y.width!==Te.image.width||y.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(y)}}let Re=y.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ae=!0);let Pe=_e.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[D])?U=Pe[D][B]:U=Pe[D],j=!0):y.samples>0&&Be.useMultisampledRTT(y)===!1?U=_e.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?U=Pe[B]:U=Pe,P.copy(y.viewport),F.copy(y.scissor),z=y.scissorTest}else P.copy(Se).multiplyScalar(H).floor(),F.copy(He).multiplyScalar(H).floor(),z=nt;if(B!==0&&(U=Zd),ge.bindFramebuffer(A.FRAMEBUFFER,U)&&k&&ge.drawBuffers(y,U),ge.viewport(P),ge.scissor(F),ge.setScissorTest(z),j){let ue=_e.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+D,ue.__webglTexture,B)}else if(ae){let ue=D;for(let Re=0;Re<y.textures.length;Re++){let Pe=_e.get(y.textures[Re]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Re,Pe.__webglTexture,B,ue)}}else if(y!==null&&B!==0){let ue=_e.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,ue.__webglTexture,B)}M=-1},this.readRenderTargetPixels=function(y,D,B,k,U,j,ae,pe=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=_e.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ae!==void 0&&(ue=ue[ae]),ue){ge.bindFramebuffer(A.FRAMEBUFFER,ue);try{let Re=y.textures[pe],Pe=Re.format,Te=Re.type;if(!Ie.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ie.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-k&&B>=0&&B<=y.height-U&&(y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+pe),A.readPixels(D,B,k,U,ve.convert(Pe),ve.convert(Te),j))}finally{let Re=N!==null?_e.get(N).__webglFramebuffer:null;ge.bindFramebuffer(A.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(y,D,B,k,U,j,ae,pe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=_e.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ae!==void 0&&(ue=ue[ae]),ue)if(D>=0&&D<=y.width-k&&B>=0&&B<=y.height-U){ge.bindFramebuffer(A.FRAMEBUFFER,ue);let Re=y.textures[pe],Pe=Re.format,Te=Re.type;if(!Ie.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ie.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ge=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Ge),A.bufferData(A.PIXEL_PACK_BUFFER,j.byteLength,A.STREAM_READ),y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+pe),A.readPixels(D,B,k,U,ve.convert(Pe),ve.convert(Te),0);let je=N!==null?_e.get(N).__webglFramebuffer:null;ge.bindFramebuffer(A.FRAMEBUFFER,je);let ft=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await Zu(A,ft,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Ge),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,j),A.deleteBuffer(Ge),A.deleteSync(ft),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,B=0){let k=Math.pow(2,-B),U=Math.floor(y.image.width*k),j=Math.floor(y.image.height*k),ae=D!==null?D.x:0,pe=D!==null?D.y:0;Be.setTexture2D(y,0),A.copyTexSubImage2D(A.TEXTURE_2D,B,0,0,ae,pe,U,j),ge.unbindTexture()};let Kd=A.createFramebuffer(),$d=A.createFramebuffer();this.copyTextureToTexture=function(y,D,B=null,k=null,U=0,j=null){j===null&&(U!==0?(xs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=U,U=0):j=0);let ae,pe,ue,Re,Pe,Te,Ge,je,ft,rt=y.isCompressedTexture?y.mipmaps[j]:y.image;if(B!==null)ae=B.max.x-B.min.x,pe=B.max.y-B.min.y,ue=B.isBox3?B.max.z-B.min.z:1,Re=B.min.x,Pe=B.min.y,Te=B.isBox3?B.min.z:0;else{let an=Math.pow(2,-U);ae=Math.floor(rt.width*an),pe=Math.floor(rt.height*an),y.isDataArrayTexture?ue=rt.depth:y.isData3DTexture?ue=Math.floor(rt.depth*an):ue=1,Re=0,Pe=0,Te=0}k!==null?(Ge=k.x,je=k.y,ft=k.z):(Ge=0,je=0,ft=0);let et=ve.convert(D.format),we=ve.convert(D.type),ut;D.isData3DTexture?(Be.setTexture3D(D,0),ut=A.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Be.setTexture2DArray(D,0),ut=A.TEXTURE_2D_ARRAY):(Be.setTexture2D(D,0),ut=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,D.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,D.unpackAlignment);let qe=A.getParameter(A.UNPACK_ROW_LENGTH),en=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Qi=A.getParameter(A.UNPACK_SKIP_PIXELS),tn=A.getParameter(A.UNPACK_SKIP_ROWS),Ks=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,rt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,rt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Re),A.pixelStorei(A.UNPACK_SKIP_ROWS,Pe),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Te);let dt=y.isDataArrayTexture||y.isData3DTexture,on=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){let an=_e.get(y),Ht=_e.get(D),Yt=_e.get(an.__renderTarget),$a=_e.get(Ht.__renderTarget);ge.bindFramebuffer(A.READ_FRAMEBUFFER,Yt.__webglFramebuffer),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,$a.__webglFramebuffer);for(let Ei=0;Ei<ue;Ei++)dt&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_e.get(y).__webglTexture,U,Te+Ei),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_e.get(D).__webglTexture,j,ft+Ei)),A.blitFramebuffer(Re,Pe,ae,pe,Ge,je,ae,pe,A.DEPTH_BUFFER_BIT,A.NEAREST);ge.bindFramebuffer(A.READ_FRAMEBUFFER,null),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(U!==0||y.isRenderTargetTexture||_e.has(y)){let an=_e.get(y),Ht=_e.get(D);ge.bindFramebuffer(A.READ_FRAMEBUFFER,Kd),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,$d);for(let Yt=0;Yt<ue;Yt++)dt?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,an.__webglTexture,U,Te+Yt):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,an.__webglTexture,U),on?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Ht.__webglTexture,j,ft+Yt):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ht.__webglTexture,j),U!==0?A.blitFramebuffer(Re,Pe,ae,pe,Ge,je,ae,pe,A.COLOR_BUFFER_BIT,A.NEAREST):on?A.copyTexSubImage3D(ut,j,Ge,je,ft+Yt,Re,Pe,ae,pe):A.copyTexSubImage2D(ut,j,Ge,je,Re,Pe,ae,pe);ge.bindFramebuffer(A.READ_FRAMEBUFFER,null),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else on?y.isDataTexture||y.isData3DTexture?A.texSubImage3D(ut,j,Ge,je,ft,ae,pe,ue,et,we,rt.data):D.isCompressedArrayTexture?A.compressedTexSubImage3D(ut,j,Ge,je,ft,ae,pe,ue,et,rt.data):A.texSubImage3D(ut,j,Ge,je,ft,ae,pe,ue,et,we,rt):y.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,j,Ge,je,ae,pe,et,we,rt.data):y.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,j,Ge,je,rt.width,rt.height,et,rt.data):A.texSubImage2D(A.TEXTURE_2D,j,Ge,je,ae,pe,et,we,rt);A.pixelStorei(A.UNPACK_ROW_LENGTH,qe),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,en),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Qi),A.pixelStorei(A.UNPACK_SKIP_ROWS,tn),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ks),j===0&&D.generateMipmaps&&A.generateMipmap(ut),ge.unbindTexture()},this.initRenderTarget=function(y){_e.get(y).__webglFramebuffer===void 0&&Be.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Be.setTextureCube(y,0):y.isData3DTexture?Be.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Be.setTexture2DArray(y,0):Be.setTexture2D(y,0),ge.unbindTexture()},this.resetState=function(){w=0,I=0,N=null,ge.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}};var Ad={type:"change"},Mc={type:"start"},Cd={type:"end"},Ba=new Kn,Rd=new cn,A0=Math.cos(70*It.DEG2RAD),Tt=new C,Qt=2*Math.PI,Qe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bc=1e-6,ka=class extends Lr{constructor(e,t=null){super(e,t),this.state=Qe.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mn.ROTATE,MIDDLE:Mn.DOLLY,RIGHT:Mn.PAN},this.touches={ONE:hn.ROTATE,TWO:hn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new Nt,this._lastTargetPosition=new C,this._quat=new Nt().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Cs,this._sphericalDelta=new Cs,this._scale=1,this._panOffset=new C,this._rotateStart=new Ae,this._rotateEnd=new Ae,this._rotateDelta=new Ae,this._panStart=new Ae,this._panEnd=new Ae,this._panDelta=new Ae,this._dollyStart=new Ae,this._dollyEnd=new Ae,this._dollyDelta=new Ae,this._dollyDirection=new C,this._mouse=new Ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=C0.bind(this),this._onPointerDown=R0.bind(this),this._onPointerUp=I0.bind(this),this._onContextMenu=F0.bind(this),this._onMouseWheel=D0.bind(this),this._onKeyDown=N0.bind(this),this._onTouchStart=U0.bind(this),this._onTouchMove=O0.bind(this),this._onMouseDown=P0.bind(this),this._onMouseMove=L0.bind(this),this._interceptControlDown=B0.bind(this),this._interceptControlUp=k0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ad),this.update(),this.state=Qe.NONE}update(e=null){let t=this.object.position;Tt.copy(t).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===Qe.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Qt:n>Math.PI&&(n-=Qt),s<-Math.PI?s+=Qt:s>Math.PI&&(s-=Qt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Tt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ba.origin.copy(this.object.position),Ba.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ba.direction))<A0?this.object.lookAt(this.target):(Rd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ba.intersectPlane(Rd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>bc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bc||this._lastTargetPosition.distanceToSquared(this.target)>bc?(this.dispatchEvent(Ad),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Tt.setFromMatrixColumn(t,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,t){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(t,1):(Tt.setFromMatrixColumn(t,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Tt.copy(s).sub(this.target);let r=Tt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function R0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function C0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function I0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Cd),this.state=Qe.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function P0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Mn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Qe.DOLLY;break;case Mn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qe.ROTATE}break;case Mn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qe.PAN}break;default:this.state=Qe.NONE}this.state!==Qe.NONE&&this.dispatchEvent(Mc)}function L0(i){switch(this.state){case Qe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Qe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function D0(i){this.enabled===!1||this.enableZoom===!1||this.state!==Qe.NONE||(i.preventDefault(),this.dispatchEvent(Mc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Cd))}function N0(i){this.enabled!==!1&&this._handleKeyDown(i)}function U0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case hn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Qe.TOUCH_ROTATE;break;case hn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Qe.TOUCH_PAN;break;default:this.state=Qe.NONE}break;case 2:switch(this.touches.TWO){case hn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Qe.TOUCH_DOLLY_PAN;break;case hn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Qe.TOUCH_DOLLY_ROTATE;break;default:this.state=Qe.NONE}break;default:this.state=Qe.NONE}this.state!==Qe.NONE&&this.dispatchEvent(Mc)}function O0(i){switch(this._trackPointer(i),this.state){case Qe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Qe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Qe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Qe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Qe.NONE}}function F0(i){this.enabled!==!1&&i.preventDefault()}function B0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function k0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Sc(i,e){if(e===$l)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Us||e===Br){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Us)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var za=class extends On{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ic(t)}),this.register(function(t){return new Pc(t)}),this.register(function(t){return new zc(t)}),this.register(function(t){return new Hc(t)}),this.register(function(t){return new Vc(t)}),this.register(function(t){return new Dc(t)}),this.register(function(t){return new Nc(t)}),this.register(function(t){return new Uc(t)}),this.register(function(t){return new Oc(t)}),this.register(function(t){return new Cc(t)}),this.register(function(t){return new Fc(t)}),this.register(function(t){return new Lc(t)}),this.register(function(t){return new kc(t)}),this.register(function(t){return new Bc(t)}),this.register(function(t){return new Ac(t)}),this.register(function(t){return new Gc(t)}),this.register(function(t){return new Wc(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Qn.extractUrlBase(e);o=Qn.resolveURL(l,this.path)}else o=Qn.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Rs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Nd){try{o[Ve.KHR_BINARY_GLTF]=new Xc(e)}catch(h){s&&s(h);return}r=JSON.parse(o[Ve.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new jc(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case Ve.KHR_MATERIALS_UNLIT:o[h]=new Rc;break;case Ve.KHR_DRACO_MESH_COMPRESSION:o[h]=new qc(r,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:o[h]=new Yc;break;case Ve.KHR_MESH_QUANTIZATION:o[h]=new Zc;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function z0(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Ac=class{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Ee(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Dt);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new yi(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Cr(u),l.distance=h;break;case"spot":l=new Rr(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),kn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Rc=class{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return kt}extendParams(e,t,n){let s=[];e.color=new Ee(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Dt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,gt))}return Promise.all(s)}},Cc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Ic=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ae(a,a)}return Promise.all(r)}},Pc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Lc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Dc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ee(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Dt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,gt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Nc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Uc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ee().setRGB(a[0],a[1],a[2],Dt),Promise.all(r)}},Oc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Fc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ee().setRGB(a[0],a[1],a[2],Dt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,gt)),Promise.all(r)}},Bc=class{constructor(e){this.parser=e,this.name=Ve.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},kc=class{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:$t}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},zc=class{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Hc=class{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Vc=class{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Gc=class{constructor(e){this.name=Ve.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(p),u,h,d,s.mode,s.filter),p})})}else return null}},Wc=class{constructor(e){this.name=Ve.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==dn.TRIANGLES&&l.mode!==dn.TRIANGLE_STRIP&&l.mode!==dn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,p=[];for(let g of h){let _=new Fe,m=new C,f=new Nt,E=new C(1,1,1),S=new xr(g.geometry,g.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,v),c.SCALE&&E.fromBufferAttribute(c.SCALE,v),S.setMatrixAt(v,_.compose(m,f,E));for(let v in c)if(v==="_COLOR_0"){let R=c[v];S.instanceColor=new gi(R.array,R.itemSize,R.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,c[v]);ot.prototype.copy.call(S,g),this.parser.assignFinalMaterial(S),p.push(S)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},Nd="glTF",zr=12,Id={JSON:1313821514,BIN:5130562},Xc=class{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,zr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Nd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-zr,r=new DataView(e,zr),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Id.JSON){let l=new Uint8Array(e,zr+o,a);this.content=n.decode(l)}else if(c===Id.BIN){let l=zr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},qc=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=$c[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=$c[u]||u.toLowerCase();if(o[u]!==void 0){let d=n.accessors[e.attributes[u]],p=zs[d.componentType];l[h]=p.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(p){for(let g in p.attributes){let _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(p)},a,l,Dt,d)})})}},Yc=class{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Zc=class{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}},Ha=class extends $n{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,h=(n-t)/u,d=h*h,p=d*h,g=e*l,_=g-l,m=-2*p+3*d,f=p-d,E=1-m,S=f-d+h;for(let v=0;v!==a;v++){let R=o[_+v+a],w=o[_+v+c]*u,I=o[g+v+a],N=o[g+v]*u;r[v]=E*R+S*w+m*I+f*N}return r}},H0=new Nt,Kc=class extends Ha{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return H0.fromArray(r).normalize().toArray(r),r}},dn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},zs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Pd={9728:Lt,9729:Gt,9984:$o,9985:Is,9986:Vi,9987:Sn},Ld={33071:An,33648:ms,10497:mi},Tc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$c={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},bi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},V0={CUBICSPLINE:void 0,LINEAR:Ni,STEP:Di},Ec={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function G0(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Ln({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:yn})),i.DefaultMaterial}function Zi(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function kn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function W0(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(d)}if(s){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(d)}if(r){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function X0(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function q0(i){let e,t=i.extensions&&i.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+wc(t.attributes):e=i.indices+":"+wc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+wc(i.targets[n]);return e}function wc(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Jc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Y0(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Z0=new Fe,jc=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new z0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Er(this.options.manager):this.textureLoader=new Ir(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Rs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Zi(r,a,s),kn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Qn.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Tc[s.type],a=zs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new yt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Tc[s.type],l=zs[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,_,m;if(p&&p!==h){let f=Math.floor(d/p),E="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count,S=t.cache.get(E);S||(_=new l(a,f*p,s.count*p/u),S=new bs(_,p/u),t.cache.add(E,S)),m=new Ms(S,c,d%p/u,g)}else a===null?_=new l(s.count*c):_=new l(a,d,s.count*c),m=new yt(_,c,g);if(s.sparse!==void 0){let f=Tc.SCALAR,E=zs[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,R=new E(o[1],S,s.sparse.count*f),w=new l(o[2],v,s.sparse.count*c);a!==null&&(m=new yt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let I=0,N=R.length;I<N;I++){let M=R[I];if(m.setX(M,w[I*c]),c>=2&&m.setY(M,w[I*c+1]),c>=3&&m.setZ(M,w[I*c+2]),c>=4&&m.setW(M,w[I*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return u.magFilter=Pd[d.magFilter]||Gt,u.minFilter=Pd[d.minFilter]||Sn,u.wrapS=Ld[d.wrapS]||mi,u.wrapT=Ld[d.wrapT]||mi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Lt&&u.minFilter!==Gt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let d=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){let m=new Rt(_);m.needsUpdate=!0,d(m)}),t.load(Qn.resolveURL(h,r.path),g,void 0,p)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),kn(h,o),h.userData.mimeType=o.mimeType||Y0(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ve.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Ve.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new ws,Kt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new _i,Kt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Ln}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[Ve.KHR_MATERIALS_UNLIT]){let h=s[Ve.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new Ee(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Dt),a.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,gt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=jt);let u=r.alphaMode||Ec.OPAQUE;if(u===Ec.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Ec.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==kt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ae(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==kt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==kt){let h=r.emissiveFactor;a.emissive=new Ee().setRGB(h[0],h[1],h[2],Dt)}return r.emissiveTexture!==void 0&&o!==kt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,gt)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),kn(h,r),t.associations.set(h,{materials:e}),r.extensions&&Zi(s,h,r),h})}createUniqueName(e){let t=tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Dd(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=q0(l),h=s[u];if(h)o.push(h.promise);else{let d;l.extensions&&l.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Dd(new Ut,l,t),s[u]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?G0(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let p=0,g=u.length;p<g;p++){let _=u[p],m=o[p],f,E=l[p];if(m.mode===dn.TRIANGLES||m.mode===dn.TRIANGLE_STRIP||m.mode===dn.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new mr(_,E):new st(_,E),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===dn.TRIANGLE_STRIP?f.geometry=Sc(f.geometry,Br):m.mode===dn.TRIANGLE_FAN&&(f.geometry=Sc(f.geometry,Us));else if(m.mode===dn.LINES)f=new Es(_,E);else if(m.mode===dn.LINE_STRIP)f=new xi(_,E);else if(m.mode===dn.LINE_LOOP)f=new yr(_,E);else if(m.mode===dn.POINTS)f=new vr(_,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&X0(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),kn(f,r),m.extensions&&Zi(s,f,m),t.assignFinalMaterial(f),h.push(f)}for(let p=0,g=h.length;p<g;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return r.extensions&&Zi(s,h[0],r),h[0];let d=new Pt;r.extensions&&Zi(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=h.length;p<g;p++)d.add(h[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new xt(It.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Bi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),kn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let d=new Fe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new _r(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){let p=s.channels[h],g=s.samplers[p.sampler],_=p.target,m=_.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,E=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",E)),l.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let d=h[0],p=h[1],g=h[2],_=h[3],m=h[4],f=[];for(let S=0,v=d.length;S<v;S++){let R=d[S],w=p[S],I=g[S],N=_[S],M=m[S];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();let b=n._createAnimationTracks(R,w,I,N,M);if(b)for(let P=0;P<b.length;P++)f.push(b[P])}let E=new Tr(r,void 0,f);return kn(E,s),E})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(d,Z0)});for(let p=0,g=h.length;p<g;p++)u.add(h[p]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new Ss:l.length>1?u=new Pt:l.length===1?u=l[0]:u=new ot,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),kn(u,r),r.extensions&&Zi(n,u,r),r.matrix!==void 0){let h=new Fe;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Pt;n.name&&(r.name=s.createUniqueName(n.name)),kn(r,n),n.extensions&&Zi(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[d,p]of s.associations)(d instanceof Kt||d instanceof Rt)&&h.set(d,p);return u.traverse(d=>{let p=s.associations.get(d);p!=null&&h.set(d,p)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];bi[r.path]===bi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(bi[r.path]){case bi.weights:l=Dn;break;case bi.rotation:l=Nn;break;case bi.translation:case bi.scale:l=Un;break;default:switch(n.itemSize){case 1:l=Dn;break;case 2:case 3:default:l=Un;break}break}let u=s.interpolation!==void 0?V0[s.interpolation]:Ni,h=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){let g=new l(c[d]+"."+bi[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Jc(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Nn?Kc:Ha;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function K0(i,e,t){let n=e.attributes,s=new Ct;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new C(c[0],c[1],c[2]),new C(l[0],l[1],l[2])),a.normalized){let u=Jc(zs[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new C,c=new C;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let _=Jc(zs[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Zt;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Dd(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=$c[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return We.workingColorSpace!==Dt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${We.workingColorSpace}" not supported.`),kn(i,e),K0(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?W0(i,e.targets,t):i})}var Hs=[{id:"leg",name:"\u5C0F\u817F\u9AA8",pinyin:"xi\u01CEo tu\u01D0",en:"Leg",count:2,color:"#a5ad85"},{id:"tarsal",name:"\u8DD7\u9AA8",pinyin:"f\u016B g\u01D4",en:"Tarsals",count:7,color:"#c49b65"},{id:"metatarsal",name:"\u8DD6\u9AA8",pinyin:"zh\xED g\u01D4",en:"Metatarsals",count:5,color:"#7fa4a4"},{id:"phalanges",name:"\u8DBE\u9AA8",pinyin:"zh\u01D0 g\u01D4",en:"Phalanges",count:14,color:"#a39aba"},{id:"sesamoid",name:"\u7C7D\u9AA8",pinyin:"z\u01D0 g\u01D4",en:"Sesamoids",count:2,color:"#cfaa92"}],at=[{id:"talus",name:"\u8DDD\u9AA8",en:"Talus",group:"tarsal",region:"\u540E\u8DB3",feature:"\u6ED1\u8F66\u3001\u8DDD\u9AA8\u5934\u4E0E\u9888",description:"\u4F4D\u4E8E\u8DDF\u9AA8\u4E0A\u65B9\u3001\u821F\u9AA8\u540E\u65B9\u3002\u4E0A\u9762\u7684\u8DDD\u9AA8\u6ED1\u8F66\u4E0E\u5C0F\u817F\u7684\u80EB\u9AA8\u3001\u8153\u9AA8\u5171\u540C\u6784\u6210\u8E1D\u5173\u8282\uFF1B\u672C\u6A21\u578B\u4E0D\u5305\u542B\u5C0F\u817F\u9AA8\u3002",look:"\u5148\u770B\u4E0A\u65B9\u7684\u6ED1\u8F66\u6837\u66F2\u9762\uFF0C\u518D\u7ED5\u5230\u524D\u65B9\u770B\u8F83\u5706\u7684\u8DDD\u9AA8\u5934\u3002\u79FB\u5F00\u8DDD\u9AA8\uFF0C\u53EF\u4EE5\u89C2\u5BDF\u5B83\u4E0E\u8DDF\u9AA8\u76F8\u5BF9\u7684\u4E0B\u65B9\u9AA8\u9762\u3002",neighbors:["calcaneus","navicular"],tip:"\u4E0A\u63A5\u5C0F\u817F\uFF0C\u4E0B\u90BB\u8DDF\u9AA8\uFF0C\u524D\u90BB\u821F\u9AA8\u3002"},{id:"calcaneus",name:"\u8DDF\u9AA8",en:"Calcaneus",group:"tarsal",region:"\u540E\u8DB3",feature:"\u8DDF\u9AA8\u7ED3\u8282\u4E0E\u8F7D\u8DDD\u7A81",description:"\u5F62\u6210\u811A\u8DDF\uFF0C\u662F\u8DB3\u90E8\u6700\u5927\u7684\u8DD7\u9AA8\u3002\u4E0A\u65B9\u4E0E\u8DDD\u9AA8\u76F8\u5173\u8282\uFF0C\u524D\u65B9\u4E0E\u9AB0\u9AA8\u76F8\u5173\u8282\uFF0C\u540E\u90E8\u4E3A\u8DDF\u8171\u9644\u7740\u533A\u57DF\u3002",look:"\u8F6C\u5230\u8DB3\u5185\u4FA7\u5BFB\u627E\u5411\u5185\u4F38\u51FA\u7684\u8F7D\u8DDD\u7A81\uFF1B\u518D\u770B\u540E\u4E0B\u65B9\u5BBD\u5927\u7684\u8DDF\u9AA8\u7ED3\u8282\u3002\u8DB3\u5E95\u89C6\u89D2\u6700\u5BB9\u6613\u7406\u89E3\u5B83\u4E0E\u524D\u8DB3\u4E4B\u95F4\u7684\u7EB5\u5F13\u3002",neighbors:["talus","cuboid"],tip:"\u811A\u8DDF\u7684\u4E3B\u4F53\uFF0C\u4E0D\u662F\u8E1D\u90E8\u4E24\u4FA7\u7684\u51F8\u8D77\u3002"},{id:"navicular",name:"\u821F\u9AA8",en:"Navicular",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u540E\u65B9\u51F9\u9762\u4E0E\u821F\u9AA8\u7C97\u9686",description:"\u4F4D\u4E8E\u8DDD\u9AA8\u5934\u524D\u65B9\uFF0C\u524D\u9762\u8FDE\u63A5\u4E09\u5757\u6954\u9AA8\uFF0C\u53C2\u4E0E\u5185\u4FA7\u7EB5\u5F13\u7684\u6784\u6210\u3002\u8DB3\u5185\u4FA7\u53EF\u89C1\u5411\u5185\u7A81\u51FA\u7684\u821F\u9AA8\u7C97\u9686\u3002",look:"\u9694\u79BB\u540E\u8F6C\u5230\u540E\u9762\uFF0C\u770B\u627F\u63A5\u8DDD\u9AA8\u5934\u7684\u51F9\u5F62\u9AA8\u9762\uFF1B\u524D\u9762\u5219\u671D\u5411\u4E09\u5757\u6954\u9AA8\u3002\u6CE8\u610F\u5176\u4F4D\u7F6E\u5728\u8DB3\u5185\u4FA7\uFF0C\u4E0D\u5728\u5916\u4FA7\u3002",neighbors:["talus","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral"],tip:"\u8DDD\u9AA8 \u2192 \u821F\u9AA8 \u2192 \u4E09\u5757\u6954\u9AA8\u3002"},{id:"cuboid",name:"\u9AB0\u9AA8",pinyin:"t\xF3u g\u01D4",en:"Cuboid",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u8DB3\u5E95\u6C9F\u4E0E\u5916\u4FA7\u5217",description:"\u4F4D\u4E8E\u8DB3\u5916\u4FA7\uFF0C\u540E\u9762\u8FDE\u63A5\u8DDF\u9AA8\uFF0C\u524D\u9762\u4E3B\u8981\u8FDE\u63A5\u7B2C\u56DB\u3001\u7B2C\u4E94\u8DD6\u9AA8\u3002\u5B83\u662F\u5916\u4FA7\u7EB5\u5F13\u7684\u7EC4\u6210\u90E8\u5206\u3002",look:"\u4ECE\u8DB3\u5E95\u89C2\u5BDF\u9AB0\u9AA8\u4E0B\u65B9\u7684\u6C9F\u5F62\u533A\u57DF\uFF1B\u4ECE\u5916\u4FA7\u89C2\u5BDF\u8DDF\u9AA8\u3001\u9AB0\u9AA8\u548C\u7B2C\u4E94\u8DD6\u9AA8\u7684\u524D\u540E\u6392\u5217\u3002",neighbors:["calcaneus","cuneiform-lateral","metatarsal-4","metatarsal-5"],tip:"\u201C\u9AB0\u201D\u5728\u8FD9\u91CC\u8BFB t\xF3u\u3002\u8BB0\u4F4F\u5B83\u5728\u5C0F\u8DBE\u4E00\u4FA7\u3002"},{id:"cuneiform-medial",name:"\u5185\u4FA7\u6954\u9AA8",pinyin:"xi\u0113 g\u01D4",en:"Medial cuneiform",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u4E09\u5757\u6954\u9AA8\u4E2D\u6700\u5185\u4FA7\u7684\u4E00\u5757",description:"\u4F4D\u4E8E\u821F\u9AA8\u524D\u65B9\u3001\u7B2C\u4E00\u8DD6\u9AA8\u540E\u65B9\uFF0C\u662F\u4E09\u5757\u6954\u9AA8\u4E2D\u8F83\u5927\u7684\u4E00\u5757\u3002\u5B83\u4E0E\u7B2C\u4E00\u8DD6\u9AA8\u4E00\u8D77\u4F4D\u4E8E\u62C7\u8DBE\u4E00\u4FA7\u3002",look:"\u9694\u79BB\u540E\u6BD4\u8F83\u4E0A\u4E0B\u5BBD\u7A84\uFF1B\u5728\u539F\u4F4D\u89C2\u5BDF\u5B83\u5982\u4F55\u63A5\u7EED\u7B2C\u4E00\u8DD6\u9AA8\uFF0C\u4EE5\u53CA\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u4E0E\u90BB\u8FD1\u6954\u9AA8\u7684\u5D4C\u5408\u5173\u7CFB\u3002",neighbors:["navicular","cuneiform-intermediate","metatarsal-1","metatarsal-2"],tip:"\u5185\u4FA7\uFF1D\u62C7\u8DBE\u4FA7\uFF1B\u4E0D\u662F\u753B\u9762\u7684\u56FA\u5B9A\u5DE6\u4FA7\u3002"},{id:"cuneiform-intermediate",name:"\u4E2D\u95F4\u6954\u9AA8",pinyin:"xi\u0113 g\u01D4",en:"Intermediate cuneiform",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u5939\u5728\u4E24\u5757\u6954\u9AA8\u4E4B\u95F4",description:"\u4F4D\u4E8E\u5185\u4FA7\u3001\u5916\u4FA7\u6954\u9AA8\u4E4B\u95F4\uFF0C\u540E\u63A5\u821F\u9AA8\uFF0C\u524D\u63A5\u7B2C\u4E8C\u8DD6\u9AA8\u3002\u5B83\u8F83\u77ED\uFF0C\u4F7F\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u4F4D\u4E8E\u76F8\u90BB\u6954\u9AA8\u4E4B\u95F4\u3002",look:"\u4ECE\u8DB3\u80CC\u5F80\u4E0B\u770B\u4E09\u5757\u6954\u9AA8\u7684\u6392\u5217\uFF0C\u518D\u5C55\u5F00\u5C11\u91CF\u89C2\u5BDF\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u7684\u4F4D\u7F6E\u3002\u4E0D\u8981\u5C06\u89C2\u5BDF\u7528\u7684\u5C55\u5F00\u95F4\u9699\u5F53\u6210\u771F\u5B9E\u5173\u8282\u95F4\u9699\u3002",neighbors:["navicular","cuneiform-medial","cuneiform-lateral","metatarsal-2"],tip:"\u7531\u5185\u5411\u5916\uFF1A\u5185\u4FA7\u6954\u9AA8\u3001\u4E2D\u95F4\u6954\u9AA8\u3001\u5916\u4FA7\u6954\u9AA8\u3002"},{id:"cuneiform-lateral",name:"\u5916\u4FA7\u6954\u9AA8",pinyin:"xi\u0113 g\u01D4",en:"Lateral cuneiform",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u524D\u63A5\u7B2C\u4E09\u8DD6\u9AA8",description:"\u4F4D\u4E8E\u4E2D\u95F4\u6954\u9AA8\u5916\u4FA7\u3001\u9AB0\u9AA8\u5185\u4FA7\uFF0C\u540E\u63A5\u821F\u9AA8\uFF0C\u524D\u65B9\u4E3B\u8981\u8FDE\u63A5\u7B2C\u4E09\u8DD6\u9AA8\uFF0C\u5E76\u4E0E\u76F8\u90BB\u8DD6\u9AA8\u57FA\u5E95\u63A5\u89E6\u3002",look:"\u4ECE\u8DB3\u80CC\u8BC6\u522B\u5B83\u4E0E\u4E2D\u95F4\u6954\u9AA8\u3001\u9AB0\u9AA8\u7684\u8FB9\u754C\uFF1B\u79FB\u51FA\u540E\u8F6C\u52A8\uFF0C\u6BD4\u8F83\u5404\u4E2A\u5173\u8282\u9762\u7684\u65B9\u5411\u3002",neighbors:["navicular","cuneiform-intermediate","cuboid","metatarsal-2","metatarsal-3","metatarsal-4"],tip:"\u201C\u5916\u4FA7\u6954\u9AA8\u201D\u4ECD\u5728\u9AB0\u9AA8\u7684\u5185\u4FA7\u3002"}],Va=["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94"],$0=["First","Second","Third","Fourth","Fifth"];for(let i=1;i<=5;i++)at.push({id:`metatarsal-${i}`,name:`\u7B2C${Va[i-1]}\u8DD6\u9AA8`,pinyin:"zh\xED g\u01D4",en:`${$0[i-1]} metatarsal`,group:"metatarsal",region:"\u524D\u8DB3",feature:i===1?"\u7C97\u58EE\u7684\u7B2C\u4E00\u8DD6\u9AA8\u4E0E\u8DD6\u9AA8\u5934":i===5?"\u7B2C\u4E94\u8DD6\u9AA8\u57FA\u5E95\u7684\u7C97\u9686":"\u57FA\u5E95\u3001\u9AA8\u5E72\u4E0E\u8DD6\u9AA8\u5934",description:`\u4ECE\u62C7\u8DBE\u4FA7\u5411\u5C0F\u8DBE\u4FA7\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C${Va[i-1]}\u8DD6\u9AA8\u3002\u8FD1\u7AEF\u4E3A\u57FA\u5E95\uFF0C\u4E2D\u90E8\u4E3A\u9AA8\u5E72\uFF0C\u8FDC\u7AEF\u7684\u8DD6\u9AA8\u5934\u4E0E\u7B2C${Va[i-1]}\u8DBE\u8FD1\u8282\u8DBE\u9AA8\u5F62\u6210\u8DD6\u8DBE\u5173\u8282\u3002`+(i===1?"\u7B2C\u4E00\u8DD6\u9AA8\u8F83\u7C97\u77ED\uFF0C\u5934\u4E0B\u65B9\u6709\u4E24\u5757\u7C7D\u9AA8\u3002":i===5?"\u57FA\u5E95\u5916\u4FA7\u7684\u7A81\u51FA\u79F0\u7B2C\u4E94\u8DD6\u9AA8\u7C97\u9686\u3002":""),look:i===2?"\u4ECE\u8DB3\u80CC\u89C2\u5BDF\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u5982\u4F55\u4F4D\u4E8E\u6954\u9AA8\u4E4B\u95F4\uFF0C\u518D\u6CBF\u9AA8\u5E72\u770B\u5230\u524D\u65B9\u8F83\u5706\u7684\u8DD6\u9AA8\u5934\u3002":"\u6CBF\u957F\u8F74\u4ECE\u57FA\u5E95\u8F6C\u5230\u9AA8\u5934\uFF0C\u6BD4\u8F83\u524D\u540E\u4E24\u7AEF\u7684\u5F62\u72B6\u3002\u8DB3\u5E95\u89C6\u89D2\u53EF\u89C2\u5BDF\u8DD6\u9AA8\u5934\u7684\u6392\u5217\u3002",neighbors:[...i===1?["cuneiform-medial"]:i===2?["cuneiform-medial","cuneiform-intermediate","cuneiform-lateral"]:i===3?["cuneiform-lateral"]:["cuboid"],`proximal-${i}`,...i===1?["sesamoid-medial","sesamoid-lateral"]:[]],tip:"\u8DD6\u9AA8\u5728\u811A\u638C\u5185\u90E8\uFF1B\u8DBE\u9AA8\u624D\u662F\u811A\u8DBE\u4E2D\u7684\u9AA8\u3002"});for(let i=1;i<=5;i++)for(let[e,t,n]of[["proximal","\u8FD1\u8282","Proximal"],["middle","\u4E2D\u8282","Middle"],["distal","\u8FDC\u8282","Distal"]]){if(i===1&&e==="middle")continue;let s=i===1?"\u62C7\u8DBE":`\u7B2C${Va[i-1]}\u8DBE`;at.push({id:`${e}-${i}`,name:`${s}${t}\u8DBE\u9AA8`,en:`${n} phalanx \xB7 toe ${i}`,group:"phalanges",region:"\u524D\u8DB3",feature:e==="distal"?"\u672B\u7AEF\u81A8\u5927\u7684\u7C97\u9686":"\u57FA\u5E95\u3001\u9AA8\u4F53\u4E0E\u8FDC\u7AEF\u9AA8\u5934",description:`\u8FD9\u662F${s}\u7684${t}\u8DBE\u9AA8\u3002`+(i===1?"\u62C7\u8DBE\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\u4E24\u5757\u8DBE\u9AA8\uFF0C\u6CA1\u6709\u4E2D\u8282\u3002":"\u7B2C\u4E8C\u81F3\u7B2C\u4E94\u8DBE\u901A\u5E38\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u4E09\u5757\u8DBE\u9AA8\u3002")+(e==="proximal"?"\u5176\u57FA\u5E95\u5728\u540E\u65B9\u4E0E\u540C\u5217\u8DD6\u9AA8\u5934\u76F8\u5173\u8282\u3002":e==="distal"?"\u5B83\u4F4D\u4E8E\u811A\u8DBE\u6700\u672B\u7AEF\uFF0C\u672B\u7AEF\u5F62\u6001\u4E0D\u540C\u4E8E\u524D\u9762\u7684\u9AA8\u8282\u3002":"\u5B83\u4F4D\u4E8E\u8FD1\u8282\u548C\u8FDC\u8282\u4E4B\u95F4\u3002"),look:"\u5355\u72EC\u67E5\u770B\u540E\uFF0C\u8F6C\u52A8\u6BD4\u8F83\u57FA\u5E95\u7684\u51F9\u9762\u4E0E\u53E6\u4E00\u7AEF\u7684\u9AA8\u5F62\u3002\u56DE\u5230\u539F\u4F4D\uFF0C\u6CBF\u540C\u4E00\u811A\u8DBE\u4ECE\u540E\u5411\u524D\u4F9D\u6B21\u8BC6\u522B\u5404\u8282\u3002",neighbors:e==="proximal"?[`metatarsal-${i}`,`${i===1?"distal":"middle"}-${i}`]:e==="middle"?[`proximal-${i}`,`distal-${i}`]:[`${i===1?"proximal":"middle"}-${i}`],tip:i===1?"\u62C7\u8DBE 2 \u8282\uFF0C\u5176\u4F59\u56DB\u8DBE\u5404 3 \u8282\uFF0C\u5171 14 \u5757\u8DBE\u9AA8\u3002":"\u201C\u8FD1\u201D\u9760\u8FD1\u8DD6\u9AA8\uFF0C\u201C\u8FDC\u201D\u9760\u8FD1\u8DBE\u5C16\u3002"})}for(let[i,e]of[["medial","\u5185\u4FA7"],["lateral","\u5916\u4FA7"]])at.push({id:`sesamoid-${i}`,name:`\u62C7\u8DBE${e}\u7C7D\u9AA8`,pinyin:"z\u01D0 g\u01D4",en:`${i==="medial"?"Medial":"Lateral"} hallux sesamoid`,group:"sesamoid",region:"\u524D\u8DB3 \xB7 \u8DB3\u5E95",feature:"\u7B2C\u4E00\u8DD6\u9AA8\u5934\u4E0B\u65B9\u7684\u5C0F\u9AA8",description:`\u4F4D\u4E8E\u7B2C\u4E00\u8DD6\u9AA8\u5934\u8DB3\u5E95\u4FA7\u7684${e}\uFF0C\u5C5E\u4E8E\u62C7\u8DBE\u7C7D\u9AA8\u3002\u7C7D\u9AA8\u5305\u57CB\u4E8E\u76F8\u5173\u808C\u8171\u7ED3\u6784\u4E2D\uFF1B\u672C\u56FE\u53EA\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u6CA1\u6709\u663E\u793A\u808C\u8171\u3002`,look:"\u5207\u6362\u8DB3\u5E95\u89C6\u89D2\uFF0C\u5728\u7B2C\u4E00\u8DD6\u9AA8\u5934\u4E0B\u65B9\u627E\u4E24\u5757\u5C0F\u9AA8\u3002\u9694\u79BB\u540E\u53EF\u4EE5\u66F4\u6E05\u6670\u5730\u770B\u5230\u5355\u4E2A\u7C7D\u9AA8\u7684\u5F62\u72B6\u3002",neighbors:["metatarsal-1"],tip:"\u8FD9\u91CC\u989D\u5916\u5C55\u793A 2 \u5757\u7C7D\u9AA8\uFF0C\u4E0D\u8BA1\u5165\u5E38\u8BF4\u7684 26 \u5757\u57FA\u672C\u8DB3\u9AA8\u3002"});at.unshift({id:"tibia",name:"\u80EB\u9AA8",pinyin:"j\xECng g\u01D4",en:"Tibia",group:"leg",region:"\u5C0F\u817F \xB7 \u5185\u4FA7",feature:"\u4E0A\u7AEF\u3001\u9AA8\u5E72\u3001\u5185\u8E1D",description:"\u5C0F\u817F\u5185\u4FA7\u8F83\u7C97\u58EE\u7684\u957F\u9AA8\u3002\u4E0B\u7AEF\u4E0E\u8DDD\u9AA8\u5F62\u6210\u8E1D\u5173\u8282\u7684\u90E8\u5206\u5173\u8282\u9762\uFF0C\u5185\u4FA7\u5411\u4E0B\u7684\u7A81\u51FA\u662F\u5185\u8E1D\uFF1B\u4E0A\u7AEF\u671D\u5411\u819D\u90E8\uFF0C\u672C\u7248\u5C1A\u672A\u52A0\u5165\u80A1\u9AA8\u548C\u9ACC\u9AA8\u3002",look:"\u5148\u7528\u201C\u5C0F\u817F\u4E0E\u8DB3\u201D\u770B\u6574\u5757\u80EB\u9AA8\uFF0C\u518D\u5207\u5230\u201C\u8DB3\u8E1D\u201D\u770B\u5B83\u7684\u4E0B\u7AEF\u3002\u62C6\u51FA\u80EB\u9AA8\u5E76\u8F6C\u52A8\uFF0C\u6BD4\u8F83\u4E0B\u7AEF\u5173\u8282\u9762\u4E0E\u5185\u8E1D\u7684\u4F4D\u7F6E\uFF1B\u5355\u72EC\u67E5\u770B\u53EF\u4EE5\u89C2\u5BDF\u4E0A\u7AEF\u548C\u9AA8\u5E72\u3002",neighbors:["fibula","talus"],tip:"\u5185\u8E1D\u5C5E\u4E8E\u80EB\u9AA8\uFF0C\u4E0D\u662F\u53E6\u4E00\u5757\u72EC\u7ACB\u7684\u9AA8\u5934\u3002"},{id:"fibula",name:"\u8153\u9AA8",pinyin:"f\xE9i g\u01D4",en:"Fibula",group:"leg",region:"\u5C0F\u817F \xB7 \u5916\u4FA7",feature:"\u8153\u9AA8\u5934\u3001\u9AA8\u5E72\u3001\u5916\u8E1D",description:"\u5C0F\u817F\u5916\u4FA7\u7EC6\u957F\u7684\u9AA8\uFF0C\u4F4D\u4E8E\u80EB\u9AA8\u5916\u4FA7\u3002\u4E0A\u7AEF\u662F\u8153\u9AA8\u5934\uFF0C\u4E0B\u7AEF\u5411\u4E0B\u5EF6\u4F38\u5F62\u6210\u5916\u8E1D\uFF1B\u5916\u8E1D\u5185\u4FA7\u9762\u4E0E\u8DDD\u9AA8\u76F8\u5173\u8282\u3002\u8153\u9AA8\u4E0D\u76F4\u63A5\u4E0E\u80A1\u9AA8\u5F62\u6210\u5173\u8282\u3002",look:"\u5728\u201C\u5C0F\u817F\u4E0E\u8DB3\u201D\u4E2D\u6CBF\u7740\u7EC6\u957F\u9AA8\u5E72\u5411\u4E0B\u627E\u5230\u5916\u8E1D\uFF1B\u5728\u201C\u8DB3\u8E1D\u201D\u4E2D\uFF0C\u6BD4\u8F83\u5916\u8E1D\u3001\u5185\u8E1D\u548C\u8DDD\u9AA8\u7684\u7A7A\u95F4\u5173\u7CFB\u3002\u4F7F\u7528\u201C\u8F6C\u9AA8\u201D\u53EF\u4EE5\u89C2\u5BDF\u5916\u8E1D\u671D\u5411\u8DDD\u9AA8\u7684\u4E00\u9762\u3002",neighbors:["tibia","talus"],tip:"\u5916\u8E1D\u5C5E\u4E8E\u8153\u9AA8\uFF1B\u5185\u5916\u4FA7\u6309\u8EAB\u4F53\u65B9\u4F4D\u5224\u65AD\uFF0C\u4E0D\u6309\u5C4F\u5E55\u5DE6\u53F3\u3002"});var Qc=at.find(i=>i.id==="talus");Qc.description="\u4F4D\u4E8E\u8DDF\u9AA8\u4E0A\u65B9\u3001\u821F\u9AA8\u540E\u65B9\u3002\u4E0A\u9762\u7684\u8DDD\u9AA8\u6ED1\u8F66\u4E0E\u80EB\u9AA8\u3001\u8153\u9AA8\u4E0B\u7AEF\u5171\u540C\u6784\u6210\u8E1D\u5173\u8282\u3002\u672C\u7248\u5DF2\u52A0\u5165\u4E24\u5757\u5B8C\u6574\u5C0F\u817F\u9AA8\uFF0C\u53EF\u5207\u6362\u201C\u8DB3\u8E1D\u201D\u89C2\u5BDF\u8FDE\u63A5\uFF0C\u6216\u5207\u6362\u201C\u5C0F\u817F\u4E0E\u8DB3\u201D\u770B\u5168\u8C8C\u3002";Qc.neighbors=["tibia","fibula",...Qc.neighbors];Hs.unshift({id:"thigh",name:"\u5927\u817F\u4E0E\u819D",pinyin:"",en:"Thigh & knee",count:2,color:"#b59772"});at.push({id:"femur",name:"\u80A1\u9AA8",en:"Femur",group:"thigh",region:"\u5927\u817F",feature:"\u80A1\u9AA8\u5934\u3001\u80A1\u9AA8\u9888\u3001\u5927\u5C0F\u8F6C\u5B50\u3001\u5185\u5916\u4FA7\u9AC1",description:"\u5927\u817F\u4E2D\u7684\u957F\u9AA8\u3002\u8FD1\u7AEF\u7684\u80A1\u9AA8\u5934\u671D\u5411\u5185\u4FA7\uFF0C\u4E0E\u9ACB\u9AA8\u7684\u9ACB\u81FC\u5F62\u6210\u9ACB\u5173\u8282\uFF1B\u672C\u671F\u5C1A\u672A\u52A0\u5165\u9ACB\u9AA8\u3002\u8FDC\u7AEF\u7684\u5185\u3001\u5916\u4FA7\u9AC1\u4E0E\u80EB\u9AA8\u4E0A\u7AEF\u6784\u6210\u819D\u5173\u8282\u7684\u9AA8\u6027\u90E8\u5206\uFF0C\u524D\u65B9\u7684\u9ACC\u9762\u4E0E\u9ACC\u9AA8\u76F8\u5173\u8282\u3002\u80A1\u9AA8\u4E0D\u76F4\u63A5\u4E0E\u8153\u9AA8\u76F8\u5173\u8282\u3002",look:"\u5148\u5728\u201C\u4E0B\u80A2\u5168\u89C8\u201D\u770B\u80A1\u9AA8\u7684\u5B8C\u6574\u5F62\u72B6\uFF1B\u5355\u72EC\u67E5\u770B\u540E\u6BD4\u8F83\u8FD1\u7AEF\u7684\u5706\u5F62\u80A1\u9AA8\u5934\u548C\u8FDC\u7AEF\u7684\u4E24\u4FA7\u9AC1\uFF08k\u0113\uFF09\u3002\u518D\u5207\u5230\u201C\u819D\u90E8\u201D\uFF0C\u79FB\u5F00\u9ACC\u9AA8\uFF0C\u67E5\u770B\u80A1\u9AA8\u8FDC\u7AEF\u524D\u65B9\u7684\u9ACC\u9762\uFF1B\u8F6C\u5230\u540E\u9762\u770B\u9AC1\u95F4\u7A9D\u3002",neighbors:["tibia","patella"],tip:"\u80A1\u9AA8\u5934\u5728\u4E0A\u7AEF\u3001\u671D\u5185\u4FA7\uFF1B\u819D\u90E8\u5728\u4E0B\u7AEF\u3002\u9AC1\u8BFB k\u0113\u3002\u4E0A\u65B9\u9ACB\u9AA8\u5C1A\u672A\u52A0\u5165\u3002"},{id:"patella",name:"\u9ACC\u9AA8",pinyin:"b\xECn g\u01D4",en:"Patella",group:"thigh",region:"\u819D\u524D\u65B9",feature:"\u524D\u9762\u3001\u540E\u65B9\u5173\u8282\u9762\u3001\u5E95\u4E0E\u5C16",description:"\u4FD7\u79F0\u819D\u76D6\u9AA8\uFF0C\u4F4D\u4E8E\u819D\u5173\u8282\u524D\u65B9\uFF0C\u5305\u57CB\u4E8E\u80A1\u56DB\u5934\u808C\u8171\u4E2D\uFF0C\u662F\u4E00\u5757\u7C7D\u9AA8\u3002\u540E\u65B9\u5173\u8282\u9762\u4E0E\u80A1\u9AA8\u7684\u9ACC\u9762\u76F8\u5173\u8282\uFF0C\u5E76\u4E0D\u76F4\u63A5\u4E0E\u80EB\u9AA8\u5F62\u6210\u5173\u8282\u3002\u672C\u6A21\u578B\u6CA1\u6709\u663E\u793A\u808C\u8171\u3001\u9ACC\u97E7\u5E26\u6216\u5173\u8282\u8F6F\u9AA8\u3002",look:"\u5728\u201C\u819D\u90E8\u201D\u4ECE\u524D\u65B9\u627E\u5230\u8FD9\u5757\u5C0F\u9AA8\u3002\u4F7F\u7528\u201C\u62C6\u9AA8\u201D\u628A\u5B83\u5411\u65C1\u8FB9\u79FB\u51FA\uFF0C\u518D\u7528\u201C\u8F6C\u9AA8\u201D\u6BD4\u8F83\u524D\u9762\u548C\u671D\u5411\u80A1\u9AA8\u7684\u540E\u9762\uFF1B\u5355\u72EC\u67E5\u770B\u53EF\u907F\u514D\u5468\u56F4\u9AA8\u5934\u906E\u6321\u3002",neighbors:["femur"],tip:"\u9ACC\u9AA8\u8BFB b\xECn g\u01D4\u3002\u5B83\u63A5\u89E6\u80A1\u9AA8\uFF0C\u4E0D\u76F4\u63A5\u4E0E\u80EB\u9AA8\u76F8\u5173\u8282\uFF1B\u4E0D\u8981\u628A\u81EA\u7531\u62C6\u89E3\u5F53\u4F5C\u771F\u5B9E\u8FD0\u52A8\u3002"});var Ga=at.find(i=>i.id==="tibia");Ga.neighbors=["femur",...Ga.neighbors];Ga.description="\u5C0F\u817F\u5185\u4FA7\u8F83\u7C97\u58EE\u7684\u957F\u9AA8\uFF0C\u4E0A\u7AEF\u5185\u3001\u5916\u4FA7\u9AC1\u4E0E\u80A1\u9AA8\u8FDC\u7AEF\u6784\u6210\u819D\u5173\u8282\u7684\u9AA8\u6027\u90E8\u5206\uFF1B\u5916\u4FA7\u4E0E\u8153\u9AA8\u76F8\u90BB\u3002\u4E0B\u7AEF\u5411\u5185\u5EF6\u4F38\u5F62\u6210\u5185\u8E1D\uFF0C\u4E0E\u8DDD\u9AA8\u5171\u540C\u53C2\u4E0E\u8E1D\u5173\u8282\u3002\u672C\u671F\u5DF2\u52A0\u5165\u80A1\u9AA8\u3001\u9ACC\u9AA8\uFF0C\u53EF\u5207\u6362\u201C\u819D\u90E8\u201D\u89C2\u5BDF\u4E0A\u4E0B\u8854\u63A5\u3002";Ga.look="\u5148\u6CBF\u5B8C\u6574\u9AA8\u5E72\u6BD4\u8F83\u4E0A\u4E0B\u4E24\u7AEF\uFF0C\u518D\u5207\u6362\u201C\u819D\u90E8\u201D\u770B\u4E0A\u7AEF\u80EB\u9AA8\u5E73\u53F0\u4E0E\u80A1\u9AA8\u7684\u5173\u7CFB\uFF1B\u5207\u6362\u201C\u8DB3\u8E1D\u201D\u770B\u4E0B\u7AEF\u53CA\u5185\u8E1D\u3002\u819D\u90E8\u7684\u95F4\u9699\u4E0D\u4EE3\u8868\u7A7A\u65E0\u4E00\u7269\uFF0C\u672C\u7248\u6CA1\u6709\u663E\u793A\u534A\u6708\u677F\u548C\u8F6F\u9AA8\u3002";Hs.unshift({id:"pelvis",name:"\u9AA8\u76C6",pinyin:"",en:"Bony pelvis",count:4,color:"#a99775"});at.push({id:"hip-right",name:"\u53F3\u9ACB\u9AA8",pinyin:"ku\u0101n g\u01D4",en:"Right hip bone",group:"pelvis",region:"\u9AA8\u76C6 \xB7 \u53F3\u4FA7",feature:"\u9AC2\u5D74\u3001\u9ACB\u81FC\u3001\u95ED\u5B54\u4E0E\u5750\u9AA8\u7ED3\u8282",description:"\u9AA8\u76C6\u53F3\u4FA7\u7684\u9ACB\u9AA8\u3002\u6210\u4EBA\u9ACB\u9AA8\u7531\u9AC2\u9AA8\u3001\u5750\u9AA8\u3001\u803B\u9AA8\u878D\u5408\u800C\u6210\uFF0C\u672C\u9875\u6309\u4E00\u5757\u5B8C\u6574\u9AA8\u663E\u793A\uFF0C\u4E0D\u628A\u8FD9\u4E09\u4E2A\u533A\u57DF\u5F53\u4F5C\u53EF\u4EE5\u6D3B\u52A8\u7684\u4E09\u5757\u9AA8\u3002\u5916\u4FA7\u7684\u9ACB\u81FC\u4E0E\u53F3\u80A1\u9AA8\u5934\u7EC4\u6210\u9ACB\u5173\u8282\uFF1B\u540E\u65B9\u4E0E\u9AB6\u9AA8\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\uFF0C\u524D\u65B9\u7ECF\u803B\u9AA8\u8054\u5408\u4E0E\u5DE6\u9ACB\u9AA8\u8FDE\u63A5\u3002",look:"\u5207\u5230\u201C\u53F3\u9ACB\u90E8\u201D\u89C2\u5BDF\u80A1\u9AA8\u5934\u4E0E\u9ACB\u81FC\uFF08ku\u0101n ji\xF9\uFF09\u7684\u8854\u63A5\uFF0C\u79FB\u5F00\u80A1\u9AA8\u540E\u67E5\u770B\u7A9D\u72B6\u7684\u9ACB\u81FC\uFF1B\u5355\u72EC\u67E5\u770B\u65F6\uFF0C\u6BD4\u8F83\u4E0A\u65B9\u7684\u9AC2\uFF08qi\xE0\uFF09\u9AA8\u7FFC\u3001\u4E0B\u65B9\u7684\u95ED\u5B54\u4E0E\u540E\u4E0B\u65B9\u7684\u5750\u9AA8\u7ED3\u8282\u3002",neighbors:["femur","sacrum","hip-left"],tip:"\u53F3\u4FA7\u6307\u4EBA\u4F53\u81EA\u8EAB\u7684\u53F3\u4FA7\uFF0C\u4E0D\u662F\u5C4F\u5E55\u53F3\u8FB9\u3002\u9AC2\u9AA8\u3001\u5750\u9AA8\u3001\u803B\u9AA8\u662F\u6210\u4EBA\u9ACB\u9AA8\u7684\u4E09\u4E2A\u878D\u5408\u533A\u57DF\u3002"},{id:"hip-left",name:"\u5DE6\u9ACB\u9AA8",pinyin:"ku\u0101n g\u01D4",en:"Left hip bone",group:"pelvis",region:"\u9AA8\u76C6 \xB7 \u5DE6\u4FA7",feature:"\u9ACB\u81FC\u3001\u9AC2\u9AA8\u7FFC\u4E0E\u803B\u9AA8\u8054\u5408\u9762",description:"\u9AA8\u76C6\u5DE6\u4FA7\u7684\u9ACB\u9AA8\uFF0C\u4E0E\u53F3\u9ACB\u9AA8\u53CA\u9AB6\u9AA8\u3001\u5C3E\u9AA8\u7EC4\u6210\u9AA8\u6027\u9AA8\u76C6\u3002\u5916\u4FA7\u9ACB\u81FC\u7528\u4E8E\u5BB9\u7EB3\u5DE6\u80A1\u9AA8\u5934\uFF1B\u672C\u671F\u5C1A\u672A\u52A0\u5165\u5DE6\u80A1\u9AA8\u548C\u5DE6\u4E0B\u80A2\uFF0C\u56E0\u6B64\u8FD9\u4FA7\u9ACB\u81FC\u5448\u7A7A\u51FA\u72B6\u6001\uFF0C\u4E0D\u662F\u6A21\u578B\u52A0\u8F7D\u5931\u8D25\u3002\u524D\u65B9\u7ECF\u803B\u9AA8\u8054\u5408\u4E0E\u53F3\u9ACB\u9AA8\u76F8\u63A5\u3002",look:"\u5207\u5230\u201C\u9AA8\u76C6\u201D\uFF0C\u5BF9\u7167\u5DE6\u53F3\u4E24\u5757\u9ACB\u9AA8\uFF1B\u4ECE\u5916\u4FA7\u89C2\u5BDF\u9ACB\u81FC\uFF0C\u4ECE\u5185\u4FA7\u89C2\u5BDF\u9AC2\u7A9D\uFF0C\u518D\u8F6C\u5230\u524D\u65B9\u6BD4\u8F83\u4E24\u4FA7\u803B\u9AA8\u8054\u5408\u9762\u7684\u76F8\u5BF9\u4F4D\u7F6E\u3002\u672C\u6A21\u578B\u672A\u663E\u793A\u803B\u9AA8\u95F4\u76D8\u3002",neighbors:["sacrum","hip-right"],tip:"\u5DE6\u9ACB\u9AA8\u4F7F\u7528\u539F\u59CB\u6A21\u578B\u53D1\u5E03\u7684\u5DE6\u4FA7\u7F51\u683C\u53CA\u53D8\u6362\u3002\u672C\u671F\u53EA\u63A5\u5165\u53F3\u4E0B\u80A2\uFF0C\u5DE6\u4FA7\u80A1\u9AA8\u5C1A\u672A\u52A0\u5165\u3002"},{id:"sacrum",name:"\u9AB6\u9AA8",pinyin:"d\u01D0 g\u01D4",en:"Sacrum",group:"pelvis",region:"\u9AA8\u76C6\u540E\u65B9 \xB7 \u810A\u67F1\u4E0B\u7AEF",feature:"\u9AB6\u5CAC\u3001\u524D\u540E\u9AB6\u5B54\u4E0E\u8033\u72B6\u9762",description:"\u4F4D\u4E8E\u4E24\u5757\u9ACB\u9AA8\u4E4B\u95F4\u3001\u9AA8\u76C6\u540E\u65B9\uFF0C\u7531\u9AB6\u690E\u878D\u5408\u5F62\u6210\u3002\u4E24\u4FA7\u4E0E\u9ACB\u9AA8\u7684\u9AC2\u9AA8\u533A\u57DF\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\uFF1B\u4E0A\u65B9\u627F\u63A5\u8170\u690E\uFF0C\u4E0B\u7AEF\u8FDE\u63A5\u5C3E\u9AA8\u3002\u672C\u671F\u672A\u52A0\u5165\u8170\u690E\uFF0C\u56E0\u6B64\u9AB6\u9AA8\u4E0A\u65B9\u4FDD\u7559\u4E3A\u7A7A\u3002",look:"\u5148\u4ECE\u524D\u65B9\u770B\u8F83\u51F9\u7684\u76C6\u9762\u53CA\u524D\u9AB6\u5B54\uFF0C\u518D\u7528\u201C\u540E\u9762\u201D\u89C6\u89D2\u6BD4\u8F83\u540E\u65B9\u7684\u9AA8\u5D74\u4E0E\u540E\u9AB6\u5B54\uFF1B\u79FB\u5F00\u4E00\u4FA7\u9ACB\u9AA8\uFF0C\u89C2\u5BDF\u4E24\u9AA8\u76F8\u5BF9\u7684\u8033\u72B6\u9762\u3002\u8868\u9762\u7CBE\u5EA6\u53D7\u6E90\u7F51\u683C\u9650\u5236\u3002",neighbors:["hip-right","hip-left","coccyx"],tip:"\u9AB6\u8BFB d\u01D0\u3002\u89C2\u5BDF\u5C55\u5F00\u4E0D\u8868\u793A\u9AB6\u9AC2\u5173\u8282\u53EF\u4EE5\u50CF\u6A21\u578B\u4E00\u6837\u5927\u5E45\u5206\u79BB\u6216\u8F6C\u52A8\u3002"},{id:"coccyx",name:"\u5C3E\u9AA8",en:"Coccyx",group:"pelvis",region:"\u9AB6\u9AA8\u4E0B\u65B9 \xB7 \u810A\u67F1\u672B\u7AEF",feature:"\u5C3E\u9AA8\u5E95\u4E0E\u5C3E\u9AA8\u5C16",description:"\u4F4D\u4E8E\u9AB6\u9AA8\u4E0B\u65B9\u7684\u810A\u67F1\u672B\u7AEF\u5C0F\u9AA8\uFF0C\u7531\u5C3E\u690E\u6784\u6210\uFF0C\u878D\u5408\u7A0B\u5EA6\u5B58\u5728\u4E2A\u4F53\u5DEE\u5F02\u3002\u672C\u6A21\u578B\u5C06\u5176\u4F5C\u4E3A\u4E00\u4E2A\u5B8C\u6574\u9AA8\u5757\uFF0C\u53EF\u4ECE\u9AB6\u9AA8\u4E0B\u7AEF\u7684\u8FDE\u63A5\u5904\u5B9A\u4F4D\u3002\u5468\u56F4\u8F6F\u7EC4\u7EC7\u6CA1\u6709\u5728\u672C\u9875\u663E\u793A\u3002",look:"\u5728\u201C\u9AA8\u76C6\u201D\u9009\u62E9\u5C3E\u9AA8\u540E\u70B9\u51FB\u201C\u5355\u72EC\u67E5\u770B\u201D\uFF0C\u653E\u5927\u8F6C\u52A8\u89C2\u5BDF\uFF1B\u56DE\u5230\u533A\u57DF\u540E\uFF0C\u4ECE\u540E\u9762\u6216\u4FA7\u9762\u770B\u5B83\u4E0E\u9AB6\u9AA8\u4E0B\u7AEF\u7684\u6392\u5217\u3002\u5B83\u8F83\u5C0F\uFF0C\u5FC5\u8981\u65F6\u5148\u9690\u85CF\u5468\u56F4\u9ACB\u9AA8\u3002",neighbors:["sacrum"],tip:"\u5C3E\u9AA8\u4E0D\u662F\u5750\u9AA8\u3002\u9700\u8981\u8FD1\u770B\u65F6\u4F7F\u7528\u201C\u5355\u72EC\u67E5\u770B\u201D\uFF0C\u4E0D\u5FC5\u628A\u6574\u4E2A\u9AA8\u76C6\u653E\u5F97\u5F88\u5927\u3002"});var Hr=at.find(i=>i.id==="femur");Hr.neighbors=["hip-right",...Hr.neighbors];Hr.description="\u5927\u817F\u4E2D\u7684\u957F\u9AA8\u3002\u4E0A\u7AEF\u7684\u80A1\u9AA8\u5934\u671D\u5411\u5185\u4FA7\uFF0C\u4E0E\u53F3\u9ACB\u9AA8\u7684\u9ACB\u81FC\u6784\u6210\u9ACB\u5173\u8282\uFF0C\u672C\u671F\u5DF2\u52A0\u5165\u5B8C\u6574\u9AA8\u76C6\u3002\u4E0B\u7AEF\u7684\u5185\u5916\u4FA7\u9AC1\u4E0E\u80EB\u9AA8\u4E0A\u7AEF\u6784\u6210\u819D\u5173\u8282\u7684\u9AA8\u6027\u90E8\u5206\uFF0C\u524D\u65B9\u9ACC\u9762\u4E0E\u9ACC\u9AA8\u76F8\u5173\u8282\uFF1B\u4E0D\u76F4\u63A5\u4E0E\u8153\u9AA8\u76F8\u5173\u8282\u3002";Hr.look="\u5207\u5230\u201C\u53F3\u9ACB\u90E8\u201D\u67E5\u770B\u5706\u5F62\u80A1\u9AA8\u5934\u3001\u8F83\u7EC6\u7684\u80A1\u9AA8\u9888\u4E0E\u9ACB\u81FC\u7684\u8854\u63A5\uFF1B\u7528\u201C\u62C6\u9AA8\u201D\u79FB\u5F00\u80A1\u9AA8\uFF0C\u6BD4\u8F83\u4E24\u4FA7\u76F8\u5BF9\u9AA8\u9762\u3002\u5355\u72EC\u67E5\u770B\u5B8C\u6574\u80A1\u9AA8\uFF0C\u518D\u5207\u5230\u201C\u819D\u90E8\u201D\u89C2\u5BDF\u4E0B\u7AEF\u3002";Hr.tip="\u672C\u671F\u5DF2\u52A0\u5165\u53F3\u9ACB\u9AA8\u3002\u9ACB\u5173\u8282\u5728\u80A1\u9AA8\u4E0A\u7AEF\uFF0C\u819D\u5173\u8282\u5728\u4E0B\u7AEF\uFF1B\u672C\u9875\u4E0D\u663E\u793A\u8F6F\u9AA8\u6216\u9ACB\u81FC\u5507\u3002";var Ud=at.filter(i=>i.group!=="pelvis"),J0=new Set(Ud.map(i=>i.id));for(let i of Ud){let e={...i,id:i.id+"-left",name:"\u5DE6"+i.name,en:"Left "+i.en,side:"left",baseId:i.id,description:i.description.replaceAll("\u53F3","\u5DE6"),look:i.look.replaceAll("\u53F3\u9ACB\u90E8","\u9ACB\u90E8"),tip:i.tip.replaceAll("\u53F3","\u5DE6"),neighbors:i.neighbors.map(t=>J0.has(t)?t+"-left":t==="hip-right"?"hip-left":t)};i.name="\u53F3"+i.name,i.en="Right "+i.en,i.side="right",i.baseId=i.id,i.look=i.look.replaceAll("\u53F3\u9ACB\u90E8","\u9ACB\u90E8"),at.push(e)}for(let i of at.filter(e=>e.group==="pelvis"))i.side=i.id==="hip-right"?"right":i.id==="hip-left"?"left":"midline",i.baseId=i.id;var th=at.find(i=>i.id==="hip-left");th.neighbors=["femur-left","sacrum","hip-right"];th.description="\u9AA8\u76C6\u5DE6\u4FA7\u7684\u9ACB\u9AA8\u3002\u5916\u4FA7\u9ACB\u81FC\u4E0E\u5DE6\u80A1\u9AA8\u5934\u6784\u6210\u5DE6\u9ACB\u5173\u8282\uFF1B\u672C\u7248\u5DF2\u8865\u9F50\u5DE6\u4FA7\u5927\u817F\u3001\u5C0F\u817F\u548C\u8DB3\u90E8\u3002\u524D\u65B9\u7ECF\u803B\u9AA8\u8054\u5408\u4E0E\u53F3\u9ACB\u9AA8\u8FDE\u63A5\uFF0C\u540E\u65B9\u4E0E\u9AB6\u9AA8\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\u3002\u6210\u4EBA\u9ACB\u9AA8\u6574\u4F53\u663E\u793A\u3002";th.tip="\u5DE6\u4FA7\u6307\u4EBA\u4F53\u81EA\u8EAB\u7684\u5DE6\u4FA7\uFF1B\u6B63\u9762\u89C2\u5BDF\u65F6\u901A\u5E38\u5728\u5C4F\u5E55\u53F3\u8FB9\u3002\u5DE6\u4FA7\u6A21\u578B\u4F7F\u7528\u6E90\u6587\u4EF6\u81EA\u5E26\u7684\u7F51\u683C\u4E0E\u53CD\u5C04\u53D8\u6362\u3002";at.find(i=>i.id==="hip-right").look=at.find(i=>i.id==="hip-right").look.replaceAll("\u53F3\u9ACB\u90E8","\u9ACB\u90E8");var eh=at.find(i=>i.id==="sacrum");eh.neighbors=["L5",...eh.neighbors];eh.description="\u4F4D\u4E8E\u4E24\u5757\u9ACB\u9AA8\u4E4B\u95F4\u3001\u9AA8\u76C6\u540E\u65B9\uFF0C\u7531\u9AB6\u690E\u878D\u5408\u5F62\u6210\u3002\u4E24\u4FA7\u4E0E\u9ACB\u9AA8\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\uFF1B\u4E0A\u65B9\u627F\u63A5\u7B2C\u4E94\u8170\u690E L5\uFF0C\u4E0B\u7AEF\u8FDE\u63A5\u5C3E\u9AA8\u3002\u672C\u7248\u5DF2\u52A0\u5165 L1\u2014L5\uFF0C\u690E\u95F4\u76D8\u548C\u97E7\u5E26\u672A\u663E\u793A\u3002";Hs.unshift({id:"lumbar",name:"\u8170\u690E",pinyin:"y\u0101o zhu\u012B",en:"Lumbar vertebrae",count:5,color:"#8b9fa7"});for(let i=1;i<=5;i++)at.push({id:"L"+i,baseId:"L"+i,side:"midline",name:"\u7B2C"+["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94"][i-1]+"\u8170\u690E",en:"Lumbar vertebra L"+i,group:"lumbar",region:"\u8170\u90E8 \xB7 L"+i,feature:"\u690E\u4F53\u3001\u690E\u5F13\u3001\u68D8\u7A81\u4E0E\u5173\u8282\u7A81",description:"\u8170\u690E\u7531\u4E0A\u5411\u4E0B\u7F16\u53F7 L1\u2014L5\uFF0C\u8FD9\u662F\u7B2C"+["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94"][i-1]+"\u8170\u690E\uFF08L"+i+"\uFF09\u3002"+(i===1?"\u4E0A\u65B9\u63A5\u7B2C\u5341\u4E8C\u80F8\u690E\uFF0C\u672C\u671F\u80F8\u690E\u5C1A\u672A\u52A0\u5165\u3002":i===5?"\u4E0B\u65B9\u4E0E\u9AB6\u9AA8\u5F62\u6210\u8170\u9AB6\u8FDE\u63A5\uFF0C\u662F\u8170\u690E\u4E0E\u9AA8\u76C6\u4E4B\u95F4\u7684\u8854\u63A5\u5904\u3002":"\u4F4D\u4E8E L"+(i-1)+" \u4E0E L"+(i+1)+" \u4E4B\u95F4\u3002")+"\u524D\u65B9\u8F83\u5927\u7684\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\u56F4\u51FA\u690E\u5B54\u3002\u76F8\u90BB\u690E\u4F53\u95F4\u7684\u690E\u95F4\u76D8\u672A\u663E\u793A\uFF0C\u753B\u9762\u95F4\u9699\u4E0D\u4EE3\u8868\u4F53\u5185\u7A7A\u65E0\u4E00\u7269\u3002",look:"\u5148\u4ECE\u4FA7\u9762\u770B\u8FD9\u8282\u690E\u9AA8\u5728\u6574\u6BB5\u8170\u690E\u4E2D\u7684\u6392\u5217\uFF0C\u518D\u5355\u72EC\u67E5\u770B\uFF0C\u6BD4\u8F83\u524D\u65B9\u690E\u4F53\u3001\u540E\u65B9\u68D8\u7A81\u548C\u4E24\u4FA7\u6A2A\u7A81\u3002\u8F6C\u5230\u4E0A\u65B9\u89C2\u5BDF\u690E\u5B54\uFF0C\u6CE8\u610F\u76F8\u90BB\u690E\u9AA8\u5173\u8282\u7A81\u7684\u76F8\u5BF9\u671D\u5411\u3002"+(i===5?"\u56DE\u5230\u201C\u8170\u9AB6\u4E0E\u9AA8\u76C6\u201D\uFF0C\u6BD4\u8F83 L5 \u4E0E\u9AB6\u9AA8\u4E0A\u7AEF\u7684\u65B9\u5411\u3002":""),neighbors:[...i>1?["L"+(i-1)]:[],...i<5?["L"+(i+1)]:["sacrum"]],tip:"L"+i+" \u662F\u7F16\u53F7\uFF0C\u4E0D\u662F\u989D\u5916\u9AA8\u5757\u3002\u6B64\u9875\u53EA\u5C55\u793A\u9AA8\u8868\u9762\uFF1B\u6CA1\u6709\u690E\u95F4\u76D8\u3001\u795E\u7ECF\u3001\u810A\u9AD3\u6216\u75BE\u75C5\u3001\u590D\u4F4D\u6A21\u62DF\u3002"});for(let i of Hs)i.count=at.filter(e=>e.group===i.id).length;if(at.length!==73||new Set(at.map(i=>i.id)).size!==73)throw Error("Bone metadata incomplete");var j0=new Set(at.map(i=>i.id));for(let i of at)for(let e of i.neighbors)if(!j0.has(e))throw Error("Unknown neighbor "+e);var ub=Object.fromEntries(at.map((i,e)=>[i.id,{...i,index:e+1}])),Od=[{title:"OpenStax \xB7 \u810A\u67F1\u4E0E\u8170\u690E",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",note:"L1\u2014L5\u3001\u8170\u9AB6\u8854\u63A5\u3001\u690E\u4F53\u4E0E\u690E\u5F13\u7684\u6559\u5B66\u53C2\u8003\u3002"},{title:"OpenStax \xB7 \u9AA8\u76C6\u4E0E\u9ACB\u9AA8",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/8-3-the-pelvic-girdle-and-pelvis",note:"\u9AA8\u76C6\u3001\u6210\u4EBA\u9ACB\u9AA8\u878D\u5408\u533A\u57DF\u3001\u9AB6\u9AC2\u5173\u8282\u4E0E\u803B\u9AA8\u8054\u5408\u7684\u6559\u5B66\u53C2\u8003\u3002"},{title:"OpenStax \xB7 \u4E0B\u80A2\u9AA8\u4E0E\u819D\u90E8\u89E3\u5256",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/8-4-bones-of-the-lower-limb",note:"\u80A1\u9AA8\u3001\u9ACC\u9AA8\u3001\u80EB\u8153\u9AA8\u53CA\u819D\u8E1D\u9AA8\u6027\u5173\u7CFB\u7684\u6559\u5B66\u53C2\u8003\u3002"},{title:"Z-Anatomy \xB7 \u539F\u59CB\u89E3\u5256\u56FE\u8C31",url:"https://github.com/Z-Anatomy/Models-of-human-anatomy",note:"Gauthier Kervyn \u4E0E\u8D21\u732E\u8005\uFF1B\u6A21\u578B\u8BB8\u53EF CC BY-SA 4.0\u3002"},{title:"BodyParts3D \xB7 \u4E0A\u6E38\u6570\u636E\u5E93\u4E0E\u5EFA\u6A21\u8BF4\u660E",url:"https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html",note:"\xA9 The Database Center for Life Science\uFF1B\u4E0A\u6E38\u6570\u636E CC BY-SA 2.1 Japan\u3002"},{title:"\u672C\u6B21\u63D0\u53D6\u4F7F\u7528\u7684 Z-Anatomy GLB \u5BFC\u51FA",url:"https://github.com/Liyucheng1997/242_lab-human-anatomy/blob/main/public/models/skeleton.glb",note:"\u6765\u6E90\u6587\u4EF6 blob SHA\uFF1A5e15f7ea303c554f6c25a417f7f184696234b436\u3002"},{title:"NCBI Bookshelf \xB7 Foot and Ankle",url:"https://www.ncbi.nlm.nih.gov/books/NBK546698/",note:"\u7528\u4E8E\u6838\u5BF9\u8DB3\u90E8\u57FA\u672C\u5206\u533A\u548C\u9AA8\u9ABC\u7EC4\u6210\u3002"},{title:"NCBI Bookshelf \xB7 Calcaneus / Talus",url:"https://www.ncbi.nlm.nih.gov/books/NBK519544/",note:"\u8DDF\u9AA8\u7ED3\u6784\u8BF4\u660E\uFF1B\u8DDD\u9AA8\u53C2\u8003 NBK541086\u3002"},{title:"NCBI Bookshelf \xB7 Navicular Bone",url:"https://www.ncbi.nlm.nih.gov/books/NBK547675/",note:"\u821F\u9AA8\u7684\u4F4D\u7F6E\u4E0E\u5F62\u6001\u53C2\u8003\u3002"}];var Fd=[{id:"frontal",name:"\u989D\u9AA8",en:"Frontal bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Frontal bone.001"],description:"\u6784\u6210\u989D\u90E8\u548C\u773C\u7736\u4E0A\u58C1\uFF0C\u4F4D\u4E8E\u9885\u9AA8\u524D\u4E0A\u65B9\u3002",look:"\u7531\u989D\u90E8\u8F6C\u5411\u4E0B\u65B9\uFF0C\u6BD4\u8F83\u7736\u90E8\u7684\u5E73\u9762\u4E0E\u5411\u540E\u5F2F\u66F2\u7684\u9885\u9762\u3002",tip:"\u989D\u9AA8\u662F\u4E00\u5757\uFF1B\u5DE6\u53F3\u773C\u7736\u4E0A\u65B9\u5C5E\u4E8E\u540C\u4E00\u989D\u9AA8\u3002",neighbors:["parietal-right","parietal-left","sphenoid","ethmoid","nasal-right","nasal-left"],side:"midline",baseId:"frontal",pinyin:""},{id:"occipital",name:"\u6795\u9AA8",en:"Occipital bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Occipital bone.001"],description:"\u4F4D\u4E8E\u9885\u540E\u4E0B\u90E8\uFF0C\u53C2\u4E0E\u9885\u5E95\uFF0C\u5E76\u56F4\u7ED5\u6795\u9AA8\u5927\u5B54\u3002",look:"\u4ECE\u9885\u5E95\u770B\u6795\u9AA8\u5927\u5B54\u53CA\u5176\u4E24\u4FA7\u7684\u6795\u9AC1\uFF0C\u518D\u5BF9\u7167\u4E0B\u65B9\u5BF0\u690E\u7684\u4F4D\u7F6E\u3002",tip:"\u6795\u9AA8\u4E0B\u65B9\u4E0E\u7B2C\u4E00\u9888\u690E\u8854\u63A5\uFF1B\u672C\u56FE\u6CA1\u6709\u663E\u793A\u810A\u9AD3\u3002",neighbors:["parietal-right","parietal-left","temporal-right","temporal-left","sphenoid","C1"],side:"midline",baseId:"occipital",pinyin:""},{id:"sphenoid",name:"\u8776\u9AA8",en:"Sphenoid bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Sphenoid bone.001"],description:"\u4F4D\u4E8E\u9885\u5E95\u4E2D\u592E\uFF0C\u5411\u4E24\u4FA7\u5C55\u5F00\uFF0C\u53C2\u4E0E\u773C\u7736\u548C\u9885\u5E95\u7684\u6784\u6210\u3002",look:"\u5355\u72EC\u67E5\u770B\uFF0C\u6BD4\u8F83\u4E2D\u592E\u9AA8\u4F53\u3001\u5411\u4E24\u4FA7\u7684\u7FFC\u72B6\u90E8\u5206\u548C\u5411\u4E0B\u7684\u7FFC\u7A81\u3002",tip:"\u4ECE\u6574\u9885\u4E2D\u79FB\u5F00\u5468\u56F4\u9AA8\uFF0C\u8F83\u5BB9\u6613\u7406\u89E3\u8776\u9AA8\u7684\u4F4D\u7F6E\u3002",neighbors:["frontal","ethmoid","occipital","temporal-right","temporal-left","parietal-right","parietal-left"],side:"midline",baseId:"sphenoid",pinyin:""},{id:"ethmoid",name:"\u7B5B\u9AA8",en:"Ethmoid bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Ethmoid bone.001"],description:"\u4F4D\u4E8E\u4E24\u773C\u7736\u4E4B\u95F4\u548C\u9F3B\u8154\u4E0A\u90E8\uFF0C\u53C2\u4E0E\u9F3B\u4E2D\u9694\u3001\u9F3B\u8154\u4FA7\u58C1\u53CA\u7736\u5185\u4FA7\u58C1\u3002",look:"\u79FB\u5F00\u989D\u9AA8\u548C\u9F3B\u9AA8\uFF0C\u89C2\u5BDF\u7B5B\u9AA8\u7684\u4E2D\u7EBF\u9AA8\u677F\u53CA\u5DE6\u53F3\u4E24\u4FA7\u7684\u7ED3\u6784\u3002",tip:"\u4E0A\u3001\u4E2D\u9F3B\u7532\u5C5E\u4E8E\u7B5B\u9AA8\uFF1B\u4E0B\u9F3B\u7532\u662F\u53E6\u5916\u7684\u72EC\u7ACB\u9AA8\u3002",neighbors:["frontal","sphenoid","vomer","lacrimal-right","lacrimal-left","maxilla-right","maxilla-left"],side:"midline",baseId:"ethmoid",pinyin:""},{id:"parietal-right",name:"\u53F3\u9876\u9AA8",en:"Parietal bone \xB7 right",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Parietal bone.r.001"],description:"\u4F4D\u4E8E\u9885\u9876\u53CA\u9885\u4FA7\u4E0A\u90E8\uFF1B\u5DE6\u53F3\u9876\u9AA8\u5171\u540C\u5F62\u6210\u9885\u76D6\u7684\u5927\u90E8\u5206\u3002",look:"\u8F6C\u52A8\u89C2\u5BDF\u5916\u8868\u9762\u7684\u5F27\u5EA6\uFF0C\u518D\u770B\u671D\u5411\u9885\u8154\u7684\u5185\u8868\u9762\u548C\u5468\u8FB9\u9AA8\u7F1D\u8FB9\u7F18\u3002",tip:"\u9AA8\u7F1D\u662F\u8FDE\u63A5\u8FB9\u754C\uFF1B\u62C6\u5F00\u53EA\u662F\u6559\u5B66\u5C55\u793A\uFF0C\u4E0D\u8868\u793A\u53EF\u81EA\u7531\u6D3B\u52A8\u3002",neighbors:["frontal","occipital","temporal-right","sphenoid","parietal-left"],side:"right",baseId:"parietal",pinyin:""},{id:"temporal-right",name:"\u53F3\u989E\u9AA8",en:"Temporal bone \xB7 right",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Temporal bone.r.001"],description:"\u4F4D\u4E8E\u9885\u4FA7\u4E0B\u90E8\u548C\u9885\u5E95\uFF0C\u5916\u8033\u9053\u533A\u57DF\u3001\u4E73\u7A81\u53CA\u4E0B\u988C\u7A9D\u4F4D\u4E8E\u6B64\u9AA8\u3002",look:"\u7531\u4FA7\u9762\u5BFB\u627E\u5916\u8033\u9053\u9644\u8FD1\u548C\u98A7\u7A81\uFF0C\u518D\u4ECE\u4E0B\u65B9\u770B\u4E0E\u4E0B\u988C\u9AA8\u76F8\u5BF9\u7684\u4E0B\u988C\u7A9D\u3002",tip:"\u989E\u9AA8\u8BFB ni\xE8 g\u01D4\u3002\u4E2D\u8033\u542C\u5C0F\u9AA8\u53EF\u5728\u4E13\u95E8\u533A\u57DF\u653E\u5927\u89C2\u5BDF\u3002",neighbors:["parietal-right","occipital","sphenoid","zygomatic-right","mandible"],side:"right",baseId:"temporal",pinyin:"ni\xE8 g\u01D4"},{id:"parietal-left",name:"\u5DE6\u9876\u9AA8",en:"Parietal bone \xB7 left",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Parietal bone.l.001"],description:"\u4F4D\u4E8E\u9885\u9876\u53CA\u9885\u4FA7\u4E0A\u90E8\uFF1B\u5DE6\u53F3\u9876\u9AA8\u5171\u540C\u5F62\u6210\u9885\u76D6\u7684\u5927\u90E8\u5206\u3002",look:"\u8F6C\u52A8\u89C2\u5BDF\u5916\u8868\u9762\u7684\u5F27\u5EA6\uFF0C\u518D\u770B\u671D\u5411\u9885\u8154\u7684\u5185\u8868\u9762\u548C\u5468\u8FB9\u9AA8\u7F1D\u8FB9\u7F18\u3002",tip:"\u9AA8\u7F1D\u662F\u8FDE\u63A5\u8FB9\u754C\uFF1B\u62C6\u5F00\u53EA\u662F\u6559\u5B66\u5C55\u793A\uFF0C\u4E0D\u8868\u793A\u53EF\u81EA\u7531\u6D3B\u52A8\u3002",neighbors:["frontal","occipital","temporal-left","sphenoid","parietal-right"],side:"left",baseId:"parietal",pinyin:""},{id:"temporal-left",name:"\u5DE6\u989E\u9AA8",en:"Temporal bone \xB7 left",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Temporal bone.l.001"],description:"\u4F4D\u4E8E\u9885\u4FA7\u4E0B\u90E8\u548C\u9885\u5E95\uFF0C\u5916\u8033\u9053\u533A\u57DF\u3001\u4E73\u7A81\u53CA\u4E0B\u988C\u7A9D\u4F4D\u4E8E\u6B64\u9AA8\u3002",look:"\u7531\u4FA7\u9762\u5BFB\u627E\u5916\u8033\u9053\u9644\u8FD1\u548C\u98A7\u7A81\uFF0C\u518D\u4ECE\u4E0B\u65B9\u770B\u4E0E\u4E0B\u988C\u9AA8\u76F8\u5BF9\u7684\u4E0B\u988C\u7A9D\u3002",tip:"\u989E\u9AA8\u8BFB ni\xE8 g\u01D4\u3002\u4E2D\u8033\u542C\u5C0F\u9AA8\u53EF\u5728\u4E13\u95E8\u533A\u57DF\u653E\u5927\u89C2\u5BDF\u3002",neighbors:["parietal-left","occipital","sphenoid","zygomatic-left","mandible"],side:"left",baseId:"temporal",pinyin:"ni\xE8 g\u01D4"},{id:"maxilla-right",name:"\u53F3\u4E0A\u988C\u9AA8",en:"Maxilla \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Maxilla.r.001"],description:"\u5F62\u6210\u4E0A\u988C\u3001\u786C\u816D\u7684\u524D\u90E8\u548C\u773C\u7736\u5E95\u90E8\u7684\u4E00\u90E8\u5206\u3002",look:"\u6BD4\u8F83\u7259\u69FD\u7F18\u3001\u7736\u9762\u548C\u5411\u5185\u7684\u816D\u7A81\uFF1B\u5DE6\u53F3\u4E0A\u988C\u9AA8\u5728\u4E2D\u7EBF\u76F8\u63A5\u3002",tip:"\u7259\u9F7F\u4E0D\u5C5E\u4E8E\u9AA8\uFF0C\u672A\u8BA1\u5165\u672C\u56FE206\u5757\u6807\u51C6\u9AA8\u3002",neighbors:["frontal","ethmoid","nasal-right","lacrimal-right","zygomatic-right","palatine-right","inferior-concha-right","maxilla-left","vomer"],side:"right",baseId:"maxilla",pinyin:"h\xE9 g\u01D4"},{id:"zygomatic-right",name:"\u53F3\u98A7\u9AA8",en:"Zygomatic bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Zygomatic bone.r.001"],description:"\u5F62\u6210\u9762\u988A\u7684\u9AA8\u6027\u7A81\u8D77\uFF0C\u53C2\u4E0E\u773C\u7736\u5916\u4FA7\u58C1\u53CA\u98A7\u5F13\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u5B83\u5982\u4F55\u5411\u540E\u63A5\u7EED\u989E\u9AA8\u7684\u98A7\u7A81\uFF0C\u518D\u770B\u671D\u5411\u773C\u7736\u7684\u9AA8\u9762\u3002",tip:"\u98A7\u5F13\u7531\u98A7\u9AA8\u4E0E\u989E\u9AA8\u7684\u76F8\u5E94\u9AA8\u7A81\u5171\u540C\u5F62\u6210\u3002",neighbors:["frontal","sphenoid","temporal-right","maxilla-right"],side:"right",baseId:"zygomatic",pinyin:"qu\xE1n g\u01D4"},{id:"nasal-right",name:"\u53F3\u9F3B\u9AA8",en:"Nasal bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Nasal bone.r.001"],description:"\u4F4D\u4E8E\u9F3B\u6881\u4E0A\u90E8\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\uFF0C\u5904\u4E8E\u989D\u9AA8\u4E0B\u65B9\u548C\u4E0A\u988C\u9AA8\u4E4B\u95F4\u3002",look:"\u5728\u6B63\u9762\u8FA8\u8BA4\u5DE6\u53F3\u9F3B\u9AA8\uFF0C\u518D\u5355\u72EC\u65CB\u8F6C\u770B\u5176\u8584\u677F\u72B6\u5F62\u6001\u3002",tip:"\u9F3B\u5C16\u4E3B\u8981\u4E0D\u662F\u9AA8\u7ED3\u6784\uFF1B\u672C\u7248\u6CA1\u6709\u52A0\u5165\u9F3B\u8F6F\u9AA8\u3002",neighbors:["frontal","ethmoid","maxilla-right","nasal-left"],side:"right",baseId:"nasal",pinyin:""},{id:"lacrimal-right",name:"\u53F3\u6CEA\u9AA8",en:"Lacrimal bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Lacrimal bone.r.001"],description:"\u662F\u773C\u7736\u5185\u4FA7\u58C1\u524D\u90E8\u7684\u5C0F\u9AA8\uFF0C\u9760\u8FD1\u9F3B\u6839\u4E24\u4FA7\u3002",look:"\u5148\u5728\u773C\u7736\u533A\u57DF\u5B9A\u4F4D\uFF0C\u518D\u5355\u72EC\u67E5\u770B\u8584\u9AA8\u677F\u4E0E\u6C9F\u6837\u533A\u57DF\u3002",tip:"\u5B83\u5F88\u5C0F\uFF0C\u6574\u9885\u89C6\u56FE\u4E0D\u6613\u70B9\u5230\u65F6\u53EF\u4ECE\u76EE\u5F55\u9009\u62E9\u3002",neighbors:["frontal","ethmoid","maxilla-right","inferior-concha-right"],side:"right",baseId:"lacrimal",pinyin:""},{id:"palatine-right",name:"\u53F3\u816D\u9AA8",en:"Palatine bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Palatine bone.r.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u540E\u90E8\u4E0E\u786C\u816D\u540E\u65B9\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\u3002",look:"\u4ECE\u9885\u5E95\u89C2\u5BDF\u6C34\u5E73\u677F\u4E0E\u4E0A\u988C\u9AA8\u816D\u7A81\u7684\u63A5\u7EED\uFF0C\u518D\u770B\u5411\u4E0A\u7684\u9AA8\u677F\u3002",tip:"\u786C\u816D\u540E\u90E8\u4E3B\u8981\u7531\u816D\u9AA8\u53C2\u4E0E\u6784\u6210\u3002",neighbors:["sphenoid","ethmoid","maxilla-right","inferior-concha-right","palatine-left","vomer"],side:"right",baseId:"palatine",pinyin:"\xE8 g\u01D4"},{id:"inferior-concha-right",name:"\u53F3\u4E0B\u9F3B\u7532",en:"Inferior nasal concha bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Inferior nasal concha bone.r.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u5916\u4FA7\u58C1\uFF0C\u5411\u9F3B\u8154\u5185\u5377\u66F2\uFF1B\u5DE6\u53F3\u5404\u4E3A\u4E00\u5757\u72EC\u7ACB\u9AA8\u3002",look:"\u8F6C\u5230\u9F3B\u8154\u524D\u65B9\uFF0C\u5FC5\u8981\u65F6\u9690\u85CF\u4E0A\u988C\u9AA8\uFF0C\u89C2\u5BDF\u5176\u5377\u66F2\u7684\u8584\u677F\u5F62\u6001\u3002",tip:"\u4E0B\u9F3B\u7532\u662F\u72EC\u7ACB\u9AA8\uFF0C\u4E0D\u80FD\u4E0E\u7B5B\u9AA8\u7684\u4E2D\u9F3B\u7532\u6DF7\u6DC6\u3002",neighbors:["ethmoid","maxilla-right","lacrimal-right","palatine-right"],side:"right",baseId:"inferior-concha",pinyin:""},{id:"maxilla-left",name:"\u5DE6\u4E0A\u988C\u9AA8",en:"Maxilla \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Maxilla.l.001"],description:"\u5F62\u6210\u4E0A\u988C\u3001\u786C\u816D\u7684\u524D\u90E8\u548C\u773C\u7736\u5E95\u90E8\u7684\u4E00\u90E8\u5206\u3002",look:"\u6BD4\u8F83\u7259\u69FD\u7F18\u3001\u7736\u9762\u548C\u5411\u5185\u7684\u816D\u7A81\uFF1B\u5DE6\u53F3\u4E0A\u988C\u9AA8\u5728\u4E2D\u7EBF\u76F8\u63A5\u3002",tip:"\u7259\u9F7F\u4E0D\u5C5E\u4E8E\u9AA8\uFF0C\u672A\u8BA1\u5165\u672C\u56FE206\u5757\u6807\u51C6\u9AA8\u3002",neighbors:["frontal","ethmoid","nasal-left","lacrimal-left","zygomatic-left","palatine-left","inferior-concha-left","maxilla-right","vomer"],side:"left",baseId:"maxilla",pinyin:"h\xE9 g\u01D4"},{id:"zygomatic-left",name:"\u5DE6\u98A7\u9AA8",en:"Zygomatic bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Zygomatic bone.l.001"],description:"\u5F62\u6210\u9762\u988A\u7684\u9AA8\u6027\u7A81\u8D77\uFF0C\u53C2\u4E0E\u773C\u7736\u5916\u4FA7\u58C1\u53CA\u98A7\u5F13\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u5B83\u5982\u4F55\u5411\u540E\u63A5\u7EED\u989E\u9AA8\u7684\u98A7\u7A81\uFF0C\u518D\u770B\u671D\u5411\u773C\u7736\u7684\u9AA8\u9762\u3002",tip:"\u98A7\u5F13\u7531\u98A7\u9AA8\u4E0E\u989E\u9AA8\u7684\u76F8\u5E94\u9AA8\u7A81\u5171\u540C\u5F62\u6210\u3002",neighbors:["frontal","sphenoid","temporal-left","maxilla-left"],side:"left",baseId:"zygomatic",pinyin:"qu\xE1n g\u01D4"},{id:"nasal-left",name:"\u5DE6\u9F3B\u9AA8",en:"Nasal bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Nasal bone.l.001"],description:"\u4F4D\u4E8E\u9F3B\u6881\u4E0A\u90E8\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\uFF0C\u5904\u4E8E\u989D\u9AA8\u4E0B\u65B9\u548C\u4E0A\u988C\u9AA8\u4E4B\u95F4\u3002",look:"\u5728\u6B63\u9762\u8FA8\u8BA4\u5DE6\u53F3\u9F3B\u9AA8\uFF0C\u518D\u5355\u72EC\u65CB\u8F6C\u770B\u5176\u8584\u677F\u72B6\u5F62\u6001\u3002",tip:"\u9F3B\u5C16\u4E3B\u8981\u4E0D\u662F\u9AA8\u7ED3\u6784\uFF1B\u672C\u7248\u6CA1\u6709\u52A0\u5165\u9F3B\u8F6F\u9AA8\u3002",neighbors:["frontal","ethmoid","maxilla-left","nasal-right"],side:"left",baseId:"nasal",pinyin:""},{id:"lacrimal-left",name:"\u5DE6\u6CEA\u9AA8",en:"Lacrimal bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Lacrimal bone.l.001"],description:"\u662F\u773C\u7736\u5185\u4FA7\u58C1\u524D\u90E8\u7684\u5C0F\u9AA8\uFF0C\u9760\u8FD1\u9F3B\u6839\u4E24\u4FA7\u3002",look:"\u5148\u5728\u773C\u7736\u533A\u57DF\u5B9A\u4F4D\uFF0C\u518D\u5355\u72EC\u67E5\u770B\u8584\u9AA8\u677F\u4E0E\u6C9F\u6837\u533A\u57DF\u3002",tip:"\u5B83\u5F88\u5C0F\uFF0C\u6574\u9885\u89C6\u56FE\u4E0D\u6613\u70B9\u5230\u65F6\u53EF\u4ECE\u76EE\u5F55\u9009\u62E9\u3002",neighbors:["frontal","ethmoid","maxilla-left","inferior-concha-left"],side:"left",baseId:"lacrimal",pinyin:""},{id:"palatine-left",name:"\u5DE6\u816D\u9AA8",en:"Palatine bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Palatine bone.l.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u540E\u90E8\u4E0E\u786C\u816D\u540E\u65B9\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\u3002",look:"\u4ECE\u9885\u5E95\u89C2\u5BDF\u6C34\u5E73\u677F\u4E0E\u4E0A\u988C\u9AA8\u816D\u7A81\u7684\u63A5\u7EED\uFF0C\u518D\u770B\u5411\u4E0A\u7684\u9AA8\u677F\u3002",tip:"\u786C\u816D\u540E\u90E8\u4E3B\u8981\u7531\u816D\u9AA8\u53C2\u4E0E\u6784\u6210\u3002",neighbors:["sphenoid","ethmoid","maxilla-left","inferior-concha-left","palatine-right","vomer"],side:"left",baseId:"palatine",pinyin:"\xE8 g\u01D4"},{id:"inferior-concha-left",name:"\u5DE6\u4E0B\u9F3B\u7532",en:"Inferior nasal concha bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Inferior nasal concha bone.l.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u5916\u4FA7\u58C1\uFF0C\u5411\u9F3B\u8154\u5185\u5377\u66F2\uFF1B\u5DE6\u53F3\u5404\u4E3A\u4E00\u5757\u72EC\u7ACB\u9AA8\u3002",look:"\u8F6C\u5230\u9F3B\u8154\u524D\u65B9\uFF0C\u5FC5\u8981\u65F6\u9690\u85CF\u4E0A\u988C\u9AA8\uFF0C\u89C2\u5BDF\u5176\u5377\u66F2\u7684\u8584\u677F\u5F62\u6001\u3002",tip:"\u4E0B\u9F3B\u7532\u662F\u72EC\u7ACB\u9AA8\uFF0C\u4E0D\u80FD\u4E0E\u7B5B\u9AA8\u7684\u4E2D\u9F3B\u7532\u6DF7\u6DC6\u3002",neighbors:["ethmoid","maxilla-left","lacrimal-left","palatine-left"],side:"left",baseId:"inferior-concha",pinyin:""},{id:"vomer",name:"\u7281\u9AA8",en:"Vomer",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Vomer.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u4E2D\u7EBF\uFF0C\u6784\u6210\u9AA8\u6027\u9F3B\u4E2D\u9694\u7684\u540E\u4E0B\u90E8\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u8584\u677F\u5F62\u6001\uFF0C\u56DE\u5230\u539F\u4F4D\u6BD4\u8F83\u5B83\u4E0E\u7B5B\u9AA8\u5782\u76F4\u677F\u7684\u76F8\u63A5\u3002",tip:"\u9F3B\u4E2D\u9694\u4E0D\u5168\u662F\u9AA8\uFF1B\u524D\u90E8\u8F6F\u9AA8\u6CA1\u6709\u663E\u793A\u3002",neighbors:["sphenoid","ethmoid","maxilla-right","maxilla-left","palatine-right","palatine-left"],side:"midline",baseId:"vomer",pinyin:""},{id:"mandible",name:"\u4E0B\u988C\u9AA8",en:"Mandible",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Mandible.001"],description:"\u5F62\u6210\u4E0B\u988C\uFF0C\u5305\u542B\u6C34\u5E73\u7684\u9AA8\u4F53\u548C\u4E24\u4FA7\u5411\u4E0A\u7684\u4E0B\u988C\u652F\u3002",look:"\u6CBF\u4E0B\u988C\u652F\u5411\u4E0A\uFF0C\u6BD4\u8F83\u524D\u65B9\u51A0\u7A81\u548C\u540E\u65B9\u9AC1\u7A81\uFF1B\u89C2\u5BDF\u9AC1\u7A81\u4E0E\u989E\u9AA8\u7684\u4F4D\u7F6E\u5173\u7CFB\u3002",tip:"\u4E0B\u988C\u9AA8\u4E3A\u4E00\u5757\uFF0C\u5DE6\u53F3\u4E24\u7AEF\u5206\u522B\u4E0E\u989E\u9AA8\u6784\u6210\u989E\u4E0B\u988C\u5173\u8282\u3002",neighbors:["temporal-right","temporal-left"],side:"midline",baseId:"mandible",pinyin:"h\xE9 g\u01D4"},{id:"hyoid",name:"\u820C\u9AA8",en:"Hyoid bone",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Hyoid bone.001"],description:"\u4F4D\u4E8E\u4E0B\u988C\u9AA8\u4E0B\u65B9\u3001\u9888\u524D\u90E8\uFF0C\u5177\u6709\u9AA8\u4F53\u53CA\u5411\u4E24\u4FA7\u4F38\u51FA\u7684\u89D2\u3002",look:"\u5355\u72EC\u67E5\u770B\u5176\u5F27\u5F62\u8F6E\u5ED3\u4E0E\u5927\u5C0F\u89D2\uFF0C\u518D\u56DE\u5230\u4E0B\u988C\u9AA8\u548C\u9888\u690E\u9644\u8FD1\u5B9A\u4F4D\u3002",tip:"\u820C\u9AA8\u4E0D\u4E0E\u5176\u4ED6\u9AA8\u76F4\u63A5\u5F62\u6210\u5173\u8282\uFF0C\u4E3B\u8981\u7531\u8F6F\u7EC4\u7EC7\u60AC\u7CFB\u3002",neighbors:[],side:"midline",baseId:"hyoid",pinyin:""},{id:"malleus-right",name:"\u53F3\u9524\u9AA8",en:"Malleus \xB7 right",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Malleus.r.001"],description:"\u4F4D\u4E8E\u53F3\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-right"],side:"right",baseId:"malleus",pinyin:""},{id:"incus-right",name:"\u53F3\u7827\u9AA8",en:"Incus \xB7 right",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Incus.r.001"],description:"\u4F4D\u4E8E\u53F3\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["malleus-right","stapes-right"],side:"right",baseId:"incus",pinyin:"zh\u0113n g\u01D4"},{id:"stapes-right",name:"\u53F3\u956B\u9AA8",en:"Stapes \xB7 right",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Stapes.r.001"],description:"\u4F4D\u4E8E\u53F3\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-right"],side:"right",baseId:"stapes",pinyin:"d\xE8ng g\u01D4"},{id:"malleus-left",name:"\u5DE6\u9524\u9AA8",en:"Malleus \xB7 left",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Malleus.l.001"],description:"\u4F4D\u4E8E\u5DE6\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-left"],side:"left",baseId:"malleus",pinyin:""},{id:"incus-left",name:"\u5DE6\u7827\u9AA8",en:"Incus \xB7 left",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Incus.l.001"],description:"\u4F4D\u4E8E\u5DE6\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["malleus-left","stapes-left"],side:"left",baseId:"incus",pinyin:"zh\u0113n g\u01D4"},{id:"stapes-left",name:"\u5DE6\u956B\u9AA8",en:"Stapes \xB7 left",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Stapes.l.001"],description:"\u4F4D\u4E8E\u5DE6\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-left"],side:"left",baseId:"stapes",pinyin:"d\xE8ng g\u01D4"},{id:"C1",name:"\u5BF0\u690E C1",en:"Atlas (C1)",group:"cervical",region:"\u9888\u690E",sourceNodes:["Atlas (C1).001"],description:"\u4F4D\u4E8E\u6795\u9AA8\u4E0B\u65B9\uFF0C\u662F\u7B2C\u4E00\u9888\u690E\uFF1B\u73AF\u5F62\u7ED3\u6784\u4E0D\u540C\u4E8E\u5178\u578B\u690E\u9AA8\uFF0C\u6CA1\u6709\u4E00\u822C\u690E\u4F53\u548C\u68D8\u7A81\u3002",look:"\u4ECE\u4E0A\u65B9\u770B\u5DE6\u53F3\u4FA7\u5757\u4E0E\u690E\u5B54\uFF0C\u518D\u4ECE\u540E\u9762\u6BD4\u8F83\u524D\u5F13\u548C\u540E\u5F13\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["occipital","C2"],side:"midline",baseId:"C1",pinyin:"hu\xE1n zhu\u012B"},{id:"C2",name:"\u67A2\u690E C2",en:"Axis (C2)",group:"cervical",region:"\u9888\u690E",sourceNodes:["Axis (C2).001"],description:"\u4F4D\u4E8E\u5BF0\u690E\u4E0B\u65B9\uFF0C\u5411\u4E0A\u7684\u9F7F\u7A81\u662F\u8BC6\u522B\u7B2C\u4E8C\u9888\u690E\u7684\u91CD\u8981\u7279\u5F81\u3002",look:"\u89C2\u5BDF\u9F7F\u7A81\u3001\u690E\u4F53\u548C\u540E\u65B9\u68D8\u7A81\uFF0C\u6BD4\u8F83\u5176\u4E0E\u5BF0\u690E\u7684\u7A7A\u95F4\u5173\u7CFB\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C1","C3"],side:"midline",baseId:"C2",pinyin:"sh\u016B zhu\u012B"},{id:"C3",name:"\u7B2C3\u9888\u690E C3",en:"Vertebra C3",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C3.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C2","C4"],side:"midline",baseId:"C3",pinyin:""},{id:"C4",name:"\u7B2C4\u9888\u690E C4",en:"Vertebra C4",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C4.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C3","C5"],side:"midline",baseId:"C4",pinyin:""},{id:"C5",name:"\u7B2C5\u9888\u690E C5",en:"Vertebra C5",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C5.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C4","C6"],side:"midline",baseId:"C5",pinyin:""},{id:"C6",name:"\u7B2C6\u9888\u690E C6",en:"Vertebra C6",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C6.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C5","C7"],side:"midline",baseId:"C6",pinyin:""},{id:"C7",name:"\u7B2C7\u9888\u690E C7",en:"Vertebra C7",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C7.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C6","T1"],side:"midline",baseId:"C7",pinyin:""},{id:"T1",name:"\u7B2C1\u80F8\u690E T1",en:"Vertebra T1",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T1.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C1\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C7","T2","rib-1-right","rib-1-left"],side:"midline",baseId:"T1",pinyin:""},{id:"T2",name:"\u7B2C2\u80F8\u690E T2",en:"Vertebra T2",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T2.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C2\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T1","T3","rib-2-right","rib-2-left"],side:"midline",baseId:"T2",pinyin:""},{id:"T3",name:"\u7B2C3\u80F8\u690E T3",en:"Vertebra T3",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T3.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T2","T4","rib-3-right","rib-3-left"],side:"midline",baseId:"T3",pinyin:""},{id:"T4",name:"\u7B2C4\u80F8\u690E T4",en:"Vertebra T4",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T4.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T3","T5","rib-4-right","rib-4-left"],side:"midline",baseId:"T4",pinyin:""},{id:"T5",name:"\u7B2C5\u80F8\u690E T5",en:"Vertebra T5",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T5.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T4","T6","rib-5-right","rib-5-left"],side:"midline",baseId:"T5",pinyin:""},{id:"T6",name:"\u7B2C6\u80F8\u690E T6",en:"Vertebra T6",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T6.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T5","T7","rib-6-right","rib-6-left"],side:"midline",baseId:"T6",pinyin:""},{id:"T7",name:"\u7B2C7\u80F8\u690E T7",en:"Vertebra T7",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T7.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T6","T8","rib-7-right","rib-7-left"],side:"midline",baseId:"T7",pinyin:""},{id:"T8",name:"\u7B2C8\u80F8\u690E T8",en:"Vertebra T8",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T8.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C8\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T7","T9","rib-8-right","rib-8-left"],side:"midline",baseId:"T8",pinyin:""},{id:"T9",name:"\u7B2C9\u80F8\u690E T9",en:"Vertebra T9",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T9.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C9\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T8","T10","rib-9-right","rib-9-left"],side:"midline",baseId:"T9",pinyin:""},{id:"T10",name:"\u7B2C10\u80F8\u690E T10",en:"Vertebra T10",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T10.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C10\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T9","T11","rib-10-right","rib-10-left"],side:"midline",baseId:"T10",pinyin:""},{id:"T11",name:"\u7B2C11\u80F8\u690E T11",en:"Vertebra T11",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T11.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C11\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T10","T12","rib-11-right","rib-11-left"],side:"midline",baseId:"T11",pinyin:""},{id:"T12",name:"\u7B2C12\u80F8\u690E T12",en:"Vertebra T12",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T12.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C12\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T11","L1","rib-12-right","rib-12-left"],side:"midline",baseId:"T12",pinyin:""},{id:"rib-1-right",name:"\u53F3\u7B2C1\u808B\u9AA8",en:"First rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["First rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C1\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T1"],side:"right",baseId:"rib-1",pinyin:""},{id:"rib-2-right",name:"\u53F3\u7B2C2\u808B\u9AA8",en:"Second rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Second rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C2\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T2","T1"],side:"right",baseId:"rib-2",pinyin:""},{id:"rib-3-right",name:"\u53F3\u7B2C3\u808B\u9AA8",en:"Third rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Third rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T3","T2"],side:"right",baseId:"rib-3",pinyin:""},{id:"rib-4-right",name:"\u53F3\u7B2C4\u808B\u9AA8",en:"Fourth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fourth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T4","T3"],side:"right",baseId:"rib-4",pinyin:""},{id:"rib-5-right",name:"\u53F3\u7B2C5\u808B\u9AA8",en:"Fifth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fifth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T5","T4"],side:"right",baseId:"rib-5",pinyin:""},{id:"rib-6-right",name:"\u53F3\u7B2C6\u808B\u9AA8",en:"Sixth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Sixth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T6","T5"],side:"right",baseId:"rib-6",pinyin:""},{id:"rib-7-right",name:"\u53F3\u7B2C7\u808B\u9AA8",en:"Seventh rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Seventh rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T7","T6"],side:"right",baseId:"rib-7",pinyin:""},{id:"rib-8-right",name:"\u53F3\u7B2C8\u808B\u9AA8",en:"Eighth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eighth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C8\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T8","T7"],side:"right",baseId:"rib-8",pinyin:""},{id:"rib-9-right",name:"\u53F3\u7B2C9\u808B\u9AA8",en:"Ninth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Ninth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C9\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T9","T8"],side:"right",baseId:"rib-9",pinyin:""},{id:"rib-10-right",name:"\u53F3\u7B2C10\u808B\u9AA8",en:"Tenth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Tenth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C10\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T10"],side:"right",baseId:"rib-10",pinyin:""},{id:"rib-11-right",name:"\u53F3\u7B2C11\u808B\u9AA8",en:"Eleventh rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eleventh rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C11\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T11"],side:"right",baseId:"rib-11",pinyin:""},{id:"rib-12-right",name:"\u53F3\u7B2C12\u808B\u9AA8",en:"Twelfth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Twelfth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C12\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T12"],side:"right",baseId:"rib-12",pinyin:""},{id:"rib-1-left",name:"\u5DE6\u7B2C1\u808B\u9AA8",en:"First rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["First rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C1\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T1"],side:"left",baseId:"rib-1",pinyin:""},{id:"rib-2-left",name:"\u5DE6\u7B2C2\u808B\u9AA8",en:"Second rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Second rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C2\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T2","T1"],side:"left",baseId:"rib-2",pinyin:""},{id:"rib-3-left",name:"\u5DE6\u7B2C3\u808B\u9AA8",en:"Third rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Third rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T3","T2"],side:"left",baseId:"rib-3",pinyin:""},{id:"rib-4-left",name:"\u5DE6\u7B2C4\u808B\u9AA8",en:"Fourth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fourth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T4","T3"],side:"left",baseId:"rib-4",pinyin:""},{id:"rib-5-left",name:"\u5DE6\u7B2C5\u808B\u9AA8",en:"Fifth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fifth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T5","T4"],side:"left",baseId:"rib-5",pinyin:""},{id:"rib-6-left",name:"\u5DE6\u7B2C6\u808B\u9AA8",en:"Sixth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Sixth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T6","T5"],side:"left",baseId:"rib-6",pinyin:""},{id:"rib-7-left",name:"\u5DE6\u7B2C7\u808B\u9AA8",en:"Seventh rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Seventh rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T7","T6"],side:"left",baseId:"rib-7",pinyin:""},{id:"rib-8-left",name:"\u5DE6\u7B2C8\u808B\u9AA8",en:"Eighth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eighth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C8\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T8","T7"],side:"left",baseId:"rib-8",pinyin:""},{id:"rib-9-left",name:"\u5DE6\u7B2C9\u808B\u9AA8",en:"Ninth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Ninth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C9\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T9","T8"],side:"left",baseId:"rib-9",pinyin:""},{id:"rib-10-left",name:"\u5DE6\u7B2C10\u808B\u9AA8",en:"Tenth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Tenth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C10\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T10"],side:"left",baseId:"rib-10",pinyin:""},{id:"rib-11-left",name:"\u5DE6\u7B2C11\u808B\u9AA8",en:"Eleventh rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eleventh rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C11\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T11"],side:"left",baseId:"rib-11",pinyin:""},{id:"rib-12-left",name:"\u5DE6\u7B2C12\u808B\u9AA8",en:"Twelfth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Twelfth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C12\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T12"],side:"left",baseId:"rib-12",pinyin:""},{id:"sternum",name:"\u80F8\u9AA8",en:"Sternum",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Manubrium of sternum.001","Body of sternum.001","Xiphoid process.001"],description:"\u4F4D\u4E8E\u80F8\u5ED3\u524D\u65B9\u6B63\u4E2D\uFF0C\u7531\u80F8\u9AA8\u67C4\u3001\u80F8\u9AA8\u4F53\u548C\u5251\u7A81\u4E09\u4E2A\u533A\u57DF\u6784\u6210\u3002",look:"\u4ECE\u4FA7\u9762\u6BD4\u8F83\u80F8\u9AA8\u67C4\u4E0E\u4F53\u7684\u89D2\u5EA6\uFF0C\u518D\u4ECE\u524D\u9762\u8FA8\u8BA4\u4E0A\u7AEF\u548C\u4E0B\u7AEF\u7684\u5F62\u72B6\u3002",tip:"\u6309\u6210\u4EBA\u9AA8\u9ABC\u6807\u51C6\u6E05\u5355\u8BA1\u4E3A\u4E00\u5757\uFF1B\u6E90\u6A21\u578B\u7684\u4E09\u4E2A\u90E8\u5206\u5408\u4E3A\u540C\u4E00\u53EF\u9009\u5BF9\u8C61\u3002",neighbors:["clavicle-right","clavicle-left"],side:"midline",baseId:"sternum",pinyin:""},{id:"clavicle-right",name:"\u53F3\u9501\u9AA8",en:"Clavicle \xB7 right",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Clavicle.r.001"],description:"\u6A2A\u4F4D\u4E8E\u80F8\u5ED3\u524D\u4E0A\u65B9\uFF0C\u5185\u7AEF\u63A5\u80F8\u9AA8\uFF0C\u5916\u7AEF\u63A5\u80A9\u80DB\u9AA8\u80A9\u5CF0\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83S\u5F62\u8F6E\u5ED3\u548C\u4E24\u7AEF\uFF1B\u5728\u539F\u4F4D\u67E5\u770B\u5B83\u5982\u4F55\u8FDE\u63A5\u80F8\u9AA8\u548C\u80A9\u90E8\u3002",tip:"\u9AA8\u6027\u8FDE\u63A5\u4E4B\u5916\u8FD8\u6709\u97E7\u5E26\u548C\u5173\u8282\u76D8\u7B49\u8F6F\u7EC4\u7EC7\uFF0C\u672C\u7248\u672A\u663E\u793A\u3002",neighbors:["sternum","scapula-right"],side:"right",baseId:"clavicle",pinyin:""},{id:"scapula-right",name:"\u53F3\u80A9\u80DB\u9AA8",en:"Scapula \xB7 right",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Scapula.r.001"],description:"\u4F4D\u4E8E\u80F8\u5ED3\u540E\u4E0A\u65B9\uFF0C\u662F\u6241\u5E73\u7684\u80A9\u5E26\u9AA8\uFF1B\u5916\u4FA7\u5173\u8282\u76C2\u4E0E\u80B1\u9AA8\u5934\u76F8\u5BF9\u3002",look:"\u4ECE\u540E\u9762\u770B\u80A9\u80DB\u5188\u3001\u80A9\u5CF0\uFF0C\u4ECE\u5916\u4FA7\u770B\u5173\u8282\u76C2\u548C\u5599\u7A81\uFF0C\u518D\u89C2\u5BDF\u9762\u5411\u808B\u9AA8\u7684\u524D\u9762\u3002",tip:"\u80A9\u80DB\u9AA8\u8D34\u8FD1\u80F8\u5ED3\uFF0C\u4F46\u4E0D\u4E0E\u808B\u9AA8\u76F4\u63A5\u5F62\u6210\u666E\u901A\u9AA8\u6027\u5173\u8282\u3002",neighbors:["clavicle-right","humerus-right"],side:"right",baseId:"scapula",pinyin:"ji\u01CE g\u01D4"},{id:"humerus-right",name:"\u53F3\u80B1\u9AA8",en:"Humerus \xB7 right",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Humerus.r.001"],description:"\u4F4D\u4E8E\u4E0A\u81C2\uFF1B\u4E0A\u7AEF\u4E3A\u80B1\u9AA8\u5934\uFF0C\u4E0B\u7AEF\u4E0E\u5C3A\u9AA8\u3001\u6861\u9AA8\u8854\u63A5\u3002",look:"\u6BD4\u8F83\u4E0A\u7AEF\u5706\u5F62\u9AA8\u5934\u548C\u4E0B\u7AEF\u6ED1\u8F66\u3001\u5C0F\u5934\u7B49\u533A\u57DF\uFF0C\u518D\u770B\u9AA8\u5E72\u3002",tip:"\u4E0A\u7AEF\u53C2\u4E0E\u80A9\u5173\u8282\uFF0C\u4E0B\u7AEF\u53C2\u4E0E\u8098\u5173\u8282\u3002",neighbors:["scapula-right","ulna-right","radius-right"],side:"right",baseId:"humerus",pinyin:"g\u014Dng g\u01D4"},{id:"radius-right",name:"\u53F3\u6861\u9AA8",en:"Radius \xB7 right",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Radius.r.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u62C7\u6307\u4E00\u4FA7\uFF1B\u8FD1\u7AEF\u7684\u6861\u9AA8\u5934\u8F83\u5C0F\uFF0C\u8FDC\u7AEF\u9760\u8FD1\u8155\u90E8\u8F83\u5BBD\u3002",look:"\u89C2\u5BDF\u8FD1\u7AEF\u5706\u76D8\u72B6\u9AA8\u5934\uFF0C\u518D\u5BF9\u7167\u8FDC\u7AEF\u4E0E\u8155\u9AA8\u7684\u6392\u5217\u3002",tip:"\u89E3\u5256\u5B66\u59FF\u52BF\u4E0B\u6861\u9AA8\u5728\u5916\u4FA7\uFF1B\u672C\u56FE\u6CA1\u6709\u6A21\u62DF\u524D\u81C2\u65CB\u8F6C\u3002",neighbors:["humerus-right","ulna-right","scaphoid-right","lunate-right"],side:"right",baseId:"radius",pinyin:"r\xE1o g\u01D4"},{id:"ulna-right",name:"\u53F3\u5C3A\u9AA8",en:"Ulna \xB7 right",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Ulna.r.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u5C0F\u6307\u4E00\u4FA7\uFF0C\u8FD1\u7AEF\u5F62\u6210\u660E\u663E\u7684\u9E70\u5634\u4E0E\u6ED1\u8F66\u5207\u8FF9\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u8FD1\u7AEF\u94A9\u72B6\u8F6E\u5ED3\uFF0C\u518D\u6BD4\u8F83\u7EC6\u5C0F\u7684\u8FDC\u7AEF\u4E0E\u6861\u9AA8\u8FDC\u7AEF\u3002",tip:"\u5C3A\u9AA8\u4E0E\u8155\u9AA8\u4E4B\u95F4\u6709\u8F6F\u7EC4\u7EC7\u7ED3\u6784\uFF0C\u4E0D\u5E94\u628A\u5B83\u4E0E\u8155\u9AA8\u7B80\u5355\u6807\u6210\u76F4\u63A5\u9AA8\u5173\u8282\u3002",neighbors:["humerus-right","radius-right"],side:"right",baseId:"ulna",pinyin:""},{id:"clavicle-left",name:"\u5DE6\u9501\u9AA8",en:"Clavicle \xB7 left",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Clavicle.l.001"],description:"\u6A2A\u4F4D\u4E8E\u80F8\u5ED3\u524D\u4E0A\u65B9\uFF0C\u5185\u7AEF\u63A5\u80F8\u9AA8\uFF0C\u5916\u7AEF\u63A5\u80A9\u80DB\u9AA8\u80A9\u5CF0\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83S\u5F62\u8F6E\u5ED3\u548C\u4E24\u7AEF\uFF1B\u5728\u539F\u4F4D\u67E5\u770B\u5B83\u5982\u4F55\u8FDE\u63A5\u80F8\u9AA8\u548C\u80A9\u90E8\u3002",tip:"\u9AA8\u6027\u8FDE\u63A5\u4E4B\u5916\u8FD8\u6709\u97E7\u5E26\u548C\u5173\u8282\u76D8\u7B49\u8F6F\u7EC4\u7EC7\uFF0C\u672C\u7248\u672A\u663E\u793A\u3002",neighbors:["sternum","scapula-left"],side:"left",baseId:"clavicle",pinyin:""},{id:"scapula-left",name:"\u5DE6\u80A9\u80DB\u9AA8",en:"Scapula \xB7 left",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Scapula.l.001"],description:"\u4F4D\u4E8E\u80F8\u5ED3\u540E\u4E0A\u65B9\uFF0C\u662F\u6241\u5E73\u7684\u80A9\u5E26\u9AA8\uFF1B\u5916\u4FA7\u5173\u8282\u76C2\u4E0E\u80B1\u9AA8\u5934\u76F8\u5BF9\u3002",look:"\u4ECE\u540E\u9762\u770B\u80A9\u80DB\u5188\u3001\u80A9\u5CF0\uFF0C\u4ECE\u5916\u4FA7\u770B\u5173\u8282\u76C2\u548C\u5599\u7A81\uFF0C\u518D\u89C2\u5BDF\u9762\u5411\u808B\u9AA8\u7684\u524D\u9762\u3002",tip:"\u80A9\u80DB\u9AA8\u8D34\u8FD1\u80F8\u5ED3\uFF0C\u4F46\u4E0D\u4E0E\u808B\u9AA8\u76F4\u63A5\u5F62\u6210\u666E\u901A\u9AA8\u6027\u5173\u8282\u3002",neighbors:["clavicle-left","humerus-left"],side:"left",baseId:"scapula",pinyin:"ji\u01CE g\u01D4"},{id:"humerus-left",name:"\u5DE6\u80B1\u9AA8",en:"Humerus \xB7 left",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Humerus.l.001"],description:"\u4F4D\u4E8E\u4E0A\u81C2\uFF1B\u4E0A\u7AEF\u4E3A\u80B1\u9AA8\u5934\uFF0C\u4E0B\u7AEF\u4E0E\u5C3A\u9AA8\u3001\u6861\u9AA8\u8854\u63A5\u3002",look:"\u6BD4\u8F83\u4E0A\u7AEF\u5706\u5F62\u9AA8\u5934\u548C\u4E0B\u7AEF\u6ED1\u8F66\u3001\u5C0F\u5934\u7B49\u533A\u57DF\uFF0C\u518D\u770B\u9AA8\u5E72\u3002",tip:"\u4E0A\u7AEF\u53C2\u4E0E\u80A9\u5173\u8282\uFF0C\u4E0B\u7AEF\u53C2\u4E0E\u8098\u5173\u8282\u3002",neighbors:["scapula-left","ulna-left","radius-left"],side:"left",baseId:"humerus",pinyin:"g\u014Dng g\u01D4"},{id:"radius-left",name:"\u5DE6\u6861\u9AA8",en:"Radius \xB7 left",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Radius.l.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u62C7\u6307\u4E00\u4FA7\uFF1B\u8FD1\u7AEF\u7684\u6861\u9AA8\u5934\u8F83\u5C0F\uFF0C\u8FDC\u7AEF\u9760\u8FD1\u8155\u90E8\u8F83\u5BBD\u3002",look:"\u89C2\u5BDF\u8FD1\u7AEF\u5706\u76D8\u72B6\u9AA8\u5934\uFF0C\u518D\u5BF9\u7167\u8FDC\u7AEF\u4E0E\u8155\u9AA8\u7684\u6392\u5217\u3002",tip:"\u89E3\u5256\u5B66\u59FF\u52BF\u4E0B\u6861\u9AA8\u5728\u5916\u4FA7\uFF1B\u672C\u56FE\u6CA1\u6709\u6A21\u62DF\u524D\u81C2\u65CB\u8F6C\u3002",neighbors:["humerus-left","ulna-left","scaphoid-left","lunate-left"],side:"left",baseId:"radius",pinyin:"r\xE1o g\u01D4"},{id:"ulna-left",name:"\u5DE6\u5C3A\u9AA8",en:"Ulna \xB7 left",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Ulna.l.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u5C0F\u6307\u4E00\u4FA7\uFF0C\u8FD1\u7AEF\u5F62\u6210\u660E\u663E\u7684\u9E70\u5634\u4E0E\u6ED1\u8F66\u5207\u8FF9\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u8FD1\u7AEF\u94A9\u72B6\u8F6E\u5ED3\uFF0C\u518D\u6BD4\u8F83\u7EC6\u5C0F\u7684\u8FDC\u7AEF\u4E0E\u6861\u9AA8\u8FDC\u7AEF\u3002",tip:"\u5C3A\u9AA8\u4E0E\u8155\u9AA8\u4E4B\u95F4\u6709\u8F6F\u7EC4\u7EC7\u7ED3\u6784\uFF0C\u4E0D\u5E94\u628A\u5B83\u4E0E\u8155\u9AA8\u7B80\u5355\u6807\u6210\u76F4\u63A5\u9AA8\u5173\u8282\u3002",neighbors:["humerus-left","radius-left"],side:"left",baseId:"ulna",pinyin:""},{id:"scaphoid-right",name:"\u53F3\u624B\u821F\u9AA8",en:"Scaphoid bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Scaphoid bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FD1\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u821F\u9AA8\u8FD1\u7AEF\u4E0E\u6861\u9AA8\u76F8\u5BF9\uFF0C\u8FDC\u7AEF\u671D\u5411\u5927\u3001\u5C0F\u591A\u89D2\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u624B\u821F\u9AA8\u4F4D\u4E8E\u8155\u90E8\uFF0C\u8DB3\u821F\u9AA8\u4F4D\u4E8E\u8DB3\u90E8\uFF0C\u4E24\u8005\u4E0D\u662F\u540C\u4E00\u5757\u9AA8\u3002",neighbors:["radius-right","lunate-right","trapezium-right","trapezoid-right","capitate-right"],side:"right",baseId:"scaphoid",pinyin:""},{id:"lunate-right",name:"\u53F3\u6708\u9AA8",en:"Lunate bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Lunate bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FD1\u4FA7\u5217\u4E2D\u90E8\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u671D\u5411\u6861\u9AA8\u7684\u8FD1\u7AEF\u51F8\u9762\u4E0E\u671D\u5411\u5934\u72B6\u9AA8\u7684\u8FDC\u7AEF\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["radius-right","scaphoid-right","triquetrum-right","capitate-right","hamate-right"],side:"right",baseId:"lunate",pinyin:""},{id:"triquetrum-right",name:"\u53F3\u4E09\u89D2\u9AA8",en:"Triquetrum bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Triquetrum bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FD1\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u638C\u4FA7\u90BB\u63A5\u8C4C\u8C46\u9AA8\uFF0C\u8FDC\u4FA7\u90BB\u63A5\u94A9\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-right","pisiform-right","hamate-right"],side:"right",baseId:"triquetrum",pinyin:""},{id:"pisiform-right",name:"\u53F3\u8C4C\u8C46\u9AA8",en:"Pisiform bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Pisiform bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8155\u90E8\u638C\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u627E\u5230\u5B83\u4E0E\u4E09\u89D2\u9AA8\u76F8\u5BF9\u7684\u9AA8\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["triquetrum-right"],side:"right",baseId:"pisiform",pinyin:""},{id:"trapezium-right",name:"\u53F3\u5927\u591A\u89D2\u9AA8",en:"Trapezium bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezium bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u5B83\u4E0E\u7B2C\u4E00\u638C\u9AA8\u57FA\u5E95\u76F8\u5BF9\u7684\u978D\u5F62\u5173\u8282\u533A\u57DF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-right","trapezoid-right","hand-metacarpal-1-right","hand-metacarpal-2-right"],side:"right",baseId:"trapezium",pinyin:""},{id:"trapezoid-right",name:"\u53F3\u5C0F\u591A\u89D2\u9AA8",en:"Trapezoid bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezoid bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u7B2C\u4E8C\u638C\u9AA8\u540E\u65B9\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u5B83\u5939\u5728\u5927\u591A\u89D2\u9AA8\u548C\u5934\u72B6\u9AA8\u4E4B\u95F4\u7684\u4F4D\u7F6E\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-right","trapezium-right","capitate-right","hand-metacarpal-2-right"],side:"right",baseId:"trapezoid",pinyin:""},{id:"capitate-right",name:"\u53F3\u5934\u72B6\u9AA8",en:"Capitate bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Capitate bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u4E2D\u592E\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u8F83\u5706\u7684\u5934\u90E8\u4E0E\u5411\u7B2C\u4E09\u638C\u9AA8\u63A5\u7EED\u7684\u8FDC\u7AEF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-right","lunate-right","trapezoid-right","hamate-right","hand-metacarpal-2-right","hand-metacarpal-3-right","hand-metacarpal-4-right"],side:"right",baseId:"capitate",pinyin:""},{id:"hamate-right",name:"\u53F3\u94A9\u9AA8",en:"Hamate bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Hamate bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u4ECE\u638C\u4FA7\u5BFB\u627E\u94A9\u72B6\u7A81\u8D77\uFF0C\u518D\u770B\u5B83\u4E0E\u7B2C\u56DB\u3001\u7B2C\u4E94\u638C\u9AA8\u7684\u63A5\u7EED\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-right","triquetrum-right","capitate-right","hand-metacarpal-4-right","hand-metacarpal-5-right"],side:"right",baseId:"hamate",pinyin:""},{id:"hand-metacarpal-1-right",name:"\u53F3\u7B2C1\u638C\u9AA8",en:"First metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["First metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C1\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-right","hand-proximal-1-right"],side:"right",baseId:"hand-metacarpal-1",pinyin:""},{id:"hand-proximal-1-right",name:"\u53F3\u62C7\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 1 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of first finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u62C7\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-1-right","hand-distal-1-right"],side:"right",baseId:"hand-proximal-1",pinyin:""},{id:"hand-distal-1-right",name:"\u53F3\u62C7\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 1 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of first finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u62C7\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-1-right"],side:"right",baseId:"hand-distal-1",pinyin:""},{id:"hand-metacarpal-2-right",name:"\u53F3\u7B2C2\u638C\u9AA8",en:"Second metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Second metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C2\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-right","trapezoid-right","capitate-right","hand-proximal-2-right"],side:"right",baseId:"hand-metacarpal-2",pinyin:""},{id:"hand-proximal-2-right",name:"\u53F3\u793A\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 2 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of second finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u793A\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-2-right","hand-middle-2-right"],side:"right",baseId:"hand-proximal-2",pinyin:""},{id:"hand-middle-2-right",name:"\u53F3\u793A\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 2 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of second finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u793A\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-2-right","hand-distal-2-right"],side:"right",baseId:"hand-middle-2",pinyin:""},{id:"hand-distal-2-right",name:"\u53F3\u793A\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 2 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of second finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u793A\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-2-right"],side:"right",baseId:"hand-distal-2",pinyin:""},{id:"hand-metacarpal-3-right",name:"\u53F3\u7B2C3\u638C\u9AA8",en:"Third metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Third metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C3\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-right","hand-proximal-3-right"],side:"right",baseId:"hand-metacarpal-3",pinyin:""},{id:"hand-proximal-3-right",name:"\u53F3\u4E2D\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 3 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of third finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u4E2D\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-3-right","hand-middle-3-right"],side:"right",baseId:"hand-proximal-3",pinyin:""},{id:"hand-middle-3-right",name:"\u53F3\u4E2D\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 3 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of third finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u4E2D\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-3-right","hand-distal-3-right"],side:"right",baseId:"hand-middle-3",pinyin:""},{id:"hand-distal-3-right",name:"\u53F3\u4E2D\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 3 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of third finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u4E2D\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-3-right"],side:"right",baseId:"hand-distal-3",pinyin:""},{id:"hand-metacarpal-4-right",name:"\u53F3\u7B2C4\u638C\u9AA8",en:"Fourth metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fourth metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C4\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-right","hamate-right","hand-proximal-4-right"],side:"right",baseId:"hand-metacarpal-4",pinyin:""},{id:"hand-proximal-4-right",name:"\u53F3\u73AF\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 4 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fourth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u73AF\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-4-right","hand-middle-4-right"],side:"right",baseId:"hand-proximal-4",pinyin:""},{id:"hand-middle-4-right",name:"\u53F3\u73AF\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 4 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fourth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u73AF\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-4-right","hand-distal-4-right"],side:"right",baseId:"hand-middle-4",pinyin:""},{id:"hand-distal-4-right",name:"\u53F3\u73AF\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 4 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fourth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u73AF\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-4-right"],side:"right",baseId:"hand-distal-4",pinyin:""},{id:"hand-metacarpal-5-right",name:"\u53F3\u7B2C5\u638C\u9AA8",en:"Fifth metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fifth metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C5\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["hamate-right","hand-proximal-5-right"],side:"right",baseId:"hand-metacarpal-5",pinyin:""},{id:"hand-proximal-5-right",name:"\u53F3\u5C0F\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 5 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fifth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u5C0F\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-5-right","hand-middle-5-right"],side:"right",baseId:"hand-proximal-5",pinyin:""},{id:"hand-middle-5-right",name:"\u53F3\u5C0F\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 5 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fifth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u5C0F\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-5-right","hand-distal-5-right"],side:"right",baseId:"hand-middle-5",pinyin:""},{id:"hand-distal-5-right",name:"\u53F3\u5C0F\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 5 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fifth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u5C0F\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-5-right"],side:"right",baseId:"hand-distal-5",pinyin:""},{id:"scaphoid-left",name:"\u5DE6\u624B\u821F\u9AA8",en:"Scaphoid bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Scaphoid bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FD1\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u821F\u9AA8\u8FD1\u7AEF\u4E0E\u6861\u9AA8\u76F8\u5BF9\uFF0C\u8FDC\u7AEF\u671D\u5411\u5927\u3001\u5C0F\u591A\u89D2\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u624B\u821F\u9AA8\u4F4D\u4E8E\u8155\u90E8\uFF0C\u8DB3\u821F\u9AA8\u4F4D\u4E8E\u8DB3\u90E8\uFF0C\u4E24\u8005\u4E0D\u662F\u540C\u4E00\u5757\u9AA8\u3002",neighbors:["radius-left","lunate-left","trapezium-left","trapezoid-left","capitate-left"],side:"left",baseId:"scaphoid",pinyin:""},{id:"lunate-left",name:"\u5DE6\u6708\u9AA8",en:"Lunate bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Lunate bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FD1\u4FA7\u5217\u4E2D\u90E8\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u671D\u5411\u6861\u9AA8\u7684\u8FD1\u7AEF\u51F8\u9762\u4E0E\u671D\u5411\u5934\u72B6\u9AA8\u7684\u8FDC\u7AEF\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["radius-left","scaphoid-left","triquetrum-left","capitate-left","hamate-left"],side:"left",baseId:"lunate",pinyin:""},{id:"triquetrum-left",name:"\u5DE6\u4E09\u89D2\u9AA8",en:"Triquetrum bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Triquetrum bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FD1\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u638C\u4FA7\u90BB\u63A5\u8C4C\u8C46\u9AA8\uFF0C\u8FDC\u4FA7\u90BB\u63A5\u94A9\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-left","pisiform-left","hamate-left"],side:"left",baseId:"triquetrum",pinyin:""},{id:"pisiform-left",name:"\u5DE6\u8C4C\u8C46\u9AA8",en:"Pisiform bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Pisiform bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8155\u90E8\u638C\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u627E\u5230\u5B83\u4E0E\u4E09\u89D2\u9AA8\u76F8\u5BF9\u7684\u9AA8\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["triquetrum-left"],side:"left",baseId:"pisiform",pinyin:""},{id:"trapezium-left",name:"\u5DE6\u5927\u591A\u89D2\u9AA8",en:"Trapezium bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezium bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u5B83\u4E0E\u7B2C\u4E00\u638C\u9AA8\u57FA\u5E95\u76F8\u5BF9\u7684\u978D\u5F62\u5173\u8282\u533A\u57DF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-left","trapezoid-left","hand-metacarpal-1-left","hand-metacarpal-2-left"],side:"left",baseId:"trapezium",pinyin:""},{id:"trapezoid-left",name:"\u5DE6\u5C0F\u591A\u89D2\u9AA8",en:"Trapezoid bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezoid bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u7B2C\u4E8C\u638C\u9AA8\u540E\u65B9\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u5B83\u5939\u5728\u5927\u591A\u89D2\u9AA8\u548C\u5934\u72B6\u9AA8\u4E4B\u95F4\u7684\u4F4D\u7F6E\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-left","trapezium-left","capitate-left","hand-metacarpal-2-left"],side:"left",baseId:"trapezoid",pinyin:""},{id:"capitate-left",name:"\u5DE6\u5934\u72B6\u9AA8",en:"Capitate bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Capitate bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u4E2D\u592E\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u8F83\u5706\u7684\u5934\u90E8\u4E0E\u5411\u7B2C\u4E09\u638C\u9AA8\u63A5\u7EED\u7684\u8FDC\u7AEF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-left","lunate-left","trapezoid-left","hamate-left","hand-metacarpal-2-left","hand-metacarpal-3-left","hand-metacarpal-4-left"],side:"left",baseId:"capitate",pinyin:""},{id:"hamate-left",name:"\u5DE6\u94A9\u9AA8",en:"Hamate bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Hamate bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u4ECE\u638C\u4FA7\u5BFB\u627E\u94A9\u72B6\u7A81\u8D77\uFF0C\u518D\u770B\u5B83\u4E0E\u7B2C\u56DB\u3001\u7B2C\u4E94\u638C\u9AA8\u7684\u63A5\u7EED\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-left","triquetrum-left","capitate-left","hand-metacarpal-4-left","hand-metacarpal-5-left"],side:"left",baseId:"hamate",pinyin:""},{id:"hand-metacarpal-1-left",name:"\u5DE6\u7B2C1\u638C\u9AA8",en:"First metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["First metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C1\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-left","hand-proximal-1-left"],side:"left",baseId:"hand-metacarpal-1",pinyin:""},{id:"hand-proximal-1-left",name:"\u5DE6\u62C7\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 1 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of first finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u62C7\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-1-left","hand-distal-1-left"],side:"left",baseId:"hand-proximal-1",pinyin:""},{id:"hand-distal-1-left",name:"\u5DE6\u62C7\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 1 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of first finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u62C7\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-1-left"],side:"left",baseId:"hand-distal-1",pinyin:""},{id:"hand-metacarpal-2-left",name:"\u5DE6\u7B2C2\u638C\u9AA8",en:"Second metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Second metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C2\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-left","trapezoid-left","capitate-left","hand-proximal-2-left"],side:"left",baseId:"hand-metacarpal-2",pinyin:""},{id:"hand-proximal-2-left",name:"\u5DE6\u793A\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 2 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of second finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u793A\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-2-left","hand-middle-2-left"],side:"left",baseId:"hand-proximal-2",pinyin:""},{id:"hand-middle-2-left",name:"\u5DE6\u793A\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 2 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of second finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u793A\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-2-left","hand-distal-2-left"],side:"left",baseId:"hand-middle-2",pinyin:""},{id:"hand-distal-2-left",name:"\u5DE6\u793A\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 2 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of second finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u793A\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-2-left"],side:"left",baseId:"hand-distal-2",pinyin:""},{id:"hand-metacarpal-3-left",name:"\u5DE6\u7B2C3\u638C\u9AA8",en:"Third metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Third metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C3\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-left","hand-proximal-3-left"],side:"left",baseId:"hand-metacarpal-3",pinyin:""},{id:"hand-proximal-3-left",name:"\u5DE6\u4E2D\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 3 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of third finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u4E2D\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-3-left","hand-middle-3-left"],side:"left",baseId:"hand-proximal-3",pinyin:""},{id:"hand-middle-3-left",name:"\u5DE6\u4E2D\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 3 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of third finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u4E2D\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-3-left","hand-distal-3-left"],side:"left",baseId:"hand-middle-3",pinyin:""},{id:"hand-distal-3-left",name:"\u5DE6\u4E2D\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 3 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of third finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u4E2D\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-3-left"],side:"left",baseId:"hand-distal-3",pinyin:""},{id:"hand-metacarpal-4-left",name:"\u5DE6\u7B2C4\u638C\u9AA8",en:"Fourth metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fourth metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C4\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-left","hamate-left","hand-proximal-4-left"],side:"left",baseId:"hand-metacarpal-4",pinyin:""},{id:"hand-proximal-4-left",name:"\u5DE6\u73AF\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 4 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fourth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u73AF\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-4-left","hand-middle-4-left"],side:"left",baseId:"hand-proximal-4",pinyin:""},{id:"hand-middle-4-left",name:"\u5DE6\u73AF\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 4 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fourth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u73AF\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-4-left","hand-distal-4-left"],side:"left",baseId:"hand-middle-4",pinyin:""},{id:"hand-distal-4-left",name:"\u5DE6\u73AF\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 4 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fourth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u73AF\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-4-left"],side:"left",baseId:"hand-distal-4",pinyin:""},{id:"hand-metacarpal-5-left",name:"\u5DE6\u7B2C5\u638C\u9AA8",en:"Fifth metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fifth metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C5\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["hamate-left","hand-proximal-5-left"],side:"left",baseId:"hand-metacarpal-5",pinyin:""},{id:"hand-proximal-5-left",name:"\u5DE6\u5C0F\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 5 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fifth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u5C0F\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-5-left","hand-middle-5-left"],side:"left",baseId:"hand-proximal-5",pinyin:""},{id:"hand-middle-5-left",name:"\u5DE6\u5C0F\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 5 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fifth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u5C0F\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-5-left","hand-distal-5-left"],side:"left",baseId:"hand-middle-5",pinyin:""},{id:"hand-distal-5-left",name:"\u5DE6\u5C0F\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 5 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fifth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u5C0F\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-5-left"],side:"left",baseId:"hand-distal-5",pinyin:""}];var Bd=[{id:"cranial",name:"\u8111\u9885\u9AA8",pinyin:"",count:8,color:"#a99e84"},{id:"facial",name:"\u9762\u9885\u9AA8",pinyin:"",count:14,color:"#bda78c"},{id:"head-other",name:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",pinyin:"",count:7,color:"#b6a9bc"},{id:"cervical",name:"\u9888\u690E",pinyin:"",count:7,color:"#9baeba"},{id:"thoracic",name:"\u80F8\u690E",pinyin:"",count:12,color:"#abb293"},{id:"thorax",name:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",pinyin:"",count:25,color:"#bdac88"},{id:"shoulder",name:"\u80A9\u5E26\u9AA8",pinyin:"",count:4,color:"#a3b8a4"},{id:"arm",name:"\u4E0A\u81C2\u4E0E\u524D\u81C2",pinyin:"",count:6,color:"#a4b4b3"},{id:"carpal",name:"\u8155\u9AA8",pinyin:"",count:16,color:"#baa997"},{id:"metacarpal",name:"\u638C\u9AA8",pinyin:"",count:10,color:"#99b1b3"},{id:"hand-phalanges",name:"\u6307\u9AA8",pinyin:"",count:28,color:"#b6a2ad"}];var Wa=["cranial","facial","head-other","cervical","thoracic","lumbar","thorax","shoulder","arm","carpal","metacarpal","hand-phalanges","pelvis","thigh","leg","tarsal","metatarsal","phalanges","sesamoid"],zn=[...at.map(i=>({...i,neighbors:[...i.neighbors]})),...Fd],nh=Object.fromEntries(zn.map(i=>[i.id,i]));for(let i of zn)i.studyRegion={cranial:"head",facial:"head","head-other":i.id==="hyoid"?"head":"auditory",cervical:"cervical",thoracic:"thoracic",lumbar:"lumbar",thorax:"thorax",shoulder:"shoulder",arm:"upper",carpal:"hand",metacarpal:"hand","hand-phalanges":"hand",pelvis:"pelvis",thigh:"knee",leg:"leg"}[i.group]||"foot";nh.L1.neighbors=[...new Set(["T12",...nh.L1.neighbors])];for(let i of zn){i.neighbors=[...new Set(i.neighbors)].filter(e=>e!==i.id);for(let e of i.neighbors)if(!nh[e])throw Error("Unknown neighbor "+e+" of "+i.id)}var tx=[...Bd,...Hs].sort((i,e)=>Wa.indexOf(i.id)-Wa.indexOf(e.id));zn.sort((i,e)=>Wa.indexOf(i.group)-Wa.indexOf(e.group));var xb=Object.fromEntries(zn.map((i,e)=>[i.id,{...i,index:e+1}])),nx=[...Od,{title:"OpenStax \xB7 \u6210\u4EBA\u9AA8\u9ABC\u6E05\u5355\u6838\u5BF9",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system",note:"\u9AA8\u540D\u3001\u5206\u7C7B\u4E0E\u8BA1\u6570\u6838\u5BF9\uFF1B\u4E2D\u6587\u5B66\u4E60\u8BF4\u660E\u4E3A\u672C\u9879\u76EE\u53E6\u884C\u64B0\u5199\u3002"},{title:"OpenStax \xB7 \u9885\u9AA8\u4E0E\u4E0A\u80A2",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull",note:"\u7528\u4E8E\u6838\u5BF9\u9885\u9AA8\u6784\u6210\uFF1B\u4E0D\u662F\u6A21\u578B\u7CBE\u5EA6\u8BA4\u8BC1\u3002"}];nx.push({title:"WHO \xB7 \u6807\u51C6\u9488\u7078\u7A74\u4F4D\u5B9A\u4F4D",url:"https://iris.who.int/handle/10665/353407",note:"361\u4E2A\u7ECF\u7A74\u7684\u6807\u51C6\u5B9A\u4F4D\u65B9\u6CD5\uFF1B\u672C\u9875\u4EC5\u4F7F\u7528\u6807\u51C6\u540D\u79F0\u4F53\u7CFB\u5E76\u5236\u4F5C3D\u5B66\u4E60\u793A\u610F\u3002"},{title:"GB/T 12346-2021 \xB7 \u7ECF\u7A74\u540D\u79F0\u4E0E\u5B9A\u4F4D",url:"https://std.samr.gov.cn/gb/search/gbDetailedCNF?id=D1E86BE73ADD430EE05397BE0A0A206B",note:"\u73B0\u884C\u4E2D\u56FD\u56FD\u5BB6\u63A8\u8350\u6807\u51C6\uFF0C\u7528\u4E8E\u6838\u5BF9\u7ECF\u7A74\u540D\u79F0\u4E0E\u5B9A\u4F4D\u6846\u67B6\u3002"},{title:"TARA Acupoints Ontology",url:"https://github.com/SciCrunch/TARA-Ontology-Repository",note:"\u7528\u4E8E\u673A\u5668\u53EF\u8BFB\u7684\u7ECF\u7A74\u4EE3\u7801\u3001\u4E2D\u6587\u540D\u3001\u62FC\u97F3\u4E0E\u7ECF\u8109\u5F52\u5C5E\u6838\u5BF9\uFF1B3D\u5750\u6807\u4E3A\u672C\u9879\u76EE\u6559\u5B66\u793A\u610F\u3002"});if(zn.length!==210||new Set(zn.map(i=>i.id)).size!==210)throw Error("Bone manifest incomplete");for(let i of tx)if(zn.filter(e=>e.group===i.id).length!==i.count)throw Error("Group count mismatch "+i.id);var ih=[["\u91CD\u529B\u8BA1\u7B97 \xB7 NASA","https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/weight-equation-2/"],["\u59FF\u52BF\u4E0E\u6301\u7EED\u65F6\u95F4 \xB7 OSHA","https://www.osha.gov/etools/computer-workstations/positions"],["\u8FD0\u52A8\u4E0E\u5173\u8282\u529B\u5206\u6790\u6240\u9700\u6570\u636E \xB7 OpenSim","https://opensimconfluence.atlassian.net/wiki/spaces/OpenSim/pages/53089741"],["\u6D6E\u529B\u539F\u7406 \xB7 OpenStax","https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy"]],Vs=[{id:"stand",name:"\u7AD9\u59FF",category:"\u65E5\u5E38",phase:["\u53CC\u811A\u7AD9\u7ACB"],contact:["\u53F3\u811A","\u5DE6\u811A"],static:!0,note:"\u53CC\u811A\u4E0E\u5730\u9762\u63A5\u89E6\u3002\u56FE\u793A\u4E0D\u4EE3\u8868\u4F53\u91CD\u4E00\u5B9A\u5747\u5206\uFF1B\u53EF\u8C03\u6574\u53F3\u4FA7\u652F\u6491\u6BD4\u4F8B\uFF0C\u6BD4\u8F83\u5047\u8BBE\u4E0B\u7684\u5206\u914D\u3002",joints:{}},{id:"sit",name:"\u5750\u59FF",category:"\u65E5\u5E38",phase:["\u6709\u652F\u6491\u5750\u59FF","\u524D\u503E\u5750\u59FF"],contact:["\u5EA7\u9762","\u53F3\u811A","\u5DE6\u811A"],static:!0,note:"\u5EA7\u9762\u548C\u53CC\u811A\u5206\u62C5\u652F\u6491\u3002\u8EAB\u4F53\u524D\u503E\u4F1A\u6539\u53D8\u91CD\u529B\u4F5C\u7528\u7EBF\u4E0E\u652F\u6491\u7684\u76F8\u5BF9\u4F4D\u7F6E\uFF1B\u690E\u95F4\u76D8\u538B\u529B\u3001\u808C\u8089\u529B\u91CF\u9700\u8981\u53E6\u884C\u6D4B\u91CF\u6216\u5EFA\u6A21\u3002",joints:{hipR:[-90,0,0],hipL:[-90,0,0],kneeR:[90,0,0],kneeL:[90,0,0],elbowR:[-85,0,0],elbowL:[-85,0,0]}},{id:"lie",name:"\u8EBA\u59FF",category:"\u65E5\u5E38",phase:["\u4EF0\u5367"],contact:["\u5934\u80CC\u90E8","\u9AA8\u76C6","\u53CC\u4E0B\u80A2"],static:!0,note:"\u652F\u6491\u7531\u5E8A\u9762\u6216\u5730\u9762\u5206\u5E03\u63D0\u4F9B\u3002\u63A5\u89E6\u6807\u8BB0\u4EC5\u63D0\u793A\u533A\u57DF\uFF0C\u4E0D\u80FD\u636E\u6B64\u8BA1\u7B97\u5C40\u90E8\u538B\u529B\u6216\u538B\u4F24\u98CE\u9669\u3002",root:[-90,0,0],joints:{}},{id:"meditate",name:"\u9759\u5750",category:"\u65E5\u5E38",phase:["\u76D8\u5750\u793A\u610F"],contact:["\u5EA7\u9762","\u53CC\u4E0B\u80A2"],static:!0,note:"\u9AA8\u76C6\u4E0E\u4E0B\u80A2\u63D0\u4F9B\u63A5\u89E6\u652F\u6491\u3002\u9ACB\u3001\u819D\u89D2\u5EA6\u662F\u53C2\u8003\u59FF\u52BF\uFF1B\u4E2A\u4F53\u6D3B\u52A8\u8303\u56F4\u4E0E\u8F6F\u7EC4\u7EC7\u63A5\u89E6\u5C1A\u672A\u6821\u51C6\u3002\u4E0D\u8981\u628A\u6A21\u578B\u59FF\u52BF\u5F53\u4F5C\u5FC5\u987B\u8FBE\u5230\u7684\u89D2\u5EA6\u3002",joints:{hipR:[-90,-55,0],hipL:[-90,55,0],kneeR:[125,0,0],kneeL:[125,0,0],shoulderR:[-20,0,0],shoulderL:[-20,0,0],elbowR:[-70,0,0],elbowL:[-70,0,0]}},{id:"run",name:"\u8DD1\u6B65",category:"\u8FD0\u52A8",phase:["\u53F3\u811A\u652F\u6491","\u817E\u7A7A","\u5DE6\u811A\u652F\u6491","\u817E\u7A7A"],contact:[],static:!1,note:"\u8DD1\u6B65\u5305\u542B\u652F\u6491\u4E0E\u817E\u7A7A\u9636\u6BB5\u3002\u652F\u6491\u65F6\u5730\u9762\u53CD\u529B\u4E0E\u8EAB\u4F53\u52A0\u901F\u5EA6\u6709\u5173\uFF0C\u4E0D\u80FD\u76F4\u63A5\u7528\u4F53\u91CD\u4EE3\u66FF\uFF1B\u5F53\u524D\u6CA1\u6709\u6D4B\u529B\u53F0\u6216\u8FD0\u52A8\u6355\u6349\u6570\u636E\u3002",joints:{}},{id:"swim",name:"\u6E38\u6CF3",category:"\u8FD0\u52A8",phase:["\u53F3\u81C2\u5212\u6C34","\u5DE6\u81C2\u5212\u6C34"],contact:["\u6C34\u4F53"],static:!1,water:!0,note:"\u6C34\u4E2D\u540C\u65F6\u5B58\u5728\u91CD\u529B\u3001\u6D6E\u529B\u548C\u8FD0\u52A8\u963B\u529B\u3002\u53EF\u8F93\u5165\u6392\u6C34\u4F53\u79EF\u4F30\u7B97\u6D6E\u529B\uFF1B\u672A\u8BA1\u7B97\u63A8\u8FDB\u529B\u3001\u963B\u529B\u3001\u547C\u5438\u72B6\u6001\u548C\u5B9E\u9645\u6E38\u6CF3\u8F68\u8FF9\u3002",root:[90,0,0],joints:{}},{id:"tree",name:"\u745C\u4F3D \xB7 \u6811\u5F0F",category:"\u745C\u4F3D",phase:["\u53F3\u811A\u652F\u6491","\u5DE6\u811A\u652F\u6491"],contact:[],static:!0,note:"\u5355\u811A\u652F\u6491\uFF0C\u53E6\u4E00\u4FA7\u4E0B\u80A2\u4E3A\u6446\u653E\u793A\u610F\u3002\u5E73\u8861\u9700\u8981\u91CD\u529B\u4F5C\u7528\u7EBF\u4E0E\u652F\u6491\u8303\u56F4\u914D\u5408\uFF1B\u672C\u6A21\u578B\u6CA1\u6709\u808C\u8089\u63A7\u5236\u548C\u5E73\u8861\u6C42\u89E3\uFF0C\u4E0D\u5224\u65AD\u59FF\u52BF\u662F\u5426\u7A33\u5B9A\u3002",joints:{}},{id:"warrior",name:"\u745C\u4F3D \xB7 \u6218\u58EB\u5F0F",category:"\u745C\u4F3D",phase:["\u53F3\u817F\u5728\u524D","\u5DE6\u817F\u5728\u524D"],contact:["\u53F3\u811A","\u5DE6\u811A"],static:!0,note:"\u524D\u540E\u811A\u5F62\u6210\u8F83\u5BBD\u652F\u6491\u8303\u56F4\u3002\u819D\u3001\u9ACB\u548C\u8E1D\u53D7\u529B\u9700\u8981\u5730\u9762\u53CD\u529B\u3001\u52A8\u4F5C\u4E0E\u808C\u8089\u6A21\u578B\uFF1B\u8FD9\u91CC\u5C55\u793A\u5173\u8282\u94FE\u548C\u63A5\u89E6\u5173\u7CFB\u3002",joints:{}},{id:"dog",name:"\u745C\u4F3D \xB7 \u4E0B\u72AC\u5F0F",category:"\u745C\u4F3D",phase:["\u624B\u811A\u652F\u6491\u793A\u610F"],contact:["\u53F3\u624B","\u5DE6\u624B","\u53F3\u811A","\u5DE6\u811A"],static:!0,note:"\u624B\u811A\u5171\u540C\u652F\u6491\u3002\u9AA8\u67B6\u91C7\u7528\u8FD1\u4F3C\u5173\u8282\u4E2D\u5FC3\u7684\u521A\u4F53\u6446\u4F4D\uFF1B\u80A9\u5E26\u3001\u810A\u67F1\u4E0E\u624B\u8DB3\u63A5\u89E6\u4ECD\u9700\u590D\u6838\uFF0C\u4E0D\u80FD\u636E\u6B64\u5224\u65AD\u5173\u8282\u8D1F\u8377\u3002",root:[135,0,0],joints:{hipR:[-95,0,0],hipL:[-95,0,0],ankleR:[-40,0,0],ankleL:[-40,0,0],shoulderR:[165,0,0],shoulderL:[165,0,0],wristR:[60,0,0],wristL:[60,0,0]}}];function Ki(i,e=0){let t=Vs.find(a=>a.id===i)||Vs[0],n=Math.max(0,Math.min(1,Number(e)||0)),s=Math.min(t.phase.length-1,Math.floor(n*t.phase.length)),r=Object.fromEntries(Object.entries(t.joints).map(([a,c])=>[a,[...c]])),o=[...t.contact];if(i==="sit"&&(r.trunk=[s?20:0,0,0]),i==="run"){let a=[[-10,15,25,100],[-40,25,30,110],[25,100,-10,15],[30,110,-40,25],[-10,15,25,100]],c=n*4,l=Math.min(3,Math.floor(c)),u=c-l,h=a[l].map((d,p)=>d+(a[l+1][p]-d)*u);Object.assign(r,{trunk:[10,0,0],hipR:[h[0],0,0],hipL:[h[2],0,0],kneeR:[h[1],0,0],kneeL:[h[3],0,0],ankleR:[-h[0]-h[1],0,0],ankleL:[-h[2]-h[3],0,0],shoulderR:[-h[0]*.7,0,0],shoulderL:[-h[2]*.7,0,0],elbowR:[-85,0,0],elbowL:[-85,0,0]}),o=s===0?["\u53F3\u811A"]:s===2?["\u5DE6\u811A"]:[]}if(i==="swim"){let a=n*360;Object.assign(r,{shoulderR:[a,0,0],shoulderL:[a+180,0,0],elbowR:[-25,0,0],elbowL:[-25,0,0],hipR:[Math.sin(n*Math.PI*4)*12,0,0],hipL:[-Math.sin(n*Math.PI*4)*12,0,0]})}if(i==="tree"){let a=s?"R":"L";Object.assign(r,{["hip"+a]:[-35,s?-50:50,s?25:-25],["knee"+a]:[110,0,0],shoulderR:[0,0,-150],shoulderL:[0,0,150],elbowR:[-15,0,0],elbowL:[-15,0,0]}),o=s?["\u5DE6\u811A"]:["\u53F3\u811A"]}if(i==="warrior"){let a=s?"L":"R",c=s?"R":"L";Object.assign(r,{["hip"+a]:[-45,0,0],["knee"+a]:[70,0,0],["hip"+c]:[30,0,0],["ankle"+a]:[-25,0,0],["ankle"+c]:[-30,0,0],shoulderR:[0,0,-75],shoulderL:[0,0,75]})}return{...t,joints:r,phaseIndex:s,phaseName:t.phase[s],contact:o}}function Gs({mass:i=70,gravity:e=9.81,volume:t=65,density:n=1e3,minutes:s=30,breakEvery:r=20,share:o=.5},a){let c=Math.max(20,Math.min(200,Number(i)||70)),l=Math.max(0,Math.min(20,Number(e)||0)),u=Math.max(0,Math.min(200,Number(t)||0)),h=Math.max(900,Math.min(1200,Number(n)||1e3)),d=Math.max(0,Math.min(1440,Number(s)||0)),p=c*l,g=a.water?h*l*u/1e3:0,_=d*60,m=a.static?p:null,f=Math.max(0,Math.min(1,Number(o)||0)),E=a.id==="stand"||a.id==="warrior"?[{name:"\u53F3\u811A",force:p*f},{name:"\u5DE6\u811A",force:p*(1-f)}]:a.id==="tree"?[{name:a.contact[0],force:p}]:[];return{mass:c,gravity:l,weight:p,buoyancy:g,netWaterWeight:p-g,staticSupport:m,distribution:E,seconds:_,changes:r>0?Math.max(0,Math.ceil(d/Number(r))-1):0,clinicalPrediction:!1}}var he=i=>document.getElementById(i),qs=he("poseViewport"),Ys=new URLSearchParams(location.hash.slice(1)),bt=Vs.some(i=>i.id===Ys.get("pose"))?Ys.get("pose"):"stand",qt=0,si=!1,Ji=!1,ah=0,lh=0,$i=null;for(let i of["mass","gravity","volume","density","minutes","breakEvery","share"])if(Ys.has(i)){let e=Number(Ys.get(i)),t=he(i);Number.isFinite(e)&&e>=Number(t.min)&&e<=Number(t.max)&&(t.value=e)}Ys.has("phase")&&(qt=It.clamp(Number(Ys.get("phase"))||0,0,100)/100);he("phase").value=Math.round(qt*100);var ri=new pr;ri.background=new Ee("#e8eee5");var Et=new xt(37,1,.01,80);Et.position.set(2,1.4,3);var Si=new Oa({antialias:!0,preserveDrawingBuffer:!1});Si.setPixelRatio(Math.min(devicePixelRatio,2));Si.outputColorSpace=gt;Si.toneMapping=Yo;Si.toneMappingExposure=1;qs.append(Si.domElement);ri.add(new wr("#fffaf1","#667865",2));var zd=new yi("#ffffff",2.2);zd.position.set(3,4,3);ri.add(zd);var Hd=new yi("#d6e5e4",1);Hd.position.set(-3,2,-3);ri.add(Hd);var vt=new ka(Et,Si.domElement);vt.enableDamping=!1;vt.minDistance=.3;vt.maxDistance=12;vt.zoomToCursor=!0;vt.touches.TWO=hn.DOLLY_PAN;var Vr=new Pt;ri.add(Vr);var Xt=new Pt,Gr=new Pt,Xa=new Pt;ri.add(Xt,Gr,Xa);var qa=new st(new Oi(5,5),new kt({color:"#dce6d7",transparent:!0,opacity:.65,side:jt}));qa.rotation.x=-Math.PI/2;qa.position.y=-.004;ri.add(qa);var uh=new Pr(5,20,"#a5b6a2","#c6d3be");uh.position.y=-.003;ri.add(uh);var Ws={},Xs=[],ix=new Map(zn.map(i=>[i.id,i])),dh=[],En=new Map,sx=!0,kd=0,sh={pelvis:[99.55,835,-50],lumbar:[99.55,905,-50],trunk:[99.55,1100,-50],head:[99.55,1405,-64],hipR:[38,829,-43],hipL:[161,829,-43],kneeR:[20,386,-48],kneeL:[179,386,-48],ankleR:[23,28,-52],ankleL:[176,28,-52],shoulderR:[-63,1348,-51],shoulderL:[262,1348,-51],elbowR:[-144,1044,-38],elbowL:[343,1044,-38],wristR:[-201,791,-22],wristL:[400,791,-22]},rh={pelvis:null,lumbar:"pelvis",trunk:"lumbar",head:"trunk",hipR:"pelvis",hipL:"pelvis",kneeR:"hipR",kneeL:"hipL",ankleR:"kneeR",ankleL:"kneeL",shoulderR:"trunk",shoulderL:"trunk",elbowR:"shoulderR",elbowL:"shoulderL",wristR:"elbowR",wristL:"elbowL"},oh=i=>new C(...i).multiplyScalar(.001);function oi(){ah||(ah=requestAnimationFrame(rx))}function rx(i){if(ah=0,si&&Ji&&!document.hidden){let e=Math.min(.1,(i-lh)/1e3||0);qt=(qt+e*.16)%1,he("phase").value=Math.round(qt*100),i-kd>80&&(Za(!1),ji(!1),kd=i)}lh=i,vt.update(),Si.render(ri,Et),lx(),si&&!document.hidden&&oi()}vt.addEventListener("change",oi);function fh(){let i=qs.getBoundingClientRect();Si.setSize(Math.max(1,i.width),Math.max(1,i.height)),Et.aspect=i.width/Math.max(1,i.height),Et.updateProjectionMatrix(),oi()}new ResizeObserver(fh).observe(qs);function ox(i){let e=i.side==="left"?"L":"R";return["cranial","facial","head-other","cervical"].includes(i.group)?"head":i.group==="lumbar"?"lumbar":["thoracic","thorax","shoulder"].includes(i.group)?"trunk":i.group==="pelvis"?"pelvis":i.group==="arm"?i.id.startsWith("humerus")?"shoulder"+e:"elbow"+e:["carpal","metacarpal","hand-phalanges"].includes(i.group)?"wrist"+e:i.group==="thigh"?i.id.startsWith("patella")?"knee"+e:"hip"+e:i.group==="leg"?"knee"+e:"ankle"+e}function ch(i){for(;i.children.length;){let e=i.children[0];i.remove(e),e.traverse(t=>{t.geometry?.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material?.dispose()})}}function hh(i,e){let t=document.createElement("span");t.className="poseLabel",t.textContent=i,he("poseLabelLayer").append(t);let n=document.createElementNS("http://www.w3.org/2000/svg","line");n.setAttribute("stroke","#78a699"),n.setAttribute("stroke-width","1"),he("labelLeaders").append(n),dh.push({e:t,position:e,line:n})}function ax(){dh.splice(0).forEach(i=>{i.e.remove(),i.line.remove()})}function lx(){let i=qs.getBoundingClientRect(),e=[];for(let t of dh){let n=t.position.clone().project(Et),s=(n.x*.5+.5)*i.width,r=(1-n.y)*i.height*.5;if(t.e.hidden=n.z>1||n.z<-1||s<0||s>i.width||r<85||r>i.height-140,t.e.hidden){t.line.style.display="none";continue}let o=t.e.offsetWidth,a=t.e.offsetHeight,c=It.clamp(s+10,8,i.width-o-8),l=It.clamp(r,90,i.height-155-a);for(let u=0;u<15&&e.some(h=>c<h.x+h.w+4&&c+o+4>h.x&&l<h.y+h.h+4&&l+a+4>h.y);u++)l=It.clamp(r-(u+1)*(a+5),90,i.height-155-a);t.e.style.left=c+"px",t.e.style.top=l+"px",e.push({x:c,y:l,w:o,h:a}),t.line.style.display="",t.line.setAttribute("x1",s),t.line.setAttribute("y1",r),t.line.setAttribute("x2",It.clamp(s,c,c+o)),t.line.setAttribute("y2",l+a/2)}}function Ya(i){if(!Ji)return;let e=new Ct().setFromObject(Xt),t=e.getCenter(new C),n=e.getSize(new C),s=i?new C(...i):Et.position.clone().sub(vt.target).normalize(),r=qs.clientHeight,o=qs.clientWidth,a=Math.max(.35,(r-250)/r),c=Math.max(n.length()/(2*Math.sin(Math.atan(Math.tan(It.degToRad(Et.fov/2))*Et.aspect*.78))),n.y/(2*Math.tan(It.degToRad(Et.fov/2))*a),n.x/(2*Math.tan(It.degToRad(Et.fov/2))*Et.aspect*.75));vt.target.copy(t),vt.target.y+=n.y*.025,Et.position.copy(vt.target).addScaledVector(s.normalize(),c),Et.near=.01,Et.far=80,Et.updateProjectionMatrix(),vt.update(),oi()}function Zs(){return Object.fromEntries(["mass","gravity","volume","density","minutes","breakEvery","share"].map(i=>[i,i==="share"?Number(he(i).value)/100:Number(he(i).value)]))}function Vd(){let i=new URLSearchParams({pose:bt,phase:String(Math.round(qt*100)),...Object.fromEntries(["mass","gravity","volume","density","minutes","breakEvery","share"].map(e=>[e,he(e).value]))});history.replaceState(null,"",location.pathname+location.search+"#"+i)}var ii=i=>Number(i).toLocaleString("zh-CN",{maximumFractionDigits:1});function ji(i=!0){i&&(he("recordPreview").hidden=!0,he("exportStatus").textContent="",$i&&(URL.revokeObjectURL($i),$i=null));let e=Ki(bt,qt),t=Gs(Zs(),e);he("phaseName").textContent=e.phaseName,he("poseTitle").textContent=e.name+" \xB7 "+e.phaseName,he("waterInputs").hidden=!e.water,he("shareRow").hidden=!["stand","warrior"].includes(bt),he("shareValue").value=he("share").value+"%",he("play").disabled=e.phase.length<2,he("phase").disabled=e.phase.length<2,he("analysis").innerHTML=`<div class="metric"><small>\u8BBE\u5B9A\u73AF\u5883\u4E0B\u7684\u91CD\u529B \xB7 W = m \xD7 g</small><strong>${ii(t.weight)} N</strong><small>${ii(t.mass)} kg \xD7 ${Number(t.gravity).toLocaleString("zh-CN",{maximumFractionDigits:3})} m/s\xB2</small></div>`+(e.water?`<div class="metric"><small>\u6D6E\u529B\u4F30\u7B97 \xB7 \u03C1 \xD7 g \xD7 \u6392\u6C34\u4F53\u79EF</small><strong>${ii(t.buoyancy)} N</strong><small>\u91CD\u529B\u51CF\u6D6E\u529B\uFF1A${ii(t.netWaterWeight)} N\uFF08\u6B63\u503C\u5411\u4E0B\uFF09</small></div>`:e.static?`<div class="metric"><small>\u9759\u6001\u5E73\u8861\u5047\u8BBE\u4E0B \xB7 \u603B\u652F\u6491\u529B</small><strong>${ii(t.staticSupport)} N</strong><small>\u53EA\u8BA1\u7B97\u603B\u91CF\uFF0C\u4E0D\u4EE3\u8868\u5173\u8282\u5185\u90E8\u53D7\u529B\u3002</small></div>`:`<p class="assumption">\u8FD0\u52A8\u4E2D\u7684\u63A5\u89E6\u529B\u5E45\u503C\u672A\u8BA1\u7B97\u3002${e.contact.length?"\u5F53\u524D\u9636\u6BB5\u6709\u63A5\u89E6\uFF0C\u65B9\u5411\u7BAD\u5934\u4EC5\u4F5C\u8BF4\u660E\u3002":"\u5F53\u524D\u4E3A\u817E\u7A7A\u9636\u6BB5\uFF0C\u6CA1\u6709\u5730\u9762\u652F\u6491\u3002"}\u9700\u8981\u8EAB\u4F53\u52A0\u901F\u5EA6\u4E0E\u5730\u9762\u53CD\u529B\u6570\u636E\u3002</p>`)+`<h3>\u652F\u6491\u4E0E\u63A5\u89E6</h3><p>${e.contact.length?e.contact.join("\u3001"):"\u65E0\u5730\u9762\u63A5\u89E6"}</p>`+(t.distribution.length?'<p class="assumption">\u652F\u6491\u6BD4\u4F8B\u4E3A\u624B\u52A8\u5047\u8BBE\uFF1A'+t.distribution.map(n=>n.name+" "+ii(n.force)+" N").join("\uFF1B")+"\u3002</p>":'<p class="intro">\u533A\u57DF\u95F4\u5206\u914D\u672A\u8BA1\u7B97\uFF1B\u6807\u8BB0\u5927\u5C0F\u4E0D\u4EE3\u8868\u538B\u529B\u5927\u5C0F\u3002</p>')+`<p class="note">${e.note}</p><h3>\u6301\u7EED ${ii(t.seconds/60)} \u5206\u949F</h3><p>${e.static?"\u5728\u672C\u6B21\u9759\u6001\u5047\u8BBE\u4E2D\uFF0C\u91CD\u529B\u548C\u603B\u652F\u6491\u4E0D\u4F1A\u56E0\u65F6\u95F4\u589E\u52A0\u800C\u81EA\u52A8\u589E\u5927\u3002":"\u52A8\u4F5C\u9636\u6BB5\u53D8\u5316\u4E0E\u672C\u6B21\u8BBE\u5B9A\u7684\u603B\u65F6\u957F\u662F\u4E0D\u540C\u53D8\u91CF\uFF1B\u64AD\u653E\u901F\u5EA6\u4EC5\u4E3A\u89C2\u5BDF\u901F\u5EA6\u3002"}</p><p>\u6309\u8BBE\u5B9A\u95F4\u9694\uFF0C\u671F\u95F4\u8BA1\u5212\u6362\u59FF ${t.changes} \u6B21\u3002\u75B2\u52B3\u3001\u7EC4\u7EC7\u8010\u53D7\u3001\u8840\u6D41\u4E0E\u635F\u4F24\u7A0B\u5EA6\u5C1A\u672A\u5EFA\u6A21\uFF0C\u4E0D\u80FD\u7531\u5206\u949F\u6570\u76F4\u63A5\u63A8\u65AD\u3002</p>`,i&&Vd(),oi()}function Mi(i,e=[0,0,0]){return Ws[i].localToWorld(new C(...e))}function cx(i){En.clear();let e=t=>{let n=t==="R"?["calcaneus","metatarsal-3"]:["calcaneus-left","metatarsal-3-left"],s=new C;for(let r of n){let o=Xs.find(a=>a.name===r);s.add(o.getWorldPosition(new C))}return s.multiplyScalar(.5)};En.set("\u53F3\u811A",e("R")),En.set("\u5DE6\u811A",e("L")),En.set("\u53F3\u624B",Mi("wristR",[0,-.07,0])),En.set("\u5DE6\u624B",Mi("wristL",[0,-.07,0])),En.set("\u5EA7\u9762",Mi("pelvis",[0,-.08,0])),En.set("\u9AA8\u76C6",Mi("pelvis")),En.set("\u5934\u80CC\u90E8",Mi("trunk",[0,.22,-.08])),En.set("\u53CC\u4E0B\u80A2",e("R").add(e("L")).multiplyScalar(.5)),En.set("\u6C34\u4F53",Mi("pelvis"));for(let t of i.contact){let n=En.get(t);if(!n)continue;let s=new st(new As(.022,16,10),new kt({color:"#187878"}));if(s.position.copy(n),Xa.add(s),hh(t,n),!i.water&&(!i.static||Gs(Zs(),i).weight>0)){let r=new ki(new C(0,1,0),n.clone().add(new C(0,-.2,0)),.22,"#187878",.065,.04);Gr.add(r)}}}function ph(i){ch(Gr),ch(Xa),ax(),Xt.updateMatrixWorld(!0),cx(i);let e=Gs(Zs(),i),t=new Ct().setFromObject(Xt),n=t.getCenter(new C);if(e.weight>0){let s=new ki(new C(0,-1,0),n.clone().add(new C(.18,.25,0)),.36,"#c05d46",.08,.05);Gr.add(s),hh("\u91CD\u529B "+ii(e.weight)+" N \xB7 \u4F4D\u7F6E\u793A\u610F",n.clone().add(new C(.18,-.11,0)))}if(i.water&&e.buoyancy>0&&(Gr.add(new ki(new C(0,1,0),n.clone().add(new C(-.18,-.22,0)),.36,"#187878",.08,.05)),hh("\u6D6E\u529B "+ii(e.buoyancy)+" N",n.clone().add(new C(-.18,.14,0)))),sx)for(let s of["hipR","hipL","kneeR","kneeL","shoulderR","shoulderL","elbowR","elbowL"]){let r=new st(new As(.009,10,8),new kt({color:"#ca9c42"}));r.position.copy(Mi(s)),Xa.add(r)}qa.visible=uh.visible=!i.water}function Za(i=!0){if(!Ji)return;let e=Ki(bt,qt);Xt.position.set(0,0,0),Xt.rotation.set(...(e.root||[0,0,0]).map(It.degToRad));for(let[n,s]of Object.entries(Ws)){let r=e.joints[n]||[0,0,0];s.rotation.order=bt==="meditate"&&n.startsWith("hip")?"YXZ":"XYZ",s.rotation.set(...r.map(It.degToRad)),bt==="meditate"&&n.startsWith("hip")&&s.rotateY(It.degToRad(n==="hipR"?-90:90))}Xt.updateMatrixWorld(!0);let t=new Ct().setFromObject(Xt);Xt.position.y-=t.min.y,e.water&&(Xt.position.y+=.35),bt==="run"&&!e.contact.length&&(Xt.position.y+=.14),Xt.updateMatrixWorld(!0),ph(e),hx(),i&&Ya(),oi()}function hx(){if(ch(Vr),bt!=="sit")return;let i=Mi("pelvis",[0,-.08,-.08]),e=Math.max(.02,i.y),t=()=>new Ln({color:"#739785",roughness:.85,transparent:!0,opacity:.45}),n=new st(new Pn(.43,.035,.4),t());n.position.copy(i),n.position.y-=.02,Vr.add(n);for(let r of[-.17,.17])for(let o of[-.15,.15]){let a=new st(new Pn(.025,e,.025),t());a.position.set(i.x+r,e/2,i.z+o),Vr.add(a)}let s=new st(new Pn(.43,.4,.025),t());s.position.set(i.x,e+.2,i.z-.2),Vr.add(s)}function mh(){si=!1,he("analysis").setAttribute("aria-live","polite"),he("play").textContent="\u64AD\u653E\u52A8\u4F5C",Vd()}function gh(i){mh(),bt=i,qt=0,he("phase").value=0,he("poseQuick").value=i,document.querySelectorAll("[data-pose]").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.pose===i))),Za(),ji()}he("poseChoices").innerHTML=Vs.map(i=>`<button data-pose="${i.id}" aria-pressed="${i.id===bt}">${i.name}</button>`).join("");he("poseChoices").querySelectorAll("button").forEach(i=>i.onclick=()=>gh(i.dataset.pose));he("poseQuick").innerHTML=Vs.map(i=>`<option value="${i.id}">${i.name}</option>`).join("");he("poseQuick").value=bt;he("poseQuick").onchange=()=>gh(he("poseQuick").value);he("poseSources").innerHTML=ih.map(([i,e])=>`<li><a href="${e}" target="_blank" rel="noopener">${i} \u2197</a></li>`).join("");he("phase").oninput=()=>{mh(),qt=Number(he("phase").value)/100,Za(!1),ji()};he("resetPhase").onclick=()=>gh(bt);he("play").onclick=()=>{si=!si,si&&(he("recordPreview").hidden=!0,he("exportStatus").textContent=""),he("analysis").setAttribute("aria-live",si?"off":"polite"),he("play").textContent=si?"\u6682\u505C\u52A8\u4F5C":"\u64AD\u653E\u52A8\u4F5C",lh=performance.now(),oi()};for(let i of["mass","gravity","volume","density","minutes","breakEvery","share"])he(i).oninput=()=>{let e=he(i);he("inputError").textContent=e.checkValidity()?"":"\u8BF7\u8F93\u5165\u6B64\u5B57\u6BB5\u5141\u8BB8\u8303\u56F4\u5185\u7684\u6570\u503C\u3002",he("export").disabled=!["mass","gravity","volume","density","minutes","breakEvery"].every(t=>he(t).checkValidity()),!he("export").disabled&&(ji(),Ji&&ph(Ki(bt,qt)))};document.querySelectorAll("[data-gravity]").forEach(i=>i.onclick=()=>{he("gravity").value=i.dataset.gravity,ji(),Ji&&ph(Ki(bt,qt))});function Gd(i){vt.mouseButtons.LEFT=i?Mn.PAN:Mn.ROTATE,vt.touches.ONE=i?hn.PAN:hn.ROTATE,he("rotate").setAttribute("aria-pressed",String(!i)),he("pan").setAttribute("aria-pressed",String(i))}he("rotate").onclick=()=>Gd(!1);he("pan").onclick=()=>Gd(!0);function Wd(i){let e=Et.position.clone().sub(vt.target),t=e.length(),n=It.clamp(t*i,vt.minDistance,vt.maxDistance);Et.position.copy(vt.target).addScaledVector(e,n/t),vt.update(),oi()}he("zoomIn").onclick=()=>Wd(.8);he("zoomOut").onclick=()=>Wd(1.25);he("frame").onclick=()=>Ya();he("front").onclick=()=>Ya([0,.05,1]);he("side").onclick=()=>Ya([1,.05,0]);he("export").onclick=()=>{let i=Ki(bt,qt),e=Gs(Zs(),i),t={version:"37.0.0",pose:i.name,phase:i.phaseName,inputs:Zs(),calculation:e,contacts:i.contact,jointAnglesDegrees:i.joints,rootAnglesDegrees:i.root||[0,0,0],jointRotationOrder:bt==="meditate"?{hipR:"YXZ",hipL:"YXZ",default:"XYZ"}:{default:"XYZ"},additionalLocalYDegrees:bt==="meditate"?{hipR:-90,hipL:90}:{},assumptions:["\u59FF\u52BF\u4E3A\u9AA8\u67B6\u521A\u4F53\u793A\u610F","\u5173\u8282\u4E2D\u5FC3\u672A\u52A8\u4F5C\u6355\u6349\u6821\u51C6","\u63A5\u89E6\u4F4D\u7F6E\u4E0D\u4EE3\u8868\u538B\u529B","\u4E0D\u9884\u6D4B\u635F\u4F24\u6216\u4E34\u5E8A\u7ED3\u679C"],sources:ih},n=JSON.stringify(t,null,2);$i&&URL.revokeObjectURL($i),$i=URL.createObjectURL(new Blob([n],{type:"application/json"})),he("recordText").value=n,he("recordDownload").href=$i,he("recordDownload").download="pose-observation-"+bt+".json",he("recordPreview").hidden=!1,he("recordPreview").open=!0,he("exportStatus").textContent="\u8BB0\u5F55\u5DF2\u751F\u6210\uFF1A\u53EF\u67E5\u770B\u3001\u590D\u5236\u6216\u4E0B\u8F7D JSON\u3002"};document.querySelector(".quickPose a").onclick=i=>{i.preventDefault(),he("analysisPanel").scrollIntoView({behavior:"smooth"})};document.addEventListener("visibilitychange",()=>{document.hidden?mh():oi()});async function ux(){let i=await new za().loadAsync("../fullbody-tcm-v9/assets/fullbody.glb",e=>{e.total&&(he("modelStatus").textContent="\u6B63\u5728\u52A0\u8F7D\u53C2\u8003\u9AA8\u67B6 "+Math.round(e.loaded/e.total*100)+"%")});i.scene.updateMatrixWorld(!0);for(let[e,t]of Object.entries(sh)){let n=new Pt;n.name=e,n.position.copy(oh(t)),rh[e]?(n.position.sub(oh(sh[rh[e]])),Ws[rh[e]].add(n)):Xt.add(n),Ws[e]=n}if(i.scene.traverse(e=>{if(!e.isMesh)return;let t=ix.get(e.name);if(!t)throw Error("\u6E90\u9AA8\u5757\u65E0\u6CD5\u8BC6\u522B\uFF1A"+e.name);let n=new C,s=new Nt,r=new C;e.matrixWorld.decompose(n,s,r);let o=ox(t),a=new st(e.geometry,new Ln({color:"#ccba92",roughness:.7}));a.name=e.name,a.position.copy(n.multiplyScalar(.001).sub(oh(sh[o]))),a.scale.copy(r.multiplyScalar(.001)),a.quaternion.copy(s),a.userData.segment=o,Ws[o].add(a),Xs.push(a)}),Xs.length!==210)throw Error("\u9AA8\u67B6\u672A\u5B8C\u6574\u52A0\u8F7D");Ji=!0,fh(),Za(),ji(),he("modelStatus").textContent="210 \u9AA8\u5757 \xB7 \u8FD1\u4F3C\u5173\u8282\u4E2D\u5FC3 \xB7 \u9AA8\u67B6\u59FF\u52BF\u793A\u610F"}ji();fh();ux().catch(i=>{he("modelStatus").textContent="\u9AA8\u67B6\u52A0\u8F7D\u5931\u8D25\uFF1A"+i.message;let e=document.createElement("button");e.textContent="\u91CD\u65B0\u52A0\u8F7D",e.onclick=()=>location.reload(),document.querySelector(".stageTitle").append(e)});if(location.hostname==="127.0.0.1"&&new URLSearchParams(location.search).has("audit")){let i=document.createElement("button");i.textContent="\u68C0\u67E5\u59FF\u52BF\u72B6\u6001",i.style.cssText="position:fixed;bottom:2px;right:2px;z-index:100",document.body.append(i);let e=document.createElement("pre");e.id="poseAudit",e.hidden=!0,document.body.append(e),i.onclick=()=>{Xt.updateMatrixWorld(!0);let t=Ki(bt,qt),n=new Ct().setFromObject(Xt);e.textContent=JSON.stringify({ready:Ji,pose:bt,phase:qt,playing:si,bones:Xs.length,assigned:Xs.every(s=>!!s.parent),finite:Xs.every(s=>s.matrixWorld.elements.every(Number.isFinite)),bounds:[n.min.toArray(),n.max.toArray()],camera:Et.position.toArray(),target:vt.target.toArray(),joints:Object.fromEntries(Object.entries(Ws).map(([s,r])=>[s,r.getWorldPosition(new C).toArray()])),contacts:t.contact,calculation:Gs(Zs(),t)})}}})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
