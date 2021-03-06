var AV = require('leanengine');
let sexiJson = require('../scrapy_spider/picture-jsons/sexi.json');
let myyfmJson = require('../scrapy_spider/picture-jsons/myyfm.json');
let gfsdfJson = require('../scrapy_spider/picture-jsons/gfsd.json');
let mlyzJson = require('../scrapy_spider/picture-jsons/mlyz.json');
let sexiaozuJson = require('../scrapy_spider/picture-jsons/sexiaozu.json');
let funnyGifJson = require('../scrapy_spider/picture-jsons/funny-gif.json');
let evilGifJson = require('../scrapy_spider/picture-jsons/evil-gif.json');
let neihanJson = require('../scrapy_spider/picture-jsons/neihan.json');
let duanziJson = require('../scrapy_spider/picture-jsons/duanzi.json');

let resultJson = require('../data/Picture.json');
let File = require('../models/file');
var fs = require('fs');

AV.init({
    appId: 'qhJNhVXqGVUzKMhsEmddftqd-gzGzoHsz',
    appKey: 'PSvkSKv6TkBRJFOFpG2BXM9q'
});

var newPictureJson = resultJson;
var index = 0;
function getFile(picture) {
    if(picture) {
        File.queryOneBy({name: picture.file_name}).then((file)=>{
            console.log(index + ': query finish! ' + file.get('url'));
            newPictureJson.push(Object.assign({},picture,{qiniu_url: file.get('url')} ));
            fs.writeFileSync('./data/Picture.json', JSON.stringify(newPictureJson) , 'utf-8');
            index++;
            getFile(duanziJson[index]);
        });
    }else {
        console.info('update finish!');
    }

}

getFile(duanziJson[index]);

