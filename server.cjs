const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const allowed={'/':'index.html','/index.html':'index.html','/styles.css':'styles.css','/core.js':'core.js','/app.js':'app.js'};
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const port=Number(process.env.PORT||4317);
http.createServer((req,res)=>{
 const route=new URL(req.url,'http://localhost').pathname;
 if(!allowed[route]){res.writeHead(404);res.end('Not found');return;}
 fs.readFile(path.join(__dirname,allowed[route]),(err,data)=>{
  if(err){res.writeHead(500);res.end('File unavailable');return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(allowed[route])],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);
 });
}).listen(port,'127.0.0.1',()=>console.log(`BriefCheck ready: http://127.0.0.1:${port}`));
