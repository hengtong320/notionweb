"""Run after the existing V26 patch; retain its label, filtering and state fixes."""
from pathlib import Path
import shutil
p=Path('fullbody-tcm-v26')
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:80]);f.write_text(s.replace(old,new,1))
edit('skin-ink-v24.js',"pixelRatio:{value:1}","pixelRatio:{value:1},inkViewProjection:{value:new THREE.Matrix4()},inkViewport:{value:new THREE.Vector4(0,0,1,1)}")
edit('skin-ink-v24.js','uniform sampler2D inkData;', 'uniform mat4 inkViewProjection;uniform vec4 inkViewport;uniform sampler2D inkData;')
f=p/'skin-ink-v24.js';s=f.read_text();a=s.index('    float unitPixel=');b=s.index('    vec3 paint=tint;',a)
s=s[:a]+'''    float lineRadius=1.15*pixelRatio*lineScale;
    float pointRadius=3.0*pixelRatio;
    float lineDistance=1.e5,pointDistance=1.e5,lineAlong=0.;
    for(int k=0;k<${Math.max(1,maxCandidates)};k++){
     if(float(k)>=vRange.y)break;float ri=vRange.x+float(k);float id=texture2D(inkRefs,vec2(mod(ri,refSize.x)+.5,floor(ri/refSize.x)+.5)/refSize).x;
     vec4 a=datum(id*2.),b=datum(id*2.+1.);
     vec4 ca=inkViewProjection*vec4(a.xyz,1.),cb=inkViewProjection*vec4(b.xyz,1.);
     if(ca.w<=.0001||cb.w<=.0001)continue;
     vec2 sa=inkViewport.xy+(ca.xy/ca.w*.5+.5)*inkViewport.zw;
     vec2 sb=inkViewport.xy+(cb.xy/cb.w*.5+.5)*inkViewport.zw;
     vec2 ab=sb-sa;float t=clamp(dot(gl_FragCoord.xy-sa,ab)/max(dot(ab,ab),.0001),0.,1.);
     float d=length(gl_FragCoord.xy-(sa+t*ab));
     if(a.w>.5){if(pointsOn>.5)pointDistance=min(pointDistance,d);}
     else if(linesOn>.5){
      float along=b.w+t*length(b.xyz-a.xyz);
      if(dashed>.5){float phase=mod(along,16.);if(phase>10.){float gap=min(phase-10.,16.-phase);float scale=length(ab)/max(length(b.xyz-a.xyz),.001);d=length(vec2(d,gap*scale));}}
      if(d<lineDistance){lineDistance=d;lineAlong=along;}
     }
    }
    float aa=.65;
    float lineAlpha=1.-smoothstep(lineRadius-aa,lineRadius+aa,lineDistance);
    float pointAlpha=1.-smoothstep(pointRadius-aa,pointRadius+aa,pointDistance);
''' +s[b:]
s=s.replace("mesh.onBeforeRender=renderer=>{material.uniforms.pixelRatio.value=renderer.getPixelRatio();};", "mesh.onBeforeRender=(renderer,scene,camera)=>{material.uniforms.pixelRatio.value=renderer.getPixelRatio();material.uniforms.inkViewProjection.value.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);renderer.getCurrentViewport(material.uniforms.inkViewport.value);};")
s=s.replace("single-pass surface ink with perpendicular-derivative antialiasing and round dash caps", "skin-face-restricted screen-space round stroke; fixed device-pixel AA").replace('stableTransverseMetric:true,','screenSpaceStroke:true,normalDepthPreserved:true,')
f.write_text(s)
edit('view-v16.js',"if(!expanded)right=64;", "if(!expanded)right=64;\n if(innerWidth<=650&&document.body.dataset.currentKind==='point'&&document.body.classList.contains('detail-open')){const e=document.querySelector('.detail-panel');if(e?.getClientRects().length){const b=e.getBoundingClientRect();if(b.top<r.bottom&&b.bottom>r.top)bottom=Math.max(bottom,r.bottom-b.top+12);}}")
edit('app.js',"const {hf,wf}=fitFractions(viewport);", "const safe=fitFractions(viewport);let {hf,wf}=safe;if(options.safeCenter){hf=Math.max(.2,Math.min(.94,(h-safe.top-safe.bottom)/h));wf=Math.max(.3,Math.min(.94,(w-safe.left-safe.right)/w));}")
edit('app.js',"controls.target.copy(center);controls.minDistance=5;", "controls.target.copy(center);if(options.safeCenter){const shift=right.clone().multiplyScalar((safe.right-safe.left)/w*t*distance*camera.aspect).addScaledVector(up,(safe.top-safe.bottom)/h*t*distance);camera.position.add(shift);controls.target.add(shift);}controls.minDistance=5;")
edit('learning-enhancements.js',"function frameNavigation(box,direction,up,title)","function frameNavigation(box,direction,up,title,pointFocus=false)")
edit('learning-enhancements.js',"ctx.focusBounds(box,{direction,up});$('viewBadge')", "ctx.focusBounds(box,{direction,up,safeCenter:pointFocus});$('viewBadge')")
edit('learning-enhancements.js',"+' 部位参照');", "+' 部位参照',true);")
edit('learning-enhancements.js','lastLabelsAt=performance.now();\n  const ready=', 'const now=performance.now();if(now-lastLabelsAt<40)return;lastLabelsAt=now;\n  const ready=')
edit('learning-enhancements.js',"'.study-toolbar','#tcmStatus'", "'.stage-heading','.view-switcher','.stage-tools','.detail-panel','.study-toolbar','#tcmStatus'")
edit('app.js',"import {initViewportExperience", "import {initReadingV26} from './reading-v26.js';\nimport {initViewportExperience")
edit('app.js'," const initialReadyMs=performance.now();", " initReadingV26({learning:learningEnhancements,invalidate});\n const initialReadyMs=performance.now();")
for name in ['reading-v26.js','reading-v26.css']:shutil.copy2(Path('atlas26-repair')/name,p/name)
for name in ['index.html','index.template.html']:edit(name,'</head>','<link rel="stylesheet" href="reading-v26.css?v=26.0.0"></head>')
f=p/'README.md';s=f.read_text();s=s.replace('修复皮肤绘线采用无符号距离导数导致的周期性变细，改以皮肤世界坐标导数与局部线方向计算稳定的横向屏幕尺度。','修复皮肤绘线的细碎缺口：保留局部真实皮肤三角面作为绘制范围，改为屏幕空间圆头距离场与固定像素抗锯齿，不使用无符号距离导数决定线宽。')
s+='\n## 续修\n\n穴位详情先展示定位文字，保留可展开的模型依据、来源与未临床校准状态；去掉重复穴名和聚焦/朗读。手机主动打开详情时使用最多38dvh的底部面板；聚焦镜头按可用观看范围居中，标签避让工具栏与详情。原V26的单一线路开关、左右侧一致、保存恢复及逐点可见观察方向均保留。\n'
f.write_text(s)
print('V26 interrupted work reconciled and completed; original coordinates unchanged')
