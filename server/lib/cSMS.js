/**
 * Created by stitchcula on 16-4-10.
 */

import crypto from 'crypto'
import fetch from "node-fetch"

class cSMS{
    constructor(ids){
        ids=ids||{}
        this.accountSid=ids.accountSid||process.env['QMY_ACCOUNT_SID']
        this.appId=ids.appId||process.env['QMY_APP_ID']
        this.token=ids.token||process.env['QMY_TOKEN']
        this.version=ids.version||process.env['QMY_VERSION']
    }
    timestamp(){
        var date=this.date
        var yyyy=date.getFullYear()+""
            ,mm=(date.getMonth()>8)?(date.getMonth()+1):("0"+(date.getMonth()+1))+""
            ,dd=(date.getDate()>9)?date.getDate():("0"+date.getDate())+""
            ,hh=(date.getHours()>9)?date.getHours():("0"+date.getHours())+""
            ,mi=(date.getMinutes()>9)?date.getMinutes():("0"+date.getMinutes())+""
            ,ss=(date.getSeconds()>9)?date.getSeconds():("0"+date.getSeconds())+""
        return yyyy+mm+dd+hh+mi+ss
    }
    sig(){
        var s=crypto.createHash('md5').update(this.accountSid+this.token+this.timestamp())
        return s.digest('hex')
    }
    getParam(arr){
        if(typeof(arr)=="string") return arr
        var str=""
        for(var i=0;i<arr.length;i++)
            str = (i != arr.length - 1) ? (str+arr[i] + ",") :(str+arr[i])
        return str
    }
    async send(to,type,arr){
        if(!type||!/^[0-9]{11}$/.test(to))
            return null
        to=to+""
        var param=this.getParam(arr)
        switch(type){
            case "zzdyyx_vfc":
                this.templateId="21310018"
                break
        }
        this.date=new Date()
        var url=`https://api.qingmayun.com/${this.version}/accounts/${this.accountSid}/SMS/templateSMS?sig=${this.sig()}&timestamp=${this.timestamp()}`
        var body={
            templateSMS: {
                appId: this.appId,
                templateId: this.templateId,
                to: to,
                param:param
            }
        }
        var res=await fetch(url,{method:'POST',body:JSON.stringify(body),headers:{"Content-Type":"application/json","Accept":"application/json"}})
        var j=await res.json()
        console.log(JSON.stringify(body))
        console.log(j)
        return j
    }
}

export default cSMS

