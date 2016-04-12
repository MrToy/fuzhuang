var execFileSync=require('child_process').execFileSync
var fs=require('fs')
var img=fs.readFileSync("1.jpg")
var stdout=execFileSync("./resize",["-w=50","-h=50","-t=jpg"],{input:img,maxBuffer: 20*1024*1024})
fs.writeFileSync("2.jpg",stdout)