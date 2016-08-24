const domain="http://upload.ikey.pub/oss"

/**
 * @param files InputFiles,onProgress func(per int)
 * @return names []string
 */
export function UploadFiles(files,onProgress){
	var form=new FormData()
	for(var i=0;i<files.length;i++)
		form.append("file",files[i])
	var xhr=new XMLHttpRequest()
	var promise=new Promise((resolve,reject)=>{	
		xhr.onreadystatechange=()=>{
			if(xhr.readyState==4&&xhr.status==200){
				resolve(JSON.parse(xhr.responseText))
			}
		}
		if(onProgress){
			xhr.upload.addEventListener('progress',e=>onProgress(e.loaded/e.total), false)
			xhr.upload.addEventListener('abort',()=>onProgress(0), false)
			xhr.onload=()=>onProgress(0)
		}
		xhr.open("post",domain)
		xhr.send(form)
	})
	promise.abort=()=>{
		xhr.abort()
	}
	return promise
	// var res=await fetch(`${domain}/oss`,{
	// 	method:"POST",
	// 	body:form
	// })
	// if(!res.ok)
	// 	throw await res.text()
	// return await res.json()
}
