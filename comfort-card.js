var ye=Object.defineProperty;var be=Object.getOwnPropertyDescriptor;var x=(n,e,t,i)=>{for(var r=i>1?void 0:i?be(e,t):e,a=n.length-1,o;a>=0;a--)(o=n[a])&&(r=(i?o(e,t,r):o(r))||r);return i&&r&&ye(e,t,r),r};var et=globalThis,it=et.ShadowRoot&&(et.ShadyCSS===void 0||et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol(),kt=new WeakMap,j=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(it&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=kt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&kt.set(t,e))}return e}toString(){return this.cssText}},Ot=n=>new j(typeof n=="string"?n:n+"",void 0,pt),G=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,r,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[a+1],n[0]);return new j(t,n,pt)},Mt=(n,e)=>{if(it)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),r=et.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,n.appendChild(i)}},ft=it?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Ot(t)})(n):n;var{is:ve,defineProperty:xe,getOwnPropertyDescriptor:we,getOwnPropertyNames:$e,getOwnPropertySymbols:Ae,getPrototypeOf:Se}=Object,C=globalThis,Pt=C.trustedTypes,Ee=Pt?Pt.emptyScript:"",gt=C.reactiveElementPolyfillSupport,B=(n,e)=>n,W={toAttribute(n,e){switch(e){case Boolean:n=n?Ee:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},rt=(n,e)=>!ve(n,e),Dt={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:rt},It,Nt;(It=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(Nt=C.litPropertyMetadata)!=null||(C.litPropertyMetadata=new WeakMap);var S=class extends HTMLElement{static addInitializer(e){var t;this._$Ei(),((t=this.l)!=null?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Dt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&xe(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){var o;let{get:r,set:a}=(o=we(this.prototype,e))!=null?o:{get(){return this[t]},set(c){this[t]=c}};return{get:r,set(c){let s=r==null?void 0:r.call(this);a==null||a.call(this,c),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return(t=this.elementProperties.get(e))!=null?t:Dt}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;let e=Se(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){let t=this.properties,i=[...$e(t),...Ae(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(ft(r))}else e!==void 0&&t.push(ft(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$EO)!=null?t:this._$EO=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var t;let e=(t=this.shadowRoot)!=null?t:this.attachShadow(this.constructor.shadowRootOptions);return Mt(e,this.constructor.elementStyles),e}connectedCallback(){var e,t;(e=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostConnected)==null?void 0:r.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var a;let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let o=(((a=i.converter)==null?void 0:a.toAttribute)!==void 0?i.converter:W).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var a,o,c;let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let s=i.getPropertyOptions(r),u=typeof s.converter=="function"?{fromAttribute:s.converter}:((a=s.converter)==null?void 0:a.fromAttribute)!==void 0?s.converter:W;this._$Em=r;let d=u.fromAttribute(t,s.type);this[r]=(c=d!=null?d:(o=this._$Ej)==null?void 0:o.get(r))!=null?c:d,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){var o,c;if(e!==void 0){let s=this.constructor;if(r===!1&&(a=this[e]),i!=null||(i=s.getPropertyOptions(e)),!(((o=i.hasChanged)!=null?o:rt)(a,t)||i.useDefault&&i.reflect&&a===((c=this._$Ej)==null?void 0:c.get(e))&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},o){var c,s,u;i&&!((c=this._$Ej)!=null?c:this._$Ej=new Map).has(e)&&(this._$Ej.set(e,(s=o!=null?o:t)!=null?s:this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&((u=this._$Eq)!=null?u:this._$Eq=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i,r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((i=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,c]of this._$Ep)this[o]=c;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,c]of a){let{wrapped:s}=c,u=this[o];s!==!0||this._$AL.has(o)||u===void 0||this.C(o,void 0,c,u)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(a=>{var o;return(o=a.hostUpdate)==null?void 0:o.call(a)}),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}},Ht;S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[B("elementProperties")]=new Map,S[B("finalized")]=new Map,gt==null||gt({ReactiveElement:S}),((Ht=C.reactiveElementVersions)!=null?Ht:C.reactiveElementVersions=[]).push("2.1.2");var V=globalThis,Lt=n=>n,nt=V.trustedTypes,Ut=nt?nt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Wt="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,Yt="?"+T,Ce=`<${Yt}>`,I=document,X=()=>I.createComment(""),K=n=>n===null||typeof n!="object"&&typeof n!="function",At=Array.isArray,Te=n=>At(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",_t=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ft=/-->/g,zt=/>/g,P=RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qt=/'/g,jt=/"/g,Vt=/^(?:script|style|textarea|title)$/i,St=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),R=St(1),Q=St(2),ti=St(3),N=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Gt=new WeakMap,D=I.createTreeWalker(I,129);function Xt(n,e){if(!At(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ut!==void 0?Ut.createHTML(e):e}var Re=(n,e)=>{let t=n.length-1,i=[],r,a=e===2?"<svg>":e===3?"<math>":"",o=Y;for(let c=0;c<t;c++){let s=n[c],u,d,m=-1,l=0;for(;l<s.length&&(o.lastIndex=l,d=o.exec(s),d!==null);)l=o.lastIndex,o===Y?d[1]==="!--"?o=Ft:d[1]!==void 0?o=zt:d[2]!==void 0?(Vt.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=P):d[3]!==void 0&&(o=P):o===P?d[0]===">"?(o=r!=null?r:Y,m=-1):d[1]===void 0?m=-2:(m=o.lastIndex-d[2].length,u=d[1],o=d[3]===void 0?P:d[3]==='"'?jt:qt):o===jt||o===qt?o=P:o===Ft||o===zt?o=Y:(o=P,r=void 0);let p=o===P&&n[c+1].startsWith("/>")?" ":"";a+=o===Y?s+Ce:m>=0?(i.push(u),s.slice(0,m)+Wt+s.slice(m)+T+p):s+T+(m===-2?c:p)}return[Xt(n,a+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},J=class n{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,o=0,c=e.length-1,s=this.parts,[u,d]=Re(e,t);if(this.el=n.createElement(u,i),D.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=D.nextNode())!==null&&s.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let m of r.getAttributeNames())if(m.endsWith(Wt)){let l=d[o++],p=r.getAttribute(m).split(T),f=/([.?@])?(.*)/.exec(l);s.push({type:1,index:a,name:f[2],strings:p,ctor:f[1]==="."?vt:f[1]==="?"?xt:f[1]==="@"?wt:F}),r.removeAttribute(m)}else m.startsWith(T)&&(s.push({type:6,index:a}),r.removeAttribute(m));if(Vt.test(r.tagName)){let m=r.textContent.split(T),l=m.length-1;if(l>0){r.textContent=nt?nt.emptyScript:"";for(let p=0;p<l;p++)r.append(m[p],X()),D.nextNode(),s.push({type:2,index:++a});r.append(m[l],X())}}}else if(r.nodeType===8)if(r.data===Yt)s.push({type:2,index:a});else{let m=-1;for(;(m=r.data.indexOf(T,m+1))!==-1;)s.push({type:7,index:a}),m+=T.length-1}a++}}static createElement(e,t){let i=I.createElement("template");return i.innerHTML=e,i}};function U(n,e,t=n,i){var o,c,s;if(e===N)return e;let r=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl,a=K(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==a&&((c=r==null?void 0:r._$AO)==null||c.call(r,!1),a===void 0?r=void 0:(r=new a(n),r._$AT(n,t,i)),i!==void 0?((s=t._$Co)!=null?s:t._$Co=[])[i]=r:t._$Cl=r),r!==void 0&&(e=U(n,r._$AS(n,e.values),r,i)),e}var bt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var u;let{el:{content:t},parts:i}=this._$AD,r=((u=e==null?void 0:e.creationScope)!=null?u:I).importNode(t,!0);D.currentNode=r;let a=D.nextNode(),o=0,c=0,s=i[0];for(;s!==void 0;){if(o===s.index){let d;s.type===2?d=new Z(a,a.nextSibling,this,e):s.type===1?d=new s.ctor(a,s.name,s.strings,this,e):s.type===6&&(d=new $t(a,this,e)),this._$AV.push(d),s=i[++c]}o!==(s==null?void 0:s.index)&&(a=D.nextNode(),o++)}return D.currentNode=I,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Z=class n{get _$AU(){var e,t;return(t=(e=this._$AM)==null?void 0:e._$AU)!=null?t:this._$Cv}constructor(e,t,i,r){var a;this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(a=r==null?void 0:r.isConnected)!=null?a:!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),K(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==N&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Te(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){var a;let{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=J.createElement(Xt(i.h,i.h[0]),this.options)),i);if(((a=this._$AH)==null?void 0:a._$AD)===r)this._$AH.p(t);else{let o=new bt(r,this),c=o.u(this.options);o.p(t),this.T(c),this._$AH=o}}_$AC(e){let t=Gt.get(e.strings);return t===void 0&&Gt.set(e.strings,t=new J(e)),t}k(e){At(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let a of e)r===t.length?t.push(i=new n(this.O(X()),this.O(X()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){let r=Lt(e).nextSibling;Lt(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(e,t=this,i,r){let a=this.strings,o=!1;if(a===void 0)e=U(this,e,t,0),o=!K(e)||e!==this._$AH&&e!==N,o&&(this._$AH=e);else{let c=e,s,u;for(e=a[0],s=0;s<a.length-1;s++)u=U(this,c[i+s],t,s),u===N&&(u=this._$AH[s]),o||(o=!K(u)||u!==this._$AH[s]),u===h?e=h:e!==h&&(e+=(u!=null?u:"")+a[s+1]),this._$AH[s]=u}o&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}},vt=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},xt=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},wt=class extends F{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){var o;if((e=(o=U(this,e,t,0))!=null?o:h)===N)return;let i=this._$AH,r=e===h&&i!==h||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==h&&(i===h||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)==null?void 0:t.host)!=null?i:this.element,e):this._$AH.handleEvent(e)}},$t=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var yt=V.litHtmlPolyfillSupport,Bt;yt==null||yt(J,Z),((Bt=V.litHtmlVersions)!=null?Bt:V.litHtmlVersions=[]).push("3.3.3");var Kt=(n,e,t)=>{var a,o;let i=(a=t==null?void 0:t.renderBefore)!=null?a:e,r=i._$litPart$;if(r===void 0){let c=(o=t==null?void 0:t.renderBefore)!=null?o:null;i._$litPart$=r=new Z(e.insertBefore(X(),c),c,void 0,t!=null?t:{})}return r._$AI(n),r};var H=globalThis,w=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;let e=super.createRenderRoot();return(i=(t=this.renderOptions).renderBefore)!=null||(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Kt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return N}},Jt;w._$litElement$=!0,w.finalized=!0,(Jt=H.litElementHydrateSupport)==null||Jt.call(H,{LitElement:w});var Et=H.litElementPolyfillSupport;Et==null||Et({LitElement:w});var Zt;((Zt=H.litElementVersions)!=null?Zt:H.litElementVersions=[]).push("4.2.2");var at=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var ke={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:rt},Oe=(n=ke,e,t)=>{let{kind:i,metadata:r}=t,a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(t.name,n),i==="accessor"){let{name:o}=t;return{set(c){let s=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,s,n,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,n,c),c}}}if(i==="setter"){let{name:o}=t;return function(c){let s=this[o];e.call(this,c),this.requestUpdate(o,s,n,!0,c)}}throw Error("Unsupported decorator location: "+i)};function z(n){return(e,t)=>typeof t=="object"?Oe(n,e,t):((i,r,a)=>{let o=r.hasOwnProperty(a);return r.constructor.createProperty(a,i),o?Object.getOwnPropertyDescriptor(r,a):void 0})(n,e,t)}function q(n){return z({...n,state:!0,attribute:!1})}var Qt,te;(function(n){n.language="language",n.system="system",n.comma_decimal="comma_decimal",n.decimal_comma="decimal_comma",n.space_comma="space_comma",n.none="none"})(Qt||(Qt={})),function(n){n.language="language",n.system="system",n.am_pm="12",n.twenty_four="24"}(te||(te={}));function Me(n){return n.substr(0,n.indexOf("."))}var Pe=["closed","locked","off"];var k=function(n,e,t,i){i=i||{},t=t==null?{}:t;var r=new Event(e,{bubbles:i.bubbles===void 0||i.bubbles,cancelable:!!i.cancelable,composed:i.composed===void 0||i.composed});return r.detail=t,n.dispatchEvent(r),r};var st=function(n){k(window,"haptic",n)},De=function(n,e,t){t===void 0&&(t=!1),t?history.replaceState(null,"",e):history.pushState(null,"",e),k(window,"location-changed",{replace:t})},Ie=function(n,e,t){t===void 0&&(t=!0);var i,r=Me(e),a=r==="group"?"homeassistant":r;switch(r){case"lock":i=t?"unlock":"lock";break;case"cover":i=t?"open_cover":"close_cover";break;default:i=t?"turn_on":"turn_off"}return n.callService(a,i,{entity_id:e})},Ne=function(n,e){var t=Pe.includes(n.states[e].state);return Ie(n,e,t)},He=function(n,e,t,i){if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(function(a){return a.user===e.user.id})||(st("warning"),confirm(i.confirmation.text||"Are you sure you want to "+i.action+"?")))switch(i.action){case"more-info":(t.entity||t.camera_image)&&k(n,"hass-more-info",{entityId:t.entity?t.entity:t.camera_image});break;case"navigate":i.navigation_path&&De(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":t.entity&&(Ne(e,t.entity),st("success"));break;case"call-service":if(!i.service)return void st("failure");var r=i.service.split(".",2);e.callService(r[0],r[1],i.service_data,i.target),st("success");break;case"fire-dom-event":k(n,"ll-custom",i)}},ee=function(n,e,t,i){var r;i==="double_tap"&&t.double_tap_action?r=t.double_tap_action:i==="hold"&&t.hold_action?r=t.hold_action:i==="tap"&&t.tap_action&&(r=t.tap_action),He(n,e,t,r)};var ie="0.2.0",ct={temp_min:20,temp_max:24,temp_outer_min:16,temp_outer_max:28,humidity_min:40,humidity_max:60,humidity_outer_min:20,humidity_outer_max:80},ut=0,lt=24,mt={pleasant:{dark:"#1c3829",light:"#2f6b47"},too_warm:{dark:"#4a2416",light:"#8a4321"},cold:{dark:"#17324c",light:"#2d5a86"},dry:{dark:"#4a3c14",light:"#8a6f1f"},humid:{dark:"#123f42",light:"#1f6d72"}},dt={pleasant:"Pleasant",too_warm:"Too warm",cold:"Cold",dry:"Dry",humid:"Humid"},tt={top:"WARM",right:"HUMID",bottom:"COLD",left:"DRY"},re="mdi:thermometer",ne="mdi:water-percent";function ce(n,e,t){return Math.min(t,Math.max(e,n))}function ae(n,e){let t=(e.min+e.max)/2,i=Math.max(1e-4,(e.max-e.min)/2);return(n-t)/i}function oe(n,e){let t=(e.min+e.max)/2,i=Math.max(1e-4,(e.outerMax-e.outerMin)/2);return ce((n-t)/i,-1,1)}function se(n){let e=Math.max(1e-4,(n.max-n.min)/2),t=Math.max(1e-4,(n.outerMax-n.outerMin)/2);return ce(e/t,0,1)}function Ct(n,e,t,i){let r=oe(e,i),a=-oe(n,t),o=Math.hypot(r,a);return o>1&&(r/=o,a/=o),{x:r,y:a}}function ue(n,e,t,i){let r=ae(n,t),a=ae(e,i),o=Math.abs(r)>1,c=Math.abs(a)>1,s;!o&&!c?s="pleasant":Math.abs(r)>=Math.abs(a)?s=r>0?"too_warm":"cold":s=a>0?"humid":"dry";let u=Ct(n,e,t,i);return{state:s,dotX:u.x,dotY:u.y,innerRadiusRatio:(se(t)+se(i))/2}}var le=n=>typeof n=="number"?n:new Date(n).getTime();async function me(n,e,t,i,r,a){var v,g,_;if(i<=0)return[];let o=new Date,c=new Date(o.getTime()-i*3600*1e3),s;try{s=await n.callWS({type:"recorder/statistics_during_period",start_time:c.toISOString(),end_time:o.toISOString(),statistic_ids:[e,t],period:"5minute",types:["mean"]})}catch{return[]}let u=(v=s==null?void 0:s[e])!=null?v:[],d=(g=s==null?void 0:s[t])!=null?g:[];if(!u.length||!d.length)return[];let m=new Map;for(let y of d)y.mean!=null&&m.set(le(y.start),y.mean);let l=[...m.entries()].sort((y,M)=>y[0]-M[0]),p=[],f=0,b;for(let y of u){if(y.mean==null)continue;let M=le(y.start);for(;f<l.length&&l[f][0]<=M;)b=l[f][1],f++;let Rt=(_=m.get(M))!=null?_:b;Rt!=null&&p.push(Ct(y.mean,Rt,r,a))}return p}function de(n,e){if(n.length<=2)return n;let t=[n[0]];for(let r=1;r<n.length-1;r++){let a=n[r],o=t[t.length-1];Math.hypot(a.x-o.x,a.y-o.y)>=e&&t.push(a)}let i=n[n.length-1];if(t.length>1){let r=t[t.length-1];Math.hypot(i.x-r.x,i.y-r.y)<e*.5&&t.pop()}return t.push(i),t}function he(n,e){if(n.length<3)return n;let t=r=>n[Math.max(0,Math.min(n.length-1,r))],i=[];for(let r=0;r<n.length-1;r++){let a=t(r-1),o=t(r),c=t(r+1),s=t(r+2);for(let u=0;u<e;u++){let d=u/e,m=d*d,l=m*d;i.push({x:.5*(2*o.x+(-a.x+c.x)*d+(2*a.x-5*o.x+4*c.x-s.x)*m+(-a.x+3*o.x-3*c.x+s.x)*l),y:.5*(2*o.y+(-a.y+c.y)*d+(2*a.y-5*o.y+4*c.y-s.y)*m+(-a.y+3*o.y-3*c.y+s.y)*l)})}}return i.push(n[n.length-1]),i}function pe(n,e,t,i){let r=n.length;if(r<3)return[];let a=[],o=[],c=i/2,s={x:0,y:-1};for(let l=0;l<r;l++){let p=n[Math.max(0,l-1)],f=n[Math.min(r-1,l+1)],b=f.x-p.x,v=f.y-p.y,g=Math.hypot(b,v),_;g<1e-6?_=s:(b/=g,v/=g,_={x:-v,y:b},s=_),a.push({x:n[l].x+_.x*c,y:n[l].y+_.y*c}),o.push({x:n[l].x-_.x*c,y:n[l].y-_.y*c})}let u=Math.max(1,Math.floor((r-1)/e)),d=[],m=l=>`${l.x.toFixed(2)} ${l.y.toFixed(2)}`;for(let l=0;l<r-1;l+=u){let p=Math.min(r-1,l+u),f=[];for(let g=l;g<=p;g++)f.push(m(a[g]));let b=[];for(let g=p;g>=l;g--)b.push(m(o[g]));let v=p/(r-1);d.push({d:`M ${f.join(" L ")} L ${b.join(" L ")} Z`,opacity:Number((t*v*v).toFixed(3))})}return d}var Le=["pleasant","too_warm","cold","dry","humid"],Ue={area:"Area",name:"Name (optional)",manual_entities:"Manually choose entities instead of an area",temperature_entity:"Temperature entity",humidity_entity:"Humidity entity",temp_min:"Comfort min (\xB0)",temp_max:"Comfort max (\xB0)",temp_outer_min:"Gauge min (\xB0)",temp_outer_max:"Gauge max (\xB0)",humidity_min:"Comfort min (%)",humidity_max:"Comfort max (%)",humidity_outer_min:"Gauge min (%)",humidity_outer_max:"Gauge max (%)",history_hours:"Hours of history",tap_action:"Tap action",hold_action:"Hold action"};function Fe(n){return[{name:"area",selector:{area:{}}},{name:"name",selector:{text:{}}},{name:"manual_entities",selector:{boolean:{}}},...n?[{name:"temperature_entity",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",selector:{entity:{domain:"sensor",device_class:"humidity"}}}]:[],{name:"history_hours",selector:{number:{min:0,max:lt,step:1,mode:"slider",unit_of_measurement:"h"}}},{name:"thresholds",type:"expandable",title:"Comfort thresholds",flatten:!0,schema:[{type:"grid",schema:[{name:"temp_min",selector:{number:{mode:"box",step:.5}}},{name:"temp_max",selector:{number:{mode:"box",step:.5}}},{name:"temp_outer_min",selector:{number:{mode:"box",step:.5}}},{name:"temp_outer_max",selector:{number:{mode:"box",step:.5}}},{name:"humidity_min",selector:{number:{mode:"box",step:1}}},{name:"humidity_max",selector:{number:{mode:"box",step:1}}},{name:"humidity_outer_min",selector:{number:{mode:"box",step:1}}},{name:"humidity_outer_max",selector:{number:{mode:"box",step:1}}}]}]},{name:"interactions",type:"expandable",title:"Interactions",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}}]}]}var L=class extends w{constructor(){super(...arguments);this._computeLabel=t=>Ue[t.name]||t.name}setConfig(t){this._config=t}_valueChanged(t){if(!this._config)return;let i={...this._config,...t.detail.value};k(this,"config-changed",{config:i})}_colorChanged(t,i,r){if(!this._config)return;let a=r.target.value,o={...this._config.colors||{}};o[t]={...o[t],[i]:a};let c={...this._config,colors:o};k(this,"config-changed",{config:c})}_resetColors(){if(!this._config)return;let{colors:t,...i}=this._config;k(this,"config-changed",{config:i})}render(){if(!this.hass||!this._config)return h;let t={...ct,history_hours:ut,...this._config},i=!!this._config.manual_entities;return R`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Fe(i)}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${t.history_hours>0?R`<ha-alert alert-type="info">
            The history trail uses long-term statistics, so both sensors need
            <code>state_class: measurement</code>. Sensors without it show no trail.
          </ha-alert>`:h}

      <ha-expansion-panel outlined header="Colours" class="appearance">
        <p class="hint">Card background colour for each comfort state.</p>
        ${Le.map(r=>{var o;let a={...mt[r],...((o=this._config.colors)==null?void 0:o[r])||{}};return R`
            <div class="state-row">
              <div class="state-name">${dt[r]}</div>
              <label class="swatch">
                Light
                <input
                  type="color"
                  .value=${a.light}
                  @change=${c=>this._colorChanged(r,"light",c)}
                />
              </label>
              <label class="swatch">
                Dark
                <input
                  type="color"
                  .value=${a.dark}
                  @change=${c=>this._colorChanged(r,"dark",c)}
                />
              </label>
            </div>
          `})}
        <mwc-button @click=${this._resetColors}>Reset colours to defaults</mwc-button>
      </ha-expansion-panel>
    `}};L.styles=G`
    ha-form {
      display: block;
      margin-bottom: 8px;
    }
    ha-alert {
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
  `,x([z({attribute:!1})],L.prototype,"hass",2),x([q()],L.prototype,"_config",2),L=x([at("comfort-card-editor")],L);console.info(`%c COMFORT-CARD %c v${ie} `,"color: white; background: #1c3829; font-weight: 700;","color: #1c3829; background: white; font-weight: 700;");window.customCards=window.customCards||[];window.customCards.push({type:"comfort-card",name:"Room Comfort",description:"Shows a room's temperature/humidity comfort at a glance.",preview:!0});var Tt=200,A=Tt/2,$=84,ht=64,_e=11,ze={top:21,right:25,bottom:21,left:19},qe=.12,je=14,Ge=36,Be=.34,We=_e*2*.3,Ye=5*60*1e3;function fe(n,e){let t=e*Math.PI/180;return[A+n*Math.sin(t),A-n*Math.cos(t)]}function O(n,e,t,i=!0){let[r,a]=fe(n,e),[o,c]=fe(n,t),s=i?1:0,d=(i?(t-e+360)%360:(e-t+360)%360)>180?1:0;return`M ${r.toFixed(2)} ${a.toFixed(2)} A ${n} ${n} 0 ${d} ${s} ${o.toFixed(2)} ${c.toFixed(2)}`}function ge(n,e,t){var a;return(a=Object.values(n.entities||{}).filter(o=>{var u,d,m;if(o.hidden||o.disabled_by||!o.entity_id.startsWith("sensor.")||(o.area_id||(o.device_id?(d=(u=n.devices)==null?void 0:u[o.device_id])==null?void 0:d.area_id:void 0))!==e)return!1;let s=n.states[o.entity_id];return((m=s==null?void 0:s.attributes)==null?void 0:m.device_class)===t})[0])==null?void 0:a.entity_id}function Ve(n,e){return n.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})}var E=class extends w{constructor(){super(...arguments);this._layout="square";this._trailPoints=[];this._historyKey="";this._historyPending=!1}static async getConfigElement(){return document.createElement("comfort-card-editor")}static getStubConfig(){return{type:"custom:comfort-card"}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.area&&!t.manual_entities)throw new Error("Please select an area, or enable manual entity selection.");if(t.manual_entities&&(!t.temperature_entity||!t.humidity_entity))throw new Error("Please select both a temperature and a humidity entity.");this._config=t}getCardSize(){return 6}getGridOptions(){var t;return{columns:6,rows:6,min_columns:3,min_rows:2,...((t=this._config)==null?void 0:t.grid_options)||{}}}getLayoutOptions(){return{grid_columns:6,grid_min_columns:3,grid_rows:6,grid_min_rows:2}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{var r;let i=(r=t[0])==null?void 0:r.contentRect;!i||!i.width||!i.height||(this._layout=this._layoutFor(i.width,i.height))}),this._resizeObserver.observe(this),this._historyTimer=window.setInterval(()=>this._refreshHistory(!0),Ye)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._resizeObserver)==null||t.disconnect(),this._resizeObserver=void 0,this._historyTimer&&(window.clearInterval(this._historyTimer),this._historyTimer=void 0)}_layoutFor(t,i){if(t<240)return"vertical";let r=t/i,a=this._layout;return a==="horizontal"?r<1.15?"square":"horizontal":a==="vertical"?r>=1.25?"horizontal":r>.95?"square":"vertical":r>=1.25?"horizontal":r<=.85?"vertical":"square"}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config")||t.has("_layout")||t.has("_trailPoints"))return!0;let i=t.get("hass");if(!i)return!0;let r=this._temperatureEntity,a=this._humidityEntity;return r&&i.states[r]!==this.hass.states[r]||a&&i.states[a]!==this.hass.states[a]||i.themes!==this.hass.themes}updated(t){super.updated(t),(t.has("hass")||t.has("_config"))&&this._refreshHistory()}get _historyHours(){var i,r;let t=(r=(i=this._config)==null?void 0:i.history_hours)!=null?r:ut;return Math.max(0,Math.min(lt,t))}get _ranges(){let t={...ct,...this._config};return{temp:{min:t.temp_min,max:t.temp_max,outerMin:t.temp_outer_min,outerMax:t.temp_outer_max},humidity:{min:t.humidity_min,max:t.humidity_max,outerMin:t.humidity_outer_min,outerMax:t.humidity_outer_max}}}async _refreshHistory(t=!1){let i=this._historyHours,r=this._temperatureEntity,a=this._humidityEntity;if(!this.hass||!i||!r||!a){this._trailPoints.length&&(this._trailPoints=[]),this._historyKey="";return}let o=`${r}|${a}|${i}|${JSON.stringify(this._ranges)}`;if(!(!t&&o===this._historyKey)&&!this._historyPending){this._historyPending=!0,this._historyKey=o;try{let{temp:c,humidity:s}=this._ranges;this._trailPoints=await me(this.hass,r,a,i,c,s)}finally{this._historyPending=!1}}}_buildTrail(t){if(this._trailPoints.length<2)return[];let i=de([...this._trailPoints,t],qe);if(i.length<3)return[];let r=he(i,je).map(a=>({x:A+a.x*ht,y:A+a.y*ht}));return pe(r,Ge,Be,We)}get _temperatureEntity(){var t;if(!(!this._config||!this.hass))return this._config.manual_entities||!this._config.area?this._config.temperature_entity:(t=ge(this.hass,this._config.area,"temperature"))!=null?t:this._config.temperature_entity}get _humidityEntity(){var t;if(!(!this._config||!this.hass))return this._config.manual_entities||!this._config.area?this._config.humidity_entity:(t=ge(this.hass,this._config.area,"humidity"))!=null?t:this._config.humidity_entity}get _name(){var t,i,r,a;return(t=this._config)!=null&&t.name?this._config.name:(i=this._config)!=null&&i.area&&((a=(r=this.hass)==null?void 0:r.areas)!=null&&a[this._config.area])?this.hass.areas[this._config.area].name:"Room Comfort"}_handleAction(t){!this.hass||!this._config||ee(this,this.hass,{...this._config,entity:this._temperatureEntity},t)}_onPointerDown(){this._holdTimer=window.setTimeout(()=>{this._holdTimer=void 0,this._handleAction("hold")},500)}_onPointerUp(){this._holdTimer&&(window.clearTimeout(this._holdTimer),this._holdTimer=void 0,this._handleAction("tap"))}_onPointerCancel(){this._holdTimer&&(window.clearTimeout(this._holdTimer),this._holdTimer=void 0)}_renderGauge(t,i,r,a){let{top:o,right:c,bottom:s,left:u}=ze,d=[O($,o,90-c),O($,90+c,180-s),O($,180+s,270-u),O($,270+u,360-o)],m=[{id:"arc-top",d:O($,-o,o),label:tt.top},{id:"arc-right",d:O($,90-c,90+c),label:tt.right},{id:"arc-bottom",d:O($,180+s,180-s,!1),label:tt.bottom},{id:"arc-left",d:O($,270-u,270+u),label:tt.left}];return R`
      <svg viewBox="0 0 ${Tt} ${Tt}" class="gauge" preserveAspectRatio="xMidYMid meet">
        <defs>
          ${m.map(l=>Q`<path id=${l.id} d=${l.d} fill="none"></path>`)}
          <clipPath id="ring-clip">
            <circle cx=${A} cy=${A} r=${$}></circle>
          </clipPath>
        </defs>

        ${d.map(l=>Q`<path class="ring" d=${l}></path>`)}

        <circle class="comfort-zone" cx=${A} cy=${A} r=${t}></circle>

        <g class="trail" clip-path="url(#ring-clip)">
          ${a.map(l=>Q`<path d=${l.d} fill-opacity=${l.opacity}></path>`)}
        </g>

        <circle class="dot" cx=${i} cy=${r} r=${_e}></circle>

        ${m.map(l=>Q`
            <text class="arc-label" dy="0.35em">
              <textPath href=${`#${l.id}`} startOffset="50%" text-anchor="middle">
                ${l.label}
              </textPath>
            </text>
          `)}
      </svg>
    `}render(){var _,y,M;if(!this._config||!this.hass)return h;let t=this._temperatureEntity,i=this._humidityEntity,r=t?this.hass.states[t]:void 0,a=i?this.hass.states[i]:void 0,o=(y=(_=this.hass.themes)==null?void 0:_.darkMode)!=null?y:!1;if(!r||!a||r.state==="unavailable"||a.state==="unavailable")return R`
        <ha-card>
          <div class="unavailable">
            <ha-icon icon="mdi:thermometer-off"></ha-icon>
            <span>${this._name}: sensors unavailable</span>
          </div>
        </ha-card>
      `;let c=parseFloat(r.state),s=parseFloat(a.state),{temp:u,humidity:d}=this._ranges,m=ue(c,s,u,d),l=m.state,p={...mt[l],...((M=this._config.colors)==null?void 0:M[l])||{}},f=o?p.dark:p.light,b=Math.max(12,m.innerRadiusRatio*$),v=A+m.dotX*ht,g=A+m.dotY*ht;return R`
      <ha-card
        style="background: ${f}"
        data-layout=${this._layout}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @pointerleave=${this._onPointerCancel}
      >
        <div class="header">
          <div class="name">${this._name}</div>
          <div class="state">${dt[l]}</div>
        </div>

        <div class="gauge-wrap">
          ${this._renderGauge(b,v,g,this._buildTrail({x:m.dotX,y:m.dotY}))}
        </div>

        <div class="values">
          <div class="value">
            <ha-icon .icon=${re}></ha-icon>
            <span>${Ve(c,1)}°</span>
          </div>
          <div class="value">
            <ha-icon .icon=${ne}></ha-icon>
            <span>${Math.round(s)}%</span>
          </div>
        </div>
      </ha-card>
    `}};E.styles=G`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      container-type: inline-size;
      container-name: comfort-card;
      display: grid;
      height: 100%;
      box-sizing: border-box;
      padding: 16px 18px;
      gap: 8px;
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
      grid-area: header;
      min-width: 0;
    }

    .gauge-wrap {
      grid-area: gauge;
      /* Sized from width with an aspect ratio so it has an intrinsic height in
         auto-height mode; max-height then clamps it when the grid does supply
         a definite height. The SVG's preserveAspectRatio keeps the gauge round
         and centred if that clamp makes the box non-square. */
      aspect-ratio: 1;
      max-height: 100%;
      justify-self: center;
      align-self: center;
      min-height: 0;
    }

    .gauge {
      display: block;
      width: 100%;
      height: 100%;
    }

    .values {
      grid-area: values;
      min-width: 0;
    }

    .name {
      font-weight: 700;
      line-height: 1.2;
      font-size: clamp(15px, 7cqi, 26px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      font-weight: 700;
      line-height: 1.2;
      font-size: clamp(13px, 6cqi, 22px);
      color: rgba(255, 255, 255, 0.65);
      white-space: nowrap;
    }

    .value {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 700;
      line-height: 1.1;
      font-size: clamp(17px, 8cqi, 30px);
      white-space: nowrap;
    }

    .value ha-icon {
      --mdc-icon-size: 1em;
      color: rgba(255, 255, 255, 0.7);
      flex-shrink: 0;
    }

    .ring {
      fill: none;
      stroke: white;
      stroke-width: 2.2;
      stroke-linecap: round;
    }

    .comfort-zone {
      fill: rgba(255, 255, 255, 0.22);
    }

    /* Fill only. A hairline stroke to hide the anti-aliased seam backfires:
       bands are wider than they are long, so their shared edges are long and
       frequent, and the doubled stroke draws them as radial streaks. */
    .trail path {
      fill: white;
      stroke: none;
    }

    .dot {
      fill: white;
    }

    .arc-label {
      fill: white;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    /* Wide and short: text stacks down the left, gauge fills the right. */
    ha-card[data-layout="horizontal"] {
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        "header gauge"
        "values gauge";
      column-gap: 12px;
    }

    ha-card[data-layout="horizontal"] .header {
      align-self: start;
    }

    ha-card[data-layout="horizontal"] .values {
      align-self: end;
    }

    ha-card[data-layout="horizontal"] .gauge-wrap {
      width: 46cqi;
    }

    ha-card[data-layout="square"],
    ha-card[data-layout="vertical"] {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      grid-template-areas:
        "header"
        "gauge"
        "values";
    }

    ha-card[data-layout="square"] .gauge-wrap,
    ha-card[data-layout="vertical"] .gauge-wrap {
      width: 100%;
    }

    /* Square: name and state share the top row. */
    ha-card[data-layout="square"] .header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }

    ha-card[data-layout="square"] .values,
    ha-card[data-layout="vertical"] .values {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }
  `,x([z({attribute:!1})],E.prototype,"hass",2),x([q()],E.prototype,"_config",2),x([q()],E.prototype,"_layout",2),x([q()],E.prototype,"_trailPoints",2),E=x([at("comfort-card")],E);export{E as ComfortCard};
