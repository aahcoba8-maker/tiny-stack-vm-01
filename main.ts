import{mkdirSync as Y,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs'
let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,A=Int32Array,Z='ABBEGKLPQQQQQQQQJJJJJJJFJJJFJJJQJJJQQQQQQQQQQQQQAEEAAQQQQQQQQQQQFIQQQQQQQQQQQQQQEEBE',B=[(a,b)=>a+b,(a,b)=>a-b,(a,b)=>Math.imul(a,b),(a,b)=>a/b,(a,b)=>a%b,(a,b)=>(a>>>0)/(b>>>0),(a,b)=>(a>>>0)%(b>>>0),(a,b)=>-b,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,(a,b)=>~b,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b,,(a,b)=>a==b,(a,b)=>a<b,(a,b)=>a>>>0<b>>>0]
for(let d of R(I).sort()){
let g=I+'/'+d+'/',s=O+'/'+d+'/',p=F(g+'program.bin'),q=F(g+'input.bin'),D=new A(256),K=new A(64),m=new A(256),o=new Uint8Array(65536),n=p.length,sp=0,cp=0,ol=0,ip=0,pc=0,st=0,x,y,j,t,k,z,v,op,il,h
try{for(;;){
if(st>=1e6|pc>>>0>=n)throw st>=1e6?10:9
op=p[pc];il=op==1?1:op==2?4:(op>47&op<52)*2
z=Z.charCodeAt(op)-65
if(op>83|z>15)throw 5
pc+=1+il
if(pc>n)throw 9
if(sp<z>>2)throw 2
if(sp-(z>>2)+(z&3)>256)throw 3;h=sp-1;st++
if(il==1)v=p.readInt8(pc-1)
else if(il==4)v=p.readInt32LE(pc-4)
else if(il==2)j=pc+p.readInt16LE(pc-2)
if(op>15&op<35){y=D[h];if(op>18&op<23&&!y)throw 4;if(op==23|op==27)D[sp]=y,h=sp;D[h-1]=B[op-16](D[h-1],y);sp=h}
else switch(op){
case 0:throw 0
case 1:case 2:D[sp++]=v;break
case 3:sp--;break
case 4:case 6:D[sp]=D[h-(op==6)],sp++;break
case 5:y=D[h],D[h]=D[h-1],D[h-1]=y;break
case 7:y=D[h-2],D[h-2]=D[h-1],D[h-1]=D[h],D[h]=y;break
case 48:case 49:case 50:if(op==48||(op==49)==!D[--sp])pc=j;break
case 51:if(cp>63)throw 7;K[cp++]=pc;pc=p.readUInt16LE(pc-2);break
case 52:if(!cp)throw 8;pc=K[--cp];break
case 64:x=D[h];if(x>>>0>255)throw 6;D[h]=m[x];break
case 65:x=D[--sp];y=D[--sp];if(x>>>0>255)throw 6;m[x]=y;break
case 80:t=''+D[--sp];if(ol+t.length>65536)throw 11;for(k of t)o[ol++]=k.charCodeAt();break
case 81:if(ol>65535)throw 11;o[ol++]=D[--sp]&255;break
case 82:D[sp++]=q[ip++]??-1;break
default:throw D[h]&255}
}}catch(e){Y(s,{recursive:true});W(s+'stdout.bin',o.slice(0,ol));W(s+'exit.txt',e+'\n')}
}
