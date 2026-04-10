import { _I, _xe, AI, are, Ba, bve, CI, Cx, Dy, e8, Ec, EI, Fd, GA, Gd, Gu, hqe, i_, i5, J5, Jd, K5, kI, Ki, LI, M1e, MI, n5, PI, Rf, SI, SS, Sxe, T_, TI, UA, UC, uv, VA, vve, vy, X5, xI, xN, yve, Z5 } from "./chunk-002.js"
import { an, bit, es, get, int, not, set, t1, To } from "./chunk-005.js"
import { as, Bve, cu, cv, cxe, fH, gl, h0, id, Iy, La, lxe, M1, out, pxe, rr, w1, x0, x1, x3, Xo, y, y0, y1, y3 } from "../index.js"
import { on } from "./chunk-004.js"
import { cc, Cl, co, DA, Ea, er, fI, fn, Fo, gm, hI, il, Jg, Jh, la, LA, Ma, mI, mS, Ms, OA, of, Oy, pI, pS, Qa, QE, Qh, qr, Qy, r0, sf, sh, t_, vN, Vr, Y5, Zd, Zg, zn } from "./chunk-001.js"
import { br, the, Un } from "./chunk-015.js"
import { See, xy, zw } from "./chunk-000.js"
import { but, cut, dot, got, Out, use, Use } from "./chunk-006.js"
import { hue, R8, w3 } from "./chunk-013.js"
import { Awe, dn, nX, ove, px, Rc, RY, tx, tX, ty, vX } from "../vendor/pixi/chunk-000.js"
import { _x } from "./chunk-009.js"
import { _y, CW } from "./chunk-016.js"
import { hi } from "./chunk-014.js"
import { by } from "../vendor/posthog/chunk-000.js"
import { we } from "./chunk-011.js"
const YVe=1,XVe={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},cY=class eH{constructor(e){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=e,this.rootBoundary=new M1e(null),vy.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new Rf(null),this._rootWheelEvent=new i_(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy({...eH.defaultEventFeatures},{set:(n,r,i)=>(r==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=i),n[r]=i,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(e){const{canvas:n,resolution:r}=this.renderer;this.setTargetElement(n),this.resolution=r,eH._defaultEventMode=e.eventMode??"passive",Object.assign(this.features,e.eventFeatures??{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(e){this.resolution=e}destroy(){this.setTargetElement(null),this.renderer=null,this._currentCursor=null}setCursor(e){e||(e="default");let n=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(n=!1),this._currentCursor===e)return;this._currentCursor=e;const r=this.cursorStyles[e];if(r)switch(typeof r){case"string":n&&(this.domElement.style.cursor=r);break;case"function":r(e);break;case"object":n&&Object.assign(this.domElement.style,r);break}else n&&typeof e=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,e)&&(this.domElement.style.cursor=e)}get pointer(){return this._rootPointerEvent}_onPointerDown(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const n=this._normalizeToPointerData(e);this.autoPreventDefault&&n[0].isNormalized&&(e.cancelable||!("cancelable"in e))&&e.preventDefault();for(let r=0,i=n.length;r<i;r++){const o=n[r],s=this._bootstrapEvent(this._rootPointerEvent,o);this.rootBoundary.mapEvent(s)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(e){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,vy.pointerMoved();const n=this._normalizeToPointerData(e);for(let r=0,i=n.length;r<i;r++){const o=this._bootstrapEvent(this._rootPointerEvent,n[r]);this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let n=e.target;e.composedPath&&e.composedPath().length>0&&(n=e.composedPath()[0]);const r=n!==this.domElement?"outside":"",i=this._normalizeToPointerData(e);for(let o=0,s=i.length;o<s;o++){const a=this._bootstrapEvent(this._rootPointerEvent,i[o]);a.type+=r,this.rootBoundary.mapEvent(a)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const n=this._normalizeToPointerData(e);for(let r=0,i=n.length;r<i;r++){const o=this._bootstrapEvent(this._rootPointerEvent,n[r]);this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}onWheel(e){if(!this.features.wheel)return;const n=this.normalizeWheelEvent(e);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(n)}setTargetElement(e){this._removeEvents(),this.domElement=e,vy.domElement=e,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;vy.addTickerListener();const e=this.domElement.style;e&&(globalThis.navigator.msPointerEnabled?(e.msContentZooming="none",e.msTouchAction="none"):this.supportsPointerEvents&&(e.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;vy.removeTickerListener();const e=this.domElement.style;e&&(globalThis.navigator.msPointerEnabled?(e.msContentZooming="",e.msTouchAction=""):this.supportsPointerEvents&&(e.touchAction="")),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(e,n,r){const i=this.domElement.isConnected?this.domElement.getBoundingClientRect():{width:this.domElement.width,height:this.domElement.height,left:0,top:0},o=1/this.resolution;e.x=(n-i.left)*(this.domElement.width/i.width)*o,e.y=(r-i.top)*(this.domElement.height/i.height)*o}_normalizeToPointerData(e){const n=[];if(this.supportsTouchEvents&&e instanceof TouchEvent)for(let r=0,i=e.changedTouches.length;r<i;r++){const o=e.changedTouches[r];typeof o.button>"u"&&(o.button=0),typeof o.buttons>"u"&&(o.buttons=1),typeof o.isPrimary>"u"&&(o.isPrimary=e.touches.length===1&&e.type==="touchstart"),typeof o.width>"u"&&(o.width=o.radiusX||1),typeof o.height>"u"&&(o.height=o.radiusY||1),typeof o.tiltX>"u"&&(o.tiltX=0),typeof o.tiltY>"u"&&(o.tiltY=0),typeof o.pointerType>"u"&&(o.pointerType="touch"),typeof o.pointerId>"u"&&(o.pointerId=o.identifier||0),typeof o.pressure>"u"&&(o.pressure=o.force||.5),typeof o.twist>"u"&&(o.twist=0),typeof o.tangentialPressure>"u"&&(o.tangentialPressure=0),typeof o.layerX>"u"&&(o.layerX=o.offsetX=o.clientX),typeof o.layerY>"u"&&(o.layerY=o.offsetY=o.clientY),o.isNormalized=!0,o.type=e.type,n.push(o)}else if(!globalThis.MouseEvent||e instanceof MouseEvent&&(!this.supportsPointerEvents||!(e instanceof globalThis.PointerEvent))){const r=e;typeof r.isPrimary>"u"&&(r.isPrimary=!0),typeof r.width>"u"&&(r.width=1),typeof r.height>"u"&&(r.height=1),typeof r.tiltX>"u"&&(r.tiltX=0),typeof r.tiltY>"u"&&(r.tiltY=0),typeof r.pointerType>"u"&&(r.pointerType="mouse"),typeof r.pointerId>"u"&&(r.pointerId=YVe),typeof r.pressure>"u"&&(r.pressure=.5),typeof r.twist>"u"&&(r.twist=0),typeof r.tangentialPressure>"u"&&(r.tangentialPressure=0),r.isNormalized=!0,n.push(r)}else n.push(e);return n}normalizeWheelEvent(e){const n=this._rootWheelEvent;return this._transferMouseData(n,e),n.deltaX=e.deltaX,n.deltaY=e.deltaY,n.deltaZ=e.deltaZ,n.deltaMode=e.deltaMode,this.mapPositionToPoint(n.screen,e.clientX,e.clientY),n.global.copyFrom(n.screen),n.offset.copyFrom(n.screen),n.nativeEvent=e,n.type=e.type,n}_bootstrapEvent(e,n){return e.originalEvent=null,e.nativeEvent=n,e.pointerId=n.pointerId,e.width=n.width,e.height=n.height,e.isPrimary=n.isPrimary,e.pointerType=n.pointerType,e.pressure=n.pressure,e.tangentialPressure=n.tangentialPressure,e.tiltX=n.tiltX,e.tiltY=n.tiltY,e.twist=n.twist,this._transferMouseData(e,n),this.mapPositionToPoint(e.screen,n.clientX,n.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.isTrusted=n.isTrusted,e.type==="pointerleave"&&(e.type="pointerout"),e.type.startsWith("mouse")&&(e.type=e.type.replace("mouse","pointer")),e.type.startsWith("touch")&&(e.type=XVe[e.type]||e.type),e}_transferMouseData(e,n){e.isTrusted=n.isTrusted,e.srcElement=n.srcElement,e.timeStamp=performance.now(),e.type=n.type,e.altKey=n.altKey,e.button=n.button,e.buttons=n.buttons,e.client.x=n.clientX,e.client.y=n.clientY,e.ctrlKey=n.ctrlKey,e.metaKey=n.metaKey,e.movement.x=n.movementX,e.movement.y=n.movementY,e.page.x=n.pageX,e.page.y=n.pageY,e.relatedTarget=null,e.shiftKey=n.shiftKey}};
let P1e=cY;
const KVe={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(t){this.eventMode=t?"static":"passive"},_internalEventMode:void 0,get eventMode(){return this._internalEventMode??P1e.defaultEventMode},set eventMode(t){this._internalEventMode=t},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(t,e,n){const r=typeof n=="boolean"&&n||typeof n=="object"&&n.capture,i=typeof n=="object"?n.signal:void 0,o=typeof n=="object"?n.once===!0:!1,s=typeof e=="function"?void 0:e;t=r?`${t}capture`:t;const a=typeof e=="function"?e:e.handleEvent,l=this;i&&i.addEventListener("abort",()=>{l.off(t,a,s)}),o?l.once(t,a,s):l.on(t,a,s)},removeEventListener(t,e,n){const r=typeof n=="boolean"&&n||typeof n=="object"&&n.capture,i=typeof e=="function"?void 0:e;t=r?`${t}capture`:t,e=typeof e=="function"?e:e.handleEvent,this.off(t,e,i)},dispatchEvent(t){if(!(t instanceof Y5))throw new Error("Container cannot propagate events outside of the Federated Events API");return t.defaultPrevented=!1,t.path=null,t.target=this,t.manager.dispatchEvent(t),!t.defaultPrevented}};
var RI=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,N1e=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,tH=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct AlphaUniforms {
  uAlpha:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> alphaUniforms : AlphaUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
 
    var sample = textureSample(uTexture, uSampler, uv);
    
    return sample * alphaUniforms.uAlpha;
}`;
const R1e=class I1e extends Qy{constructor(e){e={...I1e.defaultOptions,...e};const n=sh.from({vertex:{source:tH,entryPoint:"mainVertex"},fragment:{source:tH,entryPoint:"mainFragment"}}),r=of.from({vertex:RI,fragment:N1e,name:"alpha-filter"}),{alpha:i,...o}=e,s=new il({uAlpha:{value:i,type:"f32"}});super({...o,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};
let ZVe=R1e;
const uY={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},JVe=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uTexture;","out vec4 finalColor;","void main(void)","{","    finalColor = vec4(0.0);","    %blur%","}"].join(`
`);
function O1e(t){const e=uY[t],n=e.length;let r=JVe,i="";const o="finalColor += texture(uTexture, vBlurTexCoords[%index%]) * %value%;";let s;for(let a=0;a<t;a++){let l=o.replace("%index%",a.toString());s=a,a>=n&&(s=t-a-1),l=l.replace("%value%",e[s].toString()),i+=l,i+=`
`}return r=r.replace("%blur%",i),r=r.replace("%size%",t.toString()),r}
const QVe=`
    in vec2 aPosition;

    uniform float uStrength;

    out vec2 vBlurTexCoords[%size%];

    uniform vec4 uInputSize;
    uniform vec4 uOutputFrame;
    uniform vec4 uOutputTexture;

    vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

    vec2 filterTextureCoord( void )
    {
        return aPosition * (uOutputFrame.zw * uInputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        float pixelStrength = uInputSize.%dimension% * uStrength;

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;
function D1e(t,e){const n=Math.ceil(t/2);let r=QVe,i="",o;e?o="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":o="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let s=0;s<t;s++){let a=o.replace("%index%",s.toString());a=a.replace("%sampleIndex%",`${s-(n-1)}.0`),i+=a,i+=`
`}return r=r.replace("%blur%",i),r=r.replace("%size%",t.toString()),r=r.replace("%dimension%",e?"z":"w"),r}
function L1e(t,e){const n=D1e(e,t),r=O1e(e);return of.from({vertex:n,fragment:r,name:`blur-${t?"horizontal":"vertical"}-pass-filter`})}
var B1e=`

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct BlurUniforms {
  uStrength:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    %blur-struct%
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}


@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {

  let filteredCord = filterTextureCoord(aPosition);

  let pixelStrength = gfu.uInputSize.%dimension% * blurUniforms.uStrength;

  return VSOutput(
   filterVertexPosition(aPosition),
    %blur-vertex-out%
  );
}

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  %blur-fragment-in%
) -> @location(0) vec4<f32> {

    var   finalColor = vec4(0.0);

    %blur-sampling%

    return finalColor;
}`;
function F1e(t,e){const n=uY[e],r=n.length,i=[],o=[],s=[];for(let d=0;d<e;d++){i[d]=`@location(${d}) offset${d}: vec2<f32>,`,t?o[d]=`filteredCord + vec2(${d-r+1} * pixelStrength, 0.0),`:o[d]=`filteredCord + vec2(0.0, ${d-r+1} * pixelStrength),`;const h=d<r?d:e-d-1,p=n[h].toString();s[d]=`finalColor += textureSample(uTexture, uSampler, offset${d}) * ${p};`}const a=i.join(`
`),l=o.join(`
`),c=s.join(`
`),u=B1e.replace("%blur-struct%",a).replace("%blur-vertex-out%",l).replace("%blur-fragment-in%",a).replace("%blur-sampling%",c).replace("%dimension%",t?"z":"w");return sh.from({vertex:{source:u,entryPoint:"mainVertex"},fragment:{source:u,entryPoint:"mainFragment"}})}
const j1e=class z1e extends Qy{constructor(e){e={...z1e.defaultOptions,...e};const n=L1e(e.horizontal,e.kernelSize),r=F1e(e.horizontal,e.kernelSize);super({glProgram:n,gpuProgram:r,resources:{blurUniforms:{uStrength:{value:0,type:"f32"}}},...e}),this.horizontal=e.horizontal,this._quality=0,this.quality=e.quality,this.blur=e.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(e,n,r,i){if(this._uniforms.uStrength=this.strength/this.passes,this.passes===1)e.applyFilter(this,n,r,i);else{const o=Qa.getSameSizeTexture(n);let s=n,a=o;this._state.blend=!1;const l=e.renderer.type===Zd.WEBGPU;for(let c=0;c<this.passes-1;c++){e.applyFilter(this,s,a,c===0?!0:l);const u=a;a=s,s=u}this._state.blend=!0,e.applyFilter(this,s,r,i),Qa.returnTexture(o)}}get blur(){return this.strength}set blur(e){this.padding=1+Math.abs(e)*2,this.strength=e}get quality(){return this._quality}set quality(e){this._quality=e,this.passes=e}};
let Q9=j1e;
class U1e extends Qy{constructor(...e){let n=e[0]??{};typeof n=="number"&&(zn(Vr,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.resolution=e[2]||"inherit"),e[3]!==void 0&&(n.kernelSize=e[3])),n={...Q9.defaultOptions,...n};const{strength:r,strengthX:i,strengthY:o,quality:s,...a}=n;super({...a,compatibleRenderers:Zd.BOTH,resources:{}}),this._repeatEdgePixels=!1,this.blurXFilter=new Q9({horizontal:!0,...n}),this.blurYFilter=new Q9({horizontal:!1,...n}),this.quality=s,this.strengthX=i??r,this.strengthY=o??r,this.repeatEdgePixels=!1}apply(e,n,r,i){const o=Math.abs(this.blurXFilter.strength),s=Math.abs(this.blurYFilter.strength);if(o&&s){const a=Qa.getSameSizeTexture(n);this.blurXFilter.blendMode="normal",this.blurXFilter.apply(e,n,a,!0),this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(e,a,r,i),Qa.returnTexture(a)}else s?(this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(e,n,r,i)):(this.blurXFilter.blendMode=this.blendMode,this.blurXFilter.apply(e,n,r,i))}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get strength(){if(this.strengthX!==this.strengthY)throw new Error("BlurFilter's strengthX and strengthY are different");return this.strengthX}set strength(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get strengthX(){return this.blurXFilter.blur}set strengthX(e){this.blurXFilter.blur=e,this.updatePadding()}get strengthY(){return this.blurYFilter.blur}set strengthY(e){this.blurYFilter.blur=e,this.updatePadding()}get blur(){return zn("8.3.0","BlurFilter.blur is deprecated, please use BlurFilter.strength instead."),this.strength}set blur(e){zn("8.3.0","BlurFilter.blur is deprecated, please use BlurFilter.strength instead."),this.strength=e}get blurX(){return zn("8.3.0","BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."),this.strengthX}set blurX(e){zn("8.3.0","BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."),this.strengthX=e}get blurY(){return zn("8.3.0","BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."),this.strengthY}set blurY(e){zn("8.3.0","BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."),this.strengthY=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}}
var G1e=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uColorMatrix[20];
uniform float uAlpha;

uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;

    if (uAlpha == 0.0) {
        finalColor = color;
        return;
    }

    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    vec4 result;

    result.r = (uColorMatrix[0] * color.r);
        result.r += (uColorMatrix[1] * color.g);
        result.r += (uColorMatrix[2] * color.b);
        result.r += (uColorMatrix[3] * color.a);
        result.r += uColorMatrix[4];

    result.g = (uColorMatrix[5] * color.r);
        result.g += (uColorMatrix[6] * color.g);
        result.g += (uColorMatrix[7] * color.b);
        result.g += (uColorMatrix[8] * color.a);
        result.g += uColorMatrix[9];

    result.b = (uColorMatrix[10] * color.r);
       result.b += (uColorMatrix[11] * color.g);
       result.b += (uColorMatrix[12] * color.b);
       result.b += (uColorMatrix[13] * color.a);
       result.b += uColorMatrix[14];

    result.a = (uColorMatrix[15] * color.r);
       result.a += (uColorMatrix[16] * color.g);
       result.a += (uColorMatrix[17] * color.b);
       result.a += (uColorMatrix[18] * color.a);
       result.a += uColorMatrix[19];

    vec3 rgb = mix(color.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    finalColor = vec4(rgb, result.a);
}
`,nH=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(1) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
  };
  
fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {


  var c = textureSample(uTexture, uSampler, uv);
  
  if (colorMatrixUniforms.uAlpha == 0.0) {
    return c;
  }

 
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.r /= c.a;
      c.g /= c.a;
      c.b /= c.a;
    }

    var cm = colorMatrixUniforms.uColorMatrix;


    var result = vec4<f32>(0.);

    result.r = (cm[0][0] * c.r);
    result.r += (cm[0][1] * c.g);
    result.r += (cm[0][2] * c.b);
    result.r += (cm[0][3] * c.a);
    result.r += cm[1][0];

    result.g = (cm[1][1] * c.r);
    result.g += (cm[1][2] * c.g);
    result.g += (cm[1][3] * c.b);
    result.g += (cm[2][0] * c.a);
    result.g += cm[2][1];

    result.b = (cm[2][2] * c.r);
    result.b += (cm[2][3] * c.g);
    result.b += (cm[3][0] * c.b);
    result.b += (cm[3][1] * c.a);
    result.b += cm[3][2];

    result.a = (cm[3][3] * c.r);
    result.a += (cm[4][0] * c.g);
    result.a += (cm[4][1] * c.b);
    result.a += (cm[4][2] * c.a);
    result.a += cm[4][3];

    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);

    rgb.r *= result.a;
    rgb.g *= result.a;
    rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;
class eqe extends Qy{constructor(e={}){const n=new il({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),r=sh.from({vertex:{source:nH,entryPoint:"mainVertex"},fragment:{source:nH,entryPoint:"mainFragment"}}),i=of.from({vertex:RI,fragment:G1e,name:"color-matrix-filter"});super({...e,gpuProgram:r,glProgram:i,resources:{colorMatrixUniforms:n}}),this.alpha=1}_loadMatrix(e,n=!1){let r=e;n&&(this._multiply(r,this.matrix,e),r=this._colorMatrix(r)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=r,this.resources.colorMatrixUniforms.update()}_multiply(e,n,r){return e[0]=n[0]*r[0]+n[1]*r[5]+n[2]*r[10]+n[3]*r[15],e[1]=n[0]*r[1]+n[1]*r[6]+n[2]*r[11]+n[3]*r[16],e[2]=n[0]*r[2]+n[1]*r[7]+n[2]*r[12]+n[3]*r[17],e[3]=n[0]*r[3]+n[1]*r[8]+n[2]*r[13]+n[3]*r[18],e[4]=n[0]*r[4]+n[1]*r[9]+n[2]*r[14]+n[3]*r[19]+n[4],e[5]=n[5]*r[0]+n[6]*r[5]+n[7]*r[10]+n[8]*r[15],e[6]=n[5]*r[1]+n[6]*r[6]+n[7]*r[11]+n[8]*r[16],e[7]=n[5]*r[2]+n[6]*r[7]+n[7]*r[12]+n[8]*r[17],e[8]=n[5]*r[3]+n[6]*r[8]+n[7]*r[13]+n[8]*r[18],e[9]=n[5]*r[4]+n[6]*r[9]+n[7]*r[14]+n[8]*r[19]+n[9],e[10]=n[10]*r[0]+n[11]*r[5]+n[12]*r[10]+n[13]*r[15],e[11]=n[10]*r[1]+n[11]*r[6]+n[12]*r[11]+n[13]*r[16],e[12]=n[10]*r[2]+n[11]*r[7]+n[12]*r[12]+n[13]*r[17],e[13]=n[10]*r[3]+n[11]*r[8]+n[12]*r[13]+n[13]*r[18],e[14]=n[10]*r[4]+n[11]*r[9]+n[12]*r[14]+n[13]*r[19]+n[14],e[15]=n[15]*r[0]+n[16]*r[5]+n[17]*r[10]+n[18]*r[15],e[16]=n[15]*r[1]+n[16]*r[6]+n[17]*r[11]+n[18]*r[16],e[17]=n[15]*r[2]+n[16]*r[7]+n[17]*r[12]+n[18]*r[17],e[18]=n[15]*r[3]+n[16]*r[8]+n[17]*r[13]+n[18]*r[18],e[19]=n[15]*r[4]+n[16]*r[9]+n[17]*r[14]+n[18]*r[19]+n[19],e}_colorMatrix(e){const n=new Float32Array(e);return n[4]/=255,n[9]/=255,n[14]/=255,n[19]/=255,n}brightness(e,n){const r=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(r,n)}tint(e,n){const[r,i,o]=co.shared.setValue(e).toArray(),s=[r,0,0,0,0,0,i,0,0,0,0,0,o,0,0,0,0,0,1,0];this._loadMatrix(s,n)}greyscale(e,n){const r=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(r,n)}grayscale(e,n){this.greyscale(e,n)}blackAndWhite(e){const n=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(n,e)}hue(e,n){e=(e||0)/180*Math.PI;const r=Math.cos(e),i=Math.sin(e),o=Math.sqrt,s=1/3,a=o(s),l=r+(1-r)*s,c=s*(1-r)-a*i,u=s*(1-r)+a*i,d=s*(1-r)+a*i,h=r+s*(1-r),p=s*(1-r)-a*i,g=s*(1-r)-a*i,b=s*(1-r)+a*i,v=r+s*(1-r),w=[l,c,u,0,0,d,h,p,0,0,g,b,v,0,0,0,0,0,1,0];this._loadMatrix(w,n)}contrast(e,n){const r=(e||0)+1,i=-.5*(r-1),o=[r,0,0,0,i,0,r,0,0,i,0,0,r,0,i,0,0,0,1,0];this._loadMatrix(o,n)}saturate(e=0,n){const r=e*2/3+1,i=(r-1)*-.5,o=[r,i,i,0,0,i,r,i,0,0,i,i,r,0,0,0,0,0,1,0];this._loadMatrix(o,n)}desaturate(){this.saturate(-1)}negative(e){const n=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(n,e)}sepia(e){const n=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(n,e)}technicolor(e){const n=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(n,e)}polaroid(e){const n=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(n,e)}toBGR(e){const n=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(n,e)}kodachrome(e){const n=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(n,e)}browni(e){const n=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(n,e)}vintage(e){const n=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(n,e)}colorTone(e,n,r,i,o){e||(e=.2),n||(n=.15),r||(r=16770432),i||(i=3375104);const s=co.shared,[a,l,c]=s.setValue(r).toArray(),[u,d,h]=s.setValue(i).toArray(),p=[.3,.59,.11,0,0,a,l,c,e,0,u,d,h,n,0,a-u,l-d,c-h,0,0];this._loadMatrix(p,o)}night(e,n){e||(e=.1);const r=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(r,n)}predator(e,n){const r=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(r,n)}lsd(e){const n=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(n,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}
var H1e=`
in vec2 vTextureCoord;
in vec2 vFilterUv;

out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;

uniform vec4 uInputClamp;
uniform highp vec4 uInputSize;
uniform mat2 uRotation;
uniform vec2 uScale;

void main()
{
    vec4 map = texture(uMapTexture, vFilterUv);
    
    vec2 offset = uInputSize.zw * (uRotation * (map.xy - 0.5)) * uScale; 

    finalColor = texture(uTexture, clamp(vTextureCoord + offset, uInputClamp.xy, uInputClamp.zw));
}
`,V1e=`in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vFilterUv;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

uniform mat3 uFilterMatrix;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( void )
{
  return ( uFilterMatrix * vec3( filterTextureCoord(), 1.0)  ).xy;
}


void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    vFilterUv = getFilterCoord();
}
`,rH=`
struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct DisplacementUniforms {
  uFilterMatrix:mat3x3<f32>,
  uScale:vec2<f32>,
  uRotation:mat2x2<f32>
};



@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : DisplacementUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;
@group(1) @binding(2) var uMapSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{

  
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var map = textureSample(uMapTexture, uMapSampler, filterUv);

    var offset =  gfu.uInputSize.zw * (filterUniforms.uRotation * (map.xy - 0.5)) * filterUniforms.uScale; 
   
    return textureSample(uTexture, uSampler, clamp(uv + offset, gfu.uInputClamp.xy, gfu.uInputClamp.zw));
}`;
class tqe extends Qy{constructor(...e){let n=e[0];n instanceof Iy&&(e[1]&&zn(Vr,"DisplacementFilter now uses options object instead of params. {sprite, scale}"),n={sprite:n,scale:e[1]});const{sprite:r,scale:i,...o}=n;let s=i??20;typeof s=="number"&&(s=new rr(s,s));const a=new il({uFilterMatrix:{value:new dn,type:"mat3x3<f32>"},uScale:{value:s,type:"vec2<f32>"},uRotation:{value:new Float32Array([0,0,0,0]),type:"mat2x2<f32>"}}),l=of.from({vertex:V1e,fragment:H1e,name:"displacement-filter"}),c=sh.from({vertex:{source:rH,entryPoint:"mainVertex"},fragment:{source:rH,entryPoint:"mainFragment"}}),u=r.texture.source;super({...o,gpuProgram:c,glProgram:l,resources:{filterUniforms:a,uMapTexture:u,uMapSampler:u.style}}),this._sprite=n.sprite,this._sprite.renderable=!1}apply(e,n,r,i){const o=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(o.uFilterMatrix,this._sprite);const s=this._sprite.worldTransform,a=Math.sqrt(s.a*s.a+s.b*s.b),l=Math.sqrt(s.c*s.c+s.d*s.d);a!==0&&l!==0&&(o.uRotation[0]=s.a/a,o.uRotation[1]=s.b/a,o.uRotation[2]=s.c/l,o.uRotation[3]=s.d/l),this.resources.uMapTexture=this._sprite.texture.source,e.applyFilter(this,n,r,i)}get scale(){return this.resources.filterUniforms.uniforms.uScale}}
var q1e=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) *  uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    finalColor = color;
}
`,iH=`

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct NoiseUniforms {
  uNoise:f32,
  uSeed:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> noiseUniforms : NoiseUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

fn rand(co:vec2<f32>) -> f32
{
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}



@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var pixelPosition =  globalTextureCoord(position.xy);// / (getSize());//-  gfu.uOutputFrame.xy);
  
    
    var sample = textureSample(uTexture, uSampler, uv);
    var randomValue =  rand(pixelPosition.xy * noiseUniforms.uSeed);
    var diff = (randomValue - 0.5) * noiseUniforms.uNoise;
  
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (sample.a > 0.0) {
      sample.r /= sample.a;
      sample.g /= sample.a;
      sample.b /= sample.a;
    }

    sample.r += diff;
    sample.g += diff;
    sample.b += diff;

    // Premultiply alpha again.
    sample.r *= sample.a;
    sample.g *= sample.a;
    sample.b *= sample.a;
    
    return sample;
}`;
const W1e=class $1e extends Qy{constructor(e={}){e={...$1e.defaultOptions,...e};const n=sh.from({vertex:{source:iH,entryPoint:"mainVertex"},fragment:{source:iH,entryPoint:"mainFragment"}}),r=of.from({vertex:RI,fragment:q1e,name:"noise-filter"}),{noise:i,seed:o,...s}=e;super({...s,gpuProgram:n,glProgram:r,resources:{noiseUniforms:new il({uNoise:{value:1,type:"f32"},uSeed:{value:1,type:"f32"}})}}),this.noise=i,this.seed=o??Math.random()}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(e){this.resources.noiseUniforms.uniforms.uNoise=e}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(e){this.resources.noiseUniforms.uniforms.uSeed=e}};
let nqe=W1e;
class Y1e{constructor(e){this._renderer=e}push(e,n,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:n,filterEffect:e})}pop(e,n,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}
function X1e(t,e){e.clear();const n=e.matrix;for(let r=0;r<t.length;r++){const i=t[r];i.globalDisplayStatus<7||(e.matrix=i.worldTransform,e.addBounds(i.bounds))}return e.matrix=n,e}
const rqe=new T_({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});
class iqe{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new Rc,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0}}}
class K1e{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new il({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Jg({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const n=this.renderer,r=e.filterEffect.filters,i=this._pushFilterData();i.skip=!1,i.filters=r,i.container=e.container,i.outputRenderSurface=n.renderTarget.renderSurface;const o=n.renderTarget.renderTarget.colorTexture.source,s=o.resolution,a=o.antialias;if(r.length===0){i.skip=!0;return}const l=i.bounds;if(this._calculateFilterArea(e,l),this._calculateFilterBounds(i,n.renderTarget.rootViewPort,a,s,1),i.skip)return;const c=this._getPreviousFilterData(),u=this._findFilterResolution(s);let d=0,h=0;c&&(d=c.bounds.minX,h=c.bounds.minY),this._calculateGlobalFrame(i,d,h,u,o.width,o.height),this._setupFilterTextures(i,l,n,c)}generateFilteredTexture({texture:e,filters:n}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=n;const i=e.source,o=i.resolution,s=i.antialias;if(n.length===0)return r.skip=!0,e;const a=r.bounds;if(a.addRect(e.frame),this._calculateFilterBounds(r,a.rectangle,s,o,0),r.skip)return e;const l=o;this._calculateGlobalFrame(r,0,0,l,i.width,i.height),r.outputRenderSurface=Qa.getOptimalTexture(a.width,a.height,r.resolution,r.antialias),r.backTexture=fn.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const h=r.outputRenderSurface;return h.source.alphaMode="premultiplied-alpha",h}pop(){const e=this.renderer,n=this._popFilterData();n.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=n,this._applyFiltersToTexture(n,!1),n.blendRequired&&Qa.returnTexture(n.backTexture),Qa.returnTexture(n.inputTexture))}getBackTexture(e,n,r){const i=e.colorTexture.source._resolution,o=Qa.getOptimalTexture(n.width,n.height,i,!1);let s=n.minX,a=n.minY;r&&(s-=r.minX,a-=r.minY),s=Math.floor(s*i),a=Math.floor(a*i);const l=Math.ceil(n.width*i),c=Math.ceil(n.height*i);return this.renderer.renderTarget.copyToTexture(e,o,{x:s,y:a},{width:l,height:c},{x:0,y:0}),o}applyFilter(e,n,r,i){const o=this.renderer,s=this._activeFilterData,l=s.outputRenderSurface===r,c=o.renderTarget.rootRenderTarget.colorTexture.source._resolution,u=this._findFilterResolution(c);let d=0,h=0;if(l){const p=this._findPreviousFilterOffset();d=p.x,h=p.y}this._updateFilterUniforms(n,r,s,d,h,u,l,i),this._setupBindGroupsAndRender(e,n,o)}calculateSpriteMatrix(e,n){const r=this._activeFilterData,i=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),o=n.worldTransform.copyTo(dn.shared),s=n.renderGroup||n.parentRenderGroup;return s&&s.cacheToLocalTransform&&o.prepend(s.cacheToLocalTransform),o.invert(),i.prepend(o),i.scale(1/n.texture.orig.width,1/n.texture.orig.height),i.translate(n.anchor.x,n.anchor.y),i}destroy(){}_setupBindGroupsAndRender(e,n,r){if(r.renderPipes.uniformBatch){const i=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(i,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(n.source,1),this._globalFilterBindGroup.setResource(n.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:rqe,shader:e,state:e._state,topology:"triangle-list"}),r.type===Zd.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,n,r,i){if(e.backTexture=fn.EMPTY,e.blendRequired){r.renderTarget.finishRenderPass();const o=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(o,n,i==null?void 0:i.bounds)}e.inputTexture=Qa.getOptimalTexture(n.width,n.height,e.resolution,e.antialias),r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:n})}_calculateGlobalFrame(e,n,r,i,o,s){const a=e.globalFrame;a.x=n*i,a.y=r*i,a.width=o*i,a.height=s*i}_updateFilterUniforms(e,n,r,i,o,s,a,l){const c=this._filterGlobalUniforms.uniforms,u=c.uOutputFrame,d=c.uInputSize,h=c.uInputPixel,p=c.uInputClamp,g=c.uGlobalFrame,b=c.uOutputTexture;a?(u[0]=r.bounds.minX-i,u[1]=r.bounds.minY-o):(u[0]=0,u[1]=0),u[2]=e.frame.width,u[3]=e.frame.height,d[0]=e.source.width,d[1]=e.source.height,d[2]=1/d[0],d[3]=1/d[1],h[0]=e.source.pixelWidth,h[1]=e.source.pixelHeight,h[2]=1/h[0],h[3]=1/h[1],p[0]=.5*h[2],p[1]=.5*h[3],p[2]=e.frame.width*d[2]-.5*h[2],p[3]=e.frame.height*d[3]-.5*h[3];const v=this.renderer.renderTarget.rootRenderTarget.colorTexture;g[0]=i*s,g[1]=o*s,g[2]=v.source.width*s,g[3]=v.source.height*s,n instanceof fn&&(n.source.resource=null);const w=this.renderer.renderTarget.getRenderTarget(n);this.renderer.renderTarget.bind(n,!!l),n instanceof fn?(b[0]=n.frame.width,b[1]=n.frame.height):(b[0]=w.width,b[1]=w.height),b[2]=w.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let n=this._filterStackIndex-1;for(;n>0&&this._filterStack[n].skip;)--n;return n>0&&this._filterStack[n].inputTexture?this._filterStack[n].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,n=0,r=this._filterStackIndex;for(;r>0;){r--;const i=this._filterStack[r];if(!i.skip){e=i.bounds.minX,n=i.bounds.minY;break}}return{x:e,y:n}}_calculateFilterArea(e,n){if(e.renderables?X1e(e.renderables,n):e.filterEffect.filterArea?(n.clear(),n.addRect(e.filterEffect.filterArea),n.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,n),e.container){const i=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;i&&n.applyMatrix(i)}}_applyFiltersToTexture(e,n){const r=e.inputTexture,i=e.bounds,o=e.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),o.length===1)o[0].apply(this,r,e.outputRenderSurface,n);else{let s=e.inputTexture;const a=Qa.getOptimalTexture(i.width,i.height,s.source._resolution,!1);let l=a,c=0;for(c=0;c<o.length-1;++c){o[c].apply(this,s,l,!0);const d=s;s=l,l=d}o[c].apply(this,s,e.outputRenderSurface,n),Qa.returnTexture(a)}}_calculateFilterBounds(e,n,r,i,o){var b;const s=this.renderer,a=e.bounds,l=e.filters;let c=1/0,u=0,d=!0,h=!1,p=!1,g=!0;for(let v=0;v<l.length;v++){const w=l[v];if(c=Math.min(c,w.resolution==="inherit"?i:w.resolution),u+=w.padding,w.antialias==="off"?d=!1:w.antialias==="inherit"&&d&&(d=r),w.clipToViewport||(g=!1),!!!(w.compatibleRenderers&s.type)){p=!1;break}if(w.blendRequired&&!(((b=s.backBuffer)==null?void 0:b.useBackBuffer)??!0)){er("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),p=!1;break}p=w.enabled||p,h||(h=w.blendRequired)}if(!p){e.skip=!0;return}if(g&&a.fitBounds(0,n.width/i,0,n.height/i),a.scale(c).ceil().scale(1/c).pad((u|0)*o),!a.isPositive){e.skip=!0;return}e.antialias=d,e.resolution=c,e.blendRequired=h}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,n=this._filterStackIndex-1;for(;n>1&&(n--,e=this._filterStack[n],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new iqe),this._filterStackIndex++,e}}
var Z1e=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;

uniform float uAlpha;
uniform vec4 uMaskClamp;
uniform float uInverse;

out vec4 finalColor;

void main(void)
{
    float clip = step(3.5,
        step(uMaskClamp.x, vMaskCoord.x) +
        step(uMaskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, uMaskClamp.z) +
        step(vMaskCoord.y, uMaskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = uAlpha;
    vec4 original = texture(uTexture, vTextureCoord);
    vec4 masky = texture(uMaskTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    float a = alphaMul * masky.r * npmAlpha * clip;

    if (uInverse == 1.0) {
        a = 1.0 - a;
    }

    finalColor = original * a;
}
`,J1e=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
uniform mat3 uFilterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
       
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`,oH=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct MaskUniforms {
  uFilterMatrix:mat3x3<f32>,
  uMaskClamp:vec4<f32>,
  uAlpha:f32,
  uInverse:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.uMaskClamp;
    var uAlpha = filterUniforms.uAlpha;

    var clip = step(3.5,
      step(maskClamp.x, filterUv.x) +
      step(maskClamp.y, filterUv.y) +
      step(filterUv.x, maskClamp.z) +
      step(filterUv.y, maskClamp.w));

    var mask = textureSample(uMaskTexture, uSampler, filterUv);
    var source = textureSample(uTexture, uSampler, uv);
    var alphaMul = 1.0 - uAlpha * (1.0 - mask.a);

    var a: f32 = alphaMul * mask.r * uAlpha * clip;

    if (filterUniforms.uInverse == 1.0) {
        a = 1.0 - a;
    }

    return source * a;
}
`;
class Q1e extends Qy{constructor(e){const{sprite:n,...r}=e,i=new x$(n.texture),o=new il({uFilterMatrix:{value:new dn,type:"mat3x3<f32>"},uMaskClamp:{value:i.uClampFrame,type:"vec4<f32>"},uAlpha:{value:1,type:"f32"},uInverse:{value:e.inverse?1:0,type:"f32"}}),s=sh.from({vertex:{source:oH,entryPoint:"mainVertex"},fragment:{source:oH,entryPoint:"mainFragment"}}),a=of.from({vertex:J1e,fragment:Z1e,name:"mask-filter"});super({...r,gpuProgram:s,glProgram:a,clipToViewport:!1,resources:{filterUniforms:o,uMaskTexture:n.texture.source}}),this.sprite=n,this._textureMatrix=i}set inverse(e){this.resources.filterUniforms.uniforms.uInverse=e?1:0}get inverse(){return this.resources.filterUniforms.uniforms.uInverse===1}apply(e,n,r,i){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.uFilterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.uMaskTexture=this.sprite.texture.source,e.applyFilter(this,n,r,i)}}
var oqe=`fn getLuminosity(c: vec3<f32>) -> f32 {
  return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
}

fn setLuminosity(c: vec3<f32>, lum: f32) -> vec3<f32> {
  let d: f32 = lum - getLuminosity(c);
  let newColor: vec3<f32> = c.rgb + vec3<f32>(d, d, d);

  // clip back into legal range
  let newLum: f32 = getLuminosity(newColor);
  let cMin: f32 = min(newColor.r, min(newColor.g, newColor.b));
  let cMax: f32 = max(newColor.r, max(newColor.g, newColor.b));

  let t1: f32 = newLum / (newLum - cMin);
  let t2: f32 = (1.0 - newLum) / (cMax - newLum);

  let finalColor = mix(vec3<f32>(newLum, newLum, newLum), newColor, select(select(1.0, t2, cMax > 1.0), t1, cMin < 0.0));

  return finalColor;
}

fn getSaturation(c: vec3<f32>) -> f32 {
  return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
}

// Set saturation if color components are sorted in ascending order.
fn setSaturationMinMidMax(cSorted: vec3<f32>, s: f32) -> vec3<f32> {
  var result: vec3<f32>;
  if (cSorted.z > cSorted.x) {
    let newY = (((cSorted.y - cSorted.x) * s) / (cSorted.z - cSorted.x));
    result = vec3<f32>(0.0, newY, s);
  } else {
    result = vec3<f32>(0.0, 0.0, 0.0);
  }
  return vec3<f32>(result.x, result.y, result.z);
}

fn setSaturation(c: vec3<f32>, s: f32) -> vec3<f32> {
    var result: vec3<f32> = c;

    if (c.r <= c.g && c.r <= c.b) {
        if (c.g <= c.b) {
            result = setSaturationMinMidMax(result, s);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.r, result.b, result.g);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.r, temp.b, temp.g);
        }
    } else if (c.g <= c.r && c.g <= c.b) {
        if (c.r <= c.b) {
            var temp: vec3<f32> = vec3<f32>(result.g, result.r, result.b);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.g, temp.r, temp.b);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.g, result.b, result.r);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.g, temp.b, temp.r);
        }
    } else {
        if (c.r <= c.g) {
            var temp: vec3<f32> = vec3<f32>(result.b, result.r, result.g);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.b, temp.r, temp.g);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.b, result.g, result.r);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.b, temp.g, temp.r);
        }
    }

    return result;
}`;
function sH(t,e,n,r,i,o,s,a){const l=s-n,c=a-r,u=i-n,d=o-r,h=t-n,p=e-r,g=l*l+c*c,b=l*u+c*d,v=l*h+c*p,w=u*u+d*d,k=u*h+d*p,A=1/(g*w-b*b),T=(w*v-b*k)*A,P=(g*k-b*v)*A;return T>=0&&P>=0&&T+P<1}
class dY{constructor(e=0,n=0,r=0,i=0,o=0,s=0){this.type="triangle",this.x=e,this.y=n,this.x2=r,this.y2=i,this.x3=o,this.y3=s}contains(e,n){const r=(this.x-this.x3)*(n-this.y3)-(this.y-this.y3)*(e-this.x3),i=(this.x2-this.x)*(n-this.y)-(this.y2-this.y)*(e-this.x);if(r<0!=i<0&&r!==0&&i!==0)return!1;const o=(this.x3-this.x2)*(n-this.y2)-(this.y3-this.y2)*(e-this.x2);return o===0||o<0==r+i<=0}strokeContains(e,n,r,i=.5){const o=r/2,s=o*o,{x:a,x2:l,x3:c,y:u,y2:d,y3:h}=this;return UC(e,n,a,u,l,h)<=s||UC(e,n,l,d,c,h)<=s||UC(e,n,c,h,a,u)<=s}clone(){return new dY(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e||(e=new Xo);const n=Math.min(this.x,this.x2,this.x3),r=Math.max(this.x,this.x2,this.x3),i=Math.min(this.y,this.y2,this.y3),o=Math.max(this.y,this.y2,this.y3);return e.x=n,e.y=i,e.width=r-n,e.height=o-i,e}}
const eve=class tve{constructor(e){this._tick=()=>{this.timeout=setTimeout(this._processQueue,0)},this._processQueue=()=>{const{queue:n}=this;let r=0;for(;n.length&&r<tve.uploadsPerFrame;){const i=n.shift();this.uploadQueueItem(i),r++}n.length?Cl.system.addOnce(this._tick,this,r0.UTILITY):this._resolve()},this.renderer=e,this.queue=[],this.resolves=[]}getQueue(){return[...this.queue]}add(e){const n=Array.isArray(e)?e:[e];for(const r of n)r instanceof la?this._addContainer(r):this.resolveQueueItem(r,this.queue);return this}_addContainer(e){this.resolveQueueItem(e,this.queue);for(const n of e.children)this._addContainer(n)}upload(e){return e&&this.add(e),new Promise(n=>{this.queue.length?(this.resolves.push(n),this.dedupeQueue(),Cl.system.addOnce(this._tick,this,r0.UTILITY)):n()})}dedupeQueue(){const e=Object.create(null);let n=0;for(let r=0;r<this.queue.length;r++){const i=this.queue[r];e[i.uid]||(e[i.uid]=!0,this.queue[n++]=i)}this.queue.length=n}_resolve(){const{resolves:e}=this,n=e.slice(0);e.length=0;for(const r of n)r()}};
let nve=eve;
class Ay extends h0{constructor(e){e instanceof Gu&&(e={context:e});const{context:n,roundPixels:r,...i}=e||{};super({label:"Graphics",...i}),this.renderPipeId="graphics",n?this._context=n:this._context=this._ownedContext=new Gu,this._context.on("update",this.onViewUpdate,this),this.didViewUpdate=!0,this.allowChildren=!1,this.roundPixels=r??!1}set context(e){e!==this._context&&(this._context.off("update",this.onViewUpdate,this),this._context=e,this._context.on("update",this.onViewUpdate,this),this.onViewUpdate())}get context(){return this._context}get bounds(){return this._context.bounds}updateBounds(){}containsPoint(e){return this._context.containsPoint(e)}destroy(e){this._ownedContext&&!e?this._ownedContext.destroy(e):(e===!0||(e==null?void 0:e.context)===!0)&&this._context.destroy(e),this._ownedContext=null,this._context=null,super.destroy(e)}_callContextMethod(e,n){return this.context[e](...n),this}setFillStyle(...e){return this._callContextMethod("setFillStyle",e)}setStrokeStyle(...e){return this._callContextMethod("setStrokeStyle",e)}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(){return this._callContextMethod("beginPath",[])}cut(){return this._callContextMethod("cut",[])}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(){return this._callContextMethod("closePath",[])}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}regularPoly(...e){return this._callContextMethod("regularPoly",e)}roundPoly(...e){return this._callContextMethod("roundPoly",e)}roundShape(...e){return this._callContextMethod("roundShape",e)}filletRect(...e){return this._callContextMethod("filletRect",e)}chamferRect(...e){return this._callContextMethod("chamferRect",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(){return this._callContextMethod("save",[])}getTransform(){return this.context.getTransform()}resetTransform(){return this._callContextMethod("resetTransform",[])}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(){return this._callContextMethod("clear",[])}get fillStyle(){return this._context.fillStyle}set fillStyle(e){this._context.fillStyle=e}get strokeStyle(){return this._context.strokeStyle}set strokeStyle(e){this._context.strokeStyle=e}clone(e=!1){return e?new Ay(this._context.clone()):(this._ownedContext=null,new Ay(this._context))}lineStyle(e,n,r){zn(Vr,"Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");const i={};return e&&(i.width=e),n&&(i.color=n),r&&(i.alpha=r),this.context.strokeStyle=i,this}beginFill(e,n){zn(Vr,"Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");const r={};return e!==void 0&&(r.color=e),n!==void 0&&(r.alpha=n),this.context.fillStyle=r,this}endFill(){zn(Vr,"Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill();const e=this.context.strokeStyle;return(e.width!==Gu.defaultStrokeStyle.width||e.color!==Gu.defaultStrokeStyle.color||e.alpha!==Gu.defaultStrokeStyle.alpha)&&this.context.stroke(),this}drawCircle(...e){return zn(Vr,"Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return zn(Vr,"Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return zn(Vr,"Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return zn(Vr,"Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return zn(Vr,"Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return zn(Vr,"Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}}
const rve=class ive extends T_{constructor(...e){let n=e[0]??{};n instanceof Float32Array&&(zn(Vr,"use new MeshGeometry({ positions, uvs, indices }) instead"),n={positions:n,uvs:e[1],indices:e[2]}),n={...ive.defaultOptions,...n};const r=n.positions||new Float32Array([0,0,1,0,1,1,0,1]);let i=n.uvs;i||(n.positions?i=new Float32Array(r.length):i=new Float32Array([0,0,1,0,1,1,0,1]));const o=n.indices||new Uint32Array([0,1,2,0,2,3]),s=n.shrinkBuffersToFit,a=new Gd({data:r,label:"attribute-mesh-positions",shrinkToFit:s,usage:Ki.VERTEX|Ki.COPY_DST}),l=new Gd({data:i,label:"attribute-mesh-uvs",shrinkToFit:s,usage:Ki.VERTEX|Ki.COPY_DST}),c=new Gd({data:o,label:"index-mesh-buffer",shrinkToFit:s,usage:Ki.INDEX|Ki.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:l,format:"float32x2",stride:8,offset:0}},indexBuffer:c,topology:n.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};
let P_=rve;
class Q5 extends h0{constructor(...e){let n=e[0];n instanceof T_&&(zn(Vr,"Mesh: use new Mesh({ geometry, shader }) instead"),n={geometry:n,shader:e[1]},e[3]&&(zn(Vr,"Mesh: drawMode argument has been removed, use geometry.topology instead"),n.geometry.topology=e[3]));const{geometry:r,shader:i,texture:o,roundPixels:s,state:a,...l}=n;super({label:"Mesh",...l}),this.renderPipeId="mesh",this._shader=null,this.allowChildren=!1,this.shader=i??null,this.texture=o??(i==null?void 0:i.texture)??fn.WHITE,this.state=a??Qh.for2d(),this._geometry=r,this._geometry.on("update",this.onViewUpdate,this),this.roundPixels=s??!1}get material(){return zn(Vr,"mesh.material property has been removed, use mesh.shader instead"),this._shader}set shader(e){this._shader!==e&&(this._shader=e,this.onViewUpdate())}get shader(){return this._shader}set geometry(e){var n;this._geometry!==e&&((n=this._geometry)==null||n.off("update",this.onViewUpdate,this),e.on("update",this.onViewUpdate,this),this._geometry=e,this.onViewUpdate())}get geometry(){return this._geometry}set texture(e){e||(e=fn.EMPTY);const n=this._texture;n!==e&&(n&&n.dynamic&&n.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this.shader&&(this.shader.texture=e),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}get batched(){return this._shader||(this.state.data&12)!==0?!1:this._geometry instanceof P_?this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch":!1}get bounds(){return this._geometry.bounds}updateBounds(){this._bounds=this._geometry.bounds}containsPoint(e){const{x:n,y:r}=e;if(!this.bounds.containsPoint(n,r))return!1;const i=this.geometry.getBuffer("aPosition").data,o=this.geometry.topology==="triangle-strip"?3:1;if(this.geometry.getIndex()){const s=this.geometry.getIndex().data,a=s.length;for(let l=0;l+2<a;l+=o){const c=s[l]*2,u=s[l+1]*2,d=s[l+2]*2;if(sH(n,r,i[c],i[c+1],i[u],i[u+1],i[d],i[d+1]))return!0}}else{const s=i.length/2;for(let a=0;a+2<s;a+=o){const l=a*2,c=(a+1)*2,u=(a+2)*2;if(sH(n,r,i[l],i[l+1],i[c],i[c+1],i[u],i[u+1]))return!0}}return!1}destroy(e){var r;if(super.destroy(e),typeof e=="boolean"?e:e==null?void 0:e.texture){const i=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(i)}(r=this._geometry)==null||r.off("update",this.onViewUpdate,this),this._texture=null,this._geometry=null,this._shader=null,this._gpuData=null}}
class WA extends Iy{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:i=!1,autoUpdate:o=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[p]=u;super({...h,texture:p instanceof fn?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=o,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,i&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Cl.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Cl.shared.add(this.update,this,r0.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,i=this.currentFrame;if(this._durations!==null){let o=this._currentTime%1*this._durations[this.currentFrame];for(o+=r/60*1e3;o<0;)this._currentTime--,o+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);o>=this._durations[this.currentFrame];)o-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=o/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):i!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<i||this.animationSpeed<0&&this.currentFrame>i)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._textures.forEach(i=>{this.texture!==i&&i.destroy(r)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(fn.from(e[r]));return new WA(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(fn.from(e[r]));return new WA(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof fn)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Cl.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Cl.shared.add(this.update,this),this._isConnectedToTicker=!0))}}
const sve=class eP extends h0{constructor(...e){let n=e[0]||{};n instanceof fn&&(n={texture:n}),e.length>1&&(zn(Vr,"use new TilingSprite({ texture, width:100, height:100 }) instead"),n.width=e[1],n.height=e[2]),n={...eP.defaultOptions,...n};const{texture:r,anchor:i,tilePosition:o,tileScale:s,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=n??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new La({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=r,this._width=l??r.width,this._height=c??r.height,this._tileTransform=new ove({observer:{_onUpdate:()=>this.onViewUpdate()}}),i&&(this.anchor=i),this.tilePosition=o,this.tileScale=s,this.tileRotation=a,this.roundPixels=d??!1}static from(e,n={}){return typeof e=="string"?new eP({texture:Fo.get(e),...n}):new eP({texture:e,...n})}get uvRespectAnchor(){return er("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){er("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=fn.EMPTY);const n=this._texture;n!==e&&(n&&n.dynamic&&n.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,n){typeof e=="object"&&(n=e.height??e.width,e=e.width),this._width=e,this._height=n??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,n=this._anchor,r=this._width,i=this._height;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}containsPoint(e){const n=this._width,r=this._height,i=-n*this._anchor._x;let o=0;return e.x>=i&&e.x<=i+n&&(o=-r*this._anchor._y,e.y>=o&&e.y<=o+r)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(r)}this._texture=null}};
let ave=sve;
class II extends h0{constructor(e,n){const{text:r,resolution:i,style:o,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=o,this.resolution=i??null,this.allowChildren=!1,this._anchor=new La({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){var n;e||(e={}),(n=this._style)==null||n.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,i=-n*this.anchor.x;let o=0;return e.x>=i&&e.x<=i+n&&(o=-r*this.anchor.y,e.y>=o&&e.y<=o+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e!=null&&e.style)&&this._style.destroy(e),this._style=null,this._text=null}}
function OI(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(zn(Vr,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}
let Ww=null,fy=null;
function sqe(t,e){Ww||(Ww=qr.get().createCanvas(256,128),fy=Ww.getContext("2d",{willReadFrequently:!0}),fy.globalCompositeOperation="copy",fy.globalAlpha=1),(Ww.width<t||Ww.height<e)&&(Ww.width=t_(t),Ww.height=t_(e))}
function fre(t,e,n){for(let r=0,i=4*n*e;r<e;++r,i+=4)if(t[i+3]!==0)return!1;return!0}
function pre(t,e,n,r,i){const o=4*e;for(let s=r,a=r*o+4*n;s<=i;++s,a+=o)if(t[a+3]!==0)return!1;return!0}
function lve(...t){let e=t[0];e.canvas||(e={canvas:t[0],resolution:t[1]});const{canvas:n}=e,r=Math.min(e.resolution??1,1),i=e.width??n.width,o=e.height??n.height;let s=e.output;if(sqe(i,o),!fy)throw new TypeError("Failed to get canvas 2D context");fy.drawImage(n,0,0,i,o,0,0,i*r,o*r);const l=fy.getImageData(0,0,i,o).data;let c=0,u=0,d=i-1,h=o-1;for(;u<o&&fre(l,i,u);)++u;if(u===o)return Xo.EMPTY;for(;fre(l,i,h);)--h;for(;pre(l,i,c,u,h);)++c;for(;pre(l,i,d,u,h);)--d;return++d,++h,fy.globalCompositeOperation="source-over",fy.strokeRect(c,u,d-c,h-u),fy.globalCompositeOperation="copy",s??(s=new Xo),s.set(c/r,u/r,(d-c)/r,(h-u)/r),s}
const mre=new Xo;
class aqe{getCanvasAndContext(e){const{text:n,style:r,resolution:i=1}=e,o=r._getFinalPadding(),s=Ec.measureText(n||" ",r),a=Math.ceil(Math.ceil(Math.max(1,s.width)+o*2)*i),l=Math.ceil(Math.ceil(Math.max(1,s.height)+o*2)*i),c=Dy.getOptimalCanvasAndContext(a,l);this._renderTextToCanvas(n,r,o,i,c);const u=r.trim?lve({canvas:c.canvas,width:a,height:l,resolution:1,output:mre}):mre.set(0,0,a,l);return{canvasAndContext:c,frame:u}}returnCanvasAndContext(e){Dy.returnCanvasAndContext(e)}_renderTextToCanvas(e,n,r,i,o){var A,T,P,R;const{canvas:s,context:a}=o,l=GA(n),c=Ec.measureText(e||" ",n),u=c.lines,d=c.lineHeight,h=c.lineWidths,p=c.maxLineWidth,g=c.fontProperties,b=s.height;if(a.resetTransform(),a.scale(i,i),a.textBaseline=n.textBaseline,(A=n._stroke)!=null&&A.width){const B=n._stroke;a.lineWidth=B.width,a.miterLimit=B.miterLimit,a.lineJoin=B.join,a.lineCap=B.cap}a.font=l;let v,w;const k=n.dropShadow?2:1;for(let B=0;B<k;++B){const j=n.dropShadow&&B===0,I=j?Math.ceil(Math.max(1,b)+r*2):0,L=I*i;if(j){a.fillStyle="black",a.strokeStyle="black";const G=n.dropShadow,K=G.color,W=G.alpha;a.shadowColor=co.shared.setValue(K).setAlpha(W).toRgbaString();const $=G.blur*i,oe=G.distance*i;a.shadowBlur=$,a.shadowOffsetX=Math.cos(G.angle)*oe,a.shadowOffsetY=Math.sin(G.angle)*oe+L}else{if(a.fillStyle=n._fill?VA(n._fill,a,c,r*2):null,(T=n._stroke)!=null&&T.width){const G=n._stroke.width*.5+r*2;a.strokeStyle=VA(n._stroke,a,c,G)}a.shadowColor="black"}let N=(d-g.fontSize)/2;d-g.fontSize<0&&(N=0);const z=((P=n._stroke)==null?void 0:P.width)??0;for(let G=0;G<u.length;G++)v=z/2,w=z/2+G*d+g.ascent+N,n.align==="right"?v+=p-h[G]:n.align==="center"&&(v+=(p-h[G])/2),(R=n._stroke)!=null&&R.width&&this._drawLetterSpacing(u[G],n,o,v+r,w+r-I,!0),n._fill!==void 0&&this._drawLetterSpacing(u[G],n,o,v+r,w+r-I)}}_drawLetterSpacing(e,n,r,i,o,s=!1){const{context:a}=r,l=n.letterSpacing;let c=!1;if(Ec.experimentalLetterSpacingSupported&&(Ec.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,c=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||c){s?a.strokeText(e,i,o):a.fillText(e,i,o);return}let u=i;const d=Ec.graphemeSegmenter(e);let h=a.measureText(e).width,p=0;for(let g=0;g<d.length;++g){const b=d[g];s?a.strokeText(b,u,o):a.fillText(b,u,o);let v="";for(let w=g+1;w<d.length;++w)v+=d[w];p=a.measureText(v).width,u+=h-p+l,h=p}}}
const _S=new aqe;
let l8=class extends II{constructor(...e){const n=OI(e,"Text");super(n,Jd),this.renderPipeId="text",n.textureStyle&&(this.textureStyle=n.textureStyle instanceof Jh?n.textureStyle:new Jh(n.textureStyle))}updateBounds(){const e=this._bounds,n=this._anchor;let r=0,i=0;if(this._style.trim){const{frame:o,canvasAndContext:s}=_S.getCanvasAndContext({text:this.text,style:this._style,resolution:1});_S.returnCanvasAndContext(s),r=o.width,i=o.height}else{const o=Ec.measureText(this._text,this._style);r=o.width,i=o.height}e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}};
class cve extends nve{resolveQueueItem(e,n){return e instanceof la?this.resolveContainerQueueItem(e,n):e instanceof Ea||e instanceof fn?n.push(e.source):e instanceof Gu&&n.push(e),null}resolveContainerQueueItem(e,n){e instanceof Iy||e instanceof ave||e instanceof Q5?n.push(e.texture.source):e instanceof l8?n.push(e):e instanceof Ay?n.push(e.context):e instanceof WA&&e.textures.forEach(r=>{r.source?n.push(r.source):n.push(r.texture.source)})}resolveGraphicsContextQueueItem(e){this.renderer.graphicsContext.getGpuContext(e);const{instructions:n}=e;for(const r of n)if(r.action==="texture"){const{image:i}=r.data;return i.source}else if(r.action==="fill"){const{texture:i}=r.data.style;return i.source}return null}}
class hY extends II{constructor(...e){var n;const r=OI(e,"BitmapText");r.style??(r.style=r.style||{}),(n=r.style).fill??(n.fill=16777215),super(r,Jd),this.renderPipeId="bitmapText"}updateBounds(){const e=this._bounds,n=this._anchor,r=i5.measureText(this.text,this._style),i=r.scale,o=r.offsetY*i;let s=r.width*i,a=r.height*i;const l=this._style._stroke;l&&(s+=l.width,a+=l.width),e.minX=-n._x*s,e.maxX=e.minX+s,e.minY=-n._y*(a+o),e.maxY=e.minY+a}set resolution(e){e!==null&&er("[BitmapText] dynamically updating the resolution is not supported. Resolution should be managed by the BitmapFont.")}get resolution(){return this._resolution}}
function uve(t){const e=t._stroke,n=t._fill,i=[`div { ${[`color: ${co.shared.setValue(n.color).toHex()}`,`font-size: ${t.fontSize}px`,`font-family: ${t.fontFamily}`,`font-weight: ${t.fontWeight}`,`font-style: ${t.fontStyle}`,`font-variant: ${t.fontVariant}`,`letter-spacing: ${t.letterSpacing}px`,`text-align: ${t.align}`,`padding: ${t.padding}px`,`white-space: ${t.whiteSpace==="pre"&&t.wordWrap?"pre-wrap":t.whiteSpace}`,...t.lineHeight?[`line-height: ${t.lineHeight}px`]:[],...t.wordWrap?[`word-wrap: ${t.breakWords?"break-all":"break-word"}`,`max-width: ${t.wordWrapWidth}px`]:[],...e?[hve(e)]:[],...t.dropShadow?[dve(t.dropShadow)]:[],...t.cssOverrides].join(";")} }`];return lqe(t.tagStyles,i),i.join(" ")}
function dve(t){const e=co.shared.setValue(t.color).setAlpha(t.alpha).toHexa(),n=Math.round(Math.cos(t.angle)*t.distance),r=Math.round(Math.sin(t.angle)*t.distance),i=`${n}px ${r}px`;return t.blur>0?`text-shadow: ${i} ${t.blur}px ${e}`:`text-shadow: ${i} ${e}`}
function hve(t){return[`-webkit-text-stroke-width: ${t.width}px`,`-webkit-text-stroke-color: ${co.shared.setValue(t.color).toHex()}`,`text-stroke-width: ${t.width}px`,`text-stroke-color: ${co.shared.setValue(t.color).toHex()}`,"paint-order: stroke"].join(";")}
const gre={fontSize:"font-size: {{VALUE}}px",fontFamily:"font-family: {{VALUE}}",fontWeight:"font-weight: {{VALUE}}",fontStyle:"font-style: {{VALUE}}",fontVariant:"font-variant: {{VALUE}}",letterSpacing:"letter-spacing: {{VALUE}}px",align:"text-align: {{VALUE}}",padding:"padding: {{VALUE}}px",whiteSpace:"white-space: {{VALUE}}",lineHeight:"line-height: {{VALUE}}px",wordWrapWidth:"max-width: {{VALUE}}px"},yre={fill:t=>`color: ${co.shared.setValue(t).toHex()}`,breakWords:t=>`word-wrap: ${t?"break-all":"break-word"}`,stroke:hve,dropShadow:dve};
function lqe(t,e){for(const n in t){const r=t[n],i=[];for(const o in r)yre[o]?i.push(yre[o](r[o])):gre[o]&&i.push(gre[o].replace("{{VALUE}}",r[o]));e.push(`${n} { ${i.join(";")} }`)}}
class DI extends Jd{constructor(e={}){super(e),this._cssOverrides=[],this.cssOverrides=e.cssOverrides??[],this.tagStyles=e.tagStyles??{}}set cssOverrides(e){this._cssOverrides=e instanceof Array?e:[e],this.update()}get cssOverrides(){return this._cssOverrides}update(){this._cssStyle=null,super.update()}clone(){return new DI({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow?{...this.dropShadow}:null,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,cssOverrides:this.cssOverrides,tagStyles:{...this.tagStyles}})}get cssStyle(){return this._cssStyle||(this._cssStyle=uve(this)),this._cssStyle}addOverride(...e){const n=e.filter(r=>!this.cssOverrides.includes(r));n.length>0&&(this.cssOverrides.push(...n),this.update())}removeOverride(...e){const n=e.filter(r=>this.cssOverrides.includes(r));n.length>0&&(this.cssOverrides=this.cssOverrides.filter(r=>!n.includes(r)),this.update())}set fill(e){typeof e!="string"&&typeof e!="number"&&er("[HTMLTextStyle] only color fill is not supported by HTMLText"),super.fill=e}set stroke(e){e&&typeof e!="string"&&typeof e!="number"&&er("[HTMLTextStyle] only color stroke is not supported by HTMLText"),super.stroke=e}}
const bre="http://www.w3.org/2000/svg",vre="http://www.w3.org/1999/xhtml";
class fY{constructor(){this.svgRoot=document.createElementNS(bre,"svg"),this.foreignObject=document.createElementNS(bre,"foreignObject"),this.domElement=document.createElementNS(vre,"div"),this.styleElement=document.createElementNS(vre,"style");const{foreignObject:e,svgRoot:n,styleElement:r,domElement:i}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",n.appendChild(e),e.appendChild(r),e.appendChild(i),this.image=qr.get().createImage()}}
let wre;
function pY(t,e,n,r){r||(r=wre||(wre=new fY));const{domElement:i,styleElement:o,svgRoot:s}=r;i.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${t}</div>`,i.setAttribute("style","transform-origin: top left; display: inline-block"),n&&(o.textContent=n),document.body.appendChild(s);const a=i.getBoundingClientRect();s.remove();const l=e.padding*2;return{width:a.width-l,height:a.height-l}}
class fve extends II{constructor(...e){const n=OI(e,"HtmlText");super(n,DI),this.renderPipeId="htmlText",n.textureStyle&&(this.textureStyle=n.textureStyle instanceof Jh?n.textureStyle:new Jh(n.textureStyle))}updateBounds(){const e=this._bounds,n=this._anchor,r=pY(this.text,this._style),{width:i,height:o}=r;e.minX=-n._x*i,e.maxX=e.minX+i,e.minY=-n._y*o,e.maxY=e.minY+o}get text(){return this._text}set text(e){const n=this._sanitiseText(e.toString());super.text=n}_sanitiseText(e){return this._removeInvalidHtmlTags(e.replace(/<br>/gi,"<br/>").replace(/<hr>/gi,"<hr/>").replace(/&nbsp;/gi,"&#160;"))}_removeInvalidHtmlTags(e){const n=/<[^>]*?(?=<|$)/g;return e.replace(n,"")}}
class pve extends cve{uploadQueueItem(e){e instanceof Ea?this.uploadTextureSource(e):e instanceof l8?this.uploadText(e):e instanceof fve?this.uploadHTMLText(e):e instanceof hY?this.uploadBitmapText(e):e instanceof Gu&&this.uploadGraphicsContext(e)}uploadTextureSource(e){this.renderer.texture.initSource(e)}uploadText(e){this.renderer.renderPipes.text.initGpuText(e)}uploadBitmapText(e){this.renderer.renderPipes.bitmapText.initGpuText(e)}uploadHTMLText(e){this.renderer.renderPipes.htmlText.initGpuText(e)}uploadGraphicsContext(e){this.renderer.graphicsContext.getGpuContext(e);const{instructions:n}=e;for(const r of n)if(r.action==="texture"){const{image:i}=r.data;this.uploadTextureSource(i.source)}else if(r.action==="fill"){const{texture:i}=r.data.style;this.uploadTextureSource(i.source)}return null}}
class mve extends pve{destroy(){clearTimeout(this.timeout),this.renderer=null,this.queue=null,this.resolves=null}}
class mY{constructor(){this._tempState=Qh.for2d(),this._didUploadHash={}}init(e){e.renderer.runners.contextChange.add(this)}contextChange(){this._didUploadHash={}}start(e,n,r){const i=e.renderer,o=this._didUploadHash[r.uid];i.shader.bind(r,o),o||(this._didUploadHash[r.uid]=!0),i.shader.updateUniformGroup(i.globalUniforms.uniformGroup),i.geometry.bind(n,r.glProgram)}execute(e,n){const r=e.renderer;this._tempState.blendMode=n.blendMode,r.state.set(this._tempState);const i=n.textures.textures;for(let o=0;o<n.textures.count;o++)r.texture.bind(i[o],o);r.geometry.draw(n.topology,n.size,n.start)}}
function cqe(t){const e=[];let n=0;for(let r=0;r<t;r++)e[n]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:n,visibility:GPUShaderStage.FRAGMENT},n++,e[n]={sampler:{type:"filtering"},binding:n,visibility:GPUShaderStage.FRAGMENT},n++;return e}
function uqe(t){const e={};let n=0;for(let r=0;r<t;r++)e[`textureSource${r+1}`]=n++,e[`textureSampler${r+1}`]=n++;return e}
const cM=Qh.for2d();
class gY{start(e,n,r){const i=e.renderer,o=i.encoder,s=r.gpuProgram;this._shader=r,this._geometry=n,o.setGeometry(n,s),cM.blendMode="normal",i.pipeline.getPipeline(n,s,cM);const a=i.globalUniforms.bindGroup;o.resetBindGroup(1),o.setBindGroup(0,a,s)}execute(e,n){const r=this._shader.gpuProgram,i=e.renderer,o=i.encoder;if(!n.bindGroup){const l=n.textures;n.bindGroup=xI(l.textures,l.count,i.limits.maxBatchableTextures)}cM.blendMode=n.blendMode;const s=i.bindGroup.getBindGroup(n.bindGroup,r,1),a=i.pipeline.getPipeline(this._geometry,r,cM,n.topology);n.bindGroup._touch(i.textureGC.count),o.setPipeline(a),o.renderPassEncoder.setBindGroup(1,s),o.renderPassEncoder.drawIndexed(n.size,1,n.start)}}
const yY=class gve{constructor(e,n){var r,i;this.state=Qh.for2d(),this._batchersByInstructionSet=Object.create(null),this._activeBatches=Object.create(null),this.renderer=e,this._adaptor=n,(i=(r=this._adaptor).init)==null||i.call(r,this)}static getBatcher(e){return new this._availableBatchers[e]}buildStart(e){let n=this._batchersByInstructionSet[e.uid];n||(n=this._batchersByInstructionSet[e.uid]=Object.create(null),n.default||(n.default=new EI({maxTextures:this.renderer.limits.maxBatchableTextures}))),this._activeBatches=n,this._activeBatch=this._activeBatches.default;for(const r in this._activeBatches)this._activeBatches[r].begin()}addToBatch(e,n){if(this._activeBatch.name!==e.batcherName){this._activeBatch.break(n);let r=this._activeBatches[e.batcherName];r||(r=this._activeBatches[e.batcherName]=gve.getBatcher(e.batcherName),r.begin()),this._activeBatch=r}this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){this._activeBatch.break(e);const n=this._activeBatches;for(const r in n){const i=n[r],o=i.geometry;o.indexBuffer.setDataWithSize(i.indexBuffer,i.indexSize,!0),o.buffers[0].setDataWithSize(i.attributeBuffer.float32View,i.attributeSize,!1)}}upload(e){const n=this._batchersByInstructionSet[e.uid];for(const r in n){const i=n[r],o=i.geometry;i.dirty&&(i.dirty=!1,o.buffers[0].update(i.attributeSize*4))}}execute(e){if(e.action==="startBatch"){const n=e.batcher,r=n.geometry,i=n.shader;this._adaptor.start(this,r,i)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor=null;for(const e in this._activeBatches)this._activeBatches[e].destroy();this._activeBatches=null}};
let bY=yY;
function dqe(t){const e=t.split(/([\n{}])/g).map(i=>i.trim()).filter(i=>i.length);let n="";return e.map(i=>{let o=n+i;return i==="{"?n+="    ":i==="}"&&(n=n.substr(0,n.length-4),o=n+i),o}).join(`
`)}
class fqe extends OA{constructor(){super(),this.filters=[new Q1e({sprite:new Iy(fn.EMPTY),inverse:!1,resolution:"inherit",antialias:"inherit"})]}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}get inverse(){return this.filters[0].inverse}set inverse(e){this.filters[0].inverse=e}}
class vY{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,n,r){const i=this._renderer;if(i.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskBegin",mask:e,inverse:n._maskOptions.inverse,canBundle:!1,maskedContainer:n}),e.inverse=n._maskOptions.inverse,e.renderMaskToTexture){const o=e.mask;o.includeInBuild=!0,o.collectRenderables(r,i,null),o.includeInBuild=!1}i.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:n,inverse:n._maskOptions.inverse,canBundle:!1})}pop(e,n,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"popMaskEnd",mask:e,inverse:n._maskOptions.inverse,canBundle:!1})}execute(e){const n=this._renderer,r=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const i=cc.get(fqe);if(i.inverse=e.inverse,r){e.mask.mask.measurable=!0;const o=QE(e.mask.mask,!0,hqe);e.mask.mask.measurable=!1,o.ceil();const s=n.renderTarget.renderTarget.colorTexture.source,a=Qa.getOptimalTexture(o.width,o.height,s._resolution,s.antialias);n.renderTarget.push(a,!0),n.globalUniforms.push({offset:o,worldColor:4294967295});const l=i.sprite;l.texture=a,l.worldTransform.tx=o.minX,l.worldTransform.ty=o.minY,this._activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer,filterTexture:a})}else i.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const i=this._activeMaskStage[this._activeMaskStage.length-1];r&&(n.type===Zd.WEBGL&&n.renderTarget.finishRenderPass(),n.renderTarget.pop(),n.globalUniforms.pop()),n.filter.push({renderPipeId:"filter",action:"pushFilter",container:i.maskedContainer,filterEffect:i.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){n.filter.pop();const i=this._activeMaskStage.pop();r&&Qa.returnTexture(i.filterTexture),cc.return(i.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}
class wY{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,n,r){this._renderer.renderPipes.batch.break(r);const o=this._colorStack;o[this._colorStackIndex]=o[this._colorStackIndex-1]&e.mask;const s=this._colorStack[this._colorStackIndex];s!==this._currentColor&&(this._currentColor=s,r.add({renderPipeId:"colorMask",colorMask:s,canBundle:!1})),this._colorStackIndex++}pop(e,n,r){this._renderer.renderPipes.batch.break(r);const o=this._colorStack;this._colorStackIndex--;const s=o[this._colorStackIndex-1];s!==this._currentColor&&(this._currentColor=s,r.add({renderPipeId:"colorMask",colorMask:s,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}
class pqe{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1}addBounds(e,n){pI(this.mask,e,n)}addLocalBounds(e,n){mI(this.mask,e,n)}containsPoint(e,n){const r=this.mask;return n(r,e)}reset(){this.mask.measurable=!0,this.mask=null}destroy(){this.reset()}}
class xY{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,n,r){var i;const o=e,s=this._renderer;s.renderPipes.batch.break(r),s.renderPipes.blendMode.setBlendMode(o.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"pushMaskBegin",mask:e,inverse:n._maskOptions.inverse,canBundle:!1});const a=o.mask;a.includeInBuild=!0,this._maskHash.has(o)||this._maskHash.set(o,{instructionsStart:0,instructionsLength:0});const l=this._maskHash.get(o);l.instructionsStart=r.instructionSize,a.collectRenderables(r,s,null),a.includeInBuild=!1,s.renderPipes.batch.break(r),r.add({renderPipeId:"stencilMask",action:"pushMaskEnd",mask:e,inverse:n._maskOptions.inverse,canBundle:!1});const c=r.instructionSize-l.instructionsStart-1;l.instructionsLength=c;const u=s.renderTarget.renderTarget.uid;(i=this._maskStackHash)[u]??(i[u]=0)}pop(e,n,r){const i=e,o=this._renderer;o.renderPipes.batch.break(r),o.renderPipes.blendMode.setBlendMode(i.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"popMaskBegin",inverse:n._maskOptions.inverse,canBundle:!1});const s=this._maskHash.get(e);for(let a=0;a<s.instructionsLength;a++)r.instructions[r.instructionSize++]=r.instructions[s.instructionsStart++];r.add({renderPipeId:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var n;const r=this._renderer,i=r.renderTarget.renderTarget.uid;let o=(n=this._maskStackHash)[i]??(n[i]=0);e.action==="pushMaskBegin"?(r.renderTarget.ensureDepthStencil(),r.stencil.setStencilMode(Ba.RENDERING_MASK_ADD,o),o++,r.colorMask.setMask(0)):e.action==="pushMaskEnd"?(e.inverse?r.stencil.setStencilMode(Ba.INVERSE_MASK_ACTIVE,o):r.stencil.setStencilMode(Ba.MASK_ACTIVE,o),r.colorMask.setMask(15)):e.action==="popMaskBegin"?(r.colorMask.setMask(0),o!==0?r.stencil.setStencilMode(Ba.RENDERING_MASK_REMOVE,o):(r.renderTarget.clear(null,Fd.STENCIL),r.stencil.setStencilMode(Ba.DISABLED,o)),o--):e.action==="popMaskEnd"&&(e.inverse?r.stencil.setStencilMode(Ba.INVERSE_MASK_ACTIVE,o):r.stencil.setStencilMode(Ba.MASK_ACTIVE,o),r.colorMask.setMask(15)),this._maskStackHash[i]=o}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}
var HC=(t=>(t[t.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",t[t.ARRAY_BUFFER=34962]="ARRAY_BUFFER",t[t.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",t))(HC||{});
class wve{constructor(e,n){this._lastBindBaseLocation=-1,this._lastBindCallId=-1,this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.type=n}}
class _Y{constructor(e){this._gpuBuffers=Object.create(null),this._boundBufferBases=Object.create(null),this._minBaseLocation=0,this._nextBindBaseIndex=this._minBaseLocation,this._bindCallId=0,this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_gpuBuffers")}destroy(){this._renderer=null,this._gl=null,this._gpuBuffers=null,this._boundBufferBases=null}contextChange(){this._gl=this._renderer.gl,this._gpuBuffers=Object.create(null),this._maxBindings=this._renderer.limits.maxUniformBindings}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{_gl:n}=this,r=this.getGlBuffer(e);n.bindBuffer(r.type,r.buffer)}bindBufferBase(e,n){const{_gl:r}=this;this._boundBufferBases[n]!==e&&(this._boundBufferBases[n]=e,e._lastBindBaseLocation=n,r.bindBufferBase(r.UNIFORM_BUFFER,n,e.buffer))}nextBindBase(e){this._bindCallId++,this._minBaseLocation=0,e&&(this._boundBufferBases[0]=null,this._minBaseLocation=1,this._nextBindBaseIndex<1&&(this._nextBindBaseIndex=1))}freeLocationForBufferBase(e){let n=this.getLastBindBaseLocation(e);if(n>=this._minBaseLocation)return e._lastBindCallId=this._bindCallId,n;let r=0,i=this._nextBindBaseIndex;for(;r<2;){i>=this._maxBindings&&(i=this._minBaseLocation,r++);const o=this._boundBufferBases[i];if(o&&o._lastBindCallId===this._bindCallId){i++;continue}break}return n=i,this._nextBindBaseIndex=i+1,r>=2?-1:(e._lastBindCallId=this._bindCallId,this._boundBufferBases[n]=null,n)}getLastBindBaseLocation(e){const n=e._lastBindBaseLocation;return this._boundBufferBases[n]===e?n:-1}bindBufferRange(e,n,r,i){const{_gl:o}=this;r||(r=0),n||(n=0),this._boundBufferBases[n]=null,o.bindBufferRange(o.UNIFORM_BUFFER,n||0,e.buffer,r*256,i||256)}updateBuffer(e){const{_gl:n}=this,r=this.getGlBuffer(e);if(e._updateID===r.updateID)return r;r.updateID=e._updateID,n.bindBuffer(r.type,r.buffer);const i=e.data,o=e.descriptor.usage&Ki.STATIC?n.STATIC_DRAW:n.DYNAMIC_DRAW;return i?r.byteLength>=i.byteLength?n.bufferSubData(r.type,0,i,0,e._updateSize/i.BYTES_PER_ELEMENT):(r.byteLength=i.byteLength,n.bufferData(r.type,i,o)):(r.byteLength=e.descriptor.size,n.bufferData(r.type,r.byteLength,o)),r}destroyAll(){const e=this._gl;for(const n in this._gpuBuffers)e.deleteBuffer(this._gpuBuffers[n].buffer);this._gpuBuffers=Object.create(null)}onBufferDestroy(e,n){const r=this._gpuBuffers[e.uid],i=this._gl;n||i.deleteBuffer(r.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{_gl:n}=this;let r=HC.ARRAY_BUFFER;e.descriptor.usage&Ki.INDEX?r=HC.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&Ki.UNIFORM&&(r=HC.UNIFORM_BUFFER);const i=new wve(n.createBuffer(),r);return this._gpuBuffers[e.uid]=i,e.on("destroy",this.onBufferDestroy,this),i}resetState(){this._boundBufferBases=Object.create(null)}}
const SY=class xve{constructor(e){this.supports={uint32Indices:!0,uniformBufferObject:!0,vertexArrayObject:!0,srgbTextures:!0,nonPowOf2wrapping:!0,msaa:!0,nonPowOf2mipmaps:!0},this._renderer=e,this.extensions=Object.create(null),this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this._renderer.gl=e}init(e){e={...xve.defaultOptions,...e};let n=this.multiView=e.multiView;if(e.context&&n&&(er("Renderer created with both a context and multiview enabled. Disabling multiView as both cannot work together."),n=!1),n?this.canvas=qr.get().createCanvas(this._renderer.canvas.width,this._renderer.canvas.height):this.canvas=this._renderer.view.canvas,e.context)this.initFromContext(e.context);else{const r=this._renderer.background.alpha<1,i=e.premultipliedAlpha??!0,o=e.antialias&&!this._renderer.backBuffer.useBackBuffer;this.createContext(e.preferWebGLVersion,{alpha:r,premultipliedAlpha:i,antialias:o,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference??"default"})}}ensureCanvasSize(e){if(!this.multiView){e!==this.canvas&&er("multiView is disabled, but targetCanvas is not the main canvas");return}const{canvas:n}=this;(n.width<e.width||n.height<e.height)&&(n.width=Math.max(e.width,e.width),n.height=Math.max(e.height,e.height))}initFromContext(e){this.gl=e,this.webGLVersion=e instanceof qr.get().getWebGLRenderingContext()?1:2,this.getExtensions(),this.validateContext(e),this._renderer.runners.contextChange.emit(e);const n=this._renderer.view.canvas;n.addEventListener("webglcontextlost",this.handleContextLost,!1),n.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}createContext(e,n){let r;const i=this.canvas;if(e===2&&(r=i.getContext("webgl2",n)),!r&&(r=i.getContext("webgl",n),!r))throw new Error("This browser does not support WebGL. Try using the canvas renderer");this.gl=r,this.initFromContext(this.gl)}getExtensions(){const{gl:e}=this,n={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc"),bptc:e.getExtension("EXT_texture_compression_bptc"),rgtc:e.getExtension("EXT_texture_compression_rgtc"),loseContext:e.getExtension("WEBGL_lose_context")};if(this.webGLVersion===1)this.extensions={...n,drawBuffers:e.getExtension("WEBGL_draw_buffers"),depthTexture:e.getExtension("WEBGL_depth_texture"),vertexArrayObject:e.getExtension("OES_vertex_array_object")||e.getExtension("MOZ_OES_vertex_array_object")||e.getExtension("WEBKIT_OES_vertex_array_object"),uint32ElementIndex:e.getExtension("OES_element_index_uint"),floatTexture:e.getExtension("OES_texture_float"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),textureHalfFloat:e.getExtension("OES_texture_half_float"),textureHalfFloatLinear:e.getExtension("OES_texture_half_float_linear"),vertexAttribDivisorANGLE:e.getExtension("ANGLE_instanced_arrays"),srgb:e.getExtension("EXT_sRGB")};else{this.extensions={...n,colorBufferFloat:e.getExtension("EXT_color_buffer_float")};const r=e.getExtension("WEBGL_provoking_vertex");r&&r.provokingVertexWEBGL(r.FIRST_VERTEX_CONVENTION_WEBGL)}}handleContextLost(e){e.preventDefault(),this._contextLossForced&&(this._contextLossForced=!1,setTimeout(()=>{var n;this.gl.isContextLost()&&((n=this.extensions.loseContext)==null||n.restoreContext())},0))}handleContextRestored(){this.getExtensions(),this._renderer.runners.contextChange.emit(this.gl)}destroy(){var n;const e=this._renderer.view.canvas;this._renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),(n=this.extensions.loseContext)==null||n.loseContext()}forceContextLoss(){var e;(e=this.extensions.loseContext)==null||e.loseContext(),this._contextLossForced=!0}validateContext(e){const n=e.getContextAttributes();n&&!n.stencil&&er("Provided WebGL context does not have a stencil buffer, masks may not render correctly");const r=this.supports,i=this.webGLVersion===2,o=this.extensions;r.uint32Indices=i||!!o.uint32ElementIndex,r.uniformBufferObject=i,r.vertexArrayObject=i||!!o.vertexArrayObject,r.srgbTextures=i||!!o.srgb,r.nonPowOf2wrapping=i,r.nonPowOf2mipmaps=i,r.msaa=i,r.uint32Indices||er("Provided WebGL context does not support 32 index buffer, large scenes may not render correctly")}};
let _ve=SY;
function kY(t,e){for(const n in t.attributes){const r=t.attributes[n],i=e[n];i?(r.format??(r.format=i.format),r.offset??(r.offset=i.offset),r.instance??(r.instance=i.instance)):er(`Attribute ${n} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}mqe(t)}
function mqe(t){const{buffers:e,attributes:n}=t,r={},i={};for(const o in e){const s=e[o];r[s.uid]=0,i[s.uid]=0}for(const o in n){const s=n[o];r[s.buffer.uid]+=Oy(s.format).stride}for(const o in n){const s=n[o];s.stride??(s.stride=r[s.buffer.uid]),s.start??(s.start=i[s.buffer.uid]),i[s.buffer.uid]+=Oy(s.format).stride}}
var CN=(t=>(t[t.RGBA=6408]="RGBA",t[t.RGB=6407]="RGB",t[t.RG=33319]="RG",t[t.RED=6403]="RED",t[t.RGBA_INTEGER=36249]="RGBA_INTEGER",t[t.RGB_INTEGER=36248]="RGB_INTEGER",t[t.RG_INTEGER=33320]="RG_INTEGER",t[t.RED_INTEGER=36244]="RED_INTEGER",t[t.ALPHA=6406]="ALPHA",t[t.LUMINANCE=6409]="LUMINANCE",t[t.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",t[t.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",t[t.DEPTH_STENCIL=34041]="DEPTH_STENCIL",t))(CN||{}),CY=(t=>(t[t.TEXTURE_2D=3553]="TEXTURE_2D",t[t.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",t[t.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",t[t.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",t[t.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",t[t.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",t[t.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",t))(CY||{}),Sve=(t=>(t[t.CLAMP=33071]="CLAMP",t[t.REPEAT=10497]="REPEAT",t[t.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",t))(Sve||{}),go=(t=>(t[t.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",t[t.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",t[t.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",t[t.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",t[t.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",t[t.UNSIGNED_INT=5125]="UNSIGNED_INT",t[t.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",t[t.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",t[t.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",t[t.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",t[t.BYTE=5120]="BYTE",t[t.SHORT=5122]="SHORT",t[t.INT=5124]="INT",t[t.FLOAT=5126]="FLOAT",t[t.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",t[t.HALF_FLOAT=36193]="HALF_FLOAT",t))(go||{});
const xre={uint8x2:go.UNSIGNED_BYTE,uint8x4:go.UNSIGNED_BYTE,sint8x2:go.BYTE,sint8x4:go.BYTE,unorm8x2:go.UNSIGNED_BYTE,unorm8x4:go.UNSIGNED_BYTE,snorm8x2:go.BYTE,snorm8x4:go.BYTE,uint16x2:go.UNSIGNED_SHORT,uint16x4:go.UNSIGNED_SHORT,sint16x2:go.SHORT,sint16x4:go.SHORT,unorm16x2:go.UNSIGNED_SHORT,unorm16x4:go.UNSIGNED_SHORT,snorm16x2:go.SHORT,snorm16x4:go.SHORT,float16x2:go.HALF_FLOAT,float16x4:go.HALF_FLOAT,float32:go.FLOAT,float32x2:go.FLOAT,float32x3:go.FLOAT,float32x4:go.FLOAT,uint32:go.UNSIGNED_INT,uint32x2:go.UNSIGNED_INT,uint32x3:go.UNSIGNED_INT,uint32x4:go.UNSIGNED_INT,sint32:go.INT,sint32x2:go.INT,sint32x3:go.INT,sint32x4:go.INT};
function kve(t){return xre[t]??xre.float32}
const gqe={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};
class AY{constructor(e){this._geometryVaoHash=Object.create(null),this._renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this._renderer.renderableGC.addManagedHash(this,"_geometryVaoHash")}contextChange(){const e=this.gl=this._renderer.gl;if(!this._renderer.context.supports.vertexArrayObject)throw new Error("[PixiJS] Vertex Array Objects are not supported on this device");const n=this._renderer.context.extensions.vertexArrayObject;n&&(e.createVertexArray=()=>n.createVertexArrayOES(),e.bindVertexArray=i=>n.bindVertexArrayOES(i),e.deleteVertexArray=i=>n.deleteVertexArrayOES(i));const r=this._renderer.context.extensions.vertexAttribDivisorANGLE;r&&(e.drawArraysInstanced=(i,o,s,a)=>{r.drawArraysInstancedANGLE(i,o,s,a)},e.drawElementsInstanced=(i,o,s,a,l)=>{r.drawElementsInstancedANGLE(i,o,s,a,l)},e.vertexAttribDivisor=(i,o)=>r.vertexAttribDivisorANGLE(i,o)),this._activeGeometry=null,this._activeVao=null,this._geometryVaoHash=Object.create(null)}bind(e,n){const r=this.gl;this._activeGeometry=e;const i=this.getVao(e,n);this._activeVao!==i&&(this._activeVao=i,r.bindVertexArray(i)),this.updateBuffers()}resetState(){this.unbind()}updateBuffers(){const e=this._activeGeometry,n=this._renderer.buffer;for(let r=0;r<e.buffers.length;r++){const i=e.buffers[r];n.updateBuffer(i)}}checkCompatibility(e,n){const r=e.attributes,i=n._attributeData;for(const o in i)if(!r[o])throw new Error(`shader and geometry incompatible, geometry missing the "${o}" attribute`)}getSignature(e,n){const r=e.attributes,i=n._attributeData,o=["g",e.uid];for(const s in r)i[s]&&o.push(s,i[s].location);return o.join("-")}getVao(e,n){var r;return((r=this._geometryVaoHash[e.uid])==null?void 0:r[n._key])||this.initGeometryVao(e,n)}initGeometryVao(e,n,r=!0){const i=this._renderer.gl,o=this._renderer.buffer;this._renderer.shader._getProgramData(n),this.checkCompatibility(e,n);const s=this.getSignature(e,n);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]=Object.create(null),e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let l=a[s];if(l)return a[n._key]=l,l;kY(e,n._attributeData);const c=e.buffers;l=i.createVertexArray(),i.bindVertexArray(l);for(let u=0;u<c.length;u++){const d=c[u];o.bind(d)}return this.activateVao(e,n),a[n._key]=l,a[s]=l,i.bindVertexArray(null),l}onGeometryDestroy(e,n){const r=this._geometryVaoHash[e.uid],i=this.gl;if(r){if(n)for(const o in r)this._activeVao!==r[o]&&this.unbind(),i.deleteVertexArray(r[o]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const n=this.gl;for(const r in this._geometryVaoHash){if(e)for(const i in this._geometryVaoHash[r]){const o=this._geometryVaoHash[r];this._activeVao!==o&&this.unbind(),n.deleteVertexArray(o[i])}this._geometryVaoHash[r]=null}}activateVao(e,n){var a;const r=this._renderer.gl,i=this._renderer.buffer,o=e.attributes;e.indexBuffer&&i.bind(e.indexBuffer);let s=null;for(const l in o){const c=o[l],u=c.buffer,d=i.getGlBuffer(u),h=n._attributeData[l];if(h){s!==d&&(i.bind(u),s=d);const p=h.location;r.enableVertexAttribArray(p);const g=Oy(c.format),b=kve(c.format);if(((a=h.format)==null?void 0:a.substring(1,4))==="int"?r.vertexAttribIPointer(p,g.size,b,c.stride,c.offset):r.vertexAttribPointer(p,g.size,b,g.normalised,c.stride,c.offset),c.instance)if(this.hasInstance){const v=c.divisor??1;r.vertexAttribDivisor(p,v)}else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,n,r,i){const{gl:o}=this._renderer,s=this._activeGeometry,a=gqe[e||s.topology];if(i??(i=s.instanceCount),s.indexBuffer){const l=s.indexBuffer.data.BYTES_PER_ELEMENT,c=l===2?o.UNSIGNED_SHORT:o.UNSIGNED_INT;i>1?o.drawElementsInstanced(a,n||s.indexBuffer.data.length,c,(r||0)*l,i):o.drawElements(a,n||s.indexBuffer.data.length,c,(r||0)*l)}else i>1?o.drawArraysInstanced(a,r||0,n||s.getSize(),i):o.drawArrays(a,r||0,n||s.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this._renderer=null,this.gl=null,this._activeVao=null,this._activeGeometry=null}}
const yqe=new T_({attributes:{aPosition:[-1,-1,3,-1,-1,3]}}),EY=class Cve{constructor(e){this.useBackBuffer=!1,this._useBackBufferThisRender=!1,this._renderer=e}init(e={}){const{useBackBuffer:n,antialias:r}={...Cve.defaultOptions,...e};this.useBackBuffer=n,this._antialias=r,this._renderer.context.supports.msaa||(er("antialiasing, is not supported on when using the back buffer"),this._antialias=!1),this._state=Qh.for2d();const i=new of({vertex:`
                attribute vec2 aPosition;
                out vec2 vUv;

                void main() {
                    gl_Position = vec4(aPosition, 0.0, 1.0);

                    vUv = (aPosition + 1.0) / 2.0;

                    // flip dem UVs
                    vUv.y = 1.0 - vUv.y;
                }`,fragment:`
                in vec2 vUv;
                out vec4 finalColor;

                uniform sampler2D uTexture;

                void main() {
                    finalColor = texture(uTexture, vUv);
                }`,name:"big-triangle"});this._bigTriangleShader=new sf({glProgram:i,resources:{uTexture:fn.WHITE.source}})}renderStart(e){const n=this._renderer.renderTarget.getRenderTarget(e.target);if(this._useBackBufferThisRender=this.useBackBuffer&&!!n.isRoot,this._useBackBufferThisRender){const r=this._renderer.renderTarget.getRenderTarget(e.target);this._targetTexture=r.colorTexture,e.target=this._getBackBufferTexture(r.colorTexture)}}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){const e=this._renderer;e.renderTarget.finishRenderPass(),this._useBackBufferThisRender&&(e.renderTarget.bind(this._targetTexture,!1),this._bigTriangleShader.resources.uTexture=this._backBufferTexture.source,e.encoder.draw({geometry:yqe,shader:this._bigTriangleShader,state:this._state}))}_getBackBufferTexture(e){return this._backBufferTexture=this._backBufferTexture||new fn({source:new Ea({width:e.width,height:e.height,resolution:e._resolution,antialias:this._antialias})}),this._backBufferTexture.source.resize(e.width,e.height,e._resolution),this._backBufferTexture}destroy(){this._backBufferTexture&&(this._backBufferTexture.destroy(),this._backBufferTexture=null)}};
let Ave=EY;
class TY{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}}
class MY{constructor(e){this.commandFinished=Promise.resolve(),this._renderer=e}setGeometry(e,n){this._renderer.geometry.bind(e,n.glProgram)}finishRenderPass(){}draw(e){const n=this._renderer,{geometry:r,shader:i,state:o,skipSync:s,topology:a,size:l,start:c,instanceCount:u}=e;n.shader.bind(i,s),n.geometry.bind(r,n.shader._activeProgram),o&&n.state.set(o),n.geometry.draw(a,l,c,u??r.instanceCount)}destroy(){this._renderer=null}}
class PY{constructor(e){this._renderer=e}contextChange(){const e=this._renderer.gl;this.maxTextures=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.maxBatchableTextures=V$(this.maxTextures,e),this.maxUniformBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}destroy(){}}
class Eve{constructor(){this.width=-1,this.height=-1,this.msaa=!1,this.msaaRenderBuffer=[]}}
const eb=[];
class NY{constructor(e){this._stencilCache={enabled:!1,stencilReference:0,stencilMode:Ba.NONE},this._renderTargetStencilState=Object.create(null),e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this._gl=e,this._comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this._stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP},this.resetState()}onRenderTargetChange(e){if(this._activeRenderTarget===e)return;this._activeRenderTarget=e;let n=this._renderTargetStencilState[e.uid];n||(n=this._renderTargetStencilState[e.uid]={stencilMode:Ba.DISABLED,stencilReference:0}),this.setStencilMode(n.stencilMode,n.stencilReference)}resetState(){this._stencilCache.enabled=!1,this._stencilCache.stencilMode=Ba.NONE,this._stencilCache.stencilReference=0}setStencilMode(e,n){const r=this._renderTargetStencilState[this._activeRenderTarget.uid],i=this._gl,o=eb[e],s=this._stencilCache;if(r.stencilMode=e,r.stencilReference=n,e===Ba.DISABLED){this._stencilCache.enabled&&(this._stencilCache.enabled=!1,i.disable(i.STENCIL_TEST));return}this._stencilCache.enabled||(this._stencilCache.enabled=!0,i.enable(i.STENCIL_TEST)),(e!==s.stencilMode||s.stencilReference!==n)&&(s.stencilMode=e,s.stencilReference=n,i.stencilFunc(this._comparisonFuncMapping[o.stencilBack.compare],n,255),i.stencilOp(i.KEEP,i.KEEP,this._stencilOpsMapping[o.stencilBack.passOp]))}}
const IY={f32:4,i32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"vec2<i32>":8,"vec3<i32>":12,"vec4<i32>":16,"mat2x2<f32>":32,"mat3x3<f32>":48,"mat4x4<f32>":64};
function Tve(t){const e=t.map(o=>({data:o,offset:0,size:0})),n=16;let r=0,i=0;for(let o=0;o<e.length;o++){const s=e[o];if(r=IY[s.data.type],!r)throw new Error(`Unknown type ${s.data.type}`);s.data.size>1&&(r=Math.max(r,n)*s.data.size);const a=r===12?16:r;s.size=r;const l=i%n;l>0&&n-l<a?i+=(n-l)%16:i+=(r-l%r)%r,s.offset=i,i+=r}return i=Math.ceil(i/16)*16,{uboElements:e,size:i}}
function OY(t,e,n,r){const i=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `];let o=0;for(let a=0;a<t.length;a++){const l=t[a],c=l.data.name;let u=!1,d=0;for(let h=0;h<M1.length;h++)if(M1[h].test(l.data)){d=l.offset/4,i.push(`name = "${c}";`,`offset += ${d-o};`,M1[h][e]||M1[h].ubo),u=!0;break}if(!u)if(l.data.size>1)d=l.offset/4,i.push(n(l,d-o));else{const h=r[l.data.type];d=l.offset/4,i.push(`
                    v = uv.${c};
                    offset += ${d-o};
                    ${h};
                `)}o=d}const s=i.join(`
`);return new Function("uv","data","dataInt32","offset",s)}
function d6(t,e){return`
        for (let i = 0; i < ${t*e}; i++) {
            data[offset + (((i / ${t})|0) * 4) + (i % ${t})] = v[i];
        }
    `}
const DY={f32:`
        data[offset] = v;`,i32:`
        dataInt32[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"vec2<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,"vec3<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,"vec4<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];
        dataInt32[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":d6(3,2),"mat4x2<f32>":d6(4,2),"mat2x3<f32>":d6(2,3),"mat4x3<f32>":d6(4,3),"mat2x4<f32>":d6(2,4),"mat3x4<f32>":d6(3,4)},Mve={...DY,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};
function Pve(t,e){const n=Math.max(IY[t.data.type]/16,1),r=t.data.value.length/t.data.size,i=(4-r%4)%4,o=t.data.type.indexOf("i32")>=0?"dataInt32":"data";return`
        v = uv.${t.data.name};
        offset += ${e};

        arrayOffset = offset;

        t = 0;

        for(var i=0; i < ${t.data.size*n}; i++)
        {
            for(var j = 0; j < ${r}; j++)
            {
                ${o}[arrayOffset++] = v[t++];
            }
            ${i!==0?`arrayOffset += ${i};`:""}
        }
    `}
function Nve(t){return OY(t,"uboStd40",Pve,DY)}
class LY extends RY{constructor(){super({createUboElements:Tve,generateUboSync:Nve})}}
class Rve{constructor(){this._clearColorCache=[0,0,0,0],this._viewPortCache=new Xo}init(e,n){this._renderer=e,this._renderTargetSystem=n,e.runners.contextChange.add(this)}contextChange(){this._clearColorCache=[0,0,0,0],this._viewPortCache=new Xo}copyToTexture(e,n,r,i,o){const s=this._renderTargetSystem,a=this._renderer,l=s.getGpuRenderTarget(e),c=a.gl;return this.finishRenderPass(e),c.bindFramebuffer(c.FRAMEBUFFER,l.resolveTargetFramebuffer),a.texture.bind(n,0),c.copyTexSubImage2D(c.TEXTURE_2D,0,o.x,o.y,r.x,r.y,i.width,i.height),n}startRenderPass(e,n=!0,r,i){const o=this._renderTargetSystem,s=e.colorTexture,a=o.getGpuRenderTarget(e);let l=i.y;e.isRoot&&(l=s.pixelHeight-i.height),e.colorTextures.forEach(d=>{this._renderer.texture.unbind(d)});const c=this._renderer.gl;c.bindFramebuffer(c.FRAMEBUFFER,a.framebuffer);const u=this._viewPortCache;(u.x!==i.x||u.y!==l||u.width!==i.width||u.height!==i.height)&&(u.x=i.x,u.y=l,u.width=i.width,u.height=i.height,c.viewport(i.x,l,i.width,i.height)),!a.depthStencilRenderBuffer&&(e.stencil||e.depth)&&this._initStencil(a),this.clear(e,n,r)}finishRenderPass(e){const r=this._renderTargetSystem.getGpuRenderTarget(e);if(!r.msaa)return;const i=this._renderer.gl;i.bindFramebuffer(i.FRAMEBUFFER,r.resolveTargetFramebuffer),i.bindFramebuffer(i.READ_FRAMEBUFFER,r.framebuffer),i.blitFramebuffer(0,0,r.width,r.height,0,0,r.width,r.height,i.COLOR_BUFFER_BIT,i.NEAREST),i.bindFramebuffer(i.FRAMEBUFFER,r.framebuffer)}initGpuRenderTarget(e){const r=this._renderer.gl,i=new Eve;return e.colorTexture instanceof Zg?(this._renderer.context.ensureCanvasSize(e.colorTexture.resource),i.framebuffer=null,i):(this._initColor(e,i),r.bindFramebuffer(r.FRAMEBUFFER,null),i)}destroyGpuRenderTarget(e){const n=this._renderer.gl;e.framebuffer&&(n.deleteFramebuffer(e.framebuffer),e.framebuffer=null),e.resolveTargetFramebuffer&&(n.deleteFramebuffer(e.resolveTargetFramebuffer),e.resolveTargetFramebuffer=null),e.depthStencilRenderBuffer&&(n.deleteRenderbuffer(e.depthStencilRenderBuffer),e.depthStencilRenderBuffer=null),e.msaaRenderBuffer.forEach(r=>{n.deleteRenderbuffer(r)}),e.msaaRenderBuffer=null}clear(e,n,r){if(!n)return;const i=this._renderTargetSystem;typeof n=="boolean"&&(n=n?Fd.ALL:Fd.NONE);const o=this._renderer.gl;if(n&Fd.COLOR){r??(r=i.defaultClearColor);const s=this._clearColorCache,a=r;(s[0]!==a[0]||s[1]!==a[1]||s[2]!==a[2]||s[3]!==a[3])&&(s[0]=a[0],s[1]=a[1],s[2]=a[2],s[3]=a[3],o.clearColor(a[0],a[1],a[2],a[3]))}o.clear(n)}resizeGpuRenderTarget(e){if(e.isRoot)return;const r=this._renderTargetSystem.getGpuRenderTarget(e);this._resizeColor(e,r),(e.stencil||e.depth)&&this._resizeStencil(r)}_initColor(e,n){const r=this._renderer,i=r.gl,o=i.createFramebuffer();if(n.resolveTargetFramebuffer=o,i.bindFramebuffer(i.FRAMEBUFFER,o),n.width=e.colorTexture.source.pixelWidth,n.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((s,a)=>{const l=s.source;l.antialias&&(r.context.supports.msaa?n.msaa=!0:er("[RenderTexture] Antialiasing on textures is not supported in WebGL1")),r.texture.bindSource(l,0);const u=r.texture.getGlSource(l).texture;i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+a,3553,u,0)}),n.msaa){const s=i.createFramebuffer();n.framebuffer=s,i.bindFramebuffer(i.FRAMEBUFFER,s),e.colorTextures.forEach((a,l)=>{const c=i.createRenderbuffer();n.msaaRenderBuffer[l]=c})}else n.framebuffer=o;this._resizeColor(e,n)}_resizeColor(e,n){const r=e.colorTexture.source;if(n.width=r.pixelWidth,n.height=r.pixelHeight,e.colorTextures.forEach((i,o)=>{o!==0&&i.source.resize(r.width,r.height,r._resolution)}),n.msaa){const i=this._renderer,o=i.gl,s=n.framebuffer;o.bindFramebuffer(o.FRAMEBUFFER,s),e.colorTextures.forEach((a,l)=>{const c=a.source;i.texture.bindSource(c,0);const d=i.texture.getGlSource(c).internalFormat,h=n.msaaRenderBuffer[l];o.bindRenderbuffer(o.RENDERBUFFER,h),o.renderbufferStorageMultisample(o.RENDERBUFFER,4,d,c.pixelWidth,c.pixelHeight),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+l,o.RENDERBUFFER,h)})}}_initStencil(e){if(e.framebuffer===null)return;const n=this._renderer.gl,r=n.createRenderbuffer();e.depthStencilRenderBuffer=r,n.bindRenderbuffer(n.RENDERBUFFER,r),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,r),this._resizeStencil(e)}_resizeStencil(e){const n=this._renderer.gl;n.bindRenderbuffer(n.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?n.renderbufferStorageMultisample(n.RENDERBUFFER,4,n.DEPTH24_STENCIL8,e.width,e.height):n.renderbufferStorage(n.RENDERBUFFER,this._renderer.context.webGLVersion===2?n.DEPTH24_STENCIL8:n.DEPTH_STENCIL,e.width,e.height)}prerender(e){const n=e.colorTexture.resource;this._renderer.context.multiView&&Zg.test(n)&&this._renderer.context.ensureCanvasSize(n)}postrender(e){if(this._renderer.context.multiView&&Zg.test(e.colorTexture.resource)){const n=this._renderer.context.canvas,r=e.colorTexture;r.context2D.drawImage(n,0,r.pixelHeight-n.height)}}}
function Ive(t,e,n,r,i,o){const s=o?1:-1;return t.identity(),t.a=1/r*2,t.d=s*(1/i*2),t.tx=-1-e*t.a,t.ty=-s-n*t.d,t}
const B6=new Map;
function BY(t,e){if(!B6.has(t)){const n=new fn({source:new Zg({resource:t,...e})}),r=()=>{B6.get(t)===n&&B6.delete(t)};n.once("destroy",r),n.source.once("destroy",r),B6.set(t,n)}return B6.get(t)}
function bqe(t){return B6.has(t)}
function Ove(t){const e=t.colorTexture.source.resource;return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement&&document.body.contains(e)}
const Dve=class Lve{constructor(e={}){if(this.uid=Ms("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),this._managedColorTextures=!1,e={...Lve.defaultOptions,...e},this.stencil=e.stencil,this.depth=e.depth,this.isRoot=e.isRoot,typeof e.colorTextures=="number"){this._managedColorTextures=!0;for(let n=0;n<e.colorTextures;n++)this.colorTextures.push(new Ea({width:e.width,height:e.height,resolution:e.resolution,antialias:e.antialias}))}else{this.colorTextures=[...e.colorTextures.map(r=>r.source)];const n=this.colorTexture.source;this.resize(n.width,n.height,n._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),(e.depthStencilTexture||this.stencil)&&(e.depthStencilTexture instanceof fn||e.depthStencilTexture instanceof Ea?this.depthStencilTexture=e.depthStencilTexture.source:this.ensureDepthStencilTexture())}get size(){const e=this._size;return e[0]=this.pixelWidth,e[1]=this.pixelHeight,e}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(e){this.resize(e.width,e.height,e._resolution,!0)}ensureDepthStencilTexture(){this.depthStencilTexture||(this.depthStencilTexture=new Ea({width:this.width,height:this.height,resolution:this.resolution,format:"depth24plus-stencil8",autoGenerateMipmaps:!1,antialias:!1,mipLevelCount:1}))}resize(e,n,r=this.resolution,i=!1){this.dirtyId++,this.colorTextures.forEach((o,s)=>{i&&s===0||o.source.resize(e,n,r)}),this.depthStencilTexture&&this.depthStencilTexture.source.resize(e,n,r)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this),this._managedColorTextures&&this.colorTextures.forEach(e=>{e.destroy()}),this.depthStencilTexture&&(this.depthStencilTexture.destroy(),delete this.depthStencilTexture)}};
let AN=Dve;
class FY{constructor(e){this.rootViewPort=new Xo,this.viewport=new Xo,this.onRenderTargetChange=new F$("onRenderTargetChange"),this.projectionMatrix=new dn,this.defaultClearColor=[0,0,0,0],this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e,e.renderableGC.addManagedHash(this,"_gpuRenderTargetHash")}finishRenderPass(){this.adaptor.finishRenderPass(this.renderTarget)}renderStart({target:e,clear:n,clearColor:r,frame:i}){var o,s;this._renderTargetStack.length=0,this.push(e,n,r,i),this.rootViewPort.copyFrom(this.viewport),this.rootRenderTarget=this.renderTarget,this.renderingToScreen=Ove(this.rootRenderTarget),(s=(o=this.adaptor).prerender)==null||s.call(o,this.rootRenderTarget)}postrender(){var e,n;(n=(e=this.adaptor).postrender)==null||n.call(e,this.rootRenderTarget)}bind(e,n=!0,r,i){const o=this.getRenderTarget(e),s=this.renderTarget!==o;this.renderTarget=o,this.renderSurface=e;const a=this.getGpuRenderTarget(o);(o.pixelWidth!==a.width||o.pixelHeight!==a.height)&&(this.adaptor.resizeGpuRenderTarget(o),a.width=o.pixelWidth,a.height=o.pixelHeight);const l=o.colorTexture,c=this.viewport,u=l.pixelWidth,d=l.pixelHeight;if(!i&&e instanceof fn&&(i=e.frame),i){const h=l._resolution;c.x=i.x*h+.5|0,c.y=i.y*h+.5|0,c.width=i.width*h+.5|0,c.height=i.height*h+.5|0}else c.x=0,c.y=0,c.width=u,c.height=d;return Ive(this.projectionMatrix,0,0,c.width/l.resolution,c.height/l.resolution,!o.isRoot),this.adaptor.startRenderPass(o,n,r,c),s&&this.onRenderTargetChange.emit(o),o}clear(e,n=Fd.ALL,r){n&&(e&&(e=this.getRenderTarget(e)),this.adaptor.clear(e||this.renderTarget,n,r,this.viewport))}contextChange(){this._gpuRenderTargetHash=Object.create(null)}push(e,n=Fd.ALL,r,i){const o=this.bind(e,n,r,i);return this._renderTargetStack.push({renderTarget:o,frame:i}),o}pop(){this._renderTargetStack.pop();const e=this._renderTargetStack[this._renderTargetStack.length-1];this.bind(e.renderTarget,!1,null,e.frame)}getRenderTarget(e){return e.isTexture&&(e=e.source),this._renderSurfaceToRenderTargetHash.get(e)??this._initRenderTarget(e)}copyToTexture(e,n,r,i,o){r.x<0&&(i.width+=r.x,o.x-=r.x,r.x=0),r.y<0&&(i.height+=r.y,o.y-=r.y,r.y=0);const{pixelWidth:s,pixelHeight:a}=e;return i.width=Math.min(i.width,s-r.x),i.height=Math.min(i.height,a-r.y),this.adaptor.copyToTexture(e,n,r,i,o)}ensureDepthStencil(){this.renderTarget.stencil||(this.renderTarget.stencil=!0,this.adaptor.startRenderPass(this.renderTarget,!1,null,this.viewport))}destroy(){this._renderer=null,this._renderSurfaceToRenderTargetHash.forEach((e,n)=>{e!==n&&e.destroy()}),this._renderSurfaceToRenderTargetHash.clear(),this._gpuRenderTargetHash=Object.create(null)}_initRenderTarget(e){let n=null;return Zg.test(e)&&(e=BY(e).source),e instanceof AN?n=e:e instanceof Ea&&(n=new AN({colorTextures:[e]}),e.source instanceof Zg&&(n.isRoot=!0),e.once("destroy",()=>{n.destroy(),this._renderSurfaceToRenderTargetHash.delete(e);const r=this._gpuRenderTargetHash[n.uid];r&&(this._gpuRenderTargetHash[n.uid]=null,this.adaptor.destroyGpuRenderTarget(r))})),this._renderSurfaceToRenderTargetHash.set(e,n),n}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||(this._gpuRenderTargetHash[e.uid]=this.adaptor.initGpuRenderTarget(e))}resetState(){this.renderTarget=null,this.renderSurface=null}}
class jY extends FY{constructor(e){super(e),this.adaptor=new Rve,this.adaptor.init(e,this)}}
class BI extends Ma{constructor({buffer:e,offset:n,size:r}){super(),this.uid=Ms("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=Ms("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=e,this.offset=n|0,this.size=r,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=Ms("resource"),this.emit("change",this)}destroy(e=!1){this.destroyed=!0,e&&this.buffer.destroy(),this.emit("change",this),this.buffer=null}}
class vqe{}
class Fve{constructor(e,n){this.program=e,this.uniformData=n,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}
function aH(t,e,n){const r=t.createShader(e);return t.shaderSource(r,n),t.compileShader(r),r}
function FB(t){const e=new Array(t);for(let n=0;n<e.length;n++)e[n]=!1;return e}
function zY(t,e){switch(t){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return FB(2*e);case"bvec3":return FB(3*e);case"bvec4":return FB(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}
let uM=null;
const _re={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"},wqe={float:"float32",vec2:"float32x2",vec3:"float32x3",vec4:"float32x4",int:"sint32",ivec2:"sint32x2",ivec3:"sint32x3",ivec4:"sint32x4",uint:"uint32",uvec2:"uint32x2",uvec3:"uint32x3",uvec4:"uint32x4",bool:"uint32",bvec2:"uint32x2",bvec3:"uint32x3",bvec4:"uint32x4"};
function UY(t,e){if(!uM){const n=Object.keys(_re);uM={};for(let r=0;r<n.length;++r){const i=n[r];uM[t[i]]=_re[i]}}return uM[e]}
function jve(t,e){const n=UY(t,e);return wqe[n]||"float32"}
function zve(t,e,n=!1){const r={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=e.getActiveAttrib(t,s);if(a.name.startsWith("gl_"))continue;const l=jve(e,a.type);r[a.name]={location:0,format:l,stride:Oy(l).stride,offset:0,instance:!1,start:0}}const o=Object.keys(r);if(n){o.sort((s,a)=>s>a?1:-1);for(let s=0;s<o.length;s++)r[o[s]].location=s,e.bindAttribLocation(t,s,o[s]);e.linkProgram(t)}else for(let s=0;s<o.length;s++)r[o[s]].location=e.getAttribLocation(t,o[s]);return r}
function Uve(t,e){if(!e.ACTIVE_UNIFORM_BLOCKS)return{};const n={},r=e.getProgramParameter(t,e.ACTIVE_UNIFORM_BLOCKS);for(let i=0;i<r;i++){const o=e.getActiveUniformBlockName(t,i),s=e.getUniformBlockIndex(t,o),a=e.getActiveUniformBlockParameter(t,i,e.UNIFORM_BLOCK_DATA_SIZE);n[o]={name:o,index:s,size:a}}return n}
function Gve(t,e){const n={},r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){const o=e.getActiveUniform(t,i),s=o.name.replace(/\[.*?\]$/,""),a=!!o.name.match(/\[.*?\]$/),l=UY(e,o.type);n[s]={name:s,index:i,type:l,size:o.size,isArray:a,value:zY(l,o.size)}}return n}
function Sre(t,e){const n=t.getShaderSource(e).split(`
`).map((c,u)=>`${u}: ${c}`),r=t.getShaderInfoLog(e),i=r.split(`
`),o={},s=i.map(c=>parseFloat(c.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(c=>c&&!o[c]?(o[c]=!0,!0):!1),a=[""];s.forEach(c=>{n[c-1]=`%c${n[c-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const l=n.join(`
`);a[0]=l,console.error(r),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}
function Hve(t,e,n,r){t.getProgramParameter(e,t.LINK_STATUS)||(t.getShaderParameter(n,t.COMPILE_STATUS)||Sre(t,n),t.getShaderParameter(r,t.COMPILE_STATUS)||Sre(t,r),console.error("PixiJS Error: Could not initialize shader."),t.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(e)))}
function Vve(t,e){const n=aH(t,t.VERTEX_SHADER,e.vertex),r=aH(t,t.FRAGMENT_SHADER,e.fragment),i=t.createProgram();t.attachShader(i,n),t.attachShader(i,r);const o=e.transformFeedbackVaryings;o&&(typeof t.transformFeedbackVaryings!="function"?er("TransformFeedback is not supported but TransformFeedbackVaryings are given."):t.transformFeedbackVaryings(i,o.names,o.bufferMode==="separate"?t.SEPARATE_ATTRIBS:t.INTERLEAVED_ATTRIBS)),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||Hve(t,i,n,r),e._attributeData=zve(i,t,!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertex)),e._uniformData=Gve(i,t),e._uniformBlockData=Uve(i,t),t.deleteShader(n),t.deleteShader(r);const s={};for(const l in e._uniformData){const c=e._uniformData[l];s[l]={location:t.getUniformLocation(i,l),value:zY(c.type,c.size)}}return new Fve(i,s)}
const dM={textureCount:0,blockIndex:0};
class GY{constructor(e){this._activeProgram=null,this._programDataHash=Object.create(null),this._shaderSyncFunctions=Object.create(null),this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_programDataHash")}contextChange(e){this._gl=e,this._programDataHash=Object.create(null),this._shaderSyncFunctions=Object.create(null),this._activeProgram=null}bind(e,n){if(this._setProgram(e.glProgram),n)return;dM.textureCount=0,dM.blockIndex=0;let r=this._shaderSyncFunctions[e.glProgram._key];r||(r=this._shaderSyncFunctions[e.glProgram._key]=this._generateShaderSync(e,this)),this._renderer.buffer.nextBindBase(!!e.glProgram.transformFeedbackVaryings),r(this._renderer,e,dM)}updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this._activeProgram,dM)}bindUniformBlock(e,n,r=0){const i=this._renderer.buffer,o=this._getProgramData(this._activeProgram),s=e._bufferResource;s||this._renderer.ubo.updateUniformGroup(e);const a=e.buffer,l=i.updateBuffer(a),c=i.freeLocationForBufferBase(l);if(s){const{offset:d,size:h}=e;d===0&&h===a.data.byteLength?i.bindBufferBase(l,c):i.bindBufferRange(l,c,d)}else i.getLastBindBaseLocation(l)!==c&&i.bindBufferBase(l,c);const u=this._activeProgram._uniformBlockData[n].index;o.uniformBlockBindings[r]!==c&&(o.uniformBlockBindings[r]=c,this._renderer.gl.uniformBlockBinding(o.program,u,c))}_setProgram(e){if(this._activeProgram===e)return;this._activeProgram=e;const n=this._getProgramData(e);this._gl.useProgram(n.program)}_getProgramData(e){return this._programDataHash[e._key]||this._createProgramData(e)}_createProgramData(e){const n=e._key;return this._programDataHash[n]=Vve(this._gl,e),this._programDataHash[n]}destroy(){for(const e of Object.keys(this._programDataHash))this._programDataHash[e].destroy(),this._programDataHash[e]=null;this._programDataHash=null}_generateShaderSync(e,n){return Bve(e,n)}resetState(){this._activeProgram=null}}
const qve={f32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1f(location, v);
        }`,"vec2<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2f(location, v[0], v[1]);
        }`,"vec3<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3f(location, v[0], v[1], v[2]);
        }`,"vec4<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4f(location, v[0], v[1], v[2], v[3]);
        }`,i32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,"vec2<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,"vec3<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,"vec4<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,u32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1ui(location, v);
        }`,"vec2<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2ui(location, v[0], v[1]);
        }`,"vec3<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3ui(location, v[0], v[1], v[2]);
        }`,"vec4<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
        }`,bool:`if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,"vec2<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,"vec3<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,"vec4<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,"mat2x2<f32>":"gl.uniformMatrix2fv(location, false, v);","mat3x3<f32>":"gl.uniformMatrix3fv(location, false, v);","mat4x4<f32>":"gl.uniformMatrix4fv(location, false, v);"},Wve={f32:"gl.uniform1fv(location, v);","vec2<f32>":"gl.uniform2fv(location, v);","vec3<f32>":"gl.uniform3fv(location, v);","vec4<f32>":"gl.uniform4fv(location, v);","mat2x2<f32>":"gl.uniformMatrix2fv(location, false, v);","mat3x3<f32>":"gl.uniformMatrix3fv(location, false, v);","mat4x4<f32>":"gl.uniformMatrix4fv(location, false, v);",i32:"gl.uniform1iv(location, v);","vec2<i32>":"gl.uniform2iv(location, v);","vec3<i32>":"gl.uniform3iv(location, v);","vec4<i32>":"gl.uniform4iv(location, v);",u32:"gl.uniform1iv(location, v);","vec2<u32>":"gl.uniform2iv(location, v);","vec3<u32>":"gl.uniform3iv(location, v);","vec4<u32>":"gl.uniform4iv(location, v);",bool:"gl.uniform1iv(location, v);","vec2<bool>":"gl.uniform2iv(location, v);","vec3<bool>":"gl.uniform3iv(location, v);","vec4<bool>":"gl.uniform4iv(location, v);"};
class HY{constructor(e){this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this.gl=null,this._cache={}}contextChange(e){this.gl=e}updateUniformGroup(e,n,r){const i=this._renderer.shader._getProgramData(n);(!e.isStatic||e._dirtyId!==i.uniformDirtyGroups[e.uid])&&(i.uniformDirtyGroups[e.uid]=e._dirtyId,this._getUniformSyncFunction(e,n)(i.uniformData,e.uniforms,this._renderer,r))}_getUniformSyncFunction(e,n){var r;return((r=this._uniformGroupSyncHash[e._signature])==null?void 0:r[n._key])||this._createUniformSyncFunction(e,n)}_createUniformSyncFunction(e,n){const r=this._uniformGroupSyncHash[e._signature]||(this._uniformGroupSyncHash[e._signature]={}),i=this._getSignature(e,n._uniformData,"u");return this._cache[i]||(this._cache[i]=this._generateUniformsSync(e,n._uniformData)),r[n._key]=this._cache[i],r[n._key]}_generateUniformsSync(e,n){return $ve(e,n)}_getSignature(e,n,r){const i=e.uniforms,o=[`${r}-`];for(const s in i)o.push(s),n[s]&&o.push(n[s].type);return o.join("-")}destroy(){this._renderer=null,this._cache=null}}
function xqe(t){return t=t.replaceAll("texture2D","texture").replaceAll("gl_FragColor","finalColor").replaceAll("varying","in"),t=`
        out vec4 finalColor;
    ${t}
    `,t}
const _qe={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};
function Sqe(t){return _qe[t]}
function Yve(t){const e={};if(e.normal=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e.add=[t.ONE,t.ONE],e.multiply=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.screen=[t.ONE,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[t.SRC_ALPHA,t.ONE,t.ONE,t.ONE],e["screen-npm"]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.erase=[t.ZERO,t.ONE_MINUS_SRC_ALPHA],!(t instanceof qr.get().getWebGLRenderingContext()))e.min=[t.ONE,t.ONE,t.ONE,t.ONE,t.MIN,t.MIN],e.max=[t.ONE,t.ONE,t.ONE,t.ONE,t.MAX,t.MAX];else{const r=t.getExtension("EXT_blend_minmax");r&&(e.min=[t.ONE,t.ONE,t.ONE,t.ONE,r.MIN_EXT,r.MIN_EXT],e.max=[t.ONE,t.ONE,t.ONE,t.ONE,r.MAX_EXT,r.MAX_EXT])}return e}
const kqe=0,Cqe=1,Aqe=2,Eqe=3,Tqe=4,Mqe=5,Xve=class lH{constructor(e){this._invertFrontFace=!1,this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[kqe]=this.setBlend,this.map[Cqe]=this.setOffset,this.map[Aqe]=this.setCullFace,this.map[Eqe]=this.setDepthTest,this.map[Tqe]=this.setFrontFace,this.map[Mqe]=this.setDepthMask,this.checks=[],this.defaultState=Qh.for2d(),e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){this._invertFrontFace=!e.isRoot,this._cullFace?this.setFrontFace(this._frontFace):this._frontFaceDirty=!0}contextChange(e){this.gl=e,this.blendModesMap=Yve(e),this.resetState()}set(e){if(e||(e=this.defaultState),this.stateId!==e.data){let n=this.stateId^e.data,r=0;for(;n;)n&1&&this.map[r].call(this,!!(e.data&1<<r)),n>>=1,r++;this.stateId=e.data}for(let n=0;n<this.checks.length;n++)this.checks[n](this,e)}forceState(e){e||(e=this.defaultState);for(let n=0;n<this.map.length;n++)this.map[n].call(this,!!(e.data&1<<n));for(let n=0;n<this.checks.length;n++)this.checks[n](this,e);this.stateId=e.data}setBlend(e){this._updateCheck(lH._checkBlendMode,e),this.gl[e?"enable":"disable"](this.gl.BLEND)}setOffset(e){this._updateCheck(lH._checkPolygonOffset,e),this.gl[e?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(e){this.gl[e?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(e){this.gl.depthMask(e)}setCullFace(e){this._cullFace=e,this.gl[e?"enable":"disable"](this.gl.CULL_FACE),this._cullFace&&this._frontFaceDirty&&this.setFrontFace(this._frontFace)}setFrontFace(e){this._frontFace=e,this._frontFaceDirty=!1;const n=this._invertFrontFace?!e:e;this._glFrontFace!==n&&(this._glFrontFace=n,this.gl.frontFace(this.gl[n?"CW":"CCW"]))}setBlendMode(e){if(this.blendModesMap[e]||(e="normal"),e===this.blendMode)return;this.blendMode=e;const n=this.blendModesMap[e],r=this.gl;n.length===2?r.blendFunc(n[0],n[1]):r.blendFuncSeparate(n[0],n[1],n[2],n[3]),n.length===6?(this._blendEq=!0,r.blendEquationSeparate(n[4],n[5])):this._blendEq&&(this._blendEq=!1,r.blendEquationSeparate(r.FUNC_ADD,r.FUNC_ADD))}setPolygonOffset(e,n){this.gl.polygonOffset(e,n)}resetState(){this._glFrontFace=!1,this._frontFace=!1,this._cullFace=!1,this._frontFaceDirty=!1,this._invertFrontFace=!1,this.gl.frontFace(this.gl.CCW),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}_updateCheck(e,n){const r=this.checks.indexOf(e);n&&r===-1?this.checks.push(e):!n&&r!==-1&&this.checks.splice(r,1)}static _checkBlendMode(e,n){e.setBlendMode(n.blendMode)}static _checkPolygonOffset(e,n){e.setPolygonOffset(1,n.polygonOffset)}destroy(){this.gl=null,this.checks.length=0}};
let Kve=Xve;
class Zve{constructor(e){this.target=CY.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=go.UNSIGNED_BYTE,this.internalFormat=CN.RGBA,this.format=CN.RGBA,this.samplerType=0}}
const Jve={id:"buffer",upload(t,e,n){e.width===t.width||e.height===t.height?n.texSubImage2D(n.TEXTURE_2D,0,0,0,t.width,t.height,e.format,e.type,t.resource):n.texImage2D(e.target,0,e.internalFormat,t.width,t.height,0,e.format,e.type,t.resource),e.width=t.width,e.height=t.height}},Pqe={"bc1-rgba-unorm":!0,"bc1-rgba-unorm-srgb":!0,"bc2-rgba-unorm":!0,"bc2-rgba-unorm-srgb":!0,"bc3-rgba-unorm":!0,"bc3-rgba-unorm-srgb":!0,"bc4-r-unorm":!0,"bc4-r-snorm":!0,"bc5-rg-unorm":!0,"bc5-rg-snorm":!0,"bc6h-rgb-ufloat":!0,"bc6h-rgb-float":!0,"bc7-rgba-unorm":!0,"bc7-rgba-unorm-srgb":!0,"etc2-rgb8unorm":!0,"etc2-rgb8unorm-srgb":!0,"etc2-rgb8a1unorm":!0,"etc2-rgb8a1unorm-srgb":!0,"etc2-rgba8unorm":!0,"etc2-rgba8unorm-srgb":!0,"eac-r11unorm":!0,"eac-r11snorm":!0,"eac-rg11unorm":!0,"eac-rg11snorm":!0,"astc-4x4-unorm":!0,"astc-4x4-unorm-srgb":!0,"astc-5x4-unorm":!0,"astc-5x4-unorm-srgb":!0,"astc-5x5-unorm":!0,"astc-5x5-unorm-srgb":!0,"astc-6x5-unorm":!0,"astc-6x5-unorm-srgb":!0,"astc-6x6-unorm":!0,"astc-6x6-unorm-srgb":!0,"astc-8x5-unorm":!0,"astc-8x5-unorm-srgb":!0,"astc-8x6-unorm":!0,"astc-8x6-unorm-srgb":!0,"astc-8x8-unorm":!0,"astc-8x8-unorm-srgb":!0,"astc-10x5-unorm":!0,"astc-10x5-unorm-srgb":!0,"astc-10x6-unorm":!0,"astc-10x6-unorm-srgb":!0,"astc-10x8-unorm":!0,"astc-10x8-unorm-srgb":!0,"astc-10x10-unorm":!0,"astc-10x10-unorm-srgb":!0,"astc-12x10-unorm":!0,"astc-12x10-unorm-srgb":!0,"astc-12x12-unorm":!0,"astc-12x12-unorm-srgb":!0},Qve={id:"compressed",upload(t,e,n){n.pixelStorei(n.UNPACK_ALIGNMENT,4);let r=t.pixelWidth,i=t.pixelHeight;const o=!!Pqe[t.format];for(let s=0;s<t.resource.length;s++){const a=t.resource[s];o?n.compressedTexImage2D(n.TEXTURE_2D,s,e.internalFormat,r,i,0,a):n.texImage2D(n.TEXTURE_2D,s,e.internalFormat,r,i,0,e.format,e.type,a),r=Math.max(r>>1,1),i=Math.max(i>>1,1)}}},VY={id:"image",upload(t,e,n,r){const i=e.width,o=e.height,s=t.pixelWidth,a=t.pixelHeight,l=t.resourceWidth,c=t.resourceHeight;l<s||c<a?((i!==s||o!==a)&&n.texImage2D(e.target,0,e.internalFormat,s,a,0,e.format,e.type,null),r===2?n.texSubImage2D(n.TEXTURE_2D,0,0,0,l,c,e.format,e.type,t.resource):n.texSubImage2D(n.TEXTURE_2D,0,0,0,e.format,e.type,t.resource)):i===s&&o===a?n.texSubImage2D(n.TEXTURE_2D,0,0,0,e.format,e.type,t.resource):r===2?n.texImage2D(e.target,0,e.internalFormat,s,a,0,e.format,e.type,t.resource):n.texImage2D(e.target,0,e.internalFormat,e.format,e.type,t.resource),e.width=s,e.height=a}},ewe={id:"video",upload(t,e,n,r){if(!t.isValid){n.texImage2D(e.target,0,e.internalFormat,1,1,0,e.format,e.type,null);return}VY.upload(t,e,n,r)}},cH={linear:9729,nearest:9728},twe={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},tP={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},nwe={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};
function uH(t,e,n,r,i,o,s,a){const l=o;if(!a||t.addressModeU!=="repeat"||t.addressModeV!=="repeat"||t.addressModeW!=="repeat"){const c=tP[s?"clamp-to-edge":t.addressModeU],u=tP[s?"clamp-to-edge":t.addressModeV],d=tP[s?"clamp-to-edge":t.addressModeW];e[i](l,e.TEXTURE_WRAP_S,c),e[i](l,e.TEXTURE_WRAP_T,u),e.TEXTURE_WRAP_R&&e[i](l,e.TEXTURE_WRAP_R,d)}if((!a||t.magFilter!=="linear")&&e[i](l,e.TEXTURE_MAG_FILTER,cH[t.magFilter]),n){if(!a||t.mipmapFilter!=="linear"){const c=twe[t.minFilter][t.mipmapFilter];e[i](l,e.TEXTURE_MIN_FILTER,c)}}else e[i](l,e.TEXTURE_MIN_FILTER,cH[t.minFilter]);if(r&&t.maxAnisotropy>1){const c=Math.min(t.maxAnisotropy,e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT));e[i](l,r.TEXTURE_MAX_ANISOTROPY_EXT,c)}t.compare&&e[i](l,e.TEXTURE_COMPARE_FUNC,nwe[t.compare])}
function rwe(t){return{r8unorm:t.RED,r8snorm:t.RED,r8uint:t.RED,r8sint:t.RED,r16uint:t.RED,r16sint:t.RED,r16float:t.RED,rg8unorm:t.RG,rg8snorm:t.RG,rg8uint:t.RG,rg8sint:t.RG,r32uint:t.RED,r32sint:t.RED,r32float:t.RED,rg16uint:t.RG,rg16sint:t.RG,rg16float:t.RG,rgba8unorm:t.RGBA,"rgba8unorm-srgb":t.RGBA,rgba8snorm:t.RGBA,rgba8uint:t.RGBA,rgba8sint:t.RGBA,bgra8unorm:t.RGBA,"bgra8unorm-srgb":t.RGBA,rgb9e5ufloat:t.RGB,rgb10a2unorm:t.RGBA,rg11b10ufloat:t.RGB,rg32uint:t.RG,rg32sint:t.RG,rg32float:t.RG,rgba16uint:t.RGBA,rgba16sint:t.RGBA,rgba16float:t.RGBA,rgba32uint:t.RGBA,rgba32sint:t.RGBA,rgba32float:t.RGBA,stencil8:t.STENCIL_INDEX8,depth16unorm:t.DEPTH_COMPONENT,depth24plus:t.DEPTH_COMPONENT,"depth24plus-stencil8":t.DEPTH_STENCIL,depth32float:t.DEPTH_COMPONENT,"depth32float-stencil8":t.DEPTH_STENCIL}}
function iwe(t,e){let n={},r=t.RGBA;return t instanceof qr.get().getWebGLRenderingContext()?e.srgb&&(n={"rgba8unorm-srgb":e.srgb.SRGB8_ALPHA8_EXT,"bgra8unorm-srgb":e.srgb.SRGB8_ALPHA8_EXT}):(n={"rgba8unorm-srgb":t.SRGB8_ALPHA8,"bgra8unorm-srgb":t.SRGB8_ALPHA8},r=t.RGBA8),{r8unorm:t.R8,r8snorm:t.R8_SNORM,r8uint:t.R8UI,r8sint:t.R8I,r16uint:t.R16UI,r16sint:t.R16I,r16float:t.R16F,rg8unorm:t.RG8,rg8snorm:t.RG8_SNORM,rg8uint:t.RG8UI,rg8sint:t.RG8I,r32uint:t.R32UI,r32sint:t.R32I,r32float:t.R32F,rg16uint:t.RG16UI,rg16sint:t.RG16I,rg16float:t.RG16F,rgba8unorm:t.RGBA,...n,rgba8snorm:t.RGBA8_SNORM,rgba8uint:t.RGBA8UI,rgba8sint:t.RGBA8I,bgra8unorm:r,rgb9e5ufloat:t.RGB9_E5,rgb10a2unorm:t.RGB10_A2,rg11b10ufloat:t.R11F_G11F_B10F,rg32uint:t.RG32UI,rg32sint:t.RG32I,rg32float:t.RG32F,rgba16uint:t.RGBA16UI,rgba16sint:t.RGBA16I,rgba16float:t.RGBA16F,rgba32uint:t.RGBA32UI,rgba32sint:t.RGBA32I,rgba32float:t.RGBA32F,stencil8:t.STENCIL_INDEX8,depth16unorm:t.DEPTH_COMPONENT16,depth24plus:t.DEPTH_COMPONENT24,"depth24plus-stencil8":t.DEPTH24_STENCIL8,depth32float:t.DEPTH_COMPONENT32F,"depth32float-stencil8":t.DEPTH32F_STENCIL8,...e.s3tc?{"bc1-rgba-unorm":e.s3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT,"bc2-rgba-unorm":e.s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT,"bc3-rgba-unorm":e.s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT}:{},...e.s3tc_sRGB?{"bc1-rgba-unorm-srgb":e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,"bc2-rgba-unorm-srgb":e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,"bc3-rgba-unorm-srgb":e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}:{},...e.rgtc?{"bc4-r-unorm":e.rgtc.COMPRESSED_RED_RGTC1_EXT,"bc4-r-snorm":e.rgtc.COMPRESSED_SIGNED_RED_RGTC1_EXT,"bc5-rg-unorm":e.rgtc.COMPRESSED_RED_GREEN_RGTC2_EXT,"bc5-rg-snorm":e.rgtc.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}:{},...e.bptc?{"bc6h-rgb-float":e.bptc.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT,"bc6h-rgb-ufloat":e.bptc.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT,"bc7-rgba-unorm":e.bptc.COMPRESSED_RGBA_BPTC_UNORM_EXT,"bc7-rgba-unorm-srgb":e.bptc.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT}:{},...e.etc?{"etc2-rgb8unorm":e.etc.COMPRESSED_RGB8_ETC2,"etc2-rgb8unorm-srgb":e.etc.COMPRESSED_SRGB8_ETC2,"etc2-rgb8a1unorm":e.etc.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2,"etc2-rgb8a1unorm-srgb":e.etc.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2,"etc2-rgba8unorm":e.etc.COMPRESSED_RGBA8_ETC2_EAC,"etc2-rgba8unorm-srgb":e.etc.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC,"eac-r11unorm":e.etc.COMPRESSED_R11_EAC,"eac-rg11unorm":e.etc.COMPRESSED_SIGNED_RG11_EAC}:{},...e.astc?{"astc-4x4-unorm":e.astc.COMPRESSED_RGBA_ASTC_4x4_KHR,"astc-4x4-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR,"astc-5x4-unorm":e.astc.COMPRESSED_RGBA_ASTC_5x4_KHR,"astc-5x4-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR,"astc-5x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_5x5_KHR,"astc-5x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR,"astc-6x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_6x5_KHR,"astc-6x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR,"astc-6x6-unorm":e.astc.COMPRESSED_RGBA_ASTC_6x6_KHR,"astc-6x6-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR,"astc-8x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_8x5_KHR,"astc-8x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR,"astc-8x6-unorm":e.astc.COMPRESSED_RGBA_ASTC_8x6_KHR,"astc-8x6-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR,"astc-8x8-unorm":e.astc.COMPRESSED_RGBA_ASTC_8x8_KHR,"astc-8x8-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR,"astc-10x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x5_KHR,"astc-10x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR,"astc-10x6-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x6_KHR,"astc-10x6-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR,"astc-10x8-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x8_KHR,"astc-10x8-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR,"astc-10x10-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x10_KHR,"astc-10x10-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR,"astc-12x10-unorm":e.astc.COMPRESSED_RGBA_ASTC_12x10_KHR,"astc-12x10-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR,"astc-12x12-unorm":e.astc.COMPRESSED_RGBA_ASTC_12x12_KHR,"astc-12x12-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR}:{}}}
function owe(t){return{r8unorm:t.UNSIGNED_BYTE,r8snorm:t.BYTE,r8uint:t.UNSIGNED_BYTE,r8sint:t.BYTE,r16uint:t.UNSIGNED_SHORT,r16sint:t.SHORT,r16float:t.HALF_FLOAT,rg8unorm:t.UNSIGNED_BYTE,rg8snorm:t.BYTE,rg8uint:t.UNSIGNED_BYTE,rg8sint:t.BYTE,r32uint:t.UNSIGNED_INT,r32sint:t.INT,r32float:t.FLOAT,rg16uint:t.UNSIGNED_SHORT,rg16sint:t.SHORT,rg16float:t.HALF_FLOAT,rgba8unorm:t.UNSIGNED_BYTE,"rgba8unorm-srgb":t.UNSIGNED_BYTE,rgba8snorm:t.BYTE,rgba8uint:t.UNSIGNED_BYTE,rgba8sint:t.BYTE,bgra8unorm:t.UNSIGNED_BYTE,"bgra8unorm-srgb":t.UNSIGNED_BYTE,rgb9e5ufloat:t.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:t.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:t.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:t.UNSIGNED_INT,rg32sint:t.INT,rg32float:t.FLOAT,rgba16uint:t.UNSIGNED_SHORT,rgba16sint:t.SHORT,rgba16float:t.HALF_FLOAT,rgba32uint:t.UNSIGNED_INT,rgba32sint:t.INT,rgba32float:t.FLOAT,stencil8:t.UNSIGNED_BYTE,depth16unorm:t.UNSIGNED_SHORT,depth24plus:t.UNSIGNED_INT,"depth24plus-stencil8":t.UNSIGNED_INT_24_8,depth32float:t.FLOAT,"depth32float-stencil8":t.FLOAT_32_UNSIGNED_INT_24_8_REV}}
function Nqe(t){t instanceof Uint8ClampedArray&&(t=new Uint8Array(t.buffer));const e=t.length;for(let n=0;n<e;n+=4){const r=t[n+3];if(r!==0){const i=255.001/r;t[n]=t[n]*i+.5,t[n+1]=t[n+1]*i+.5,t[n+2]=t[n+2]*i+.5}}}
const Rqe=4;
class qY{constructor(e){this.managedTextures=[],this._glTextures=Object.create(null),this._glSamplers=Object.create(null),this._boundTextures=[],this._activeTextureLocation=-1,this._boundSamplers=Object.create(null),this._uploads={image:VY,buffer:Jve,video:ewe,compressed:Qve},this._premultiplyAlpha=!1,this._useSeparateSamplers=!1,this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_glTextures"),this._renderer.renderableGC.addManagedHash(this,"_glSamplers")}contextChange(e){this._gl=e,this._mapFormatToInternalFormat||(this._mapFormatToInternalFormat=iwe(e,this._renderer.context.extensions),this._mapFormatToType=owe(e),this._mapFormatToFormat=rwe(e)),this._glTextures=Object.create(null),this._glSamplers=Object.create(null),this._boundSamplers=Object.create(null),this._premultiplyAlpha=!1;for(let n=0;n<16;n++)this.bind(fn.EMPTY,n)}initSource(e){this.bind(e)}bind(e,n=0){const r=e.source;e?(this.bindSource(r,n),this._useSeparateSamplers&&this._bindSampler(r.style,n)):(this.bindSource(null,n),this._useSeparateSamplers&&this._bindSampler(null,n))}bindSource(e,n=0){const r=this._gl;if(e._touched=this._renderer.textureGC.count,this._boundTextures[n]!==e){this._boundTextures[n]=e,this._activateLocation(n),e||(e=fn.EMPTY.source);const i=this.getGlSource(e);r.bindTexture(i.target,i.texture)}}_bindSampler(e,n=0){const r=this._gl;if(!e){this._boundSamplers[n]=null,r.bindSampler(n,null);return}const i=this._getGlSampler(e);this._boundSamplers[n]!==i&&(this._boundSamplers[n]=i,r.bindSampler(n,i))}unbind(e){const n=e.source,r=this._boundTextures,i=this._gl;for(let o=0;o<r.length;o++)if(r[o]===n){this._activateLocation(o);const s=this.getGlSource(n);i.bindTexture(s.target,null),r[o]=null}}_activateLocation(e){this._activeTextureLocation!==e&&(this._activeTextureLocation=e,this._gl.activeTexture(this._gl.TEXTURE0+e))}_initSource(e){const n=this._gl,r=new Zve(n.createTexture());if(r.type=this._mapFormatToType[e.format],r.internalFormat=this._mapFormatToInternalFormat[e.format],r.format=this._mapFormatToFormat[e.format],e.autoGenerateMipmaps&&(this._renderer.context.supports.nonPowOf2mipmaps||e.isPowerOfTwo)){const i=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(i))+1}return this._glTextures[e.uid]=r,this.managedTextures.includes(e)||(e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceUpdate,this),e.on("styleChange",this.onStyleChange,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),e.on("updateMipmaps",this.onUpdateMipmaps,this),this.managedTextures.push(e)),this.onSourceUpdate(e),this.updateStyle(e,!1),r}onStyleChange(e){this.updateStyle(e,!1)}updateStyle(e,n){const r=this._gl,i=this.getGlSource(e);r.bindTexture(r.TEXTURE_2D,i.texture),this._boundTextures[this._activeTextureLocation]=e,uH(e.style,r,e.mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"texParameteri",r.TEXTURE_2D,!this._renderer.context.supports.nonPowOf2wrapping&&!e.isPowerOfTwo,n)}onSourceUnload(e){const n=this._glTextures[e.uid];n&&(this.unbind(e),this._glTextures[e.uid]=null,this._gl.deleteTexture(n.texture))}onSourceUpdate(e){const n=this._gl,r=this.getGlSource(e);n.bindTexture(n.TEXTURE_2D,r.texture),this._boundTextures[this._activeTextureLocation]=e;const i=e.alphaMode==="premultiply-alpha-on-upload";this._premultiplyAlpha!==i&&(this._premultiplyAlpha=i,n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i)),this._uploads[e.uploadMethodId]?this._uploads[e.uploadMethodId].upload(e,r,n,this._renderer.context.webGLVersion):n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e.pixelWidth,e.pixelHeight,0,n.RGBA,n.UNSIGNED_BYTE,null),e.autoGenerateMipmaps&&e.mipLevelCount>1&&this.onUpdateMipmaps(e,!1)}onUpdateMipmaps(e,n=!0){n&&this.bindSource(e,0);const r=this.getGlSource(e);this._gl.generateMipmap(r.target)}onSourceDestroy(e){e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this),e.off("resize",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),e.off("styleChange",this.onStyleChange,this),e.off("updateMipmaps",this.onUpdateMipmaps,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}_initSampler(e){const n=this._gl,r=this._gl.createSampler();return this._glSamplers[e._resourceId]=r,uH(e,n,this._boundTextures[this._activeTextureLocation].mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"samplerParameteri",r,!1,!0),this._glSamplers[e._resourceId]}_getGlSampler(e){return this._glSamplers[e._resourceId]||this._initSampler(e)}getGlSource(e){return this._glTextures[e.uid]||this._initSource(e)}generateCanvas(e){const{pixels:n,width:r,height:i}=this.getPixels(e),o=qr.get().createCanvas();o.width=r,o.height=i;const s=o.getContext("2d");if(s){const a=s.createImageData(r,i);a.data.set(n),s.putImageData(a,0,0)}return o}getPixels(e){const n=e.source.resolution,r=e.frame,i=Math.max(Math.round(r.width*n),1),o=Math.max(Math.round(r.height*n),1),s=new Uint8Array(Rqe*i*o),a=this._renderer,l=a.renderTarget.getRenderTarget(e),c=a.renderTarget.getGpuRenderTarget(l),u=a.gl;return u.bindFramebuffer(u.FRAMEBUFFER,c.resolveTargetFramebuffer),u.readPixels(Math.round(r.x*n),Math.round(r.y*n),i,o,u.RGBA,u.UNSIGNED_BYTE,s),{pixels:new Uint8ClampedArray(s.buffer),width:i,height:o}}destroy(){this.managedTextures.slice().forEach(e=>this.onSourceDestroy(e)),this.managedTextures=null,this._renderer=null}resetState(){this._activeTextureLocation=-1,this._boundTextures.fill(fn.EMPTY.source),this._boundSamplers=Object.create(null);const e=this._gl;this._premultiplyAlpha=!1,e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this._premultiplyAlpha)}}
class WY{contextChange(e){const n=new il({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new dn,type:"mat3x3<f32>"},uRound:{value:0,type:"f32"}}),r=e.limits.maxBatchableTextures,i=K5({name:"graphics",bits:[SI,CI(r),LI,J5]});this.shader=new sf({glProgram:i,resources:{localUniforms:n,batchSamplers:AI(r)}})}execute(e,n){const r=n.context,i=r.customShader||this.shader,o=e.renderer,s=o.graphicsContext,{batcher:a,instructions:l}=s.getContextRenderData(r);i.groups[0]=o.globalUniforms.bindGroup,o.state.set(e.state),o.shader.bind(i),o.geometry.bind(a.geometry,i.glProgram);const c=l.instructions;for(let u=0;u<l.instructionSize;u++){const d=c[u];if(d.size){for(let h=0;h<d.textures.count;h++)o.texture.bind(d.textures.textures[h],h);o.geometry.draw(d.topology,d.size,d.start)}}}destroy(){this.shader.destroy(!0),this.shader=null}}
class $Y{init(){const e=K5({name:"mesh",bits:[LI,vve,J5]});this._shader=new sf({glProgram:e,resources:{uTexture:fn.EMPTY.source,textureUniforms:{uTextureMatrix:{type:"mat3x3<f32>",value:new dn}}}})}execute(e,n){const r=e.renderer;let i=n._shader;if(i){if(!i.glProgram){er("Mesh shader has no glProgram",n.shader);return}}else{i=this._shader;const o=n.texture,s=o.source;i.resources.uTexture=s,i.resources.uSampler=s.style,i.resources.textureUniforms.uniforms.uTextureMatrix=o.textureMatrix.mapCoord}i.groups[100]=r.globalUniforms.bindGroup,i.groups[101]=e.localUniformsBindGroup,r.encoder.draw({geometry:n._geometry,shader:i,state:n.state})}destroy(){this._shader.destroy(!0),this._shader=null}}
class YY{constructor(e){this._renderer=e}updateRenderable(){}destroyRenderable(){}validateRenderable(){return!1}addRenderable(e,n){this._renderer.renderPipes.batch.break(n),n.add(e)}execute(e){e.isRenderable&&e.render(this._renderer)}destroy(){this._renderer=null}}
class c8{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}destroy(){}}
function EN(t,e){const n=t.instructionSet,r=n.instructions;for(let i=0;i<n.instructionSize;i++){const o=r[i];e[o.renderPipeId].execute(o)}}
const Iqe=new dn;
class XY{constructor(e){this._renderer=e}addRenderGroup(e,n){e.isCachedAsTexture?this._addRenderableCacheAsTexture(e,n):this._addRenderableDirect(e,n)}execute(e){e.isRenderable&&(e.isCachedAsTexture?this._executeCacheAsTexture(e):this._executeDirect(e))}destroy(){this._renderer=null}_addRenderableDirect(e,n){this._renderer.renderPipes.batch.break(n),e._batchableRenderGroup&&(cc.return(e._batchableRenderGroup),e._batchableRenderGroup=null),n.add(e)}_addRenderableCacheAsTexture(e,n){const r=e._batchableRenderGroup??(e._batchableRenderGroup=cc.get(c8));r.renderable=e.root,r.transform=e.root.relativeGroupTransform,r.texture=e.texture,r.bounds=e._textureBounds,n.add(e),this._renderer.renderPipes.batch.addToBatch(r,n)}_executeCacheAsTexture(e){if(e.textureNeedsUpdate){e.textureNeedsUpdate=!1;const n=Iqe.identity().translate(-e._textureBounds.x,-e._textureBounds.y);this._renderer.renderTarget.push(e.texture,!0,null,e.texture.frame),this._renderer.globalUniforms.push({worldTransformMatrix:n,worldColor:4294967295}),EN(e,this._renderer.renderPipes),this._renderer.renderTarget.finishRenderPass(),this._renderer.renderTarget.pop(),this._renderer.globalUniforms.pop()}e._batchableRenderGroup._batcher.updateElement(e._batchableRenderGroup),e._batchableRenderGroup._batcher.geometry.buffers[0].update()}_executeDirect(e){this._renderer.globalUniforms.push({worldTransformMatrix:e.inverseParentTextureTransform,worldColor:e.worldColorAlpha}),EN(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop()}}
function TN(t,e){e||(e=0);for(let n=e;n<t.length&&t[n];n++)t[n]=null}
const Oqe=new la,kre=mS|LA|fI;
function KY(t,e=!1){swe(t);const n=t.childrenToUpdate,r=t.updateTick++;for(const i in n){const o=Number(i),s=n[i],a=s.list,l=s.index;for(let c=0;c<l;c++){const u=a[c];u.parentRenderGroup===t&&u.relativeRenderGroupDepth===o&&ZY(u,r,0)}TN(a,l),s.index=0}if(e)for(let i=0;i<t.renderGroupChildren.length;i++)KY(t.renderGroupChildren[i],e)}
function swe(t){const e=t.root;let n;if(t.renderGroupParent){const r=t.renderGroupParent;t.worldTransform.appendFrom(e.relativeGroupTransform,r.worldTransform),t.worldColor=DA(e.groupColor,r.worldColor),n=e.groupAlpha*r.worldAlpha}else t.worldTransform.copyFrom(e.localTransform),t.worldColor=e.localColor,n=e.localAlpha;n=n<0?0:n>1?1:n,t.worldAlpha=n,t.worldColorAlpha=t.worldColor+((n*255|0)<<24)}
function ZY(t,e,n){if(e===t.updateTick)return;t.updateTick=e,t.didChange=!1;const r=t.localTransform;t.updateLocalTransform();const i=t.parent;if(i&&!i.renderGroup?(n|=t._updateFlags,t.relativeGroupTransform.appendFrom(r,i.relativeGroupTransform),n&kre&&Cre(t,i,n)):(n=t._updateFlags,t.relativeGroupTransform.copyFrom(r),n&kre&&Cre(t,Oqe,n)),!t.renderGroup){const o=t.children,s=o.length;for(let c=0;c<s;c++)ZY(o[c],e,n);const a=t.parentRenderGroup,l=t;l.renderPipeId&&!a.structureDidChange&&a.updateRenderable(l)}}
function Cre(t,e,n){if(n&LA){t.groupColor=DA(t.localColor,e.groupColor);let r=t.localAlpha*e.groupAlpha;r=r<0?0:r>1?1:r,t.groupAlpha=r,t.groupColorAlpha=t.groupColor+((r*255|0)<<24)}n&fI&&(t.groupBlendMode=t.localBlendMode==="inherit"?e.groupBlendMode:t.localBlendMode),n&mS&&(t.globalDisplayStatus=t.localDisplayStatus&e.globalDisplayStatus),t._updateFlags=0}
function awe(t,e){const{list:n,index:r}=t.childrenRenderablesToUpdate;let i=!1;for(let o=0;o<r;o++){const s=n[o];if(i=e[s.renderPipeId].validateRenderable(s),i)break}return t.structureDidChange=i,i}
const Dqe=new dn;
class JY{constructor(e){this._renderer=e}render({container:e,transform:n}){const r=e.parent,i=e.renderGroup.renderGroupParent;e.parent=null,e.renderGroup.renderGroupParent=null;const o=this._renderer;let s=Dqe;n&&(s=s.copyFrom(e.renderGroup.localTransform),e.renderGroup.localTransform.copyFrom(n));const a=o.renderPipes;this._updateCachedRenderGroups(e.renderGroup,null),this._updateRenderGroups(e.renderGroup),o.globalUniforms.start({worldTransformMatrix:n?e.renderGroup.localTransform:e.renderGroup.worldTransform,worldColor:e.renderGroup.worldColorAlpha}),EN(e.renderGroup,a),a.uniformBatch&&a.uniformBatch.renderEnd(),n&&e.renderGroup.localTransform.copyFrom(s),e.parent=r,e.renderGroup.renderGroupParent=i}destroy(){this._renderer=null}_updateCachedRenderGroups(e,n){if(e.isCachedAsTexture){if(!e.updateCacheTexture)return;n=e}e._parentCacheAsTextureRenderGroup=n;for(let r=e.renderGroupChildren.length-1;r>=0;r--)this._updateCachedRenderGroups(e.renderGroupChildren[r],n);if(e.invalidateMatrices(),e.isCachedAsTexture){if(e.textureNeedsUpdate){const r=e.root.getLocalBounds();r.ceil();const i=e.texture;e.texture&&Qa.returnTexture(e.texture,!0);const o=this._renderer,s=e.textureOptions.resolution||o.view.resolution,a=e.textureOptions.antialias??o.view.antialias,l=e.textureOptions.scaleMode??"linear",c=Qa.getOptimalTexture(r.width,r.height,s,a);c._source.style=new Jh({scaleMode:l}),e.texture=c,e._textureBounds||(e._textureBounds=new Rc),e._textureBounds.copyFrom(r),i!==e.texture&&e.renderGroupParent&&(e.renderGroupParent.structureDidChange=!0)}}else e.texture&&(Qa.returnTexture(e.texture,!0),e.texture=null)}_updateRenderGroups(e){const n=this._renderer,r=n.renderPipes;if(e.runOnRender(n),e.instructionSet.renderPipes=r,e.structureDidChange?TN(e.childrenRenderablesToUpdate.list,0):awe(e,r),KY(e),e.structureDidChange?(e.structureDidChange=!1,this._buildInstructions(e,n)):this._updateRenderables(e),e.childrenRenderablesToUpdate.index=0,n.renderPipes.batch.upload(e.instructionSet),!(e.isCachedAsTexture&&!e.textureNeedsUpdate))for(let i=0;i<e.renderGroupChildren.length;i++)this._updateRenderGroups(e.renderGroupChildren[i])}_updateRenderables(e){const{list:n,index:r}=e.childrenRenderablesToUpdate;for(let i=0;i<r;i++){const o=n[i];o.didViewUpdate&&e.updateRenderable(o)}TN(n,r)}_buildInstructions(e,n){const r=e.root,i=e.instructionSet;i.reset();const o=n.renderPipes?n:n.batch.renderer,s=o.renderPipes;s.batch.buildStart(i),s.blendMode.buildStart(),s.colorMask.buildStart(),r.sortableChildren&&r.sortChildren(),r.collectRenderablesWithEffects(i,o,null),s.batch.buildEnd(i),s.blendMode.buildEnd(i)}}
class QY{constructor(e){this._renderer=e}addRenderable(e,n){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,n)}updateRenderable(e){const n=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,n),n._batcher.updateElement(n)}validateRenderable(e){const n=this._getGpuSprite(e);return!n._batcher.checkAndUpdateTexture(n,e._texture)}_updateBatchableSprite(e,n){n.bounds=e.visualBounds,n.texture=e._texture}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const n=new c8;return n.renderable=e,n.transform=e.groupTransform,n.texture=e._texture,n.bounds=e.visualBounds,n.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=n,n}destroy(){this._renderer=null}}
const eX=class lwe{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new co(0),this.color=this._backgroundColor,this.alpha=1}init(e){e={...lwe.defaultOptions,...e},this.clearBeforeRender=e.clearBeforeRender,this.color=e.background||e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha,this._backgroundColor.setAlpha(e.backgroundAlpha)}get color(){return this._backgroundColor}set color(e){co.shared.setValue(e).alpha<1&&this._backgroundColor.alpha===1&&er("Cannot set a transparent background on an opaque canvas. To enable transparency, set backgroundAlpha < 1 when initializing your Application."),this._backgroundColor.setValue(e)}get alpha(){return this._backgroundColor.alpha}set alpha(e){this._backgroundColor.setAlpha(e)}get colorRgba(){return this._backgroundColor.toArray()}destroy(){}};
let cwe=eX;
const VC={};
let dwe=nX;
class FI extends fn{static create(e){return new FI({source:new Ea(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}
const Lqe=new Xo,Bqe=new Rc,Fqe=[0,0,0,0];
class rX{constructor(e){this._renderer=e}generateTexture(e){var c;e instanceof la&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const n=e.resolution||this._renderer.resolution,r=e.antialias||this._renderer.view.antialias,i=e.target;let o=e.clearColor;o?o=Array.isArray(o)&&o.length===4?o:co.shared.setValue(o).toArray():o=Fqe;const s=((c=e.frame)==null?void 0:c.copyTo(Lqe))||hI(i,Bqe).rectangle;s.width=Math.max(s.width,1/n)|0,s.height=Math.max(s.height,1/n)|0;const a=FI.create({...e.textureSourceOptions,width:s.width,height:s.height,resolution:n,antialias:r}),l=dn.shared.translate(-s.x,-s.y);return this._renderer.render({container:i,transform:l,target:a,clearColor:o}),a.source.updateMipmaps(),a}destroy(){this._renderer=null}}
function jqe(t,e,n,r){n[r++]=(t>>16&255)/255,n[r++]=(t>>8&255)/255,n[r++]=(t&255)/255,n[r++]=e}
function e3(t,e,n){const r=(t>>24&255)/255;e[n++]=(t&255)/255*r,e[n++]=(t>>8&255)/255*r,e[n++]=(t>>16&255)/255*r,e[n++]=r}
class iX{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({size:e,projectionMatrix:n,worldTransformMatrix:r,worldColor:i,offset:o}){const s=this._renderer.renderTarget.renderTarget,a=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{worldTransformMatrix:new dn,worldColor:4294967295,offset:new rr},l={projectionMatrix:n||this._renderer.renderTarget.projectionMatrix,resolution:e||s.size,worldTransformMatrix:r||a.worldTransformMatrix,worldColor:i||a.worldColor,offset:o||a.offset,bindGroup:null},c=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(c);const u=c.uniforms;u.uProjectionMatrix=l.projectionMatrix,u.uResolution=l.resolution,u.uWorldTransformMatrix.copyFrom(l.worldTransformMatrix),u.uWorldTransformMatrix.tx-=l.offset.x,u.uWorldTransformMatrix.ty-=l.offset.y,e3(l.worldColor,u.uWorldColorAlpha,0),c.update();let d;this._renderer.renderPipes.uniformBatch?d=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(c,!1):(d=this._bindGroupPool.pop()||new Jg,this._activeBindGroups.push(d),d.setResource(c,0)),l.bindGroup=d,this._currentGlobalUniformData=l}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1],this._renderer.type===Zd.WEBGL&&this._currentGlobalUniformData.bindGroup.resources[0].update()}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get globalUniformData(){return this._currentGlobalUniformData}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new il({uProjectionMatrix:{value:new dn,type:"mat3x3<f32>"},uWorldTransformMatrix:{value:new dn,type:"mat3x3<f32>"},uWorldColorAlpha:{value:new Float32Array(4),type:"vec4<f32>"},uResolution:{value:[0,0],type:"vec2<f32>"}},{isStatic:!0})}destroy(){this._renderer=null}}
let zqe=1;
class oX{constructor(){this._tasks=[],this._offset=0}init(){Cl.system.add(this._update,this)}repeat(e,n,r=!0){const i=zqe++;let o=0;return r&&(this._offset+=1e3,o=this._offset),this._tasks.push({func:e,duration:n,start:performance.now(),offset:o,last:performance.now(),repeat:!0,id:i}),i}cancel(e){for(let n=0;n<this._tasks.length;n++)if(this._tasks[n].id===e){this._tasks.splice(n,1);return}}_update(){const e=performance.now();for(let n=0;n<this._tasks.length;n++){const r=this._tasks[n];if(e-r.offset-r.last>=r.duration){const i=e-r.start;r.func(i),r.last=e}}}destroy(){Cl.system.remove(this._update,this),this._tasks.length=0}}
let Are=!1;
function hwe(t){if(!Are){if(qr.get().getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${UA} (${t}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${UA} - ${t} - http://www.pixijs.com/`);Are=!0}}
class jI{constructor(e){this._renderer=e}init(e){if(e.hello){let n=this._renderer.name;this._renderer.type===Zd.WEBGL&&(n+=` ${this._renderer.context.webGLVersion}`),hwe(n)}}}
function fwe(t){let e=!1;for(const r in t)if(t[r]==null){e=!0;break}if(!e)return t;const n=Object.create(null);for(const r in t){const i=t[r];i&&(n[r]=i)}return n}
function pwe(t){let e=0;for(let n=0;n<t.length;n++)t[n]==null?e++:t[n-e]=t[n];return t.length-=e,t}
let Uqe=0;
const sX=class mwe{constructor(e){this._managedRenderables=[],this._managedHashes=[],this._managedArrays=[],this._renderer=e}init(e){e={...mwe.defaultOptions,...e},this.maxUnusedTime=e.renderableGCMaxUnusedTime,this._frequency=e.renderableGCFrequency,this.enabled=e.renderableGCActive}get enabled(){return!!this._handler}set enabled(e){this.enabled!==e&&(e?(this._handler=this._renderer.scheduler.repeat(()=>this.run(),this._frequency,!1),this._hashHandler=this._renderer.scheduler.repeat(()=>{for(const n of this._managedHashes)n.context[n.hash]=fwe(n.context[n.hash])},this._frequency),this._arrayHandler=this._renderer.scheduler.repeat(()=>{for(const n of this._managedArrays)pwe(n.context[n.hash])},this._frequency)):(this._renderer.scheduler.cancel(this._handler),this._renderer.scheduler.cancel(this._hashHandler),this._renderer.scheduler.cancel(this._arrayHandler)))}addManagedHash(e,n){this._managedHashes.push({context:e,hash:n})}addManagedArray(e,n){this._managedArrays.push({context:e,hash:n})}prerender({container:e}){this._now=performance.now(),e.renderGroup.gcTick=Uqe++,this._updateInstructionGCTick(e.renderGroup,e.renderGroup.gcTick)}addRenderable(e){this.enabled&&(e._lastUsed===-1&&(this._managedRenderables.push(e),e.once("destroyed",this._removeRenderable,this)),e._lastUsed=this._now)}run(){var o;const e=this._now,n=this._managedRenderables,r=this._renderer.renderPipes;let i=0;for(let s=0;s<n.length;s++){const a=n[s];if(a===null){i++;continue}const l=a.renderGroup??a.parentRenderGroup,c=((o=l==null?void 0:l.instructionSet)==null?void 0:o.gcTick)??-1;if(((l==null?void 0:l.gcTick)??0)===c&&(a._lastUsed=e),e-a._lastUsed>this.maxUnusedTime){if(!a.destroyed){const u=r;l&&(l.structureDidChange=!0),u[a.renderPipeId].destroyRenderable(a)}a._lastUsed=-1,i++,a.off("destroyed",this._removeRenderable,this)}else n[s-i]=a}n.length-=i}destroy(){this.enabled=!1,this._renderer=null,this._managedRenderables.length=0,this._managedHashes.length=0,this._managedArrays.length=0}_removeRenderable(e){const n=this._managedRenderables.indexOf(e);n>=0&&(e.off("destroyed",this._removeRenderable,this),this._managedRenderables[n]=null)}_updateInstructionGCTick(e,n){e.instructionSet.gcTick=n;for(const r of e.renderGroupChildren)this._updateInstructionGCTick(r,n)}};
let gwe=sX;
const aX=class ywe{constructor(e){this._renderer=e,this.count=0,this.checkCount=0}init(e){e={...ywe.defaultOptions,...e},this.checkCountMax=e.textureGCCheckCountMax,this.maxIdle=e.textureGCAMaxIdle??e.textureGCMaxIdle,this.active=e.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const e=this._renderer.texture.managedTextures;for(let n=0;n<e.length;n++){const r=e[n];r.autoGarbageCollect&&r.resource&&r._touched>-1&&this.count-r._touched>this.maxIdle&&(r._touched=-1,r.unload())}}destroy(){this._renderer=null}};
let bwe=aX;
const lX=class vwe{get autoDensity(){return this.texture.source.autoDensity}set autoDensity(e){this.texture.source.autoDensity=e}get resolution(){return this.texture.source._resolution}set resolution(e){this.texture.source.resize(this.texture.source.width,this.texture.source.height,e)}init(e){e={...vwe.defaultOptions,...e},e.view&&(zn(Vr,"ViewSystem.view has been renamed to ViewSystem.canvas"),e.canvas=e.view),this.screen=new Xo(0,0,e.width,e.height),this.canvas=e.canvas||qr.get().createCanvas(),this.antialias=!!e.antialias,this.texture=BY(this.canvas,e),this.renderTarget=new AN({colorTextures:[this.texture],depth:!!e.depth,isRoot:!0}),this.texture.source.transparent=e.backgroundAlpha<1,this.resolution=e.resolution}resize(e,n,r){this.texture.source.resize(e,n,r),this.screen.width=this.texture.frame.width,this.screen.height=this.texture.frame.height}destroy(e=!1){(typeof e=="boolean"?e:!!(e!=null&&e.removeView))&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};
let wwe=lX;
const cX=[cwe,iX,jI,wwe,JY,bwe,rX,dwe,z$,gwe,oX],uX=[tX,bY,QY,XY,vY,xY,wY,YY],Gqe=[...cX,LY,Ave,_ve,PY,_Y,qY,jY,AY,HY,GY,MY,Kve,NY,TY],Hqe=[...uX],Vqe=[mY,$Y,WY],xwe=[],_we=[],Swe=[];
class kwe extends e8{constructor(){const e={name:"webgl",type:Zd.WEBGL,systems:xwe,renderPipes:_we,renderPipeAdaptors:Swe};super(e)}}
const qqe=Object.freeze(Object.defineProperty({__proto__:null,WebGLRenderer:kwe},Symbol.toStringTag,{value:"Module"}));
class dX{constructor(e){this._hash=Object.create(null),this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_hash")}contextChange(e){this._gpu=e}getBindGroup(e,n,r){return e._updateKey(),this._hash[e._key]||this._createBindGroup(e,n,r)}_createBindGroup(e,n,r){const i=this._gpu.device,o=n.layout[r],s=[],a=this._renderer;for(const u in o){const d=e.resources[u]??e.resources[o[u]];let h;if(d._resourceType==="uniformGroup"){const p=d;a.ubo.updateUniformGroup(p);const g=p.buffer;h={buffer:a.buffer.getGPUBuffer(g),offset:0,size:g.descriptor.size}}else if(d._resourceType==="buffer"){const p=d;h={buffer:a.buffer.getGPUBuffer(p),offset:0,size:p.descriptor.size}}else if(d._resourceType==="bufferResource"){const p=d;h={buffer:a.buffer.getGPUBuffer(p.buffer),offset:p.offset,size:p.size}}else if(d._resourceType==="textureSampler"){const p=d;h=a.texture.getGpuSampler(p)}else if(d._resourceType==="textureSource"){const p=d;h=a.texture.getGpuSource(p).createView({})}s.push({binding:o[u],resource:h})}const l=a.shader.getProgramData(n).bindGroups[r],c=i.createBindGroup({layout:l,entries:s});return this._hash[e._key]=c,c}destroy(){for(const e of Object.keys(this._hash))this._hash[e]=null;this._hash=null,this._renderer=null}}
class hX{constructor(e){this._gpuBuffers=Object.create(null),this._managedBuffers=[],e.renderableGC.addManagedHash(this,"_gpuBuffers")}contextChange(e){this._gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){const n=this._gpuBuffers[e.uid]||this.createGPUBuffer(e),r=e.data;return e._updateID&&r&&(e._updateID=0,this._gpu.device.queue.writeBuffer(n,0,r.buffer,0,(e._updateSize||r.byteLength)+3&-4)),n}destroyAll(){for(const e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){this._gpuBuffers[e.uid]||(e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),this._managedBuffers.push(e));const n=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(xN(e.data.buffer,n.getMappedRange()),n.unmap()),this._gpuBuffers[e.uid]=n,n}onBufferChange(e){this._gpuBuffers[e.uid].destroy(),e._updateID=0,this._gpuBuffers[e.uid]=this.createGPUBuffer(e)}onBufferDestroy(e){this._managedBuffers.splice(this._managedBuffers.indexOf(e),1),this._destroyBuffer(e)}destroy(){this._managedBuffers.forEach(e=>this._destroyBuffer(e)),this._managedBuffers=null,this._gpuBuffers=null}_destroyBuffer(e){this._gpuBuffers[e.uid].destroy(),e.off("update",this.updateBuffer,this),e.off("change",this.onBufferChange,this),e.off("destroy",this.onBufferDestroy,this),this._gpuBuffers[e.uid]=null}}
class Cwe{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const n=this.byteIndex;let r=n+e*4;if(r=Math.ceil(r/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,r>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=r,n}addGroup(e){const n=this.addEmptyGroup(e.length);for(let r=0;r<e.length;r++)this.data[n/4+r]=e[r];return n}destroy(){this.data=null}}
class fX{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){this._renderer=null,this._colorMaskCache=null}}
class zI{constructor(e){this._renderer=e}async init(e){return this._initPromise?this._initPromise:(this._initPromise=(e.gpu?Promise.resolve(e.gpu):this._createDeviceAndAdaptor(e)).then(n=>{this.gpu=n,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async _createDeviceAndAdaptor(e){const n=await qr.get().getNavigator().gpu.requestAdapter({powerPreference:e.powerPreference,forceFallbackAdapter:e.forceFallbackAdapter}),r=["texture-compression-bc","texture-compression-astc","texture-compression-etc2"].filter(o=>n.features.has(o)),i=await n.requestDevice({requiredFeatures:r});return{adapter:n,device:i}}destroy(){this.gpu=null,this._renderer=null}}
class pX{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}renderStart(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e){this.endRenderPass(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(e.descriptor)}endRenderPass(){this.renderPassEncoder&&this.renderPassEncoder.end(),this.renderPassEncoder=null}setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,n,r,i){const o=this._renderer.pipeline.getPipeline(e,n,r,i);this.setPipeline(o)}setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,n){this._boundVertexBuffer[e]!==n&&(this._boundVertexBuffer[e]=n,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(n)))}_setIndexBuffer(e){if(this._boundIndexBuffer===e)return;this._boundIndexBuffer=e;const n=e.data.BYTES_PER_ELEMENT===2?"uint16":"uint32";this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),n)}resetBindGroup(e){this._boundBindGroup[e]=null}setBindGroup(e,n,r){if(this._boundBindGroup[e]===n)return;this._boundBindGroup[e]=n,n._touch(this._renderer.textureGC.count);const i=this._renderer.bindGroup.getBindGroup(n,r,e);this.renderPassEncoder.setBindGroup(e,i)}setGeometry(e,n){const r=this._renderer.pipeline.getBufferNamesToBind(e,n);for(const i in r)this._setVertexBuffer(i,e.attributes[r[i]].buffer);e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,n){for(const r in e.groups){const i=e.groups[r];n||this._syncBindGroup(i),this.setBindGroup(r,i,e.gpuProgram)}}_syncBindGroup(e){for(const n in e.resources){const r=e.resources[n];r.isUniformGroup&&this._renderer.ubo.updateUniformGroup(r)}}draw(e){const{geometry:n,shader:r,state:i,topology:o,size:s,start:a,instanceCount:l,skipSync:c}=e;this.setPipelineFromGeometryProgramAndState(n,r.gpuProgram,i,o),this.setGeometry(n,r.gpuProgram),this._setShaderBindGroups(r,c),n.indexBuffer?this.renderPassEncoder.drawIndexed(s||n.indexBuffer.data.length,l??n.instanceCount,a||0):this.renderPassEncoder.draw(s||n.getSize(),l??n.instanceCount,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished(),this.commandEncoder=null}restoreRenderPass(){const e=this._renderer.renderTarget.adaptor.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const n=this._boundPipeline,r={...this._boundVertexBuffer},i=this._boundIndexBuffer,o={...this._boundBindGroup};this._clearCache();const s=this._renderer.renderTarget.viewport;this.renderPassEncoder.setViewport(s.x,s.y,s.width,s.height,0,1),this.setPipeline(n);for(const a in r)this._setVertexBuffer(a,r[a]);for(const a in o)this.setBindGroup(a,o[a],null);this._setIndexBuffer(i)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){this._renderer=null,this._gpu=null,this._boundBindGroup=null,this._boundVertexBuffer=null,this._boundIndexBuffer=null,this._boundPipeline=null}contextChange(e){this._gpu=e}}
class mX{constructor(e){this._renderer=e}contextChange(){this.maxTextures=this._renderer.device.gpu.device.limits.maxSampledTexturesPerShaderStage,this.maxBatchableTextures=this.maxTextures}destroy(){}}
class gX{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let n=this._renderTargetStencilState[e.uid];n||(n=this._renderTargetStencilState[e.uid]={stencilMode:Ba.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(n.stencilMode,n.stencilReference)}setStencilMode(e,n){const r=this._renderTargetStencilState[this._activeRenderTarget.uid];r.stencilMode=e,r.stencilReference=n;const i=this._renderer;i.pipeline.setStencilMode(e),i.encoder.renderPassEncoder.setStencilReference(n)}destroy(){this._renderer.renderTarget.onRenderTargetChange.remove(this),this._renderer=null,this._activeRenderTarget=null,this._renderTargetStencilState=null}}
const qC={i32:{align:4,size:4},u32:{align:4,size:4},f32:{align:4,size:4},f16:{align:2,size:2},"vec2<i32>":{align:8,size:8},"vec2<u32>":{align:8,size:8},"vec2<f32>":{align:8,size:8},"vec2<f16>":{align:4,size:4},"vec3<i32>":{align:16,size:12},"vec3<u32>":{align:16,size:12},"vec3<f32>":{align:16,size:12},"vec3<f16>":{align:8,size:6},"vec4<i32>":{align:16,size:16},"vec4<u32>":{align:16,size:16},"vec4<f32>":{align:16,size:16},"vec4<f16>":{align:8,size:8},"mat2x2<f32>":{align:8,size:16},"mat2x2<f16>":{align:4,size:8},"mat3x2<f32>":{align:8,size:24},"mat3x2<f16>":{align:4,size:12},"mat4x2<f32>":{align:8,size:32},"mat4x2<f16>":{align:4,size:16},"mat2x3<f32>":{align:16,size:32},"mat2x3<f16>":{align:8,size:16},"mat3x3<f32>":{align:16,size:48},"mat3x3<f16>":{align:8,size:24},"mat4x3<f32>":{align:16,size:64},"mat4x3<f16>":{align:8,size:32},"mat2x4<f32>":{align:16,size:32},"mat2x4<f16>":{align:8,size:16},"mat3x4<f32>":{align:16,size:48},"mat3x4<f16>":{align:8,size:24},"mat4x4<f32>":{align:16,size:64},"mat4x4<f16>":{align:8,size:32}};
function Ewe(t,e){const{size:n,align:r}=qC[t.data.type],i=(r-n)/4,o=t.data.type.indexOf("i32")>=0?"dataInt32":"data";return`
         v = uv.${t.data.name};
         ${e!==0?`offset += ${e};`:""}

         arrayOffset = offset;

         t = 0;

         for(var i=0; i < ${t.data.size*(n/4)}; i++)
         {
             for(var j = 0; j < ${n/4}; j++)
             {
                 ${o}[arrayOffset++] = v[t++];
             }
             ${i!==0?`arrayOffset += ${i};`:""}
         }
     `}
function Twe(t){return OY(t,"uboWgsl",Ewe,Mve)}
class yX extends RY{constructor(){super({createUboElements:Awe,generateUboSync:Twe})}}
const Jb=128;
class bX{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_bindGroupHash"),this._batchBuffer=new Cwe({minUniformOffsetAlignment:Jb});const n=256/Jb;for(let r=0;r<n;r++){let i=Ki.UNIFORM|Ki.COPY_DST;r===0&&(i|=Ki.COPY_SRC),this._buffers.push(new Gd({data:this._batchBuffer.data,usage:i}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){for(const e in this._bindGroupHash)this._bindGroupHash[e]=null;this._batchBuffer.clear()}getUniformBindGroup(e,n){if(!n&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.ubo.ensureUniformGroup(e);const r=e.buffer.data,i=this._batchBuffer.addEmptyGroup(r.length);return this._renderer.ubo.syncUniformGroup(e,this._batchBuffer.data,i/4),this._bindGroupHash[e.uid]=this._getBindGroup(i/Jb),this._bindGroupHash[e.uid]}getUboResource(e){this._renderer.ubo.updateUniformGroup(e);const n=e.buffer.data,r=this._batchBuffer.addGroup(n);return this._getBufferResource(r/Jb)}getArrayBindGroup(e){const n=this._batchBuffer.addGroup(e);return this._getBindGroup(n/Jb)}getArrayBufferResource(e){const r=this._batchBuffer.addGroup(e)/Jb;return this._getBufferResource(r)}_getBufferResource(e){if(!this._bufferResources[e]){const n=this._buffers[e%2];this._bufferResources[e]=new BI({buffer:n,offset:(e/2|0)*256,size:Jb})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){const n=new Jg({0:this._getBufferResource(e)});this._bindGroups[e]=n}return this._bindGroups[e]}_uploadBindGroups(){const e=this._renderer.buffer,n=this._buffers[0];n.update(this._batchBuffer.byteIndex),e.updateBuffer(n);const r=this._renderer.gpu.device.createCommandEncoder();for(let i=1;i<this._buffers.length;i++){const o=this._buffers[i];r.copyBufferToBuffer(e.getGPUBuffer(n),Jb,e.getGPUBuffer(o),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([r.finish()])}destroy(){for(let e=0;e<this._bindGroups.length;e++)this._bindGroups[e].destroy();this._bindGroups=null,this._bindGroupHash=null;for(let e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers=null;for(let e=0;e<this._bufferResources.length;e++)this._bufferResources[e].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._bindGroupHash=null,this._renderer=null}}
const Wqe={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};
function $qe(t,e,n,r,i){return t<<24|e<<16|n<<10|r<<5|i}
function Yqe(t,e,n,r){return n<<6|t<<3|r<<1|e}
class Mwe{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}
class Pwe{init(e,n){this._renderer=e,this._renderTargetSystem=n}copyToTexture(e,n,r,i,o){const s=this._renderer,a=this._getGpuColorTexture(e),l=s.texture.getGpuSource(n.source);return s.encoder.commandEncoder.copyTextureToTexture({texture:a,origin:r},{texture:l,origin:o},i),n}startRenderPass(e,n=!0,r,i){const s=this._renderTargetSystem.getGpuRenderTarget(e),a=this.getDescriptor(e,n,r);s.descriptor=a,this._renderer.pipeline.setRenderTarget(s),this._renderer.encoder.beginRenderPass(s),this._renderer.encoder.setViewport(i)}finishRenderPass(){this._renderer.encoder.endRenderPass()}_getGpuColorTexture(e){const n=this._renderTargetSystem.getGpuRenderTarget(e);return n.contexts[0]?n.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,n,r){typeof n=="boolean"&&(n=n?Fd.ALL:Fd.NONE);const i=this._renderTargetSystem,o=i.getGpuRenderTarget(e),s=e.colorTextures.map((c,u)=>{const d=o.contexts[u];let h,p;d?h=d.getCurrentTexture().createView():h=this._renderer.texture.getGpuSource(c).createView({mipLevelCount:1}),o.msaaTextures[u]&&(p=h,h=this._renderer.texture.getTextureView(o.msaaTextures[u]));const g=n&Fd.COLOR?"clear":"load";return r??(r=i.defaultClearColor),{view:h,resolveTarget:p,clearValue:r,storeOp:"store",loadOp:g}});let a;if((e.stencil||e.depth)&&!e.depthStencilTexture&&(e.ensureDepthStencilTexture(),e.depthStencilTexture.source.sampleCount=o.msaa?4:1),e.depthStencilTexture){const c=n&Fd.STENCIL?"clear":"load",u=n&Fd.DEPTH?"clear":"load";a={view:this._renderer.texture.getGpuSource(e.depthStencilTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:c,depthClearValue:1,depthLoadOp:u,depthStoreOp:"store"}}return{colorAttachments:s,depthStencilAttachment:a}}clear(e,n=!0,r,i){if(!n)return;const{gpu:o,encoder:s}=this._renderer,a=o.device;if(s.commandEncoder===null){const c=a.createCommandEncoder(),u=this.getDescriptor(e,n,r),d=c.beginRenderPass(u);d.setViewport(i.x,i.y,i.width,i.height,0,1),d.end();const h=c.finish();a.queue.submit([h])}else this.startRenderPass(e,n,r,i)}initGpuRenderTarget(e){e.isRoot=!0;const n=new Mwe;return e.colorTextures.forEach((r,i)=>{if(r instanceof Zg){const o=r.resource.getContext("webgpu"),s=r.transparent?"premultiplied":"opaque";try{o.configure({device:this._renderer.gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:s})}catch(a){console.error(a)}n.contexts[i]=o}if(n.msaa=r.source.antialias,r.source.antialias){const o=new Ea({width:0,height:0,sampleCount:4});n.msaaTextures[i]=o}}),n.msaa&&(n.msaaSamples=4,e.depthStencilTexture&&(e.depthStencilTexture.source.sampleCount=4)),n}destroyGpuRenderTarget(e){e.contexts.forEach(n=>{n.unconfigure()}),e.msaaTextures.forEach(n=>{n.destroy()}),e.msaaTextures.length=0,e.contexts.length=0}ensureDepthStencilTexture(e){const n=this._renderTargetSystem.getGpuRenderTarget(e);e.depthStencilTexture&&n.msaa&&(e.depthStencilTexture.source.sampleCount=4)}resizeGpuRenderTarget(e){const n=this._renderTargetSystem.getGpuRenderTarget(e);n.width=e.width,n.height=e.height,n.msaa&&e.colorTextures.forEach((r,i)=>{const o=n.msaaTextures[i];o==null||o.resize(r.source.width,r.source.height,r.source._resolution)})}}
class wX extends FY{constructor(e){super(e),this.adaptor=new Pwe,this.adaptor.init(e,this)}}
class xX{constructor(){this._gpuProgramData=Object.create(null)}contextChange(e){this._gpu=e}getProgramData(e){return this._gpuProgramData[e._layoutKey]||this._createGPUProgramData(e)}_createGPUProgramData(e){const n=this._gpu.device,r=e.gpuLayout.map(o=>n.createBindGroupLayout({entries:o})),i={bindGroupLayouts:r};return this._gpuProgramData[e._layoutKey]={bindGroups:r,pipeline:n.createPipelineLayout(i)},this._gpuProgramData[e._layoutKey]}destroy(){this._gpu=null,this._gpuProgramData=null}}
const ed={};
class _X{constructor(){this.defaultState=new Qh,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:ed[e.blendMode]||ed.normal}]}destroy(){this.gpu=null}}
const Nwe={type:"image",upload(t,e,n){const r=t.resource,i=(t.pixelWidth|0)*(t.pixelHeight|0),o=r.byteLength/i;n.device.queue.writeTexture({texture:e},r,{offset:0,rowsPerImage:t.pixelHeight,bytesPerRow:t.pixelHeight*o},{width:t.pixelWidth,height:t.pixelHeight,depthOrArrayLayers:1})}},SX={"bc1-rgba-unorm":{blockBytes:8,blockWidth:4,blockHeight:4},"bc2-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"bc3-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"bc7-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"etc1-rgb-unorm":{blockBytes:8,blockWidth:4,blockHeight:4},"etc2-rgba8unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"astc-4x4-unorm":{blockBytes:16,blockWidth:4,blockHeight:4}},Xqe={blockBytes:4,blockWidth:1,blockHeight:1},Rwe={type:"compressed",upload(t,e,n){let r=t.pixelWidth,i=t.pixelHeight;const o=SX[t.format]||Xqe;for(let s=0;s<t.resource.length;s++){const a=t.resource[s],l=Math.ceil(r/o.blockWidth)*o.blockBytes;n.device.queue.writeTexture({texture:e,mipLevel:s},a,{offset:0,bytesPerRow:l},{width:Math.ceil(r/o.blockWidth)*o.blockWidth,height:Math.ceil(i/o.blockHeight)*o.blockHeight,depthOrArrayLayers:1}),r=Math.max(r>>1,1),i=Math.max(i>>1,1)}}},kX={type:"image",upload(t,e,n){const r=t.resource;if(!r)return;if(globalThis.HTMLImageElement&&r instanceof HTMLImageElement){const a=qr.get().createCanvas(r.width,r.height);a.getContext("2d").drawImage(r,0,0,r.width,r.height),t.resource=a,er("ImageSource: Image element passed, converting to canvas and replacing resource.")}const i=Math.min(e.width,t.resourceWidth||t.pixelWidth),o=Math.min(e.height,t.resourceHeight||t.pixelHeight),s=t.alphaMode==="premultiply-alpha-on-upload";n.device.queue.copyExternalImageToTexture({source:r},{texture:e,premultipliedAlpha:s},{width:i,height:o})}},Iwe={type:"video",upload(t,e,n){kX.upload(t,e,n)}};
class Owe{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let n=this.pipelines[e];return n||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
                        var<private> pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
                        vec2<f32>(-1.0, -1.0), vec2<f32>(-1.0, 3.0), vec2<f32>(3.0, -1.0));

                        struct VertexOutput {
                        @builtin(position) position : vec4<f32>,
                        @location(0) texCoord : vec2<f32>,
                        };

                        @vertex
                        fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
                        var output : VertexOutput;
                        output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
                        output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
                        return output;
                        }

                        @group(0) @binding(0) var imgSampler : sampler;
                        @group(0) @binding(1) var img : texture_2d<f32>;

                        @fragment
                        fn fragmentMain(@location(0) texCoord : vec2<f32>) -> @location(0) vec4<f32> {
                        return textureSample(img, imgSampler, texCoord);
                        }
                    `})),n=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=n),n}generateMipmap(e){const n=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let r=e;const i=e.depthOrArrayLayers||1,o=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!o){const l={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};r=this.device.createTexture(l)}const s=this.device.createCommandEncoder({}),a=n.getBindGroupLayout(0);for(let l=0;l<i;++l){let c=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),u=o?1:0;for(let d=1;d<e.mipLevelCount;++d){const h=r.createView({baseMipLevel:u++,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),p=s.beginRenderPass({colorAttachments:[{view:h,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),g=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:c}]});p.setPipeline(n),p.setBindGroup(0,g),p.draw(3,1,0,0),p.end(),c=h}}if(!o){const l={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i};for(let c=1;c<e.mipLevelCount;++c)s.copyTextureToTexture({texture:r,mipLevel:c-1},{texture:e,mipLevel:c},l),l.width=Math.ceil(l.width/2),l.height=Math.ceil(l.height/2)}return this.device.queue.submit([s.finish()]),o||r.destroy(),e}}
class CX{constructor(e){this.managedTextures=[],this._gpuSources=Object.create(null),this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._textureViewHash=Object.create(null),this._uploads={image:kX,buffer:Nwe,video:Iwe,compressed:Rwe},this._renderer=e,e.renderableGC.addManagedHash(this,"_gpuSources"),e.renderableGC.addManagedHash(this,"_gpuSamplers"),e.renderableGC.addManagedHash(this,"_bindGroupHash"),e.renderableGC.addManagedHash(this,"_textureViewHash")}contextChange(e){this._gpu=e}initSource(e){return this._gpuSources[e.uid]?this._gpuSources[e.uid]:this._initSource(e)}_initSource(e){if(e.autoGenerateMipmaps){const l=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(l))+1}let n=GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST;e.uploadMethodId!=="compressed"&&(n|=GPUTextureUsage.RENDER_ATTACHMENT,n|=GPUTextureUsage.COPY_SRC);const r=SX[e.format]||{blockWidth:1,blockHeight:1},i=Math.ceil(e.pixelWidth/r.blockWidth)*r.blockWidth,o=Math.ceil(e.pixelHeight/r.blockHeight)*r.blockHeight,s={label:e.label,size:{width:i,height:o},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:n},a=this._gpuSources[e.uid]=this._gpu.device.createTexture(s);return this.managedTextures.includes(e)||(e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),e.on("updateMipmaps",this.onUpdateMipmaps,this),this.managedTextures.push(e)),this.onSourceUpdate(e),a}onSourceUpdate(e){const n=this.getGpuSource(e);n&&(this._uploads[e.uploadMethodId]&&this._uploads[e.uploadMethodId].upload(e,n,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&this.onUpdateMipmaps(e))}onSourceUnload(e){const n=this._gpuSources[e.uid];n&&(this._gpuSources[e.uid]=null,n.destroy())}onUpdateMipmaps(e){this._mipmapGenerator||(this._mipmapGenerator=new Owe(this._gpu.device));const n=this.getGpuSource(e);this._mipmapGenerator.generateMipmap(n)}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this),e.off("updateMipmaps",this.onUpdateMipmaps,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}onSourceResize(e){const n=this._gpuSources[e.uid];n?(n.width!==e.pixelWidth||n.height!==e.pixelHeight)&&(this._textureViewHash[e.uid]=null,this._bindGroupHash[e.uid]=null,this.onSourceUnload(e),this.initSource(e)):this.initSource(e)}_initSampler(e){return this._gpuSamplers[e._resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e._resourceId]}getGpuSampler(e){return this._gpuSamplers[e._resourceId]||this._initSampler(e)}getGpuSource(e){return this._gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){return this._bindGroupHash[e.uid]??this._createTextureBindGroup(e)}_createTextureBindGroup(e){const n=e.source;return this._bindGroupHash[e.uid]=new Jg({0:n,1:n.style,2:new il({uTextureMatrix:{type:"mat3x3<f32>",value:e.textureMatrix.mapCoord}})}),this._bindGroupHash[e.uid]}getTextureView(e){const n=e.source;return this._textureViewHash[n.uid]??this._createTextureView(n)}_createTextureView(e){return this._textureViewHash[e.uid]=this.getGpuSource(e).createView(),this._textureViewHash[e.uid]}generateCanvas(e){const n=this._renderer,r=n.gpu.device.createCommandEncoder(),i=qr.get().createCanvas();i.width=e.source.pixelWidth,i.height=e.source.pixelHeight;const o=i.getContext("webgpu");return o.configure({device:n.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:qr.get().getNavigator().gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),r.copyTextureToTexture({texture:n.texture.getGpuSource(e.source),origin:{x:0,y:0}},{texture:o.getCurrentTexture()},{width:i.width,height:i.height}),n.gpu.device.queue.submit([r.finish()]),i}getPixels(e){const n=this.generateCanvas(e),r=Dy.getOptimalCanvasAndContext(n.width,n.height),i=r.context;i.drawImage(n,0,0);const{width:o,height:s}=n,a=i.getImageData(0,0,o,s),l=new Uint8ClampedArray(a.data.buffer);return Dy.returnCanvasAndContext(r),{pixels:l,width:o,height:s}}destroy(){this.managedTextures.slice().forEach(e=>this.onSourceDestroy(e)),this.managedTextures=null;for(const e of Object.keys(this._bindGroupHash)){const n=Number(e),r=this._bindGroupHash[n];r==null||r.destroy(),this._bindGroupHash[n]=null}this._gpu=null,this._mipmapGenerator=null,this._gpuSources=null,this._bindGroupHash=null,this._textureViewHash=null,this._gpuSamplers=null}}
class AX{constructor(){this._maxTextures=0}contextChange(e){const n=new il({uTransformMatrix:{value:new dn,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}});this._maxTextures=e.limits.maxBatchableTextures;const r=X5({name:"graphics",bits:[_I,kI(this._maxTextures),yve,Z5]});this.shader=new sf({gpuProgram:r,resources:{localUniforms:n}})}execute(e,n){const r=n.context,i=r.customShader||this.shader,o=e.renderer,s=o.graphicsContext,{batcher:a,instructions:l}=s.getContextRenderData(r),c=o.encoder;c.setGeometry(a.geometry,i.gpuProgram);const u=o.globalUniforms.bindGroup;c.setBindGroup(0,u,i.gpuProgram);const d=o.renderPipes.uniformBatch.getUniformBindGroup(i.resources.localUniforms,!0);c.setBindGroup(2,d,i.gpuProgram);const h=l.instructions;let p=null;for(let g=0;g<l.instructionSize;g++){const b=h[g];if(b.topology!==p&&(p=b.topology,c.setPipelineFromGeometryProgramAndState(a.geometry,i.gpuProgram,e.state,b.topology)),i.groups[1]=b.bindGroup,!b.gpuBindGroup){const v=b.textures;b.bindGroup=xI(v.textures,v.count,this._maxTextures),b.gpuBindGroup=o.bindGroup.getBindGroup(b.bindGroup,i.gpuProgram,1)}c.setBindGroup(1,b.bindGroup,i.gpuProgram),c.renderPassEncoder.drawIndexed(b.size,1,b.start)}}destroy(){this.shader.destroy(!0),this.shader=null}}
class EX{init(){const e=X5({name:"mesh",bits:[SS,bve,Z5]});this._shader=new sf({gpuProgram:e,resources:{uTexture:fn.EMPTY._source,uSampler:fn.EMPTY._source.style,textureUniforms:{uTextureMatrix:{type:"mat3x3<f32>",value:new dn}}}})}execute(e,n){const r=e.renderer;let i=n._shader;if(!i)i=this._shader,i.groups[2]=r.texture.getTextureBindGroup(n.texture);else if(!i.gpuProgram){er("Mesh shader has no gpuProgram",n.shader);return}const o=i.gpuProgram;if(o.autoAssignGlobalUniforms&&(i.groups[0]=r.globalUniforms.bindGroup),o.autoAssignLocalUniforms){const s=e.localUniforms;i.groups[1]=r.renderPipes.uniformBatch.getUniformBindGroup(s,!0)}r.encoder.draw({geometry:n._geometry,shader:i,state:n.state})}destroy(){this._shader.destroy(!0),this._shader=null}}
const Kqe=[...cX,yX,pX,zI,mX,hX,CX,wX,xX,_X,vX,fX,gX,dX],Zqe=[...uX,bX],Jqe=[gY,EX,AX],Dwe=[],Lwe=[],Bwe=[];
class Fwe extends e8{constructor(){const e={name:"webgpu",type:Zd.WEBGPU,systems:Dwe,renderPipes:Lwe,renderPipeAdaptors:Bwe};super(e)}}
const Qqe=Object.freeze(Object.defineProperty({__proto__:null,WebGPURenderer:Fwe},Symbol.toStringTag,{value:"Module"})),Ere={POINTS:"point-list",LINES:"line-list",LINE_STRIP:"line-strip",TRIANGLES:"triangle-list",TRIANGLE_STRIP:"triangle-strip"},eWe=new Proxy(Ere,{get(t,e){return zn(Vr,`DRAW_MODES.${e} is deprecated, use '${Ere[e]}' instead`),t[e]}});
var MN=(t=>(t.CLAMP="clamp-to-edge",t.REPEAT="repeat",t.MIRRORED_REPEAT="mirror-repeat",t))(MN||{});
const tWe=new Proxy(MN,{get(t,e){return zn(Vr,`DRAW_MODES.${e} is deprecated, use '${MN[e]}' instead`),t[e]}});
var PN=(t=>(t.NEAREST="nearest",t.LINEAR="linear",t))(PN||{});
const nWe=new Proxy(PN,{get(t,e){return zn(Vr,`DRAW_MODES.${e} is deprecated, use '${PN[e]}' instead`),t[e]}});
function iWe(t){const e=t.toString(),n=e.indexOf("{"),r=e.lastIndexOf("}");if(n===-1||r===-1)throw new Error("getFunctionBody: No body found in function definition");return e.slice(n+1,r).trim()}
function oWe(t,e){return zn("8.7.0","Use container.getFastGlobalBounds() instead"),t.getFastGlobalBounds(!0,e)}
class sWe extends h0{constructor(e){typeof e=="function"&&(e={render:e});const{render:n,...r}=e;super({label:"RenderContainer",...r}),this.renderPipeId="customRender",this.batched=!1,n&&(this.render=n),this.containsPoint=e.containsPoint??(()=>!1),this.addBounds=e.addBounds??(()=>!1)}updateBounds(){this._bounds.clear(),this.addBounds(this._bounds)}render(e){}}
function aWe(t,e,n){zn("8.7.0","Please use container.collectRenderables instead.");const r=n.renderPipes?n:n.batch.renderer;return t.collectRenderables(e,r,null)}
function lWe(t,e){const n=e._scale,r=e._pivot,i=e._position,o=n._x,s=n._y,a=r._x,l=r._y;t.a=e._cx*o,t.b=e._sx*o,t.c=e._cy*s,t.d=e._sy*s,t.tx=i._x-(a*t.a+l*t.c),t.ty=i._y-(a*t.b+l*t.d)}
function cWe(t,e,n){const r=t.a,i=t.b,o=t.c,s=t.d,a=t.tx,l=t.ty,c=e.a,u=e.b,d=e.c,h=e.d;n.a=r*c+i*d,n.b=r*u+i*h,n.c=o*c+s*d,n.d=o*u+s*h,n.tx=a*c+l*d+e.tx,n.ty=a*u+l*h+e.ty}
class jwe{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{cc.return(e)}),this.batches.length=0}}
class zwe{constructor(e,n){this.state=Qh.for2d(),this.renderer=e,this._adaptor=n,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const n=e.context,r=!!e._gpuData,i=this.renderer.graphicsContext.updateGpuContext(n);return!!(i.isBatchable||r!==i.isBatchable)}addRenderable(e,n){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,n):(this.renderer.renderPipes.batch.break(n),n.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let i=0;i<r.length;i++){const o=r[i];o._batcher.updateElement(o)}}execute(e){if(!e.isRenderable)return;const n=this.renderer,r=e.context;if(!n.graphicsContext.getGpuContext(r).batches.length)return;const o=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const s=o.resources.localUniforms.uniforms;s.uTransformMatrix=e.groupTransform,s.uRound=n._roundPixels|e._roundPixels,e3(e.groupColorAlpha,s.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const n=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);n.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,n)}_addToBatcher(e,n){const r=this.renderer.renderPipes.batch,i=this._getGpuDataForRenderable(e).batches;for(let o=0;o<i.length;o++){const s=i[o];r.addToBatch(s,n)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const n=new jwe;return e._gpuData[this.renderer.uid]=n,n}_updateBatchesForRenderable(e,n){const r=e.context,i=this.renderer.graphicsContext.getGpuContext(r),o=this.renderer._roundPixels|e._roundPixels;n.batches=i.batches.map(s=>{const a=cc.get(TI);return s.copyTo(a),a.renderable=e,a.roundPixels=o,a})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}
const Uwe=class Gwe extends la{constructor(e={}){e={...Gwe.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let n=0;n<e.length;n++){const r=e[n];if(r.parentRenderLayer){if(r.parentRenderLayer===this)continue;r.parentRenderLayer.detach(r)}this.renderLayerChildren.push(r),r.parentRenderLayer=this;const i=this.renderGroup||this.parentRenderGroup;i&&(i.structureDidChange=!0)}return e[0]}detach(...e){for(let n=0;n<e.length;n++){const r=e[n],i=this.renderLayerChildren.indexOf(r);i!==-1&&this.renderLayerChildren.splice(i,1),r.parentRenderLayer=null;const o=this.renderGroup||this.parentRenderGroup;o&&(o.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let n=0;n<e.length;n++)e[n].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,n,r){const i=this.renderLayerChildren,o=i.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let s=0;s<o;s++)i[s].parent||er("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",i[s]),i[s].collectRenderables(e,n,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,n,r){if(!e)return;const i=this.renderLayerChildren;for(let o=0;o<i.length;o++)i[o]._getGlobalBoundsRecursive(!0,n,this)}};
let uWe=Uwe;
const dWe=uWe,Hwe=class Vwe extends P_{constructor(...e){super({});let n=e[0]??{};typeof n=="number"&&(zn(Vr,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),n={width:n,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(n)}build(e){e={...Vwe.defaultOptions,...e},this.verticesX=this.verticesX??e.verticesX,this.verticesY=this.verticesY??e.verticesY,this.width=this.width??e.width,this.height=this.height??e.height;const n=this.verticesX*this.verticesY,r=[],i=[],o=[],s=this.verticesX-1,a=this.verticesY-1,l=this.width/s,c=this.height/a;for(let d=0;d<n;d++){const h=d%this.verticesX,p=d/this.verticesX|0;r.push(h*l,p*c),i.push(h/s,p/a)}const u=s*a;for(let d=0;d<u;d++){const h=d%s,p=d/s|0,g=p*this.verticesX+h,b=p*this.verticesX+h+1,v=(p+1)*this.verticesX+h,w=(p+1)*this.verticesX+h+1;o.push(g,b,v,b,w,v)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(i),this.indexBuffer.data=new Uint32Array(o),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};
let UI=Hwe;
function qwe(t,e,n,r){const i=n.buffers[0],o=i.data,{verticesX:s,verticesY:a}=n,l=t/(s-1),c=e/(a-1);let u=0;const d=r[0],h=r[1],p=r[2],g=r[3],b=r[4],v=r[5],w=r[6],k=r[7],A=r[8];for(let T=0;T<o.length;T+=2){const P=u%s*l,R=(u/s|0)*c,B=d*P+h*R+p,j=g*P+b*R+v,I=w*P+k*R+A;o[T]=B/I,o[T+1]=j/I,u++}i.update()}
function Wwe(t,e){const n=e[0],r=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t[0]=s*u-a*c,t[1]=i*c-r*u,t[2]=r*a-i*s,t[3]=a*l-o*u,t[4]=n*u-i*l,t[5]=i*o-n*a,t[6]=o*c-s*l,t[7]=r*l-n*c,t[8]=n*s-r*o,t}
function $we(t,e,n){const r=e[0],i=e[1],o=e[2],s=e[3],a=e[4],l=e[5],c=e[6],u=e[7],d=e[8],h=n[0],p=n[1],g=n[2],b=n[3],v=n[4],w=n[5],k=n[6],A=n[7],T=n[8];return t[0]=h*r+p*s+g*c,t[1]=h*i+p*a+g*u,t[2]=h*o+p*l+g*d,t[3]=b*r+v*s+w*c,t[4]=b*i+v*a+w*u,t[5]=b*o+v*l+w*d,t[6]=k*r+A*s+T*c,t[7]=k*i+A*a+T*u,t[8]=k*o+A*l+T*d,t}
function hWe(t,e,n){const r=n[0],i=n[1],o=n[2];return t[0]=e[0]*r+e[1]*i+e[2]*o,t[1]=e[3]*r+e[4]*i+e[5]*o,t[2]=e[6]*r+e[7]*i+e[8]*o,t}
const fWe=[0,0,0,0,0,0,0,0,0],pWe=[0,0,0],hM=[0,0,0];
function Tre(t,e,n,r,i,o,s,a,l){const c=fWe;c[0]=e,c[1]=r,c[2]=o,c[3]=n,c[4]=i,c[5]=s,c[6]=1,c[7]=1,c[8]=1;const u=Wwe(t,c);hM[0]=a,hM[1]=l,hM[2]=1;const d=hWe(pWe,u,hM),h=t;return t[0]=d[0],t[1]=0,t[2]=0,t[3]=0,t[4]=d[1],t[5]=0,t[6]=0,t[7]=0,t[8]=d[2],$we(t,h,c)}
const mWe=[0,0,0,0,0,0,0,0,0],gWe=[0,0,0,0,0,0,0,0,0];
function Ywe(t,e,n,r,i,o,s,a,l,c,u,d,h,p,g,b,v){const w=Tre(mWe,e,n,o,s,c,u,p,g),k=Tre(gWe,r,i,a,l,d,h,b,v);return $we(t,Wwe(w,w),k)}
class Xwe extends UI{constructor(e){super(e),this._projectionMatrix=[0,0,0,0,0,0,0,0,0];const{width:n,height:r}=e;this.corners=[0,0,n,0,n,r,0,r]}setCorners(e,n,r,i,o,s,a,l){const c=this.corners;c[0]=e,c[1]=n,c[2]=r,c[3]=i,c[4]=o,c[5]=s,c[6]=a,c[7]=l,this.updateProjection()}updateProjection(){const{width:e,height:n}=this,r=this.corners,i=Ywe(this._projectionMatrix,0,0,r[0],r[1],e,0,r[2],r[3],e,n,r[4],r[5],0,n,r[6],r[7]);qwe(e,n,this,i)}}
const Kwe=class Zwe extends Q5{constructor(e){e={...Zwe.defaultOptions,...e};const{texture:n,verticesX:r,verticesY:i,...o}=e,s=new Xwe(gm({width:n.width,height:n.height,verticesX:r,verticesY:i}));super(gm({...o,geometry:s})),this._texture=n,this.geometry.setCorners(e.x0,e.y0,e.x1,e.y1,e.x2,e.y2,e.x3,e.y3)}textureUpdated(){const e=this.geometry;if(!e)return;const{width:n,height:r}=this.texture;(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,e.updateProjection())}set texture(e){this._texture!==e&&(super.texture=e,this.textureUpdated())}get texture(){return this._texture}setCorners(e,n,r,i,o,s,a,l){this.geometry.setCorners(e,n,r,i,o,s,a,l)}};
let yWe=Kwe;
class bWe extends Q5{constructor(e){const{texture:n,verticesX:r,verticesY:i,...o}=e,s=new UI(gm({width:n.width,height:n.height,verticesX:r,verticesY:i}));super(gm({...o,geometry:s,texture:n})),this.texture=n,this.autoResize=!0}textureUpdated(){const e=this.geometry,{width:n,height:r}=this.texture;this.autoResize&&(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,e.build({}))}set texture(e){var n;(n=this._texture)==null||n.off("update",this.textureUpdated,this),super.texture=e,e.on("update",this.textureUpdated,this),this.textureUpdated()}get texture(){return this._texture}destroy(e){this.texture.off("update",this.textureUpdated,this),super.destroy(e)}}
const Jwe=class Qwe extends P_{constructor(e){const{width:n,points:r,textureScale:i}={...Qwe.defaultOptions,...e};super({positions:new Float32Array(r.length*4),uvs:new Float32Array(r.length*4),indices:new Uint32Array((r.length-1)*6)}),this.points=r,this._width=n,this.textureScale=i,this._build()}get width(){return this._width}_build(){const e=this.points;if(!e)return;const n=this.getBuffer("aPosition"),r=this.getBuffer("aUV"),i=this.getIndex();if(e.length<1)return;n.data.length/4!==e.length&&(n.data=new Float32Array(e.length*4),r.data=new Float32Array(e.length*4),i.data=new Uint16Array((e.length-1)*6));const o=r.data,s=i.data;o[0]=0,o[1]=0,o[2]=0,o[3]=1;let a=0,l=e[0];const c=this._width*this.textureScale,u=e.length;for(let h=0;h<u;h++){const p=h*4;if(this.textureScale>0){const g=l.x-e[h].x,b=l.y-e[h].y,v=Math.sqrt(g*g+b*b);l=e[h],a+=v/c}else a=h/(u-1);o[p]=a,o[p+1]=0,o[p+2]=a,o[p+3]=1}let d=0;for(let h=0;h<u-1;h++){const p=h*2;s[d++]=p,s[d++]=p+1,s[d++]=p+2,s[d++]=p+2,s[d++]=p+1,s[d++]=p+3}r.update(),i.update(),this.updateVertices()}updateVertices(){const e=this.points;if(e.length<1)return;let n=e[0],r,i=0,o=0;const s=this.buffers[0].data,a=e.length,l=this.textureScale>0?this.textureScale*this._width/2:this._width/2;for(let c=0;c<a;c++){const u=e[c],d=c*4;c<e.length-1?r=e[c+1]:r=u,o=-(r.x-n.x),i=r.y-n.y;const h=Math.sqrt(i*i+o*o);h<1e-6?(i=0,o=0):(i/=h,o/=h,i*=l,o*=l),s[d]=u.x+i,s[d+1]=u.y+o,s[d+2]=u.x-i,s[d+3]=u.y-o,n=u}this.buffers[0].update()}update(){this.textureScale>0?this._build():this.updateVertices()}};
let exe=Jwe;
const txe=class nxe extends Q5{constructor(e){const{texture:n,points:r,textureScale:i,...o}={...nxe.defaultOptions,...e},s=new exe(gm({width:n.height,points:r,textureScale:i}));i>0&&(n.source.style.addressMode="repeat"),super(gm({...o,texture:n,geometry:s})),this.autoUpdate=!0,this.onRender=this._render}_render(){const e=this.geometry;(this.autoUpdate||e._width!==this.texture.height)&&(e._width=this.texture.height,e.update())}};
let vWe=txe;
class wWe extends Q5{constructor(e){const{texture:n,vertices:r,uvs:i,indices:o,topology:s,...a}=e,l=new P_(gm({positions:r,uvs:i,indices:o,topology:s}));super(gm({...a,texture:n,geometry:l})),this.autoUpdate=!0,this.onRender=this._render}get vertices(){return this.geometry.getBuffer("aPosition").data}set vertices(e){this.geometry.getBuffer("aPosition").data=e}_render(){this.autoUpdate&&this.geometry.getBuffer("aPosition").update()}}
class GI{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const n=this.geometry.getBuffer("aUV"),r=n.data;let i=r;const o=this.texture.textureMatrix;return o.isSimple||(i=this._transformedUvs,(this._textureMatrixUpdateId!==o._updateID||this._uvUpdateId!==n._updateID)&&((!i||i.length<r.length)&&(i=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=o._updateID,this._uvUpdateId=n._updateID,o.multiplyUvs(r,i))),i}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}
function xWe(t,e){const{width:n,height:r}=t.frame;return e.scale(1/n,1/r),e}
class dH{destroy(){}}
class rxe{constructor(e,n){this.localUniforms=new il({uTransformMatrix:{value:new dn,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Jg({0:this.localUniforms}),this.renderer=e,this._adaptor=n,this._adaptor.init()}validateRenderable(e){const n=this._getMeshData(e),r=n.batched,i=e.batched;if(n.batched=i,r!==i)return!0;if(i){const o=e._geometry;if(o.indices.length!==n.indexSize||o.positions.length!==n.vertexSize)return n.indexSize=o.indices.length,n.vertexSize=o.positions.length,!0;const s=this._getBatchableMesh(e);return s.texture.uid!==e._texture.uid&&(s._textureMatrixUpdateId=-1),!s._batcher.checkAndUpdateTexture(s,e._texture)}return!1}addRenderable(e,n){var o,s;const r=this.renderer.renderPipes.batch,i=this._getMeshData(e);if(e.didViewUpdate&&(i.indexSize=(o=e._geometry.indices)==null?void 0:o.length,i.vertexSize=(s=e._geometry.positions)==null?void 0:s.length),i.batched){const a=this._getBatchableMesh(e);a.setTexture(e._texture),a.geometry=e._geometry,r.addToBatch(a,n)}else r.break(n),n.add(e)}updateRenderable(e){if(e.batched){const n=this._getBatchableMesh(e);n.setTexture(e._texture),n.geometry=e._geometry,n._batcher.updateElement(n)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=n5(e.groupBlendMode,e.texture._source);const n=this.localUniforms;n.uniforms.uTransformMatrix=e.groupTransform,n.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,n.update(),e3(e.groupColorAlpha,n.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var n,r;return(n=e._gpuData)[r=this.renderer.uid]||(n[r]=new dH),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var n,r;return(n=e._gpuData)[r=this.renderer.uid]||(n[r]=new dH),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const n=new GI;return n.renderable=e,n.setTexture(e._texture),n.transform=e.groupTransform,n.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=n,n}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}
class ixe{execute(e,n){const r=e.state,i=e.renderer,o=n.shader||e.defaultShader;o.resources.uTexture=n.texture._source,o.resources.uniforms=e.localUniforms;const s=i.gl,a=e.getBuffers(n);i.shader.bind(o),i.state.set(r),i.geometry.bind(a.geometry,o.glProgram);const c=a.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;s.drawElements(s.TRIANGLES,n.particleChildren.length*6,c,0)}}
class oxe{execute(e,n){const r=e.renderer,i=n.shader||e.defaultShader;i.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),i.groups[1]=r.texture.getTextureBindGroup(n.texture);const o=e.state,s=e.getBuffers(n);r.encoder.draw({geometry:s.geometry,shader:n.shader||e.defaultShader,state:o,size:n.particleChildren.length*6})}}
function hH(t,e=null){const n=t*6;if(n>65535?e||(e=new Uint32Array(n)):e||(e=new Uint16Array(n)),e.length!==n)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${n}`);for(let r=0,i=0;r<n;r+=6,i+=4)e[r+0]=i+0,e[r+1]=i+1,e[r+2]=i+2,e[r+3]=i+0,e[r+4]=i+2,e[r+5]=i+3;return e}
function sxe(t){return{dynamicUpdate:Mre(t,!0),staticUpdate:Mre(t,!1)}}
function Mre(t,e){const n=[];n.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const o in t){const s=t[o];if(e!==s.dynamic)continue;n.push(`offset = index + ${r}`),n.push(s.code);const a=Oy(s.format);r+=a.stride/4}n.push(`
            index += stride * 4;
        }
    `),n.unshift(`
        var stride = ${r};
    `);const i=n.join(`
`);return new Function("ps","f32v","u32v",i)}
class axe{constructor(e){this._size=0,this._generateParticleUpdateCache={};const n=this._size=e.size??1e3,r=e.properties;let i=0,o=0;for(const u in r){const d=r[u],h=Oy(d.format);d.dynamic?o+=h.stride:i+=h.stride}this._dynamicStride=o/4,this._staticStride=i/4,this.staticAttributeBuffer=new Cx(n*4*i),this.dynamicAttributeBuffer=new Cx(n*4*o),this.indexBuffer=hH(n);const s=new T_;let a=0,l=0;this._staticBuffer=new Gd({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:Ki.VERTEX|Ki.COPY_DST}),this._dynamicBuffer=new Gd({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:Ki.VERTEX|Ki.COPY_DST});for(const u in r){const d=r[u],h=Oy(d.format);d.dynamic?(s.addAttribute(d.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:a*4,format:d.format}),a+=h.size):(s.addAttribute(d.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:l*4,format:d.format}),l+=h.size)}s.addIndex(this.indexBuffer);const c=this.getParticleUpdate(r);this._dynamicUpload=c.dynamicUpdate,this._staticUpload=c.staticUpdate,this.geometry=s}getParticleUpdate(e){const n=_We(e);return this._generateParticleUpdateCache[n]?this._generateParticleUpdateCache[n]:(this._generateParticleUpdateCache[n]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[n])}generateParticleUpdate(e){return sxe(e)}update(e,n){e.length>this._size&&(n=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new Cx(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new Cx(this._size*this._dynamicStride*4*4),this.indexBuffer=hH(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),n){const i=this.staticAttributeBuffer;this._staticUpload(e,i.float32View,i.uint32View),this._staticBuffer.setDataWithSize(i.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}
function _We(t){const e=[];for(const n in t){const r=t[n];e.push(n,r.code,r.dynamic?"d":"s")}return e.join("_")}
class uxe extends sf{constructor(){const e=of.from({vertex:cxe,fragment:lxe}),n=sh.from({fragment:{source:fH,entryPoint:"mainFragment"},vertex:{source:fH,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:n,resources:{uTexture:fn.WHITE.source,uSampler:new Jh({}),uniforms:{uTranslationMatrix:{value:new dn,type:"mat3x3<f32>"},uColor:{value:new co(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}
class TX{constructor(e,n){this.state=Qh.for2d(),this.localUniforms=new il({uTranslationMatrix:{value:new dn,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=n,this.defaultShader=new uxe,this.state=Qh.for2d()}validateRenderable(e){return!1}addRenderable(e,n){this.renderer.renderPipes.batch.break(n),n.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new axe({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const n=e.particleChildren;if(n.length===0)return;const r=this.renderer,i=this.getBuffers(e);e.texture||(e.texture=n[0].texture);const o=this.state;i.update(n,e._childrenDirty),e._childrenDirty=!1,o.blendMode=n5(e.blendMode,e.texture._source);const s=this.localUniforms.uniforms,a=s.uTranslationMatrix;e.worldTransform.copyTo(a),a.prepend(r.globalUniforms.globalUniformData.projectionMatrix),s.uResolution=r.globalUniforms.globalUniformData.resolution,s.uRound=r._roundPixels|e._roundPixels,e3(e.groupColorAlpha,s.uColor,0),this.adaptor.execute(this,e)}destroy(){this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}
class dxe extends TX{constructor(e){super(e,new ixe)}}
class hxe extends TX{constructor(e){super(e,new oxe)}}
const fxe=class pH{constructor(e){if(e instanceof fn)this.texture=e,vN(this,pH.defaultOptions,{});else{const n={...pH.defaultOptions,...e};vN(this,n,{})}}get alpha(){return this._alpha}set alpha(e){this._alpha=Math.min(Math.max(e,0),1),this._updateColor()}get tint(){return pS(this._tint)}set tint(e){this._tint=co.shared.setValue(e??16777215).toBgrNumber(),this._updateColor()}_updateColor(){this.color=this._tint+((this._alpha*255|0)<<24)}};
let SWe=fxe;
let CWe=pxe;
const mxe=class gxe extends UI{constructor(e={}){e={...gxe.defaultOptions,...e},super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){var n,r;this.width=e.width??this.width,this.height=e.height??this.height,this._originalWidth=e.originalWidth??this._originalWidth,this._originalHeight=e.originalHeight??this._originalHeight,this._leftWidth=e.leftWidth??this._leftWidth,this._rightWidth=e.rightWidth??this._rightWidth,this._topHeight=e.topHeight??this._topHeight,this._bottomHeight=e.bottomHeight??this._bottomHeight,this._anchorX=(n=e.anchor)==null?void 0:n.x,this._anchorY=(r=e.anchor)==null?void 0:r.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:n,height:r,_leftWidth:i,_rightWidth:o,_topHeight:s,_bottomHeight:a,_anchorX:l,_anchorY:c}=this,u=i+o,d=n>u?1:n/u,h=s+a,p=r>h?1:r/h,g=Math.min(d,p),b=l*n,v=c*r;e[0]=e[8]=e[16]=e[24]=-b,e[2]=e[10]=e[18]=e[26]=i*g-b,e[4]=e[12]=e[20]=e[28]=n-o*g-b,e[6]=e[14]=e[22]=e[30]=n-b,e[1]=e[3]=e[5]=e[7]=-v,e[9]=e[11]=e[13]=e[15]=s*g-v,e[17]=e[19]=e[21]=e[23]=r-a*g-v,e[25]=e[27]=e[29]=e[31]=r-v,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const n=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=n*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-n*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};
const yxe=class bxe extends h0{constructor(e){var h,p,g,b;e instanceof fn&&(e={texture:e});const{width:n,height:r,anchor:i,leftWidth:o,rightWidth:s,topHeight:a,bottomHeight:l,texture:c,roundPixels:u,...d}=e;super({label:"NineSliceSprite",...d}),this.renderPipeId="nineSliceSprite",this.batched=!0,this._leftWidth=o??((h=c==null?void 0:c.defaultBorders)==null?void 0:h.left)??w1.defaultOptions.leftWidth,this._topHeight=a??((p=c==null?void 0:c.defaultBorders)==null?void 0:p.top)??w1.defaultOptions.topHeight,this._rightWidth=s??((g=c==null?void 0:c.defaultBorders)==null?void 0:g.right)??w1.defaultOptions.rightWidth,this._bottomHeight=l??((b=c==null?void 0:c.defaultBorders)==null?void 0:b.bottom)??w1.defaultOptions.bottomHeight,this._width=n??c.width??w1.defaultOptions.width,this._height=r??c.height??w1.defaultOptions.height,this.allowChildren=!1,this.texture=c??bxe.defaultOptions.texture,this.roundPixels=u??!1,this._anchor=new La({_onUpdate:()=>{this.onViewUpdate()}}),i?this.anchor=i:this.texture.defaultAnchor&&(this.anchor=this.texture.defaultAnchor)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get width(){return this._width}set width(e){this._width=e,this.onViewUpdate()}get height(){return this._height}set height(e){this._height=e,this.onViewUpdate()}setSize(e,n){typeof e=="object"&&(n=e.height??e.width,e=e.width),this._width=e,this._height=n??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}get leftWidth(){return this._leftWidth}set leftWidth(e){this._leftWidth=e,this.onViewUpdate()}get topHeight(){return this._topHeight}set topHeight(e){this._topHeight=e,this.onViewUpdate()}get rightWidth(){return this._rightWidth}set rightWidth(e){this._rightWidth=e,this.onViewUpdate()}get bottomHeight(){return this._bottomHeight}set bottomHeight(e){this._bottomHeight=e,this.onViewUpdate()}get texture(){return this._texture}set texture(e){e||(e=fn.EMPTY);const n=this._texture;n!==e&&(n&&n.dynamic&&n.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get originalWidth(){return this._texture.width}get originalHeight(){return this._texture.height}destroy(e){if(super.destroy(e),typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(r)}this._texture=null}updateBounds(){const e=this._bounds,n=this._anchor,r=this._width,i=this._height;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}};
let vxe=yxe;
class AWe extends vxe{constructor(...e){let n=e[0];n instanceof fn&&(zn(Vr,"NineSlicePlane now uses the options object {texture, leftWidth, rightWidth, topHeight, bottomHeight}"),n={texture:n,leftWidth:e[1],topHeight:e[2],rightWidth:e[3],bottomHeight:e[4]}),zn(Vr,"NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(n)}}
class wxe extends GI{constructor(){super(),this.geometry=new w1}destroy(){this.geometry.destroy()}}
class xxe{constructor(e){this._renderer=e}addRenderable(e,n){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,n)}updateRenderable(e){const n=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,n),n._batcher.updateElement(n)}validateRenderable(e){const n=this._getGpuSprite(e);return!n._batcher.checkAndUpdateTexture(n,e._texture)}_updateBatchableSprite(e,n){n.geometry.update(e),n.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const n=e._gpuData[this._renderer.uid]=new wxe,r=n;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),n}destroy(){this._renderer=null}}
let zB,UB;
class kxe extends sf{constructor(){zB??(zB=X5({name:"tiling-sprite-shader",bits:[SS,_xe,Z5]})),UB??(UB=K5({name:"tiling-sprite-shader",bits:[LI,Sxe,J5]}));const e=new il({uMapCoord:{value:new dn,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new dn,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:UB,gpuProgram:zB,resources:{localUniforms:new il({uTransformMatrix:{value:new dn,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:fn.EMPTY.source,uSampler:fn.EMPTY.source.style}})}updateUniforms(e,n,r,i,o,s){const a=this.resources.tilingUniforms,l=s.width,c=s.height,u=s.textureMatrix,d=a.uniforms.uTextureTransform;d.set(r.a*l/e,r.b*l/n,r.c*c/e,r.d*c/n,r.tx/e,r.ty/n),d.invert(),a.uniforms.uMapCoord=u.mapCoord,a.uniforms.uClampFrame=u.uClampFrame,a.uniforms.uClampOffset=u.uClampOffset,a.uniforms.uTextureTransform=d,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=n,a.uniforms.uSizeAnchor[2]=i,a.uniforms.uSizeAnchor[3]=o,s&&(this.resources.uTexture=s.source,this.resources.uSampler=s.source.style)}}
class Cxe extends P_{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}
function Axe(t,e){const n=t.anchor.x,r=t.anchor.y;e[0]=-n*t.width,e[1]=-r*t.height,e[2]=(1-n)*t.width,e[3]=-r*t.height,e[4]=(1-n)*t.width,e[5]=(1-r)*t.height,e[6]=-n*t.width,e[7]=(1-r)*t.height}
function Exe(t,e,n,r){let i=0;const o=t.length/(e||2),s=r.a,a=r.b,l=r.c,c=r.d,u=r.tx,d=r.ty;for(n*=e;i<o;){const h=t[n],p=t[n+1];t[n]=s*h+l*p+u,t[n+1]=a*h+c*p+d,n+=e,i++}}
function Txe(t,e){const n=t.texture,r=n.frame.width,i=n.frame.height;let o=0,s=0;t.applyAnchorToTexture&&(o=t.anchor.x,s=t.anchor.y),e[0]=e[6]=-o,e[2]=e[4]=1-o,e[1]=e[3]=-s,e[5]=e[7]=1-s;const a=dn.shared;a.copyFrom(t._tileTransform.matrix),a.tx/=t.width,a.ty/=t.height,a.invert(),a.scale(t.width/r,t.height/i),Exe(e,2,0,a)}
const nP=new Cxe;
class Mxe{constructor(){this.canBatch=!0,this.geometry=new P_({indices:nP.indices.slice(),positions:nP.positions.slice(),uvs:nP.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}
class Pxe{constructor(e){this._state=Qh.default2d,this._renderer=e}validateRenderable(e){const n=this._getTilingSpriteData(e),r=n.canBatch;this._updateCanBatch(e);const i=n.canBatch;if(i&&i===r){const{batchableMesh:o}=n;return!o._batcher.checkAndUpdateTexture(o,e.texture)}return r!==i}addRenderable(e,n){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const i=this._getTilingSpriteData(e),{geometry:o,canBatch:s}=i;if(s){i.batchableMesh||(i.batchableMesh=new GI);const a=i.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=o,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(a,n)}else r.break(n),i.shader||(i.shader=new kxe),this.updateRenderable(e),n.add(e)}execute(e){const{shader:n}=this._getTilingSpriteData(e);n.groups[0]=this._renderer.globalUniforms.bindGroup;const r=n.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,e3(e.groupColorAlpha,r.uColor,0),this._state.blendMode=n5(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:nP,shader:n,state:this._state})}updateRenderable(e){const n=this._getTilingSpriteData(e),{canBatch:r}=n;if(r){const{batchableMesh:i}=n;e.didViewUpdate&&this._updateBatchableMesh(e),i._batcher.updateElement(i)}else if(e.didViewUpdate){const{shader:i}=n;i.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const n=new Mxe;return n.renderable=e,e._gpuData[this._renderer.uid]=n,n}_updateBatchableMesh(e){const n=this._getTilingSpriteData(e),{geometry:r}=n,i=e.texture.source.style;i.addressMode!=="repeat"&&(i.addressMode="repeat",i.update()),Txe(e,r.uvs),Axe(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const n=this._getTilingSpriteData(e),r=e.texture;let i=!0;return this._renderer.type===Zd.WEBGL&&(i=this._renderer.context.supports.nonPowOf2wrapping),n.canBatch=r.textureMatrix.isSimple&&(i||r.source.isPowerOfTwo),n.canBatch}}
const Nxe={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},Rxe={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},Ixe={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},Oxe={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};
let GB,HB;
class Dxe extends sf{constructor(e){const n=new il({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new dn,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});GB??(GB=X5({name:"sdf-shader",bits:[_I,kI(e),Nxe,Ixe,Z5]})),HB??(HB=K5({name:"sdf-shader",bits:[SI,CI(e),Rxe,Oxe,J5]})),super({glProgram:HB,gpuProgram:GB,resources:{localUniforms:n,batchSamplers:AI(e)}})}}
class Lxe extends Ay{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}
class Bxe{constructor(e){this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_gpuBitmapText")}validateRenderable(e){const n=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(n)}addRenderable(e,n){const r=this._getGpuBitmapText(e);Pre(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,n),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const n=this._getGpuBitmapText(e);Pre(e,n),this._renderer.renderPipes.graphics.updateRenderable(n),n.context.customShader&&this._updateDistanceField(e)}_updateContext(e,n){const{context:r}=n,i=i5.getFont(e.text,e._style);r.clear(),i.distanceField.type!=="none"&&(r.customShader||(r.customShader=new Dxe(this._renderer.limits.maxBatchableTextures)));const o=Ec.graphemeSegmenter(e.text),s=e._style;let a=i.baseLineOffset;const l=MI(o,s,i,!0),c=s.padding,u=l.scale;let d=l.width,h=l.height+l.offsetY;s._stroke&&(d+=s._stroke.width/u,h+=s._stroke.width/u),r.translate(-e._anchor._x*d-c,-e._anchor._y*h-c).scale(u,u);const p=i.applyFillAsTint?s._fill.color:16777215;let g=i.fontMetrics.fontSize,b=i.lineHeight;s.lineHeight&&(g=s.fontSize/u,b=s.lineHeight/u);let v=(b-g)/2;v-i.baseLineOffset<0&&(v=0);for(let w=0;w<l.lines.length;w++){const k=l.lines[w];for(let A=0;A<k.charPositions.length;A++){const T=k.chars[A],P=i.chars[T];if(P!=null&&P.texture){const R=P.texture;r.texture(R,p||"black",Math.round(k.charPositions[A]+P.xOffset),Math.round(a+P.yOffset+v),R.orig.width,R.orig.height)}}a+=b}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const n=new Lxe;return e._gpuData[this._renderer.uid]=n,this._updateContext(e,n),n}_updateDistanceField(e){const n=this._getGpuBitmapText(e).context,r=e._style.fontFamily,i=Fo.get(`${r}-bitmap`),{a:o,b:s,c:a,d:l}=e.groupTransform,c=Math.sqrt(o*o+s*s),u=Math.sqrt(a*a+l*l),d=(Math.abs(c)+Math.abs(u))/2,h=i.baseRenderedFontSize/e._style.fontSize,p=d*i.distanceField.range*(1/h);n.customShader.resources.localUniforms.uniforms.uDistance=p}destroy(){this._renderer=null}}
function Pre(t,e){e.groupTransform=t.groupTransform,e.groupColorAlpha=t.groupColorAlpha,e.groupColor=t.groupColor,e.groupBlendMode=t.groupBlendMode,e.globalDisplayStatus=t.globalDisplayStatus,e.groupTransform=t.groupTransform,e.localDisplayStatus=t.localDisplayStatus,e.groupAlpha=t.groupAlpha,e._roundPixels=t._roundPixels}
function Fxe(t){const{text:e,style:n,chars:r}=t,i=n,o=i5.getFont(e,i),s=Ec.graphemeSegmenter(e),a=MI(s,i,o,!0),l=a.scale,c=[],u=[],d=[],h=n.lineHeight?n.lineHeight:o.lineHeight*l;let p=0;for(const g of a.lines){if(g.chars.length===0)continue;const b=new la({label:"line"});b.y=p,d.push(b);let v=new la({label:"word"}),w=0;for(let k=0;k<g.chars.length;k++){const A=g.chars[k];if(!A||!o.chars[A])continue;const P=A===" ",R=k===g.chars.length-1;let B;r.length>0?(B=r.shift(),B.text=A,B.style=i,B.label=`char-${A}`,B.x=g.charPositions[k]*l-g.charPositions[w]*l):B=new hY({text:A,style:i,label:`char-${A}`,x:g.charPositions[k]*l-g.charPositions[w]*l}),P||(c.push(B),v.addChild(B)),(P||R)&&v.children.length>0&&(v.x=g.charPositions[w]*l,u.push(v),b.addChild(v),v=new la({label:"word"}),w=k+1)}p+=h}return{chars:c,lines:d,words:u}}
class jxe extends c8{constructor(e){super(),this.generatingTexture=!1,this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){this._renderer.htmlText.returnTexturePromise(this.texturePromise),this.texturePromise=null,this._renderer=null}}
function NN(t,e){const{texture:n,bounds:r}=t,i=e._style._getFinalPadding();_$(r,e._anchor,n);const o=e._anchor._x*i*2,s=e._anchor._y*i*2;r.minX-=i-o,r.minY-=i-s,r.maxX-=i-o,r.maxY-=i-s}
class zxe{constructor(e){this._renderer=e}validateRenderable(e){return e._didTextUpdate}addRenderable(e,n){const r=this._getGpuText(e);e._didTextUpdate&&(this._updateGpuText(e).catch(i=>{console.error(i)}),e._didTextUpdate=!1,NN(r,e)),this._renderer.renderPipes.batch.addToBatch(r,n)}updateRenderable(e){const n=this._getGpuText(e);n._batcher.updateElement(n)}async _updateGpuText(e){e._didTextUpdate=!1;const n=this._getGpuText(e);if(n.generatingTexture)return;n.texturePromise&&(this._renderer.htmlText.returnTexturePromise(n.texturePromise),n.texturePromise=null),n.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const r=this._renderer.htmlText.getTexturePromise(e);n.texturePromise=r,n.texture=await r;const i=e.renderGroup||e.parentRenderGroup;i&&(i.structureDidChange=!0),n.generatingTexture=!1,NN(n,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const n=new jxe(this._renderer);return n.renderable=e,n.transform=e.groupTransform,n.texture=fn.EMPTY,n.bounds={minX:0,maxX:1,minY:0,maxY:0},n.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=n,n}destroy(){this._renderer=null}}
function Uxe(){const{userAgent:t}=qr.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(t)}
const EWe=new Rc;
function MX(t,e,n,r){const i=EWe;i.minX=0,i.minY=0,i.maxX=t.width/r|0,i.maxY=t.height/r|0;const o=Qa.getOptimalTexture(i.width,i.height,r,!1);return o.source.uploadMethodId="image",o.source.resource=t,o.source.alphaMode="premultiply-alpha-on-upload",o.frame.width=e/r,o.frame.height=n/r,o.source.emit("update",o.source),o.updateUvs(),o}
function Gxe(t,e){const n=e.fontFamily,r=[],i={},o=/font-family:([^;"\s]+)/g,s=t.match(o);function a(l){i[l]||(r.push(l),i[l]=!0)}if(Array.isArray(n))for(let l=0;l<n.length;l++)a(n[l]);else a(n);s&&s.forEach(l=>{const c=l.split(":")[1].trim();a(c)});for(const l in e.tagStyles){const c=e.tagStyles[l].fontFamily;a(c)}return r}
async function Hxe(t){const n=await(await qr.get().fetch(t)).blob(),r=new FileReader;return await new Promise((o,s)=>{r.onloadend=()=>o(r.result),r.onerror=s,r.readAsDataURL(n)})}
async function Vxe(t,e){const n=await Hxe(e);return`@font-face {
        font-family: "${t.fontFamily}";
        font-weight: ${t.fontWeight};
        font-style: ${t.fontStyle};
        src: url('${n}');
    }`}
const rP=new Map;
async function qxe(t){const e=t.filter(n=>Fo.has(`${n}-and-url`)).map(n=>{if(!rP.has(n)){const{entries:r}=Fo.get(`${n}-and-url`),i=[];r.forEach(o=>{const s=o.url,l=o.faces.map(c=>({weight:c.weight,style:c.style}));i.push(...l.map(c=>Vxe({fontWeight:c.weight,fontStyle:c.style,fontFamily:n},s)))}),rP.set(n,Promise.all(i).then(o=>o.join(`
`)))}return rP.get(n)});return(await Promise.all(e)).join(`
`)}
function Wxe(t,e,n,r,i){const{domElement:o,styleElement:s,svgRoot:a}=i;o.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${t}</div>`,o.setAttribute("style",`transform: scale(${n});transform-origin: top left; display: inline-block`),s.textContent=r;const{width:l,height:c}=i.image;return a.setAttribute("width",l.toString()),a.setAttribute("height",c.toString()),new XMLSerializer().serializeToString(a)}
function $xe(t,e){const n=Dy.getOptimalCanvasAndContext(t.width,t.height,e),{context:r}=n;return r.clearRect(0,0,t.width,t.height),r.drawImage(t,0,0),n}
function Yxe(t,e,n){return new Promise(async r=>{n&&await new Promise(i=>setTimeout(i,100)),t.onload=()=>{r()},t.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,t.crossOrigin="anonymous"})}
class Xxe{constructor(e){this._renderer=e,this._createCanvas=e.type===Zd.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:n,style:r,resolution:i,textureStyle:o}=e,s=cc.get(fY),a=Gxe(n,r),l=await qxe(a),c=pY(n,r,l,s),u=Math.ceil(Math.ceil(Math.max(1,c.width)+r.padding*2)*i),d=Math.ceil(Math.ceil(Math.max(1,c.height)+r.padding*2)*i),h=s.image,p=2;h.width=(u|0)+p,h.height=(d|0)+p;const g=Wxe(n,r,i,l,s);await Yxe(h,g,Uxe()&&a.length>0);const b=h;let v;this._createCanvas&&(v=$xe(h,i));const w=MX(v?v.canvas:b,h.width-p,h.height-p,i);return o&&(w.source.style=o),this._createCanvas&&(this._renderer.texture.initSource(w.source),Dy.returnCanvasAndContext(v)),cc.return(s),w}returnTexturePromise(e){e.then(n=>{this._cleanUp(n)}).catch(()=>{er("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){Qa.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null}}
function cm(t,e){return e<t.length?t.charCodeAt(e):0}

export { _qe, _re, _S, _ve, _we, _We, _X, _Y, $qe, $we, $xe, $Y, aH, AN, aqe, Aqe, Are, ave, Ave, awe, aWe, AWe, aX, AX, axe, Axe, Ay, AY, B1e, B6, BI, bqe, Bqe, bre, bwe, bWe, Bwe, bX, Bxe, bY, BY, c8, cH, cm, cM, CN, cqe, Cqe, Cre, cve, cwe, cWe, Cwe, CWe, cX, CX, Cxe, cY, CY, D1e, d6, dH, DI, dM, dqe, Dqe, dve, Dve, dwe, dWe, Dwe, dX, dxe, Dxe, dY, DY, e3, eb, ed, EN, eqe, Eqe, Ere, eve, Eve, ewe, eWe, Ewe, EWe, eX, EX, exe, Exe, EY, F1e, FB, FI, fqe, Fqe, fre, fve, Fve, fwe, fWe, Fwe, fX, fxe, Fxe, fy, fY, FY, G1e, GB, GI, go, gqe, Gqe, gre, Gve, gwe, gWe, gX, Gxe, gY, GY, H1e, HB, HC, hH, hM, Hqe, hve, Hve, hwe, hWe, Hwe, hX, hxe, Hxe, hY, HY, iH, II, iqe, Iqe, Ive, iwe, iWe, Iwe, iX, ixe, Ixe, IY, j1e, J1e, Jb, jI, jqe, Jqe, jve, Jve, JVe, jwe, Jwe, jxe, jY, JY, K1e, kqe, Kqe, kre, kve, Kve, KVe, kwe, Kwe, kX, kxe, kY, KY, L1e, l8, lqe, Lqe, lve, lWe, Lwe, lX, Lxe, LY, MN, mqe, Mqe, mre, Mre, mve, Mve, mWe, Mwe, mX, MX, mxe, Mxe, mY, MY, N1e, nH, NN, nP, nqe, Nqe, nve, Nve, nwe, nWe, Nwe, Nxe, NY, O1e, oH, OI, oqe, Oqe, Ove, owe, oWe, Owe, oX, oxe, Oxe, OY, P_, P1e, PN, pqe, Pqe, pre, Pre, pve, Pve, pwe, pWe, Pwe, pX, Pxe, pY, PY, q1e, Q1e, Q5, Q9, qC, qqe, Qqe, qve, Qve, QVe, qwe, qxe, qY, QY, R1e, rH, RI, rP, rqe, Rqe, rve, Rve, rwe, Rwe, rX, rxe, Rxe, sH, sqe, Sqe, Sre, sve, Sve, swe, sWe, Swe, SWe, sX, SX, sxe, SY, tH, TN, tP, tqe, Tqe, Tre, Tve, twe, tWe, Twe, TX, txe, Txe, TY, U1e, UB, uH, UI, uM, uqe, Uqe, uve, Uve, uWe, Uwe, uX, uxe, Uxe, uY, UY, V1e, VC, vqe, Vqe, vre, Vve, vWe, vxe, Vxe, vY, VY, W1e, WA, wqe, Wqe, wre, wve, Wve, Ww, wwe, wWe, Wwe, wX, wxe, Wxe, wY, WY, X1e, xqe, Xqe, xre, Xve, XVe, xwe, xWe, Xwe, xX, xxe, Xxe, xY, XY, Y1e, yqe, Yqe, yre, Yve, YVe, yWe, Ywe, yX, yxe, Yxe, yY, YY, Z1e, zB, zI, zqe, Zqe, zve, Zve, ZVe, zwe, zxe, zY, ZY }
