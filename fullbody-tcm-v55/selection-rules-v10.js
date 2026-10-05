// User selection and layer display are different actions.
// A layer preset keeps the selected acupoint; an explicit structure choice does not.
window.addEventListener('atlas:selection',event=>{
 if(!['tissue','meridian'].includes(event.detail?.kind))return;
 const learning=window.__ATLAS_LEARNING__;
 if(learning&&(learning.getStudyContext()||learning.getState().selectedPoint)){
  learning.clearStudyContext(true);
 }
});
window.addEventListener('atlas:bone-selected',event=>{
 if(!event.detail?.user)return;
 const learning=window.__ATLAS_LEARNING__;
 if(learning&&(learning.getStudyContext()||learning.getState().selectedPoint)){
  learning.clearStudyContext(true);
 }
});
