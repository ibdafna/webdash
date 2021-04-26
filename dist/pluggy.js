var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="pluggy.data";var REMOTE_PACKAGE_BASE="pluggy.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","pluggy-0.13.1-py3.8.egg-info",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","pluggy",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:31805,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1249,2119,3099,3998,5066,6245,7322,8480,9461,10346,11604,12874,13926,15228,16527,17663,18818,19908,21124,22228,23467,24769,25894,26985,28297,29410,30639],sizes:[1249,870,980,899,1068,1179,1077,1158,981,885,1258,1270,1052,1302,1299,1136,1155,1090,1216,1104,1239,1302,1125,1091,1312,1113,1229,1166],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_pluggy.data")}Module["addRunDependency"]("datafile_pluggy.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/pluggy-0.13.1-py3.8.egg-info/top_level.txt",start:0,end:7,audio:0},{filename:"/lib/python3.8/site-packages/pluggy-0.13.1-py3.8.egg-info/dependency_links.txt",start:7,end:8,audio:0},{filename:"/lib/python3.8/site-packages/pluggy-0.13.1-py3.8.egg-info/SOURCES.txt",start:8,end:1220,audio:0},{filename:"/lib/python3.8/site-packages/pluggy-0.13.1-py3.8.egg-info/requires.txt",start:1220,end:1294,audio:0},{filename:"/lib/python3.8/site-packages/pluggy-0.13.1-py3.8.egg-info/PKG-INFO",start:1294,end:20491,audio:0},{filename:"/lib/python3.8/site-packages/pluggy/callers.py",start:20491,end:27311,audio:0},{filename:"/lib/python3.8/site-packages/pluggy/manager.py",start:27311,end:42824,audio:0},{filename:"/lib/python3.8/site-packages/pluggy/_tracing.py",start:42824,end:44385,audio:0},{filename:"/lib/python3.8/site-packages/pluggy/_version.py",start:44385,end:44529,audio:0},{filename:"/lib/python3.8/site-packages/pluggy/hooks.py",start:44529,end:56818,audio:0},{filename:"/lib/python3.8/site-packages/pluggy/__init__.py",start:56818,end:57304,audio:0}],remote_package_size:35901,package_uuid:"6f685a5c-85f0-4a6c-89d2-49b65a450896"})})();