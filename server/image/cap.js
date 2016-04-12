var execFileSync=require('child_process').execFileSync
var fs=require('fs')
//var img=fs.readFileSync("1.jpg")
var stdout=execFileSync("./cap",["-str=2333"],{maxBuffer: 20*1024*1024})
fs.writeFileSync("2.png",stdout)