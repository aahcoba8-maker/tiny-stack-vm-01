import{mkdirSync as Y,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs';import{join as J}from'node:path';
let E=process.env,I=E.MAKEFUN_INPUT_DIR??'/input',O=E.MAKEFUN_OUTPUT_DIR??'/output',A=Int32Array,U=Uint8Array,Z='ABBEGKLPQQQQQQQQJJJJJJJFJJJFJJJQJJJQQQQQQQQQQQQQAEEAAQQQQQQQQQQQFIQQQQQQQQQQQQQQEEBE',B=[(a,b)=>a+b,(a,b)=>a-b,(a,b)=>Math.imul(a,b),(a,b)=>a/b,(a,b)=>a%b,(a,b)=>(a>>>0)/(b>>>0),(a,b)=>(a>>>0)%(b>>>0),,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31),,(a,b)=>a==b,(a,b)=>a<b,(a,b)=>(a>>>0)<(b>>>0)];
for(let d of R(I).sort()){
let p=F(J(I,d,'program.bin')),q,D=new A(256),K=new A(64),m=new A(256),o=new U(65536),sp=0,cp=0,ol=0,ip=0,pc=0,st=0,n=p.length,code=0,x,y,j,t,k,w,z,v,op,il,po,h;
try{q=F(J(I,d,'input.bin'))}catch{q=[]}
try{for(;;){
if(st>=1e6)throw 10;
if(pc<0||pc>=n)throw 9;
op=p[pc];il=op==1?1:op==2?4:op>47&&op<52?2:0;
z=Z.charCodeAt(op)-65;po=z>>2;
if(op>83||z>15)throw 5;
if(pc+il>=n)throw 9;
if(sp<po)throw 2;
if(sp-po+(z&3)>256)throw 3;h=sp-1;
if(il==1)v=(p[pc+1]<<24)>>24;
else if(il==4)v=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;
else if(il==2){w=p[pc+1]|p[pc+2]<<8;j=pc+3+((w<<16)>>16)}
pc+=1+il;st++;
if(op==0)throw 0;
else if(op<3)D[sp++]=v;
else if(op==3)sp--;
else if(op==4)D[sp]=D[h],sp++;
else if(op==5)y=D[h],D[h]=D[h-1],D[h-1]=y;
else if(op==6)D[sp]=D[h-1],sp++;
else if(op==7)y=D[h-2],D[h-2]=D[h-1],D[h-1]=D[h],D[h]=y;
else if(op>15&&op<35){if(op==23)D[h]=-D[h];else if(op==27)D[h]=~D[h];else{y=D[h];sp=h;x=D[h-1];if(op>18&&op<23&&!y)throw 4;D[h-1]=B[op-16](x,y)}}
else if(op==48)pc=j;
else if(op>48&&op<51){if((op==49)==!D[--sp])pc=j}
else if(op==51){if(cp>63)throw 7;K[cp++]=pc;pc=w}
else if(op==52){if(!cp)throw 8;pc=K[--cp]}
else if(op==64){x=D[h];if(x<0||x>255)throw 6;D[h]=m[x]}
else if(op==65){x=D[--sp];y=D[--sp];if(x<0||x>255)throw 6;m[x]=y}
else if(op==80){t=''+D[--sp];if(ol+t.length>65536)throw 11;for(k of t)o[ol++]=k.charCodeAt(0)}
else if(op==81){if(ol>65535)throw 11;o[ol++]=D[--sp]&255}
else if(op==82)D[sp++]=ip<q.length?q[ip++]:-1;
else throw D[h]&255;
}
}catch(e){code=e}
Y(J(O,d),{recursive:true});W(J(O,d,'stdout.bin'),o.slice(0,ol));W(J(O,d,'exit.txt'),code+'\n');
}
