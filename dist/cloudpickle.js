var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="cloudpickle.data";var REMOTE_PACKAGE_BASE="cloudpickle.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","cloudpickle",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","cloudpickle-1.6.0-py3.8.egg-info",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:41583,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1436,2193,3401,4629,5902,7006,8112,9453,10599,11897,13145,14432,15617,16719,18013,19528,20866,22248,23553,24919,26358,27811,29073,30237,31220,32485,33715,35168,36545,37789,38382,39657,40798],sizes:[1436,757,1208,1228,1273,1104,1106,1341,1146,1298,1248,1287,1185,1102,1294,1515,1338,1382,1305,1366,1439,1453,1262,1164,983,1265,1230,1453,1377,1244,593,1275,1141,785],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_cloudpickle.data")}Module["addRunDependency"]("datafile_cloudpickle.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/cloudpickle/cloudpickle_fast.py",start:0,end:30485,audio:0},{filename:"/lib/python3.8/site-packages/cloudpickle/cloudpickle.py",start:30485,end:60769,audio:0},{filename:"/lib/python3.8/site-packages/cloudpickle/__init__.py",start:60769,end:61124,audio:0},{filename:"/lib/python3.8/site-packages/cloudpickle/compat.py",start:61124,end:61478,audio:0},{filename:"/lib/python3.8/site-packages/cloudpickle-1.6.0-py3.8.egg-info/top_level.txt",start:61478,end:61490,audio:0},{filename:"/lib/python3.8/site-packages/cloudpickle-1.6.0-py3.8.egg-info/dependency_links.txt",start:61490,end:61491,audio:0},{filename:"/lib/python3.8/site-packages/cloudpickle-1.6.0-py3.8.egg-info/SOURCES.txt",start:61491,end:63744,audio:0},{filename:"/lib/python3.8/site-packages/cloudpickle-1.6.0-py3.8.egg-info/PKG-INFO",start:63744,end:68837,audio:0}],remote_package_size:45679,package_uuid:"9bb6ebf0-e11a-4a5a-882c-139c002aa297"})})();