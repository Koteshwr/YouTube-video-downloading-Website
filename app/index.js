const express = require('express');
const bodyparser  = require('body-parser');
const fs = require('fs');
const os = require('os');
const ytd = require('youtube-dl-exec');

const app = express()
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/',(req,res)=>{
    const vlink = req.body.link;
    const path = "C:\\Users\\DELL\\Desktop\\youtube downloader\\app\\downloads";
    const params = {output:`${path}/%(title)s.%(ext)s`,}
    ytd(vlink,params)
    .then(()=>{
        console.log("Download completed");
        res.json({message:'Download completed successfully'});
    })
    .catch((err)=>{
        console.log('Download error: ',err.message);
        
        res.status(500).json({error:'An error occured'})
    })

})


const port = 5000;
app.listen(port,()=>{
    console.log("Server started at 5000");
})