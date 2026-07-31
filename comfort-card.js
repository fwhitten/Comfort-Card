var re=Object.defineProperty;var oe=Object.getOwnPropertyDescriptor;var v=(r,t,e,i)=>{for(var n=i>1?void 0:i?oe(t,e):t,a=r.length-1,o;a>=0;a--)(o=r[a])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&re(t,e,n),n};var q=globalThis,W=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),xt=new WeakMap,M=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(W&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=xt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&xt.set(e,t))}return t}toString(){return this.cssText}},$t=r=>new M(typeof r=="string"?r:r+"",void 0,rt),N=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((i,n,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[a+1],r[0]);return new M(e,r,rt)},At=(r,t)=>{if(W)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),n=q.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=e.cssText,r.appendChild(i)}},ot=W?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return $t(e)})(r):r;var{is:ae,defineProperty:se,getOwnPropertyDescriptor:ce,getOwnPropertyNames:ue,getOwnPropertySymbols:le,getPrototypeOf:me}=Object,b=globalThis,St=b.trustedTypes,de=St?St.emptyScript:"",at=b.reactiveElementPolyfillSupport,P=(r,t)=>r,I={toAttribute(r,t){switch(t){case Boolean:r=r?de:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},B=(r,t)=>!ae(r,t),Et={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:B},Ct,Tt;(Ct=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(Tt=b.litPropertyMetadata)!=null||(b.litPropertyMetadata=new WeakMap);var _=class extends HTMLElement{static addInitializer(t){var e;this._$Ei(),((e=this.l)!=null?e:this.l=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(t,i,e);n!==void 0&&se(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){var o;let{get:n,set:a}=(o=ce(this.prototype,t))!=null?o:{get(){return this[e]},set(c){this[e]=c}};return{get:n,set(c){let s=n==null?void 0:n.call(this);a==null||a.call(this,c),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){var e;return(e=this.elementProperties.get(t))!=null?e:Et}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=me(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,i=[...ue(e),...le(e)];for(let n of i)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,n]of e)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let n=this._$Eu(e,i);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let n of i)e.unshift(ot(n))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$EO)!=null?e:this._$EO=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)==null||i.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){var e;let t=(e=this.shadowRoot)!=null?e:this.attachShadow(this.constructor.shadowRootOptions);return At(t,this.constructor.elementStyles),t}connectedCallback(){var t,e;(t=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var n;return(n=i.hostConnected)==null?void 0:n.call(i)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var a;let i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){let o=(((a=i.converter)==null?void 0:a.toAttribute)!==void 0?i.converter:I).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var a,o,c;let i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let s=i.getPropertyOptions(n),u=typeof s.converter=="function"?{fromAttribute:s.converter}:((a=s.converter)==null?void 0:a.fromAttribute)!==void 0?s.converter:I;this._$Em=n;let l=u.fromAttribute(e,s.type);this[n]=(c=l!=null?l:(o=this._$Ej)==null?void 0:o.get(n))!=null?c:l,this._$Em=null}}requestUpdate(t,e,i,n=!1,a){var o,c;if(t!==void 0){let s=this.constructor;if(n===!1&&(a=this[t]),i!=null||(i=s.getPropertyOptions(t)),!(((o=i.hasChanged)!=null?o:B)(a,e)||i.useDefault&&i.reflect&&a===((c=this._$Ej)==null?void 0:c.get(t))&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:a},o){var c,s,u;i&&!((c=this._$Ej)!=null?c:this._$Ej=new Map).has(t)&&(this._$Ej.set(t,(s=o!=null?o:e)!=null?s:this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&((u=this._$Eq)!=null?u:this._$Eq=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i,n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((i=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,c]of this._$Ep)this[o]=c;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,c]of a){let{wrapped:s}=c,u=this[o];s!==!0||this._$AL.has(o)||u===void 0||this.C(o,void 0,c,u)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(n=this._$EO)==null||n.forEach(a=>{var o;return(o=a.hostUpdate)==null?void 0:o.call(a)}),this.update(e)):this._$EM()}catch(a){throw t=!1,this._$EM(),a}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}},kt;_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[P("elementProperties")]=new Map,_[P("finalized")]=new Map,at==null||at({ReactiveElement:_}),((kt=b.reactiveElementVersions)!=null?kt:b.reactiveElementVersions=[]).push("2.1.2");var L=globalThis,Rt=r=>r,V=L.trustedTypes,Dt=V?V.createPolicy("lit-html",{createHTML:r=>r}):void 0,Lt="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+w,he=`<${Ht}>`,A=document,H=()=>A.createComment(""),F=r=>r===null||typeof r!="object"&&typeof r!="function",pt=Array.isArray,pe=r=>pt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",st=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ot=/-->/g,Mt=/>/g,x=RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,Pt=/"/g,Ft=/^(?:script|style|textarea|title)$/i,ft=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),D=ft(1),Me=ft(2),Ne=ft(3),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),It=new WeakMap,$=A.createTreeWalker(A,129);function zt(r,t){if(!pt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Dt!==void 0?Dt.createHTML(t):t}var fe=(r,t)=>{let e=r.length-1,i=[],n,a=t===2?"<svg>":t===3?"<math>":"",o=U;for(let c=0;c<e;c++){let s=r[c],u,l,m=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),l!==null);)h=o.lastIndex,o===U?l[1]==="!--"?o=Ot:l[1]!==void 0?o=Mt:l[2]!==void 0?(Ft.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=x):l[3]!==void 0&&(o=x):o===x?l[0]===">"?(o=n!=null?n:U,m=-1):l[1]===void 0?m=-2:(m=o.lastIndex-l[2].length,u=l[1],o=l[3]===void 0?x:l[3]==='"'?Pt:Nt):o===Pt||o===Nt?o=x:o===Ot||o===Mt?o=U:(o=x,n=void 0);let p=o===x&&r[c+1].startsWith("/>")?" ":"";a+=o===U?s+he:m>=0?(i.push(u),s.slice(0,m)+Lt+s.slice(m)+w+p):s+w+(m===-2?c:p)}return[zt(r,a+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},z=class r{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let a=0,o=0,c=t.length-1,s=this.parts,[u,l]=fe(t,e);if(this.el=r.createElement(u,i),$.currentNode=this.el.content,e===2||e===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(n=$.nextNode())!==null&&s.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let m of n.getAttributeNames())if(m.endsWith(Lt)){let h=l[o++],p=n.getAttribute(m).split(w),g=/([.?@])?(.*)/.exec(h);s.push({type:1,index:a,name:g[2],strings:p,ctor:g[1]==="."?lt:g[1]==="?"?mt:g[1]==="@"?dt:R}),n.removeAttribute(m)}else m.startsWith(w)&&(s.push({type:6,index:a}),n.removeAttribute(m));if(Ft.test(n.tagName)){let m=n.textContent.split(w),h=m.length-1;if(h>0){n.textContent=V?V.emptyScript:"";for(let p=0;p<h;p++)n.append(m[p],H()),$.nextNode(),s.push({type:2,index:++a});n.append(m[h],H())}}}else if(n.nodeType===8)if(n.data===Ht)s.push({type:2,index:a});else{let m=-1;for(;(m=n.data.indexOf(w,m+1))!==-1;)s.push({type:7,index:a}),m+=w.length-1}a++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}};function k(r,t,e=r,i){var o,c,s;if(t===S)return t;let n=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl,a=F(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==a&&((c=n==null?void 0:n._$AO)==null||c.call(n,!1),a===void 0?n=void 0:(n=new a(r),n._$AT(r,e,i)),i!==void 0?((s=e._$Co)!=null?s:e._$Co=[])[i]=n:e._$Cl=n),n!==void 0&&(t=k(r,n._$AS(r,t.values),n,i)),t}var ut=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var u;let{el:{content:e},parts:i}=this._$AD,n=((u=t==null?void 0:t.creationScope)!=null?u:A).importNode(e,!0);$.currentNode=n;let a=$.nextNode(),o=0,c=0,s=i[0];for(;s!==void 0;){if(o===s.index){let l;s.type===2?l=new j(a,a.nextSibling,this,t):s.type===1?l=new s.ctor(a,s.name,s.strings,this,t):s.type===6&&(l=new ht(a,this,t)),this._$AV.push(l),s=i[++c]}o!==(s==null?void 0:s.index)&&(a=$.nextNode(),o++)}return $.currentNode=A,n}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},j=class r{get _$AU(){var t,e;return(e=(t=this._$AM)==null?void 0:t._$AU)!=null?e:this._$Cv}constructor(t,e,i,n){var a;this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=(a=n==null?void 0:n.isConnected)!=null?a:!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),F(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):pe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var a;let{values:e,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=z.createElement(zt(i.h,i.h[0]),this.options)),i);if(((a=this._$AH)==null?void 0:a._$AD)===n)this._$AH.p(e);else{let o=new ut(n,this),c=o.u(this.options);o.p(e),this.T(c),this._$AH=o}}_$AC(t){let e=It.get(t.strings);return e===void 0&&It.set(t.strings,e=new z(t)),e}k(t){pt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,n=0;for(let a of t)n===e.length?e.push(i=new r(this.O(H()),this.O(H()),this,this.options)):i=e[n],i._$AI(a),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){let n=Rt(t).nextSibling;Rt(t).remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,a){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,n){let a=this.strings,o=!1;if(a===void 0)t=k(this,t,e,0),o=!F(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let c=t,s,u;for(t=a[0],s=0;s<a.length-1;s++)u=k(this,c[i+s],e,s),u===S&&(u=this._$AH[s]),o||(o=!F(u)||u!==this._$AH[s]),u===d?t=d:t!==d&&(t+=(u!=null?u:"")+a[s+1]),this._$AH[s]=u}o&&!n&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}},lt=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},mt=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},dt=class extends R{constructor(t,e,i,n,a){super(t,e,i,n,a),this.type=5}_$AI(t,e=this){var o;if((t=(o=k(this,t,e,0))!=null?o:d)===S)return;let i=this._$AH,n=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==d&&(i===d||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)==null?void 0:e.host)!=null?i:this.element,t):this._$AH.handleEvent(t)}},ht=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}};var ct=L.litHtmlPolyfillSupport,Ut;ct==null||ct(z,j),((Ut=L.litHtmlVersions)!=null?Ut:L.litHtmlVersions=[]).push("3.3.3");var jt=(r,t,e)=>{var a,o;let i=(a=e==null?void 0:e.renderBefore)!=null?a:t,n=i._$litPart$;if(n===void 0){let c=(o=e==null?void 0:e.renderBefore)!=null?o:null;i._$litPart$=n=new j(t.insertBefore(H(),c),c,void 0,e!=null?e:{})}return n._$AI(r),n};var E=globalThis,f=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,i;let t=super.createRenderRoot();return(i=(e=this.renderOptions).renderBefore)!=null||(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return S}},qt;f._$litElement$=!0,f.finalized=!0,(qt=E.litElementHydrateSupport)==null||qt.call(E,{LitElement:f});var gt=E.litElementPolyfillSupport;gt==null||gt({LitElement:f});var Wt;((Wt=E.litElementVersions)!=null?Wt:E.litElementVersions=[]).push("4.2.2");var Y=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var ge={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:B},_e=(r=ge,t,e)=>{let{kind:i,metadata:n}=e,a=globalThis.litPropertyMetadata.get(n);if(a===void 0&&globalThis.litPropertyMetadata.set(n,a=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),a.set(e.name,r),i==="accessor"){let{name:o}=e;return{set(c){let s=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,s,r,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,r,c),c}}}if(i==="setter"){let{name:o}=e;return function(c){let s=this[o];t.call(this,c),this.requestUpdate(o,s,r,!0,c)}}throw Error("Unsupported decorator location: "+i)};function O(r){return(t,e)=>typeof e=="object"?_e(r,t,e):((i,n,a)=>{let o=n.hasOwnProperty(a);return n.constructor.createProperty(a,i),o?Object.getOwnPropertyDescriptor(n,a):void 0})(r,t,e)}function G(r){return O({...r,state:!0,attribute:!1})}var Bt,Vt;(function(r){r.language="language",r.system="system",r.comma_decimal="comma_decimal",r.decimal_comma="decimal_comma",r.space_comma="space_comma",r.none="none"})(Bt||(Bt={})),function(r){r.language="language",r.system="system",r.am_pm="12",r.twenty_four="24"}(Vt||(Vt={}));function ye(r){return r.substr(0,r.indexOf("."))}var ve=["closed","locked","off"];var y=function(r,t,e,i){i=i||{},e=e==null?{}:e;var n=new Event(t,{bubbles:i.bubbles===void 0||i.bubbles,cancelable:!!i.cancelable,composed:i.composed===void 0||i.composed});return n.detail=e,r.dispatchEvent(n),n};var K=function(r){y(window,"haptic",r)},be=function(r,t,e){e===void 0&&(e=!1),e?history.replaceState(null,"",t):history.pushState(null,"",t),y(window,"location-changed",{replace:e})},we=function(r,t,e){e===void 0&&(e=!0);var i,n=ye(t),a=n==="group"?"homeassistant":n;switch(n){case"lock":i=e?"unlock":"lock";break;case"cover":i=e?"open_cover":"close_cover";break;default:i=e?"turn_on":"turn_off"}return r.callService(a,i,{entity_id:t})},xe=function(r,t){var e=ve.includes(r.states[t].state);return we(r,t,e)},$e=function(r,t,e,i){if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(function(a){return a.user===t.user.id})||(K("warning"),confirm(i.confirmation.text||"Are you sure you want to "+i.action+"?")))switch(i.action){case"more-info":(e.entity||e.camera_image)&&y(r,"hass-more-info",{entityId:e.entity?e.entity:e.camera_image});break;case"navigate":i.navigation_path&&be(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":e.entity&&(xe(t,e.entity),K("success"));break;case"call-service":if(!i.service)return void K("failure");var n=i.service.split(".",2);t.callService(n[0],n[1],i.service_data,i.target),K("success");break;case"fire-dom-event":y(r,"ll-custom",i)}},Yt=function(r,t,e,i){var n;i==="double_tap"&&e.double_tap_action?n=e.double_tap_action:i==="hold"&&e.hold_action?n=e.hold_action:i==="tap"&&e.tap_action&&(n=e.tap_action),$e(r,t,e,n)};var Gt="0.1.0",J={temp_min:20,temp_max:24,temp_outer_min:16,temp_outer_max:28,humidity_min:40,humidity_max:60,humidity_outer_min:20,humidity_outer_max:80},Z={pleasant:{dark:"#1c3829",light:"#2f6b47"},too_warm:{dark:"#4a2416",light:"#8a4321"},cold:{dark:"#17324c",light:"#2d5a86"},dry:{dark:"#4a3c14",light:"#8a6f1f"},humid:{dark:"#123f42",light:"#1f6d72"}},Q={pleasant:"mdi:emoticon-happy-outline",too_warm:"mdi:thermometer-high",cold:"mdi:thermometer-low",dry:"mdi:water-percent-alert",humid:"mdi:water-percent"},tt={pleasant:"Pleasant",too_warm:"Too Warm",cold:"Cold",dry:"Dry",humid:"Humid"};function Xt(r,t,e){return Math.min(e,Math.max(t,r))}function Kt(r,t){let e=(t.min+t.max)/2,i=Math.max(1e-4,(t.max-t.min)/2),n=Math.max(1e-4,(t.outerMax-t.outerMin)/2);return{deviationRatio:(r-e)/i,positionRatio:Xt((r-e)/n,-1,1),radiusRatio:Xt(i/n,0,1)}}function Jt(r,t,e,i){let n=Kt(r,e),a=Kt(t,i),o=Math.abs(n.deviationRatio)>1,c=Math.abs(a.deviationRatio)>1,s;return!o&&!c?s="pleasant":Math.abs(n.deviationRatio)>=Math.abs(a.deviationRatio)?s=n.deviationRatio>0?"too_warm":"cold":s=a.deviationRatio>0?"humid":"dry",{state:s,dotX:a.positionRatio,dotY:-n.positionRatio,innerRadiusRatio:(n.radiusRatio+a.radiusRatio)/2}}var Ae=["pleasant","too_warm","cold","dry","humid"],Se={area:"Area",name:"Name (optional)",manual_entities:"Manually choose entities instead of an area",temperature_entity:"Temperature entity",humidity_entity:"Humidity entity",temp_min:"Comfort min (\xB0)",temp_max:"Comfort max (\xB0)",temp_outer_min:"Gauge min (\xB0)",temp_outer_max:"Gauge max (\xB0)",humidity_min:"Comfort min (%)",humidity_max:"Comfort max (%)",humidity_outer_min:"Gauge min (%)",humidity_outer_max:"Gauge max (%)",tap_action:"Tap action",hold_action:"Hold action"};function Ee(r){return[{name:"area",selector:{area:{}}},{name:"name",selector:{text:{}}},{name:"manual_entities",selector:{boolean:{}}},...r?[{name:"temperature_entity",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",selector:{entity:{domain:"sensor",device_class:"humidity"}}}]:[],{name:"thresholds",type:"expandable",title:"Comfort thresholds",flatten:!0,schema:[{type:"grid",schema:[{name:"temp_min",selector:{number:{mode:"box",step:.5}}},{name:"temp_max",selector:{number:{mode:"box",step:.5}}},{name:"temp_outer_min",selector:{number:{mode:"box",step:.5}}},{name:"temp_outer_max",selector:{number:{mode:"box",step:.5}}},{name:"humidity_min",selector:{number:{mode:"box",step:1}}},{name:"humidity_max",selector:{number:{mode:"box",step:1}}},{name:"humidity_outer_min",selector:{number:{mode:"box",step:1}}},{name:"humidity_outer_max",selector:{number:{mode:"box",step:1}}}]}]},{name:"interactions",type:"expandable",title:"Interactions",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}}]}]}var C=class extends f{constructor(){super(...arguments);this._computeLabel=e=>Se[e.name]||e.name}setConfig(e){this._config=e}_valueChanged(e){if(!this._config)return;let i={...this._config,...e.detail.value};y(this,"config-changed",{config:i})}_colorChanged(e,i,n){if(!this._config)return;let a=n.target.value,o={...this._config.colors||{}};o[e]={...o[e],[i]:a};let c={...this._config,colors:o};y(this,"config-changed",{config:c})}_iconChanged(e,i){if(!this._config)return;let n={...this._config.icons||{},[e]:i.detail.value},a={...this._config,icons:n};y(this,"config-changed",{config:a})}_resetColors(){if(!this._config)return;let{colors:e,...i}=this._config;y(this,"config-changed",{config:i})}render(){if(!this.hass||!this._config)return d;let e={...J,...this._config},i=!!this._config.manual_entities;return D`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${Ee(i)}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined header="Appearance" class="appearance">
        <p class="hint">Card background colour and icon for each comfort state.</p>
        ${Ae.map(n=>{var c,s;let a={...Z[n],...((c=this._config.colors)==null?void 0:c[n])||{}},o=((s=this._config.icons)==null?void 0:s[n])||Q[n];return D`
            <div class="state-row">
              <div class="state-name">${tt[n]}</div>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${o}
                @value-changed=${u=>this._iconChanged(n,u)}
              ></ha-icon-picker>
              <label class="swatch">
                Light
                <input
                  type="color"
                  .value=${a.light}
                  @change=${u=>this._colorChanged(n,"light",u)}
                />
              </label>
              <label class="swatch">
                Dark
                <input
                  type="color"
                  .value=${a.dark}
                  @change=${u=>this._colorChanged(n,"dark",u)}
                />
              </label>
            </div>
          `})}
        <mwc-button @click=${this._resetColors}>Reset colours & icons to defaults</mwc-button>
      </ha-expansion-panel>
    `}};C.styles=N`
    ha-form {
      display: block;
      margin-bottom: 8px;
    }
    .appearance {
      display: block;
      margin-top: 8px;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 13px;
      margin: 4px 0 12px;
    }
    .state-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 0;
    }
    .state-name {
      flex: 1;
      font-weight: 500;
    }
    ha-icon-picker {
      width: 160px;
    }
    .swatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .swatch input[type="color"] {
      width: 36px;
      height: 28px;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
  `,v([O({attribute:!1})],C.prototype,"hass",2),v([G()],C.prototype,"_config",2),C=v([Y("comfort-card-editor")],C);console.info(`%c COMFORT-CARD %c v${Gt} `,"color: white; background: #1c3829; font-weight: 700;","color: #1c3829; background: white; font-weight: 700;");window.customCards=window.customCards||[];window.customCards.push({type:"comfort-card",name:"Room Comfort",description:"Shows a room's temperature/humidity comfort at a glance.",preview:!0});function Zt(r,t,e){var a;return(a=Object.values(r.entities||{}).filter(o=>{var u,l,m;if(o.hidden||o.disabled_by||!o.entity_id.startsWith("sensor.")||(o.area_id||(o.device_id?(l=(u=r.devices)==null?void 0:u[o.device_id])==null?void 0:l.area_id:void 0))!==t)return!1;let s=r.states[o.entity_id];return((m=s==null?void 0:s.attributes)==null?void 0:m.device_class)===e})[0])==null?void 0:a.entity_id}function Ce(r,t){return r.toLocaleString(void 0,{minimumFractionDigits:t,maximumFractionDigits:t})}var T=class extends f{static async getConfigElement(){return document.createElement("comfort-card-editor")}static getStubConfig(){return{type:"custom:comfort-card"}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.area&&!t.manual_entities)throw new Error("Please select an area, or enable manual entity selection.");if(t.manual_entities&&(!t.temperature_entity||!t.humidity_entity))throw new Error("Please select both a temperature and a humidity entity.");this._config=t}getCardSize(){return 4}getLayoutOptions(){return{grid_columns:6,grid_min_columns:6,grid_rows:4,grid_min_rows:4}}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config"))return!0;let e=t.get("hass");if(!e)return!0;let i=this._temperatureEntity,n=this._humidityEntity;return i&&e.states[i]!==this.hass.states[i]||n&&e.states[n]!==this.hass.states[n]||e.themes!==this.hass.themes}get _temperatureEntity(){var t;if(!(!this._config||!this.hass))return this._config.manual_entities||!this._config.area?this._config.temperature_entity:(t=Zt(this.hass,this._config.area,"temperature"))!=null?t:this._config.temperature_entity}get _humidityEntity(){var t;if(!(!this._config||!this.hass))return this._config.manual_entities||!this._config.area?this._config.humidity_entity:(t=Zt(this.hass,this._config.area,"humidity"))!=null?t:this._config.humidity_entity}get _name(){var t,e,i,n;return(t=this._config)!=null&&t.name?this._config.name:(e=this._config)!=null&&e.area&&((n=(i=this.hass)==null?void 0:i.areas)!=null&&n[this._config.area])?this.hass.areas[this._config.area].name:"Room Comfort"}_handleAction(t){!this.hass||!this._config||Yt(this,this.hass,{...this._config,entity:this._temperatureEntity},t)}_onPointerDown(){this._holdTimer=window.setTimeout(()=>{this._holdTimer=void 0,this._handleAction("hold")},500)}_onPointerUp(){this._holdTimer&&(window.clearTimeout(this._holdTimer),this._holdTimer=void 0,this._handleAction("tap"))}_onPointerCancel(){this._holdTimer&&(window.clearTimeout(this._holdTimer),this._holdTimer=void 0)}render(){var yt,vt,bt,wt;if(!this._config||!this.hass)return d;let t=this._temperatureEntity,e=this._humidityEntity,i=t?this.hass.states[t]:void 0,n=e?this.hass.states[e]:void 0,a=(vt=(yt=this.hass.themes)==null?void 0:yt.darkMode)!=null?vt:!1;if(!i||!n||i.state==="unavailable"||n.state==="unavailable")return D`
        <ha-card>
          <div class="unavailable">
            <ha-icon icon="mdi:thermometer-off"></ha-icon>
            <span>${this._name}: sensors unavailable</span>
          </div>
        </ha-card>
      `;let o=parseFloat(i.state),c=parseFloat(n.state),s={...J,...this._config},u=Jt(o,c,{min:s.temp_min,max:s.temp_max,outerMin:s.temp_outer_min,outerMax:s.temp_outer_max},{min:s.humidity_min,max:s.humidity_max,outerMin:s.humidity_outer_min,outerMax:s.humidity_outer_max}),l=u.state,m={...Z[l],...((bt=this._config.colors)==null?void 0:bt[l])||{}},h=a?m.dark:m.light,p=((wt=this._config.icons)==null?void 0:wt[l])||Q[l],g=220,et=g/2,it=g/2,nt=92,_t=nt-14,Qt=Math.max(20,u.innerRadiusRatio*nt),te=et+u.dotX*_t,ee=it+u.dotY*_t,ie=Ce(o,1),ne=Math.round(c);return D`
      <ha-card
        style="background: ${h}"
        class=${a?"dark":"light"}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @pointerleave=${this._onPointerCancel}
      >
        <div class="header">
          <div class="name">${this._name}</div>
          <div class="state">
            <ha-icon .icon=${p}></ha-icon>
            <span>${tt[l]}</span>
          </div>
        </div>

        <div class="gauge-label top">TOO WARM</div>
        <div class="gauge-row">
          <div class="gauge-label left">DRY</div>
          <svg viewBox="0 0 ${g} ${g}" class="gauge">
            <circle class="outer" cx=${et} cy=${it} r=${nt}></circle>
            <circle class="inner" cx=${et} cy=${it} r=${Qt}></circle>
            <circle class="dot" cx=${te} cy=${ee} r="9"></circle>
          </svg>
          <div class="gauge-label right">HUMID</div>
        </div>
        <div class="gauge-label bottom">COLD</div>

        <div class="footer">
          <div class="stat">
            <div class="stat-label">
              <span class="label-long">TEMPERATURE</span><span class="label-short">TEMP</span>
            </div>
            <div class="stat-value">${ie}°</div>
          </div>
          <div class="stat">
            <div class="stat-label">HUMIDITY</div>
            <div class="stat-value">${ne}%</div>
          </div>
        </div>
      </ha-card>
    `}};T.styles=N`
    :host {
      display: block;
    }

    ha-card {
      container-type: inline-size;
      container-name: comfort-card;
      display: block;
      box-sizing: border-box;
      padding: 20px 24px 24px;
      border-radius: var(--ha-card-border-radius, 12px);
      color: white;
      transition: background-color 0.3s ease-in-out;
      cursor: pointer;
      overflow: hidden;
    }

    .unavailable {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      color: var(--secondary-text-color);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .name {
      font-size: 22px;
      font-weight: 700;
      line-height: 1.2;
    }

    .state {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.2;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .gauge-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      opacity: 0.85;
      text-align: center;
    }

    .gauge-label.top {
      margin-bottom: 4px;
    }

    .gauge-label.bottom {
      margin-top: 4px;
    }

    .gauge-row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      column-gap: 12px;
    }

    .gauge-label.left {
      text-align: right;
    }

    .gauge-label.right {
      text-align: left;
    }

    .gauge {
      width: clamp(84px, 46cqi, 200px);
      height: clamp(84px, 46cqi, 200px);
      justify-self: center;
    }

    .gauge .outer {
      fill: none;
      stroke: white;
      stroke-width: 2;
    }

    .gauge .inner {
      fill: rgba(255, 255, 255, 0.28);
    }

    .gauge .dot {
      fill: white;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      gap: 12px;
    }

    .stat-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      opacity: 0.85;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 34px;
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;
    }

    .label-short {
      display: none;
    }

    @container comfort-card (max-width: 300px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }

      .stat-value {
        font-size: 26px;
      }

      .label-long {
        display: none;
      }

      .label-short {
        display: inline;
      }

      /* Turning the side labels on their side, and letting their columns
         collapse to the text width instead of 1fr, frees up the horizontal
         space the gauge needs to stay legible in a half-width column. */
      .gauge-label.left,
      .gauge-label.right {
        writing-mode: vertical-rl;
        text-align: center;
        line-height: 1;
      }

      .gauge-label.left {
        rotate: 180deg;
      }

      .gauge-row {
        grid-template-columns: auto minmax(0, 1fr) auto;
        column-gap: 2px;
      }

      .gauge {
        width: 100%;
        height: auto;
        max-width: 200px;
        aspect-ratio: 1;
      }
    }

    @container comfort-card (max-width: 240px) {
      ha-card {
        padding: 16px 14px;
      }

      .gauge-label {
        font-size: 10px;
        letter-spacing: 0;
      }

      .footer {
        gap: 6px;
      }
    }
  `,v([O({attribute:!1})],T.prototype,"hass",2),v([G()],T.prototype,"_config",2),T=v([Y("comfort-card")],T);export{T as ComfortCard};
