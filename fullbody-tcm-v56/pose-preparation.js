// Yield between bounded pieces of mesh preparation so input and painting can run.
// MessageChannel avoids nested-timer delays and also works in browsers without
// the prioritized task scheduler. No geometry or binding calculation is skipped.
export function yieldPreparation(){
 if(globalThis.scheduler?.yield)return globalThis.scheduler.yield();
 return new Promise(resolve=>{
  const channel=new MessageChannel();channel.port1.onmessage=()=>{
   channel.port1.close();channel.port2.close();resolve();
  };channel.port2.postMessage(null);
 });
}
