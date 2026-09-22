(()=>{/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Dn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Nn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wu=0,Cc=1,Xu=2;var Ic=1,xo=2,Zi=3,Ci=0,Vt=1,bi=2,Bt=0,Kn=1,Pc=2,Lc=3,Dc=4,yo=5,Ii=100,qu=101,Yu=102,Zu=103,Ku=104,ta=200,$u=201,ju=202,Ju=203,Ja=204,Qa=205,vo=206,Qu=207,bo=208,ed=209,td=210,id=211,nd=212,sd=213,rd=214,Mo=0,So=1,To=2,$n=3,Eo=4,wo=5,Ao=6,Ro=7,Co=0,ad=1,od=2,_n=0,Io=1,Po=2,Lo=3,as=4,Do=5,No=6,Uo=7,_c="attached",ld="detached",Nc=300,os=301,ls=302,Fo=303,Oo=304,ia=306,Pi=1e3,zi=1001,Os=1002,Rt=1003,Bo=1004;var cs=1005;var $t=1006,Qs=1007;var Li=1008;var Di=1009,Uc=1010,Fc=1011,er=1012,ko=1013,Un=1014,ri=1015,Ni=1016,zo=1017,Vo=1018,Fn=1020,Oc=35902,Bc=35899,kc=1021,zc=1022,fi=1023,Bs=1026,On=1027,tr=1028,Ho=1029,Vc=1030,Go=1031;var Wo=1033,na=33776,sa=33777,ra=33778,aa=33779,Xo=35840,qo=35841,Yo=35842,Zo=35843,Ko=36196,$o=37492,jo=37496,Jo=37808,Qo=37809,el=37810,tl=37811,il=37812,nl=37813,sl=37814,rl=37815,al=37816,ol=37817,ll=37818,cl=37819,hl=37820,ul=37821,dl=36492,fl=36494,pl=36495,ml=36283,gl=36284,_l=36285,xl=36286;var jn=2300,Jn=2301,ja=2302,xc=2400,yc=2401,vc=2402,cd=2500;var Hc=0,oa=1,ir=2,hd=3200,ud=3201;var la=0,dd=1,xn="",Mt="srgb",kt="srgb-linear",Cr="linear",tt="srgb";var Zn=7680;var bc=519,fd=512,pd=513,md=514,Gc=515,gd=516,_d=517,xd=518,yd=519,eo=35044;var Wc="300 es",Ai=2e3,Ir=2001;var Hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],au=1234567,Ar=Math.PI/180,Qn=180/Math.PI;function Ri(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function Xc(n,e){return(n%e+e)%e}function zf(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Vf(n,e,t){return n!==e?(t-n)/(e-n):0}function Rr(n,e,t){return(1-t)*n+t*e}function Hf(n,e,t,i){return Rr(n,e,1-Math.exp(-t*i))}function Gf(n,e=1){return e-Math.abs(Xc(n,e*2)-e)}function Wf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Xf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function qf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Yf(n,e){return n+Math.random()*(e-n)}function Zf(n){return n*(.5-Math.random())}function Kf(n){n!==void 0&&(au=n);let e=au+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $f(n){return n*Ar}function jf(n){return n*Qn}function Jf(n){return(n&n-1)===0&&n!==0}function Qf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ep(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function tp(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*h,c*u,c*d,o*l);break;case"YZY":n.set(c*d,o*h,c*u,o*l);break;case"ZXZ":n.set(c*u,c*d,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*f,o*l);break;case"YXY":n.set(c*f,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function st(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Ui={DEG2RAD:Ar,RAD2DEG:Qn,generateUUID:Ri,clamp:Ge,euclideanModulo:Xc,mapLinear:zf,inverseLerp:Vf,lerp:Rr,damp:Hf,pingpong:Gf,smoothstep:Wf,smootherstep:Xf,randInt:qf,randFloat:Yf,randFloatSpread:Zf,seededRandom:Kf,degToRad:$f,radToDeg:jf,isPowerOfTwo:Jf,ceilPowerOfTwo:Qf,floorPowerOfTwo:ep,setQuaternionFromProperEuler:tp,normalize:st,denormalize:wi},Ee=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Tt=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o,p=c*d+l*f+h*g+u*_,E=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){let w=Math.sqrt(S),A=Math.atan2(w,p*E);m=Math.sin(m*A)/w,o=Math.sin(o*A)/w}let v=o*E;if(c=c*m+d*v,l=l*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-o){let w=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=w,l*=w,h*=w,u*=w}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),u=o(r/2),d=c(i/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(i>o&&i>u){let f=2*Math.sqrt(1+i-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-i-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ou.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ou.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+c*l+a*u-o*h,this.y=i+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Wl.copy(this).projectOnVector(e),this.sub(Wl)}reflect(e){return this.sub(Wl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Wl=new C,ou=new Tt,ze=class n{constructor(e,t,i,s,r,a,o,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],_=s[0],m=s[3],p=s[6],E=s[1],S=s[4],v=s[7],w=s[2],A=s[5],I=s[8];return r[0]=a*_+o*E+c*w,r[3]=a*m+o*S+c*A,r[6]=a*p+o*v+c*I,r[1]=l*_+h*E+u*w,r[4]=l*m+h*S+u*A,r[7]=l*p+h*v+u*I,r[2]=d*_+f*E+g*w,r[5]=d*m+f*S+g*A,r[8]=d*p+f*v+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+i*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(s*l-h*i)*_,e[2]=(o*i-s*a)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Xl.makeScale(e,t)),this}rotate(e){return this.premultiply(Xl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Xl=new ze;function qc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ks(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vd(){let n=ks("canvas");return n.style.display="block",n}var lu={};function zs(n){n in lu||(lu[n]=!0,console.warn(n))}function bd(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var cu=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hu=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ip(){let n={enabled:!0,workingColorSpace:kt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(s.r=hn(s.r),s.g=hn(s.g),s.b=hn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(s.r=Fs(s.r),s.g=Fs(s.g),s.b=Fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xn?Cr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return zs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return zs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[kt]:{primaries:e,whitePoint:i,transfer:Cr,toXYZ:cu,fromXYZ:hu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:cu,fromXYZ:hu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),n}var We=ip();function hn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Fs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ms,to=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ms===void 0&&(Ms=ks("canvas")),Ms.width=e.width,Ms.height=e.height;let s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ms}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ks("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=hn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(hn(t[i]/255)*255):t[i]=hn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},np=0,Vs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Ri(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ql(s[a].image)):r.push(ql(s[a]))}else r=ql(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function ql(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?to.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var sp=0,Yl=new C,Ft=class n extends Hi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=zi,s=zi,r=$t,a=Li,o=fi,c=Di,l=n.DEFAULT_ANISOTROPY,h=xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Ri(),this.name="",this.source=new Vs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Yl).x}get height(){return this.source.getSize(Yl).y}get depth(){return this.source.getSize(Yl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pi:e.x=e.x-Math.floor(e.x);break;case zi:e.x=e.x<0?0:1;break;case Os:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pi:e.y=e.y-Math.floor(e.y);break;case zi:e.y=e.y<0?0:1;break;case Os:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=Nc;Ft.DEFAULT_ANISOTROPY=1;var Je=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,v=(f+1)/2,w=(p+1)/2,A=(h+d)/4,I=(u+_)/4,U=(g+m)/4;return S>v&&S>w?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=A/i,r=I/i):v>w?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=A/s,r=U/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=I/r,s=U/r),this.set(i,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-_)/E,this.z=(d-h)/E,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},io=class extends Hi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);let s={width:e,height:t,depth:i.depth},r=new Ft(s);this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:$t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Vs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},jt=class extends io{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Pr=class extends Ft{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var no=class extends Ft{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zt=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Si):Si.fromBufferAttribute(r,a),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Aa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Aa.copy(i.boundingBox)),Aa.applyMatrix4(e.matrixWorld),this.union(Aa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yr),Ra.subVectors(this.max,yr),Ss.subVectors(e.a,yr),Ts.subVectors(e.b,yr),Es.subVectors(e.c,yr),Mn.subVectors(Ts,Ss),Sn.subVectors(Es,Ts),Wn.subVectors(Ss,Es);let t=[0,-Mn.z,Mn.y,0,-Sn.z,Sn.y,0,-Wn.z,Wn.y,Mn.z,0,-Mn.x,Sn.z,0,-Sn.x,Wn.z,0,-Wn.x,-Mn.y,Mn.x,0,-Sn.y,Sn.x,0,-Wn.y,Wn.x,0];return!Zl(t,Ss,Ts,Es,Ra)||(t=[1,0,0,0,1,0,0,0,1],!Zl(t,Ss,Ts,Es,Ra))?!1:(Ca.crossVectors(Mn,Sn),t=[Ca.x,Ca.y,Ca.z],Zl(t,Ss,Ts,Es,Ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},sn=[new C,new C,new C,new C,new C,new C,new C,new C],Si=new C,Aa=new zt,Ss=new C,Ts=new C,Es=new C,Mn=new C,Sn=new C,Wn=new C,yr=new C,Ra=new C,Ca=new C,Xn=new C;function Zl(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Xn.fromArray(n,r);let o=s.x*Math.abs(Xn.x)+s.y*Math.abs(Xn.y)+s.z*Math.abs(Xn.z),c=e.dot(Xn),l=t.dot(Xn),h=i.dot(Xn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var rp=new zt,vr=new C,Kl=new C,ti=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):rp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);let t=vr.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(vr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(Kl)),this.expandByPoint(vr.copy(e.center).sub(Kl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},rn=new C,$l=new C,Ia=new C,Tn=new C,jl=new C,Pa=new C,Jl=new C,Gi=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(rn.copy(this.origin).addScaledVector(this.direction,t),rn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){$l.copy(e).add(t).multiplyScalar(.5),Ia.copy(t).sub(e).normalize(),Tn.copy(this.origin).sub($l);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ia),o=Tn.dot(this.direction),c=-Tn.dot(Ia),l=Tn.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($l).addScaledVector(Ia,d),f}intersectSphere(e,t){rn.subVectors(e.center,this.origin);let i=rn.dot(this.direction),s=rn.dot(rn)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,rn)!==null}intersectTriangle(e,t,i,s,r){jl.subVectors(t,e),Pa.subVectors(i,e),Jl.crossVectors(jl,Pa);let a=this.direction.dot(Jl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tn.subVectors(this.origin,e);let c=o*this.direction.dot(Pa.crossVectors(Tn,Pa));if(c<0)return null;let l=o*this.direction.dot(jl.cross(Tn));if(l<0||c+l>a)return null;let h=-o*Tn.dot(Jl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Oe=class n{constructor(e,t,i,s,r,a,o,c,l,h,u,d,f,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,h,u,d,f,g,_,m)}set(e,t,i,s,r,a,o,c,l,h,u,d,f,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/ws.setFromMatrixColumn(e,0).length(),r=1/ws.setFromMatrixColumn(e,1).length(),a=1/ws.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ap,e,op)}lookAt(e,t,i){let s=this.elements;return ci.subVectors(e,t),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),En.crossVectors(i,ci),En.lengthSq()===0&&(Math.abs(i.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),En.crossVectors(i,ci)),En.normalize(),La.crossVectors(ci,En),s[0]=En.x,s[4]=La.x,s[8]=ci.x,s[1]=En.y,s[5]=La.y,s[9]=ci.y,s[2]=En.z,s[6]=La.z,s[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],E=i[3],S=i[7],v=i[11],w=i[15],A=s[0],I=s[4],U=s[8],M=s[12],b=s[1],P=s[5],B=s[9],V=s[13],q=s[2],Z=s[6],X=s[10],ie=s[14],H=s[3],ee=s[7],ce=s[11],ye=s[15];return r[0]=a*A+o*b+c*q+l*H,r[4]=a*I+o*P+c*Z+l*ee,r[8]=a*U+o*B+c*X+l*ce,r[12]=a*M+o*V+c*ie+l*ye,r[1]=h*A+u*b+d*q+f*H,r[5]=h*I+u*P+d*Z+f*ee,r[9]=h*U+u*B+d*X+f*ce,r[13]=h*M+u*V+d*ie+f*ye,r[2]=g*A+_*b+m*q+p*H,r[6]=g*I+_*P+m*Z+p*ee,r[10]=g*U+_*B+m*X+p*ce,r[14]=g*M+_*V+m*ie+p*ye,r[3]=E*A+S*b+v*q+w*H,r[7]=E*I+S*P+v*Z+w*ee,r[11]=E*U+S*B+v*X+w*ce,r[15]=E*M+S*V+v*ie+w*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*l*u-r*o*d+i*l*d+s*o*f-i*c*f)+_*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*h-r*c*h)+m*(+t*l*u-t*o*f-r*a*u+i*a*f+r*o*h-i*l*h)+p*(-s*o*h-t*c*u+t*o*d+s*a*u-i*a*d+i*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],E=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,S=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,v=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,w=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,A=t*E+i*S+s*v+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/A;return e[0]=E*I,e[1]=(_*d*r-u*m*r-_*s*f+i*m*f+u*s*p-i*d*p)*I,e[2]=(o*m*r-_*c*r+_*s*l-i*m*l-o*s*p+i*c*p)*I,e[3]=(u*c*r-o*d*r-u*s*l+i*d*l+o*s*f-i*c*f)*I,e[4]=S*I,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*I,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*I,e[7]=(a*d*r-h*c*r+h*s*l-t*d*l-a*s*f+t*c*f)*I,e[8]=v*I,e[9]=(g*u*r-h*_*r-g*i*f+t*_*f+h*i*p-t*u*p)*I,e[10]=(a*_*r-g*o*r+g*i*l-t*_*l-a*i*p+t*o*p)*I,e[11]=(h*o*r-a*u*r-h*i*l+t*u*l+a*i*f-t*o*f)*I,e[12]=w*I,e[13]=(h*_*s-g*u*s+g*i*d-t*_*d-h*i*m+t*u*m)*I,e[14]=(g*o*s-a*_*s-g*i*c+t*_*c+a*i*m-t*o*m)*I,e[15]=(a*u*s-h*o*s+h*i*c-t*u*c-a*i*d+t*o*d)*I,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,E=c*l,S=c*h,v=c*u,w=i.x,A=i.y,I=i.z;return s[0]=(1-(_+p))*w,s[1]=(f+v)*w,s[2]=(g-S)*w,s[3]=0,s[4]=(f-v)*A,s[5]=(1-(d+p))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(g+S)*I,s[9]=(m-E)*I,s[10]=(1-(d+_))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=ws.set(s[0],s[1],s[2]).length(),a=ws.set(s[4],s[5],s[6]).length(),o=ws.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Ti.copy(this);let l=1/r,h=1/a,u=1/o;return Ti.elements[0]*=l,Ti.elements[1]*=l,Ti.elements[2]*=l,Ti.elements[4]*=h,Ti.elements[5]*=h,Ti.elements[6]*=h,Ti.elements[8]*=u,Ti.elements[9]*=u,Ti.elements[10]*=u,t.setFromRotationMatrix(Ti),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Ai,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s),g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===Ai)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ir)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Ai,c=!1){let l=this.elements,h=2/(t-e),u=2/(i-s),d=-(t+e)/(t-e),f=-(i+s)/(i-s),g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===Ai)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ir)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ws=new C,Ti=new Oe,ap=new C(0,0,0),op=new C(1,1,1),En=new C,La=new C,ci=new C,uu=new Oe,du=new Tt,yi=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return uu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return du.setFromEuler(this),this.setFromQuaternion(du,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yi.DEFAULT_ORDER="XYZ";var Hs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},lp=0,fu=new C,As=new Tt,an=new Oe,Da=new C,br=new C,cp=new C,hp=new Tt,pu=new C(1,0,0),mu=new C(0,1,0),gu=new C(0,0,1),_u={type:"added"},up={type:"removed"},Rs={type:"childadded",child:null},Ql={type:"childremoved",child:null},ft=class n extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=Ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new C,t=new yi,i=new Tt,s=new C(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Oe},normalMatrix:{value:new ze}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(pu,e)}rotateY(e){return this.rotateOnAxis(mu,e)}rotateZ(e){return this.rotateOnAxis(gu,e)}translateOnAxis(e,t){return fu.copy(e).applyQuaternion(this.quaternion),this.position.add(fu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pu,e)}translateY(e){return this.translateOnAxis(mu,e)}translateZ(e){return this.translateOnAxis(gu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Da.copy(e):Da.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(br,Da,this.up):an.lookAt(Da,br,this.up),this.quaternion.setFromRotationMatrix(an),s&&(an.extractRotation(s.matrixWorld),As.setFromRotationMatrix(an),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_u),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(up),Ql.child=e,this.dispatchEvent(Ql),Ql.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),an.multiply(e.parent.matrixWorld)),e.applyMatrix4(an),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_u),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,e,cp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,hp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};ft.DEFAULT_UP=new C(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ei=new C,on=new C,ec=new C,ln=new C,Cs=new C,Is=new C,xu=new C,tc=new C,ic=new C,nc=new C,sc=new Je,rc=new Je,ac=new Je,Rn=class n{constructor(e=new C,t=new C,i=new C){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ei.subVectors(e,t),s.cross(Ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ei.subVectors(s,t),on.subVectors(i,t),ec.subVectors(e,t);let a=Ei.dot(Ei),o=Ei.dot(on),c=Ei.dot(ec),l=on.dot(on),h=on.dot(ec),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ln.x),c.addScaledVector(a,ln.y),c.addScaledVector(o,ln.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return sc.setScalar(0),rc.setScalar(0),ac.setScalar(0),sc.fromBufferAttribute(e,t),rc.fromBufferAttribute(e,i),ac.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(sc,r.x),a.addScaledVector(rc,r.y),a.addScaledVector(ac,r.z),a}static isFrontFacing(e,t,i,s){return Ei.subVectors(i,t),on.subVectors(e,t),Ei.cross(on).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ei.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Ei.cross(on).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Cs.subVectors(s,i),Is.subVectors(r,i),tc.subVectors(e,i);let c=Cs.dot(tc),l=Is.dot(tc);if(c<=0&&l<=0)return t.copy(i);ic.subVectors(e,s);let h=Cs.dot(ic),u=Is.dot(ic);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(Cs,a);nc.subVectors(e,r);let f=Cs.dot(nc),g=Is.dot(nc);if(g>=0&&f<=g)return t.copy(r);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(Is,o);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return xu.subVectors(r,s),o=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(xu,o);let p=1/(m+_+d);return a=_*p,o=d*p,t.copy(i).addScaledVector(Cs,a).addScaledVector(Is,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},Na={h:0,s:0,l:0};function oc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var we=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=We.workingColorSpace){return this.r=e,this.g=t,this.b=i,We.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=We.workingColorSpace){if(e=Xc(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=oc(a,r,e+1/3),this.g=oc(a,r,e),this.b=oc(a,r,e-1/3)}return We.colorSpaceToWorking(this,s),this}setStyle(e,t=Mt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){let i=Md[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hn(e.r),this.g=hn(e.g),this.b=hn(e.b),this}copyLinearToSRGB(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return We.workingToColorSpace(Xt.copy(this),e),Math.round(Ge(Xt.r*255,0,255))*65536+Math.round(Ge(Xt.g*255,0,255))*256+Math.round(Ge(Xt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.workingToColorSpace(Xt.copy(this),t);let i=Xt.r,s=Xt.g,r=Xt.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=We.workingColorSpace){return We.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=Mt){We.workingToColorSpace(Xt.copy(this),e);let t=Xt.r,i=Xt.g,s=Xt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(wn),this.setHSL(wn.h+e,wn.s+t,wn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(Na);let i=Rr(wn.h,Na.h,t),s=Rr(wn.s,Na.s,t),r=Rr(wn.l,Na.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Xt=new we;we.NAMES=Md;var dp=0,qt=class extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Ri(),this.name="",this.type="Material",this.blending=Kn,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ja,this.blendDst=Qa,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=$n,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Kn&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ja&&(i.blendSrc=this.blendSrc),this.blendDst!==Qa&&(i.blendDst=this.blendDst),this.blendEquation!==Ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$n&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},di=class extends qt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var wt=new C,Ua=new Ee,fp=0,At=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=eo,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ua.fromBufferAttribute(this,t),Ua.applyMatrix3(e),this.setXY(t,Ua.x,Ua.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==eo&&(e.usage=this.usage),e}};var Lr=class extends At{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Dr=class extends At{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ut=class extends At{constructor(e,t,i){super(new Float32Array(e),t,i)}},pp=0,xi=new Oe,lc=new ft,Ps=new C,hi=new zt,Mr=new zt,Nt=new C,Ot=class n extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=Ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qc(e)?Dr:Lr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xi.makeRotationFromQuaternion(e),this.applyMatrix4(xi),this}rotateX(e){return xi.makeRotationX(e),this.applyMatrix4(xi),this}rotateY(e){return xi.makeRotationY(e),this.applyMatrix4(xi),this}rotateZ(e){return xi.makeRotationZ(e),this.applyMatrix4(xi),this}translate(e,t,i){return xi.makeTranslation(e,t,i),this.applyMatrix4(xi),this}scale(e,t,i){return xi.makeScale(e,t,i),this.applyMatrix4(xi),this}lookAt(e){return lc.lookAt(e),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ut(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];hi.setFromBufferAttribute(r),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let i=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(hi.min,Mr.min),hi.expandByPoint(Nt),Nt.addVectors(hi.max,Mr.max),hi.expandByPoint(Nt)):(hi.expandByPoint(Mr.min),hi.expandByPoint(Mr.max))}hi.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Nt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Nt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Nt.fromBufferAttribute(o,l),c&&(Ps.fromBufferAttribute(e,l),Nt.add(Ps)),s=Math.max(s,i.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let U=0;U<i.count;U++)o[U]=new C,c[U]=new C;let l=new C,h=new C,u=new C,d=new Ee,f=new Ee,g=new Ee,_=new C,m=new C;function p(U,M,b){l.fromBufferAttribute(i,U),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,b),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,b),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[U].add(_),o[M].add(_),o[b].add(_),c[U].add(m),c[M].add(m),c[b].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let U=0,M=E.length;U<M;++U){let b=E[U],P=b.start,B=b.count;for(let V=P,q=P+B;V<q;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let S=new C,v=new C,w=new C,A=new C;function I(U){w.fromBufferAttribute(s,U),A.copy(w);let M=o[U];S.copy(M),S.sub(w.multiplyScalar(w.dot(M))).normalize(),v.crossVectors(A,M);let P=v.dot(c[U])<0?-1:1;a.setXYZW(U,S.x,S.y,S.z,P)}for(let U=0,M=E.length;U<M;++U){let b=E[U],P=b.start,B=b.count;for(let V=P,q=P+B;V<q;V+=3)I(e.getX(V+0)),I(e.getX(V+1)),I(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new At(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let s=new C,r=new C,a=new C,o=new C,c=new C,l=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new At(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,i);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,i);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},yu=new Oe,qn=new Gi,Fa=new ti,vu=new C,Oa=new C,Ba=new C,ka=new C,cc=new C,za=new C,bu=new C,Va=new C,Qe=class extends ft{constructor(e=new Ot,t=new di){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){za.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(cc.fromBufferAttribute(u,e),a?za.addScaledVector(cc,h):za.addScaledVector(cc.sub(t),h))}t.add(za)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fa.copy(i.boundingSphere),Fa.applyMatrix4(r),qn.copy(e.ray).recast(e.near),!(Fa.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Fa,vu)===null||qn.origin.distanceToSquared(vu)>(e.far-e.near)**2))&&(yu.copy(r).invert(),qn.copy(e.ray).applyMatrix4(yu),!(i.boundingBox!==null&&qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,qn)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=E,w=S;v<w;v+=3){let A=o.getX(v),I=o.getX(v+1),U=o.getX(v+2);s=Ha(this,p,e,i,l,h,u,A,I,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let E=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);s=Ha(this,a,e,i,l,h,u,E,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=E,w=S;v<w;v+=3){let A=v,I=v+1,U=v+2;s=Ha(this,p,e,i,l,h,u,A,I,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let E=m,S=m+1,v=m+2;s=Ha(this,a,e,i,l,h,u,E,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function mp(n,e,t,i,s,r,a,o){let c;if(e.side===Vt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===Ci,o),c===null)return null;Va.copy(o),Va.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Va);return l<t.near||l>t.far?null:{distance:l,point:Va.clone(),object:n}}function Ha(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,Oa),n.getVertexPosition(c,Ba),n.getVertexPosition(l,ka);let h=mp(n,e,t,i,Oa,Ba,ka,bu);if(h){let u=new C;Rn.getBarycoord(bu,Oa,Ba,ka,u),s&&(h.uv=Rn.getInterpolatedAttribute(s,o,c,l,u,new Ee)),r&&(h.uv1=Rn.getInterpolatedAttribute(r,o,c,l,u,new Ee)),a&&(h.normal=Rn.getInterpolatedAttribute(a,o,c,l,u,new C),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new C,materialIndex:0};Rn.getNormal(Oa,Ba,ka,d.normal),h.face=d,h.barycoord=u}return h}var Cn=class n extends Ot{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Ut(l,3)),this.setAttribute("normal",new Ut(h,3)),this.setAttribute("uv",new Ut(u,2));function g(_,m,p,E,S,v,w,A,I,U,M){let b=v/I,P=w/U,B=v/2,V=w/2,q=A/2,Z=I+1,X=U+1,ie=0,H=0,ee=new C;for(let ce=0;ce<X;ce++){let ye=ce*P-V;for(let Fe=0;Fe<Z;Fe++){let et=Fe*b-B;ee[_]=et*E,ee[m]=ye*S,ee[p]=q,l.push(ee.x,ee.y,ee.z),ee[_]=0,ee[m]=0,ee[p]=A>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(Fe/I),u.push(1-ce/U),ie+=1}}for(let ce=0;ce<U;ce++)for(let ye=0;ye<I;ye++){let Fe=d+ye+Z*ce,et=d+ye+Z*(ce+1),nt=d+(ye+1)+Z*(ce+1),Ke=d+(ye+1)+Z*ce;c.push(Fe,et,Ke),c.push(et,nt,Ke),H+=6}o.addGroup(f,H,M),f+=H,d+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function hs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Yt(n){let e={};for(let t=0;t<n.length;t++){let i=hs(n[t]);for(let s in i)e[s]=i[s]}return e}function gp(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Yc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}var Fi={clone:hs,merge:Yt},_p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ct=class extends qt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_p,this.fragmentShader=xp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=gp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Nr=class extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=Ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},An=new C,Mu=new Ee,Su=new Ee,St=class extends Nr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Qn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qn*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){An.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(An.x,An.y).multiplyScalar(-e/An.z),An.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(An.x,An.y).multiplyScalar(-e/An.z)}getViewSize(e,t){return this.getViewBounds(e,Mu,Su),t.subVectors(Su,Mu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ar*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ls=-90,Ds=1,so=class extends ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new St(Ls,Ds,e,t);s.layers=this.layers,this.add(s);let r=new St(Ls,Ds,e,t);r.layers=this.layers,this.add(r);let a=new St(Ls,Ds,e,t);a.layers=this.layers,this.add(a);let o=new St(Ls,Ds,e,t);o.layers=this.layers,this.add(o);let c=new St(Ls,Ds,e,t);c.layers=this.layers,this.add(c);let l=new St(Ls,Ds,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ir)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Ur=class extends Ft{constructor(e=[],t=os,i,s,r,a,o,c,l,h){super(e,t,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ro=class extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Ur(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Cn(5,5,5),r=new Ct({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vt,blending:Bt});r.uniforms.tEquirect.value=t;let a=new Qe(s,r),o=t.minFilter;return t.minFilter===Li&&(t.minFilter=$t),new so(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},ui=class extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},yp={type:"move"},Gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ui;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var In=class extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ws=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=eo,this.updateRanges=[],this.version=0,this.uuid=Ri()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Kt=new C,Xs=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new At(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Tu=new C,Eu=new Je,wu=new Je,vp=new C,Au=new Oe,Ga=new C,hc=new ti,Ru=new Oe,uc=new Gi,Fr=class extends Qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_c,this.bindMatrix=new Oe,this.bindMatrixInverse=new Oe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ga),this.boundingBox.expandByPoint(Ga)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ti),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ga),this.boundingSphere.expandByPoint(Ga)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hc.copy(this.boundingSphere),hc.applyMatrix4(s),e.ray.intersectsSphere(hc)!==!1&&(Ru.copy(s).invert(),uc.copy(e.ray).applyMatrix4(Ru),!(this.boundingBox!==null&&uc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,uc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Je,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_c?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ld?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,s=this.geometry;Eu.fromBufferAttribute(s.attributes.skinIndex,e),wu.fromBufferAttribute(s.attributes.skinWeight,e),Tu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=wu.getComponent(r);if(a!==0){let o=Eu.getComponent(r);Au.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(vp.copy(Tu).applyMatrix4(Au),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},qs=class extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}},es=class extends Ft{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Rt,h=Rt,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Cu=new Oe,bp=new Oe,Or=class n{constructor(e=[],t=[]){this.uuid=Ri(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Oe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new Oe;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:bp;Cu.multiplyMatrices(o,t[r]),Cu.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new es(t,e,e,fi,ri);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){let r=e.bones[i],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new qs),this.bones.push(a),this.boneInverses.push(new Oe().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=i[s];e.boneInverses.push(o.toArray())}return e}},Pn=class extends At{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ns=new Oe,Iu=new Oe,Wa=[],Pu=new zt,Mp=new Oe,Sr=new Qe,Tr=new ti,ts=class extends Qe{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pn(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Mp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ns),Pu.copy(e.boundingBox).applyMatrix4(Ns),this.boundingBox.union(Pu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ti),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ns),Tr.copy(e.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(Tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(Sr.geometry=this.geometry,Sr.material=this.material,Sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(i),e.ray.intersectsSphere(Tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ns),Iu.multiplyMatrices(i,Ns),Sr.matrixWorld=Iu,Sr.raycast(e,Wa);for(let a=0,o=Wa.length;a<o;a++){let c=Wa[a];c.instanceId=r,c.object=this,t.push(c)}Wa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new es(new Float32Array(s*this.count),s,this.count,tr,ri));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},dc=new C,Sp=new C,Tp=new ze,ei=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=dc.subVectors(i,t).cross(Sp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(dc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Tp.getNormalMatrix(e),s=this.coplanarPoint(dc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Yn=new ti,Ep=new Ee(.5,.5),Xa=new C,Ys=class{constructor(e=new ei,t=new ei,i=new ei,s=new ei,r=new ei,a=new ei){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ai,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],E=r[12],S=r[13],v=r[14],w=r[15];if(s[0].setComponents(l-a,f-h,p-g,w-E).normalize(),s[1].setComponents(l+a,f+h,p+g,w+E).normalize(),s[2].setComponents(l+o,f+u,p+_,w+S).normalize(),s[3].setComponents(l-o,f-u,p-_,w-S).normalize(),i)s[4].setComponents(c,d,m,v).normalize(),s[5].setComponents(l-c,f-d,p-m,w-v).normalize();else if(s[4].setComponents(l-c,f-d,p-m,w-v).normalize(),t===Ai)s[5].setComponents(l+c,f+d,p+m,w+v).normalize();else if(t===Ir)s[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){Yn.center.set(0,0,0);let t=Ep.distanceTo(e.center);return Yn.radius=.7071067811865476+t,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Xa.x=s.normal.x>0?e.max.x:e.min.x,Xa.y=s.normal.y>0?e.max.y:e.min.y,Xa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ln=class extends qt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ao=new C,oo=new C,Lu=new Oe,Er=new Gi,qa=new ti,fc=new C,Du=new C,un=class extends ft{constructor(e=new Ot,t=new Ln){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ao.fromBufferAttribute(t,s-1),oo.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ao.distanceTo(oo);e.setAttribute("lineDistance",new Ut(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qa.copy(i.boundingSphere),qa.applyMatrix4(s),qa.radius+=r,e.ray.intersectsSphere(qa)===!1)return;Lu.copy(s).invert(),Er.copy(e.ray).applyMatrix4(Lu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){let p=h.getX(_),E=h.getX(_+1),S=Ya(this,e,Er,c,p,E,_);S&&t.push(S)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=Ya(this,e,Er,c,_,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){let p=Ya(this,e,Er,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=Ya(this,e,Er,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ya(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(ao.fromBufferAttribute(o,s),oo.fromBufferAttribute(o,r),t.distanceSqToSegment(ao,oo,fc,Du)>i)return;fc.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(fc);if(!(l<e.near||l>e.far))return{distance:l,point:Du.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Nu=new C,Uu=new C,Zs=class extends un{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Nu.fromBufferAttribute(t,s),Uu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Nu.distanceTo(Uu);e.setAttribute("lineDistance",new Ut(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Br=class extends un{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ks=class extends qt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fu=new Oe,Mc=new Gi,Za=new ti,Ka=new C,kr=class extends ft{constructor(e=new Ot,t=new Ks){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Za.copy(i.boundingSphere),Za.applyMatrix4(s),Za.radius+=r,e.ray.intersectsSphere(Za)===!1)return;Fu.copy(s).invert(),Mc.copy(e.ray).applyMatrix4(Fu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,u=i.attributes.position;if(l!==null){let d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){let m=l.getX(g);Ka.fromBufferAttribute(u,m),Ou(Ka,m,c,s,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Ka.fromBufferAttribute(u,g),Ou(Ka,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ou(n,e,t,i,s,r,a){let o=Mc.distanceSqToPoint(n);if(o<t){let c=new C;Mc.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var is=class extends Ft{constructor(e,t,i=Un,s,r,a,o=Rt,c=Rt,l,h=Bs,u=1){if(h!==Bs&&h!==On)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},zr=class extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var ns=class n extends Ot{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let E=p*d-a;for(let S=0;S<l;S++){let v=S*u-r;g.push(v,-E,0),_.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){let S=E+l*p,v=E+l*(p+1),w=E+1+l*(p+1),A=E+1+l*p;f.push(S,v,A),f.push(v,w,A)}this.setIndex(f),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(_,3)),this.setAttribute("uv",new Ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Vr=class extends Ct{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ii=class extends qt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=la,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ni=class extends ii{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Hr=class extends qt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=la,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Gr=class extends qt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=la,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},lo=class extends qt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},co=class extends qt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Wr=class extends Ln{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function $a(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function wp(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ap(n){function e(s,r){return n[s]-n[r]}let t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function Bu(n,e,t){let i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=n[o+c]}return s}function Sd(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}var dn=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ho=class extends dn{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xc,endingEnd:xc}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case yc:r=e,o=2*t-i;break;case vc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case yc:a=e,c=2*i-t;break;case vc:a=1,c=i+s[1]-s[0];break;default:a=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,E=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,S=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let w=0;w!==o;++w)r[w]=p*a[h+w]+E*a[l+w]+S*a[c+w]+v*a[u+w];return r}},uo=class extends dn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(i-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}},fo=class extends dn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},si=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$a(t,this.TimeBufferType),this.values=$a(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:$a(e.times,Array),values:$a(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ho(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case jn:t=this.InterpolantFactoryMethodDiscrete;break;case Jn:t=this.InterpolantFactoryMethodLinear;break;case ja:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return jn;case this.InterpolantFactoryMethodLinear:return Jn;case this.InterpolantFactoryMethodSmooth:return ja}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&wp(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ja,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};si.prototype.ValueTypeName="";si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=Jn;var fn=class extends si{constructor(e,t,i){super(e,t,i)}};fn.prototype.ValueTypeName="bool";fn.prototype.ValueBufferType=Array;fn.prototype.DefaultInterpolation=jn;fn.prototype.InterpolantFactoryMethodLinear=void 0;fn.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends si{constructor(e,t,i,s){super(e,t,i,s)}};Xr.prototype.ValueTypeName="color";var Wi=class extends si{constructor(e,t,i,s){super(e,t,i,s)}};Wi.prototype.ValueTypeName="number";var po=class extends dn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)Tt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Xi=class extends si{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new po(this.times,this.values,this.getValueSize(),e)}};Xi.prototype.ValueTypeName="quaternion";Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var pn=class extends si{constructor(e,t,i){super(e,t,i)}};pn.prototype.ValueTypeName="string";pn.prototype.ValueBufferType=Array;pn.prototype.DefaultInterpolation=jn;pn.prototype.InterpolantFactoryMethodLinear=void 0;pn.prototype.InterpolantFactoryMethodSmooth=void 0;var qi=class extends si{constructor(e,t,i,s){super(e,t,i,s)}};qi.prototype.ValueTypeName="vector";var qr=class{constructor(e="",t=-1,i=[],s=cd){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Ri(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(Cp(i[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(si.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=Ap(c);c=Bu(c,1,h),l=Bu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Wi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(u,d,f,g,_){if(f.length!==0){let m=[],p=[];Sd(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(let _ in f){let m=[],p=[];for(let E=0;E!==d[g].morphTargets.length;++E){let S=d[g];m.push(S.time),p.push(S.morphTarget===_?1:0)}s.push(new Wi(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{let f=".bones["+t[u].name+"]";i(qi,f+".position",d,"pos",s),i(Xi,f+".quaternion",d,"rot",s),i(qi,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){let e=this.tracks,t=0;for(let i=0,s=e.length;i!==s;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Rp(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wi;case"vector":case"vector2":case"vector3":case"vector4":return qi;case"color":return Xr;case"quaternion":return Xi;case"bool":case"boolean":return fn;case"string":return pn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function Cp(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Rp(n.type);if(n.times===void 0){let t=[],i=[];Sd(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var Vi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},mo=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Td=new mo,Yi=class{constructor(e){this.manager=e!==void 0?e:Td,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Yi.DEFAULT_MATERIAL_NAME="__DEFAULT";var cn={},Sc=class extends Error{constructor(e,t){super(e),this.response=t}},$s=class extends Yi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Vi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(cn[e]!==void 0){cn[e].push({onLoad:t,onProgress:i,onError:s});return}cn[e]=[],cn[e].push({onLoad:t,onProgress:i,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=cn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,_=0,m=new ReadableStream({start(p){E();function E(){u.read().then(({done:S,value:v})=>{if(S)p.close();else{_+=v.byteLength;let w=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let A=0,I=h.length;A<I;A++){let U=h[A];U.onProgress&&U.onProgress(w)}p.enqueue(v),E()}},S=>{p.error(S)})}}});return new Response(m)}else throw new Sc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Vi.add(`file:${e}`,l);let h=cn[e];delete cn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=cn[e];if(h===void 0)throw this.manager.itemError(e),l;delete cn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Us=new WeakMap,go=class extends Yi{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Vi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Us.get(a);u===void 0&&(u=[],Us.set(a,u)),u.push({onLoad:t,onError:s})}return a}let o=ks("img");function c(){h(),t&&t(this);let u=Us.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Us.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),Vi.remove(`image:${e}`);let d=Us.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}Us.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Vi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Yr=class extends Yi{constructor(e){super(e)}load(e,t,i,s){let r=new Ft,a=new go(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},ss=class extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},js=class extends ss{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},pc=new Oe,ku=new C,zu=new C,Zr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=Di,this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ys,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(ku),zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zu),t.updateMatrixWorld(),pc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(pc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Tc=class extends Zr{constructor(){super(new St(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=Qn*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Kr=class extends ss{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Tc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Vu=new Oe,wr=new C,mc=new C,Ec=class extends Zr{constructor(){super(new St(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),wr.setFromMatrixPosition(e.matrixWorld),i.position.copy(wr),mc.copy(i.position),mc.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(mc),i.updateMatrixWorld(),s.makeTranslation(-wr.x,-wr.y,-wr.z),Vu.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vu,i.coordinateSystem,i.reversedDepth)}},rs=class extends ss{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ec}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},mn=class extends Nr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},wc=class extends Zr{constructor(){super(new mn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},vi=class extends ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new wc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var gn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var gc=new WeakMap,$r=class extends Yi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Vi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(gc.has(a)===!0)s&&s(gc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Vi.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),gc.set(c,l),Vi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Vi.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var _o=class extends St{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},jr=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Zc="\\[\\]\\.:\\/",Ip=new RegExp("["+Zc+"]","g"),Kc="[^"+Zc+"]",Pp="[^"+Zc.replace("\\.","")+"]",Lp=/((?:WC+[\/:])*)/.source.replace("WC",Kc),Dp=/(WCOD+)?/.source.replace("WCOD",Pp),Np=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Kc),Up=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Kc),Fp=new RegExp("^"+Lp+Dp+Np+Up+"$"),Op=["material","materials","bones","map"],Ac=class{constructor(e,t,i){let s=i||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ut=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ip,"")}static parseTrackName(e){let t=Fp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Op.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ut.Composite=Ac;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uy=new Float32Array(1);var Hu=new Oe,Jr=class{constructor(e,t,i=0,s=1/0){this.ray=new Gi(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Hs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hu),this}intersectObject(e,t=!0,i=[]){return Rc(e,this,i,t),i.sort(Gu),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Rc(e[s],this,i,t);return i.sort(Gu),i}};function Gu(n,e){return n.distance-e.distance}function Rc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)Rc(r[a],e,t,!0)}}var Js=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Qr=class extends Zs{constructor(e=10,t=10,i=4473924,s=8947848){i=new we(i),s=new we(s);let r=t/2,a=e/t,o=e/2,c=[],l=[];for(let d=0,f=0,g=-o;d<=t;d++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);let _=d===r?i:s;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}let h=new Ot;h.setAttribute("position",new Ut(c,3)),h.setAttribute("color",new Ut(l,3));let u=new Ln({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var ea=class extends Hi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function $c(n,e,t,i){let s=Bp(i);switch(t){case kc:return n*e;case tr:return n*e/s.components*s.byteLength;case Ho:return n*e/s.components*s.byteLength;case Vc:return n*e*2/s.components*s.byteLength;case Go:return n*e*2/s.components*s.byteLength;case zc:return n*e*3/s.components*s.byteLength;case fi:return n*e*4/s.components*s.byteLength;case Wo:return n*e*4/s.components*s.byteLength;case na:case sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ra:case aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qo:case Zo:return Math.max(n,16)*Math.max(e,8)/4;case Xo:case Yo:return Math.max(n,8)*Math.max(e,8)/2;case Ko:case $o:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case jo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case el:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case tl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case nl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case sl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case rl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case al:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ol:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ll:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case cl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case hl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ul:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case dl:case fl:case pl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ml:case gl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case _l:case xl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Bp(n){switch(n){case Di:case Uc:return{byteLength:1,components:1};case er:case Fc:case Ni:return{byteLength:2,components:1};case zo:case Vo:return{byteLength:2,components:4};case Un:case ko:case ri:return{byteLength:4,components:1};case Oc:case Bc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function zp(n){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,c,l){let h=c.array,u=c.updateRanges;if(n.bindBuffer(l,o),u.length===0)n.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Vp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hp=`#ifdef USE_ALPHAHASH
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
#endif`,Gp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yp=`#ifdef USE_AOMAP
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
#endif`,Zp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kp=`#ifdef USE_BATCHING
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
#endif`,$p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,em=`#ifdef USE_IRIDESCENCE
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
#endif`,tm=`#ifdef USE_BUMPMAP
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
#endif`,im=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,nm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,am=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,om=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,hm=`#define PI 3.141592653589793
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
} // validated`,um=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dm=`vec3 transformedNormal = objectNormal;
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
#endif`,fm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_m="gl_FragColor = linearToOutputTexel( gl_FragColor );",xm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ym=`#ifdef USE_ENVMAP
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
#endif`,vm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bm=`#ifdef USE_ENVMAP
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
#endif`,Mm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sm=`#ifdef USE_ENVMAP
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
#endif`,Tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Em=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rm=`#ifdef USE_GRADIENTMAP
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
}`,Cm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Im=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lm=`uniform bool receiveShadow;
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
#endif`,Dm=`#ifdef USE_ENVMAP
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
#endif`,Nm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Om=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bm=`PhysicalMaterial material;
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
#endif`,km=`struct PhysicalMaterial {
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
}`,zm=`
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
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ym=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Km=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$m=`#if defined( USE_POINTS_UV )
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
#endif`,jm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,eg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ig=`#ifdef USE_MORPHTARGETS
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
#endif`,ng=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ag=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,og=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cg=`#ifdef USE_NORMALMAP
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
#endif`,hg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ug=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_g=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Eg=`float getShadowMask() {
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
}`,wg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ag=`#ifdef USE_SKINNING
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
#endif`,Rg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cg=`#ifdef USE_SKINNING
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
#endif`,Ig=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ng=`#ifdef USE_TRANSMISSION
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
#endif`,Ug=`#ifdef USE_TRANSMISSION
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
#endif`,Fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,zg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vg=`uniform sampler2D t2D;
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
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`#include <common>
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
}`,Yg=`#if DEPTH_PACKING == 3200
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
}`,Zg=`#define DISTANCE
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
}`,Kg=`#define DISTANCE
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
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jg=`uniform float scale;
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
}`,Qg=`uniform vec3 diffuse;
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
}`,e0=`#include <common>
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
}`,t0=`uniform vec3 diffuse;
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
}`,i0=`#define LAMBERT
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
}`,n0=`#define LAMBERT
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
}`,s0=`#define MATCAP
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
}`,r0=`#define MATCAP
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
}`,a0=`#define NORMAL
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
}`,o0=`#define NORMAL
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
}`,l0=`#define PHONG
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
}`,c0=`#define PHONG
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
}`,h0=`#define STANDARD
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
}`,u0=`#define STANDARD
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
}`,d0=`#define TOON
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
}`,f0=`#define TOON
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
}`,p0=`uniform float size;
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
}`,m0=`uniform vec3 diffuse;
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
}`,g0=`#include <common>
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
}`,_0=`uniform vec3 color;
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
}`,x0=`uniform float rotation;
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
}`,y0=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Vp,alphahash_pars_fragment:Hp,alphamap_fragment:Gp,alphamap_pars_fragment:Wp,alphatest_fragment:Xp,alphatest_pars_fragment:qp,aomap_fragment:Yp,aomap_pars_fragment:Zp,batching_pars_vertex:Kp,batching_vertex:$p,begin_vertex:jp,beginnormal_vertex:Jp,bsdfs:Qp,iridescence_fragment:em,bumpmap_pars_fragment:tm,clipping_planes_fragment:im,clipping_planes_pars_fragment:nm,clipping_planes_pars_vertex:sm,clipping_planes_vertex:rm,color_fragment:am,color_pars_fragment:om,color_pars_vertex:lm,color_vertex:cm,common:hm,cube_uv_reflection_fragment:um,defaultnormal_vertex:dm,displacementmap_pars_vertex:fm,displacementmap_vertex:pm,emissivemap_fragment:mm,emissivemap_pars_fragment:gm,colorspace_fragment:_m,colorspace_pars_fragment:xm,envmap_fragment:ym,envmap_common_pars_fragment:vm,envmap_pars_fragment:bm,envmap_pars_vertex:Mm,envmap_physical_pars_fragment:Dm,envmap_vertex:Sm,fog_vertex:Tm,fog_pars_vertex:Em,fog_fragment:wm,fog_pars_fragment:Am,gradientmap_pars_fragment:Rm,lightmap_pars_fragment:Cm,lights_lambert_fragment:Im,lights_lambert_pars_fragment:Pm,lights_pars_begin:Lm,lights_toon_fragment:Nm,lights_toon_pars_fragment:Um,lights_phong_fragment:Fm,lights_phong_pars_fragment:Om,lights_physical_fragment:Bm,lights_physical_pars_fragment:km,lights_fragment_begin:zm,lights_fragment_maps:Vm,lights_fragment_end:Hm,logdepthbuf_fragment:Gm,logdepthbuf_pars_fragment:Wm,logdepthbuf_pars_vertex:Xm,logdepthbuf_vertex:qm,map_fragment:Ym,map_pars_fragment:Zm,map_particle_fragment:Km,map_particle_pars_fragment:$m,metalnessmap_fragment:jm,metalnessmap_pars_fragment:Jm,morphinstance_vertex:Qm,morphcolor_vertex:eg,morphnormal_vertex:tg,morphtarget_pars_vertex:ig,morphtarget_vertex:ng,normal_fragment_begin:sg,normal_fragment_maps:rg,normal_pars_fragment:ag,normal_pars_vertex:og,normal_vertex:lg,normalmap_pars_fragment:cg,clearcoat_normal_fragment_begin:hg,clearcoat_normal_fragment_maps:ug,clearcoat_pars_fragment:dg,iridescence_pars_fragment:fg,opaque_fragment:pg,packing:mg,premultiplied_alpha_fragment:gg,project_vertex:_g,dithering_fragment:xg,dithering_pars_fragment:yg,roughnessmap_fragment:vg,roughnessmap_pars_fragment:bg,shadowmap_pars_fragment:Mg,shadowmap_pars_vertex:Sg,shadowmap_vertex:Tg,shadowmask_pars_fragment:Eg,skinbase_vertex:wg,skinning_pars_vertex:Ag,skinning_vertex:Rg,skinnormal_vertex:Cg,specularmap_fragment:Ig,specularmap_pars_fragment:Pg,tonemapping_fragment:Lg,tonemapping_pars_fragment:Dg,transmission_fragment:Ng,transmission_pars_fragment:Ug,uv_pars_fragment:Fg,uv_pars_vertex:Og,uv_vertex:Bg,worldpos_vertex:kg,background_vert:zg,background_frag:Vg,backgroundCube_vert:Hg,backgroundCube_frag:Gg,cube_vert:Wg,cube_frag:Xg,depth_vert:qg,depth_frag:Yg,distanceRGBA_vert:Zg,distanceRGBA_frag:Kg,equirect_vert:$g,equirect_frag:jg,linedashed_vert:Jg,linedashed_frag:Qg,meshbasic_vert:e0,meshbasic_frag:t0,meshlambert_vert:i0,meshlambert_frag:n0,meshmatcap_vert:s0,meshmatcap_frag:r0,meshnormal_vert:a0,meshnormal_frag:o0,meshphong_vert:l0,meshphong_frag:c0,meshphysical_vert:h0,meshphysical_frag:u0,meshtoon_vert:d0,meshtoon_frag:f0,points_vert:p0,points_frag:m0,shadow_vert:g0,shadow_frag:_0,sprite_vert:x0,sprite_frag:y0},le={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Ki={basic:{uniforms:Yt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Yt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new we(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Yt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Yt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Yt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new we(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Yt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Yt([le.points,le.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Yt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Yt([le.common,le.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Yt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Yt([le.sprite,le.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Yt([le.common,le.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Yt([le.lights,le.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Ki.physical={uniforms:Yt([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};var yl={r:0,b:0,g:0},us=new yi,v0=new Oe;function b0(n,e,t,i,s,r,a){let o=new we(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1,w=g(S);w===null?p(o,c):w&&w.isColor&&(p(w,1),v=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,v){let w=g(v);w&&(w.isCubeTexture||w.mapping===ia)?(h===void 0&&(h=new Qe(new Cn(1,1,1),new Ct({name:"BackgroundCubeMaterial",uniforms:hs(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,I,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),us.copy(v.backgroundRotation),us.x*=-1,us.y*=-1,us.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(v0.makeRotationFromEuler(us)),h.material.toneMapped=We.getTransfer(w.colorSpace)!==tt,(u!==w||d!==w.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=n.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new Qe(new ns(2,2),new Ct({name:"BackgroundMaterial",uniforms:hs(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=We.getTransfer(w.colorSpace)!==tt,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,d=w.version,f=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,v){S.getRGB(yl,Yc(n)),i.buffers.color.setClear(yl.r,yl.g,yl.b,v,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(o,c)},render:_,addToRenderList:m,dispose:E}}function M0(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(b,P,B,V,q){let Z=!1,X=u(V,B,P);r!==X&&(r=X,l(r.object)),Z=f(b,V,B,q),Z&&g(b,V,B,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,v(b,P,B,V),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return n.createVertexArray()}function l(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function u(b,P,B){let V=B.wireframe===!0,q=i[b.id];q===void 0&&(q={},i[b.id]=q);let Z=q[P.id];Z===void 0&&(Z={},q[P.id]=Z);let X=Z[V];return X===void 0&&(X=d(c()),Z[V]=X),X}function d(b){let P=[],B=[],V=[];for(let q=0;q<t;q++)P[q]=0,B[q]=0,V[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:V,object:b,attributes:{},index:null}}function f(b,P,B,V){let q=r.attributes,Z=P.attributes,X=0,ie=B.getAttributes();for(let H in ie)if(ie[H].location>=0){let ce=q[H],ye=Z[H];if(ye===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(ye=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(ye=b.instanceColor)),ce===void 0||ce.attribute!==ye||ye&&ce.data!==ye.data)return!0;X++}return r.attributesNum!==X||r.index!==V}function g(b,P,B,V){let q={},Z=P.attributes,X=0,ie=B.getAttributes();for(let H in ie)if(ie[H].location>=0){let ce=Z[H];ce===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(ce=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(ce=b.instanceColor));let ye={};ye.attribute=ce,ce&&ce.data&&(ye.data=ce.data),q[H]=ye,X++}r.attributes=q,r.attributesNum=X,r.index=V}function _(){let b=r.newAttributes;for(let P=0,B=b.length;P<B;P++)b[P]=0}function m(b){p(b,0)}function p(b,P){let B=r.newAttributes,V=r.enabledAttributes,q=r.attributeDivisors;B[b]=1,V[b]===0&&(n.enableVertexAttribArray(b),V[b]=1),q[b]!==P&&(n.vertexAttribDivisor(b,P),q[b]=P)}function E(){let b=r.newAttributes,P=r.enabledAttributes;for(let B=0,V=P.length;B<V;B++)P[B]!==b[B]&&(n.disableVertexAttribArray(B),P[B]=0)}function S(b,P,B,V,q,Z,X){X===!0?n.vertexAttribIPointer(b,P,B,q,Z):n.vertexAttribPointer(b,P,B,V,q,Z)}function v(b,P,B,V){_();let q=V.attributes,Z=B.getAttributes(),X=P.defaultAttributeValues;for(let ie in Z){let H=Z[ie];if(H.location>=0){let ee=q[ie];if(ee===void 0&&(ie==="instanceMatrix"&&b.instanceMatrix&&(ee=b.instanceMatrix),ie==="instanceColor"&&b.instanceColor&&(ee=b.instanceColor)),ee!==void 0){let ce=ee.normalized,ye=ee.itemSize,Fe=e.get(ee);if(Fe===void 0)continue;let et=Fe.buffer,nt=Fe.type,Ke=Fe.bytesPerElement,Y=nt===n.INT||nt===n.UNSIGNED_INT||ee.gpuType===ko;if(ee.isInterleavedBufferAttribute){let $=ee.data,de=$.stride,Ae=ee.offset;if($.isInstancedInterleavedBuffer){for(let pe=0;pe<H.locationSize;pe++)p(H.location+pe,$.meshPerAttribute);b.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let pe=0;pe<H.locationSize;pe++)m(H.location+pe);n.bindBuffer(n.ARRAY_BUFFER,et);for(let pe=0;pe<H.locationSize;pe++)S(H.location+pe,ye/H.locationSize,nt,ce,de*Ke,(Ae+ye/H.locationSize*pe)*Ke,Y)}else{if(ee.isInstancedBufferAttribute){for(let $=0;$<H.locationSize;$++)p(H.location+$,ee.meshPerAttribute);b.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let $=0;$<H.locationSize;$++)m(H.location+$);n.bindBuffer(n.ARRAY_BUFFER,et);for(let $=0;$<H.locationSize;$++)S(H.location+$,ye/H.locationSize,nt,ce,ye*Ke,ye/H.locationSize*$*Ke,Y)}}else if(X!==void 0){let ce=X[ie];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(H.location,ce);break;case 3:n.vertexAttrib3fv(H.location,ce);break;case 4:n.vertexAttrib4fv(H.location,ce);break;default:n.vertexAttrib1fv(H.location,ce)}}}}E()}function w(){U();for(let b in i){let P=i[b];for(let B in P){let V=P[B];for(let q in V)h(V[q].object),delete V[q];delete P[B]}delete i[b]}}function A(b){if(i[b.id]===void 0)return;let P=i[b.id];for(let B in P){let V=P[B];for(let q in V)h(V[q].object),delete V[q];delete P[B]}delete i[b.id]}function I(b){for(let P in i){let B=i[P];if(B[b.id]===void 0)continue;let V=B[b.id];for(let q in V)h(V[q].object),delete V[q];delete B[b.id]}}function U(){M(),a=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:M,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function S0(n,e,t){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function a(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),t.update(h,i,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,i,1)}function c(l,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function T0(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==fi&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let U=I===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Di&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ri&&!U)}function c(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:w,maxSamples:A}}function E0(n){let e=this,t=null,i=0,s=!1,r=!1,a=new ei,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let E=r?0:i,S=E*4,v=p.clippingState||null;c.value=v,v=h(g,d,S,f);for(let w=0;w!==S;++w)v[w]=t[w];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=f;S!==_;++S,v+=4)a.copy(u[S]).applyMatrix4(E,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function w0(n){let e=new WeakMap;function t(a,o){return o===Fo?a.mapping=os:o===Oo&&(a.mapping=ls),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===Fo||o===Oo)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new ro(c.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var sr=4,Ed=[.125,.215,.35,.446,.526,.582],ps=20,jc=new mn,wd=new we,Jc=null,Qc=0,eh=0,th=!1,fs=(1+Math.sqrt(5))/2,nr=1/fs,Ad=[new C(-fs,nr,0),new C(fs,nr,0),new C(-nr,0,fs),new C(nr,0,fs),new C(0,fs,-nr),new C(0,fs,nr),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],A0=new C,ar=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=A0}=r;Jc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),eh=this._renderer.getActiveMipmapLevel(),th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Id(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jc,Qc,eh),this._renderer.xr.enabled=th,e.scissorTest=!1,vl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===os||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),eh=this._renderer.getActiveMipmapLevel(),th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:Ni,format:fi,colorSpace:kt,depthBuffer:!1},s=Rd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rd(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=R0(r)),this._blurMaterial=C0(r,e,t)}return s}_compileMaterial(e){let t=new Qe(this._lodPlanes[0],e);this._renderer.compile(t,jc)}_sceneToCubeUV(e,t,i,s,r){let c=new St(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(wd),u.toneMapping=_n,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let _=new di({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),m=new Qe(new Cn,_),p=!1,E=e.background;E?E.isColor&&(_.color.copy(E),e.background=null,p=!0):(_.color.copy(wd),p=!0);for(let S=0;S<6;S++){let v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));let w=this._cubeSize;vl(s,v*w,S>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(m,c),u.render(e,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=E}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===os||e.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Id()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Qe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;vl(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,jc)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ad[(s-r-1)%Ad.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Qe(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ps-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ps;m>ps&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ps}`);let p=[],E=0;for(let I=0;I<ps;++I){let U=I/_,M=Math.exp(-U*U/2);p.push(M),I===0?E+=M:I<m&&(E+=2*M)}for(let I=0;I<p.length;I++)p[I]=p[I]/E;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-i;let v=this._sizeLods[s],w=3*v*(s>S-sr?s-S+sr:0),A=4*(this._cubeSize-v);vl(t,w,A,3*v,2*v),c.setRenderTarget(t),c.render(u,jc)}};function R0(n){let e=[],t=[],i=[],s=n,r=n-sr+1+Ed.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let c=1/o;a>n-sr?c=Ed[a-n+sr-1]:a===0&&(c=0),i.push(c);let l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*f),S=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let A=0;A<f;A++){let I=A%3*2/3-1,U=A>2?0:-1,M=[I,U,0,I+2/3,U,0,I+2/3,U+1,0,I,U,0,I+2/3,U+1,0,I,U+1,0];E.set(M,_*g*A),S.set(d,m*g*A);let b=[A,A,A,A,A,A];v.set(b,p*g*A)}let w=new Ot;w.setAttribute("position",new At(E,_)),w.setAttribute("uv",new At(S,m)),w.setAttribute("faceIndex",new At(v,p)),e.push(w),s>sr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Rd(n,e,t){let i=new jt(n,e,t);return i.texture.mapping=ia,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vl(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function C0(n,e,t){let i=new Float32Array(ps),s=new C(0,1,0);return new Ct({name:"SphericalGaussianBlur",defines:{n:ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:uh(),fragmentShader:`

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
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Cd(){return new Ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uh(),fragmentShader:`

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
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function Id(){return new Ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bt,depthTest:!1,depthWrite:!1})}function uh(){return`

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
	`}function I0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){let c=o.mapping,l=c===Fo||c===Oo,h=c===os||c===ls;if(l||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new ar(n)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new ar(n)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function P0(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&zs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function L0(n,e,t,i){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],n.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let E=f.array;_=f.version;for(let S=0,v=E.length;S<v;S+=3){let w=E[S+0],A=E[S+1],I=E[S+2];d.push(w,A,A,I,I,w)}}else if(g!==void 0){let E=g.array;_=g.version;for(let S=0,v=E.length/3-1;S<v;S+=3){let w=S+0,A=S+1,I=S+2;d.push(w,A,A,I,I,w)}}else return;let m=new(qc(d)?Dr:Lr)(d,1);m.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function D0(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){n.drawElements(i,f,r,d*a),t.update(f,i,1)}function l(d,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,d*a,g),t.update(f,i,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function u(d,f,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*_[E];t.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function N0(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function U0(n,e,t){let i=new WeakMap,s=new Je;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let M=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],S=0;f===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let v=o.attributes.position.count*S,w=1;v>e.maxTextureSize&&(w=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let A=new Float32Array(v*w*4*u),I=new Pr(A,v,w,u);I.type=ri,I.needsUpdate=!0;let U=S*4;for(let b=0;b<u;b++){let P=m[b],B=p[b],V=E[b],q=v*w*4*b;for(let Z=0;Z<P.count;Z++){let X=Z*U;f===!0&&(s.fromBufferAttribute(P,Z),A[q+X+0]=s.x,A[q+X+1]=s.y,A[q+X+2]=s.z,A[q+X+3]=0),g===!0&&(s.fromBufferAttribute(B,Z),A[q+X+4]=s.x,A[q+X+5]=s.y,A[q+X+6]=s.z,A[q+X+7]=0),_===!0&&(s.fromBufferAttribute(V,Z),A[q+X+8]=s.x,A[q+X+9]=s.y,A[q+X+10]=s.z,A[q+X+11]=V.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new Ee(v,w)},i.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function F0(n,e,t,i){let s=new WeakMap;function r(c){let l=i.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var Kd=new Ft,Pd=new is(1,1),$d=new Pr,jd=new no,Jd=new Ur,Ld=[],Dd=[],Nd=new Float32Array(16),Ud=new Float32Array(9),Fd=new Float32Array(4);function or(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Ld[s];if(r===void 0&&(r=new Float32Array(s),Ld[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function It(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ml(n,e){let t=Dd[e];t===void 0&&(t=new Int32Array(e),Dd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function O0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function B0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function k0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function z0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function V0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,i))return;Fd.set(i),n.uniformMatrix2fv(this.addr,!1,Fd),Pt(t,i)}}function H0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,i))return;Ud.set(i),n.uniformMatrix3fv(this.addr,!1,Ud),Pt(t,i)}}function G0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,i))return;Nd.set(i),n.uniformMatrix4fv(this.addr,!1,Nd),Pt(t,i)}}function W0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function X0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function q0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function Y0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function Z0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function K0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function $0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function j0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function J0(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Pd.compareFunction=Gc,r=Pd):r=Kd,t.setTexture2D(e||r,s)}function Q0(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||jd,s)}function e_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Jd,s)}function t_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||$d,s)}function i_(n){switch(n){case 5126:return O0;case 35664:return B0;case 35665:return k0;case 35666:return z0;case 35674:return V0;case 35675:return H0;case 35676:return G0;case 5124:case 35670:return W0;case 35667:case 35671:return X0;case 35668:case 35672:return q0;case 35669:case 35673:return Y0;case 5125:return Z0;case 36294:return K0;case 36295:return $0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return e_;case 36289:case 36303:case 36311:case 36292:return t_}}function n_(n,e){n.uniform1fv(this.addr,e)}function s_(n,e){let t=or(e,this.size,2);n.uniform2fv(this.addr,t)}function r_(n,e){let t=or(e,this.size,3);n.uniform3fv(this.addr,t)}function a_(n,e){let t=or(e,this.size,4);n.uniform4fv(this.addr,t)}function o_(n,e){let t=or(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function l_(n,e){let t=or(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function c_(n,e){let t=or(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function h_(n,e){n.uniform1iv(this.addr,e)}function u_(n,e){n.uniform2iv(this.addr,e)}function d_(n,e){n.uniform3iv(this.addr,e)}function f_(n,e){n.uniform4iv(this.addr,e)}function p_(n,e){n.uniform1uiv(this.addr,e)}function m_(n,e){n.uniform2uiv(this.addr,e)}function g_(n,e){n.uniform3uiv(this.addr,e)}function __(n,e){n.uniform4uiv(this.addr,e)}function x_(n,e,t){let i=this.cache,s=e.length,r=Ml(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Kd,r[a])}function y_(n,e,t){let i=this.cache,s=e.length,r=Ml(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||jd,r[a])}function v_(n,e,t){let i=this.cache,s=e.length,r=Ml(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Jd,r[a])}function b_(n,e,t){let i=this.cache,s=e.length,r=Ml(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||$d,r[a])}function M_(n){switch(n){case 5126:return n_;case 35664:return s_;case 35665:return r_;case 35666:return a_;case 35674:return o_;case 35675:return l_;case 35676:return c_;case 5124:case 35670:return h_;case 35667:case 35671:return u_;case 35668:case 35672:return d_;case 35669:case 35673:return f_;case 5125:return p_;case 36294:return m_;case 36295:return g_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return y_;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return b_}}var nh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=i_(t.type)}},sh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=M_(t.type)}},rh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},ih=/(\w+)(\])?(\[|\.)?/g;function Od(n,e){n.seq.push(e),n.map[e.id]=e}function S_(n,e,t){let i=n.name,s=i.length;for(ih.lastIndex=0;;){let r=ih.exec(i),a=ih.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Od(t,l===void 0?new nh(o,n,e):new sh(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new rh(o),Od(t,u)),t=u}}}var rr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);S_(r,a,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Bd(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var T_=37297,E_=0;function w_(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var kd=new ze;function A_(n){We._getMatrix(kd,We.workingColorSpace,n);let e=`mat3( ${kd.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(n)){case Cr:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function zd(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+w_(n.getShaderSource(e),o)}else return r}function R_(n,e){let t=A_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function C_(n,e){let t;switch(e){case Io:t="Linear";break;case Po:t="Reinhard";break;case Lo:t="Cineon";break;case as:t="ACESFilmic";break;case No:t="AgX";break;case Uo:t="Neutral";break;case Do:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var bl=new C;function I_(){We.getLuminanceCoefficients(bl);let n=bl.x.toFixed(4),e=bl.y.toFixed(4),t=bl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ca).join(`
`)}function L_(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function D_(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ca(n){return n!==""}function Vd(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var N_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ah(n){return n.replace(N_,F_)}var U_=new Map;function F_(n,e){let t=He[e];if(t===void 0){let i=U_.get(e);if(i!==void 0)t=He[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ah(t)}var O_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gd(n){return n.replace(O_,B_)}function B_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function k_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ic?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===xo?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Zi&&(e="SHADOWMAP_TYPE_VSM"),e}function z_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case os:case ls:e="ENVMAP_TYPE_CUBE";break;case ia:e="ENVMAP_TYPE_CUBE_UV";break}return e}function V_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ls:e="ENVMAP_MODE_REFRACTION";break}return e}function H_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Co:e="ENVMAP_BLENDING_MULTIPLY";break;case ad:e="ENVMAP_BLENDING_MIX";break;case od:e="ENVMAP_BLENDING_ADD";break}return e}function G_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function W_(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=k_(t),l=z_(t),h=V_(t),u=H_(t),d=G_(t),f=P_(t),g=L_(r),_=s.createProgram(),m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ca).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ca).join(`
`),p.length>0&&(p+=`
`)):(m=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ca).join(`
`),p=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_n?"#define TONE_MAPPING":"",t.toneMapping!==_n?He.tonemapping_pars_fragment:"",t.toneMapping!==_n?C_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,R_("linearToOutputTexel",t.outputColorSpace),I_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ca).join(`
`)),a=ah(a),a=Vd(a,t),a=Hd(a,t),o=ah(o),o=Vd(o,t),o=Hd(o,t),a=Gd(a),o=Gd(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=E+m+a,v=E+p+o,w=Bd(s,s.VERTEX_SHADER,S),A=Bd(s,s.FRAGMENT_SHADER,v);s.attachShader(_,w),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function I(P){if(n.debug.checkShaderErrors){let B=s.getProgramInfoLog(_)||"",V=s.getShaderInfoLog(w)||"",q=s.getShaderInfoLog(A)||"",Z=B.trim(),X=V.trim(),ie=q.trim(),H=!0,ee=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,w,A);else{let ce=zd(s,w,"vertex"),ye=zd(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+Z+`
`+ce+`
`+ye)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(X===""||ie==="")&&(ee=!1);ee&&(P.diagnostics={runnable:H,programLog:Z,vertexShader:{log:X,prefix:m},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(w),s.deleteShader(A),U=new rr(s,_),M=D_(s,_)}let U;this.getUniforms=function(){return U===void 0&&I(this),U};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,T_)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=E_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=A,this}var X_=0,oh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new lh(e),t.set(e,i)),i}},lh=class{constructor(e){this.id=X_++,this.code=e,this.usedTimes=0}};function q_(n,e,t,i,s,r,a){let o=new Hs,c=new oh,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,b,P,B,V){let q=B.fog,Z=V.geometry,X=M.isMeshStandardMaterial?B.environment:null,ie=(M.isMeshStandardMaterial?t:e).get(M.envMap||X),H=ie&&ie.mapping===ia?ie.image.height:null,ee=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let ce=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ye=ce!==void 0?ce.length:0,Fe=0;Z.morphAttributes.position!==void 0&&(Fe=1),Z.morphAttributes.normal!==void 0&&(Fe=2),Z.morphAttributes.color!==void 0&&(Fe=3);let et,nt,Ke,Y;if(ee){let it=Ki[ee];et=it.vertexShader,nt=it.fragmentShader}else et=M.vertexShader,nt=M.fragmentShader,c.update(M),Ke=c.getVertexShaderID(M),Y=c.getFragmentShaderID(M);let $=n.getRenderTarget(),de=n.state.buffers.depth.getReversed(),Ae=V.isInstancedMesh===!0,pe=V.isBatchedMesh===!0,Xe=!!M.map,Et=!!M.matcap,R=!!ie,at=!!M.aoMap,Ue=!!M.lightMap,Ce=!!M.bumpMap,ge=!!M.normalMap,ot=!!M.displacementMap,_e=!!M.emissiveMap,Be=!!M.metalnessMap,vt=!!M.roughnessMap,pt=M.anisotropy>0,T=M.clearcoat>0,x=M.dispersion>0,O=M.iridescence>0,W=M.sheen>0,j=M.transmission>0,G=pt&&!!M.anisotropyMap,ve=T&&!!M.clearcoatMap,re=T&&!!M.clearcoatNormalMap,me=T&&!!M.clearcoatRoughnessMap,Se=O&&!!M.iridescenceMap,ne=O&&!!M.iridescenceThicknessMap,he=W&&!!M.sheenColorMap,Pe=W&&!!M.sheenRoughnessMap,Te=!!M.specularMap,oe=!!M.specularColorMap,De=!!M.specularIntensityMap,D=j&&!!M.transmissionMap,Q=j&&!!M.thicknessMap,ae=!!M.gradientMap,xe=!!M.alphaMap,te=M.alphaTest>0,K=!!M.alphaHash,Me=!!M.extensions,ke=_n;M.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(ke=n.toneMapping);let dt={shaderID:ee,shaderType:M.type,shaderName:M.name,vertexShader:et,fragmentShader:nt,defines:M.defines,customVertexShaderID:Ke,customFragmentShaderID:Y,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:pe,batchingColor:pe&&V._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&V.instanceColor!==null,instancingMorph:Ae&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:kt,alphaToCoverage:!!M.alphaToCoverage,map:Xe,matcap:Et,envMap:R,envMapMode:R&&ie.mapping,envMapCubeUVHeight:H,aoMap:at,lightMap:Ue,bumpMap:Ce,normalMap:ge,displacementMap:d&&ot,emissiveMap:_e,normalMapObjectSpace:ge&&M.normalMapType===dd,normalMapTangentSpace:ge&&M.normalMapType===la,metalnessMap:Be,roughnessMap:vt,anisotropy:pt,anisotropyMap:G,clearcoat:T,clearcoatMap:ve,clearcoatNormalMap:re,clearcoatRoughnessMap:me,dispersion:x,iridescence:O,iridescenceMap:Se,iridescenceThicknessMap:ne,sheen:W,sheenColorMap:he,sheenRoughnessMap:Pe,specularMap:Te,specularColorMap:oe,specularIntensityMap:De,transmission:j,transmissionMap:D,thicknessMap:Q,gradientMap:ae,opaque:M.transparent===!1&&M.blending===Kn&&M.alphaToCoverage===!1,alphaMap:xe,alphaTest:te,alphaHash:K,combine:M.combine,mapUv:Xe&&_(M.map.channel),aoMapUv:at&&_(M.aoMap.channel),lightMapUv:Ue&&_(M.lightMap.channel),bumpMapUv:Ce&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:ot&&_(M.displacementMap.channel),emissiveMapUv:_e&&_(M.emissiveMap.channel),metalnessMapUv:Be&&_(M.metalnessMap.channel),roughnessMapUv:vt&&_(M.roughnessMap.channel),anisotropyMapUv:G&&_(M.anisotropyMap.channel),clearcoatMapUv:ve&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(M.sheenRoughnessMap.channel),specularMapUv:Te&&_(M.specularMap.channel),specularColorMapUv:oe&&_(M.specularColorMap.channel),specularIntensityMapUv:De&&_(M.specularIntensityMap.channel),transmissionMapUv:D&&_(M.transmissionMap.channel),thicknessMapUv:Q&&_(M.thicknessMap.channel),alphaMapUv:xe&&_(M.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(ge||pt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Z.attributes.uv&&(Xe||xe),fog:!!q,useFog:M.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:V.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Fe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:Xe&&M.map.isVideoTexture===!0&&We.getTransfer(M.map.colorSpace)===tt,decodeVideoTextureEmissive:_e&&M.emissiveMap.isVideoTexture===!0&&We.getTransfer(M.emissiveMap.colorSpace)===tt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===bi,flipSided:M.side===Vt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Me&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&M.extensions.multiDraw===!0||pe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return dt.vertexUv1s=l.has(1),dt.vertexUv2s=l.has(2),dt.vertexUv3s=l.has(3),l.clear(),dt}function p(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let P in M.defines)b.push(P),b.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(E(b,M),S(b,M),b.push(n.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function E(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function S(M,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),M.push(o.mask)}function v(M){let b=g[M.type],P;if(b){let B=Ki[b];P=Fi.clone(B.uniforms)}else P=M.uniforms;return P}function w(M,b){let P;for(let B=0,V=h.length;B<V;B++){let q=h[B];if(q.cacheKey===b){P=q,++P.usedTimes;break}}return P===void 0&&(P=new W_(n,b,M,r),h.push(P)),P}function A(M){if(--M.usedTimes===0){let b=h.indexOf(M);h[b]=h[h.length-1],h.pop(),M.destroy()}}function I(M){c.remove(M)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:w,releaseProgram:A,releaseShaderCache:I,programs:h,dispose:U}}function Y_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Z_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Xd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function qd(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u,d,f,g,_,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Z_),i.length>1&&i.sort(d||Xd),s.length>1&&s.sort(d||Xd)}function h(){for(let u=e,d=n.length;u<d;u++){let f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function K_(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new qd,n.set(i,[a])):s>=r.length?(a=new qd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function $_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new we};break;case"SpotLight":t={position:new C,direction:new C,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new C,halfWidth:new C,halfHeight:new C};break}return n[e.id]=t,t}}}function j_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var J_=0;function Q_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ex(n){let e=new $_,t=j_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new C);let s=new C,r=new Oe,a=new Oe;function o(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,E=0,S=0,v=0,w=0,A=0,I=0;l.sort(Q_);for(let M=0,b=l.length;M<b;M++){let P=l[M],B=P.color,V=P.intensity,q=P.distance,Z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=B.r*V,u+=B.g*V,d+=B.b*V;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],V);I++}else if(P.isDirectionalLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let ie=P.shadow,H=t.get(P);H.shadowIntensity=ie.intensity,H.shadowBias=ie.bias,H.shadowNormalBias=ie.normalBias,H.shadowRadius=ie.radius,H.shadowMapSize=ie.mapSize,i.directionalShadow[f]=H,i.directionalShadowMap[f]=Z,i.directionalShadowMatrix[f]=P.shadow.matrix,E++}i.directional[f]=X,f++}else if(P.isSpotLight){let X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(B).multiplyScalar(V),X.distance=q,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[_]=X;let ie=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,ie.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[_]=ie.matrix,P.castShadow){let H=t.get(P);H.shadowIntensity=ie.intensity,H.shadowBias=ie.bias,H.shadowNormalBias=ie.normalBias,H.shadowRadius=ie.radius,H.shadowMapSize=ie.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=Z,v++}_++}else if(P.isRectAreaLight){let X=e.get(P);X.color.copy(B).multiplyScalar(V),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=X,m++}else if(P.isPointLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let ie=P.shadow,H=t.get(P);H.shadowIntensity=ie.intensity,H.shadowBias=ie.bias,H.shadowNormalBias=ie.normalBias,H.shadowRadius=ie.radius,H.shadowMapSize=ie.mapSize,H.shadowCameraNear=ie.camera.near,H.shadowCameraFar=ie.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=Z,i.pointShadowMatrix[g]=P.shadow.matrix,S++}i.point[g]=X,g++}else if(P.isHemisphereLight){let X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(V),X.groundColor.copy(P.groundColor).multiplyScalar(V),i.hemi[p]=X,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let U=i.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==E||U.numPointShadows!==S||U.numSpotShadows!==v||U.numSpotMaps!==w||U.numLightProbes!==I)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=v+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=I,U.directionalLength=f,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=E,U.numPointShadows=S,U.numSpotShadows=v,U.numSpotMaps=w,U.numLightProbes=I,i.version=J_++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){let S=l[p];if(S.isDirectionalLight){let v=i.directional[u];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(S.isSpotLight){let v=i.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(S.isRectAreaLight){let v=i.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){let v=i.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){let v=i.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:i}}function Yd(n){let e=new ex(n),t=[],i=[];function s(h){l.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function tx(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Yd(n),e.set(s,[o])):r>=a.length?(o=new Yd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var ix=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nx=`uniform sampler2D shadow_pass;
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
}`;function sx(n,e,t){let i=new Ys,s=new Ee,r=new Ee,a=new Je,o=new lo({depthPacking:ud}),c=new co,l={},h=t.maxTextureSize,u={[Ci]:Vt,[Vt]:Ci,[bi]:bi},d=new Ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:ix,fragmentShader:nx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ot;g.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Qe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ic;let p=this.type;this.render=function(A,I,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let M=n.getRenderTarget(),b=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Bt),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let V=p!==Zi&&this.type===Zi,q=p===Zi&&this.type!==Zi;for(let Z=0,X=A.length;Z<X;Z++){let ie=A[Z],H=ie.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ee=H.getFrameExtents();if(s.multiply(ee),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ee.x),s.x=r.x*ee.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ee.y),s.y=r.y*ee.y,H.mapSize.y=r.y)),H.map===null||V===!0||q===!0){let ye=this.type!==Zi?{minFilter:Rt,magFilter:Rt}:{};H.map!==null&&H.map.dispose(),H.map=new jt(s.x,s.y,ye),H.map.texture.name=ie.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();let ce=H.getViewportCount();for(let ye=0;ye<ce;ye++){let Fe=H.getViewport(ye);a.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),B.viewport(a),H.updateMatrices(ie,ye),i=H.getFrustum(),v(I,U,H.camera,ie,this.type)}H.isPointLightShadow!==!0&&this.type===Zi&&E(H,U),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,b,P)};function E(A,I){let U=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new jt(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(I,null,U,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(I,null,U,f,_,null)}function S(A,I,U,M){let b=null,P=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)b=P;else if(b=U.isPointLight===!0?c:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=b.uuid,V=I.uuid,q=l[B];q===void 0&&(q={},l[B]=q);let Z=q[V];Z===void 0&&(Z=b.clone(),q[V]=Z,I.addEventListener("dispose",w)),b=Z}if(b.visible=I.visible,b.wireframe=I.wireframe,M===Zi?b.side=I.shadowSide!==null?I.shadowSide:I.side:b.side=I.shadowSide!==null?I.shadowSide:u[I.side],b.alphaMap=I.alphaMap,b.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,b.map=I.map,b.clipShadows=I.clipShadows,b.clippingPlanes=I.clippingPlanes,b.clipIntersection=I.clipIntersection,b.displacementMap=I.displacementMap,b.displacementScale=I.displacementScale,b.displacementBias=I.displacementBias,b.wireframeLinewidth=I.wireframeLinewidth,b.linewidth=I.linewidth,U.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let B=n.properties.get(b);B.light=U}return b}function v(A,I,U,M,b){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Zi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);let V=e.update(A),q=A.material;if(Array.isArray(q)){let Z=V.groups;for(let X=0,ie=Z.length;X<ie;X++){let H=Z[X],ee=q[H.materialIndex];if(ee&&ee.visible){let ce=S(A,ee,M,b);A.onBeforeShadow(n,A,I,U,V,ce,H),n.renderBufferDirect(U,null,V,ce,A,H),A.onAfterShadow(n,A,I,U,V,ce,H)}}}else if(q.visible){let Z=S(A,q,M,b);A.onBeforeShadow(n,A,I,U,V,Z,null),n.renderBufferDirect(U,null,V,Z,A,null),A.onAfterShadow(n,A,I,U,V,Z,null)}}let B=A.children;for(let V=0,q=B.length;V<q;V++)v(B[V],I,U,M,b)}function w(A){A.target.removeEventListener("dispose",w);for(let U in l){let M=l[U],b=A.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}var rx={[Mo]:So,[To]:Ao,[Eo]:Ro,[$n]:wo,[So]:Mo,[Ao]:To,[Ro]:Eo,[wo]:$n};function ax(n,e){function t(){let D=!1,Q=new Je,ae=null,xe=new Je(0,0,0,0);return{setMask:function(te){ae!==te&&!D&&(n.colorMask(te,te,te,te),ae=te)},setLocked:function(te){D=te},setClear:function(te,K,Me,ke,dt){dt===!0&&(te*=ke,K*=ke,Me*=ke),Q.set(te,K,Me,ke),xe.equals(Q)===!1&&(n.clearColor(te,K,Me,ke),xe.copy(Q))},reset:function(){D=!1,ae=null,xe.set(-1,0,0,0)}}}function i(){let D=!1,Q=!1,ae=null,xe=null,te=null;return{setReversed:function(K){if(Q!==K){let Me=e.get("EXT_clip_control");K?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),Q=K;let ke=te;te=null,this.setClear(ke)}},getReversed:function(){return Q},setTest:function(K){K?$(n.DEPTH_TEST):de(n.DEPTH_TEST)},setMask:function(K){ae!==K&&!D&&(n.depthMask(K),ae=K)},setFunc:function(K){if(Q&&(K=rx[K]),xe!==K){switch(K){case Mo:n.depthFunc(n.NEVER);break;case So:n.depthFunc(n.ALWAYS);break;case To:n.depthFunc(n.LESS);break;case $n:n.depthFunc(n.LEQUAL);break;case Eo:n.depthFunc(n.EQUAL);break;case wo:n.depthFunc(n.GEQUAL);break;case Ao:n.depthFunc(n.GREATER);break;case Ro:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=K}},setLocked:function(K){D=K},setClear:function(K){te!==K&&(Q&&(K=1-K),n.clearDepth(K),te=K)},reset:function(){D=!1,ae=null,xe=null,te=null,Q=!1}}}function s(){let D=!1,Q=null,ae=null,xe=null,te=null,K=null,Me=null,ke=null,dt=null;return{setTest:function(it){D||(it?$(n.STENCIL_TEST):de(n.STENCIL_TEST))},setMask:function(it){Q!==it&&!D&&(n.stencilMask(it),Q=it)},setFunc:function(it,nn,ki){(ae!==it||xe!==nn||te!==ki)&&(n.stencilFunc(it,nn,ki),ae=it,xe=nn,te=ki)},setOp:function(it,nn,ki){(K!==it||Me!==nn||ke!==ki)&&(n.stencilOp(it,nn,ki),K=it,Me=nn,ke=ki)},setLocked:function(it){D=it},setClear:function(it){dt!==it&&(n.clearStencil(it),dt=it)},reset:function(){D=!1,Q=null,ae=null,xe=null,te=null,K=null,Me=null,ke=null,dt=null}}}let r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,S=null,v=null,w=null,A=null,I=new we(0,0,0),U=0,M=!1,b=null,P=null,B=null,V=null,q=null,Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,ie=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=ie>=1):H.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=ie>=2);let ee=null,ce={},ye=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),et=new Je().fromArray(ye),nt=new Je().fromArray(Fe);function Ke(D,Q,ae,xe){let te=new Uint8Array(4),K=n.createTexture();n.bindTexture(D,K),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Me=0;Me<ae;Me++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(Q,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,te):n.texImage2D(Q+Me,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,te);return K}let Y={};Y[n.TEXTURE_2D]=Ke(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=Ke(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=Ke(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=Ke(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(n.DEPTH_TEST),a.setFunc($n),Ce(!1),ge(Cc),$(n.CULL_FACE),at(Bt);function $(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function de(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Ae(D,Q){return u[D]!==Q?(n.bindFramebuffer(D,Q),u[D]=Q,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Q),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Q),!0):!1}function pe(D,Q){let ae=f,xe=!1;if(D){ae=d.get(Q),ae===void 0&&(ae=[],d.set(Q,ae));let te=D.textures;if(ae.length!==te.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let K=0,Me=te.length;K<Me;K++)ae[K]=n.COLOR_ATTACHMENT0+K;ae.length=te.length,xe=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,xe=!0);xe&&n.drawBuffers(ae)}function Xe(D){return g!==D?(n.useProgram(D),g=D,!0):!1}let Et={[Ii]:n.FUNC_ADD,[qu]:n.FUNC_SUBTRACT,[Yu]:n.FUNC_REVERSE_SUBTRACT};Et[Zu]=n.MIN,Et[Ku]=n.MAX;let R={[ta]:n.ZERO,[$u]:n.ONE,[ju]:n.SRC_COLOR,[Ja]:n.SRC_ALPHA,[td]:n.SRC_ALPHA_SATURATE,[bo]:n.DST_COLOR,[vo]:n.DST_ALPHA,[Ju]:n.ONE_MINUS_SRC_COLOR,[Qa]:n.ONE_MINUS_SRC_ALPHA,[ed]:n.ONE_MINUS_DST_COLOR,[Qu]:n.ONE_MINUS_DST_ALPHA,[id]:n.CONSTANT_COLOR,[nd]:n.ONE_MINUS_CONSTANT_COLOR,[sd]:n.CONSTANT_ALPHA,[rd]:n.ONE_MINUS_CONSTANT_ALPHA};function at(D,Q,ae,xe,te,K,Me,ke,dt,it){if(D===Bt){_===!0&&(de(n.BLEND),_=!1);return}if(_===!1&&($(n.BLEND),_=!0),D!==yo){if(D!==m||it!==M){if((p!==Ii||v!==Ii)&&(n.blendEquation(n.FUNC_ADD),p=Ii,v=Ii),it)switch(D){case Kn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pc:n.blendFunc(n.ONE,n.ONE);break;case Lc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Kn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Lc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,S=null,w=null,A=null,I.set(0,0,0),U=0,m=D,M=it}return}te=te||Q,K=K||ae,Me=Me||xe,(Q!==p||te!==v)&&(n.blendEquationSeparate(Et[Q],Et[te]),p=Q,v=te),(ae!==E||xe!==S||K!==w||Me!==A)&&(n.blendFuncSeparate(R[ae],R[xe],R[K],R[Me]),E=ae,S=xe,w=K,A=Me),(ke.equals(I)===!1||dt!==U)&&(n.blendColor(ke.r,ke.g,ke.b,dt),I.copy(ke),U=dt),m=D,M=!1}function Ue(D,Q){D.side===bi?de(n.CULL_FACE):$(n.CULL_FACE);let ae=D.side===Vt;Q&&(ae=!ae),Ce(ae),D.blending===Kn&&D.transparent===!1?at(Bt):at(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let xe=D.stencilWrite;o.setTest(xe),xe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_e(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?$(n.SAMPLE_ALPHA_TO_COVERAGE):de(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(D){b!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),b=D)}function ge(D){D!==Wu?($(n.CULL_FACE),D!==P&&(D===Cc?n.cullFace(n.BACK):D===Xu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):de(n.CULL_FACE),P=D}function ot(D){D!==B&&(X&&n.lineWidth(D),B=D)}function _e(D,Q,ae){D?($(n.POLYGON_OFFSET_FILL),(V!==Q||q!==ae)&&(n.polygonOffset(Q,ae),V=Q,q=ae)):de(n.POLYGON_OFFSET_FILL)}function Be(D){D?$(n.SCISSOR_TEST):de(n.SCISSOR_TEST)}function vt(D){D===void 0&&(D=n.TEXTURE0+Z-1),ee!==D&&(n.activeTexture(D),ee=D)}function pt(D,Q,ae){ae===void 0&&(ee===null?ae=n.TEXTURE0+Z-1:ae=ee);let xe=ce[ae];xe===void 0&&(xe={type:void 0,texture:void 0},ce[ae]=xe),(xe.type!==D||xe.texture!==Q)&&(ee!==ae&&(n.activeTexture(ae),ee=ae),n.bindTexture(D,Q||Y[D]),xe.type=D,xe.texture=Q)}function T(){let D=ce[ee];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function re(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(D){et.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),et.copy(D))}function Pe(D){nt.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),nt.copy(D))}function Te(D,Q){let ae=l.get(Q);ae===void 0&&(ae=new WeakMap,l.set(Q,ae));let xe=ae.get(D);xe===void 0&&(xe=n.getUniformBlockIndex(Q,D.name),ae.set(D,xe))}function oe(D,Q){let xe=l.get(Q).get(D);c.get(Q)!==xe&&(n.uniformBlockBinding(Q,xe,D.__bindingPointIndex),c.set(Q,xe))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ee=null,ce={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,S=null,v=null,w=null,A=null,I=new we(0,0,0),U=0,M=!1,b=null,P=null,B=null,V=null,q=null,et.set(0,0,n.canvas.width,n.canvas.height),nt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:de,bindFramebuffer:Ae,drawBuffers:pe,useProgram:Xe,setBlending:at,setMaterial:Ue,setFlipSided:Ce,setCullFace:ge,setLineWidth:ot,setPolygonOffset:_e,setScissorTest:Be,activeTexture:vt,bindTexture:pt,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:Se,texImage3D:ne,updateUBOMapping:Te,uniformBlockBinding:oe,texStorage2D:re,texStorage3D:me,texSubImage2D:W,texSubImage3D:j,compressedTexSubImage2D:G,compressedTexSubImage3D:ve,scissor:he,viewport:Pe,reset:De}}function ox(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ee,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return f?new OffscreenCanvas(T,x):ks("canvas")}function _(T,x,O){let W=1,j=pt(T);if((j.width>O||j.height>O)&&(W=O/Math.max(j.width,j.height)),W<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let G=Math.floor(W*j.width),ve=Math.floor(W*j.height);u===void 0&&(u=g(G,ve));let re=x?g(G,ve):u;return re.width=G,re.height=ve,re.getContext("2d").drawImage(T,0,0,G,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+G+"x"+ve+")."),re}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(T,x,O,W,j=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let G=x;if(x===n.RED&&(O===n.FLOAT&&(G=n.R32F),O===n.HALF_FLOAT&&(G=n.R16F),O===n.UNSIGNED_BYTE&&(G=n.R8)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.R8UI),O===n.UNSIGNED_SHORT&&(G=n.R16UI),O===n.UNSIGNED_INT&&(G=n.R32UI),O===n.BYTE&&(G=n.R8I),O===n.SHORT&&(G=n.R16I),O===n.INT&&(G=n.R32I)),x===n.RG&&(O===n.FLOAT&&(G=n.RG32F),O===n.HALF_FLOAT&&(G=n.RG16F),O===n.UNSIGNED_BYTE&&(G=n.RG8)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.RG8UI),O===n.UNSIGNED_SHORT&&(G=n.RG16UI),O===n.UNSIGNED_INT&&(G=n.RG32UI),O===n.BYTE&&(G=n.RG8I),O===n.SHORT&&(G=n.RG16I),O===n.INT&&(G=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.RGB8UI),O===n.UNSIGNED_SHORT&&(G=n.RGB16UI),O===n.UNSIGNED_INT&&(G=n.RGB32UI),O===n.BYTE&&(G=n.RGB8I),O===n.SHORT&&(G=n.RGB16I),O===n.INT&&(G=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),O===n.UNSIGNED_INT&&(G=n.RGBA32UI),O===n.BYTE&&(G=n.RGBA8I),O===n.SHORT&&(G=n.RGBA16I),O===n.INT&&(G=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(G=n.R11F_G11F_B10F)),x===n.RGBA){let ve=j?Cr:We.getTransfer(W);O===n.FLOAT&&(G=n.RGBA32F),O===n.HALF_FLOAT&&(G=n.RGBA16F),O===n.UNSIGNED_BYTE&&(G=ve===tt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function v(T,x){let O;return T?x===null||x===Un||x===Fn?O=n.DEPTH24_STENCIL8:x===ri?O=n.DEPTH32F_STENCIL8:x===er&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Un||x===Fn?O=n.DEPTH_COMPONENT24:x===ri?O=n.DEPTH_COMPONENT32F:x===er&&(O=n.DEPTH_COMPONENT16),O}function w(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Rt&&T.minFilter!==$t?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function A(T){let x=T.target;x.removeEventListener("dispose",A),U(x),x.isVideoTexture&&h.delete(x)}function I(T){let x=T.target;x.removeEventListener("dispose",I),b(x)}function U(T){let x=i.get(T);if(x.__webglInit===void 0)return;let O=T.source,W=d.get(O);if(W){let j=W[x.__cacheKey];j.usedTimes--,j.usedTimes===0&&M(T),Object.keys(W).length===0&&d.delete(O)}i.remove(T)}function M(T){let x=i.get(T);n.deleteTexture(x.__webglTexture);let O=T.source,W=d.get(O);delete W[x.__cacheKey],a.memory.textures--}function b(T){let x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let j=0;j<x.__webglFramebuffer[W].length;j++)n.deleteFramebuffer(x.__webglFramebuffer[W][j]);else n.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)n.deleteFramebuffer(x.__webglFramebuffer[W]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=T.textures;for(let W=0,j=O.length;W<j;W++){let G=i.get(O[W]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),a.memory.textures--),i.remove(O[W])}i.remove(T)}let P=0;function B(){P=0}function V(){let T=P;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function q(T){let x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function Z(T,x){let O=i.get(T);if(T.isVideoTexture&&Be(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){let W=T.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,T,x);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function X(T,x){let O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Y(O,T,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function ie(T,x){let O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Y(O,T,x);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function H(T,x){let O=i.get(T);if(T.version>0&&O.__version!==T.version){$(O,T,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}let ee={[Pi]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[Os]:n.MIRRORED_REPEAT},ce={[Rt]:n.NEAREST,[Bo]:n.NEAREST_MIPMAP_NEAREST,[cs]:n.NEAREST_MIPMAP_LINEAR,[$t]:n.LINEAR,[Qs]:n.LINEAR_MIPMAP_NEAREST,[Li]:n.LINEAR_MIPMAP_LINEAR},ye={[fd]:n.NEVER,[yd]:n.ALWAYS,[pd]:n.LESS,[Gc]:n.LEQUAL,[md]:n.EQUAL,[xd]:n.GEQUAL,[gd]:n.GREATER,[_d]:n.NOTEQUAL};function Fe(T,x){if(x.type===ri&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===$t||x.magFilter===Qs||x.magFilter===cs||x.magFilter===Li||x.minFilter===$t||x.minFilter===Qs||x.minFilter===cs||x.minFilter===Li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ee[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ee[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ee[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ce[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ce[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ye[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Rt||x.minFilter!==cs&&x.minFilter!==Li||x.type===ri&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function et(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",A));let W=x.source,j=d.get(W);j===void 0&&(j={},d.set(W,j));let G=q(x);if(G!==T.__cacheKey){j[G]===void 0&&(j[G]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),j[G].usedTimes++;let ve=j[T.__cacheKey];ve!==void 0&&(j[T.__cacheKey].usedTimes--,ve.usedTimes===0&&M(x)),T.__cacheKey=G,T.__webglTexture=j[G].texture}return O}function nt(T,x,O){return Math.floor(Math.floor(T/O)/x)}function Ke(T,x,O,W){let G=T.updateRanges;if(G.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,W,x.data);else{G.sort((ne,he)=>ne.start-he.start);let ve=0;for(let ne=1;ne<G.length;ne++){let he=G[ve],Pe=G[ne],Te=he.start+he.count,oe=nt(Pe.start,x.width,4),De=nt(he.start,x.width,4);Pe.start<=Te+1&&oe===De&&nt(Pe.start+Pe.count-1,x.width,4)===oe?he.count=Math.max(he.count,Pe.start+Pe.count-he.start):(++ve,G[ve]=Pe)}G.length=ve+1;let re=n.getParameter(n.UNPACK_ROW_LENGTH),me=n.getParameter(n.UNPACK_SKIP_PIXELS),Se=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ne=0,he=G.length;ne<he;ne++){let Pe=G[ne],Te=Math.floor(Pe.start/4),oe=Math.ceil(Pe.count/4),De=Te%x.width,D=Math.floor(Te/x.width),Q=oe,ae=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,De),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,De,D,Q,ae,O,W,x.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,me),n.pixelStorei(n.UNPACK_SKIP_ROWS,Se)}}function Y(T,x,O){let W=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=n.TEXTURE_3D);let j=et(T,x),G=x.source;t.bindTexture(W,T.__webglTexture,n.TEXTURE0+O);let ve=i.get(G);if(G.version!==ve.__version||j===!0){t.activeTexture(n.TEXTURE0+O);let re=We.getPrimaries(We.workingColorSpace),me=x.colorSpace===xn?null:We.getPrimaries(x.colorSpace),Se=x.colorSpace===xn||re===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let ne=_(x.image,!1,s.maxTextureSize);ne=vt(x,ne);let he=r.convert(x.format,x.colorSpace),Pe=r.convert(x.type),Te=S(x.internalFormat,he,Pe,x.colorSpace,x.isVideoTexture);Fe(W,x);let oe,De=x.mipmaps,D=x.isVideoTexture!==!0,Q=ve.__version===void 0||j===!0,ae=G.dataReady,xe=w(x,ne);if(x.isDepthTexture)Te=v(x.format===On,x.type),Q&&(D?t.texStorage2D(n.TEXTURE_2D,1,Te,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Te,ne.width,ne.height,0,he,Pe,null));else if(x.isDataTexture)if(De.length>0){D&&Q&&t.texStorage2D(n.TEXTURE_2D,xe,Te,De[0].width,De[0].height);for(let te=0,K=De.length;te<K;te++)oe=De[te],D?ae&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,oe.width,oe.height,he,Pe,oe.data):t.texImage2D(n.TEXTURE_2D,te,Te,oe.width,oe.height,0,he,Pe,oe.data);x.generateMipmaps=!1}else D?(Q&&t.texStorage2D(n.TEXTURE_2D,xe,Te,ne.width,ne.height),ae&&Ke(x,ne,he,Pe)):t.texImage2D(n.TEXTURE_2D,0,Te,ne.width,ne.height,0,he,Pe,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){D&&Q&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Te,De[0].width,De[0].height,ne.depth);for(let te=0,K=De.length;te<K;te++)if(oe=De[te],x.format!==fi)if(he!==null)if(D){if(ae)if(x.layerUpdates.size>0){let Me=$c(oe.width,oe.height,x.format,x.type);for(let ke of x.layerUpdates){let dt=oe.data.subarray(ke*Me/oe.data.BYTES_PER_ELEMENT,(ke+1)*Me/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,ke,oe.width,oe.height,1,he,dt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,oe.width,oe.height,ne.depth,he,oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,Te,oe.width,oe.height,ne.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ae&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,oe.width,oe.height,ne.depth,he,Pe,oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,Te,oe.width,oe.height,ne.depth,0,he,Pe,oe.data)}else{D&&Q&&t.texStorage2D(n.TEXTURE_2D,xe,Te,De[0].width,De[0].height);for(let te=0,K=De.length;te<K;te++)oe=De[te],x.format!==fi?he!==null?D?ae&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,oe.width,oe.height,he,oe.data):t.compressedTexImage2D(n.TEXTURE_2D,te,Te,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ae&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,oe.width,oe.height,he,Pe,oe.data):t.texImage2D(n.TEXTURE_2D,te,Te,oe.width,oe.height,0,he,Pe,oe.data)}else if(x.isDataArrayTexture)if(D){if(Q&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Te,ne.width,ne.height,ne.depth),ae)if(x.layerUpdates.size>0){let te=$c(ne.width,ne.height,x.format,x.type);for(let K of x.layerUpdates){let Me=ne.data.subarray(K*te/ne.data.BYTES_PER_ELEMENT,(K+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,K,ne.width,ne.height,1,he,Pe,Me)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Te,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(x.isData3DTexture)D?(Q&&t.texStorage3D(n.TEXTURE_3D,xe,Te,ne.width,ne.height,ne.depth),ae&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Te,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(x.isFramebufferTexture){if(Q)if(D)t.texStorage2D(n.TEXTURE_2D,xe,Te,ne.width,ne.height);else{let te=ne.width,K=ne.height;for(let Me=0;Me<xe;Me++)t.texImage2D(n.TEXTURE_2D,Me,Te,te,K,0,he,Pe,null),te>>=1,K>>=1}}else if(De.length>0){if(D&&Q){let te=pt(De[0]);t.texStorage2D(n.TEXTURE_2D,xe,Te,te.width,te.height)}for(let te=0,K=De.length;te<K;te++)oe=De[te],D?ae&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,he,Pe,oe):t.texImage2D(n.TEXTURE_2D,te,Te,he,Pe,oe);x.generateMipmaps=!1}else if(D){if(Q){let te=pt(ne);t.texStorage2D(n.TEXTURE_2D,xe,Te,te.width,te.height)}ae&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,he,Pe,ne)}else t.texImage2D(n.TEXTURE_2D,0,Te,he,Pe,ne);m(x)&&p(W),ve.__version=G.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function $(T,x,O){if(x.image.length!==6)return;let W=et(T,x),j=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+O);let G=i.get(j);if(j.version!==G.__version||W===!0){t.activeTexture(n.TEXTURE0+O);let ve=We.getPrimaries(We.workingColorSpace),re=x.colorSpace===xn?null:We.getPrimaries(x.colorSpace),me=x.colorSpace===xn||ve===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Se=x.isCompressedTexture||x.image[0].isCompressedTexture,ne=x.image[0]&&x.image[0].isDataTexture,he=[];for(let K=0;K<6;K++)!Se&&!ne?he[K]=_(x.image[K],!0,s.maxCubemapSize):he[K]=ne?x.image[K].image:x.image[K],he[K]=vt(x,he[K]);let Pe=he[0],Te=r.convert(x.format,x.colorSpace),oe=r.convert(x.type),De=S(x.internalFormat,Te,oe,x.colorSpace),D=x.isVideoTexture!==!0,Q=G.__version===void 0||W===!0,ae=j.dataReady,xe=w(x,Pe);Fe(n.TEXTURE_CUBE_MAP,x);let te;if(Se){D&&Q&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,De,Pe.width,Pe.height);for(let K=0;K<6;K++){te=he[K].mipmaps;for(let Me=0;Me<te.length;Me++){let ke=te[Me];x.format!==fi?Te!==null?D?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me,0,0,ke.width,ke.height,Te,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me,De,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me,0,0,ke.width,ke.height,Te,oe,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me,De,ke.width,ke.height,0,Te,oe,ke.data)}}}else{if(te=x.mipmaps,D&&Q){te.length>0&&xe++;let K=pt(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,De,K.width,K.height)}for(let K=0;K<6;K++)if(ne){D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,he[K].width,he[K].height,Te,oe,he[K].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,De,he[K].width,he[K].height,0,Te,oe,he[K].data);for(let Me=0;Me<te.length;Me++){let dt=te[Me].image[K].image;D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me+1,0,0,dt.width,dt.height,Te,oe,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me+1,De,dt.width,dt.height,0,Te,oe,dt.data)}}else{D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Te,oe,he[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,De,Te,oe,he[K]);for(let Me=0;Me<te.length;Me++){let ke=te[Me];D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me+1,0,0,Te,oe,ke.image[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Me+1,De,Te,oe,ke.image[K])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),G.__version=j.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function de(T,x,O,W,j,G){let ve=r.convert(O.format,O.colorSpace),re=r.convert(O.type),me=S(O.internalFormat,ve,re,O.colorSpace),Se=i.get(x),ne=i.get(O);if(ne.__renderTarget=x,!Se.__hasExternalTextures){let he=Math.max(1,x.width>>G),Pe=Math.max(1,x.height>>G);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?t.texImage3D(j,G,me,he,Pe,x.depth,0,ve,re,null):t.texImage2D(j,G,me,he,Pe,0,ve,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),_e(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,j,ne.__webglTexture,0,ot(x)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,j,ne.__webglTexture,G),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(T,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){let W=x.depthTexture,j=W&&W.isDepthTexture?W.type:null,G=v(x.stencilBuffer,j),ve=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=ot(x);_e(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,G,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,G,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,G,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,T)}else{let W=x.textures;for(let j=0;j<W.length;j++){let G=W[j],ve=r.convert(G.format,G.colorSpace),re=r.convert(G.type),me=S(G.internalFormat,ve,re,G.colorSpace),Se=ot(x);O&&_e(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Se,me,x.width,x.height):_e(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Se,me,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,me,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pe(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=i.get(x.depthTexture);W.__renderTarget=x,(!W.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z(x.depthTexture,0);let j=W.__webglTexture,G=ot(x);if(x.depthTexture.format===Bs)_e(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(x.depthTexture.format===On)_e(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Xe(T){let x=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){let W=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){let j=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",j)};W.addEventListener("dispose",j),x.__depthDisposeCallback=j}x.__boundDepthTexture=W}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let W=T.texture.mipmaps;W&&W.length>0?pe(x.__webglFramebuffer[0],T):pe(x.__webglFramebuffer,T)}else if(O){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=n.createRenderbuffer(),Ae(x.__webglDepthbuffer[W],T,!1);else{let j=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=x.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,G)}}else{let W=T.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Ae(x.__webglDepthbuffer,T,!1);else{let j=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,G)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Et(T,x,O){let W=i.get(T);x!==void 0&&de(W.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Xe(T)}function R(T){let x=T.texture,O=i.get(T),W=i.get(x);T.addEventListener("dispose",I);let j=T.textures,G=T.isWebGLCubeRenderTarget===!0,ve=j.length>1;if(ve||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=x.version,a.memory.textures++),G){O.__webglFramebuffer=[];for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[re]=[];for(let me=0;me<x.mipmaps.length;me++)O.__webglFramebuffer[re][me]=n.createFramebuffer()}else O.__webglFramebuffer[re]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let re=0;re<x.mipmaps.length;re++)O.__webglFramebuffer[re]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ve)for(let re=0,me=j.length;re<me;re++){let Se=i.get(j[re]);Se.__webglTexture===void 0&&(Se.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&_e(T)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let re=0;re<j.length;re++){let me=j[re];O.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[re]);let Se=r.convert(me.format,me.colorSpace),ne=r.convert(me.type),he=S(me.internalFormat,Se,ne,me.colorSpace,T.isXRRenderTarget===!0),Pe=ot(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,he,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,O.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,x);for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)de(O.__webglFramebuffer[re][me],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,me);else de(O.__webglFramebuffer[re],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let re=0,me=j.length;re<me;re++){let Se=j[re],ne=i.get(Se),he=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(he=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,ne.__webglTexture),Fe(he,Se),de(O.__webglFramebuffer,T,Se,n.COLOR_ATTACHMENT0+re,he,0),m(Se)&&p(he)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(re=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,W.__webglTexture),Fe(re,x),x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)de(O.__webglFramebuffer[me],T,x,n.COLOR_ATTACHMENT0,re,me);else de(O.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,re,0);m(x)&&p(re),t.unbindTexture()}T.depthBuffer&&Xe(T)}function at(T){let x=T.textures;for(let O=0,W=x.length;O<W;O++){let j=x[O];if(m(j)){let G=E(T),ve=i.get(j).__webglTexture;t.bindTexture(G,ve),p(G),t.unbindTexture()}}}let Ue=[],Ce=[];function ge(T){if(T.samples>0){if(_e(T)===!1){let x=T.textures,O=T.width,W=T.height,j=n.COLOR_BUFFER_BIT,G=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(T),re=x.length>1;if(re)for(let Se=0;Se<x.length;Se++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);let me=T.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Se=0;Se<x.length;Se++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[Se]);let ne=i.get(x[Se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,O,W,0,0,O,W,j,n.NEAREST),c===!0&&(Ue.length=0,Ce.length=0,Ue.push(n.COLOR_ATTACHMENT0+Se),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ue.push(G),Ce.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ce)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Se=0;Se<x.length;Se++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,ve.__webglColorRenderbuffer[Se]);let ne=i.get(x[Se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function ot(T){return Math.min(s.maxSamples,T.samples)}function _e(T){let x=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Be(T){let x=a.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function vt(T,x){let O=T.colorSpace,W=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==kt&&O!==xn&&(We.getTransfer(O)===tt?(W!==fi||j!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function pt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=B,this.setTexture2D=Z,this.setTexture2DArray=X,this.setTexture3D=ie,this.setTextureCube=H,this.rebindTextures=Et,this.setupRenderTarget=R,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=_e}function lx(n,e){function t(i,s=xn){let r,a=We.getTransfer(s);if(i===Di)return n.UNSIGNED_BYTE;if(i===zo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Vo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Oc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Bc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Uc)return n.BYTE;if(i===Fc)return n.SHORT;if(i===er)return n.UNSIGNED_SHORT;if(i===ko)return n.INT;if(i===Un)return n.UNSIGNED_INT;if(i===ri)return n.FLOAT;if(i===Ni)return n.HALF_FLOAT;if(i===kc)return n.ALPHA;if(i===zc)return n.RGB;if(i===fi)return n.RGBA;if(i===Bs)return n.DEPTH_COMPONENT;if(i===On)return n.DEPTH_STENCIL;if(i===tr)return n.RED;if(i===Ho)return n.RED_INTEGER;if(i===Vc)return n.RG;if(i===Go)return n.RG_INTEGER;if(i===Wo)return n.RGBA_INTEGER;if(i===na||i===sa||i===ra||i===aa)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===sa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xo||i===qo||i===Yo||i===Zo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ko||i===$o||i===jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ko||i===$o)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===jo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Jo||i===Qo||i===el||i===tl||i===il||i===nl||i===sl||i===rl||i===al||i===ol||i===ll||i===cl||i===hl||i===ul)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Jo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Qo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===el)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===il)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===al)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ol)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ll)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ul)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===dl||i===fl||i===pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===dl)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ml||i===gl||i===_l||i===xl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ml)return r.COMPRESSED_RED_RGTC1_EXT;if(i===gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_l)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var cx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hx=`
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

}`,ch=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new zr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Ct({vertexShader:cx,fragmentShader:hx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new ns(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hh=class extends Hi{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new ch,p={},E=t.getContextAttributes(),S=null,v=null,w=[],A=[],I=new Ee,U=null,M=new St;M.viewport=new Je;let b=new St;b.viewport=new Je;let P=[M,b],B=new _o,V=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=w[Y];return $===void 0&&($=new Gs,w[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=w[Y];return $===void 0&&($=new Gs,w[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=w[Y];return $===void 0&&($=new Gs,w[Y]=$),$.getHandSpace()};function Z(Y){let $=A.indexOf(Y.inputSource);if($===-1)return;let de=w[$];de!==void 0&&(de.update(Y.inputSource,Y.frame,l||a),de.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",ie);for(let Y=0;Y<w.length;Y++){let $=A[Y];$!==null&&(A[Y]=null,w[Y].disconnect($))}V=null,q=null,m.reset();for(let Y in p)delete p[Y];e.setRenderTarget(S),f=null,d=null,u=null,s=null,v=null,Ke.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",ie),E.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(I),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Ae=null,pe=null;E.depth&&(pe=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=E.stencil?On:Bs,Ae=E.stencil?Fn:Un);let Xe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Xe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new jt(d.textureWidth,d.textureHeight,{format:fi,type:Di,depthTexture:new is(d.textureWidth,d.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let de={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new jt(f.framebufferWidth,f.framebufferHeight,{format:fi,type:Di,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ke.setContext(s),Ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(Y){for(let $=0;$<Y.removed.length;$++){let de=Y.removed[$],Ae=A.indexOf(de);Ae>=0&&(A[Ae]=null,w[Ae].disconnect(de))}for(let $=0;$<Y.added.length;$++){let de=Y.added[$],Ae=A.indexOf(de);if(Ae===-1){for(let Xe=0;Xe<w.length;Xe++)if(Xe>=A.length){A.push(de),Ae=Xe;break}else if(A[Xe]===null){A[Xe]=de,Ae=Xe;break}if(Ae===-1)break}let pe=w[Ae];pe&&pe.connect(de)}}let H=new C,ee=new C;function ce(Y,$,de){H.setFromMatrixPosition($.matrixWorld),ee.setFromMatrixPosition(de.matrixWorld);let Ae=H.distanceTo(ee),pe=$.projectionMatrix.elements,Xe=de.projectionMatrix.elements,Et=pe[14]/(pe[10]-1),R=pe[14]/(pe[10]+1),at=(pe[9]+1)/pe[5],Ue=(pe[9]-1)/pe[5],Ce=(pe[8]-1)/pe[0],ge=(Xe[8]+1)/Xe[0],ot=Et*Ce,_e=Et*ge,Be=Ae/(-Ce+ge),vt=Be*-Ce;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(vt),Y.translateZ(Be),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),pe[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let pt=Et+Be,T=R+Be,x=ot-vt,O=_e+(Ae-vt),W=at*R/T*pt,j=Ue*R/T*pt;Y.projectionMatrix.makePerspective(x,O,W,j,pt,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ye(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let $=Y.near,de=Y.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(de=m.depthFar)),B.near=b.near=M.near=$,B.far=b.far=M.far=de,(V!==B.near||q!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),V=B.near,q=B.far),B.layers.mask=Y.layers.mask|6,M.layers.mask=B.layers.mask&3,b.layers.mask=B.layers.mask&5;let Ae=Y.parent,pe=B.cameras;ye(B,Ae);for(let Xe=0;Xe<pe.length;Xe++)ye(pe[Xe],Ae);pe.length===2?ce(B,M,b):B.projectionMatrix.copy(M.projectionMatrix),Fe(Y,B,Ae)};function Fe(Y,$,de){de===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(de.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Qn*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Y){return p[Y]};let et=null;function nt(Y,$){if(h=$.getViewerPose(l||a),g=$,h!==null){let de=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Ae=!1;de.length!==B.cameras.length&&(B.cameras.length=0,Ae=!0);for(let R=0;R<de.length;R++){let at=de[R],Ue=null;if(f!==null)Ue=f.getViewport(at);else{let ge=u.getViewSubImage(d,at);Ue=ge.viewport,R===0&&(e.setRenderTargetTextures(v,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(v))}let Ce=P[R];Ce===void 0&&(Ce=new St,Ce.layers.enable(R),Ce.viewport=new Je,P[R]=Ce),Ce.matrix.fromArray(at.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(at.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),R===0&&(B.matrix.copy(Ce.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ae===!0&&B.cameras.push(Ce)}let pe=s.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=i.getBinding();let R=u.getDepthInformation(de[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(pe&&pe.includes("camera-access")&&_){e.state.unbindTexture(),u=i.getBinding();for(let R=0;R<de.length;R++){let at=de[R].camera;if(at){let Ue=p[at];Ue||(Ue=new zr,p[at]=Ue);let Ce=u.getCameraImage(at);Ue.sourceTexture=Ce}}}}for(let de=0;de<w.length;de++){let Ae=A[de],pe=w[de];Ae!==null&&pe!==void 0&&pe.update(Ae,$,l||a)}et&&et(Y,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}let Ke=new Zd;Ke.setAnimationLoop(nt),this.setAnimationLoop=function(Y){et=Y},this.dispose=function(){}}},ds=new yi,ux=new Oe;function dx(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Yc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,E,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=e.get(p),S=E.envMap,v=E.envMapRotation;S&&(m.envMap.value=S,ds.copy(v),ds.x*=-1,ds.y*=-1,ds.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ds.y*=-1,ds.z*=-1),m.envMapRotation.value.setFromMatrix4(ux.makeRotationFromEuler(ds)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function fx(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,S){let v=S.program;i.uniformBlockBinding(E,v)}function l(E,S){let v=s[E.id];v===void 0&&(g(E),v=h(E),s[E.id]=v,E.addEventListener("dispose",m));let w=S.program;i.updateUBOMapping(E,w);let A=e.render.frame;r[E.id]!==A&&(d(E),r[E.id]=A)}function h(E){let S=u();E.__bindingPointIndex=S;let v=n.createBuffer(),w=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,w,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,v),v}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let S=s[E.id],v=E.uniforms,w=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let A=0,I=v.length;A<I;A++){let U=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,b=U.length;M<b;M++){let P=U[M];if(f(P,A,M,w)===!0){let B=P.__offset,V=Array.isArray(P.value)?P.value:[P.value],q=0;for(let Z=0;Z<V.length;Z++){let X=V[Z],ie=_(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,B+q,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,q),q+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(E,S,v,w){let A=E.value,I=S+"_"+v;if(w[I]===void 0)return typeof A=="number"||typeof A=="boolean"?w[I]=A:w[I]=A.clone(),!0;{let U=w[I];if(typeof A=="number"||typeof A=="boolean"){if(U!==A)return w[I]=A,!0}else if(U.equals(A)===!1)return U.copy(A),!0}return!1}function g(E){let S=E.uniforms,v=0,w=16;for(let I=0,U=S.length;I<U;I++){let M=Array.isArray(S[I])?S[I]:[S[I]];for(let b=0,P=M.length;b<P;b++){let B=M[b],V=Array.isArray(B.value)?B.value:[B.value];for(let q=0,Z=V.length;q<Z;q++){let X=V[q],ie=_(X),H=v%w,ee=H%ie.boundary,ce=H+ee;v+=ee,ce!==0&&w-ce<ie.storage&&(v+=w-ce),B.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=ie.storage}}}let A=v%w;return A>0&&(v+=w-A),E.__size=v,E.__cache={},this}function _(E){let S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){let S=E.target;S.removeEventListener("dispose",m);let v=a.indexOf(S.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(let E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}var ha=class{constructor(e={}){let{canvas:t=vd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,E=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,w=!1;this._outputColorSpace=Mt;let A=0,I=0,U=null,M=-1,b=null,P=new Je,B=new Je,V=null,q=new we(0),Z=0,X=t.width,ie=t.height,H=1,ee=null,ce=null,ye=new Je(0,0,X,ie),Fe=new Je(0,0,X,ie),et=!1,nt=new Ys,Ke=!1,Y=!1,$=new Oe,de=new C,Ae=new Je,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function Et(){return U===null?H:1}let R=i;function at(y,N){return t.getContext(y,N)}try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",te,!1),R===null){let N="webgl2";if(R=at(N,y),R===null)throw at(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ue,Ce,ge,ot,_e,Be,vt,pt,T,x,O,W,j,G,ve,re,me,Se,ne,he,Pe,Te,oe,De;function D(){Ue=new P0(R),Ue.init(),Te=new lx(R,Ue),Ce=new T0(R,Ue,e,Te),ge=new ax(R,Ue),Ce.reversedDepthBuffer&&d&&ge.buffers.depth.setReversed(!0),ot=new N0(R),_e=new Y_,Be=new ox(R,Ue,ge,_e,Ce,Te,ot),vt=new w0(v),pt=new I0(v),T=new zp(R),oe=new M0(R,T),x=new L0(R,T,ot,oe),O=new F0(R,x,T,ot),ne=new U0(R,Ce,Be),re=new E0(_e),W=new q_(v,vt,pt,Ue,Ce,oe,re),j=new dx(v,_e),G=new K_,ve=new tx(Ue),Se=new b0(v,vt,pt,ge,O,f,c),me=new sx(v,O,Ce),De=new fx(R,ot,Ce,ge),he=new S0(R,Ue,ot),Pe=new D0(R,Ue,ot),ot.programs=W.programs,v.capabilities=Ce,v.extensions=Ue,v.properties=_e,v.renderLists=G,v.shadowMap=me,v.state=ge,v.info=ot}D();let Q=new hh(v,R);this.xr=Q,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let y=Ue.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=Ue.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(y){y!==void 0&&(H=y,this.setSize(X,ie,!1))},this.getSize=function(y){return y.set(X,ie)},this.setSize=function(y,N,k=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,ie=N,t.width=Math.floor(y*H),t.height=Math.floor(N*H),k===!0&&(t.style.width=y+"px",t.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(X*H,ie*H).floor()},this.setDrawingBufferSize=function(y,N,k){X=y,ie=N,H=k,t.width=Math.floor(y*k),t.height=Math.floor(N*k),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(P)},this.getViewport=function(y){return y.copy(ye)},this.setViewport=function(y,N,k,z){y.isVector4?ye.set(y.x,y.y,y.z,y.w):ye.set(y,N,k,z),ge.viewport(P.copy(ye).multiplyScalar(H).round())},this.getScissor=function(y){return y.copy(Fe)},this.setScissor=function(y,N,k,z){y.isVector4?Fe.set(y.x,y.y,y.z,y.w):Fe.set(y,N,k,z),ge.scissor(B.copy(Fe).multiplyScalar(H).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(y){ge.setScissorTest(et=y)},this.setOpaqueSort=function(y){ee=y},this.setTransparentSort=function(y){ce=y},this.getClearColor=function(y){return y.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(y=!0,N=!0,k=!0){let z=0;if(y){let F=!1;if(U!==null){let se=U.texture.format;F=se===Wo||se===Go||se===Ho}if(F){let se=U.texture.type,ue=se===Di||se===Un||se===er||se===Fn||se===zo||se===Vo,be=Se.getClearColor(),fe=Se.getClearAlpha(),Le=be.r,Ne=be.g,Re=be.b;ue?(g[0]=Le,g[1]=Ne,g[2]=Re,g[3]=fe,R.clearBufferuiv(R.COLOR,0,g)):(_[0]=Le,_[1]=Ne,_[2]=Re,_[3]=fe,R.clearBufferiv(R.COLOR,0,_))}else z|=R.COLOR_BUFFER_BIT}N&&(z|=R.DEPTH_BUFFER_BIT),k&&(z|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",te,!1),Se.dispose(),G.dispose(),ve.dispose(),_e.dispose(),vt.dispose(),pt.dispose(),O.dispose(),oe.dispose(),De.dispose(),W.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",ki),Q.removeEventListener("sessionend",eu),Hn.stop()};function ae(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let y=ot.autoReset,N=me.enabled,k=me.autoUpdate,z=me.needsUpdate,F=me.type;D(),ot.autoReset=y,me.enabled=N,me.autoUpdate=k,me.needsUpdate=z,me.type=F}function te(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function K(y){let N=y.target;N.removeEventListener("dispose",K),Me(N)}function Me(y){ke(y),_e.remove(y)}function ke(y){let N=_e.get(y).programs;N!==void 0&&(N.forEach(function(k){W.releaseProgram(k)}),y.isShaderMaterial&&W.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,k,z,F,se){N===null&&(N=pe);let ue=F.isMesh&&F.matrixWorld.determinant()<0,be=Nf(y,N,k,z,F);ge.setMaterial(z,ue);let fe=k.index,Le=1;if(z.wireframe===!0){if(fe=x.getWireframeAttribute(k),fe===void 0)return;Le=2}let Ne=k.drawRange,Re=k.attributes.position,Ze=Ne.start*Le,lt=(Ne.start+Ne.count)*Le;se!==null&&(Ze=Math.max(Ze,se.start*Le),lt=Math.min(lt,(se.start+se.count)*Le)),fe!==null?(Ze=Math.max(Ze,0),lt=Math.min(lt,fe.count)):Re!=null&&(Ze=Math.max(Ze,0),lt=Math.min(lt,Re.count));let bt=lt-Ze;if(bt<0||bt===1/0)return;oe.setup(F,z,be,k,fe);let mt,ht=he;if(fe!==null&&(mt=T.get(fe),ht=Pe,ht.setIndex(mt)),F.isMesh)z.wireframe===!0?(ge.setLineWidth(z.wireframeLinewidth*Et()),ht.setMode(R.LINES)):ht.setMode(R.TRIANGLES);else if(F.isLine){let Ie=z.linewidth;Ie===void 0&&(Ie=1),ge.setLineWidth(Ie*Et()),F.isLineSegments?ht.setMode(R.LINES):F.isLineLoop?ht.setMode(R.LINE_LOOP):ht.setMode(R.LINE_STRIP)}else F.isPoints?ht.setMode(R.POINTS):F.isSprite&&ht.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)zs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))ht.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ie=F._multiDrawStarts,xt=F._multiDrawCounts,je=F._multiDrawCount,oi=fe?T.get(fe).bytesPerElement:1,bs=_e.get(z).currentProgram.getUniforms();for(let li=0;li<je;li++)bs.setValue(R,"_gl_DrawID",li),ht.render(Ie[li]/oi,xt[li])}else if(F.isInstancedMesh)ht.renderInstances(Ze,bt,F.count);else if(k.isInstancedBufferGeometry){let Ie=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,xt=Math.min(k.instanceCount,Ie);ht.renderInstances(Ze,bt,xt)}else ht.render(Ze,bt)};function dt(y,N,k){y.transparent===!0&&y.side===bi&&y.forceSinglePass===!1?(y.side=Vt,y.needsUpdate=!0,wa(y,N,k),y.side=Ci,y.needsUpdate=!0,wa(y,N,k),y.side=bi):wa(y,N,k)}this.compile=function(y,N,k=null){k===null&&(k=y),p=ve.get(k),p.init(N),S.push(p),k.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),y!==k&&y.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let z=new Set;return y.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let se=F.material;if(se)if(Array.isArray(se))for(let ue=0;ue<se.length;ue++){let be=se[ue];dt(be,k,F),z.add(be)}else dt(se,k,F),z.add(se)}),p=S.pop(),z},this.compileAsync=function(y,N,k=null){let z=this.compile(y,N,k);return new Promise(F=>{function se(){if(z.forEach(function(ue){_e.get(ue).currentProgram.isReady()&&z.delete(ue)}),z.size===0){F(y);return}setTimeout(se,10)}Ue.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let it=null;function nn(y){it&&it(y)}function ki(){Hn.stop()}function eu(){Hn.start()}let Hn=new Zd;Hn.setAnimationLoop(nn),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(y){it=y,Q.setAnimationLoop(y),y===null?Hn.stop():Hn.start()},Q.addEventListener("sessionstart",ki),Q.addEventListener("sessionend",eu),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(N),N=Q.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,N,U),p=ve.get(y,S.length),p.init(N),S.push(p),$.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),nt.setFromProjectionMatrix($,Ai,N.reversedDepth),Y=this.localClippingEnabled,Ke=re.init(this.clippingPlanes,Y),m=G.get(y,E.length),m.init(),E.push(m),Q.enabled===!0&&Q.isPresenting===!0){let se=v.xr.getDepthSensingMesh();se!==null&&Hl(se,N,-1/0,v.sortObjects)}Hl(y,N,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ee,ce),Xe=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,Xe&&Se.addToRenderList(m,y),this.info.render.frame++,Ke===!0&&re.beginShadows();let k=p.state.shadowsArray;me.render(k,y,N),Ke===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){let se=N.cameras;if(F.length>0)for(let ue=0,be=se.length;ue<be;ue++){let fe=se[ue];iu(z,F,y,fe)}Xe&&Se.render(y);for(let ue=0,be=se.length;ue<be;ue++){let fe=se[ue];tu(m,y,fe,fe.viewport)}}else F.length>0&&iu(z,F,y,N),Xe&&Se.render(y),tu(m,y,N);U!==null&&I===0&&(Be.updateMultisampleRenderTarget(U),Be.updateRenderTargetMipmap(U)),y.isScene===!0&&y.onAfterRender(v,y,N),oe.resetDefaultState(),M=-1,b=null,S.pop(),S.length>0?(p=S[S.length-1],Ke===!0&&re.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Hl(y,N,k,z){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)k=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||nt.intersectsSprite(y)){z&&Ae.setFromMatrixPosition(y.matrixWorld).applyMatrix4($);let ue=O.update(y),be=y.material;be.visible&&m.push(y,ue,be,k,Ae.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||nt.intersectsObject(y))){let ue=O.update(y),be=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ae.copy(y.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Ae.copy(ue.boundingSphere.center)),Ae.applyMatrix4(y.matrixWorld).applyMatrix4($)),Array.isArray(be)){let fe=ue.groups;for(let Le=0,Ne=fe.length;Le<Ne;Le++){let Re=fe[Le],Ze=be[Re.materialIndex];Ze&&Ze.visible&&m.push(y,ue,Ze,k,Ae.z,Re)}}else be.visible&&m.push(y,ue,be,k,Ae.z,null)}}let se=y.children;for(let ue=0,be=se.length;ue<be;ue++)Hl(se[ue],N,k,z)}function tu(y,N,k,z){let F=y.opaque,se=y.transmissive,ue=y.transparent;p.setupLightsView(k),Ke===!0&&re.setGlobalState(v.clippingPlanes,k),z&&ge.viewport(P.copy(z)),F.length>0&&Ea(F,N,k),se.length>0&&Ea(se,N,k),ue.length>0&&Ea(ue,N,k),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function iu(y,N,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new jt(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?Ni:Di,minFilter:Li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));let se=p.state.transmissionRenderTarget[z.id],ue=z.viewport||P;se.setSize(ue.z*v.transmissionResolutionScale,ue.w*v.transmissionResolutionScale);let be=v.getRenderTarget(),fe=v.getActiveCubeFace(),Le=v.getActiveMipmapLevel();v.setRenderTarget(se),v.getClearColor(q),Z=v.getClearAlpha(),Z<1&&v.setClearColor(16777215,.5),v.clear(),Xe&&Se.render(k);let Ne=v.toneMapping;v.toneMapping=_n;let Re=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),Ke===!0&&re.setGlobalState(v.clippingPlanes,z),Ea(y,k,z),Be.updateMultisampleRenderTarget(se),Be.updateRenderTargetMipmap(se),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let lt=0,bt=N.length;lt<bt;lt++){let mt=N[lt],ht=mt.object,Ie=mt.geometry,xt=mt.material,je=mt.group;if(xt.side===bi&&ht.layers.test(z.layers)){let oi=xt.side;xt.side=Vt,xt.needsUpdate=!0,nu(ht,k,z,Ie,xt,je),xt.side=oi,xt.needsUpdate=!0,Ze=!0}}Ze===!0&&(Be.updateMultisampleRenderTarget(se),Be.updateRenderTargetMipmap(se))}v.setRenderTarget(be,fe,Le),v.setClearColor(q,Z),Re!==void 0&&(z.viewport=Re),v.toneMapping=Ne}function Ea(y,N,k){let z=N.isScene===!0?N.overrideMaterial:null;for(let F=0,se=y.length;F<se;F++){let ue=y[F],be=ue.object,fe=ue.geometry,Le=ue.group,Ne=ue.material;Ne.allowOverride===!0&&z!==null&&(Ne=z),be.layers.test(k.layers)&&nu(be,N,k,fe,Ne,Le)}}function nu(y,N,k,z,F,se){y.onBeforeRender(v,N,k,z,F,se),y.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(v,N,k,z,y,se),F.transparent===!0&&F.side===bi&&F.forceSinglePass===!1?(F.side=Vt,F.needsUpdate=!0,v.renderBufferDirect(k,N,z,F,y,se),F.side=Ci,F.needsUpdate=!0,v.renderBufferDirect(k,N,z,F,y,se),F.side=bi):v.renderBufferDirect(k,N,z,F,y,se),y.onAfterRender(v,N,k,z,F,se)}function wa(y,N,k){N.isScene!==!0&&(N=pe);let z=_e.get(y),F=p.state.lights,se=p.state.shadowsArray,ue=F.state.version,be=W.getParameters(y,F.state,se,N,k),fe=W.getProgramCacheKey(be),Le=z.programs;z.environment=y.isMeshStandardMaterial?N.environment:null,z.fog=N.fog,z.envMap=(y.isMeshStandardMaterial?pt:vt).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Le===void 0&&(y.addEventListener("dispose",K),Le=new Map,z.programs=Le);let Ne=Le.get(fe);if(Ne!==void 0){if(z.currentProgram===Ne&&z.lightsStateVersion===ue)return ru(y,be),Ne}else be.uniforms=W.getUniforms(y),y.onBeforeCompile(be,v),Ne=W.acquireProgram(be,fe),Le.set(fe,Ne),z.uniforms=be.uniforms;let Re=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Re.clippingPlanes=re.uniform),ru(y,be),z.needsLights=Ff(y),z.lightsStateVersion=ue,z.needsLights&&(Re.ambientLightColor.value=F.state.ambient,Re.lightProbe.value=F.state.probe,Re.directionalLights.value=F.state.directional,Re.directionalLightShadows.value=F.state.directionalShadow,Re.spotLights.value=F.state.spot,Re.spotLightShadows.value=F.state.spotShadow,Re.rectAreaLights.value=F.state.rectArea,Re.ltc_1.value=F.state.rectAreaLTC1,Re.ltc_2.value=F.state.rectAreaLTC2,Re.pointLights.value=F.state.point,Re.pointLightShadows.value=F.state.pointShadow,Re.hemisphereLights.value=F.state.hemi,Re.directionalShadowMap.value=F.state.directionalShadowMap,Re.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Re.spotShadowMap.value=F.state.spotShadowMap,Re.spotLightMatrix.value=F.state.spotLightMatrix,Re.spotLightMap.value=F.state.spotLightMap,Re.pointShadowMap.value=F.state.pointShadowMap,Re.pointShadowMatrix.value=F.state.pointShadowMatrix),z.currentProgram=Ne,z.uniformsList=null,Ne}function su(y){if(y.uniformsList===null){let N=y.currentProgram.getUniforms();y.uniformsList=rr.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function ru(y,N){let k=_e.get(y);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.batchingColor=N.batchingColor,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.instancingMorph=N.instancingMorph,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function Nf(y,N,k,z,F){N.isScene!==!0&&(N=pe),Be.resetTextureUnits();let se=N.fog,ue=z.isMeshStandardMaterial?N.environment:null,be=U===null?v.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:kt,fe=(z.isMeshStandardMaterial?pt:vt).get(z.envMap||ue),Le=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ne=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Re=!!k.morphAttributes.position,Ze=!!k.morphAttributes.normal,lt=!!k.morphAttributes.color,bt=_n;z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(bt=v.toneMapping);let mt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ht=mt!==void 0?mt.length:0,Ie=_e.get(z),xt=p.state.lights;if(Ke===!0&&(Y===!0||y!==b)){let Zt=y===b&&z.id===M;re.setState(z,y,Zt)}let je=!1;z.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==xt.state.version||Ie.outputColorSpace!==be||F.isBatchedMesh&&Ie.batching===!1||!F.isBatchedMesh&&Ie.batching===!0||F.isBatchedMesh&&Ie.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ie.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ie.instancing===!1||!F.isInstancedMesh&&Ie.instancing===!0||F.isSkinnedMesh&&Ie.skinning===!1||!F.isSkinnedMesh&&Ie.skinning===!0||F.isInstancedMesh&&Ie.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ie.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ie.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ie.instancingMorph===!1&&F.morphTexture!==null||Ie.envMap!==fe||z.fog===!0&&Ie.fog!==se||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==re.numPlanes||Ie.numIntersection!==re.numIntersection)||Ie.vertexAlphas!==Le||Ie.vertexTangents!==Ne||Ie.morphTargets!==Re||Ie.morphNormals!==Ze||Ie.morphColors!==lt||Ie.toneMapping!==bt||Ie.morphTargetsCount!==ht)&&(je=!0):(je=!0,Ie.__version=z.version);let oi=Ie.currentProgram;je===!0&&(oi=wa(z,N,F));let bs=!1,li=!1,xr=!1,yt=oi.getUniforms(),gi=Ie.uniforms;if(ge.useProgram(oi.program)&&(bs=!0,li=!0,xr=!0),z.id!==M&&(M=z.id,li=!0),bs||b!==y){ge.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),yt.setValue(R,"projectionMatrix",y.projectionMatrix),yt.setValue(R,"viewMatrix",y.matrixWorldInverse);let Qt=yt.map.cameraPosition;Qt!==void 0&&Qt.setValue(R,de.setFromMatrixPosition(y.matrixWorld)),Ce.logarithmicDepthBuffer&&yt.setValue(R,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&yt.setValue(R,"isOrthographic",y.isOrthographicCamera===!0),b!==y&&(b=y,li=!0,xr=!0)}if(F.isSkinnedMesh){yt.setOptional(R,F,"bindMatrix"),yt.setOptional(R,F,"bindMatrixInverse");let Zt=F.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),yt.setValue(R,"boneTexture",Zt.boneTexture,Be))}F.isBatchedMesh&&(yt.setOptional(R,F,"batchingTexture"),yt.setValue(R,"batchingTexture",F._matricesTexture,Be),yt.setOptional(R,F,"batchingIdTexture"),yt.setValue(R,"batchingIdTexture",F._indirectTexture,Be),yt.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&yt.setValue(R,"batchingColorTexture",F._colorsTexture,Be));let _i=k.morphAttributes;if((_i.position!==void 0||_i.normal!==void 0||_i.color!==void 0)&&ne.update(F,k,oi),(li||Ie.receiveShadow!==F.receiveShadow)&&(Ie.receiveShadow=F.receiveShadow,yt.setValue(R,"receiveShadow",F.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(gi.envMap.value=fe,gi.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&N.environment!==null&&(gi.envMapIntensity.value=N.environmentIntensity),li&&(yt.setValue(R,"toneMappingExposure",v.toneMappingExposure),Ie.needsLights&&Uf(gi,xr),se&&z.fog===!0&&j.refreshFogUniforms(gi,se),j.refreshMaterialUniforms(gi,z,H,ie,p.state.transmissionRenderTarget[y.id]),rr.upload(R,su(Ie),gi,Be)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(rr.upload(R,su(Ie),gi,Be),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&yt.setValue(R,"center",F.center),yt.setValue(R,"modelViewMatrix",F.modelViewMatrix),yt.setValue(R,"normalMatrix",F.normalMatrix),yt.setValue(R,"modelMatrix",F.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let Zt=z.uniformsGroups;for(let Qt=0,Gl=Zt.length;Qt<Gl;Qt++){let Gn=Zt[Qt];De.update(Gn,oi),De.bind(Gn,oi)}}return oi}function Uf(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function Ff(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(y,N,k){let z=_e.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),_e.get(y.texture).__webglTexture=N,_e.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,N){let k=_e.get(y);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0};let Of=R.createFramebuffer();this.setRenderTarget=function(y,N=0,k=0){U=y,A=N,I=k;let z=!0,F=null,se=!1,ue=!1;if(y){let fe=_e.get(y);if(fe.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(R.FRAMEBUFFER,null),z=!1;else if(fe.__webglFramebuffer===void 0)Be.setupRenderTarget(y);else if(fe.__hasExternalTextures)Be.rebindTextures(y,_e.get(y.texture).__webglTexture,_e.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Re=y.depthTexture;if(fe.__boundDepthTexture!==Re){if(Re!==null&&_e.has(Re)&&(y.width!==Re.image.width||y.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(y)}}let Le=y.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ue=!0);let Ne=_e.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ne[N])?F=Ne[N][k]:F=Ne[N],se=!0):y.samples>0&&Be.useMultisampledRTT(y)===!1?F=_e.get(y).__webglMultisampledFramebuffer:Array.isArray(Ne)?F=Ne[k]:F=Ne,P.copy(y.viewport),B.copy(y.scissor),V=y.scissorTest}else P.copy(ye).multiplyScalar(H).floor(),B.copy(Fe).multiplyScalar(H).floor(),V=et;if(k!==0&&(F=Of),ge.bindFramebuffer(R.FRAMEBUFFER,F)&&z&&ge.drawBuffers(y,F),ge.viewport(P),ge.scissor(B),ge.setScissorTest(V),se){let fe=_e.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,k)}else if(ue){let fe=N;for(let Le=0;Le<y.textures.length;Le++){let Ne=_e.get(y.textures[Le]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Le,Ne.__webglTexture,k,fe)}}else if(y!==null&&k!==0){let fe=_e.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,fe.__webglTexture,k)}M=-1},this.readRenderTargetPixels=function(y,N,k,z,F,se,ue,be=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=_e.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){ge.bindFramebuffer(R.FRAMEBUFFER,fe);try{let Le=y.textures[be],Ne=Le.format,Re=Le.type;if(!Ce.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-z&&k>=0&&k<=y.height-F&&(y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+be),R.readPixels(N,k,z,F,Te.convert(Ne),Te.convert(Re),se))}finally{let Le=U!==null?_e.get(U).__webglFramebuffer:null;ge.bindFramebuffer(R.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(y,N,k,z,F,se,ue,be=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=_e.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(N>=0&&N<=y.width-z&&k>=0&&k<=y.height-F){ge.bindFramebuffer(R.FRAMEBUFFER,fe);let Le=y.textures[be],Ne=Le.format,Re=Le.type;if(!Ce.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ze=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ze),R.bufferData(R.PIXEL_PACK_BUFFER,se.byteLength,R.STREAM_READ),y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+be),R.readPixels(N,k,z,F,Te.convert(Ne),Te.convert(Re),0);let lt=U!==null?_e.get(U).__webglFramebuffer:null;ge.bindFramebuffer(R.FRAMEBUFFER,lt);let bt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await bd(R,bt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Ze),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,se),R.deleteBuffer(Ze),R.deleteSync(bt),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,N=null,k=0){let z=Math.pow(2,-k),F=Math.floor(y.image.width*z),se=Math.floor(y.image.height*z),ue=N!==null?N.x:0,be=N!==null?N.y:0;Be.setTexture2D(y,0),R.copyTexSubImage2D(R.TEXTURE_2D,k,0,0,ue,be,F,se),ge.unbindTexture()};let Bf=R.createFramebuffer(),kf=R.createFramebuffer();this.copyTextureToTexture=function(y,N,k=null,z=null,F=0,se=null){se===null&&(F!==0?(zs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=F,F=0):se=0);let ue,be,fe,Le,Ne,Re,Ze,lt,bt,mt=y.isCompressedTexture?y.mipmaps[se]:y.image;if(k!==null)ue=k.max.x-k.min.x,be=k.max.y-k.min.y,fe=k.isBox3?k.max.z-k.min.z:1,Le=k.min.x,Ne=k.min.y,Re=k.isBox3?k.min.z:0;else{let _i=Math.pow(2,-F);ue=Math.floor(mt.width*_i),be=Math.floor(mt.height*_i),y.isDataArrayTexture?fe=mt.depth:y.isData3DTexture?fe=Math.floor(mt.depth*_i):fe=1,Le=0,Ne=0,Re=0}z!==null?(Ze=z.x,lt=z.y,bt=z.z):(Ze=0,lt=0,bt=0);let ht=Te.convert(N.format),Ie=Te.convert(N.type),xt;N.isData3DTexture?(Be.setTexture3D(N,0),xt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Be.setTexture2DArray(N,0),xt=R.TEXTURE_2D_ARRAY):(Be.setTexture2D(N,0),xt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);let je=R.getParameter(R.UNPACK_ROW_LENGTH),oi=R.getParameter(R.UNPACK_IMAGE_HEIGHT),bs=R.getParameter(R.UNPACK_SKIP_PIXELS),li=R.getParameter(R.UNPACK_SKIP_ROWS),xr=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,mt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,mt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Le),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ne),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Re);let yt=y.isDataArrayTexture||y.isData3DTexture,gi=N.isDataArrayTexture||N.isData3DTexture;if(y.isDepthTexture){let _i=_e.get(y),Zt=_e.get(N),Qt=_e.get(_i.__renderTarget),Gl=_e.get(Zt.__renderTarget);ge.bindFramebuffer(R.READ_FRAMEBUFFER,Qt.__webglFramebuffer),ge.bindFramebuffer(R.DRAW_FRAMEBUFFER,Gl.__webglFramebuffer);for(let Gn=0;Gn<fe;Gn++)yt&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_e.get(y).__webglTexture,F,Re+Gn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_e.get(N).__webglTexture,se,bt+Gn)),R.blitFramebuffer(Le,Ne,ue,be,Ze,lt,ue,be,R.DEPTH_BUFFER_BIT,R.NEAREST);ge.bindFramebuffer(R.READ_FRAMEBUFFER,null),ge.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||y.isRenderTargetTexture||_e.has(y)){let _i=_e.get(y),Zt=_e.get(N);ge.bindFramebuffer(R.READ_FRAMEBUFFER,Bf),ge.bindFramebuffer(R.DRAW_FRAMEBUFFER,kf);for(let Qt=0;Qt<fe;Qt++)yt?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_i.__webglTexture,F,Re+Qt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,_i.__webglTexture,F),gi?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Zt.__webglTexture,se,bt+Qt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Zt.__webglTexture,se),F!==0?R.blitFramebuffer(Le,Ne,ue,be,Ze,lt,ue,be,R.COLOR_BUFFER_BIT,R.NEAREST):gi?R.copyTexSubImage3D(xt,se,Ze,lt,bt+Qt,Le,Ne,ue,be):R.copyTexSubImage2D(xt,se,Ze,lt,Le,Ne,ue,be);ge.bindFramebuffer(R.READ_FRAMEBUFFER,null),ge.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else gi?y.isDataTexture||y.isData3DTexture?R.texSubImage3D(xt,se,Ze,lt,bt,ue,be,fe,ht,Ie,mt.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(xt,se,Ze,lt,bt,ue,be,fe,ht,mt.data):R.texSubImage3D(xt,se,Ze,lt,bt,ue,be,fe,ht,Ie,mt):y.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,se,Ze,lt,ue,be,ht,Ie,mt.data):y.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,se,Ze,lt,mt.width,mt.height,ht,mt.data):R.texSubImage2D(R.TEXTURE_2D,se,Ze,lt,ue,be,ht,Ie,mt);R.pixelStorei(R.UNPACK_ROW_LENGTH,je),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,oi),R.pixelStorei(R.UNPACK_SKIP_PIXELS,bs),R.pixelStorei(R.UNPACK_SKIP_ROWS,li),R.pixelStorei(R.UNPACK_SKIP_IMAGES,xr),se===0&&N.generateMipmaps&&R.generateMipmap(xt),ge.unbindTexture()},this.initRenderTarget=function(y){_e.get(y).__webglFramebuffer===void 0&&Be.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Be.setTextureCube(y,0):y.isData3DTexture?Be.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Be.setTexture2DArray(y,0):Be.setTexture2D(y,0),ge.unbindTexture()},this.resetState=function(){A=0,I=0,U=null,ge.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}};var Qd={type:"change"},fh={type:"start"},tf={type:"end"},Sl=new Gi,ef=new ei,mx=Math.cos(70*Ui.DEG2RAD),Lt=new C,ai=2*Math.PI,ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},dh=1e-6,ua=class extends ea{constructor(e,t=null){super(e,t),this.state=ct.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Dn.ROTATE,MIDDLE:Dn.DOLLY,RIGHT:Dn.PAN},this.touches={ONE:Nn.ROTATE,TWO:Nn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new Tt,this._lastTargetPosition=new C,this._quat=new Tt().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Js,this._sphericalDelta=new Js,this._scale=1,this._panOffset=new C,this._rotateStart=new Ee,this._rotateEnd=new Ee,this._rotateDelta=new Ee,this._panStart=new Ee,this._panEnd=new Ee,this._panDelta=new Ee,this._dollyStart=new Ee,this._dollyEnd=new Ee,this._dollyDelta=new Ee,this._dollyDirection=new C,this._mouse=new Ee,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=_x.bind(this),this._onPointerDown=gx.bind(this),this._onPointerUp=xx.bind(this),this._onContextMenu=Ex.bind(this),this._onMouseWheel=bx.bind(this),this._onKeyDown=Mx.bind(this),this._onTouchStart=Sx.bind(this),this._onTouchMove=Tx.bind(this),this._onMouseDown=yx.bind(this),this._onMouseMove=vx.bind(this),this._interceptControlDown=wx.bind(this),this._interceptControlUp=Ax.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Qd),this.update(),this.state=ct.NONE}update(e=null){let t=this.object.position;Lt.copy(t).sub(this.target),Lt.applyQuaternion(this._quat),this._spherical.setFromVector3(Lt),this.autoRotate&&this.state===ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ai:i>Math.PI&&(i-=ai),s<-Math.PI?s+=ai:s>Math.PI&&(s-=ai),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Lt.setFromSpherical(this._spherical),Lt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Lt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Lt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new C(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Lt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Sl.origin.copy(this.object.position),Sl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sl.direction))<mx?this.object.lookAt(this.target):(ef.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sl.intersectPlane(ef,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>dh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>dh||this._lastTargetPosition.distanceToSquared(this.target)>dh?(this.dispatchEvent(Qd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ai/60*this.autoRotateSpeed*e:ai/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Lt.setFromMatrixColumn(t,0),Lt.multiplyScalar(-e),this._panOffset.add(Lt)}_panUp(e,t){this.screenSpacePanning===!0?Lt.setFromMatrixColumn(t,1):(Lt.setFromMatrixColumn(t,0),Lt.crossVectors(this.object.up,Lt)),Lt.multiplyScalar(e),this._panOffset.add(Lt)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Lt.copy(s).sub(this.target);let r=Lt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ai*this._rotateDelta.x/t.clientHeight),this._rotateUp(ai*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ai*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ai*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ai*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ai*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ai*this._rotateDelta.x/t.clientHeight),this._rotateUp(ai*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ee,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function gx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function _x(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function xx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tf),this.state=ct.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function yx(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Dn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ct.DOLLY;break;case Dn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ct.ROTATE}break;case Dn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ct.PAN}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(fh)}function vx(n){switch(this.state){case ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function bx(n){this.enabled===!1||this.enableZoom===!1||this.state!==ct.NONE||(n.preventDefault(),this.dispatchEvent(fh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(tf))}function Mx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Sx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Nn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ct.TOUCH_ROTATE;break;case Nn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ct.TOUCH_PAN;break;default:this.state=ct.NONE}break;case 2:switch(this.touches.TWO){case Nn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ct.TOUCH_DOLLY_PAN;break;case Nn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ct.TOUCH_DOLLY_ROTATE;break;default:this.state=ct.NONE}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(fh)}function Tx(n){switch(this._trackPointer(n),this.state){case ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ct.NONE}}function Ex(n){this.enabled!==!1&&n.preventDefault()}function wx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ax(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ph(n,e){if(e===Hc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===ir||e===oa){let t=n.getIndex();if(t===null){let a=[],o=n.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,s=[];if(e===ir)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}var Tl=class extends Yi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new bh(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new Ph(t)}),this.register(function(t){return new Lh(t)}),this.register(function(t){return new Dh(t)}),this.register(function(t){return new Th(t)}),this.register(function(t){return new Eh(t)}),this.register(function(t){return new wh(t)}),this.register(function(t){return new Ah(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new Rh(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new Ih(t)}),this.register(function(t){return new Ch(t)}),this.register(function(t){return new xh(t)}),this.register(function(t){return new Nh(t)}),this.register(function(t){return new Uh(t)})}load(e,t,i,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=gn.extractUrlBase(e);a=gn.resolveURL(l,this.path)}else a=gn.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new $s(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===of){try{a[qe.KHR_BINARY_GLTF]=new Fh(e)}catch(u){s&&s(u);return}r=JSON.parse(a[qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Gh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:a[u]=new yh;break;case qe.KHR_DRACO_MESH_COMPRESSION:a[u]=new Oh(r,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:a[u]=new Bh;break;case qe.KHR_MESH_QUANTIZATION:a[u]=new kh;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(i,s)}parseAsync(e,t){let i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}};function Rx(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}var qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},xh=class{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,s=t.cache.get(i);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new we(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],kt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new vi(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new rs(h),l.distance=u;break;case"spot":l=new Kr(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),$i(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return i._getNodeRef(t.cache,o,c)})}},yh=class{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return di}extendParams(e,t,i){let s=[];e.color=new we(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],kt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,Mt))}return Promise.all(s)}},vh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},bh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ee(o,o)}return Promise.all(r)}},Mh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Sh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},Th=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],kt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Mt)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},Eh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},wh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(o[0],o[1],o[2],kt),Promise.all(r)}},Ah=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Rh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(o[0],o[1],o[2],kt),a.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,Mt)),Promise.all(r)}},Ch=class{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},Ih=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:ni}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},Ph=class{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Lh=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Dh=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Nh=class{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}},Uh=class{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let s=t.meshes[i.mesh];for(let l of s.primitives)if(l.mode!==Mi.TRIANGLES&&l.mode!==Mi.TRIANGLE_STRIP&&l.mode!==Mi.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let g of u){let _=new Oe,m=new C,p=new Tt,E=new C(1,1,1),S=new ts(g.geometry,g.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&E.fromBufferAttribute(c.SCALE,v),S.setMatrixAt(v,_.compose(m,p,E));for(let v in c)if(v==="_COLOR_0"){let w=c[v];S.instanceColor=new Pn(w.array,w.itemSize,w.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,c[v]);ft.prototype.copy.call(S,g),this.parser.assignFinalMaterial(S),f.push(S)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},of="glTF",da=12,nf={JSON:1313821514,BIN:5130562},Fh=class{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,da),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==of)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-da,r=new DataView(e,da),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===nf.JSON){let l=new Uint8Array(e,da+a,o);this.content=i.decode(l)}else if(c===nf.BIN){let l=da+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Oh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=Vh[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Vh[h]||h.toLowerCase();if(a[h]!==void 0){let d=i.accessors[e.attributes[h]],f=lr[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(let g in f.attributes){let _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},o,l,kt,d)})})}},Bh=class{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},kh=class{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}},El=class extends dn{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,u=(i-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,E=1-m,S=p-d+u;for(let v=0;v!==o;v++){let w=a[_+v+o],A=a[_+v+c]*h,I=a[g+v+o],U=a[g+v]*h;r[v]=E*w+S*A+m*I+p*U}return r}},Cx=new Tt,zh=class extends El{interpolate_(e,t,i,s){let r=super.interpolate_(e,t,i,s);return Cx.fromArray(r).normalize().toArray(r),r}},Mi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},lr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sf={9728:Rt,9729:$t,9984:Bo,9985:Qs,9986:cs,9987:Li},rf={33071:zi,33648:Os,10497:Pi},mh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Vh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Bn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ix={CUBICSPLINE:void 0,LINEAR:Jn,STEP:jn},gh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Px(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new ii({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ci})),n.DefaultMaterial}function ms(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function $i(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Lx(n,e,t){let i=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(i){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):n.attributes.position;a.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):n.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):n.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return i&&(n.morphAttributes.position=h),s&&(n.morphAttributes.normal=u),r&&(n.morphAttributes.color=d),n.morphTargetsRelative=!0,n})}function Dx(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Nx(n){let e,t=n.extensions&&n.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+_h(t.attributes):e=n.indices+":"+_h(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+_h(n.targets[i]);return e}function _h(n){let e="",t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Hh(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ux(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Fx=new Oe,Gh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Rx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=i&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new Yr(this.options.manager):this.textureLoader=new $r(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new $s(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return ms(r,o,s),$i(o,s),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let s=i.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let s=e(t[i]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){i.load(gn.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){let t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=mh[s.type],o=lr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new At(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=mh[s.type],l=lr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,_,m;if(f&&f!==u){let p=Math.floor(d/f),E="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,S=t.cache.get(E);S||(_=new l(o,p*f,s.count*f/h),S=new Ws(_,f/h),t.cache.add(E,S)),m=new Xs(S,c,d%f/h,g)}else o===null?_=new l(s.count*c):_=new l(o,d,s.count*c),m=new At(_,c,g);if(s.sparse!==void 0){let p=mh.SCALAR,E=lr[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,w=new E(a[1],S,s.sparse.count*p),A=new l(a[2],v,s.sparse.count*c);o!==null&&(m=new At(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let I=0,U=w.length;I<U;I++){let M=w[I];if(m.setX(M,A[I*c]),c>=2&&m.setY(M,A[I*c+1]),c>=3&&m.setZ(M,A[I*c+2]),c>=4&&m.setW(M,A[I*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=i.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=sf[d.magFilter]||$t,h.minFilter=sf[d.minFilter]||Li,h.wrapS=rf[d.wrapS]||Pi,h.wrapT=rf[d.wrapT]||Pi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Rt&&h.minFilter!==$t,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=i.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){let m=new Ft(_);m.needsUpdate=!0,d(m)}),t.load(gn.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),$i(u,a),u.userData.mimeType=a.mimeType||Ux(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){let r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[qe.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new Ks,qt.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(o,c)),i=c}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new Ln,qt.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(o,c)),i=c}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=i.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(i))),i=c}e.material=i}getMaterialType(){return ii}loadMaterial(e){let t=this,i=this.json,s=this.extensions,r=i.materials[e],a,o={},c=r.extensions||{},l=[];if(c[qe.KHR_MATERIALS_UNLIT]){let u=s[qe.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new we(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],kt),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Mt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=bi);let h=r.alphaMode||gh.OPAQUE;if(h===gh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===gh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==di&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ee(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==di&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==di){let u=r.emissiveFactor;o.emissive=new we().setRGB(u[0],u[1],u[2],kt)}return r.emissiveTexture!==void 0&&a!==di&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Mt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),$i(u,r),t.associations.set(u,{materials:e}),r.extensions&&ms(s,u,r),u})}createUniqueName(e){let t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return af(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=Nx(l),u=s[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=af(new Ot,l,t),s[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?Px(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let _=h[f],m=a[f],p,E=l[f];if(m.mode===Mi.TRIANGLES||m.mode===Mi.TRIANGLE_STRIP||m.mode===Mi.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Fr(_,E):new Qe(_,E),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Mi.TRIANGLE_STRIP?p.geometry=ph(p.geometry,oa):m.mode===Mi.TRIANGLE_FAN&&(p.geometry=ph(p.geometry,ir));else if(m.mode===Mi.LINES)p=new Zs(_,E);else if(m.mode===Mi.LINE_STRIP)p=new un(_,E);else if(m.mode===Mi.LINE_LOOP)p=new Br(_,E);else if(m.mode===Mi.POINTS)p=new kr(_,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Dx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),$i(p,r),m.extensions&&ms(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ms(s,u[0],r),u[0];let d=new ui;r.extensions&&ms(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new St(Ui.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new mn(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),$i(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let d=new Oe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Or(o,c)})}loadAnimation(e){let t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let f=s.channels[u],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,E=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",E)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let S=0,v=d.length;S<v;S++){let w=d[S],A=f[S],I=g[S],U=_[S],M=m[S];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let b=i._createAnimationTracks(w,A,I,U,M);if(b)for(let P=0;P<b.length;P++)p.push(b[P])}let E=new qr(r,void 0,p);return $i(E,s),E})}createNodeMesh(e){let t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){let a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(i.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Fx)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new qs:l.length>1?h=new ui:l.length===1?h=l[0]:h=new ft,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),$i(h,r),r.extensions&&ms(i,h,r),r.matrix!==void 0){let u=new Oe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],s=this,r=new ui;i.name&&(r.name=s.createUniqueName(i.name)),$i(r,i),i.extensions&&ms(t,r,i);let a=i.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[d,f]of s.associations)(d instanceof qt||d instanceof Ft)&&u.set(d,f);return h.traverse(d=>{let f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,i,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];Bn[r.path]===Bn.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Bn[r.path]){case Bn.weights:l=Wi;break;case Bn.rotation:l=Xi;break;case Bn.translation:case Bn.scale:l=qi;break;default:switch(i.itemSize){case 1:l=Wi;break;case 2:case 3:default:l=qi;break}break}let h=s.interpolation!==void 0?Ix[s.interpolation]:Jn,u=this._getArrayFromAccessor(i);for(let d=0,f=c.length;d<f;d++){let g=new l(c[d]+"."+Bn[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Hh(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let s=this instanceof Xi?zh:El;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ox(n,e,t){let i=e.attributes,s=new zt;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new C(c[0],c[1],c[2]),new C(l[0],l[1],l[2])),o.normalized){let h=Hh(lr[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new C,c=new C;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let _=Hh(lr[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;let a=new ti;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function af(n,e,t){let i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){n.setAttribute(o,c)})}for(let a in i){let o=Vh[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){let a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return We.workingColorSpace!==kt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${We.workingColorSpace}" not supported.`),$i(n,e),Ox(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Lx(n,e.targets,t):n})}var wl=class extends In{constructor(){super();let e=new Cn;e.deleteAttribute("uv");let t=new ii({side:Vt}),i=new ii,s=new rs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Qe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new ts(e,i,6),o=new ft;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new Qe(e,cr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new Qe(e,cr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new Qe(e,cr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new Qe(e,cr(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new Qe(e,cr(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new Qe(e,cr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function cr(n){return new Gr({color:0,emissive:16777215,emissiveIntensity:n})}var hr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var pi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Bx=new mn(-1,1,1,-1,0,1),Wh=class extends Ot{constructor(){super(),this.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ut([0,2,0,0,2,0],2))}},kx=new Wh,kn=class{constructor(e){this._mesh=new Qe(kx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Bx)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Al=class extends pi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Fi.clone(e.uniforms),this.material=new Ct({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new kn(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var fa=class extends pi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Rl=class extends pi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Cl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new Ee);this._width=i.width,this._height=i.height,t=new jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ni}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Al(hr),this.copyPass.material.blending=Bt,this.clock=new jr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}fa!==void 0&&(a instanceof fa?i=!0:a instanceof Rl&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Il=class extends pi{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new we}render(e,t,i){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var Pl=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,s,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,c=Math.floor(e+o),l=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(c+l)*h,d=c-u,f=l-u,g=e-d,_=t-f,m,p;g>_?(m=1,p=0):(m=0,p=1);let E=g-m+h,S=_-p+h,v=g-1+2*h,w=_-1+2*h,A=c&255,I=l&255,U=this.perm[A+this.perm[I]]%12,M=this.perm[A+m+this.perm[I+p]]%12,b=this.perm[A+1+this.perm[I+1]]%12,P=.5-g*g-_*_;P<0?i=0:(P*=P,i=P*P*this._dot(this.grad3[U],g,_));let B=.5-E*E-S*S;B<0?s=0:(B*=B,s=B*B*this._dot(this.grad3[M],E,S));let V=.5-v*v-w*w;return V<0?r=0:(V*=V,r=V*V*this._dot(this.grad3[b],v,w)),70*(i+s+r)}noise3d(e,t,i){let s,r,a,o,l=(e+t+i)*.3333333333333333,h=Math.floor(e+l),u=Math.floor(t+l),d=Math.floor(i+l),f=1/6,g=(h+u+d)*f,_=h-g,m=u-g,p=d-g,E=e-_,S=t-m,v=i-p,w,A,I,U,M,b;E>=S?S>=v?(w=1,A=0,I=0,U=1,M=1,b=0):E>=v?(w=1,A=0,I=0,U=1,M=0,b=1):(w=0,A=0,I=1,U=1,M=0,b=1):S<v?(w=0,A=0,I=1,U=0,M=1,b=1):E<v?(w=0,A=1,I=0,U=0,M=1,b=1):(w=0,A=1,I=0,U=1,M=1,b=0);let P=E-w+f,B=S-A+f,V=v-I+f,q=E-U+2*f,Z=S-M+2*f,X=v-b+2*f,ie=E-1+3*f,H=S-1+3*f,ee=v-1+3*f,ce=h&255,ye=u&255,Fe=d&255,et=this.perm[ce+this.perm[ye+this.perm[Fe]]]%12,nt=this.perm[ce+w+this.perm[ye+A+this.perm[Fe+I]]]%12,Ke=this.perm[ce+U+this.perm[ye+M+this.perm[Fe+b]]]%12,Y=this.perm[ce+1+this.perm[ye+1+this.perm[Fe+1]]]%12,$=.6-E*E-S*S-v*v;$<0?s=0:($*=$,s=$*$*this._dot3(this.grad3[et],E,S,v));let de=.6-P*P-B*B-V*V;de<0?r=0:(de*=de,r=de*de*this._dot3(this.grad3[nt],P,B,V));let Ae=.6-q*q-Z*Z-X*X;Ae<0?a=0:(Ae*=Ae,a=Ae*Ae*this._dot3(this.grad3[Ke],q,Z,X));let pe=.6-ie*ie-H*H-ee*ee;return pe<0?o=0:(pe*=pe,o=pe*pe*this._dot3(this.grad3[Y],ie,H,ee)),32*(s+r+a+o)}noise4d(e,t,i,s){let r=this.grad4,a=this.simplex,o=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,u,d,f,g,_=(e+t+i+s)*c,m=Math.floor(e+_),p=Math.floor(t+_),E=Math.floor(i+_),S=Math.floor(s+_),v=(m+p+E+S)*l,w=m-v,A=p-v,I=E-v,U=S-v,M=e-w,b=t-A,P=i-I,B=s-U,V=M>b?32:0,q=M>P?16:0,Z=b>P?8:0,X=M>B?4:0,ie=b>B?2:0,H=P>B?1:0,ee=V+q+Z+X+ie+H,ce=a[ee][0]>=3?1:0,ye=a[ee][1]>=3?1:0,Fe=a[ee][2]>=3?1:0,et=a[ee][3]>=3?1:0,nt=a[ee][0]>=2?1:0,Ke=a[ee][1]>=2?1:0,Y=a[ee][2]>=2?1:0,$=a[ee][3]>=2?1:0,de=a[ee][0]>=1?1:0,Ae=a[ee][1]>=1?1:0,pe=a[ee][2]>=1?1:0,Xe=a[ee][3]>=1?1:0,Et=M-ce+l,R=b-ye+l,at=P-Fe+l,Ue=B-et+l,Ce=M-nt+2*l,ge=b-Ke+2*l,ot=P-Y+2*l,_e=B-$+2*l,Be=M-de+3*l,vt=b-Ae+3*l,pt=P-pe+3*l,T=B-Xe+3*l,x=M-1+4*l,O=b-1+4*l,W=P-1+4*l,j=B-1+4*l,G=m&255,ve=p&255,re=E&255,me=S&255,Se=o[G+o[ve+o[re+o[me]]]]%32,ne=o[G+ce+o[ve+ye+o[re+Fe+o[me+et]]]]%32,he=o[G+nt+o[ve+Ke+o[re+Y+o[me+$]]]]%32,Pe=o[G+de+o[ve+Ae+o[re+pe+o[me+Xe]]]]%32,Te=o[G+1+o[ve+1+o[re+1+o[me+1]]]]%32,oe=.6-M*M-b*b-P*P-B*B;oe<0?h=0:(oe*=oe,h=oe*oe*this._dot4(r[Se],M,b,P,B));let De=.6-Et*Et-R*R-at*at-Ue*Ue;De<0?u=0:(De*=De,u=De*De*this._dot4(r[ne],Et,R,at,Ue));let D=.6-Ce*Ce-ge*ge-ot*ot-_e*_e;D<0?d=0:(D*=D,d=D*D*this._dot4(r[he],Ce,ge,ot,_e));let Q=.6-Be*Be-vt*vt-pt*pt-T*T;Q<0?f=0:(Q*=Q,f=Q*Q*this._dot4(r[Pe],Be,vt,pt,T));let ae=.6-x*x-O*O-W*W-j*j;return ae<0?g=0:(ae*=ae,g=ae*ae*this._dot4(r[Te],x,O,W,j)),27*(h+u+d+f+g)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,s){return e[0]*t+e[1]*i+e[2]*s}_dot4(e,t,i,s,r){return e[0]*t+e[1]*i+e[2]*s+e[3]*r}};var pa={name:"SSAOShader",defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new Ee},cameraProjectionMatrix:{value:new Oe},cameraInverseProjectionMatrix:{value:new Oe},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == 1.0 ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},ma={name:"SSAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ga={name:"SSAOBlurShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Ee}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};var _a=class n extends pi{constructor(e,t,i=512,s=512,r=32){super(),this.width=i,this.height=s,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();let a=new is;a.format=On,a.type=Fn,this.normalRenderTarget=new jt(this.width,this.height,{minFilter:Rt,magFilter:Rt,type:Ni,depthTexture:a}),this.ssaoRenderTarget=new jt(this.width,this.height,{type:Ni}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Ct({defines:Object.assign({},pa.defines),uniforms:Fi.clone(pa.uniforms),vertexShader:pa.vertexShader,fragmentShader:pa.fragmentShader,blending:Bt}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Hr,this.normalMaterial.blending=Bt,this.blurMaterial=new Ct({defines:Object.assign({},ga.defines),uniforms:Fi.clone(ga.uniforms),vertexShader:ga.vertexShader,fragmentShader:ga.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Ct({defines:Object.assign({},ma.defines),uniforms:Fi.clone(ma.uniforms),vertexShader:ma.vertexShader,fragmentShader:ma.fragmentShader,blending:Bt}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Ct({uniforms:Fi.clone(hr.uniforms),vertexShader:hr.vertexShader,fragmentShader:hr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:bo,blendDst:ta,blendEquation:Ii,blendSrcAlpha:vo,blendDstAlpha:ta,blendEquationAlpha:Ii}),this._fsQuad=new kn(null),this._originalClearColor=new we}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,i){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case n.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Bt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Bt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Bt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=yo,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,i,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_generateSampleKernel(e){let t=this.kernel;for(let i=0;i<e;i++){let s=new C;s.x=Math.random()*2-1,s.y=Math.random()*2-1,s.z=Math.random(),s.normalize();let r=i/e;r=Ui.lerp(.1,1,r*r),s.multiplyScalar(r),t.push(s)}}_generateRandomKernelRotations(){let i=new Pl,s=16,r=new Float32Array(s);for(let a=0;a<s;a++){let o=Math.random()*2-1,c=Math.random()*2-1,l=0;r[a]=i.noise3d(o,c,l)}this.noiseTexture=new es(r,4,4,tr,ri),this.noiseTexture.wrapS=Pi,this.noiseTexture.wrapT=Pi,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}};_a.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};var xa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Ll=class extends pi{constructor(){super(),this.uniforms=Fi.clone(xa.uniforms),this.material=new Vr({name:xa.name,uniforms:this.uniforms,vertexShader:xa.vertexShader,fragmentShader:xa.fragmentShader}),this._fsQuad=new kn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},We.getTransfer(this._outputColorSpace)===tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Io?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Po?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Lo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===as?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===No?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Uo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Do&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ur=[{id:"leg",name:"\u5C0F\u817F\u9AA8",pinyin:"xi\u01CEo tu\u01D0",en:"Leg",count:2,color:"#a5ad85"},{id:"tarsal",name:"\u8DD7\u9AA8",pinyin:"f\u016B g\u01D4",en:"Tarsals",count:7,color:"#c49b65"},{id:"metatarsal",name:"\u8DD6\u9AA8",pinyin:"zh\xED g\u01D4",en:"Metatarsals",count:5,color:"#7fa4a4"},{id:"phalanges",name:"\u8DBE\u9AA8",pinyin:"zh\u01D0 g\u01D4",en:"Phalanges",count:14,color:"#a39aba"},{id:"sesamoid",name:"\u7C7D\u9AA8",pinyin:"z\u01D0 g\u01D4",en:"Sesamoids",count:2,color:"#cfaa92"}],gt=[{id:"talus",name:"\u8DDD\u9AA8",en:"Talus",group:"tarsal",region:"\u540E\u8DB3",feature:"\u6ED1\u8F66\u3001\u8DDD\u9AA8\u5934\u4E0E\u9888",description:"\u4F4D\u4E8E\u8DDF\u9AA8\u4E0A\u65B9\u3001\u821F\u9AA8\u540E\u65B9\u3002\u4E0A\u9762\u7684\u8DDD\u9AA8\u6ED1\u8F66\u4E0E\u5C0F\u817F\u7684\u80EB\u9AA8\u3001\u8153\u9AA8\u5171\u540C\u6784\u6210\u8E1D\u5173\u8282\uFF1B\u672C\u6A21\u578B\u4E0D\u5305\u542B\u5C0F\u817F\u9AA8\u3002",look:"\u5148\u770B\u4E0A\u65B9\u7684\u6ED1\u8F66\u6837\u66F2\u9762\uFF0C\u518D\u7ED5\u5230\u524D\u65B9\u770B\u8F83\u5706\u7684\u8DDD\u9AA8\u5934\u3002\u79FB\u5F00\u8DDD\u9AA8\uFF0C\u53EF\u4EE5\u89C2\u5BDF\u5B83\u4E0E\u8DDF\u9AA8\u76F8\u5BF9\u7684\u4E0B\u65B9\u9AA8\u9762\u3002",neighbors:["calcaneus","navicular"],tip:"\u4E0A\u63A5\u5C0F\u817F\uFF0C\u4E0B\u90BB\u8DDF\u9AA8\uFF0C\u524D\u90BB\u821F\u9AA8\u3002"},{id:"calcaneus",name:"\u8DDF\u9AA8",en:"Calcaneus",group:"tarsal",region:"\u540E\u8DB3",feature:"\u8DDF\u9AA8\u7ED3\u8282\u4E0E\u8F7D\u8DDD\u7A81",description:"\u5F62\u6210\u811A\u8DDF\uFF0C\u662F\u8DB3\u90E8\u6700\u5927\u7684\u8DD7\u9AA8\u3002\u4E0A\u65B9\u4E0E\u8DDD\u9AA8\u76F8\u5173\u8282\uFF0C\u524D\u65B9\u4E0E\u9AB0\u9AA8\u76F8\u5173\u8282\uFF0C\u540E\u90E8\u4E3A\u8DDF\u8171\u9644\u7740\u533A\u57DF\u3002",look:"\u8F6C\u5230\u8DB3\u5185\u4FA7\u5BFB\u627E\u5411\u5185\u4F38\u51FA\u7684\u8F7D\u8DDD\u7A81\uFF1B\u518D\u770B\u540E\u4E0B\u65B9\u5BBD\u5927\u7684\u8DDF\u9AA8\u7ED3\u8282\u3002\u8DB3\u5E95\u89C6\u89D2\u6700\u5BB9\u6613\u7406\u89E3\u5B83\u4E0E\u524D\u8DB3\u4E4B\u95F4\u7684\u7EB5\u5F13\u3002",neighbors:["talus","cuboid"],tip:"\u811A\u8DDF\u7684\u4E3B\u4F53\uFF0C\u4E0D\u662F\u8E1D\u90E8\u4E24\u4FA7\u7684\u51F8\u8D77\u3002"},{id:"navicular",name:"\u821F\u9AA8",en:"Navicular",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u540E\u65B9\u51F9\u9762\u4E0E\u821F\u9AA8\u7C97\u9686",description:"\u4F4D\u4E8E\u8DDD\u9AA8\u5934\u524D\u65B9\uFF0C\u524D\u9762\u8FDE\u63A5\u4E09\u5757\u6954\u9AA8\uFF0C\u53C2\u4E0E\u5185\u4FA7\u7EB5\u5F13\u7684\u6784\u6210\u3002\u8DB3\u5185\u4FA7\u53EF\u89C1\u5411\u5185\u7A81\u51FA\u7684\u821F\u9AA8\u7C97\u9686\u3002",look:"\u9694\u79BB\u540E\u8F6C\u5230\u540E\u9762\uFF0C\u770B\u627F\u63A5\u8DDD\u9AA8\u5934\u7684\u51F9\u5F62\u9AA8\u9762\uFF1B\u524D\u9762\u5219\u671D\u5411\u4E09\u5757\u6954\u9AA8\u3002\u6CE8\u610F\u5176\u4F4D\u7F6E\u5728\u8DB3\u5185\u4FA7\uFF0C\u4E0D\u5728\u5916\u4FA7\u3002",neighbors:["talus","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral"],tip:"\u8DDD\u9AA8 \u2192 \u821F\u9AA8 \u2192 \u4E09\u5757\u6954\u9AA8\u3002"},{id:"cuboid",name:"\u9AB0\u9AA8",pinyin:"t\xF3u g\u01D4",en:"Cuboid",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u8DB3\u5E95\u6C9F\u4E0E\u5916\u4FA7\u5217",description:"\u4F4D\u4E8E\u8DB3\u5916\u4FA7\uFF0C\u540E\u9762\u8FDE\u63A5\u8DDF\u9AA8\uFF0C\u524D\u9762\u4E3B\u8981\u8FDE\u63A5\u7B2C\u56DB\u3001\u7B2C\u4E94\u8DD6\u9AA8\u3002\u5B83\u662F\u5916\u4FA7\u7EB5\u5F13\u7684\u7EC4\u6210\u90E8\u5206\u3002",look:"\u4ECE\u8DB3\u5E95\u89C2\u5BDF\u9AB0\u9AA8\u4E0B\u65B9\u7684\u6C9F\u5F62\u533A\u57DF\uFF1B\u4ECE\u5916\u4FA7\u89C2\u5BDF\u8DDF\u9AA8\u3001\u9AB0\u9AA8\u548C\u7B2C\u4E94\u8DD6\u9AA8\u7684\u524D\u540E\u6392\u5217\u3002",neighbors:["calcaneus","cuneiform-lateral","metatarsal-4","metatarsal-5"],tip:"\u201C\u9AB0\u201D\u5728\u8FD9\u91CC\u8BFB t\xF3u\u3002\u8BB0\u4F4F\u5B83\u5728\u5C0F\u8DBE\u4E00\u4FA7\u3002"},{id:"cuneiform-medial",name:"\u5185\u4FA7\u6954\u9AA8",pinyin:"xi\u0113 g\u01D4",en:"Medial cuneiform",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u4E09\u5757\u6954\u9AA8\u4E2D\u6700\u5185\u4FA7\u7684\u4E00\u5757",description:"\u4F4D\u4E8E\u821F\u9AA8\u524D\u65B9\u3001\u7B2C\u4E00\u8DD6\u9AA8\u540E\u65B9\uFF0C\u662F\u4E09\u5757\u6954\u9AA8\u4E2D\u8F83\u5927\u7684\u4E00\u5757\u3002\u5B83\u4E0E\u7B2C\u4E00\u8DD6\u9AA8\u4E00\u8D77\u4F4D\u4E8E\u62C7\u8DBE\u4E00\u4FA7\u3002",look:"\u9694\u79BB\u540E\u6BD4\u8F83\u4E0A\u4E0B\u5BBD\u7A84\uFF1B\u5728\u539F\u4F4D\u89C2\u5BDF\u5B83\u5982\u4F55\u63A5\u7EED\u7B2C\u4E00\u8DD6\u9AA8\uFF0C\u4EE5\u53CA\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u4E0E\u90BB\u8FD1\u6954\u9AA8\u7684\u5D4C\u5408\u5173\u7CFB\u3002",neighbors:["navicular","cuneiform-intermediate","metatarsal-1","metatarsal-2"],tip:"\u5185\u4FA7\uFF1D\u62C7\u8DBE\u4FA7\uFF1B\u4E0D\u662F\u753B\u9762\u7684\u56FA\u5B9A\u5DE6\u4FA7\u3002"},{id:"cuneiform-intermediate",name:"\u4E2D\u95F4\u6954\u9AA8",pinyin:"xi\u0113 g\u01D4",en:"Intermediate cuneiform",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u5939\u5728\u4E24\u5757\u6954\u9AA8\u4E4B\u95F4",description:"\u4F4D\u4E8E\u5185\u4FA7\u3001\u5916\u4FA7\u6954\u9AA8\u4E4B\u95F4\uFF0C\u540E\u63A5\u821F\u9AA8\uFF0C\u524D\u63A5\u7B2C\u4E8C\u8DD6\u9AA8\u3002\u5B83\u8F83\u77ED\uFF0C\u4F7F\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u4F4D\u4E8E\u76F8\u90BB\u6954\u9AA8\u4E4B\u95F4\u3002",look:"\u4ECE\u8DB3\u80CC\u5F80\u4E0B\u770B\u4E09\u5757\u6954\u9AA8\u7684\u6392\u5217\uFF0C\u518D\u5C55\u5F00\u5C11\u91CF\u89C2\u5BDF\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u7684\u4F4D\u7F6E\u3002\u4E0D\u8981\u5C06\u89C2\u5BDF\u7528\u7684\u5C55\u5F00\u95F4\u9699\u5F53\u6210\u771F\u5B9E\u5173\u8282\u95F4\u9699\u3002",neighbors:["navicular","cuneiform-medial","cuneiform-lateral","metatarsal-2"],tip:"\u7531\u5185\u5411\u5916\uFF1A\u5185\u4FA7\u6954\u9AA8\u3001\u4E2D\u95F4\u6954\u9AA8\u3001\u5916\u4FA7\u6954\u9AA8\u3002"},{id:"cuneiform-lateral",name:"\u5916\u4FA7\u6954\u9AA8",pinyin:"xi\u0113 g\u01D4",en:"Lateral cuneiform",group:"tarsal",region:"\u4E2D\u8DB3",feature:"\u524D\u63A5\u7B2C\u4E09\u8DD6\u9AA8",description:"\u4F4D\u4E8E\u4E2D\u95F4\u6954\u9AA8\u5916\u4FA7\u3001\u9AB0\u9AA8\u5185\u4FA7\uFF0C\u540E\u63A5\u821F\u9AA8\uFF0C\u524D\u65B9\u4E3B\u8981\u8FDE\u63A5\u7B2C\u4E09\u8DD6\u9AA8\uFF0C\u5E76\u4E0E\u76F8\u90BB\u8DD6\u9AA8\u57FA\u5E95\u63A5\u89E6\u3002",look:"\u4ECE\u8DB3\u80CC\u8BC6\u522B\u5B83\u4E0E\u4E2D\u95F4\u6954\u9AA8\u3001\u9AB0\u9AA8\u7684\u8FB9\u754C\uFF1B\u79FB\u51FA\u540E\u8F6C\u52A8\uFF0C\u6BD4\u8F83\u5404\u4E2A\u5173\u8282\u9762\u7684\u65B9\u5411\u3002",neighbors:["navicular","cuneiform-intermediate","cuboid","metatarsal-2","metatarsal-3","metatarsal-4"],tip:"\u201C\u5916\u4FA7\u6954\u9AA8\u201D\u4ECD\u5728\u9AB0\u9AA8\u7684\u5185\u4FA7\u3002"}],Dl=["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94"],zx=["First","Second","Third","Fourth","Fifth"];for(let n=1;n<=5;n++)gt.push({id:`metatarsal-${n}`,name:`\u7B2C${Dl[n-1]}\u8DD6\u9AA8`,pinyin:"zh\xED g\u01D4",en:`${zx[n-1]} metatarsal`,group:"metatarsal",region:"\u524D\u8DB3",feature:n===1?"\u7C97\u58EE\u7684\u7B2C\u4E00\u8DD6\u9AA8\u4E0E\u8DD6\u9AA8\u5934":n===5?"\u7B2C\u4E94\u8DD6\u9AA8\u57FA\u5E95\u7684\u7C97\u9686":"\u57FA\u5E95\u3001\u9AA8\u5E72\u4E0E\u8DD6\u9AA8\u5934",description:`\u4ECE\u62C7\u8DBE\u4FA7\u5411\u5C0F\u8DBE\u4FA7\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C${Dl[n-1]}\u8DD6\u9AA8\u3002\u8FD1\u7AEF\u4E3A\u57FA\u5E95\uFF0C\u4E2D\u90E8\u4E3A\u9AA8\u5E72\uFF0C\u8FDC\u7AEF\u7684\u8DD6\u9AA8\u5934\u4E0E\u7B2C${Dl[n-1]}\u8DBE\u8FD1\u8282\u8DBE\u9AA8\u5F62\u6210\u8DD6\u8DBE\u5173\u8282\u3002`+(n===1?"\u7B2C\u4E00\u8DD6\u9AA8\u8F83\u7C97\u77ED\uFF0C\u5934\u4E0B\u65B9\u6709\u4E24\u5757\u7C7D\u9AA8\u3002":n===5?"\u57FA\u5E95\u5916\u4FA7\u7684\u7A81\u51FA\u79F0\u7B2C\u4E94\u8DD6\u9AA8\u7C97\u9686\u3002":""),look:n===2?"\u4ECE\u8DB3\u80CC\u89C2\u5BDF\u7B2C\u4E8C\u8DD6\u9AA8\u57FA\u5E95\u5982\u4F55\u4F4D\u4E8E\u6954\u9AA8\u4E4B\u95F4\uFF0C\u518D\u6CBF\u9AA8\u5E72\u770B\u5230\u524D\u65B9\u8F83\u5706\u7684\u8DD6\u9AA8\u5934\u3002":"\u6CBF\u957F\u8F74\u4ECE\u57FA\u5E95\u8F6C\u5230\u9AA8\u5934\uFF0C\u6BD4\u8F83\u524D\u540E\u4E24\u7AEF\u7684\u5F62\u72B6\u3002\u8DB3\u5E95\u89C6\u89D2\u53EF\u89C2\u5BDF\u8DD6\u9AA8\u5934\u7684\u6392\u5217\u3002",neighbors:[...n===1?["cuneiform-medial"]:n===2?["cuneiform-medial","cuneiform-intermediate","cuneiform-lateral"]:n===3?["cuneiform-lateral"]:["cuboid"],`proximal-${n}`,...n===1?["sesamoid-medial","sesamoid-lateral"]:[]],tip:"\u8DD6\u9AA8\u5728\u811A\u638C\u5185\u90E8\uFF1B\u8DBE\u9AA8\u624D\u662F\u811A\u8DBE\u4E2D\u7684\u9AA8\u3002"});for(let n=1;n<=5;n++)for(let[e,t,i]of[["proximal","\u8FD1\u8282","Proximal"],["middle","\u4E2D\u8282","Middle"],["distal","\u8FDC\u8282","Distal"]]){if(n===1&&e==="middle")continue;let s=n===1?"\u62C7\u8DBE":`\u7B2C${Dl[n-1]}\u8DBE`;gt.push({id:`${e}-${n}`,name:`${s}${t}\u8DBE\u9AA8`,en:`${i} phalanx \xB7 toe ${n}`,group:"phalanges",region:"\u524D\u8DB3",feature:e==="distal"?"\u672B\u7AEF\u81A8\u5927\u7684\u7C97\u9686":"\u57FA\u5E95\u3001\u9AA8\u4F53\u4E0E\u8FDC\u7AEF\u9AA8\u5934",description:`\u8FD9\u662F${s}\u7684${t}\u8DBE\u9AA8\u3002`+(n===1?"\u62C7\u8DBE\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\u4E24\u5757\u8DBE\u9AA8\uFF0C\u6CA1\u6709\u4E2D\u8282\u3002":"\u7B2C\u4E8C\u81F3\u7B2C\u4E94\u8DBE\u901A\u5E38\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u4E09\u5757\u8DBE\u9AA8\u3002")+(e==="proximal"?"\u5176\u57FA\u5E95\u5728\u540E\u65B9\u4E0E\u540C\u5217\u8DD6\u9AA8\u5934\u76F8\u5173\u8282\u3002":e==="distal"?"\u5B83\u4F4D\u4E8E\u811A\u8DBE\u6700\u672B\u7AEF\uFF0C\u672B\u7AEF\u5F62\u6001\u4E0D\u540C\u4E8E\u524D\u9762\u7684\u9AA8\u8282\u3002":"\u5B83\u4F4D\u4E8E\u8FD1\u8282\u548C\u8FDC\u8282\u4E4B\u95F4\u3002"),look:"\u5355\u72EC\u67E5\u770B\u540E\uFF0C\u8F6C\u52A8\u6BD4\u8F83\u57FA\u5E95\u7684\u51F9\u9762\u4E0E\u53E6\u4E00\u7AEF\u7684\u9AA8\u5F62\u3002\u56DE\u5230\u539F\u4F4D\uFF0C\u6CBF\u540C\u4E00\u811A\u8DBE\u4ECE\u540E\u5411\u524D\u4F9D\u6B21\u8BC6\u522B\u5404\u8282\u3002",neighbors:e==="proximal"?[`metatarsal-${n}`,`${n===1?"distal":"middle"}-${n}`]:e==="middle"?[`proximal-${n}`,`distal-${n}`]:[`${n===1?"proximal":"middle"}-${n}`],tip:n===1?"\u62C7\u8DBE 2 \u8282\uFF0C\u5176\u4F59\u56DB\u8DBE\u5404 3 \u8282\uFF0C\u5171 14 \u5757\u8DBE\u9AA8\u3002":"\u201C\u8FD1\u201D\u9760\u8FD1\u8DD6\u9AA8\uFF0C\u201C\u8FDC\u201D\u9760\u8FD1\u8DBE\u5C16\u3002"})}for(let[n,e]of[["medial","\u5185\u4FA7"],["lateral","\u5916\u4FA7"]])gt.push({id:`sesamoid-${n}`,name:`\u62C7\u8DBE${e}\u7C7D\u9AA8`,pinyin:"z\u01D0 g\u01D4",en:`${n==="medial"?"Medial":"Lateral"} hallux sesamoid`,group:"sesamoid",region:"\u524D\u8DB3 \xB7 \u8DB3\u5E95",feature:"\u7B2C\u4E00\u8DD6\u9AA8\u5934\u4E0B\u65B9\u7684\u5C0F\u9AA8",description:`\u4F4D\u4E8E\u7B2C\u4E00\u8DD6\u9AA8\u5934\u8DB3\u5E95\u4FA7\u7684${e}\uFF0C\u5C5E\u4E8E\u62C7\u8DBE\u7C7D\u9AA8\u3002\u7C7D\u9AA8\u5305\u57CB\u4E8E\u76F8\u5173\u808C\u8171\u7ED3\u6784\u4E2D\uFF1B\u672C\u56FE\u53EA\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u6CA1\u6709\u663E\u793A\u808C\u8171\u3002`,look:"\u5207\u6362\u8DB3\u5E95\u89C6\u89D2\uFF0C\u5728\u7B2C\u4E00\u8DD6\u9AA8\u5934\u4E0B\u65B9\u627E\u4E24\u5757\u5C0F\u9AA8\u3002\u9694\u79BB\u540E\u53EF\u4EE5\u66F4\u6E05\u6670\u5730\u770B\u5230\u5355\u4E2A\u7C7D\u9AA8\u7684\u5F62\u72B6\u3002",neighbors:["metatarsal-1"],tip:"\u8FD9\u91CC\u989D\u5916\u5C55\u793A 2 \u5757\u7C7D\u9AA8\uFF0C\u4E0D\u8BA1\u5165\u5E38\u8BF4\u7684 26 \u5757\u57FA\u672C\u8DB3\u9AA8\u3002"});gt.unshift({id:"tibia",name:"\u80EB\u9AA8",pinyin:"j\xECng g\u01D4",en:"Tibia",group:"leg",region:"\u5C0F\u817F \xB7 \u5185\u4FA7",feature:"\u4E0A\u7AEF\u3001\u9AA8\u5E72\u3001\u5185\u8E1D",description:"\u5C0F\u817F\u5185\u4FA7\u8F83\u7C97\u58EE\u7684\u957F\u9AA8\u3002\u4E0B\u7AEF\u4E0E\u8DDD\u9AA8\u5F62\u6210\u8E1D\u5173\u8282\u7684\u90E8\u5206\u5173\u8282\u9762\uFF0C\u5185\u4FA7\u5411\u4E0B\u7684\u7A81\u51FA\u662F\u5185\u8E1D\uFF1B\u4E0A\u7AEF\u671D\u5411\u819D\u90E8\uFF0C\u672C\u7248\u5C1A\u672A\u52A0\u5165\u80A1\u9AA8\u548C\u9ACC\u9AA8\u3002",look:"\u5148\u7528\u201C\u5C0F\u817F\u4E0E\u8DB3\u201D\u770B\u6574\u5757\u80EB\u9AA8\uFF0C\u518D\u5207\u5230\u201C\u8DB3\u8E1D\u201D\u770B\u5B83\u7684\u4E0B\u7AEF\u3002\u62C6\u51FA\u80EB\u9AA8\u5E76\u8F6C\u52A8\uFF0C\u6BD4\u8F83\u4E0B\u7AEF\u5173\u8282\u9762\u4E0E\u5185\u8E1D\u7684\u4F4D\u7F6E\uFF1B\u5355\u72EC\u67E5\u770B\u53EF\u4EE5\u89C2\u5BDF\u4E0A\u7AEF\u548C\u9AA8\u5E72\u3002",neighbors:["fibula","talus"],tip:"\u5185\u8E1D\u5C5E\u4E8E\u80EB\u9AA8\uFF0C\u4E0D\u662F\u53E6\u4E00\u5757\u72EC\u7ACB\u7684\u9AA8\u5934\u3002"},{id:"fibula",name:"\u8153\u9AA8",pinyin:"f\xE9i g\u01D4",en:"Fibula",group:"leg",region:"\u5C0F\u817F \xB7 \u5916\u4FA7",feature:"\u8153\u9AA8\u5934\u3001\u9AA8\u5E72\u3001\u5916\u8E1D",description:"\u5C0F\u817F\u5916\u4FA7\u7EC6\u957F\u7684\u9AA8\uFF0C\u4F4D\u4E8E\u80EB\u9AA8\u5916\u4FA7\u3002\u4E0A\u7AEF\u662F\u8153\u9AA8\u5934\uFF0C\u4E0B\u7AEF\u5411\u4E0B\u5EF6\u4F38\u5F62\u6210\u5916\u8E1D\uFF1B\u5916\u8E1D\u5185\u4FA7\u9762\u4E0E\u8DDD\u9AA8\u76F8\u5173\u8282\u3002\u8153\u9AA8\u4E0D\u76F4\u63A5\u4E0E\u80A1\u9AA8\u5F62\u6210\u5173\u8282\u3002",look:"\u5728\u201C\u5C0F\u817F\u4E0E\u8DB3\u201D\u4E2D\u6CBF\u7740\u7EC6\u957F\u9AA8\u5E72\u5411\u4E0B\u627E\u5230\u5916\u8E1D\uFF1B\u5728\u201C\u8DB3\u8E1D\u201D\u4E2D\uFF0C\u6BD4\u8F83\u5916\u8E1D\u3001\u5185\u8E1D\u548C\u8DDD\u9AA8\u7684\u7A7A\u95F4\u5173\u7CFB\u3002\u4F7F\u7528\u201C\u8F6C\u9AA8\u201D\u53EF\u4EE5\u89C2\u5BDF\u5916\u8E1D\u671D\u5411\u8DDD\u9AA8\u7684\u4E00\u9762\u3002",neighbors:["tibia","talus"],tip:"\u5916\u8E1D\u5C5E\u4E8E\u8153\u9AA8\uFF1B\u5185\u5916\u4FA7\u6309\u8EAB\u4F53\u65B9\u4F4D\u5224\u65AD\uFF0C\u4E0D\u6309\u5C4F\u5E55\u5DE6\u53F3\u3002"});var Xh=gt.find(n=>n.id==="talus");Xh.description="\u4F4D\u4E8E\u8DDF\u9AA8\u4E0A\u65B9\u3001\u821F\u9AA8\u540E\u65B9\u3002\u4E0A\u9762\u7684\u8DDD\u9AA8\u6ED1\u8F66\u4E0E\u80EB\u9AA8\u3001\u8153\u9AA8\u4E0B\u7AEF\u5171\u540C\u6784\u6210\u8E1D\u5173\u8282\u3002\u672C\u7248\u5DF2\u52A0\u5165\u4E24\u5757\u5B8C\u6574\u5C0F\u817F\u9AA8\uFF0C\u53EF\u5207\u6362\u201C\u8DB3\u8E1D\u201D\u89C2\u5BDF\u8FDE\u63A5\uFF0C\u6216\u5207\u6362\u201C\u5C0F\u817F\u4E0E\u8DB3\u201D\u770B\u5168\u8C8C\u3002";Xh.neighbors=["tibia","fibula",...Xh.neighbors];ur.unshift({id:"thigh",name:"\u5927\u817F\u4E0E\u819D",pinyin:"",en:"Thigh & knee",count:2,color:"#b59772"});gt.push({id:"femur",name:"\u80A1\u9AA8",en:"Femur",group:"thigh",region:"\u5927\u817F",feature:"\u80A1\u9AA8\u5934\u3001\u80A1\u9AA8\u9888\u3001\u5927\u5C0F\u8F6C\u5B50\u3001\u5185\u5916\u4FA7\u9AC1",description:"\u5927\u817F\u4E2D\u7684\u957F\u9AA8\u3002\u8FD1\u7AEF\u7684\u80A1\u9AA8\u5934\u671D\u5411\u5185\u4FA7\uFF0C\u4E0E\u9ACB\u9AA8\u7684\u9ACB\u81FC\u5F62\u6210\u9ACB\u5173\u8282\uFF1B\u672C\u671F\u5C1A\u672A\u52A0\u5165\u9ACB\u9AA8\u3002\u8FDC\u7AEF\u7684\u5185\u3001\u5916\u4FA7\u9AC1\u4E0E\u80EB\u9AA8\u4E0A\u7AEF\u6784\u6210\u819D\u5173\u8282\u7684\u9AA8\u6027\u90E8\u5206\uFF0C\u524D\u65B9\u7684\u9ACC\u9762\u4E0E\u9ACC\u9AA8\u76F8\u5173\u8282\u3002\u80A1\u9AA8\u4E0D\u76F4\u63A5\u4E0E\u8153\u9AA8\u76F8\u5173\u8282\u3002",look:"\u5148\u5728\u201C\u4E0B\u80A2\u5168\u89C8\u201D\u770B\u80A1\u9AA8\u7684\u5B8C\u6574\u5F62\u72B6\uFF1B\u5355\u72EC\u67E5\u770B\u540E\u6BD4\u8F83\u8FD1\u7AEF\u7684\u5706\u5F62\u80A1\u9AA8\u5934\u548C\u8FDC\u7AEF\u7684\u4E24\u4FA7\u9AC1\uFF08k\u0113\uFF09\u3002\u518D\u5207\u5230\u201C\u819D\u90E8\u201D\uFF0C\u79FB\u5F00\u9ACC\u9AA8\uFF0C\u67E5\u770B\u80A1\u9AA8\u8FDC\u7AEF\u524D\u65B9\u7684\u9ACC\u9762\uFF1B\u8F6C\u5230\u540E\u9762\u770B\u9AC1\u95F4\u7A9D\u3002",neighbors:["tibia","patella"],tip:"\u80A1\u9AA8\u5934\u5728\u4E0A\u7AEF\u3001\u671D\u5185\u4FA7\uFF1B\u819D\u90E8\u5728\u4E0B\u7AEF\u3002\u9AC1\u8BFB k\u0113\u3002\u4E0A\u65B9\u9ACB\u9AA8\u5C1A\u672A\u52A0\u5165\u3002"},{id:"patella",name:"\u9ACC\u9AA8",pinyin:"b\xECn g\u01D4",en:"Patella",group:"thigh",region:"\u819D\u524D\u65B9",feature:"\u524D\u9762\u3001\u540E\u65B9\u5173\u8282\u9762\u3001\u5E95\u4E0E\u5C16",description:"\u4FD7\u79F0\u819D\u76D6\u9AA8\uFF0C\u4F4D\u4E8E\u819D\u5173\u8282\u524D\u65B9\uFF0C\u5305\u57CB\u4E8E\u80A1\u56DB\u5934\u808C\u8171\u4E2D\uFF0C\u662F\u4E00\u5757\u7C7D\u9AA8\u3002\u540E\u65B9\u5173\u8282\u9762\u4E0E\u80A1\u9AA8\u7684\u9ACC\u9762\u76F8\u5173\u8282\uFF0C\u5E76\u4E0D\u76F4\u63A5\u4E0E\u80EB\u9AA8\u5F62\u6210\u5173\u8282\u3002\u672C\u6A21\u578B\u6CA1\u6709\u663E\u793A\u808C\u8171\u3001\u9ACC\u97E7\u5E26\u6216\u5173\u8282\u8F6F\u9AA8\u3002",look:"\u5728\u201C\u819D\u90E8\u201D\u4ECE\u524D\u65B9\u627E\u5230\u8FD9\u5757\u5C0F\u9AA8\u3002\u4F7F\u7528\u201C\u62C6\u9AA8\u201D\u628A\u5B83\u5411\u65C1\u8FB9\u79FB\u51FA\uFF0C\u518D\u7528\u201C\u8F6C\u9AA8\u201D\u6BD4\u8F83\u524D\u9762\u548C\u671D\u5411\u80A1\u9AA8\u7684\u540E\u9762\uFF1B\u5355\u72EC\u67E5\u770B\u53EF\u907F\u514D\u5468\u56F4\u9AA8\u5934\u906E\u6321\u3002",neighbors:["femur"],tip:"\u9ACC\u9AA8\u8BFB b\xECn g\u01D4\u3002\u5B83\u63A5\u89E6\u80A1\u9AA8\uFF0C\u4E0D\u76F4\u63A5\u4E0E\u80EB\u9AA8\u76F8\u5173\u8282\uFF1B\u4E0D\u8981\u628A\u81EA\u7531\u62C6\u89E3\u5F53\u4F5C\u771F\u5B9E\u8FD0\u52A8\u3002"});var Nl=gt.find(n=>n.id==="tibia");Nl.neighbors=["femur",...Nl.neighbors];Nl.description="\u5C0F\u817F\u5185\u4FA7\u8F83\u7C97\u58EE\u7684\u957F\u9AA8\uFF0C\u4E0A\u7AEF\u5185\u3001\u5916\u4FA7\u9AC1\u4E0E\u80A1\u9AA8\u8FDC\u7AEF\u6784\u6210\u819D\u5173\u8282\u7684\u9AA8\u6027\u90E8\u5206\uFF1B\u5916\u4FA7\u4E0E\u8153\u9AA8\u76F8\u90BB\u3002\u4E0B\u7AEF\u5411\u5185\u5EF6\u4F38\u5F62\u6210\u5185\u8E1D\uFF0C\u4E0E\u8DDD\u9AA8\u5171\u540C\u53C2\u4E0E\u8E1D\u5173\u8282\u3002\u672C\u671F\u5DF2\u52A0\u5165\u80A1\u9AA8\u3001\u9ACC\u9AA8\uFF0C\u53EF\u5207\u6362\u201C\u819D\u90E8\u201D\u89C2\u5BDF\u4E0A\u4E0B\u8854\u63A5\u3002";Nl.look="\u5148\u6CBF\u5B8C\u6574\u9AA8\u5E72\u6BD4\u8F83\u4E0A\u4E0B\u4E24\u7AEF\uFF0C\u518D\u5207\u6362\u201C\u819D\u90E8\u201D\u770B\u4E0A\u7AEF\u80EB\u9AA8\u5E73\u53F0\u4E0E\u80A1\u9AA8\u7684\u5173\u7CFB\uFF1B\u5207\u6362\u201C\u8DB3\u8E1D\u201D\u770B\u4E0B\u7AEF\u53CA\u5185\u8E1D\u3002\u819D\u90E8\u7684\u95F4\u9699\u4E0D\u4EE3\u8868\u7A7A\u65E0\u4E00\u7269\uFF0C\u672C\u7248\u6CA1\u6709\u663E\u793A\u534A\u6708\u677F\u548C\u8F6F\u9AA8\u3002";ur.unshift({id:"pelvis",name:"\u9AA8\u76C6",pinyin:"",en:"Bony pelvis",count:4,color:"#a99775"});gt.push({id:"hip-right",name:"\u53F3\u9ACB\u9AA8",pinyin:"ku\u0101n g\u01D4",en:"Right hip bone",group:"pelvis",region:"\u9AA8\u76C6 \xB7 \u53F3\u4FA7",feature:"\u9AC2\u5D74\u3001\u9ACB\u81FC\u3001\u95ED\u5B54\u4E0E\u5750\u9AA8\u7ED3\u8282",description:"\u9AA8\u76C6\u53F3\u4FA7\u7684\u9ACB\u9AA8\u3002\u6210\u4EBA\u9ACB\u9AA8\u7531\u9AC2\u9AA8\u3001\u5750\u9AA8\u3001\u803B\u9AA8\u878D\u5408\u800C\u6210\uFF0C\u672C\u9875\u6309\u4E00\u5757\u5B8C\u6574\u9AA8\u663E\u793A\uFF0C\u4E0D\u628A\u8FD9\u4E09\u4E2A\u533A\u57DF\u5F53\u4F5C\u53EF\u4EE5\u6D3B\u52A8\u7684\u4E09\u5757\u9AA8\u3002\u5916\u4FA7\u7684\u9ACB\u81FC\u4E0E\u53F3\u80A1\u9AA8\u5934\u7EC4\u6210\u9ACB\u5173\u8282\uFF1B\u540E\u65B9\u4E0E\u9AB6\u9AA8\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\uFF0C\u524D\u65B9\u7ECF\u803B\u9AA8\u8054\u5408\u4E0E\u5DE6\u9ACB\u9AA8\u8FDE\u63A5\u3002",look:"\u5207\u5230\u201C\u53F3\u9ACB\u90E8\u201D\u89C2\u5BDF\u80A1\u9AA8\u5934\u4E0E\u9ACB\u81FC\uFF08ku\u0101n ji\xF9\uFF09\u7684\u8854\u63A5\uFF0C\u79FB\u5F00\u80A1\u9AA8\u540E\u67E5\u770B\u7A9D\u72B6\u7684\u9ACB\u81FC\uFF1B\u5355\u72EC\u67E5\u770B\u65F6\uFF0C\u6BD4\u8F83\u4E0A\u65B9\u7684\u9AC2\uFF08qi\xE0\uFF09\u9AA8\u7FFC\u3001\u4E0B\u65B9\u7684\u95ED\u5B54\u4E0E\u540E\u4E0B\u65B9\u7684\u5750\u9AA8\u7ED3\u8282\u3002",neighbors:["femur","sacrum","hip-left"],tip:"\u53F3\u4FA7\u6307\u4EBA\u4F53\u81EA\u8EAB\u7684\u53F3\u4FA7\uFF0C\u4E0D\u662F\u5C4F\u5E55\u53F3\u8FB9\u3002\u9AC2\u9AA8\u3001\u5750\u9AA8\u3001\u803B\u9AA8\u662F\u6210\u4EBA\u9ACB\u9AA8\u7684\u4E09\u4E2A\u878D\u5408\u533A\u57DF\u3002"},{id:"hip-left",name:"\u5DE6\u9ACB\u9AA8",pinyin:"ku\u0101n g\u01D4",en:"Left hip bone",group:"pelvis",region:"\u9AA8\u76C6 \xB7 \u5DE6\u4FA7",feature:"\u9ACB\u81FC\u3001\u9AC2\u9AA8\u7FFC\u4E0E\u803B\u9AA8\u8054\u5408\u9762",description:"\u9AA8\u76C6\u5DE6\u4FA7\u7684\u9ACB\u9AA8\uFF0C\u4E0E\u53F3\u9ACB\u9AA8\u53CA\u9AB6\u9AA8\u3001\u5C3E\u9AA8\u7EC4\u6210\u9AA8\u6027\u9AA8\u76C6\u3002\u5916\u4FA7\u9ACB\u81FC\u7528\u4E8E\u5BB9\u7EB3\u5DE6\u80A1\u9AA8\u5934\uFF1B\u672C\u671F\u5C1A\u672A\u52A0\u5165\u5DE6\u80A1\u9AA8\u548C\u5DE6\u4E0B\u80A2\uFF0C\u56E0\u6B64\u8FD9\u4FA7\u9ACB\u81FC\u5448\u7A7A\u51FA\u72B6\u6001\uFF0C\u4E0D\u662F\u6A21\u578B\u52A0\u8F7D\u5931\u8D25\u3002\u524D\u65B9\u7ECF\u803B\u9AA8\u8054\u5408\u4E0E\u53F3\u9ACB\u9AA8\u76F8\u63A5\u3002",look:"\u5207\u5230\u201C\u9AA8\u76C6\u201D\uFF0C\u5BF9\u7167\u5DE6\u53F3\u4E24\u5757\u9ACB\u9AA8\uFF1B\u4ECE\u5916\u4FA7\u89C2\u5BDF\u9ACB\u81FC\uFF0C\u4ECE\u5185\u4FA7\u89C2\u5BDF\u9AC2\u7A9D\uFF0C\u518D\u8F6C\u5230\u524D\u65B9\u6BD4\u8F83\u4E24\u4FA7\u803B\u9AA8\u8054\u5408\u9762\u7684\u76F8\u5BF9\u4F4D\u7F6E\u3002\u672C\u6A21\u578B\u672A\u663E\u793A\u803B\u9AA8\u95F4\u76D8\u3002",neighbors:["sacrum","hip-right"],tip:"\u5DE6\u9ACB\u9AA8\u4F7F\u7528\u539F\u59CB\u6A21\u578B\u53D1\u5E03\u7684\u5DE6\u4FA7\u7F51\u683C\u53CA\u53D8\u6362\u3002\u672C\u671F\u53EA\u63A5\u5165\u53F3\u4E0B\u80A2\uFF0C\u5DE6\u4FA7\u80A1\u9AA8\u5C1A\u672A\u52A0\u5165\u3002"},{id:"sacrum",name:"\u9AB6\u9AA8",pinyin:"d\u01D0 g\u01D4",en:"Sacrum",group:"pelvis",region:"\u9AA8\u76C6\u540E\u65B9 \xB7 \u810A\u67F1\u4E0B\u7AEF",feature:"\u9AB6\u5CAC\u3001\u524D\u540E\u9AB6\u5B54\u4E0E\u8033\u72B6\u9762",description:"\u4F4D\u4E8E\u4E24\u5757\u9ACB\u9AA8\u4E4B\u95F4\u3001\u9AA8\u76C6\u540E\u65B9\uFF0C\u7531\u9AB6\u690E\u878D\u5408\u5F62\u6210\u3002\u4E24\u4FA7\u4E0E\u9ACB\u9AA8\u7684\u9AC2\u9AA8\u533A\u57DF\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\uFF1B\u4E0A\u65B9\u627F\u63A5\u8170\u690E\uFF0C\u4E0B\u7AEF\u8FDE\u63A5\u5C3E\u9AA8\u3002\u672C\u671F\u672A\u52A0\u5165\u8170\u690E\uFF0C\u56E0\u6B64\u9AB6\u9AA8\u4E0A\u65B9\u4FDD\u7559\u4E3A\u7A7A\u3002",look:"\u5148\u4ECE\u524D\u65B9\u770B\u8F83\u51F9\u7684\u76C6\u9762\u53CA\u524D\u9AB6\u5B54\uFF0C\u518D\u7528\u201C\u540E\u9762\u201D\u89C6\u89D2\u6BD4\u8F83\u540E\u65B9\u7684\u9AA8\u5D74\u4E0E\u540E\u9AB6\u5B54\uFF1B\u79FB\u5F00\u4E00\u4FA7\u9ACB\u9AA8\uFF0C\u89C2\u5BDF\u4E24\u9AA8\u76F8\u5BF9\u7684\u8033\u72B6\u9762\u3002\u8868\u9762\u7CBE\u5EA6\u53D7\u6E90\u7F51\u683C\u9650\u5236\u3002",neighbors:["hip-right","hip-left","coccyx"],tip:"\u9AB6\u8BFB d\u01D0\u3002\u89C2\u5BDF\u5C55\u5F00\u4E0D\u8868\u793A\u9AB6\u9AC2\u5173\u8282\u53EF\u4EE5\u50CF\u6A21\u578B\u4E00\u6837\u5927\u5E45\u5206\u79BB\u6216\u8F6C\u52A8\u3002"},{id:"coccyx",name:"\u5C3E\u9AA8",en:"Coccyx",group:"pelvis",region:"\u9AB6\u9AA8\u4E0B\u65B9 \xB7 \u810A\u67F1\u672B\u7AEF",feature:"\u5C3E\u9AA8\u5E95\u4E0E\u5C3E\u9AA8\u5C16",description:"\u4F4D\u4E8E\u9AB6\u9AA8\u4E0B\u65B9\u7684\u810A\u67F1\u672B\u7AEF\u5C0F\u9AA8\uFF0C\u7531\u5C3E\u690E\u6784\u6210\uFF0C\u878D\u5408\u7A0B\u5EA6\u5B58\u5728\u4E2A\u4F53\u5DEE\u5F02\u3002\u672C\u6A21\u578B\u5C06\u5176\u4F5C\u4E3A\u4E00\u4E2A\u5B8C\u6574\u9AA8\u5757\uFF0C\u53EF\u4ECE\u9AB6\u9AA8\u4E0B\u7AEF\u7684\u8FDE\u63A5\u5904\u5B9A\u4F4D\u3002\u5468\u56F4\u8F6F\u7EC4\u7EC7\u6CA1\u6709\u5728\u672C\u9875\u663E\u793A\u3002",look:"\u5728\u201C\u9AA8\u76C6\u201D\u9009\u62E9\u5C3E\u9AA8\u540E\u70B9\u51FB\u201C\u5355\u72EC\u67E5\u770B\u201D\uFF0C\u653E\u5927\u8F6C\u52A8\u89C2\u5BDF\uFF1B\u56DE\u5230\u533A\u57DF\u540E\uFF0C\u4ECE\u540E\u9762\u6216\u4FA7\u9762\u770B\u5B83\u4E0E\u9AB6\u9AA8\u4E0B\u7AEF\u7684\u6392\u5217\u3002\u5B83\u8F83\u5C0F\uFF0C\u5FC5\u8981\u65F6\u5148\u9690\u85CF\u5468\u56F4\u9ACB\u9AA8\u3002",neighbors:["sacrum"],tip:"\u5C3E\u9AA8\u4E0D\u662F\u5750\u9AA8\u3002\u9700\u8981\u8FD1\u770B\u65F6\u4F7F\u7528\u201C\u5355\u72EC\u67E5\u770B\u201D\uFF0C\u4E0D\u5FC5\u628A\u6574\u4E2A\u9AA8\u76C6\u653E\u5F97\u5F88\u5927\u3002"});var ya=gt.find(n=>n.id==="femur");ya.neighbors=["hip-right",...ya.neighbors];ya.description="\u5927\u817F\u4E2D\u7684\u957F\u9AA8\u3002\u4E0A\u7AEF\u7684\u80A1\u9AA8\u5934\u671D\u5411\u5185\u4FA7\uFF0C\u4E0E\u53F3\u9ACB\u9AA8\u7684\u9ACB\u81FC\u6784\u6210\u9ACB\u5173\u8282\uFF0C\u672C\u671F\u5DF2\u52A0\u5165\u5B8C\u6574\u9AA8\u76C6\u3002\u4E0B\u7AEF\u7684\u5185\u5916\u4FA7\u9AC1\u4E0E\u80EB\u9AA8\u4E0A\u7AEF\u6784\u6210\u819D\u5173\u8282\u7684\u9AA8\u6027\u90E8\u5206\uFF0C\u524D\u65B9\u9ACC\u9762\u4E0E\u9ACC\u9AA8\u76F8\u5173\u8282\uFF1B\u4E0D\u76F4\u63A5\u4E0E\u8153\u9AA8\u76F8\u5173\u8282\u3002";ya.look="\u5207\u5230\u201C\u53F3\u9ACB\u90E8\u201D\u67E5\u770B\u5706\u5F62\u80A1\u9AA8\u5934\u3001\u8F83\u7EC6\u7684\u80A1\u9AA8\u9888\u4E0E\u9ACB\u81FC\u7684\u8854\u63A5\uFF1B\u7528\u201C\u62C6\u9AA8\u201D\u79FB\u5F00\u80A1\u9AA8\uFF0C\u6BD4\u8F83\u4E24\u4FA7\u76F8\u5BF9\u9AA8\u9762\u3002\u5355\u72EC\u67E5\u770B\u5B8C\u6574\u80A1\u9AA8\uFF0C\u518D\u5207\u5230\u201C\u819D\u90E8\u201D\u89C2\u5BDF\u4E0B\u7AEF\u3002";ya.tip="\u672C\u671F\u5DF2\u52A0\u5165\u53F3\u9ACB\u9AA8\u3002\u9ACB\u5173\u8282\u5728\u80A1\u9AA8\u4E0A\u7AEF\uFF0C\u819D\u5173\u8282\u5728\u4E0B\u7AEF\uFF1B\u672C\u9875\u4E0D\u663E\u793A\u8F6F\u9AA8\u6216\u9ACB\u81FC\u5507\u3002";var lf=gt.filter(n=>n.group!=="pelvis"),Vx=new Set(lf.map(n=>n.id));for(let n of lf){let e={...n,id:n.id+"-left",name:"\u5DE6"+n.name,en:"Left "+n.en,side:"left",baseId:n.id,description:n.description.replaceAll("\u53F3","\u5DE6"),look:n.look.replaceAll("\u53F3\u9ACB\u90E8","\u9ACB\u90E8"),tip:n.tip.replaceAll("\u53F3","\u5DE6"),neighbors:n.neighbors.map(t=>Vx.has(t)?t+"-left":t==="hip-right"?"hip-left":t)};n.name="\u53F3"+n.name,n.en="Right "+n.en,n.side="right",n.baseId=n.id,n.look=n.look.replaceAll("\u53F3\u9ACB\u90E8","\u9ACB\u90E8"),gt.push(e)}for(let n of gt.filter(e=>e.group==="pelvis"))n.side=n.id==="hip-right"?"right":n.id==="hip-left"?"left":"midline",n.baseId=n.id;var Yh=gt.find(n=>n.id==="hip-left");Yh.neighbors=["femur-left","sacrum","hip-right"];Yh.description="\u9AA8\u76C6\u5DE6\u4FA7\u7684\u9ACB\u9AA8\u3002\u5916\u4FA7\u9ACB\u81FC\u4E0E\u5DE6\u80A1\u9AA8\u5934\u6784\u6210\u5DE6\u9ACB\u5173\u8282\uFF1B\u672C\u7248\u5DF2\u8865\u9F50\u5DE6\u4FA7\u5927\u817F\u3001\u5C0F\u817F\u548C\u8DB3\u90E8\u3002\u524D\u65B9\u7ECF\u803B\u9AA8\u8054\u5408\u4E0E\u53F3\u9ACB\u9AA8\u8FDE\u63A5\uFF0C\u540E\u65B9\u4E0E\u9AB6\u9AA8\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\u3002\u6210\u4EBA\u9ACB\u9AA8\u6574\u4F53\u663E\u793A\u3002";Yh.tip="\u5DE6\u4FA7\u6307\u4EBA\u4F53\u81EA\u8EAB\u7684\u5DE6\u4FA7\uFF1B\u6B63\u9762\u89C2\u5BDF\u65F6\u901A\u5E38\u5728\u5C4F\u5E55\u53F3\u8FB9\u3002\u5DE6\u4FA7\u6A21\u578B\u4F7F\u7528\u6E90\u6587\u4EF6\u81EA\u5E26\u7684\u7F51\u683C\u4E0E\u53CD\u5C04\u53D8\u6362\u3002";gt.find(n=>n.id==="hip-right").look=gt.find(n=>n.id==="hip-right").look.replaceAll("\u53F3\u9ACB\u90E8","\u9ACB\u90E8");var qh=gt.find(n=>n.id==="sacrum");qh.neighbors=["L5",...qh.neighbors];qh.description="\u4F4D\u4E8E\u4E24\u5757\u9ACB\u9AA8\u4E4B\u95F4\u3001\u9AA8\u76C6\u540E\u65B9\uFF0C\u7531\u9AB6\u690E\u878D\u5408\u5F62\u6210\u3002\u4E24\u4FA7\u4E0E\u9ACB\u9AA8\u5F62\u6210\u9AB6\u9AC2\u5173\u8282\uFF1B\u4E0A\u65B9\u627F\u63A5\u7B2C\u4E94\u8170\u690E L5\uFF0C\u4E0B\u7AEF\u8FDE\u63A5\u5C3E\u9AA8\u3002\u672C\u7248\u5DF2\u52A0\u5165 L1\u2014L5\uFF0C\u690E\u95F4\u76D8\u548C\u97E7\u5E26\u672A\u663E\u793A\u3002";ur.unshift({id:"lumbar",name:"\u8170\u690E",pinyin:"y\u0101o zhu\u012B",en:"Lumbar vertebrae",count:5,color:"#8b9fa7"});for(let n=1;n<=5;n++)gt.push({id:"L"+n,baseId:"L"+n,side:"midline",name:"\u7B2C"+["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94"][n-1]+"\u8170\u690E",en:"Lumbar vertebra L"+n,group:"lumbar",region:"\u8170\u90E8 \xB7 L"+n,feature:"\u690E\u4F53\u3001\u690E\u5F13\u3001\u68D8\u7A81\u4E0E\u5173\u8282\u7A81",description:"\u8170\u690E\u7531\u4E0A\u5411\u4E0B\u7F16\u53F7 L1\u2014L5\uFF0C\u8FD9\u662F\u7B2C"+["\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94"][n-1]+"\u8170\u690E\uFF08L"+n+"\uFF09\u3002"+(n===1?"\u4E0A\u65B9\u63A5\u7B2C\u5341\u4E8C\u80F8\u690E\uFF0C\u672C\u671F\u80F8\u690E\u5C1A\u672A\u52A0\u5165\u3002":n===5?"\u4E0B\u65B9\u4E0E\u9AB6\u9AA8\u5F62\u6210\u8170\u9AB6\u8FDE\u63A5\uFF0C\u662F\u8170\u690E\u4E0E\u9AA8\u76C6\u4E4B\u95F4\u7684\u8854\u63A5\u5904\u3002":"\u4F4D\u4E8E L"+(n-1)+" \u4E0E L"+(n+1)+" \u4E4B\u95F4\u3002")+"\u524D\u65B9\u8F83\u5927\u7684\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\u56F4\u51FA\u690E\u5B54\u3002\u76F8\u90BB\u690E\u4F53\u95F4\u7684\u690E\u95F4\u76D8\u672A\u663E\u793A\uFF0C\u753B\u9762\u95F4\u9699\u4E0D\u4EE3\u8868\u4F53\u5185\u7A7A\u65E0\u4E00\u7269\u3002",look:"\u5148\u4ECE\u4FA7\u9762\u770B\u8FD9\u8282\u690E\u9AA8\u5728\u6574\u6BB5\u8170\u690E\u4E2D\u7684\u6392\u5217\uFF0C\u518D\u5355\u72EC\u67E5\u770B\uFF0C\u6BD4\u8F83\u524D\u65B9\u690E\u4F53\u3001\u540E\u65B9\u68D8\u7A81\u548C\u4E24\u4FA7\u6A2A\u7A81\u3002\u8F6C\u5230\u4E0A\u65B9\u89C2\u5BDF\u690E\u5B54\uFF0C\u6CE8\u610F\u76F8\u90BB\u690E\u9AA8\u5173\u8282\u7A81\u7684\u76F8\u5BF9\u671D\u5411\u3002"+(n===5?"\u56DE\u5230\u201C\u8170\u9AB6\u4E0E\u9AA8\u76C6\u201D\uFF0C\u6BD4\u8F83 L5 \u4E0E\u9AB6\u9AA8\u4E0A\u7AEF\u7684\u65B9\u5411\u3002":""),neighbors:[...n>1?["L"+(n-1)]:[],...n<5?["L"+(n+1)]:["sacrum"]],tip:"L"+n+" \u662F\u7F16\u53F7\uFF0C\u4E0D\u662F\u989D\u5916\u9AA8\u5757\u3002\u6B64\u9875\u53EA\u5C55\u793A\u9AA8\u8868\u9762\uFF1B\u6CA1\u6709\u690E\u95F4\u76D8\u3001\u795E\u7ECF\u3001\u810A\u9AD3\u6216\u75BE\u75C5\u3001\u590D\u4F4D\u6A21\u62DF\u3002"});for(let n of ur)n.count=gt.filter(e=>e.group===n.id).length;if(gt.length!==73||new Set(gt.map(n=>n.id)).size!==73)throw Error("Bone metadata incomplete");var Hx=new Set(gt.map(n=>n.id));for(let n of gt)for(let e of n.neighbors)if(!Hx.has(e))throw Error("Unknown neighbor "+e);var zM=Object.fromEntries(gt.map((n,e)=>[n.id,{...n,index:e+1}])),cf=[{title:"OpenStax \xB7 \u810A\u67F1\u4E0E\u8170\u690E",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",note:"L1\u2014L5\u3001\u8170\u9AB6\u8854\u63A5\u3001\u690E\u4F53\u4E0E\u690E\u5F13\u7684\u6559\u5B66\u53C2\u8003\u3002"},{title:"OpenStax \xB7 \u9AA8\u76C6\u4E0E\u9ACB\u9AA8",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/8-3-the-pelvic-girdle-and-pelvis",note:"\u9AA8\u76C6\u3001\u6210\u4EBA\u9ACB\u9AA8\u878D\u5408\u533A\u57DF\u3001\u9AB6\u9AC2\u5173\u8282\u4E0E\u803B\u9AA8\u8054\u5408\u7684\u6559\u5B66\u53C2\u8003\u3002"},{title:"OpenStax \xB7 \u4E0B\u80A2\u9AA8\u4E0E\u819D\u90E8\u89E3\u5256",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/8-4-bones-of-the-lower-limb",note:"\u80A1\u9AA8\u3001\u9ACC\u9AA8\u3001\u80EB\u8153\u9AA8\u53CA\u819D\u8E1D\u9AA8\u6027\u5173\u7CFB\u7684\u6559\u5B66\u53C2\u8003\u3002"},{title:"Z-Anatomy \xB7 \u539F\u59CB\u89E3\u5256\u56FE\u8C31",url:"https://github.com/Z-Anatomy/Models-of-human-anatomy",note:"Gauthier Kervyn \u4E0E\u8D21\u732E\u8005\uFF1B\u6A21\u578B\u8BB8\u53EF CC BY-SA 4.0\u3002"},{title:"BodyParts3D \xB7 \u4E0A\u6E38\u6570\u636E\u5E93\u4E0E\u5EFA\u6A21\u8BF4\u660E",url:"https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html",note:"\xA9 The Database Center for Life Science\uFF1B\u4E0A\u6E38\u6570\u636E CC BY-SA 2.1 Japan\u3002"},{title:"\u672C\u6B21\u63D0\u53D6\u4F7F\u7528\u7684 Z-Anatomy GLB \u5BFC\u51FA",url:"https://github.com/Liyucheng1997/242_lab-human-anatomy/blob/main/public/models/skeleton.glb",note:"\u6765\u6E90\u6587\u4EF6 blob SHA\uFF1A5e15f7ea303c554f6c25a417f7f184696234b436\u3002"},{title:"NCBI Bookshelf \xB7 Foot and Ankle",url:"https://www.ncbi.nlm.nih.gov/books/NBK546698/",note:"\u7528\u4E8E\u6838\u5BF9\u8DB3\u90E8\u57FA\u672C\u5206\u533A\u548C\u9AA8\u9ABC\u7EC4\u6210\u3002"},{title:"NCBI Bookshelf \xB7 Calcaneus / Talus",url:"https://www.ncbi.nlm.nih.gov/books/NBK519544/",note:"\u8DDF\u9AA8\u7ED3\u6784\u8BF4\u660E\uFF1B\u8DDD\u9AA8\u53C2\u8003 NBK541086\u3002"},{title:"NCBI Bookshelf \xB7 Navicular Bone",url:"https://www.ncbi.nlm.nih.gov/books/NBK547675/",note:"\u821F\u9AA8\u7684\u4F4D\u7F6E\u4E0E\u5F62\u6001\u53C2\u8003\u3002"}];var hf=[{id:"frontal",name:"\u989D\u9AA8",en:"Frontal bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Frontal bone.001"],description:"\u6784\u6210\u989D\u90E8\u548C\u773C\u7736\u4E0A\u58C1\uFF0C\u4F4D\u4E8E\u9885\u9AA8\u524D\u4E0A\u65B9\u3002",look:"\u7531\u989D\u90E8\u8F6C\u5411\u4E0B\u65B9\uFF0C\u6BD4\u8F83\u7736\u90E8\u7684\u5E73\u9762\u4E0E\u5411\u540E\u5F2F\u66F2\u7684\u9885\u9762\u3002",tip:"\u989D\u9AA8\u662F\u4E00\u5757\uFF1B\u5DE6\u53F3\u773C\u7736\u4E0A\u65B9\u5C5E\u4E8E\u540C\u4E00\u989D\u9AA8\u3002",neighbors:["parietal-right","parietal-left","sphenoid","ethmoid","nasal-right","nasal-left"],side:"midline",baseId:"frontal",pinyin:""},{id:"occipital",name:"\u6795\u9AA8",en:"Occipital bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Occipital bone.001"],description:"\u4F4D\u4E8E\u9885\u540E\u4E0B\u90E8\uFF0C\u53C2\u4E0E\u9885\u5E95\uFF0C\u5E76\u56F4\u7ED5\u6795\u9AA8\u5927\u5B54\u3002",look:"\u4ECE\u9885\u5E95\u770B\u6795\u9AA8\u5927\u5B54\u53CA\u5176\u4E24\u4FA7\u7684\u6795\u9AC1\uFF0C\u518D\u5BF9\u7167\u4E0B\u65B9\u5BF0\u690E\u7684\u4F4D\u7F6E\u3002",tip:"\u6795\u9AA8\u4E0B\u65B9\u4E0E\u7B2C\u4E00\u9888\u690E\u8854\u63A5\uFF1B\u672C\u56FE\u6CA1\u6709\u663E\u793A\u810A\u9AD3\u3002",neighbors:["parietal-right","parietal-left","temporal-right","temporal-left","sphenoid","C1"],side:"midline",baseId:"occipital",pinyin:""},{id:"sphenoid",name:"\u8776\u9AA8",en:"Sphenoid bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Sphenoid bone.001"],description:"\u4F4D\u4E8E\u9885\u5E95\u4E2D\u592E\uFF0C\u5411\u4E24\u4FA7\u5C55\u5F00\uFF0C\u53C2\u4E0E\u773C\u7736\u548C\u9885\u5E95\u7684\u6784\u6210\u3002",look:"\u5355\u72EC\u67E5\u770B\uFF0C\u6BD4\u8F83\u4E2D\u592E\u9AA8\u4F53\u3001\u5411\u4E24\u4FA7\u7684\u7FFC\u72B6\u90E8\u5206\u548C\u5411\u4E0B\u7684\u7FFC\u7A81\u3002",tip:"\u4ECE\u6574\u9885\u4E2D\u79FB\u5F00\u5468\u56F4\u9AA8\uFF0C\u8F83\u5BB9\u6613\u7406\u89E3\u8776\u9AA8\u7684\u4F4D\u7F6E\u3002",neighbors:["frontal","ethmoid","occipital","temporal-right","temporal-left","parietal-right","parietal-left"],side:"midline",baseId:"sphenoid",pinyin:""},{id:"ethmoid",name:"\u7B5B\u9AA8",en:"Ethmoid bone",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Ethmoid bone.001"],description:"\u4F4D\u4E8E\u4E24\u773C\u7736\u4E4B\u95F4\u548C\u9F3B\u8154\u4E0A\u90E8\uFF0C\u53C2\u4E0E\u9F3B\u4E2D\u9694\u3001\u9F3B\u8154\u4FA7\u58C1\u53CA\u7736\u5185\u4FA7\u58C1\u3002",look:"\u79FB\u5F00\u989D\u9AA8\u548C\u9F3B\u9AA8\uFF0C\u89C2\u5BDF\u7B5B\u9AA8\u7684\u4E2D\u7EBF\u9AA8\u677F\u53CA\u5DE6\u53F3\u4E24\u4FA7\u7684\u7ED3\u6784\u3002",tip:"\u4E0A\u3001\u4E2D\u9F3B\u7532\u5C5E\u4E8E\u7B5B\u9AA8\uFF1B\u4E0B\u9F3B\u7532\u662F\u53E6\u5916\u7684\u72EC\u7ACB\u9AA8\u3002",neighbors:["frontal","sphenoid","vomer","lacrimal-right","lacrimal-left","maxilla-right","maxilla-left"],side:"midline",baseId:"ethmoid",pinyin:""},{id:"parietal-right",name:"\u53F3\u9876\u9AA8",en:"Parietal bone \xB7 right",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Parietal bone.r.001"],description:"\u4F4D\u4E8E\u9885\u9876\u53CA\u9885\u4FA7\u4E0A\u90E8\uFF1B\u5DE6\u53F3\u9876\u9AA8\u5171\u540C\u5F62\u6210\u9885\u76D6\u7684\u5927\u90E8\u5206\u3002",look:"\u8F6C\u52A8\u89C2\u5BDF\u5916\u8868\u9762\u7684\u5F27\u5EA6\uFF0C\u518D\u770B\u671D\u5411\u9885\u8154\u7684\u5185\u8868\u9762\u548C\u5468\u8FB9\u9AA8\u7F1D\u8FB9\u7F18\u3002",tip:"\u9AA8\u7F1D\u662F\u8FDE\u63A5\u8FB9\u754C\uFF1B\u62C6\u5F00\u53EA\u662F\u6559\u5B66\u5C55\u793A\uFF0C\u4E0D\u8868\u793A\u53EF\u81EA\u7531\u6D3B\u52A8\u3002",neighbors:["frontal","occipital","temporal-right","sphenoid","parietal-left"],side:"right",baseId:"parietal",pinyin:""},{id:"temporal-right",name:"\u53F3\u989E\u9AA8",en:"Temporal bone \xB7 right",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Temporal bone.r.001"],description:"\u4F4D\u4E8E\u9885\u4FA7\u4E0B\u90E8\u548C\u9885\u5E95\uFF0C\u5916\u8033\u9053\u533A\u57DF\u3001\u4E73\u7A81\u53CA\u4E0B\u988C\u7A9D\u4F4D\u4E8E\u6B64\u9AA8\u3002",look:"\u7531\u4FA7\u9762\u5BFB\u627E\u5916\u8033\u9053\u9644\u8FD1\u548C\u98A7\u7A81\uFF0C\u518D\u4ECE\u4E0B\u65B9\u770B\u4E0E\u4E0B\u988C\u9AA8\u76F8\u5BF9\u7684\u4E0B\u988C\u7A9D\u3002",tip:"\u989E\u9AA8\u8BFB ni\xE8 g\u01D4\u3002\u4E2D\u8033\u542C\u5C0F\u9AA8\u53EF\u5728\u4E13\u95E8\u533A\u57DF\u653E\u5927\u89C2\u5BDF\u3002",neighbors:["parietal-right","occipital","sphenoid","zygomatic-right","mandible"],side:"right",baseId:"temporal",pinyin:"ni\xE8 g\u01D4"},{id:"parietal-left",name:"\u5DE6\u9876\u9AA8",en:"Parietal bone \xB7 left",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Parietal bone.l.001"],description:"\u4F4D\u4E8E\u9885\u9876\u53CA\u9885\u4FA7\u4E0A\u90E8\uFF1B\u5DE6\u53F3\u9876\u9AA8\u5171\u540C\u5F62\u6210\u9885\u76D6\u7684\u5927\u90E8\u5206\u3002",look:"\u8F6C\u52A8\u89C2\u5BDF\u5916\u8868\u9762\u7684\u5F27\u5EA6\uFF0C\u518D\u770B\u671D\u5411\u9885\u8154\u7684\u5185\u8868\u9762\u548C\u5468\u8FB9\u9AA8\u7F1D\u8FB9\u7F18\u3002",tip:"\u9AA8\u7F1D\u662F\u8FDE\u63A5\u8FB9\u754C\uFF1B\u62C6\u5F00\u53EA\u662F\u6559\u5B66\u5C55\u793A\uFF0C\u4E0D\u8868\u793A\u53EF\u81EA\u7531\u6D3B\u52A8\u3002",neighbors:["frontal","occipital","temporal-left","sphenoid","parietal-right"],side:"left",baseId:"parietal",pinyin:""},{id:"temporal-left",name:"\u5DE6\u989E\u9AA8",en:"Temporal bone \xB7 left",group:"cranial",region:"\u8111\u9885\u9AA8",sourceNodes:["Temporal bone.l.001"],description:"\u4F4D\u4E8E\u9885\u4FA7\u4E0B\u90E8\u548C\u9885\u5E95\uFF0C\u5916\u8033\u9053\u533A\u57DF\u3001\u4E73\u7A81\u53CA\u4E0B\u988C\u7A9D\u4F4D\u4E8E\u6B64\u9AA8\u3002",look:"\u7531\u4FA7\u9762\u5BFB\u627E\u5916\u8033\u9053\u9644\u8FD1\u548C\u98A7\u7A81\uFF0C\u518D\u4ECE\u4E0B\u65B9\u770B\u4E0E\u4E0B\u988C\u9AA8\u76F8\u5BF9\u7684\u4E0B\u988C\u7A9D\u3002",tip:"\u989E\u9AA8\u8BFB ni\xE8 g\u01D4\u3002\u4E2D\u8033\u542C\u5C0F\u9AA8\u53EF\u5728\u4E13\u95E8\u533A\u57DF\u653E\u5927\u89C2\u5BDF\u3002",neighbors:["parietal-left","occipital","sphenoid","zygomatic-left","mandible"],side:"left",baseId:"temporal",pinyin:"ni\xE8 g\u01D4"},{id:"maxilla-right",name:"\u53F3\u4E0A\u988C\u9AA8",en:"Maxilla \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Maxilla.r.001"],description:"\u5F62\u6210\u4E0A\u988C\u3001\u786C\u816D\u7684\u524D\u90E8\u548C\u773C\u7736\u5E95\u90E8\u7684\u4E00\u90E8\u5206\u3002",look:"\u6BD4\u8F83\u7259\u69FD\u7F18\u3001\u7736\u9762\u548C\u5411\u5185\u7684\u816D\u7A81\uFF1B\u5DE6\u53F3\u4E0A\u988C\u9AA8\u5728\u4E2D\u7EBF\u76F8\u63A5\u3002",tip:"\u7259\u9F7F\u4E0D\u5C5E\u4E8E\u9AA8\uFF0C\u672A\u8BA1\u5165\u672C\u56FE206\u5757\u6807\u51C6\u9AA8\u3002",neighbors:["frontal","ethmoid","nasal-right","lacrimal-right","zygomatic-right","palatine-right","inferior-concha-right","maxilla-left","vomer"],side:"right",baseId:"maxilla",pinyin:"h\xE9 g\u01D4"},{id:"zygomatic-right",name:"\u53F3\u98A7\u9AA8",en:"Zygomatic bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Zygomatic bone.r.001"],description:"\u5F62\u6210\u9762\u988A\u7684\u9AA8\u6027\u7A81\u8D77\uFF0C\u53C2\u4E0E\u773C\u7736\u5916\u4FA7\u58C1\u53CA\u98A7\u5F13\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u5B83\u5982\u4F55\u5411\u540E\u63A5\u7EED\u989E\u9AA8\u7684\u98A7\u7A81\uFF0C\u518D\u770B\u671D\u5411\u773C\u7736\u7684\u9AA8\u9762\u3002",tip:"\u98A7\u5F13\u7531\u98A7\u9AA8\u4E0E\u989E\u9AA8\u7684\u76F8\u5E94\u9AA8\u7A81\u5171\u540C\u5F62\u6210\u3002",neighbors:["frontal","sphenoid","temporal-right","maxilla-right"],side:"right",baseId:"zygomatic",pinyin:"qu\xE1n g\u01D4"},{id:"nasal-right",name:"\u53F3\u9F3B\u9AA8",en:"Nasal bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Nasal bone.r.001"],description:"\u4F4D\u4E8E\u9F3B\u6881\u4E0A\u90E8\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\uFF0C\u5904\u4E8E\u989D\u9AA8\u4E0B\u65B9\u548C\u4E0A\u988C\u9AA8\u4E4B\u95F4\u3002",look:"\u5728\u6B63\u9762\u8FA8\u8BA4\u5DE6\u53F3\u9F3B\u9AA8\uFF0C\u518D\u5355\u72EC\u65CB\u8F6C\u770B\u5176\u8584\u677F\u72B6\u5F62\u6001\u3002",tip:"\u9F3B\u5C16\u4E3B\u8981\u4E0D\u662F\u9AA8\u7ED3\u6784\uFF1B\u672C\u7248\u6CA1\u6709\u52A0\u5165\u9F3B\u8F6F\u9AA8\u3002",neighbors:["frontal","ethmoid","maxilla-right","nasal-left"],side:"right",baseId:"nasal",pinyin:""},{id:"lacrimal-right",name:"\u53F3\u6CEA\u9AA8",en:"Lacrimal bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Lacrimal bone.r.001"],description:"\u662F\u773C\u7736\u5185\u4FA7\u58C1\u524D\u90E8\u7684\u5C0F\u9AA8\uFF0C\u9760\u8FD1\u9F3B\u6839\u4E24\u4FA7\u3002",look:"\u5148\u5728\u773C\u7736\u533A\u57DF\u5B9A\u4F4D\uFF0C\u518D\u5355\u72EC\u67E5\u770B\u8584\u9AA8\u677F\u4E0E\u6C9F\u6837\u533A\u57DF\u3002",tip:"\u5B83\u5F88\u5C0F\uFF0C\u6574\u9885\u89C6\u56FE\u4E0D\u6613\u70B9\u5230\u65F6\u53EF\u4ECE\u76EE\u5F55\u9009\u62E9\u3002",neighbors:["frontal","ethmoid","maxilla-right","inferior-concha-right"],side:"right",baseId:"lacrimal",pinyin:""},{id:"palatine-right",name:"\u53F3\u816D\u9AA8",en:"Palatine bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Palatine bone.r.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u540E\u90E8\u4E0E\u786C\u816D\u540E\u65B9\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\u3002",look:"\u4ECE\u9885\u5E95\u89C2\u5BDF\u6C34\u5E73\u677F\u4E0E\u4E0A\u988C\u9AA8\u816D\u7A81\u7684\u63A5\u7EED\uFF0C\u518D\u770B\u5411\u4E0A\u7684\u9AA8\u677F\u3002",tip:"\u786C\u816D\u540E\u90E8\u4E3B\u8981\u7531\u816D\u9AA8\u53C2\u4E0E\u6784\u6210\u3002",neighbors:["sphenoid","ethmoid","maxilla-right","inferior-concha-right","palatine-left","vomer"],side:"right",baseId:"palatine",pinyin:"\xE8 g\u01D4"},{id:"inferior-concha-right",name:"\u53F3\u4E0B\u9F3B\u7532",en:"Inferior nasal concha bone \xB7 right",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Inferior nasal concha bone.r.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u5916\u4FA7\u58C1\uFF0C\u5411\u9F3B\u8154\u5185\u5377\u66F2\uFF1B\u5DE6\u53F3\u5404\u4E3A\u4E00\u5757\u72EC\u7ACB\u9AA8\u3002",look:"\u8F6C\u5230\u9F3B\u8154\u524D\u65B9\uFF0C\u5FC5\u8981\u65F6\u9690\u85CF\u4E0A\u988C\u9AA8\uFF0C\u89C2\u5BDF\u5176\u5377\u66F2\u7684\u8584\u677F\u5F62\u6001\u3002",tip:"\u4E0B\u9F3B\u7532\u662F\u72EC\u7ACB\u9AA8\uFF0C\u4E0D\u80FD\u4E0E\u7B5B\u9AA8\u7684\u4E2D\u9F3B\u7532\u6DF7\u6DC6\u3002",neighbors:["ethmoid","maxilla-right","lacrimal-right","palatine-right"],side:"right",baseId:"inferior-concha",pinyin:""},{id:"maxilla-left",name:"\u5DE6\u4E0A\u988C\u9AA8",en:"Maxilla \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Maxilla.l.001"],description:"\u5F62\u6210\u4E0A\u988C\u3001\u786C\u816D\u7684\u524D\u90E8\u548C\u773C\u7736\u5E95\u90E8\u7684\u4E00\u90E8\u5206\u3002",look:"\u6BD4\u8F83\u7259\u69FD\u7F18\u3001\u7736\u9762\u548C\u5411\u5185\u7684\u816D\u7A81\uFF1B\u5DE6\u53F3\u4E0A\u988C\u9AA8\u5728\u4E2D\u7EBF\u76F8\u63A5\u3002",tip:"\u7259\u9F7F\u4E0D\u5C5E\u4E8E\u9AA8\uFF0C\u672A\u8BA1\u5165\u672C\u56FE206\u5757\u6807\u51C6\u9AA8\u3002",neighbors:["frontal","ethmoid","nasal-left","lacrimal-left","zygomatic-left","palatine-left","inferior-concha-left","maxilla-right","vomer"],side:"left",baseId:"maxilla",pinyin:"h\xE9 g\u01D4"},{id:"zygomatic-left",name:"\u5DE6\u98A7\u9AA8",en:"Zygomatic bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Zygomatic bone.l.001"],description:"\u5F62\u6210\u9762\u988A\u7684\u9AA8\u6027\u7A81\u8D77\uFF0C\u53C2\u4E0E\u773C\u7736\u5916\u4FA7\u58C1\u53CA\u98A7\u5F13\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u5B83\u5982\u4F55\u5411\u540E\u63A5\u7EED\u989E\u9AA8\u7684\u98A7\u7A81\uFF0C\u518D\u770B\u671D\u5411\u773C\u7736\u7684\u9AA8\u9762\u3002",tip:"\u98A7\u5F13\u7531\u98A7\u9AA8\u4E0E\u989E\u9AA8\u7684\u76F8\u5E94\u9AA8\u7A81\u5171\u540C\u5F62\u6210\u3002",neighbors:["frontal","sphenoid","temporal-left","maxilla-left"],side:"left",baseId:"zygomatic",pinyin:"qu\xE1n g\u01D4"},{id:"nasal-left",name:"\u5DE6\u9F3B\u9AA8",en:"Nasal bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Nasal bone.l.001"],description:"\u4F4D\u4E8E\u9F3B\u6881\u4E0A\u90E8\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\uFF0C\u5904\u4E8E\u989D\u9AA8\u4E0B\u65B9\u548C\u4E0A\u988C\u9AA8\u4E4B\u95F4\u3002",look:"\u5728\u6B63\u9762\u8FA8\u8BA4\u5DE6\u53F3\u9F3B\u9AA8\uFF0C\u518D\u5355\u72EC\u65CB\u8F6C\u770B\u5176\u8584\u677F\u72B6\u5F62\u6001\u3002",tip:"\u9F3B\u5C16\u4E3B\u8981\u4E0D\u662F\u9AA8\u7ED3\u6784\uFF1B\u672C\u7248\u6CA1\u6709\u52A0\u5165\u9F3B\u8F6F\u9AA8\u3002",neighbors:["frontal","ethmoid","maxilla-left","nasal-right"],side:"left",baseId:"nasal",pinyin:""},{id:"lacrimal-left",name:"\u5DE6\u6CEA\u9AA8",en:"Lacrimal bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Lacrimal bone.l.001"],description:"\u662F\u773C\u7736\u5185\u4FA7\u58C1\u524D\u90E8\u7684\u5C0F\u9AA8\uFF0C\u9760\u8FD1\u9F3B\u6839\u4E24\u4FA7\u3002",look:"\u5148\u5728\u773C\u7736\u533A\u57DF\u5B9A\u4F4D\uFF0C\u518D\u5355\u72EC\u67E5\u770B\u8584\u9AA8\u677F\u4E0E\u6C9F\u6837\u533A\u57DF\u3002",tip:"\u5B83\u5F88\u5C0F\uFF0C\u6574\u9885\u89C6\u56FE\u4E0D\u6613\u70B9\u5230\u65F6\u53EF\u4ECE\u76EE\u5F55\u9009\u62E9\u3002",neighbors:["frontal","ethmoid","maxilla-left","inferior-concha-left"],side:"left",baseId:"lacrimal",pinyin:""},{id:"palatine-left",name:"\u5DE6\u816D\u9AA8",en:"Palatine bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Palatine bone.l.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u540E\u90E8\u4E0E\u786C\u816D\u540E\u65B9\uFF0C\u5DE6\u53F3\u5404\u4E00\u5757\u3002",look:"\u4ECE\u9885\u5E95\u89C2\u5BDF\u6C34\u5E73\u677F\u4E0E\u4E0A\u988C\u9AA8\u816D\u7A81\u7684\u63A5\u7EED\uFF0C\u518D\u770B\u5411\u4E0A\u7684\u9AA8\u677F\u3002",tip:"\u786C\u816D\u540E\u90E8\u4E3B\u8981\u7531\u816D\u9AA8\u53C2\u4E0E\u6784\u6210\u3002",neighbors:["sphenoid","ethmoid","maxilla-left","inferior-concha-left","palatine-right","vomer"],side:"left",baseId:"palatine",pinyin:"\xE8 g\u01D4"},{id:"inferior-concha-left",name:"\u5DE6\u4E0B\u9F3B\u7532",en:"Inferior nasal concha bone \xB7 left",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Inferior nasal concha bone.l.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u5916\u4FA7\u58C1\uFF0C\u5411\u9F3B\u8154\u5185\u5377\u66F2\uFF1B\u5DE6\u53F3\u5404\u4E3A\u4E00\u5757\u72EC\u7ACB\u9AA8\u3002",look:"\u8F6C\u5230\u9F3B\u8154\u524D\u65B9\uFF0C\u5FC5\u8981\u65F6\u9690\u85CF\u4E0A\u988C\u9AA8\uFF0C\u89C2\u5BDF\u5176\u5377\u66F2\u7684\u8584\u677F\u5F62\u6001\u3002",tip:"\u4E0B\u9F3B\u7532\u662F\u72EC\u7ACB\u9AA8\uFF0C\u4E0D\u80FD\u4E0E\u7B5B\u9AA8\u7684\u4E2D\u9F3B\u7532\u6DF7\u6DC6\u3002",neighbors:["ethmoid","maxilla-left","lacrimal-left","palatine-left"],side:"left",baseId:"inferior-concha",pinyin:""},{id:"vomer",name:"\u7281\u9AA8",en:"Vomer",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Vomer.001"],description:"\u4F4D\u4E8E\u9F3B\u8154\u4E2D\u7EBF\uFF0C\u6784\u6210\u9AA8\u6027\u9F3B\u4E2D\u9694\u7684\u540E\u4E0B\u90E8\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u8584\u677F\u5F62\u6001\uFF0C\u56DE\u5230\u539F\u4F4D\u6BD4\u8F83\u5B83\u4E0E\u7B5B\u9AA8\u5782\u76F4\u677F\u7684\u76F8\u63A5\u3002",tip:"\u9F3B\u4E2D\u9694\u4E0D\u5168\u662F\u9AA8\uFF1B\u524D\u90E8\u8F6F\u9AA8\u6CA1\u6709\u663E\u793A\u3002",neighbors:["sphenoid","ethmoid","maxilla-right","maxilla-left","palatine-right","palatine-left"],side:"midline",baseId:"vomer",pinyin:""},{id:"mandible",name:"\u4E0B\u988C\u9AA8",en:"Mandible",group:"facial",region:"\u9762\u9885\u9AA8",sourceNodes:["Mandible.001"],description:"\u5F62\u6210\u4E0B\u988C\uFF0C\u5305\u542B\u6C34\u5E73\u7684\u9AA8\u4F53\u548C\u4E24\u4FA7\u5411\u4E0A\u7684\u4E0B\u988C\u652F\u3002",look:"\u6CBF\u4E0B\u988C\u652F\u5411\u4E0A\uFF0C\u6BD4\u8F83\u524D\u65B9\u51A0\u7A81\u548C\u540E\u65B9\u9AC1\u7A81\uFF1B\u89C2\u5BDF\u9AC1\u7A81\u4E0E\u989E\u9AA8\u7684\u4F4D\u7F6E\u5173\u7CFB\u3002",tip:"\u4E0B\u988C\u9AA8\u4E3A\u4E00\u5757\uFF0C\u5DE6\u53F3\u4E24\u7AEF\u5206\u522B\u4E0E\u989E\u9AA8\u6784\u6210\u989E\u4E0B\u988C\u5173\u8282\u3002",neighbors:["temporal-right","temporal-left"],side:"midline",baseId:"mandible",pinyin:"h\xE9 g\u01D4"},{id:"hyoid",name:"\u820C\u9AA8",en:"Hyoid bone",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Hyoid bone.001"],description:"\u4F4D\u4E8E\u4E0B\u988C\u9AA8\u4E0B\u65B9\u3001\u9888\u524D\u90E8\uFF0C\u5177\u6709\u9AA8\u4F53\u53CA\u5411\u4E24\u4FA7\u4F38\u51FA\u7684\u89D2\u3002",look:"\u5355\u72EC\u67E5\u770B\u5176\u5F27\u5F62\u8F6E\u5ED3\u4E0E\u5927\u5C0F\u89D2\uFF0C\u518D\u56DE\u5230\u4E0B\u988C\u9AA8\u548C\u9888\u690E\u9644\u8FD1\u5B9A\u4F4D\u3002",tip:"\u820C\u9AA8\u4E0D\u4E0E\u5176\u4ED6\u9AA8\u76F4\u63A5\u5F62\u6210\u5173\u8282\uFF0C\u4E3B\u8981\u7531\u8F6F\u7EC4\u7EC7\u60AC\u7CFB\u3002",neighbors:[],side:"midline",baseId:"hyoid",pinyin:""},{id:"malleus-right",name:"\u53F3\u9524\u9AA8",en:"Malleus \xB7 right",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Malleus.r.001"],description:"\u4F4D\u4E8E\u53F3\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-right"],side:"right",baseId:"malleus",pinyin:""},{id:"incus-right",name:"\u53F3\u7827\u9AA8",en:"Incus \xB7 right",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Incus.r.001"],description:"\u4F4D\u4E8E\u53F3\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["malleus-right","stapes-right"],side:"right",baseId:"incus",pinyin:"zh\u0113n g\u01D4"},{id:"stapes-right",name:"\u53F3\u956B\u9AA8",en:"Stapes \xB7 right",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Stapes.r.001"],description:"\u4F4D\u4E8E\u53F3\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-right"],side:"right",baseId:"stapes",pinyin:"d\xE8ng g\u01D4"},{id:"malleus-left",name:"\u5DE6\u9524\u9AA8",en:"Malleus \xB7 left",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Malleus.l.001"],description:"\u4F4D\u4E8E\u5DE6\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-left"],side:"left",baseId:"malleus",pinyin:""},{id:"incus-left",name:"\u5DE6\u7827\u9AA8",en:"Incus \xB7 left",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Incus.l.001"],description:"\u4F4D\u4E8E\u5DE6\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["malleus-left","stapes-left"],side:"left",baseId:"incus",pinyin:"zh\u0113n g\u01D4"},{id:"stapes-left",name:"\u5DE6\u956B\u9AA8",en:"Stapes \xB7 left",group:"head-other",region:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",sourceNodes:["Stapes.l.001"],description:"\u4F4D\u4E8E\u5DE6\u4FA7\u4E2D\u8033\uFF0C\u662F\u4E09\u5757\u542C\u5C0F\u9AA8\u4E4B\u4E00\uFF1B\u5728\u5168\u8EAB\u6BD4\u4F8B\u4E0B\u975E\u5E38\u7EC6\u5C0F\u3002",look:"\u4F7F\u7528\u542C\u5C0F\u9AA8\u533A\u57DF\u6216\u5355\u72EC\u67E5\u770B\uFF0C\u65CB\u8F6C\u6BD4\u8F83\u4E0E\u76F8\u90BB\u542C\u5C0F\u9AA8\u63A5\u7EED\u7684\u90E8\u4F4D\u3002",tip:"\u8FD9\u662F\u81EA\u52A8\u653E\u5927\u7684\u89C2\u5BDF\u89C6\u56FE\uFF0C\u4E0D\u4EE3\u8868\u771F\u5B9E\u5927\u5C0F\uFF1B\u6B64\u5904\u672A\u663E\u793A\u9F13\u819C\u4E0E\u5185\u8033\u3002",neighbors:["incus-left"],side:"left",baseId:"stapes",pinyin:"d\xE8ng g\u01D4"},{id:"C1",name:"\u5BF0\u690E C1",en:"Atlas (C1)",group:"cervical",region:"\u9888\u690E",sourceNodes:["Atlas (C1).001"],description:"\u4F4D\u4E8E\u6795\u9AA8\u4E0B\u65B9\uFF0C\u662F\u7B2C\u4E00\u9888\u690E\uFF1B\u73AF\u5F62\u7ED3\u6784\u4E0D\u540C\u4E8E\u5178\u578B\u690E\u9AA8\uFF0C\u6CA1\u6709\u4E00\u822C\u690E\u4F53\u548C\u68D8\u7A81\u3002",look:"\u4ECE\u4E0A\u65B9\u770B\u5DE6\u53F3\u4FA7\u5757\u4E0E\u690E\u5B54\uFF0C\u518D\u4ECE\u540E\u9762\u6BD4\u8F83\u524D\u5F13\u548C\u540E\u5F13\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["occipital","C2"],side:"midline",baseId:"C1",pinyin:"hu\xE1n zhu\u012B"},{id:"C2",name:"\u67A2\u690E C2",en:"Axis (C2)",group:"cervical",region:"\u9888\u690E",sourceNodes:["Axis (C2).001"],description:"\u4F4D\u4E8E\u5BF0\u690E\u4E0B\u65B9\uFF0C\u5411\u4E0A\u7684\u9F7F\u7A81\u662F\u8BC6\u522B\u7B2C\u4E8C\u9888\u690E\u7684\u91CD\u8981\u7279\u5F81\u3002",look:"\u89C2\u5BDF\u9F7F\u7A81\u3001\u690E\u4F53\u548C\u540E\u65B9\u68D8\u7A81\uFF0C\u6BD4\u8F83\u5176\u4E0E\u5BF0\u690E\u7684\u7A7A\u95F4\u5173\u7CFB\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C1","C3"],side:"midline",baseId:"C2",pinyin:"sh\u016B zhu\u012B"},{id:"C3",name:"\u7B2C3\u9888\u690E C3",en:"Vertebra C3",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C3.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C2","C4"],side:"midline",baseId:"C3",pinyin:""},{id:"C4",name:"\u7B2C4\u9888\u690E C4",en:"Vertebra C4",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C4.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C3","C5"],side:"midline",baseId:"C4",pinyin:""},{id:"C5",name:"\u7B2C5\u9888\u690E C5",en:"Vertebra C5",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C5.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C4","C6"],side:"midline",baseId:"C5",pinyin:""},{id:"C6",name:"\u7B2C6\u9888\u690E C6",en:"Vertebra C6",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C6.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C5","C7"],side:"midline",baseId:"C6",pinyin:""},{id:"C7",name:"\u7B2C7\u9888\u690E C7",en:"Vertebra C7",group:"cervical",region:"\u9888\u690E",sourceNodes:["Vertebra C7.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u9888\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u6CE8\u610F\u4E24\u4FA7\u6A2A\u7A81\u533A\u57DF\u4E0E\u80F8\u690E\u3001\u8170\u690E\u7684\u533A\u522B\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C6","T1"],side:"midline",baseId:"C7",pinyin:""},{id:"T1",name:"\u7B2C1\u80F8\u690E T1",en:"Vertebra T1",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T1.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C1\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["C7","T2","rib-1-right","rib-1-left"],side:"midline",baseId:"T1",pinyin:""},{id:"T2",name:"\u7B2C2\u80F8\u690E T2",en:"Vertebra T2",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T2.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C2\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T1","T3","rib-2-right","rib-2-left"],side:"midline",baseId:"T2",pinyin:""},{id:"T3",name:"\u7B2C3\u80F8\u690E T3",en:"Vertebra T3",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T3.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T2","T4","rib-3-right","rib-3-left"],side:"midline",baseId:"T3",pinyin:""},{id:"T4",name:"\u7B2C4\u80F8\u690E T4",en:"Vertebra T4",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T4.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T3","T5","rib-4-right","rib-4-left"],side:"midline",baseId:"T4",pinyin:""},{id:"T5",name:"\u7B2C5\u80F8\u690E T5",en:"Vertebra T5",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T5.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T4","T6","rib-5-right","rib-5-left"],side:"midline",baseId:"T5",pinyin:""},{id:"T6",name:"\u7B2C6\u80F8\u690E T6",en:"Vertebra T6",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T6.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T5","T7","rib-6-right","rib-6-left"],side:"midline",baseId:"T6",pinyin:""},{id:"T7",name:"\u7B2C7\u80F8\u690E T7",en:"Vertebra T7",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T7.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T6","T8","rib-7-right","rib-7-left"],side:"midline",baseId:"T7",pinyin:""},{id:"T8",name:"\u7B2C8\u80F8\u690E T8",en:"Vertebra T8",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T8.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C8\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T7","T9","rib-8-right","rib-8-left"],side:"midline",baseId:"T8",pinyin:""},{id:"T9",name:"\u7B2C9\u80F8\u690E T9",en:"Vertebra T9",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T9.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C9\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T8","T10","rib-9-right","rib-9-left"],side:"midline",baseId:"T9",pinyin:""},{id:"T10",name:"\u7B2C10\u80F8\u690E T10",en:"Vertebra T10",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T10.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C10\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T9","T11","rib-10-right","rib-10-left"],side:"midline",baseId:"T10",pinyin:""},{id:"T11",name:"\u7B2C11\u80F8\u690E T11",en:"Vertebra T11",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T11.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C11\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T10","T12","rib-11-right","rib-11-left"],side:"midline",baseId:"T11",pinyin:""},{id:"T12",name:"\u7B2C12\u80F8\u690E T12",en:"Vertebra T12",group:"thoracic",region:"\u80F8\u690E",sourceNodes:["Vertebra T12.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C12\u80F8\u690E\uFF0C\u4F4D\u4E8E\u76F8\u90BB\u690E\u9AA8\u4E4B\u95F4\u3002",look:"\u5148\u533A\u5206\u524D\u65B9\u690E\u4F53\u4E0E\u540E\u65B9\u690E\u5F13\uFF0C\u518D\u89C2\u5BDF\u690E\u5B54\u3001\u6A2A\u7A81\u53CA\u68D8\u7A81\u3002\u80F8\u690E\u8FD8\u53EF\u7ED3\u5408\u5BF9\u5E94\u808B\u9AA8\u89C2\u5BDF\u9AA8\u6027\u63A5\u7EED\u3002",tip:"\u4EC5\u663E\u793A\u9AA8\u8868\u9762\uFF0C\u690E\u95F4\u76D8\u3001\u97E7\u5E26\u3001\u810A\u9AD3\u548C\u795E\u7ECF\u672A\u663E\u793A\u3002",neighbors:["T11","L1","rib-12-right","rib-12-left"],side:"midline",baseId:"T12",pinyin:""},{id:"rib-1-right",name:"\u53F3\u7B2C1\u808B\u9AA8",en:"First rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["First rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C1\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T1"],side:"right",baseId:"rib-1",pinyin:""},{id:"rib-2-right",name:"\u53F3\u7B2C2\u808B\u9AA8",en:"Second rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Second rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C2\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T2","T1"],side:"right",baseId:"rib-2",pinyin:""},{id:"rib-3-right",name:"\u53F3\u7B2C3\u808B\u9AA8",en:"Third rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Third rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T3","T2"],side:"right",baseId:"rib-3",pinyin:""},{id:"rib-4-right",name:"\u53F3\u7B2C4\u808B\u9AA8",en:"Fourth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fourth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T4","T3"],side:"right",baseId:"rib-4",pinyin:""},{id:"rib-5-right",name:"\u53F3\u7B2C5\u808B\u9AA8",en:"Fifth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fifth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T5","T4"],side:"right",baseId:"rib-5",pinyin:""},{id:"rib-6-right",name:"\u53F3\u7B2C6\u808B\u9AA8",en:"Sixth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Sixth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T6","T5"],side:"right",baseId:"rib-6",pinyin:""},{id:"rib-7-right",name:"\u53F3\u7B2C7\u808B\u9AA8",en:"Seventh rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Seventh rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T7","T6"],side:"right",baseId:"rib-7",pinyin:""},{id:"rib-8-right",name:"\u53F3\u7B2C8\u808B\u9AA8",en:"Eighth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eighth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C8\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T8","T7"],side:"right",baseId:"rib-8",pinyin:""},{id:"rib-9-right",name:"\u53F3\u7B2C9\u808B\u9AA8",en:"Ninth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Ninth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C9\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T9","T8"],side:"right",baseId:"rib-9",pinyin:""},{id:"rib-10-right",name:"\u53F3\u7B2C10\u808B\u9AA8",en:"Tenth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Tenth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C10\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T10"],side:"right",baseId:"rib-10",pinyin:""},{id:"rib-11-right",name:"\u53F3\u7B2C11\u808B\u9AA8",en:"Eleventh rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eleventh rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C11\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T11"],side:"right",baseId:"rib-11",pinyin:""},{id:"rib-12-right",name:"\u53F3\u7B2C12\u808B\u9AA8",en:"Twelfth rib \xB7 right",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Twelfth rib.r.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C12\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u53F3\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T12"],side:"right",baseId:"rib-12",pinyin:""},{id:"rib-1-left",name:"\u5DE6\u7B2C1\u808B\u9AA8",en:"First rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["First rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C1\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T1"],side:"left",baseId:"rib-1",pinyin:""},{id:"rib-2-left",name:"\u5DE6\u7B2C2\u808B\u9AA8",en:"Second rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Second rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C2\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T2","T1"],side:"left",baseId:"rib-2",pinyin:""},{id:"rib-3-left",name:"\u5DE6\u7B2C3\u808B\u9AA8",en:"Third rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Third rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C3\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T3","T2"],side:"left",baseId:"rib-3",pinyin:""},{id:"rib-4-left",name:"\u5DE6\u7B2C4\u808B\u9AA8",en:"Fourth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fourth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C4\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T4","T3"],side:"left",baseId:"rib-4",pinyin:""},{id:"rib-5-left",name:"\u5DE6\u7B2C5\u808B\u9AA8",en:"Fifth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Fifth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C5\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T5","T4"],side:"left",baseId:"rib-5",pinyin:""},{id:"rib-6-left",name:"\u5DE6\u7B2C6\u808B\u9AA8",en:"Sixth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Sixth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C6\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T6","T5"],side:"left",baseId:"rib-6",pinyin:""},{id:"rib-7-left",name:"\u5DE6\u7B2C7\u808B\u9AA8",en:"Seventh rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Seventh rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C7\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u76F8\u5E94\u808B\u8F6F\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T7","T6"],side:"left",baseId:"rib-7",pinyin:""},{id:"rib-8-left",name:"\u5DE6\u7B2C8\u808B\u9AA8",en:"Eighth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eighth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C8\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T8","T7"],side:"left",baseId:"rib-8",pinyin:""},{id:"rib-9-left",name:"\u5DE6\u7B2C9\u808B\u9AA8",en:"Ninth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Ninth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C9\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T9","T8"],side:"left",baseId:"rib-9",pinyin:""},{id:"rib-10-left",name:"\u5DE6\u7B2C10\u808B\u9AA8",en:"Tenth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Tenth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C10\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u524D\u7AEF\u7ECF\u808B\u8F6F\u9AA8\u53C2\u4E0E\u808B\u5F13\u8FDE\u63A5\uFF0C\u4E0D\u76F4\u63A5\u4EE5\u9AA8\u63A5\u5230\u80F8\u9AA8\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T10"],side:"left",baseId:"rib-10",pinyin:""},{id:"rib-11-left",name:"\u5DE6\u7B2C11\u808B\u9AA8",en:"Eleventh rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Eleventh rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C11\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T11"],side:"left",baseId:"rib-11",pinyin:""},{id:"rib-12-left",name:"\u5DE6\u7B2C12\u808B\u9AA8",en:"Twelfth rib \xB7 left",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Twelfth rib.l.001"],description:"\u4ECE\u4E0A\u5411\u4E0B\u7F16\u53F7\u4E3A\u7B2C12\u808B\uFF0C\u4F4D\u4E8E\u80F8\u5ED3\u5DE6\u4FA7\u3002\u5C5E\u4E8E\u6D6E\u808B\uFF0C\u524D\u7AEF\u4E0D\u4E0E\u80F8\u9AA8\u8FDE\u63A5\u3002",look:"\u6CBF\u540E\u7AEF\u8FA8\u8BA4\u808B\u5934\u3001\u808B\u9888\u6216\u7ED3\u8282\u533A\u57DF\uFF0C\u518D\u6CBF\u5F2F\u66F2\u9AA8\u4F53\u770B\u5230\u524D\u7AEF\u3002",tip:"\u672C\u56FE\u4E0D\u663E\u793A\u808B\u8F6F\u9AA8\uFF0C\u56E0\u6B64\u808B\u9AA8\u524D\u7AEF\u4E0E\u80F8\u9AA8\u4E4B\u95F4\u53EF\u89C1\u7A7A\u9699\u3002",neighbors:["T12"],side:"left",baseId:"rib-12",pinyin:""},{id:"sternum",name:"\u80F8\u9AA8",en:"Sternum",group:"thorax",region:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",sourceNodes:["Manubrium of sternum.001","Body of sternum.001","Xiphoid process.001"],description:"\u4F4D\u4E8E\u80F8\u5ED3\u524D\u65B9\u6B63\u4E2D\uFF0C\u7531\u80F8\u9AA8\u67C4\u3001\u80F8\u9AA8\u4F53\u548C\u5251\u7A81\u4E09\u4E2A\u533A\u57DF\u6784\u6210\u3002",look:"\u4ECE\u4FA7\u9762\u6BD4\u8F83\u80F8\u9AA8\u67C4\u4E0E\u4F53\u7684\u89D2\u5EA6\uFF0C\u518D\u4ECE\u524D\u9762\u8FA8\u8BA4\u4E0A\u7AEF\u548C\u4E0B\u7AEF\u7684\u5F62\u72B6\u3002",tip:"\u6309\u6210\u4EBA\u9AA8\u9ABC\u6807\u51C6\u6E05\u5355\u8BA1\u4E3A\u4E00\u5757\uFF1B\u6E90\u6A21\u578B\u7684\u4E09\u4E2A\u90E8\u5206\u5408\u4E3A\u540C\u4E00\u53EF\u9009\u5BF9\u8C61\u3002",neighbors:["clavicle-right","clavicle-left"],side:"midline",baseId:"sternum",pinyin:""},{id:"clavicle-right",name:"\u53F3\u9501\u9AA8",en:"Clavicle \xB7 right",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Clavicle.r.001"],description:"\u6A2A\u4F4D\u4E8E\u80F8\u5ED3\u524D\u4E0A\u65B9\uFF0C\u5185\u7AEF\u63A5\u80F8\u9AA8\uFF0C\u5916\u7AEF\u63A5\u80A9\u80DB\u9AA8\u80A9\u5CF0\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83S\u5F62\u8F6E\u5ED3\u548C\u4E24\u7AEF\uFF1B\u5728\u539F\u4F4D\u67E5\u770B\u5B83\u5982\u4F55\u8FDE\u63A5\u80F8\u9AA8\u548C\u80A9\u90E8\u3002",tip:"\u9AA8\u6027\u8FDE\u63A5\u4E4B\u5916\u8FD8\u6709\u97E7\u5E26\u548C\u5173\u8282\u76D8\u7B49\u8F6F\u7EC4\u7EC7\uFF0C\u672C\u7248\u672A\u663E\u793A\u3002",neighbors:["sternum","scapula-right"],side:"right",baseId:"clavicle",pinyin:""},{id:"scapula-right",name:"\u53F3\u80A9\u80DB\u9AA8",en:"Scapula \xB7 right",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Scapula.r.001"],description:"\u4F4D\u4E8E\u80F8\u5ED3\u540E\u4E0A\u65B9\uFF0C\u662F\u6241\u5E73\u7684\u80A9\u5E26\u9AA8\uFF1B\u5916\u4FA7\u5173\u8282\u76C2\u4E0E\u80B1\u9AA8\u5934\u76F8\u5BF9\u3002",look:"\u4ECE\u540E\u9762\u770B\u80A9\u80DB\u5188\u3001\u80A9\u5CF0\uFF0C\u4ECE\u5916\u4FA7\u770B\u5173\u8282\u76C2\u548C\u5599\u7A81\uFF0C\u518D\u89C2\u5BDF\u9762\u5411\u808B\u9AA8\u7684\u524D\u9762\u3002",tip:"\u80A9\u80DB\u9AA8\u8D34\u8FD1\u80F8\u5ED3\uFF0C\u4F46\u4E0D\u4E0E\u808B\u9AA8\u76F4\u63A5\u5F62\u6210\u666E\u901A\u9AA8\u6027\u5173\u8282\u3002",neighbors:["clavicle-right","humerus-right"],side:"right",baseId:"scapula",pinyin:"ji\u01CE g\u01D4"},{id:"humerus-right",name:"\u53F3\u80B1\u9AA8",en:"Humerus \xB7 right",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Humerus.r.001"],description:"\u4F4D\u4E8E\u4E0A\u81C2\uFF1B\u4E0A\u7AEF\u4E3A\u80B1\u9AA8\u5934\uFF0C\u4E0B\u7AEF\u4E0E\u5C3A\u9AA8\u3001\u6861\u9AA8\u8854\u63A5\u3002",look:"\u6BD4\u8F83\u4E0A\u7AEF\u5706\u5F62\u9AA8\u5934\u548C\u4E0B\u7AEF\u6ED1\u8F66\u3001\u5C0F\u5934\u7B49\u533A\u57DF\uFF0C\u518D\u770B\u9AA8\u5E72\u3002",tip:"\u4E0A\u7AEF\u53C2\u4E0E\u80A9\u5173\u8282\uFF0C\u4E0B\u7AEF\u53C2\u4E0E\u8098\u5173\u8282\u3002",neighbors:["scapula-right","ulna-right","radius-right"],side:"right",baseId:"humerus",pinyin:"g\u014Dng g\u01D4"},{id:"radius-right",name:"\u53F3\u6861\u9AA8",en:"Radius \xB7 right",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Radius.r.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u62C7\u6307\u4E00\u4FA7\uFF1B\u8FD1\u7AEF\u7684\u6861\u9AA8\u5934\u8F83\u5C0F\uFF0C\u8FDC\u7AEF\u9760\u8FD1\u8155\u90E8\u8F83\u5BBD\u3002",look:"\u89C2\u5BDF\u8FD1\u7AEF\u5706\u76D8\u72B6\u9AA8\u5934\uFF0C\u518D\u5BF9\u7167\u8FDC\u7AEF\u4E0E\u8155\u9AA8\u7684\u6392\u5217\u3002",tip:"\u89E3\u5256\u5B66\u59FF\u52BF\u4E0B\u6861\u9AA8\u5728\u5916\u4FA7\uFF1B\u672C\u56FE\u6CA1\u6709\u6A21\u62DF\u524D\u81C2\u65CB\u8F6C\u3002",neighbors:["humerus-right","ulna-right","scaphoid-right","lunate-right"],side:"right",baseId:"radius",pinyin:"r\xE1o g\u01D4"},{id:"ulna-right",name:"\u53F3\u5C3A\u9AA8",en:"Ulna \xB7 right",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Ulna.r.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u5C0F\u6307\u4E00\u4FA7\uFF0C\u8FD1\u7AEF\u5F62\u6210\u660E\u663E\u7684\u9E70\u5634\u4E0E\u6ED1\u8F66\u5207\u8FF9\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u8FD1\u7AEF\u94A9\u72B6\u8F6E\u5ED3\uFF0C\u518D\u6BD4\u8F83\u7EC6\u5C0F\u7684\u8FDC\u7AEF\u4E0E\u6861\u9AA8\u8FDC\u7AEF\u3002",tip:"\u5C3A\u9AA8\u4E0E\u8155\u9AA8\u4E4B\u95F4\u6709\u8F6F\u7EC4\u7EC7\u7ED3\u6784\uFF0C\u4E0D\u5E94\u628A\u5B83\u4E0E\u8155\u9AA8\u7B80\u5355\u6807\u6210\u76F4\u63A5\u9AA8\u5173\u8282\u3002",neighbors:["humerus-right","radius-right"],side:"right",baseId:"ulna",pinyin:""},{id:"clavicle-left",name:"\u5DE6\u9501\u9AA8",en:"Clavicle \xB7 left",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Clavicle.l.001"],description:"\u6A2A\u4F4D\u4E8E\u80F8\u5ED3\u524D\u4E0A\u65B9\uFF0C\u5185\u7AEF\u63A5\u80F8\u9AA8\uFF0C\u5916\u7AEF\u63A5\u80A9\u80DB\u9AA8\u80A9\u5CF0\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83S\u5F62\u8F6E\u5ED3\u548C\u4E24\u7AEF\uFF1B\u5728\u539F\u4F4D\u67E5\u770B\u5B83\u5982\u4F55\u8FDE\u63A5\u80F8\u9AA8\u548C\u80A9\u90E8\u3002",tip:"\u9AA8\u6027\u8FDE\u63A5\u4E4B\u5916\u8FD8\u6709\u97E7\u5E26\u548C\u5173\u8282\u76D8\u7B49\u8F6F\u7EC4\u7EC7\uFF0C\u672C\u7248\u672A\u663E\u793A\u3002",neighbors:["sternum","scapula-left"],side:"left",baseId:"clavicle",pinyin:""},{id:"scapula-left",name:"\u5DE6\u80A9\u80DB\u9AA8",en:"Scapula \xB7 left",group:"shoulder",region:"\u80A9\u5E26\u9AA8",sourceNodes:["Scapula.l.001"],description:"\u4F4D\u4E8E\u80F8\u5ED3\u540E\u4E0A\u65B9\uFF0C\u662F\u6241\u5E73\u7684\u80A9\u5E26\u9AA8\uFF1B\u5916\u4FA7\u5173\u8282\u76C2\u4E0E\u80B1\u9AA8\u5934\u76F8\u5BF9\u3002",look:"\u4ECE\u540E\u9762\u770B\u80A9\u80DB\u5188\u3001\u80A9\u5CF0\uFF0C\u4ECE\u5916\u4FA7\u770B\u5173\u8282\u76C2\u548C\u5599\u7A81\uFF0C\u518D\u89C2\u5BDF\u9762\u5411\u808B\u9AA8\u7684\u524D\u9762\u3002",tip:"\u80A9\u80DB\u9AA8\u8D34\u8FD1\u80F8\u5ED3\uFF0C\u4F46\u4E0D\u4E0E\u808B\u9AA8\u76F4\u63A5\u5F62\u6210\u666E\u901A\u9AA8\u6027\u5173\u8282\u3002",neighbors:["clavicle-left","humerus-left"],side:"left",baseId:"scapula",pinyin:"ji\u01CE g\u01D4"},{id:"humerus-left",name:"\u5DE6\u80B1\u9AA8",en:"Humerus \xB7 left",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Humerus.l.001"],description:"\u4F4D\u4E8E\u4E0A\u81C2\uFF1B\u4E0A\u7AEF\u4E3A\u80B1\u9AA8\u5934\uFF0C\u4E0B\u7AEF\u4E0E\u5C3A\u9AA8\u3001\u6861\u9AA8\u8854\u63A5\u3002",look:"\u6BD4\u8F83\u4E0A\u7AEF\u5706\u5F62\u9AA8\u5934\u548C\u4E0B\u7AEF\u6ED1\u8F66\u3001\u5C0F\u5934\u7B49\u533A\u57DF\uFF0C\u518D\u770B\u9AA8\u5E72\u3002",tip:"\u4E0A\u7AEF\u53C2\u4E0E\u80A9\u5173\u8282\uFF0C\u4E0B\u7AEF\u53C2\u4E0E\u8098\u5173\u8282\u3002",neighbors:["scapula-left","ulna-left","radius-left"],side:"left",baseId:"humerus",pinyin:"g\u014Dng g\u01D4"},{id:"radius-left",name:"\u5DE6\u6861\u9AA8",en:"Radius \xB7 left",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Radius.l.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u62C7\u6307\u4E00\u4FA7\uFF1B\u8FD1\u7AEF\u7684\u6861\u9AA8\u5934\u8F83\u5C0F\uFF0C\u8FDC\u7AEF\u9760\u8FD1\u8155\u90E8\u8F83\u5BBD\u3002",look:"\u89C2\u5BDF\u8FD1\u7AEF\u5706\u76D8\u72B6\u9AA8\u5934\uFF0C\u518D\u5BF9\u7167\u8FDC\u7AEF\u4E0E\u8155\u9AA8\u7684\u6392\u5217\u3002",tip:"\u89E3\u5256\u5B66\u59FF\u52BF\u4E0B\u6861\u9AA8\u5728\u5916\u4FA7\uFF1B\u672C\u56FE\u6CA1\u6709\u6A21\u62DF\u524D\u81C2\u65CB\u8F6C\u3002",neighbors:["humerus-left","ulna-left","scaphoid-left","lunate-left"],side:"left",baseId:"radius",pinyin:"r\xE1o g\u01D4"},{id:"ulna-left",name:"\u5DE6\u5C3A\u9AA8",en:"Ulna \xB7 left",group:"arm",region:"\u4E0A\u81C2\u4E0E\u524D\u81C2",sourceNodes:["Ulna.l.001"],description:"\u4F4D\u4E8E\u524D\u81C2\u5C0F\u6307\u4E00\u4FA7\uFF0C\u8FD1\u7AEF\u5F62\u6210\u660E\u663E\u7684\u9E70\u5634\u4E0E\u6ED1\u8F66\u5207\u8FF9\u3002",look:"\u4ECE\u4FA7\u9762\u770B\u8FD1\u7AEF\u94A9\u72B6\u8F6E\u5ED3\uFF0C\u518D\u6BD4\u8F83\u7EC6\u5C0F\u7684\u8FDC\u7AEF\u4E0E\u6861\u9AA8\u8FDC\u7AEF\u3002",tip:"\u5C3A\u9AA8\u4E0E\u8155\u9AA8\u4E4B\u95F4\u6709\u8F6F\u7EC4\u7EC7\u7ED3\u6784\uFF0C\u4E0D\u5E94\u628A\u5B83\u4E0E\u8155\u9AA8\u7B80\u5355\u6807\u6210\u76F4\u63A5\u9AA8\u5173\u8282\u3002",neighbors:["humerus-left","radius-left"],side:"left",baseId:"ulna",pinyin:""},{id:"scaphoid-right",name:"\u53F3\u624B\u821F\u9AA8",en:"Scaphoid bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Scaphoid bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FD1\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u821F\u9AA8\u8FD1\u7AEF\u4E0E\u6861\u9AA8\u76F8\u5BF9\uFF0C\u8FDC\u7AEF\u671D\u5411\u5927\u3001\u5C0F\u591A\u89D2\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u624B\u821F\u9AA8\u4F4D\u4E8E\u8155\u90E8\uFF0C\u8DB3\u821F\u9AA8\u4F4D\u4E8E\u8DB3\u90E8\uFF0C\u4E24\u8005\u4E0D\u662F\u540C\u4E00\u5757\u9AA8\u3002",neighbors:["radius-right","lunate-right","trapezium-right","trapezoid-right","capitate-right"],side:"right",baseId:"scaphoid",pinyin:""},{id:"lunate-right",name:"\u53F3\u6708\u9AA8",en:"Lunate bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Lunate bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FD1\u4FA7\u5217\u4E2D\u90E8\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u671D\u5411\u6861\u9AA8\u7684\u8FD1\u7AEF\u51F8\u9762\u4E0E\u671D\u5411\u5934\u72B6\u9AA8\u7684\u8FDC\u7AEF\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["radius-right","scaphoid-right","triquetrum-right","capitate-right","hamate-right"],side:"right",baseId:"lunate",pinyin:""},{id:"triquetrum-right",name:"\u53F3\u4E09\u89D2\u9AA8",en:"Triquetrum bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Triquetrum bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FD1\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u638C\u4FA7\u90BB\u63A5\u8C4C\u8C46\u9AA8\uFF0C\u8FDC\u4FA7\u90BB\u63A5\u94A9\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-right","pisiform-right","hamate-right"],side:"right",baseId:"triquetrum",pinyin:""},{id:"pisiform-right",name:"\u53F3\u8C4C\u8C46\u9AA8",en:"Pisiform bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Pisiform bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8155\u90E8\u638C\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u627E\u5230\u5B83\u4E0E\u4E09\u89D2\u9AA8\u76F8\u5BF9\u7684\u9AA8\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["triquetrum-right"],side:"right",baseId:"pisiform",pinyin:""},{id:"trapezium-right",name:"\u53F3\u5927\u591A\u89D2\u9AA8",en:"Trapezium bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezium bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u5B83\u4E0E\u7B2C\u4E00\u638C\u9AA8\u57FA\u5E95\u76F8\u5BF9\u7684\u978D\u5F62\u5173\u8282\u533A\u57DF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-right","trapezoid-right","hand-metacarpal-1-right","hand-metacarpal-2-right"],side:"right",baseId:"trapezium",pinyin:""},{id:"trapezoid-right",name:"\u53F3\u5C0F\u591A\u89D2\u9AA8",en:"Trapezoid bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezoid bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u7B2C\u4E8C\u638C\u9AA8\u540E\u65B9\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u5B83\u5939\u5728\u5927\u591A\u89D2\u9AA8\u548C\u5934\u72B6\u9AA8\u4E4B\u95F4\u7684\u4F4D\u7F6E\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-right","trapezium-right","capitate-right","hand-metacarpal-2-right"],side:"right",baseId:"trapezoid",pinyin:""},{id:"capitate-right",name:"\u53F3\u5934\u72B6\u9AA8",en:"Capitate bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Capitate bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u4E2D\u592E\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u8F83\u5706\u7684\u5934\u90E8\u4E0E\u5411\u7B2C\u4E09\u638C\u9AA8\u63A5\u7EED\u7684\u8FDC\u7AEF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-right","lunate-right","trapezoid-right","hamate-right","hand-metacarpal-2-right","hand-metacarpal-3-right","hand-metacarpal-4-right"],side:"right",baseId:"capitate",pinyin:""},{id:"hamate-right",name:"\u53F3\u94A9\u9AA8",en:"Hamate bone \xB7 right",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Hamate bone.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u8FDC\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u4ECE\u638C\u4FA7\u5BFB\u627E\u94A9\u72B6\u7A81\u8D77\uFF0C\u518D\u770B\u5B83\u4E0E\u7B2C\u56DB\u3001\u7B2C\u4E94\u638C\u9AA8\u7684\u63A5\u7EED\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-right","triquetrum-right","capitate-right","hand-metacarpal-4-right","hand-metacarpal-5-right"],side:"right",baseId:"hamate",pinyin:""},{id:"hand-metacarpal-1-right",name:"\u53F3\u7B2C1\u638C\u9AA8",en:"First metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["First metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C1\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-right","hand-proximal-1-right"],side:"right",baseId:"hand-metacarpal-1",pinyin:""},{id:"hand-proximal-1-right",name:"\u53F3\u62C7\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 1 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of first finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u62C7\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-1-right","hand-distal-1-right"],side:"right",baseId:"hand-proximal-1",pinyin:""},{id:"hand-distal-1-right",name:"\u53F3\u62C7\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 1 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of first finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u62C7\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-1-right"],side:"right",baseId:"hand-distal-1",pinyin:""},{id:"hand-metacarpal-2-right",name:"\u53F3\u7B2C2\u638C\u9AA8",en:"Second metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Second metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C2\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-right","trapezoid-right","capitate-right","hand-proximal-2-right"],side:"right",baseId:"hand-metacarpal-2",pinyin:""},{id:"hand-proximal-2-right",name:"\u53F3\u793A\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 2 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of second finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u793A\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-2-right","hand-middle-2-right"],side:"right",baseId:"hand-proximal-2",pinyin:""},{id:"hand-middle-2-right",name:"\u53F3\u793A\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 2 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of second finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u793A\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-2-right","hand-distal-2-right"],side:"right",baseId:"hand-middle-2",pinyin:""},{id:"hand-distal-2-right",name:"\u53F3\u793A\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 2 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of second finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u793A\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-2-right"],side:"right",baseId:"hand-distal-2",pinyin:""},{id:"hand-metacarpal-3-right",name:"\u53F3\u7B2C3\u638C\u9AA8",en:"Third metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Third metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C3\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-right","hand-proximal-3-right"],side:"right",baseId:"hand-metacarpal-3",pinyin:""},{id:"hand-proximal-3-right",name:"\u53F3\u4E2D\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 3 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of third finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u4E2D\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-3-right","hand-middle-3-right"],side:"right",baseId:"hand-proximal-3",pinyin:""},{id:"hand-middle-3-right",name:"\u53F3\u4E2D\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 3 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of third finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u4E2D\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-3-right","hand-distal-3-right"],side:"right",baseId:"hand-middle-3",pinyin:""},{id:"hand-distal-3-right",name:"\u53F3\u4E2D\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 3 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of third finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u4E2D\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-3-right"],side:"right",baseId:"hand-distal-3",pinyin:""},{id:"hand-metacarpal-4-right",name:"\u53F3\u7B2C4\u638C\u9AA8",en:"Fourth metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fourth metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C4\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-right","hamate-right","hand-proximal-4-right"],side:"right",baseId:"hand-metacarpal-4",pinyin:""},{id:"hand-proximal-4-right",name:"\u53F3\u73AF\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 4 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fourth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u73AF\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-4-right","hand-middle-4-right"],side:"right",baseId:"hand-proximal-4",pinyin:""},{id:"hand-middle-4-right",name:"\u53F3\u73AF\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 4 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fourth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u73AF\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-4-right","hand-distal-4-right"],side:"right",baseId:"hand-middle-4",pinyin:""},{id:"hand-distal-4-right",name:"\u53F3\u73AF\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 4 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fourth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u73AF\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-4-right"],side:"right",baseId:"hand-distal-4",pinyin:""},{id:"hand-metacarpal-5-right",name:"\u53F3\u7B2C5\u638C\u9AA8",en:"Fifth metacarpal \xB7 right",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fifth metacarpal bone.r.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C5\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["hamate-right","hand-proximal-5-right"],side:"right",baseId:"hand-metacarpal-5",pinyin:""},{id:"hand-proximal-5-right",name:"\u53F3\u5C0F\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 5 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fifth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u5C0F\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-5-right","hand-middle-5-right"],side:"right",baseId:"hand-proximal-5",pinyin:""},{id:"hand-middle-5-right",name:"\u53F3\u5C0F\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 5 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fifth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u5C0F\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-5-right","hand-distal-5-right"],side:"right",baseId:"hand-middle-5",pinyin:""},{id:"hand-distal-5-right",name:"\u53F3\u5C0F\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 5 \xB7 right",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fifth finger of hand.r.001"],description:"\u4F4D\u4E8E\u53F3\u624B\u5C0F\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-5-right"],side:"right",baseId:"hand-distal-5",pinyin:""},{id:"scaphoid-left",name:"\u5DE6\u624B\u821F\u9AA8",en:"Scaphoid bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Scaphoid bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FD1\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u821F\u9AA8\u8FD1\u7AEF\u4E0E\u6861\u9AA8\u76F8\u5BF9\uFF0C\u8FDC\u7AEF\u671D\u5411\u5927\u3001\u5C0F\u591A\u89D2\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u624B\u821F\u9AA8\u4F4D\u4E8E\u8155\u90E8\uFF0C\u8DB3\u821F\u9AA8\u4F4D\u4E8E\u8DB3\u90E8\uFF0C\u4E24\u8005\u4E0D\u662F\u540C\u4E00\u5757\u9AA8\u3002",neighbors:["radius-left","lunate-left","trapezium-left","trapezoid-left","capitate-left"],side:"left",baseId:"scaphoid",pinyin:""},{id:"lunate-left",name:"\u5DE6\u6708\u9AA8",en:"Lunate bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Lunate bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FD1\u4FA7\u5217\u4E2D\u90E8\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u671D\u5411\u6861\u9AA8\u7684\u8FD1\u7AEF\u51F8\u9762\u4E0E\u671D\u5411\u5934\u72B6\u9AA8\u7684\u8FDC\u7AEF\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["radius-left","scaphoid-left","triquetrum-left","capitate-left","hamate-left"],side:"left",baseId:"lunate",pinyin:""},{id:"triquetrum-left",name:"\u5DE6\u4E09\u89D2\u9AA8",en:"Triquetrum bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Triquetrum bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FD1\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u638C\u4FA7\u90BB\u63A5\u8C4C\u8C46\u9AA8\uFF0C\u8FDC\u4FA7\u90BB\u63A5\u94A9\u9AA8\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-left","pisiform-left","hamate-left"],side:"left",baseId:"triquetrum",pinyin:""},{id:"pisiform-left",name:"\u5DE6\u8C4C\u8C46\u9AA8",en:"Pisiform bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Pisiform bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8155\u90E8\u638C\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u627E\u5230\u5B83\u4E0E\u4E09\u89D2\u9AA8\u76F8\u5BF9\u7684\u9AA8\u9762\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["triquetrum-left"],side:"left",baseId:"pisiform",pinyin:""},{id:"trapezium-left",name:"\u5DE6\u5927\u591A\u89D2\u9AA8",en:"Trapezium bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezium bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u62C7\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u6BD4\u8F83\u5B83\u4E0E\u7B2C\u4E00\u638C\u9AA8\u57FA\u5E95\u76F8\u5BF9\u7684\u978D\u5F62\u5173\u8282\u533A\u57DF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-left","trapezoid-left","hand-metacarpal-1-left","hand-metacarpal-2-left"],side:"left",baseId:"trapezium",pinyin:""},{id:"trapezoid-left",name:"\u5DE6\u5C0F\u591A\u89D2\u9AA8",en:"Trapezoid bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Trapezoid bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u7B2C\u4E8C\u638C\u9AA8\u540E\u65B9\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u5B83\u5939\u5728\u5927\u591A\u89D2\u9AA8\u548C\u5934\u72B6\u9AA8\u4E4B\u95F4\u7684\u4F4D\u7F6E\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-left","trapezium-left","capitate-left","hand-metacarpal-2-left"],side:"left",baseId:"trapezoid",pinyin:""},{id:"capitate-left",name:"\u5DE6\u5934\u72B6\u9AA8",en:"Capitate bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Capitate bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u4E2D\u592E\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u89C2\u5BDF\u8F83\u5706\u7684\u5934\u90E8\u4E0E\u5411\u7B2C\u4E09\u638C\u9AA8\u63A5\u7EED\u7684\u8FDC\u7AEF\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["scaphoid-left","lunate-left","trapezoid-left","hamate-left","hand-metacarpal-2-left","hand-metacarpal-3-left","hand-metacarpal-4-left"],side:"left",baseId:"capitate",pinyin:""},{id:"hamate-left",name:"\u5DE6\u94A9\u9AA8",en:"Hamate bone \xB7 left",group:"carpal",region:"\u8155\u9AA8",sourceNodes:["Hamate bone.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u8FDC\u4FA7\u5217\u5C0F\u6307\u4FA7\uFF0C\u662F\u516B\u5757\u8155\u9AA8\u4E4B\u4E00\u3002",look:"\u4ECE\u638C\u4FA7\u5BFB\u627E\u94A9\u72B6\u7A81\u8D77\uFF0C\u518D\u770B\u5B83\u4E0E\u7B2C\u56DB\u3001\u7B2C\u4E94\u638C\u9AA8\u7684\u63A5\u7EED\u3002\u5355\u9AA8\u89C2\u5BDF\u53EF\u6392\u9664\u5468\u56F4\u8155\u9AA8\u7684\u906E\u6321\u3002",tip:"\u8155\u9AA8\u6309\u8FD1\u4FA7\u5217\u4E0E\u8FDC\u4FA7\u5217\u89C2\u5BDF\uFF1B\u5C55\u5F00\u8DDD\u79BB\u53EA\u662F\u663E\u793A\u6548\u679C\u3002",neighbors:["lunate-left","triquetrum-left","capitate-left","hand-metacarpal-4-left","hand-metacarpal-5-left"],side:"left",baseId:"hamate",pinyin:""},{id:"hand-metacarpal-1-left",name:"\u5DE6\u7B2C1\u638C\u9AA8",en:"First metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["First metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C1\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-left","hand-proximal-1-left"],side:"left",baseId:"hand-metacarpal-1",pinyin:""},{id:"hand-proximal-1-left",name:"\u5DE6\u62C7\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 1 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of first finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u62C7\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-1-left","hand-distal-1-left"],side:"left",baseId:"hand-proximal-1",pinyin:""},{id:"hand-distal-1-left",name:"\u5DE6\u62C7\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 1 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of first finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u62C7\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-1-left"],side:"left",baseId:"hand-distal-1",pinyin:""},{id:"hand-metacarpal-2-left",name:"\u5DE6\u7B2C2\u638C\u9AA8",en:"Second metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Second metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C2\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["trapezium-left","trapezoid-left","capitate-left","hand-proximal-2-left"],side:"left",baseId:"hand-metacarpal-2",pinyin:""},{id:"hand-proximal-2-left",name:"\u5DE6\u793A\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 2 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of second finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u793A\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-2-left","hand-middle-2-left"],side:"left",baseId:"hand-proximal-2",pinyin:""},{id:"hand-middle-2-left",name:"\u5DE6\u793A\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 2 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of second finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u793A\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-2-left","hand-distal-2-left"],side:"left",baseId:"hand-middle-2",pinyin:""},{id:"hand-distal-2-left",name:"\u5DE6\u793A\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 2 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of second finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u793A\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-2-left"],side:"left",baseId:"hand-distal-2",pinyin:""},{id:"hand-metacarpal-3-left",name:"\u5DE6\u7B2C3\u638C\u9AA8",en:"Third metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Third metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C3\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-left","hand-proximal-3-left"],side:"left",baseId:"hand-metacarpal-3",pinyin:""},{id:"hand-proximal-3-left",name:"\u5DE6\u4E2D\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 3 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of third finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u4E2D\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-3-left","hand-middle-3-left"],side:"left",baseId:"hand-proximal-3",pinyin:""},{id:"hand-middle-3-left",name:"\u5DE6\u4E2D\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 3 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of third finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u4E2D\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-3-left","hand-distal-3-left"],side:"left",baseId:"hand-middle-3",pinyin:""},{id:"hand-distal-3-left",name:"\u5DE6\u4E2D\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 3 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of third finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u4E2D\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-3-left"],side:"left",baseId:"hand-distal-3",pinyin:""},{id:"hand-metacarpal-4-left",name:"\u5DE6\u7B2C4\u638C\u9AA8",en:"Fourth metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fourth metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C4\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["capitate-left","hamate-left","hand-proximal-4-left"],side:"left",baseId:"hand-metacarpal-4",pinyin:""},{id:"hand-proximal-4-left",name:"\u5DE6\u73AF\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 4 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fourth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u73AF\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-4-left","hand-middle-4-left"],side:"left",baseId:"hand-proximal-4",pinyin:""},{id:"hand-middle-4-left",name:"\u5DE6\u73AF\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 4 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fourth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u73AF\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-4-left","hand-distal-4-left"],side:"left",baseId:"hand-middle-4",pinyin:""},{id:"hand-distal-4-left",name:"\u5DE6\u73AF\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 4 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fourth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u73AF\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-4-left"],side:"left",baseId:"hand-distal-4",pinyin:""},{id:"hand-metacarpal-5-left",name:"\u5DE6\u7B2C5\u638C\u9AA8",en:"Fifth metacarpal \xB7 left",group:"metacarpal",region:"\u638C\u9AA8",sourceNodes:["Fifth metacarpal bone.l.001"],description:"\u4ECE\u62C7\u6307\u5230\u5C0F\u6307\u7F16\u53F7\uFF0C\u8FD9\u662F\u7B2C5\u638C\u9AA8\uFF0C\u4F4D\u4E8E\u624B\u638C\u5185\u90E8\u3002",look:"\u6CBF\u8FD1\u7AEF\u57FA\u5E95\u3001\u9AA8\u5E72\u3001\u8FDC\u7AEF\u638C\u9AA8\u5934\u4F9D\u6B21\u89C2\u5BDF\uFF0C\u518D\u5BF9\u7167\u540C\u5217\u8FD1\u8282\u6307\u9AA8\u3002",tip:"\u638C\u9AA8\u5C5E\u4E8E\u624B\u638C\uFF0C\u6307\u9AA8\u5C5E\u4E8E\u624B\u6307\u3002",neighbors:["hamate-left","hand-proximal-5-left"],side:"left",baseId:"hand-metacarpal-5",pinyin:""},{id:"hand-proximal-5-left",name:"\u5DE6\u5C0F\u6307\u8FD1\u8282\u6307\u9AA8",en:"Proximal phalanx \xB7 finger 5 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Proximal phalanx of fifth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u5C0F\u6307\u7684\u8FD1\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-metacarpal-5-left","hand-middle-5-left"],side:"left",baseId:"hand-proximal-5",pinyin:""},{id:"hand-middle-5-left",name:"\u5DE6\u5C0F\u6307\u4E2D\u8282\u6307\u9AA8",en:"Middle phalanx \xB7 finger 5 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Middle phalanx of fifth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u5C0F\u6307\u7684\u4E2D\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-proximal-5-left","hand-distal-5-left"],side:"left",baseId:"hand-middle-5",pinyin:""},{id:"hand-distal-5-left",name:"\u5DE6\u5C0F\u6307\u8FDC\u8282\u6307\u9AA8",en:"Distal phalanx \xB7 finger 5 \xB7 left",group:"hand-phalanges",region:"\u6307\u9AA8",sourceNodes:["Distal phalanx of fifth finger of hand.l.001"],description:"\u4F4D\u4E8E\u5DE6\u624B\u5C0F\u6307\u7684\u8FDC\u8282\u3002",look:"\u8F6C\u52A8\u6BD4\u8F83\u8FD1\u7AEF\u57FA\u5E95\u4E0E\u8FDC\u7AEF\u5F62\u6001\uFF0C\u518D\u5728\u624B\u90E8\u533A\u57DF\u6CBF\u540C\u4E00\u624B\u6307\u9010\u8282\u5B9A\u4F4D\u3002",tip:"\u62C7\u6307\u53EA\u6709\u8FD1\u8282\u3001\u8FDC\u8282\uFF1B\u5176\u4F59\u56DB\u6307\u5404\u6709\u8FD1\u8282\u3001\u4E2D\u8282\u3001\u8FDC\u8282\u3002",neighbors:["hand-middle-5-left"],side:"left",baseId:"hand-distal-5",pinyin:""}];var uf=[{id:"cranial",name:"\u8111\u9885\u9AA8",pinyin:"",count:8,color:"#a99e84"},{id:"facial",name:"\u9762\u9885\u9AA8",pinyin:"",count:14,color:"#bda78c"},{id:"head-other",name:"\u820C\u9AA8\u4E0E\u542C\u5C0F\u9AA8",pinyin:"",count:7,color:"#b6a9bc"},{id:"cervical",name:"\u9888\u690E",pinyin:"",count:7,color:"#9baeba"},{id:"thoracic",name:"\u80F8\u690E",pinyin:"",count:12,color:"#abb293"},{id:"thorax",name:"\u808B\u9AA8\u4E0E\u80F8\u9AA8",pinyin:"",count:25,color:"#bdac88"},{id:"shoulder",name:"\u80A9\u5E26\u9AA8",pinyin:"",count:4,color:"#a3b8a4"},{id:"arm",name:"\u4E0A\u81C2\u4E0E\u524D\u81C2",pinyin:"",count:6,color:"#a4b4b3"},{id:"carpal",name:"\u8155\u9AA8",pinyin:"",count:16,color:"#baa997"},{id:"metacarpal",name:"\u638C\u9AA8",pinyin:"",count:10,color:"#99b1b3"},{id:"hand-phalanges",name:"\u6307\u9AA8",pinyin:"",count:28,color:"#b6a2ad"}];var Ul=["cranial","facial","head-other","cervical","thoracic","lumbar","thorax","shoulder","arm","carpal","metacarpal","hand-phalanges","pelvis","thigh","leg","tarsal","metatarsal","phalanges","sesamoid"],Dt=[...gt.map(n=>({...n,neighbors:[...n.neighbors]})),...hf],Zh=Object.fromEntries(Dt.map(n=>[n.id,n]));for(let n of Dt)n.studyRegion={cranial:"head",facial:"head","head-other":n.id==="hyoid"?"head":"auditory",cervical:"cervical",thoracic:"thoracic",lumbar:"lumbar",thorax:"thorax",shoulder:"shoulder",arm:"upper",carpal:"hand",metacarpal:"hand","hand-phalanges":"hand",pelvis:"pelvis",thigh:"knee",leg:"leg"}[n.group]||"foot";Zh.L1.neighbors=[...new Set(["T12",...Zh.L1.neighbors])];for(let n of Dt){n.neighbors=[...new Set(n.neighbors)].filter(e=>e!==n.id);for(let e of n.neighbors)if(!Zh[e])throw Error("Unknown neighbor "+e+" of "+n.id)}var va=[...uf,...ur].sort((n,e)=>Ul.indexOf(n.id)-Ul.indexOf(e.id));Dt.sort((n,e)=>Ul.indexOf(n.group)-Ul.indexOf(e.group));var _t=Object.fromEntries(Dt.map((n,e)=>[n.id,{...n,index:e+1}])),df=[...cf,{title:"OpenStax \xB7 \u6210\u4EBA\u9AA8\u9ABC\u6E05\u5355\u6838\u5BF9",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system",note:"\u9AA8\u540D\u3001\u5206\u7C7B\u4E0E\u8BA1\u6570\u6838\u5BF9\uFF1B\u4E2D\u6587\u5B66\u4E60\u8BF4\u660E\u4E3A\u672C\u9879\u76EE\u53E6\u884C\u64B0\u5199\u3002"},{title:"OpenStax \xB7 \u9885\u9AA8\u4E0E\u4E0A\u80A2",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull",note:"\u7528\u4E8E\u6838\u5BF9\u9885\u9AA8\u6784\u6210\uFF1B\u4E0D\u662F\u6A21\u578B\u7CBE\u5EA6\u8BA4\u8BC1\u3002"}];if(Dt.length!==210||new Set(Dt.map(n=>n.id)).size!==210)throw Error("Bone manifest incomplete");for(let n of va)if(Dt.filter(e=>e.group===n.id).length!==n.count)throw Error("Group count mismatch "+n.id);var J=n=>document.getElementById(n),Ta=n=>`<svg aria-hidden="true"><use href="#i-${n}"/></svg>`,ys=Ui.clamp,L={region:"body",side:"both",ready:!1,selected:"sternum",mode:"orbit",explode:0,labels:!1,colors:!1,ghost:!1,isolated:!1,neighbors:!1,hidden:new Set,view:"overview"},rt=new Map,vf=new Map,bf=new Map,$e=J("viewport"),Fl=new Jr,Jh=new Ee,Gt=new In;Gt.background=new we("#eff2e9");var Ve=new St(34,1,.5,2400),Mf=new ui;Gt.add(Mf);var Ht,Ye,xs,yn,_s,gs,ff,Ji,Oi,en,zn,Vn=new In;Vn.background=new we("#f6f7f1");var pf=performance.now(),tn=null,gr=!0,ji=null,ba="",mf=0,Ol=[],Kh;function vn(n){J("toast").textContent=n,J("toast").classList.add("visible"),clearTimeout(mf),mf=setTimeout(()=>J("toast").classList.remove("visible"),2600)}function Xx(n){console.error("[Foot Atlas]",n),J("loading").classList.remove("done"),J("loadingTitle").textContent="\u4E09\u7EF4\u6A21\u578B\u672A\u80FD\u6253\u5F00",J("loadingDetail").textContent=location.protocol==="file:"&&!window.FOOT_ATLAS_EMBEDDED?"\u6B64\u6E90\u7801\u7248\u9700\u8981\u672C\u5730\u7F51\u9875\u670D\u52A1\u3002\u8BF7\u6253\u5F00\u5DF2\u6253\u5305\u7684\u5355\u6587\u4EF6\u7248\uFF0C\u6216\u4F7F\u7528\u5728\u7EBF\u5730\u5740\u3002":"\u8BF7\u4F7F\u7528\u8F83\u65B0\u7684 Chrome\u3001Edge \u6216 Safari\uFF0C\u5E76\u542F\u7528\u786C\u4EF6\u52A0\u901F\u3002\u82E5\u8D44\u6E90\u672A\u52A0\u8F7D\u5B8C\u6574\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002",J("loadingProgress").style.width="0%",J("loading").querySelector("small").textContent=String(n?.message||n).slice(0,160),J("renderStatus").textContent="\u6A21\u578B\u672A\u5C31\u7EEA"}function qx(){J("boneTree").innerHTML=va.map(n=>`<section class="bone-group" data-group="${n.id}" style="--group-color:${n.color}"><div class="group-header" role="button" tabindex="0" aria-expanded="true"><span class="group-caret">\u25BE</span><span class="group-dot"></span><strong>${n.name}</strong><small>${n.pinyin} \xB7 ${n.count}</small><button class="group-visibility" data-group-eye="${n.id}" title="\u5207\u6362${n.name}\u53EF\u89C1\u6027" aria-label="\u5207\u6362${n.name}\u53EF\u89C1\u6027">${Ta("eye")}</button></div><div class="group-list">${Dt.filter(e=>e.group===n.id).map(e=>`<div class="bone-row" data-bone="${e.id}"><button class="bone-select" data-select="${e.id}" title="${e.name} \xB7 ${e.en}"><span>${e.name}</span>${e.id==="cuboid"?'<span class="short-pinyin">t\xF3u</span>':e.id==="cuneiform-medial"?'<span class="short-pinyin">xi\u0113</span>':""}</button><button class="bone-eye" data-eye="${e.id}" title="\u9690\u85CF ${e.name}" aria-label="\u9690\u85CF ${e.name}">${Ta("eye")}</button></div>`).join("")}</div></section>`).join(""),J("boneTree").querySelectorAll(".group-header").forEach(n=>{let e=()=>{n.parentElement.classList.toggle("collapsed"),n.setAttribute("aria-expanded",String(!n.parentElement.classList.contains("collapsed")))};n.addEventListener("click",t=>{t.target.closest("[data-group-eye]")||e()}),n.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&t.target===n&&(t.preventDefault(),e())})}),J("boneTree").querySelectorAll("[data-select]").forEach(n=>n.addEventListener("click",()=>Bi(n.dataset.select,!0))),J("boneTree").querySelectorAll("[data-eye]").forEach(n=>n.addEventListener("click",()=>Sf(n.dataset.eye))),J("boneTree").querySelectorAll("[data-group-eye]").forEach(n=>n.addEventListener("click",e=>{e.stopPropagation();let t=Dt.filter(s=>s.group===n.dataset.groupEye).map(s=>s.id),i=t.every(s=>L.hidden.has(s));t.forEach(s=>i?L.hidden.delete(s):L.hidden.add(s)),L.isolated&&mr(!1),Jt(),bn()})),J("search").addEventListener("input",()=>{let n=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s·]/g,""),e=n(J("search").value.trim()),t={talus:"jugu",calcaneus:"gengu",navicular:"zhougu",cuboid:"tougu",tarsal:"fugu",metatarsal:"zhigu",phalanges:"zhigu",sesamoid:"zigu",coccyx:"weigu",pelvis:"gupen"},i=0;if(document.querySelectorAll(".bone-row").forEach(s=>{let r=_t[s.dataset.bone],a=!e||n([r.name,r.en,r.pinyin||"",t[r.id]||"",t[r.group]||"",r.id.includes("cuneiform")?"xiegu":""].join(" ")).includes(e);s.hidden=!a,a&&i++}),document.querySelectorAll(".bone-group").forEach(s=>{s.hidden=![...s.querySelectorAll(".bone-row")].some(r=>!r.hidden),e&&(s.classList.remove("collapsed"),s.querySelector(".group-header").setAttribute("aria-expanded","true"))}),J("boneTree").querySelector(".empty-search")?.remove(),!i){let s=document.createElement("div");s.className="empty-search",s.textContent="\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u9AA8\u540D",J("boneTree").append(s)}})}function bn(){document.querySelectorAll(".bone-row").forEach(e=>{let t=e.dataset.bone,i=rt.get(t);e.classList.toggle("active",L.selected===t),e.classList.toggle("is-hidden",L.hidden.has(t)),e.classList.toggle("is-moved",!!i&&Bl(i)),e.querySelector("[data-select]").setAttribute("aria-pressed",String(L.selected===t)),e.querySelector("[data-eye]").title=`${L.hidden.has(t)?"\u663E\u793A":"\u9690\u85CF"} ${_t[t].name}`,e.querySelector("[data-eye]").setAttribute("aria-label",e.querySelector("[data-eye]").title)}),document.querySelectorAll("[data-group-eye]").forEach(e=>e.classList.toggle("off",Dt.filter(t=>t.group===e.dataset.groupEye).every(t=>L.hidden.has(t.id))));let n=[...rt.values()].filter(Bl).length;J("movedCount").hidden=!n,J("movedCount").textContent=`\u5DF2\u64CD\u4F5C ${n} \u5757`,J("hideSelectedBtn").innerHTML=`${Ta("eye")}${L.hidden.has(L.selected)?"\u663E\u793A\u672C\u9AA8":"\u9690\u85CF\u672C\u9AA8"}`}function Bi(n,e=!1){if(!_t[n])return;Qx(n),L.selected=n,L.hidden.delete(n);let t=_t[n],i=va.find(s=>s.id===t.group);if(J("boneIndex").textContent=`${String(t.index).padStart(2,"0")} / 210`,J("detailTitle").innerHTML=`<span class="group-tag">${i.name}${i.id==="tarsal"?" \xB7 f\u016B g\u01D4":""} <span> / </span> ${t.region}</span><h2 class="${t.name.length>6?"long-name":""}">${t.name}${t.pinyin?`<small>${t.pinyin}</small>`:""}</h2><p>${t.en}</p>`,J("description").textContent=t.description,J("look").textContent=t.look,J("studyTip").textContent=t.tip,J("neighbors").innerHTML=t.neighbors.map(s=>`<button data-neighbor="${s}" title="\u67E5\u770B ${_t[s].name}">${_t[s].name}</button>`).join(""),J("neighbors").querySelectorAll("button").forEach(s=>s.addEventListener("click",()=>Bi(s.dataset.neighbor,!0))),gr=!0,Jt(),bn(),Tf(),L.isolated&&mi(!0),!e){let s=document.querySelector(`[data-bone="${n}"]`),r=s?.closest(".bone-group");r&&(r.classList.remove("collapsed"),r.querySelector(".group-header").setAttribute("aria-expanded","true")),s?.scrollIntoView({block:"nearest",behavior:"smooth"})}}function Sf(n){L.ready&&(L.isolated&&mr(!1),L.hidden.has(n)?L.hidden.delete(n):L.hidden.add(n),Jt(),bn())}function Yx(){let n=new ii({color:"#e3dac6",roughness:.78,metalness:0,envMapIntensity:.42});return n.onBeforeCompile=e=>{e.vertexShader=`varying vec3 vBonePosition;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vBonePosition = position;`),e.fragmentShader=`varying vec3 vBonePosition;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
float grain = sin(vBonePosition.x * 10.13 + sin(vBonePosition.z * 9.71)) * sin(vBonePosition.y * 11.37 + vBonePosition.z * 6.7);
diffuseColor.rgb *= 0.985 + 0.015 * grain;`)},n.customProgramCacheKey=()=>"foot-atlas-bone-v1",n}function Jt(){let n=new Set(_t[L.selected]?.neighbors||[]),e=0;for(let[t,i]of rt){i.visible=!L.hidden.has(t)&&vs(t)&&(!L.isolated||t===L.selected),i.visible&&e++;let s=L.colors?va.find(a=>a.id===_t[t].group).color:"#e3dac6";t===L.selected?s="#8ab3a1":t===ba?s="#c6d6bc":L.neighbors&&n.has(t)&&(s="#c1d3a6"),i.material.color.set(s);let r=L.neighbors&&t!==L.selected&&!n.has(t);i.material.transparent=r,i.material.opacity=r?.13:1,i.material.depthWrite=!r,i.material.emissive.set(t===L.selected?"#234c3b":"#000000"),i.material.emissiveIntensity=t===L.selected?.045:0,i.material.needsUpdate=!0,i.castShadow=!r}J("visibleCount").textContent=`${e} / 210 \u53EF\u89C1`,J("neighborsBtn").classList.toggle("active",L.neighbors),J("neighborsBtn").setAttribute("aria-pressed",String(L.neighbors)),J("isolateBtn").innerHTML=L.isolated?`${Ta("layers")}\u8FD4\u56DE\u533A\u57DF`:`${Ta("focus")}\u5355\u72EC\u67E5\u770B`,J("isolateBanner").hidden=!L.isolated,gr=!0,kl(),L.ready&&Qh()}function Tf(){if(!Ji||!rt.has(L.selected))return;zn&&(Vn.remove(zn),zn.material.dispose());let n=rt.get(L.selected);zn=new Qe(n.geometry,new ii({color:"#d9d5be",roughness:.73,metalness:0})),Vn.add(zn),zn.geometry.computeBoundingSphere();let e=Math.max(zn.geometry.boundingSphere.radius,2);en.target.set(0,0,0);let t=e/Math.sin(Ui.degToRad(Oi.fov/2))/Math.min(Oi.aspect||1,1)*1.16;Oi.position.copy(new C(1,.75,1.2).normalize().multiplyScalar(t)),Oi.near=Math.max(e/100,.01),Oi.far=e*60,Oi.updateProjectionMatrix(),en.minDistance=e*1.4,en.maxDistance=t*3,en.update()}function gf(n,e){let t=_t[n],i=new C;if(t.group==="pelvis"){let o={"hip-right":[-140,20,35],"hip-left":[140,20,35],sacrum:[0,100,-120],coccyx:[0,-50,-170]};return i.fromArray(o[n])}if(n==="femur")return i.set(0,130,-40);if(n==="patella")return i.set(75,5,115);if(t.group==="leg")return i.set(n==="tibia"?95:-110,n==="tibia"?75:30,-25);if(t.group==="tarsal"){let o={talus:[10,84,-25],calcaneus:[0,-16,-68],navicular:[28,39,0],cuboid:[-66,3,-9],"cuneiform-medial":[72,22,32],"cuneiform-intermediate":[7,55,42],"cuneiform-lateral":[-34,27,33]};return i.fromArray(o[n])}if(t.group==="sesamoid")return i.set(e.x*1.4+(n.endsWith("medial")?18:-2),-55,75);let s=Number(n.split("-").at(-1)),r=(3-s)*30;if(t.group==="metatarsal")return i.set(r,8+s%2*8,72);let a=n.split("-")[0];return i.set(r*1.45,a==="proximal"?2:a==="middle"?12:24,a==="proximal"?122:a==="middle"?155:188)}var _f=99.55318155698478;function Ef(n,e){let t=_t[n],i=t.side==="left"?1:-1;if(t.group==="cervical"||t.group==="thoracic"){let r=Number(n.slice(1)),a=t.group==="cervical"?7:12;return new C((r%2?1:-1)*40,(a-r)*24+70,-50-r*10)}if(t.group==="thorax"){if(n==="sternum")return new C(0,20,180);let r=Number(n.split("-")[1]);return new C(i*(100+r*7),(7-r)*13,30)}if(["cranial","facial"].includes(t.group)){let r=e.clone().sub(new C(_f,1535,-100));return r.lengthSq()<1&&r.set(0,1,0),r.normalize().multiplyScalar(t.group==="cranial"?155:95)}if(t.group==="head-other")return n==="hyoid"?new C(0,-60,100):new C(i*(n.startsWith("malleus")?50:n.startsWith("incus")?80:110),15,30);if(t.group==="shoulder")return new C(i*180,55,t.baseId==="clavicle"?90:-90);if(t.group==="arm")return new C(i*(t.baseId==="humerus"?155:t.baseId==="radius"?210:280),t.baseId==="humerus"?50:-30,40);if(wf.has(t.group)){let r=Number(t.baseId.split("-").at(-1))||1,a=new C(i*(90+r*18),-35,25);return t.group==="hand-phalanges"&&(a.y-=t.baseId.includes("distal")?115:t.baseId.includes("middle")?80:50),t.group==="carpal"&&a.set(i*(65+Dt.findIndex(o=>o.id===n)%4*18),10,(Dt.findIndex(o=>o.id===n)%3-1)*50),a}let s;if(t.group==="lumbar"){let r=Number(n[1]);return new C((r%2?1:-1)*28,(6-r)*28+40,-35-r*15)}if(t.side==="left"&&t.group!=="pelvis"){let r=e.clone();r.x=2*_f-r.x,s=gf(t.baseId,r),s.x*=-1}else s=gf(n,e);return L.side==="both"&&!["lumbar","pelvis"].includes(t.group)&&(s.x+=t.side==="left"?105:-105),s}function _r(n,e=!0){if(L.ready){L.explode=ys(Number(n)||0,0,100),J("explode").value=String(L.explode),J("explode").style.setProperty("--progress",L.explode+"%"),J("explodeValue").innerHTML=`${Math.round(L.explode)}<span>%</span>`;for(let t of rt.values())t.userData.explosion=Ef(t.name,t.userData.home),t.position.copy(t.userData.home).addScaledVector(t.userData.explosion,L.explode/100).add(t.userData.offset);kl(),e&&!L.isolated&&mi(!0)}}function kl(){for(let[n,e]of rt){let t=e.position.distanceTo(e.userData.home)>.3||e.quaternion.angleTo(new Tt)>.04,i=L.ghost&&t&&e.visible&&!L.isolated,s=vf.get(n),r=bf.get(n);if(!(!s||!r)&&(s.visible=i,r.visible=i&&e.position.distanceTo(e.userData.home)>2,s.material.opacity=n===L.selected?.17:.085,r.visible)){let a=r.geometry.attributes.position;a.setXYZ(0,...e.userData.home.toArray()),a.setXYZ(1,...e.position.toArray()),a.needsUpdate=!0,r.computeLineDistances()}}}function Bl(n){return n.userData.offset.lengthSq()>.04||n.quaternion.angleTo(new Tt)>.015}function Ma(n=!1){if(L.ready){for(let e of rt.values())e.userData.offset.set(0,0,0),e.quaternion.identity();n&&(L.hidden.clear(),L.isolated=!1,L.neighbors=!1,L.ghost=!1,L.view="overview",J("ghostBtn").classList.remove("active"),J("ghostBtn").setAttribute("aria-pressed","false"),dr("orbit")),_r(0,!1),Jt(),bn(),n?Qi("overview"):mi(!0),vn("\u5DF2\u6062\u590D\u9AA8\u9ABC\u7684\u539F\u59CB\u4F4D\u7F6E\u4E0E\u671D\u5411")}}function Zx(){if(!L.ready)return;let n=rt.get(L.selected);n&&(n.userData.offset.set(0,0,0),n.quaternion.identity(),_r(L.explode,!1),bn(),L.isolated&&mi(!0),vn(`${_t[L.selected].name}\u5DF2\u5F52\u4F4D${L.explode?"\uFF0C\u4FDD\u7559\u6574\u4F53\u5C55\u5F00\u7A0B\u5EA6":""}`))}function dr(n){L.mode=n,document.querySelectorAll("[data-mode]").forEach(e=>{e.classList.toggle("active",e.dataset.mode===n),e.setAttribute("aria-pressed",String(e.dataset.mode===n))}),J("modeHint").textContent=n==="move"?"\u6309\u4F4F\u9AA8\u5934\u76F4\u63A5\u62D6\u51FA \xB7 \u62D6\u62FD\u7A7A\u767D\u4ECD\u53EF\u65CB\u8F6C\u6A21\u578B":n==="rotate"?"\u6309\u4F4F\u9AA8\u5934\u5355\u72EC\u8F6C\u52A8 \xB7 \u62D6\u62FD\u7A7A\u767D\u4ECD\u53EF\u65CB\u8F6C\u6A21\u578B":"\u62D6\u62FD\u7A7A\u767D\u6216\u9AA8\u9ABC\u65CB\u8F6C\u6A21\u578B \xB7 \u5355\u51FB\u9009\u62E9\u4E00\u5757\u9AA8",$e.style.cursor=n==="orbit"?"grab":"default",Ye&&(Ye.enabled=!0)}function Kx(){if(L.ready){if(L.isolated){mr();return}L.isolated=!0,L.neighbors=!1,L.hidden.delete(L.selected),Jt(),mi(!0)}}function mr(n=!0){L.isolated=!1,Jt(),n&&mi(!0)}function $x(){L.ready&&(L.isolated&&mr(!1),L.neighbors=!L.neighbors,L.neighbors&&_t[L.selected].neighbors.forEach(n=>L.hidden.delete(n)),Jt(),bn(),mi(!0),L.neighbors&&vn("\u7EFF\u8272\u4E3A\u4E3B\u8981\u90BB\u63A5\u9AA8\uFF1B\u534A\u900F\u660E\u4EC5\u662F\u663E\u793A\u6548\u679C"))}var jx={body:{both:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella","hip-right","hip-left","sacrum","coccyx","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left","L1","L2","L3","L4","L5","frontal","occipital","sphenoid","ethmoid","parietal-right","temporal-right","parietal-left","temporal-left","maxilla-right","zygomatic-right","nasal-right","lacrimal-right","palatine-right","inferior-concha-right","maxilla-left","zygomatic-left","nasal-left","lacrimal-left","palatine-left","inferior-concha-left","vomer","mandible","hyoid","malleus-right","incus-right","stapes-right","malleus-left","incus-left","stapes-left","C1","C2","C3","C4","C5","C6","C7","T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","rib-1-right","rib-2-right","rib-3-right","rib-4-right","rib-5-right","rib-6-right","rib-7-right","rib-8-right","rib-9-right","rib-10-right","rib-11-right","rib-12-right","rib-1-left","rib-2-left","rib-3-left","rib-4-left","rib-5-left","rib-6-left","rib-7-left","rib-8-left","rib-9-left","rib-10-left","rib-11-left","rib-12-left","sternum","clavicle-right","scapula-right","humerus-right","radius-right","ulna-right","clavicle-left","scapula-left","humerus-left","radius-left","ulna-left","scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right","hand-metacarpal-1-right","hand-proximal-1-right","hand-distal-1-right","hand-metacarpal-2-right","hand-proximal-2-right","hand-middle-2-right","hand-distal-2-right","hand-metacarpal-3-right","hand-proximal-3-right","hand-middle-3-right","hand-distal-3-right","hand-metacarpal-4-right","hand-proximal-4-right","hand-middle-4-right","hand-distal-4-right","hand-metacarpal-5-right","hand-proximal-5-right","hand-middle-5-right","hand-distal-5-right","scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left","hand-metacarpal-1-left","hand-proximal-1-left","hand-distal-1-left","hand-metacarpal-2-left","hand-proximal-2-left","hand-middle-2-left","hand-distal-2-left","hand-metacarpal-3-left","hand-proximal-3-left","hand-middle-3-left","hand-distal-3-left","hand-metacarpal-4-left","hand-proximal-4-left","hand-middle-4-left","hand-distal-4-left","hand-metacarpal-5-left","hand-proximal-5-left","hand-middle-5-left","hand-distal-5-left"],right:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella","hip-right","sacrum","coccyx","L1","L2","L3","L4","L5","frontal","occipital","sphenoid","ethmoid","parietal-right","temporal-right","maxilla-right","zygomatic-right","nasal-right","lacrimal-right","palatine-right","inferior-concha-right","vomer","mandible","hyoid","malleus-right","incus-right","stapes-right","C1","C2","C3","C4","C5","C6","C7","T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","rib-1-right","rib-2-right","rib-3-right","rib-4-right","rib-5-right","rib-6-right","rib-7-right","rib-8-right","rib-9-right","rib-10-right","rib-11-right","rib-12-right","sternum","clavicle-right","scapula-right","humerus-right","radius-right","ulna-right","scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right","hand-metacarpal-1-right","hand-proximal-1-right","hand-distal-1-right","hand-metacarpal-2-right","hand-proximal-2-right","hand-middle-2-right","hand-distal-2-right","hand-metacarpal-3-right","hand-proximal-3-right","hand-middle-3-right","hand-distal-3-right","hand-metacarpal-4-right","hand-proximal-4-right","hand-middle-4-right","hand-distal-4-right","hand-metacarpal-5-right","hand-proximal-5-right","hand-middle-5-right","hand-distal-5-right"],left:["hip-left","sacrum","coccyx","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left","L1","L2","L3","L4","L5","frontal","occipital","sphenoid","ethmoid","parietal-left","temporal-left","maxilla-left","zygomatic-left","nasal-left","lacrimal-left","palatine-left","inferior-concha-left","vomer","mandible","hyoid","malleus-left","incus-left","stapes-left","C1","C2","C3","C4","C5","C6","C7","T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","rib-1-left","rib-2-left","rib-3-left","rib-4-left","rib-5-left","rib-6-left","rib-7-left","rib-8-left","rib-9-left","rib-10-left","rib-11-left","rib-12-left","sternum","clavicle-left","scapula-left","humerus-left","radius-left","ulna-left","scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left","hand-metacarpal-1-left","hand-proximal-1-left","hand-distal-1-left","hand-metacarpal-2-left","hand-proximal-2-left","hand-middle-2-left","hand-distal-2-left","hand-metacarpal-3-left","hand-proximal-3-left","hand-middle-3-left","hand-distal-3-left","hand-metacarpal-4-left","hand-proximal-4-left","hand-middle-4-left","hand-distal-4-left","hand-metacarpal-5-left","hand-proximal-5-left","hand-middle-5-left","hand-distal-5-left"]},head:{both:["frontal","occipital","sphenoid","ethmoid","parietal-right","temporal-right","parietal-left","temporal-left","maxilla-right","zygomatic-right","nasal-right","lacrimal-right","palatine-right","inferior-concha-right","maxilla-left","zygomatic-left","nasal-left","lacrimal-left","palatine-left","inferior-concha-left","vomer","mandible","hyoid","malleus-right","incus-right","stapes-right","malleus-left","incus-left","stapes-left"],right:["frontal","occipital","sphenoid","ethmoid","parietal-right","temporal-right","maxilla-right","zygomatic-right","nasal-right","lacrimal-right","palatine-right","inferior-concha-right","vomer","mandible","hyoid","malleus-right","incus-right","stapes-right"],left:["frontal","occipital","sphenoid","ethmoid","parietal-left","temporal-left","maxilla-left","zygomatic-left","nasal-left","lacrimal-left","palatine-left","inferior-concha-left","vomer","mandible","hyoid","malleus-left","incus-left","stapes-left"]},auditory:{both:["malleus-right","incus-right","stapes-right","malleus-left","incus-left","stapes-left"],right:["malleus-right","incus-right","stapes-right"],left:["malleus-left","incus-left","stapes-left"]},cervical:{both:["C1","C2","C3","C4","C5","C6","C7"],right:["C1","C2","C3","C4","C5","C6","C7"],left:["C1","C2","C3","C4","C5","C6","C7"]},thoracic:{both:["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],right:["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],left:["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"]},spine:{both:["sacrum","coccyx","L1","L2","L3","L4","L5","C1","C2","C3","C4","C5","C6","C7","T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],right:["sacrum","coccyx","L1","L2","L3","L4","L5","C1","C2","C3","C4","C5","C6","C7","T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],left:["sacrum","coccyx","L1","L2","L3","L4","L5","C1","C2","C3","C4","C5","C6","C7","T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"]},thorax:{both:["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","rib-1-right","rib-2-right","rib-3-right","rib-4-right","rib-5-right","rib-6-right","rib-7-right","rib-8-right","rib-9-right","rib-10-right","rib-11-right","rib-12-right","rib-1-left","rib-2-left","rib-3-left","rib-4-left","rib-5-left","rib-6-left","rib-7-left","rib-8-left","rib-9-left","rib-10-left","rib-11-left","rib-12-left","sternum"],right:["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","rib-1-right","rib-2-right","rib-3-right","rib-4-right","rib-5-right","rib-6-right","rib-7-right","rib-8-right","rib-9-right","rib-10-right","rib-11-right","rib-12-right","sternum"],left:["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","rib-1-left","rib-2-left","rib-3-left","rib-4-left","rib-5-left","rib-6-left","rib-7-left","rib-8-left","rib-9-left","rib-10-left","rib-11-left","rib-12-left","sternum"]},shoulder:{both:["clavicle-right","scapula-right","humerus-right","clavicle-left","scapula-left","humerus-left"],right:["clavicle-right","scapula-right","humerus-right"],left:["clavicle-left","scapula-left","humerus-left"]},upper:{both:["clavicle-right","scapula-right","humerus-right","radius-right","ulna-right","clavicle-left","scapula-left","humerus-left","radius-left","ulna-left","scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right","hand-metacarpal-1-right","hand-proximal-1-right","hand-distal-1-right","hand-metacarpal-2-right","hand-proximal-2-right","hand-middle-2-right","hand-distal-2-right","hand-metacarpal-3-right","hand-proximal-3-right","hand-middle-3-right","hand-distal-3-right","hand-metacarpal-4-right","hand-proximal-4-right","hand-middle-4-right","hand-distal-4-right","hand-metacarpal-5-right","hand-proximal-5-right","hand-middle-5-right","hand-distal-5-right","scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left","hand-metacarpal-1-left","hand-proximal-1-left","hand-distal-1-left","hand-metacarpal-2-left","hand-proximal-2-left","hand-middle-2-left","hand-distal-2-left","hand-metacarpal-3-left","hand-proximal-3-left","hand-middle-3-left","hand-distal-3-left","hand-metacarpal-4-left","hand-proximal-4-left","hand-middle-4-left","hand-distal-4-left","hand-metacarpal-5-left","hand-proximal-5-left","hand-middle-5-left","hand-distal-5-left"],right:["clavicle-right","scapula-right","humerus-right","radius-right","ulna-right","scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right","hand-metacarpal-1-right","hand-proximal-1-right","hand-distal-1-right","hand-metacarpal-2-right","hand-proximal-2-right","hand-middle-2-right","hand-distal-2-right","hand-metacarpal-3-right","hand-proximal-3-right","hand-middle-3-right","hand-distal-3-right","hand-metacarpal-4-right","hand-proximal-4-right","hand-middle-4-right","hand-distal-4-right","hand-metacarpal-5-right","hand-proximal-5-right","hand-middle-5-right","hand-distal-5-right"],left:["clavicle-left","scapula-left","humerus-left","radius-left","ulna-left","scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left","hand-metacarpal-1-left","hand-proximal-1-left","hand-distal-1-left","hand-metacarpal-2-left","hand-proximal-2-left","hand-middle-2-left","hand-distal-2-left","hand-metacarpal-3-left","hand-proximal-3-left","hand-middle-3-left","hand-distal-3-left","hand-metacarpal-4-left","hand-proximal-4-left","hand-middle-4-left","hand-distal-4-left","hand-metacarpal-5-left","hand-proximal-5-left","hand-middle-5-left","hand-distal-5-left"]},elbow:{both:["humerus-right","radius-right","ulna-right","humerus-left","radius-left","ulna-left"],right:["humerus-right","radius-right","ulna-right"],left:["humerus-left","radius-left","ulna-left"]},wrist:{both:["radius-right","ulna-right","radius-left","ulna-left","scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right","scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left"],right:["radius-right","ulna-right","scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right"],left:["radius-left","ulna-left","scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left"]},hand:{both:["scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right","hand-metacarpal-1-right","hand-proximal-1-right","hand-distal-1-right","hand-metacarpal-2-right","hand-proximal-2-right","hand-middle-2-right","hand-distal-2-right","hand-metacarpal-3-right","hand-proximal-3-right","hand-middle-3-right","hand-distal-3-right","hand-metacarpal-4-right","hand-proximal-4-right","hand-middle-4-right","hand-distal-4-right","hand-metacarpal-5-right","hand-proximal-5-right","hand-middle-5-right","hand-distal-5-right","scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left","hand-metacarpal-1-left","hand-proximal-1-left","hand-distal-1-left","hand-metacarpal-2-left","hand-proximal-2-left","hand-middle-2-left","hand-distal-2-left","hand-metacarpal-3-left","hand-proximal-3-left","hand-middle-3-left","hand-distal-3-left","hand-metacarpal-4-left","hand-proximal-4-left","hand-middle-4-left","hand-distal-4-left","hand-metacarpal-5-left","hand-proximal-5-left","hand-middle-5-left","hand-distal-5-left"],right:["scaphoid-right","lunate-right","triquetrum-right","pisiform-right","trapezium-right","trapezoid-right","capitate-right","hamate-right","hand-metacarpal-1-right","hand-proximal-1-right","hand-distal-1-right","hand-metacarpal-2-right","hand-proximal-2-right","hand-middle-2-right","hand-distal-2-right","hand-metacarpal-3-right","hand-proximal-3-right","hand-middle-3-right","hand-distal-3-right","hand-metacarpal-4-right","hand-proximal-4-right","hand-middle-4-right","hand-distal-4-right","hand-metacarpal-5-right","hand-proximal-5-right","hand-middle-5-right","hand-distal-5-right"],left:["scaphoid-left","lunate-left","triquetrum-left","pisiform-left","trapezium-left","trapezoid-left","capitate-left","hamate-left","hand-metacarpal-1-left","hand-proximal-1-left","hand-distal-1-left","hand-metacarpal-2-left","hand-proximal-2-left","hand-middle-2-left","hand-distal-2-left","hand-metacarpal-3-left","hand-proximal-3-left","hand-middle-3-left","hand-distal-3-left","hand-metacarpal-4-left","hand-proximal-4-left","hand-middle-4-left","hand-distal-4-left","hand-metacarpal-5-left","hand-proximal-5-left","hand-middle-5-left","hand-distal-5-left"]},foot:{both:["talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left"],right:["talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral"],left:["talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left"]},ankle:{both:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left"],right:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral"],left:["tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left"]},leg:{both:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left"],right:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral"],left:["tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left"]},knee:{both:["tibia","fibula","femur","patella","tibia-left","fibula-left","femur-left","patella-left"],right:["tibia","fibula","femur","patella"],left:["tibia-left","fibula-left","femur-left","patella-left"]},whole:{both:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left"],right:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella"],left:["tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left"]},hip:{both:["femur","hip-right","hip-left","femur-left"],right:["femur","hip-right"],left:["hip-left","femur-left"]},pelvis:{both:["hip-right","hip-left","sacrum","coccyx"],right:["hip-right","hip-left","sacrum","coccyx"],left:["hip-right","hip-left","sacrum","coccyx"]},"pelvic-limb":{both:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella","hip-right","hip-left","sacrum","coccyx","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left"],right:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella","hip-right","hip-left","sacrum","coccyx"],left:["hip-right","hip-left","sacrum","coccyx","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left"]},lumbar:{both:["L1","L2","L3","L4","L5"],right:["L1","L2","L3","L4","L5"],left:["L1","L2","L3","L4","L5"]},lumbosacral:{both:["hip-right","hip-left","sacrum","coccyx","L1","L2","L3","L4","L5"],right:["hip-right","hip-left","sacrum","coccyx","L1","L2","L3","L4","L5"],left:["hip-right","hip-left","sacrum","coccyx","L1","L2","L3","L4","L5"]},all:{both:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella","hip-right","hip-left","sacrum","coccyx","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left","L1","L2","L3","L4","L5"],right:["tibia","fibula","talus","calcaneus","navicular","cuboid","cuneiform-medial","cuneiform-intermediate","cuneiform-lateral","metatarsal-1","metatarsal-2","metatarsal-3","metatarsal-4","metatarsal-5","proximal-1","distal-1","proximal-2","middle-2","distal-2","proximal-3","middle-3","distal-3","proximal-4","middle-4","distal-4","proximal-5","middle-5","distal-5","sesamoid-medial","sesamoid-lateral","femur","patella","hip-right","hip-left","sacrum","coccyx","L1","L2","L3","L4","L5"],left:["hip-right","hip-left","sacrum","coccyx","tibia-left","fibula-left","talus-left","calcaneus-left","navicular-left","cuboid-left","cuneiform-medial-left","cuneiform-intermediate-left","cuneiform-lateral-left","metatarsal-1-left","metatarsal-2-left","metatarsal-3-left","metatarsal-4-left","metatarsal-5-left","proximal-1-left","distal-1-left","proximal-2-left","middle-2-left","distal-2-left","proximal-3-left","middle-3-left","distal-3-left","proximal-4-left","middle-4-left","distal-4-left","proximal-5-left","middle-5-left","distal-5-left","sesamoid-medial-left","sesamoid-lateral-left","femur-left","patella-left","L1","L2","L3","L4","L5"]}},zl={body:["\u5168\u8EAB\u9AA8\u9ABC","Complete skeleton"],head:["\u5934\u9885\u4E0E\u820C\u9AA8","Skull & hyoid"],auditory:["\u542C\u5C0F\u9AA8","Auditory ossicles"],cervical:["\u9888\u690E C1\u2014C7","Cervical spine"],thoracic:["\u80F8\u690E T1\u2014T12","Thoracic spine"],spine:["\u810A\u67F1\u5168\u89C8","Vertebral column"],thorax:["\u80F8\u5ED3","Thoracic cage"],shoulder:["\u80A9\u90E8","Shoulders"],upper:["\u4E0A\u80A2\u5168\u89C8","Upper limbs"],elbow:["\u8098\u90E8","Elbows"],wrist:["\u8155\u90E8","Wrists"],hand:["\u624B\u90E8","Hands"],foot:["\u8DB3\u90E8","Feet"],ankle:["\u8DB3\u8E1D\u8FDE\u63A5","Ankles"],leg:["\u5C0F\u817F\u4E0E\u8DB3","Lower legs & feet"],knee:["\u819D\u90E8\u9AA8\u9ABC","Knees"],whole:["\u4E0B\u80A2\u5168\u89C8","Lower limbs"],hip:["\u9ACB\u90E8\u8FDE\u63A5","Hip joints"],pelvis:["\u9AA8\u6027\u9AA8\u76C6","Bony pelvis"],"pelvic-limb":["\u9AA8\u76C6\u4E0E\u4E0B\u80A2","Pelvis & lower limbs"],lumbar:["\u8170\u690E L1\u2014L5","Lumbar spine"],lumbosacral:["\u8170\u9AB6\u4E0E\u9AA8\u76C6","Lumbosacral & pelvis"],all:["\u8170\u690E\u3001\u9AA8\u76C6\u4E0E\u53CC\u4E0B\u80A2","Lumbar spine & lower limbs"]},pr=new Set(Object.keys(zl).filter(n=>!["foot","ankle","leg"].includes(n))),Sa=new Set(["pelvis","lumbar","lumbosacral","cervical","thoracic","spine"]);var wf=new Set(["carpal","metacarpal","hand-phalanges"]),iS=new Set(["shoulder","arm",...wf]),nS=Object.fromEntries(Object.entries(zl).map(([n,e])=>[n,e[0]]));function vs(n){return!!jx[L.region]?.[L.side]?.includes(n)}function Af(){return{body:"sternum",head:"frontal",cervical:"C2",thoracic:"T6",spine:"T6",thorax:"sternum",lumbar:"L5",lumbosacral:"L5",pelvis:"sacrum"}[L.region]||Dt.find(e=>vs(e.id))?.id||"sternum"}function Rf(){Gt.background.set("#eff2e9"),pr.has(L.region)&&Gt.background.multiplyScalar(2),Ve.far=pr.has(L.region)?24e3:6500,Ve.updateProjectionMatrix();for(let o of document.querySelectorAll("[data-region]")){let c=o.dataset.region===L.region;o.classList.toggle("active",c),o.setAttribute("aria-pressed",String(c))}for(let o of document.querySelectorAll("[data-side]")){let c=o.dataset.side===L.side;o.classList.toggle("active",c),o.setAttribute("aria-pressed",String(c)),o.disabled=Sa.has(L.region)}let[n,e]=zl[L.region],t=Sa.has(L.region)?"":L.side==="both"?"\u53CC\u4FA7":L.side==="right"?"\u4EBA\u4F53\u53F3\u4FA7":"\u4EBA\u4F53\u5DE6\u4FA7",i=document.createElement("span");i.textContent=e,J("regionHeading").replaceChildren(document.createTextNode(n+" "),i);let s=Dt.filter(o=>vs(o.id)).length;J("regionHint").textContent=n+" \xB7 "+s+" \u4E2A\u9AA8\u5757"+(t?" \xB7 "+t:"")+(L.region==="body"?" \xB7 206 \u6807\u51C6\u9AA8 + 4 \u7C7D\u9AA8":""),J("sideNotice").textContent="\u5DE6\u53F3\u5747\u6307\u4EBA\u4F53\u81EA\u8EAB\uFF1B\u6B63\u9762\u770B\uFF1A\u4EBA\u4F53\u53F3\u4FA7\u5728\u753B\u9762\u5DE6\u8FB9\u3002";let r=pr.has(L.region),a=Sa.has(L.region)||L.side==="both"||["body","head","thorax","auditory"].includes(L.region);document.querySelector('[data-view="dorsal"]').textContent=r?"\u4E0A\u65B9":"\u8DB3\u80CC",document.querySelector('[data-view="plantar"]').textContent=r?"\u4E0B\u65B9":"\u8DB3\u5E95",document.querySelector('[data-view="front"]').textContent=r?"\u524D\u9762":"\u8DBE\u7AEF",document.querySelector('[data-view="medial"]').textContent=a?"\u4EBA\u4F53\u5DE6\u9762":"\u5185\u4FA7",document.querySelector('[data-view="lateral"]').textContent=a?"\u4EBA\u4F53\u53F3\u9762":"\u5916\u4FA7"}function Jx(n,e){return Dt.find(t=>t.baseId===n.baseId&&t.side===e)?.id}function Qx(n){if(!L.ready||vs(n))return;let e=_t[n];L.side=e.side==="midline"?"both":e.side,Vl(e.studyRegion)}function Cf(n){if(!(!["both","right","left"].includes(n)||!L.ready)){if(L.side=n,L.isolated=!1,L.neighbors=!1,!vs(L.selected)){let e=_t[L.selected],t=Jx(e,n);L.selected=vs(t)?t:Af()}Rf(),_r(L.explode,!1),Jt(),Bi(L.selected,!0),Qi("overview")}}function Vl(n,e=!0){!L.ready||!zl[n]||(L.region=n,L.isolated=!1,L.neighbors=!1,vs(L.selected)||(L.selected=Af()),Rf(),_r(L.explode,!1),Jt(),Bi(L.selected,!0),e&&Qi("overview"))}var $h={overview:{dir:[1,.9,1.18],up:[0,1,0],name:"\u7ACB\u4F53\u89C6\u89D2"},dorsal:{dir:[0,1,.001],up:[0,0,1],name:"\u8DB3\u80CC \xB7 \u4ECE\u4E0A\u5F80\u4E0B\u770B"},plantar:{dir:[0,-1,.001],up:[0,0,1],name:"\u8DB3\u5E95 \xB7 \u4ECE\u4E0B\u5F80\u4E0A\u770B"},medial:{dir:[1,.04,0],up:[0,1,0],name:"\u5185\u4FA7 \xB7 \u62C7\u8DBE\u4FA7"},lateral:{dir:[-1,.04,0],up:[0,1,0],name:"\u5916\u4FA7 \xB7 \u5C0F\u8DBE\u4FA7"},front:{dir:[0,.1,1],up:[0,1,0],name:"\u8DBE\u7AEF \xB7 \u671D\u5411\u811A\u8DDF"},back:{dir:[0,.08,-1],up:[0,1,0],name:"\u540E\u9762 \xB7 \u4ECE\u540E\u5F80\u524D\u770B"}};function Qi(n){if(!L.ready||!$h[n])return;let e={...$h[n],dir:[...$h[n].dir]},t=Ye.enableDamping,i=pr.has(L.region),s=Sa.has(L.region)||L.side==="both"||["body","head","thorax","auditory"].includes(L.region);n==="overview"&&(L.region==="leg"&&(e.dir=[-1,.85,1.35]),i&&(e.dir=["lumbar","lumbosacral"].includes(L.region)?[-.9,.32,1.6]:[-.48,.18,1.9]),L.region==="hip"&&(e.dir=[-1,.24,1.6]),["cervical","thoracic","spine","head"].includes(L.region)&&(e.dir=[-.85,.22,1.6]),["hand","wrist"].includes(L.region)&&(e.dir=[-.3,.05,1.8]),L.side==="left"&&!Sa.has(L.region)&&(e.dir[0]*=-1)),(n==="medial"||n==="lateral")&&(s?e.name=n==="medial"?"\u4EBA\u4F53\u5DE6\u9762 \xB7 \u4ECE\u5DE6\u4FA7\u770B":"\u4EBA\u4F53\u53F3\u9762 \xB7 \u4ECE\u53F3\u4FA7\u770B":(L.side==="left"&&(e.dir[0]*=-1),e.name=(L.side==="left"?"\u5DE6\u4FA7\u80A2\u4F53 \xB7 ":"\u53F3\u4FA7\u80A2\u4F53 \xB7 ")+(n==="medial"?"\u5185\u4FA7\u671D\u5411\u8EAB\u4F53\u4E2D\u7EBF":"\u5916\u4FA7\u8FDC\u79BB\u8EAB\u4F53\u4E2D\u7EBF"))),i&&(n==="front"&&(e.dir=[0,.015,1],e.name="\u6B63\u9762 \xB7 \u4EBA\u4F53\u53F3\u4FA7\u5728\u753B\u9762\u5DE6\u8FB9"),n==="dorsal"&&(e.name="\u4E0A\u65B9 \xB7 \u4ECE\u4E0A\u5F80\u4E0B\u770B"),n==="plantar"&&(e.name="\u4E0B\u65B9 \xB7 \u4ECE\u4E0B\u5F80\u4E0A\u770B")),tn=null,Ye.enableDamping=!1,Ye.update(),L.view=n,document.querySelectorAll("[data-view]").forEach(r=>r.classList.toggle("active",r.dataset.view===n)),J("viewBadge").lastElementChild.textContent=e.name;try{mi(!1,new C(...e.dir),new C(...e.up))}finally{Ye.enableDamping=t}}function ey(n,e){if(L.isolated||e||L.explode!==0||[...rt.values()].some(Bl)||!["ankle","knee","hip","shoulder","elbow","wrist"].includes(L.region))return;let t=[...rt].filter(([i,s])=>s.visible);n.makeEmpty();for(let[i,s]of t){let r=_t[i],a=new zt().setFromObject(s);L.region==="ankle"&&r.group==="leg"&&(a.max.y=Math.min(a.max.y,s.userData.home.y+s.geometry.boundingBox.min.y+145)),L.region==="knee"&&(r.baseId==="femur"&&(a.max.y=a.min.y+155),["tibia","fibula"].includes(r.baseId)&&(a.min.y=a.max.y-150)),L.region==="hip"&&r.baseId==="femur"&&(a.min.y=a.max.y-180),L.region==="shoulder"&&r.baseId==="humerus"&&(a.min.y=a.max.y-170),L.region==="elbow"&&(r.baseId==="humerus"?a.max.y=a.min.y+130:a.min.y=a.max.y-130),L.region==="wrist"&&["radius","ulna"].includes(r.baseId)&&(a.max.y=a.min.y+100),n.union(a)}n.expandByScalar(10)}function If(){Ye&&(Ye._quat.setFromUnitVectors(Ve.up,new C(0,1,0)),Ye._quatInverse.copy(Ye._quat).invert())}function mi(n=!0,e=null,t=null,i=!1){if(!L.ready)return;let s=i?[rt.get(L.selected)]:[...rt.values()].filter(w=>w.visible);if(!s.length)return;Gt.updateMatrixWorld(!0);let r=new zt;if(s.forEach(w=>w&&r.expandByObject(w)),ey(r,i),r.isEmpty())return;let a=r.getCenter(new C),o=(e||Ve.position.clone().sub(Ye.target)).normalize();o.lengthSq()<.01&&o.set(1,.9,1.18).normalize();let c=(t||Ve.up).clone().normalize(),l=new C().crossVectors(c,o).normalize(),h=new C().crossVectors(o,l).normalize(),u=0,d=0,f=0;for(let w=0;w<8;w++){let A=new C(w&1?r.max.x:r.min.x,w&2?r.max.y:r.min.y,w&4?r.max.z:r.min.z).sub(a);u=Math.max(u,Math.abs(A.dot(l))),d=Math.max(d,Math.abs(A.dot(h))),f=Math.max(f,Math.abs(A.dot(o)))}let g=$e.clientWidth,_=$e.clientHeight,m=ys((_-315)/_,.37,.72),p=ys((g-130)/g,.47,.86),E=Math.tan(Ui.degToRad(Ve.fov/2)),S=Math.max(d/(E*m),u/(E*Ve.aspect*p))+f*.68;S=Math.max(S,L.isolated||i?10:28);let v=a.clone().addScaledVector(o,S*1.015);Ye.minDistance=Math.max(8,r.getSize(new C).length()*.08),Ye.maxDistance=pr.has(L.region)?Math.max(4e3,S*3):2200,n?tn={start:performance.now(),duration:480,from:Ve.position.clone(),to:v,fromTarget:Ye.target.clone(),target:a,fromUp:Ve.up.clone(),up:c}:(tn=null,Ve.position.copy(v),Ve.up.copy(c),Ye.target.copy(a),If(),Ye.update())}function xf(n){if(!L.ready)return;tn=null;let e=Ve.position.clone().sub(Ye.target).multiplyScalar(n);e.length()>Ye.minDistance&&e.length()<Ye.maxDistance&&Ve.position.copy(Ye.target).add(e),Ye.update()}function Pf(n){let e=$e.getBoundingClientRect();return Jh.set((n.clientX-e.left)/e.width*2-1,-((n.clientY-e.top)/e.height)*2+1),e}function fr(n){return Pf(n),Fl.setFromCamera(Jh,Ve),Fl.intersectObjects([...rt.values()].filter(e=>e.visible),!1)[0]||null}function ty(){$e.addEventListener("pointerdown",e=>{if(!L.ready||e.button!==0)return;tn=null;let t=fr(e);if(ji={id:e.pointerId,x:e.clientX,y:e.clientY,hit:t?.object||null,dragging:!1},t&&L.mode!=="orbit"){Bi(t.object.name);let i=t.object,s=Ve.getWorldDirection(new C);ji={...ji,dragging:!0,bone:i,startPosition:i.position.clone(),startQuaternion:i.quaternion.clone(),plane:new ei().setFromNormalAndCoplanarPoint(s,t.point),anchor:t.point.clone(),right:new C(1,0,0).applyQuaternion(Ve.quaternion),up:new C(0,1,0).applyQuaternion(Ve.quaternion)},Ye.enabled=!1,$e.setPointerCapture(e.pointerId),e.preventDefault(),e.stopPropagation(),$e.style.cursor=L.mode==="move"?"grabbing":"crosshair",J("hoverTip").hidden=!0}},{capture:!0}),$e.addEventListener("pointermove",e=>{if(!L.ready)return;if(ji?.dragging&&ji.id===e.pointerId){let s=ji,r=s.bone;if(L.mode==="move"){Pf(e),Fl.setFromCamera(Jh,Ve);let a=Fl.ray.intersectPlane(s.plane,new C);a&&(r.position.copy(s.startPosition).add(a.sub(s.anchor)),r.userData.offset.copy(r.position).sub(r.userData.home).addScaledVector(r.userData.explosion,-L.explode/100))}else{let a=(e.clientX-s.x)*.009,o=(e.clientY-s.y)*.009,c=new Tt().setFromAxisAngle(s.up,a),l=new Tt().setFromAxisAngle(s.right,o);r.quaternion.copy(c).multiply(l).multiply(s.startQuaternion).normalize()}kl(),e.stopPropagation();return}if(e.buttons){J("hoverTip").hidden=!0;return}let t=fr(e),i=t?.object.name||"";if(i!==ba&&(ba=i,Jt()),t){let s=$e.getBoundingClientRect();J("hoverTip").innerHTML=`${_t[i].name}${_t[i].pinyin?`<small>${_t[i].pinyin}</small>`:""}`,J("hoverTip").style.left=Math.min(e.clientX-s.left+15,s.width-160)+"px",J("hoverTip").style.top=e.clientY-s.top-32+"px",J("hoverTip").hidden=!1,$e.style.cursor=L.mode==="orbit"?"pointer":L.mode==="move"?"grab":"crosshair"}else J("hoverTip").hidden=!0,$e.style.cursor=L.mode==="orbit"?"grab":"default"},{capture:!0});function n(e,t=!1){let i=ji;if(!(!i||i.id!==e.pointerId)){if(i.dragging)$e.hasPointerCapture(e.pointerId)&&$e.releasePointerCapture(e.pointerId),Ye.enabled=!0,bn(),$e.style.cursor="grab",e.stopPropagation();else if(!t&&e.button===0&&Math.hypot(e.clientX-i.x,e.clientY-i.y)<5){let s=fr(e);s&&Bi(s.object.name)}ji=null}}$e.addEventListener("pointerup",e=>n(e),{capture:!0}),$e.addEventListener("pointercancel",e=>n(e,!0),{capture:!0}),$e.addEventListener("pointerleave",()=>{ji?.dragging||(J("hoverTip").hidden=!0,ba&&(ba="",Jt()))}),$e.addEventListener("dblclick",e=>{if(L.ready){let t=fr(e);t&&(Bi(t.object.name),mi(!0,null,null,!0))}}),$e.addEventListener("contextmenu",e=>e.preventDefault())}function iy(){J("labels").replaceChildren(),Ol=[];let n=L.labels?[...rt.keys()].filter(t=>rt.get(t).visible):[L.selected].filter(t=>rt.get(t)?.visible);if(L.region==="body"&&n.length>90){let t=new Set(["frontal","mandible","hyoid","C1","C7","T6","T12","L3","sacrum","coccyx","hip-right","hip-left","sternum","clavicle-right","clavicle-left","scapula-right","scapula-left","humerus-right","humerus-left","radius-right","radius-left","ulna-right","ulna-left","femur","femur-left","patella","patella-left","tibia","tibia-left","fibula","fibula-left","calcaneus","calcaneus-left","hand-metacarpal-3-right","hand-metacarpal-3-left","rib-7-right","rib-7-left",L.selected]);n=n.filter(i=>t.has(i))}let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.classList.add("leader-svg"),J("labels").append(e);for(let t of n){let i=document.createElement("button");i.className="bone-label"+(t===L.selected?" selected":""),i.textContent=_t[t].name,i.title=_t[t].en,i.addEventListener("click",()=>Bi(t));let s=document.createElementNS("http://www.w3.org/2000/svg","line");t===L.selected&&s.classList.add("selected"),e.append(s),J("labels").append(i),Ol.push({id:t,el:i,line:s})}gr=!1}function Qh(){gr&&iy();let n=$e.clientWidth,e=$e.clientHeight,t=[];for(let i of Ol){let s=rt.get(i.id),r=s.position.clone().project(Ve),a=s.visible&&r.z>-1&&r.z<1&&Math.abs(r.x)<1.15&&Math.abs(r.y)<1.15;i.el.style.display=a?"":"none",i.line.style.display=a?"":"none",a&&t.push({...i,x:(r.x*.5+.5)*n,y:(-.5*r.y+.5)*e})}if(L.labels){let s=e-190,r=21,a=Math.max(1,Math.floor((s-180)/r)),o=Math.min(4,Math.max(2,Math.ceil(t.length/a)));t.sort((l,h)=>l.x-h.x);let c=Math.ceil(t.length/o);for(let l=0;l<o;l++){let h=t.slice(l*c,(l+1)*c).sort((f,g)=>f.y-g.y),u=Math.min(r,(s-180)/Math.max(1,h.length-1)),d=180-u;for(let f of h)f.ly=Math.max(ys(f.y,180,s),d+u),d=f.ly;for(let f=h.length-1;f>=0;f--)h[f].ly=Math.min(h[f].ly,f===h.length-1?s:h[f+1].ly-u);for(let f of h)yf(f,72+l*(n-160)/Math.max(1,o-1),f.ly)}}else for(let i of t){let s=ys(i.x+(i.x>n*.5?87:-87),65,n-75),r=ys(i.y-28,160,e-195);yf(i,s,r)}}function yf(n,e,t){n.el.style.left=e+"px",n.el.style.top=t+"px",n.line.setAttribute("x1",n.x),n.line.setAttribute("y1",n.y),n.line.setAttribute("x2",e),n.line.setAttribute("y2",t)}function ny(){let n=Ve.quaternion.clone().invert(),t=[["\u5DE6",new C(1,0,0),"#7f9d88"],["\u4E0A",new C(0,1,0),"#9bab84"],["\u524D",new C(0,0,1),"#9fae98"]].map(([i,s,r])=>{s.applyQuaternion(n);let a=37+s.x*25,o=37-s.y*25;return`<line x1="37" y1="37" x2="${a}" y2="${o}" stroke="${r}"/><circle cx="${a}" cy="${o}" r="9" fill="#f8fbf4" stroke="${r}"/><text x="${a}" y="${o+3}" fill="${r}" text-anchor="middle">${i}</text>`}).join("");J("axisGizmo").innerHTML=`<svg viewBox="0 0 74 74"><circle cx="37" cy="37" r="2" fill="#a3b798" stroke="none"/>${t}</svg>`}function sy(){Ht=new ha({antialias:!0,alpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),Ht.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Ht.setSize($e.clientWidth,$e.clientHeight),Ht.outputColorSpace=Mt,Ht.toneMapping=as,Ht.toneMappingExposure=1.05,Ht.shadowMap.enabled=!0,Ht.shadowMap.type=xo,$e.append(Ht.domElement),Ye=new ua(Ve,$e),Ye.enableDamping=!0,Ye.dampingFactor=.085,Ye.rotateSpeed=.75,Ye.zoomSpeed=.8,Ye.panSpeed=.7,Ye.minPolarAngle=.001,Ye.maxPolarAngle=Math.PI-.001,Ye.addEventListener("start",()=>{tn=null,ji?.dragging||(L.view="free",document.querySelectorAll("[data-view]").forEach(r=>r.classList.remove("active")),J("viewBadge").lastElementChild.textContent="\u81EA\u7531\u89C6\u89D2")}),Ve.position.set(290,270,335),Ye.target.set(0,0,0),Ye.update(),Gt.add(new js("#fffef4","#b0b9a4",1.55));let n=new vi("#fff6de",3.1);n.position.set(100,300,-140),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.left=-290,n.shadow.camera.right=290,n.shadow.camera.top=340,n.shadow.camera.bottom=-290,n.shadow.camera.near=10,n.shadow.camera.far=900,n.shadow.bias=-35e-5,n.shadow.normalBias=.35,n.shadow.radius=4,Gt.add(n);let e=new vi("#e5f0f2",1.05);e.position.set(-220,100,210),Gt.add(e);let t=new vi("#f3ead6",.65);t.position.set(50,-180,180),Gt.add(t);let i=new wl,s=new ar(Ht);ff=s.fromScene(i,.04),Gt.environment=ff.texture,i.dispose(),s.dispose(),_s=new Qe(new ns(16e3,16e3),new ii({color:"#eef1e7",roughness:1,metalness:0,envMapIntensity:.12})),_s.rotation.x=-Math.PI/2,_s.position.y=-39.2,_s.receiveShadow=!0,Gt.add(_s),gs=new Qr(550,22,"#b9c7b4","#cbd5c3"),gs.position.y=-39,gs.material.transparent=!0,gs.material.opacity=.17,gs.material.depthWrite=!1,Gt.add(gs),xs=new Cl(Ht),xs.addPass(new Il(Gt,Ve)),yn=new _a(Gt,Ve,$e.clientWidth,$e.clientHeight),yn.kernelRadius=8,yn.minDistance=3e-4,yn.maxDistance=.04,xs.addPass(yn),xs.addPass(new Ll),Ht.domElement.addEventListener("webglcontextlost",r=>{r.preventDefault(),vn("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u6682\u505C\uFF0C\u8BF7\u5237\u65B0\u6062\u590D\u4E09\u7EF4\u89C6\u56FE")})}function ry(){let n=J("preview");Ji=new ha({antialias:!0,alpha:!1}),Ji.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Ji.outputColorSpace=Mt,Ji.toneMapping=as,Ji.toneMappingExposure=1.05,n.append(Ji.domElement),Oi=new St(33,1,.1,1e3),en=new ua(Oi,n),en.enableDamping=!0,en.enablePan=!1,en.rotateSpeed=.8,en.zoomSpeed=.6,Vn.add(new js("#fffef5","#b0b89f",2));let e=new vi("#fff7e3",3.3);e.position.set(100,200,80),Vn.add(e);let t=new vi("#e5eef5",1);t.position.set(-140,30,-80),Vn.add(t);let i=new vi("#f4ead2",.6);i.position.set(0,-100,0),Vn.add(i)}function jh(){if(!Ht)return;let n=Math.max(1,$e.clientWidth),e=Math.max(1,$e.clientHeight);if(Ht.setSize(n,e),Ve.aspect=n/e,Ve.setViewOffset(n,e,0,22,n,e),Ve.updateProjectionMatrix(),xs.setSize(n,e),Ji){let t=J("preview"),i=Math.max(t.clientWidth,1),s=Math.max(t.clientHeight,1);Ji.setSize(i,s),Oi.aspect=i/s,Oi.updateProjectionMatrix(),L.ready&&Tf()}L.ready&&mi(!1),gr=!0}async function ay(){let n=new Tl,e;if(window.FOOT_ATLAS_EMBEDDED){let i=atob(window.FOOT_ATLAS_EMBEDDED),s=new Uint8Array(i.length);for(let r=0;r<i.length;r++)s[r]=i.charCodeAt(r);J("loadingProgress").style.width="65%",e=await n.parseAsync(s.buffer,"")}else e=await n.loadAsync("./assets/fullbody.glb",i=>{i.total&&(J("loadingProgress").style.width=15+i.loaded/i.total*60+"%")});if(e.scene.updateMatrixWorld(!0),e.scene.traverse(i=>{if(!i.isMesh)return;let s=i.name;if(!_t[s])throw new Error(`\u672A\u8BC6\u522B\u7684\u6E90\u7F51\u683C\u540D\u79F0\uFF1A${s}`);i.geometry.computeBoundingBox();let r=new Qe(i.geometry,Yx());if(r.name=s,i.matrixWorld.decompose(r.position,r.quaternion,r.scale),r.quaternion.angleTo(new Tt)>1e-5||r.scale.distanceTo(new C(1,1,1))>1e-5)throw new Error("\u6E90\u6A21\u578B\u5305\u542B\u672A\u70D8\u7119\u53D8\u6362");r.castShadow=!0,r.receiveShadow=!0,r.userData.home=r.position.clone(),r.userData.offset=new C,r.userData.explosion=Ef(s,r.position),rt.set(s,r),Mf.add(r);let a=new Qe(r.geometry,new di({color:"#7da38b",transparent:!0,opacity:.1,depthWrite:!1,wireframe:!1}));a.position.copy(r.position),a.visible=!1,a.renderOrder=-1,Gt.add(a),vf.set(s,a);let o=new Ot().setFromPoints([r.position.clone(),r.position.clone()]),c=new un(o,new Wr({color:"#7b9a7c",transparent:!0,opacity:.38,dashSize:2,gapSize:2.5,depthWrite:!1}));c.visible=!1,Gt.add(c),bf.set(s,c)}),rt.size!==210||Dt.some(i=>!rt.has(i.id)))throw new Error(`\u6A21\u578B\u4E0D\u5B8C\u6574\uFF1A\u9700\u8981210\u5757\uFF0C\u5B9E\u9645${rt.size}\u5757`);let t=[...rt.values()].reduce((i,s)=>i+(s.geometry.index?s.geometry.index.count:s.geometry.attributes.position.count)/3,0);if(t!==534003)throw new Error(`\u6E90\u7F51\u683C\u6821\u9A8C\u672A\u901A\u8FC7\uFF1A${t}\u4E2A\u4E09\u89D2\u5F62`);L.ready=!0,J("loadingProgress").style.width="100%",J("renderStatus").textContent=`WebGL 2 \xB7 ${t.toLocaleString("en-US")} \u9762`,Bi("sternum"),jh(),Vl("body"),J("loading").classList.add("done"),setTimeout(()=>{J("loading").hidden=!0},500)}function Lf(){if(!yn)return;let n=yn.ssaoMaterial.uniforms;n.cameraNear.value=Ve.near,n.cameraFar.value=Ve.far,n.cameraProjectionMatrix.value.copy(Ve.projectionMatrix),n.cameraInverseProjectionMatrix.value.copy(Ve.projectionMatrixInverse),yn.depthRenderMaterial.uniforms.cameraNear.value=Ve.near,yn.depthRenderMaterial.uniforms.cameraFar.value=Ve.far}function Df(n){if(requestAnimationFrame(Df),!Ht||document.hidden)return;let e=Math.min((n-pf)/1e3,.05);if(pf=n,tn){let t=tn,i=ys((n-t.start)/t.duration,0,1);i=1-Math.pow(1-i,3),Ve.position.lerpVectors(t.from,t.to,i),Ye.target.lerpVectors(t.fromTarget,t.target,i),Ve.up.lerpVectors(t.fromUp,t.up,i),Ve.up.lengthSq()<.001&&Ve.up.set(0,1,0),Ve.up.normalize(),i>=1&&(tn=null)}If(),Ye.update(),_s.visible=!L.isolated&&Ve.position.y>-38.5&&!pr.has(L.region),gs.visible=_s.visible,L.ready&&(Qh(),ny()),Lf(),xs.render(e),zn&&J("preview").clientWidth>0&&J("preview").clientHeight>0&&(en.update(),Ji.render(Vn,Oi))}function oy(){if(!L.ready)return;Lf(),xs.render();let n=Ht.domElement,e=n.width,t=n.height,i=e/$e.clientWidth,s=document.createElement("canvas");s.width=e,s.height=t;let r=s.getContext("2d");r.drawImage(n,0,0),r.textBaseline="middle";for(let a of Ol){if(a.el.style.display==="none")continue;let o=parseFloat(a.el.style.left)*i,c=parseFloat(a.el.style.top)*i,l=_t[a.id].name;r.font=`${11*i}px "PingFang SC",sans-serif`;let h=r.measureText(l).width;r.fillStyle="#fcfff8ed",r.fillRect(o-h/2-8*i,c-10*i,h+16*i,20*i),r.fillStyle=a.id===L.selected?"#2a6855":"#7a906d",r.fillText(l,o-h/2,c)}r.fillStyle="#396446",r.font=`500 ${20*i}px "PingFang SC",sans-serif`,r.fillText("\u5168\u8EAB\u9AA8\u9ABC\u7814\u4E60\u5BA4",26*i,37*i),r.font=`${10*i}px sans-serif`,r.fillStyle="#829974",r.fillText("Z-Anatomy / BodyParts3D \xB7 CC BY-SA 4.0 \xB7 \u89E3\u5256\u6559\u5B66\u53C2\u8003",26*i,t-20*i),s.toBlob(a=>{if(!a){vn("\u622A\u56FE\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");return}let o=URL.createObjectURL(a),c=document.createElement("a");c.href=o,c.download=`\u4E0B\u80A2\u9AA8\u9ABC\u56FE\u8C31-${_t[L.selected].name}-${new Date().toISOString().slice(0,10)}.png`,c.click(),setTimeout(()=>URL.revokeObjectURL(o),1e4),vn("\u5DF2\u4FDD\u5B58\u5F53\u524D\u4E09\u7EF4\u89C6\u56FE")},"image/png")}function ly(){document.querySelectorAll("[data-side]").forEach(e=>e.addEventListener("click",()=>Cf(e.dataset.side))),document.querySelectorAll("[data-region]").forEach(e=>e.addEventListener("click",()=>Vl(e.dataset.region))),document.querySelectorAll("[data-mode]").forEach(e=>e.addEventListener("click",()=>dr(e.dataset.mode))),document.querySelectorAll("[data-view]").forEach(e=>e.addEventListener("click",()=>Qi(e.dataset.view))),J("explode").addEventListener("input",()=>_r(J("explode").value)),J("homeBtn").addEventListener("click",()=>Ma(!0)),J("resetBonesBtn").addEventListener("click",()=>Ma()),J("resetSelectedBtn").addEventListener("click",Zx),J("focusBtn").addEventListener("click",()=>{L.hidden.has(L.selected)&&(L.hidden.delete(L.selected),Jt(),bn()),mi(!0,null,null,!0)}),J("isolateBtn").addEventListener("click",Kx),J("exitIsolateBtn").addEventListener("click",()=>mr()),J("neighborsBtn").addEventListener("click",$x),J("hideSelectedBtn").addEventListener("click",()=>Sf(L.selected)),J("showAllBtn").addEventListener("click",()=>{L.hidden.clear(),L.isolated=!1,L.neighbors=!1,Jt(),bn(),mi(!0)}),J("labelsBtn").addEventListener("click",()=>{L.labels=!L.labels,J("labelsBtn").classList.toggle("active",L.labels),J("labelsBtn").setAttribute("aria-pressed",String(L.labels)),gr=!0,L.ready&&Qh()}),J("colorBtn").addEventListener("click",()=>{L.colors=!L.colors,J("colorBtn").classList.toggle("active",L.colors),J("colorBtn").setAttribute("aria-pressed",String(L.colors)),Jt()}),J("ghostBtn").addEventListener("click",()=>{L.ghost=!L.ghost,J("ghostBtn").classList.toggle("active",L.ghost),J("ghostBtn").setAttribute("aria-pressed",String(L.ghost)),kl(),L.ghost&&L.explode===0&&![...rt.values()].some(Bl)&&vn("\u62D6\u51FA\u4E00\u5757\u9AA8\u6216\u5C55\u5F00\u6A21\u578B\u540E\uFF0C\u5C06\u51FA\u73B0\u539F\u4F4D\u53C2\u8003\u5F71")}),J("zoomInBtn").addEventListener("click",()=>xf(.8)),J("zoomOutBtn").addEventListener("click",()=>xf(1.25)),J("captureBtn").addEventListener("click",oy),J("helpBtn").addEventListener("click",()=>J("helpDialog").showModal());let n=()=>J("sourceDialog").showModal();J("sourceBtn").addEventListener("click",n),J("footerSource").addEventListener("click",n),J("sourceLinks").innerHTML=df.map(e=>`<div><a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.title} \u2197</a><small>${e.note}</small></div>`).join(""),document.querySelectorAll("[data-close]").forEach(e=>e.addEventListener("click",()=>e.closest("dialog").close())),document.querySelectorAll("dialog").forEach(e=>e.addEventListener("click",t=>{let i=e.getBoundingClientRect();t.target===e&&(t.clientX<i.left||t.clientX>i.right||t.clientY<i.top||t.clientY>i.bottom)&&e.close()})),J("fullscreenBtn").addEventListener("click",async()=>{try{document.fullscreenElement?await document.exitFullscreen():document.documentElement.requestFullscreen?await document.documentElement.requestFullscreen():vn("\u6B64\u6D4F\u89C8\u5668\u8BF7\u4F7F\u7528\u7CFB\u7EDF\u5168\u5C4F\u5FEB\u6377\u952E")}catch{vn("\u6D4F\u89C8\u5668\u672A\u5141\u8BB8\u5168\u5C4F\uFF0C\u53EF\u4F7F\u7528\u7CFB\u7EDF\u5168\u5C4F\u5FEB\u6377\u952E")}}),document.querySelector(".brand").addEventListener("click",e=>{e.preventDefault(),Ma(!0)}),window.addEventListener("keydown",e=>{if(e.target.matches("input,textarea,[contenteditable]")){e.key==="Escape"&&e.target.blur();return}if(document.querySelector("dialog[open]")||e.ctrlKey||e.metaKey||e.altKey)return;let t=e.key.toLowerCase(),i={r:()=>dr("orbit"),g:()=>dr("move"),t:()=>dr("rotate"),f:()=>mi(!0,null,null,!0),h:()=>Ma(!0),l:()=>J("labelsBtn").click(),"/":()=>J("search").focus(),escape:()=>{L.isolated?mr():L.neighbors&&(L.neighbors=!1,Jt())},1:()=>Qi("overview"),2:()=>Qi("dorsal"),3:()=>Qi("plantar"),4:()=>Qi("medial"),5:()=>Qi("lateral")};i[t]&&(e.preventDefault(),i[t]())})}function cy(){window.__FOOT_ATLAS__={getCatalog:()=>Dt.map(n=>({id:n.id,name:n.name,group:n.group,side:n.side,baseId:n.baseId,neighbors:[...n.neighbors]})),getState:()=>({region:L.region,side:L.side,cameraAnimating:!!tn,ready:L.ready,selected:L.selected,mode:L.mode,explode:L.explode,isolated:L.isolated,neighbors:L.neighbors,ghost:L.ghost,labels:L.labels,colors:L.colors,hidden:[...L.hidden],count:rt.size,visible:[...rt.values()].filter(n=>n.visible).length,camera:Ve.position.toArray(),target:Ye?.target.toArray(),bones:[...rt].map(([n,e])=>({id:n,position:e.position.toArray(),home:e.userData.home.toArray(),offset:e.userData.offset.toArray(),rotation:e.quaternion.toArray(),visible:e.visible,triangles:e.geometry.index.count/3}))}),setSide:Cf,setRegion:Vl,selectBone:Bi,setExplode:_r,setView:Qi,setMode:dr,reset:()=>Ma(!0),projectBone:n=>{let e=rt.get(n);if(!e)return null;let t=e.position.clone().project(Ve),i=$e.getBoundingClientRect();return{x:i.left+(t.x*.5+.5)*i.width,y:i.top+(-t.y*.5+.5)*i.height}},pickBoneAt:(n,e)=>fr({clientX:n,clientY:e})?.object.name||null,getPickPoint:n=>{let e=rt.get(n);if(!e?.visible)return null;Gt.updateMatrixWorld(!0);let t=new zt().setFromObject(e),i=$e.getBoundingClientRect(),s=[];for(let l=0;l<8;l++)s.push(new C(l&1?t.max.x:t.min.x,l&2?t.max.y:t.min.y,l&4?t.max.z:t.min.z).project(Ve));let r=Math.min(...s.map(l=>(l.x*.5+.5)*i.width+i.left)),a=Math.max(...s.map(l=>(l.x*.5+.5)*i.width+i.left)),o=Math.min(...s.map(l=>(-.5*l.y+.5)*i.height+i.top)),c=Math.max(...s.map(l=>(-.5*l.y+.5)*i.height+i.top));for(let l of[.5,.4,.6,.3,.7,.2,.8,.1,.9])for(let h of[.5,.4,.6,.3,.7,.2,.8,.1,.9]){let u=r+(a-r)*l,d=o+(c-o)*h,f=document.elementFromPoint(u,d);if(f&&(f===$e||f===Ht.domElement)&&fr({clientX:u,clientY:d})?.object.name===n)return{x:u,y:d}}return null}}}async function hy(){qx(),ly(),Bi("sternum"),sy(),ry(),ty(),jh(),cy(),Kh=new ResizeObserver(()=>jh()),Kh.observe($e),Kh.observe(J("preview")),requestAnimationFrame(Df),await ay()}hy().catch(Xx);})();
