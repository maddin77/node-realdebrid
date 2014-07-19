# node-realdebrid
A simple API interface for [real-debrid.com](https://real-debrid.com/) in node.js.

[![NPM](https://nodei.co/npm/realdebrid.png?compact=true)](https://nodei.co/npm/realdebrid/)

## Install
    npm install realdebrid


## Getting started
Real-Debrid suggests to luse cookies instead of logging in every time we need to unrestrict a link.
> To avoid SQL queries it would be good to use the cookie you will have on the login page, it is valid during a very long time

so we start by logging in:
```javascript
var realdebrid = require('realdebrid');
realdebrid.login('username', 'password', function (err) {
    //If err is null, everything is okay.
});
```
and now we can start unrestricting links:
```javascript
var realdebrid = require('realdebrid');
realdebrid.login('username', 'password', function (err) {
    if (!err) {
        realdebrid.unrestrict('http://www.sockshare.com/file/3A6FF548272EA378', function (err, data) {
            //do something
        });
    }
});
```


## API Reference
### realdebrid.login(user, pass, callback)
Login to real-debrid. `callback` (optional) takes one argument `err` which is either `null` if everything is okay, or an error object. **Every other method, except [`getValidHosters`](#realdebridgetvalidhosterscallback), requires to run this one first**.
```javascript
realdebrid.login('username', 'password', function (err) {
    if (err) {
        console.log('Something went wrong!', err);
    } else {
        console.log('Great success!');
    }
});
```

### realdebrid.account(callback)
Get informations about the account that is logged into real-debrid. `callback` takes two arguments, `err` and `data`.
```javascript
realdebrid.account(function (err, data) {
    if (err) {
        console.log('Something went wrong!', err);
    } else {
        console.log(data);
    }
});
```
Example output:
```javascript
{
    "username": "*************",
    "avatar": "https://cdn.realdebrid.xtnetwork.fr/images/forum/empty.png",
    "email": "*************",
    "points": "123",
    "type": "premium",
    "expiration": "0000000000",
    "expiration-txt": "01/01/1970 00:00:00",
    "premium-left": -12345,
    "limits": {
        "available_4shared.com": 4,
        "available_bitshare.com": 7,
    },
    "limited": [
        {
            "hoster": "4s",
            "name": "4Shared",
            "url": "4shared.com",
            "image": "https://cdn.realdebrid.xtnetwork.fr/0134/images/hosters/4shared.png",
            "downloaded": 0,
            "limit": "4",
            "additional_traffic": 0,
            "available": 4
        },
        {
            "hoster": "bs",
            "name": "Bitshare",
            "url": "bitshare.com",
            "image": "https://cdn.realdebrid.xtnetwork.fr/0134/images/hosters/bitshare.png",
            "downloaded": 0,
            "limit": "7",
            "additional_traffic": 0,
            "available": 7
        }
    ]
}
```

### realdebrid.unrestrict(link, password, callback)
Unrestrict a link, optionally tell the password to the file. `callback` takes two arguments, `err` and `data`.
```javascript
realdebrid.unrestrict('http://www.sockshare.com/file/3A6FF548272EA378', function (err, data) {
    if (err) {
        console.log('Something went wrong!', err);
    } else {
        console.log(data);
    }
});
```
Example output:
```javascript
{ 
    error: 0,
    file_name: '01ElIVX.png',
    file_size: '3.93MB',
    file_size_bytes: '4120903',
    generated_links: [
        ['01ElIVX.png', '', 'http://jodoc.real-debrid.com/dl/*************/01ElIVX.png']
    ],
    main_link: 'http://jodoc.real-debrid.com/dl/*************/01ElIVX.png',
    link: 'http://www.sockshare.com/file/3A6FF548272EA378',
    hoster_name: 'Sockshare',
    hoster_url: 'sockshare.com',
    hoster_image: 'sockshare.png',
    max_chunks: '-1',
    media_keys: false,
    swap: false
}
```

### realdebrid.getValidHosters(callback)
Get all valid hosters that are supported by real-debrid.com. `callback` takes two arguments, `err` and `data`.
```javascript
realdebrid.getValidHosters(function (err, data) {
    if (err) {
        console.log('Something went wrong!', err);
    } else {
        console.log(data);
    }
});
```
Example output:
```javascript
["1fichier.com","desfichiers.com","dfichiers.com","1st-files.com","2shared.com","4shared.com","allmyvideos.net","asfile.com","bayfiles.com","beststreams.net","bitshare.com","canalplus.fr","catshare.net","cbs.com","crocko.com","cwtv.com","datafile.com","datafilehost.com","datei.to","ddlstorage.com","depfile.com","i-filez.com","divxstage.eu","dizzcloud.com","dl.free.fr","easybytez.com","extmatrix.com","filecloud.io","filefactory.com","fileflyer.com","filemonkey.in","fileom.com","fileover.net","fileparadox.in","filepost.com","filerio.com","filesabc.com","filesflash.com","filesflash.net","filesmonster.com","fileswap.com","putlocker.com","firedrive.com","freakshare.net","gigapeta.com","gigasize.com","gulfup.com","hugefiles.net","hulkshare.com","hulu.com","jumbofiles.com","junocloud.me","keep2share.cc","k2s.cc","keep2s.cc","k2share.cc","letitbit.net","load.to","luckyshare.net","mediafire.com","mega.co.nz","megashares.com","mixturevideo.com","mixturecloud.com","movshare.net","netload.in","novamov.com","nowdownload.eu","nowdownload.ch","nowdownload.sx","nowdownload.ag","nowdownload.at","nowvideo.eu","nowvideo.ch","nowvideo.sx","nowvideo.ag","nowvideo.at","oboom.com","purevid.com","rapidgator.net","rg.to","rapidshare.com","rarefile.net","redbunker.net","redtube.com","rutube.ru","scribd.com","secureupload.eu","sendspace.com","share-online.biz","shareflare.net","sky.fm","sockshare.com","soundcloud.com","speedyshare.com","lumfile.com","terafile.co","turbobit.net","tusfiles.net","ulozto.net","ultramegabit.com","unibytes.com","uploadable.ch","uploadc.com","uploaded.to","uploaded.net","ul.to","uploadhero.co","uploadhero.com","uploading.com","uploadlux.com","upstore.net","uptobox.com","userporn.com","veevr.com","vimeo.com","vip-file.com","wat.tv","youporn.com","youtube.com","yunfile.com","zippyshare.com"]
```