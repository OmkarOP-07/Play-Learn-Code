function E(n,e,...r){if(v()&&e===void 0)throw new Error("invariant requires an error message argument");if(!n){let t;if(e===void 0)t=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{let s=0;t=new Error(e.replace(/%s/g,function(){return r[s++]})),t.name="Invariant Violation"}throw t.framesToPop=1,t}}function v(){return typeof process<"u"&&!0}const l=typeof global<"u"?global:self,u=l.MutationObserver||l.WebKitMutationObserver;function h(n){return function(){const r=setTimeout(s,0),t=setInterval(s,50);function s(){clearTimeout(r),clearInterval(t),n()}}}function k(n){let e=1;const r=new u(n),t=document.createTextNode("");return r.observe(t,{characterData:!0}),function(){e=-e,t.data=e}}const w=typeof u=="function"?k:h;class m{enqueueTask(e){const{queue:r,requestFlush:t}=this;r.length||(t(),this.flushing=!0),r[r.length]=e}constructor(){this.queue=[],this.pendingErrors=[],this.flushing=!1,this.index=0,this.capacity=1024,this.flush=()=>{const{queue:e}=this;for(;this.index<e.length;){const r=this.index;if(this.index++,e[r].call(),this.index>this.capacity){for(let t=0,s=e.length-this.index;t<s;t++)e[t]=e[t+this.index];e.length-=this.index,this.index=0}}e.length=0,this.index=0,this.flushing=!1},this.registerPendingError=e=>{this.pendingErrors.push(e),this.requestErrorThrow()},this.requestFlush=w(this.flush),this.requestErrorThrow=h(()=>{if(this.pendingErrors.length)throw this.pendingErrors.shift()})}}class y{call(){try{this.task&&this.task()}catch(e){this.onError(e)}finally{this.task=null,this.release(this)}}constructor(e,r){this.onError=e,this.release=r,this.task=null}}class q{create(e){const r=this.freeTasks,t=r.length?r.pop():new y(this.onError,s=>r[r.length]=s);return t.task=e,t}constructor(e){this.onError=e,this.freeTasks=[]}}const c=new m,x=new q(c.registerPendingError);function T(n){c.enqueueTask(x.create(n))}function O(n,e,r,t){let s;if(s!==void 0)return!!s;if(n===e)return!0;if(typeof n!="object"||!n||typeof e!="object"||!e)return!1;const i=Object.keys(n),f=Object.keys(e);if(i.length!==f.length)return!1;const d=Object.prototype.hasOwnProperty.bind(e);for(let o=0;o<i.length;o++){const a=i[o];if(!d(a))return!1;const g=n[a],p=e[a];if(s=void 0,s===!1||s===void 0&&g!==p)return!1}return!0}export{T as a,E as i,O as s};
