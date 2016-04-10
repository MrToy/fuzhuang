import Router from 'koa-router'
import fetch from "node-fetch"
import url from "url"


function decodeObjUrl(objUrl){
    if(objUrl == '') return '' 
    var map ={'w' : "a", 'k': "b", 'v': "c", '1': "d",  
        'j': "e", 'u': "f", '2': "g", 'i': "h",  
        't': "i", '3': "j", 'h': "k", 's': "l",  
        '4': "m", 'g': "n", '5': "o", 'r': "p",  
        'q': "q", '6': "r", 'f': "s", 'p': "t",  
        '7': "u", 'e': "v", 'o': "w", '8': "1",  
        'd': "2", 'n': "3", '9': "4", 'c': "5",  
        'm': "6", '0': "7", 'b': "8", 'l': "9",  
        'a': "0",  '_z2C$q': ":",  '_z&e3B': ".", 'AzdH3F': "/"}
    objUrl=objUrl.replace(/_z2C\$q/gm,':').replace(/_z&e3B/gm,'.').replace(/AzdH3F/gm,'/')
    objUrl=objUrl.split('')
    for(var i=0;i<objUrl.length;i++){
    	if(map[objUrl[i]]){
    		objUrl[i]=map[objUrl[i]]
    	}
    }
    return objUrl.join('')
} 
var tested={}
var router=new Router()
router.get('/',async ctx=>{
	var {word,start,len}=ctx.query
	var u="http://image.baidu.com/search/acjson?tn=resultjson_com&ipn&word="+encodeURIComponent(word)+"&pn="+start+"&rn="+len
	var res=await fetch(u)
	var j=await res.json()
	var data=[]
    if(j&&typeof j.data=='object'){
        for(var i=0;i<j.data.length;i++){
            var it =j.data[i]
           if(typeof it=='object'&&it.objURL){
                var title=it.fromPageTitle.replace("</strong>","").replace("<strong>","")
                var u=decodeObjUrl(it.objURL)
                if(tested[u]==true){
                     data.push({title,url:u})
                }else if(tested[u]==false){
                }else{
                    tested[u]=false
                    try{
                        var res=await fetch(u,{follow:0,timeout:200,headers:{
                            "Host":url.parse(u).host,
                            "User-Agent":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:41.0) Gecko/20100101 Firefox/41.0",
                            "Accept": "image/png,image/*;q=0.8,*/*;q=0.5",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Referer": "http://localhost/",
                            "Connection": "keep-alive"
                            }
                        })
                        if(res.status==200){
                            tested[u]=true
                            data.push({title,url:u})
                        }
                    }catch(err){
                    }
                }
           }
        }
    }
	ctx.body=data
})
export default router