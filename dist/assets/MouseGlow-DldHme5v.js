import{r as d,u as b,j as A}from"./index-Cok_x_3P.js";import{S as W,P as F,W as j,B,a as h,C as y,b as H,N,c as _,d as G}from"./vendor-three-CaoKiMmr.js";import{g as L}from"./vendor-gsap-DDlvirwQ.js";function D({paused:r=!1}){const o=d.useRef(null),w=d.useRef(r),{theme:v}=b();return d.useEffect(()=>{w.current=r,o.current&&(o.current.style.opacity=r?"0":"1")},[r]),d.useEffect(()=>{if(!o.current)return;const i=o.current;for(;i.firstChild;)i.removeChild(i.firstChild);if(v==="light")return;const g=new W,a=new F(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.z=50;const e=new j({alpha:!0,antialias:!1,powerPreference:"high-performance"});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),e.domElement.style.opacity="0",i.appendChild(e.domElement),L.to(e.domElement,{opacity:1,duration:1,ease:"power2.out"});const s=1e3,l=new Float32Array(s*3),x=new Float32Array(s),c=new Float32Array(s*3);for(let t=0;t<s;t++){const R=(Math.random()-.5)*120,C=(Math.random()-.5)*70,E=(Math.random()-.5)*40;l[t*3]=R,l[t*3+1]=C,l[t*3+2]=E,x[t]=Math.random()*.7+.9,c[t*3]=(Math.random()-.5)*.018,c[t*3+1]=(Math.random()-.5)*.018,c[t*3+2]=0}const n=new B;n.setAttribute("position",new h(l,3)),n.setAttribute("size",new h(x,1)),n.setAttribute("velocity",new h(c,3));const M=new y(10456020),S=new y(7036072),m=new H({uniforms:{time:{value:0},color1:{value:M},color2:{value:S},pixelRatio:{value:e.getPixelRatio()},pointSizeMultiplier:{value:40},alphaMultiplier:{value:.38}},vertexShader:`
        attribute float size;
        attribute vec3 velocity;
        uniform float time;
        uniform float pixelRatio;
        uniform float pointSizeMultiplier;
        
        varying float vSize;
        
        void main() {
          vec3 pos = position;
          
          vSize = size;
          
          // Constant drift without brightness modulation
          pos += velocity * time * 10.0;
          if (pos.x > 60.0) pos.x = -60.0;
          if (pos.x < -60.0) pos.x = 60.0;
          if (pos.y > 35.0) pos.y = -35.0;
          if (pos.y < -35.0) pos.y = 35.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pixelRatio * (pointSizeMultiplier / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float alphaMultiplier;
        
        varying float vSize;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          
          vec3 color = mix(color2, color1, vSize);
          alpha *= 0.92;
          
          gl_FragColor = vec4(color, alpha * alphaMultiplier);
        }
      `,transparent:!0,blending:N,depthWrite:!1}),P=new _(n,m);g.add(P);const z=()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),m.uniforms.pixelRatio.value=e.getPixelRatio()};window.addEventListener("resize",z);const p=new G;let u;const f=()=>{if(w.current){p.getDelta(),u=requestAnimationFrame(f);return}const t=p.getElapsedTime();p.getDelta(),m.uniforms.time.value=t,e.render(g,a),u=requestAnimationFrame(f)};return f(),()=>{cancelAnimationFrame(u),window.removeEventListener("resize",z),n.dispose(),m.dispose(),e.dispose(),e.domElement.parentNode===i&&i.removeChild(e.domElement)}},[v]),A.jsx("div",{ref:o,className:"fixed inset-0 z-10 pointer-events-none transition-opacity duration-200"})}export{D as MouseGlow};
