var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="uncertainties.data";var REMOTE_PACKAGE_BASE="uncertainties.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","uncertainties-3.1.5-py3.8.egg-info",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","uncertainties",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/uncertainties","lib1to2",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/uncertainties/lib1to2","fixes",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/uncertainties","unumpy",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:193346,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1181,2415,3784,5182,6352,7708,8966,10011,11276,12679,14052,15333,16672,18059,19252,20449,21787,23043,24409,25545,26853,28031,29187,30528,31326,32807,34179,35694,37184,38648,39951,41164,42430,43536,44724,45855,47151,48309,49663,51008,52285,53624,54858,56289,57665,59058,60356,61637,62829,63996,65096,66264,67422,68623,69950,71253,72707,74014,75201,76285,77616,79070,80218,81390,82793,84204,85481,86775,88142,89472,90748,91798,92993,94238,95343,96583,98017,99485,100862,101974,103284,104689,105850,107162,108547,109671,110719,111862,113055,114032,115050,116217,117487,118912,120276,121291,122491,123292,124136,124689,125637,126333,127493,128588,129502,130489,131544,132554,133877,134865,135989,136994,138210,139300,140320,141071,141867,143099,144416,145485,146708,147715,148662,149846,151065,152533,153876,155264,156643,158204,159658,160691,161595,162573,163520,164654,165931,167170,168165,169537,170822,172093,173262,174482,175809,177052,178426,179795,181026,182344,183686,185106,186236,187421,188531,189570,190785,192007],sizes:[1181,1234,1369,1398,1170,1356,1258,1045,1265,1403,1373,1281,1339,1387,1193,1197,1338,1256,1366,1136,1308,1178,1156,1341,798,1481,1372,1515,1490,1464,1303,1213,1266,1106,1188,1131,1296,1158,1354,1345,1277,1339,1234,1431,1376,1393,1298,1281,1192,1167,1100,1168,1158,1201,1327,1303,1454,1307,1187,1084,1331,1454,1148,1172,1403,1411,1277,1294,1367,1330,1276,1050,1195,1245,1105,1240,1434,1468,1377,1112,1310,1405,1161,1312,1385,1124,1048,1143,1193,977,1018,1167,1270,1425,1364,1015,1200,801,844,553,948,696,1160,1095,914,987,1055,1010,1323,988,1124,1005,1216,1090,1020,751,796,1232,1317,1069,1223,1007,947,1184,1219,1468,1343,1388,1379,1561,1454,1033,904,978,947,1134,1277,1239,995,1372,1285,1271,1169,1220,1327,1243,1374,1369,1231,1318,1342,1420,1130,1185,1110,1039,1215,1222,1339],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_uncertainties.data")}Module["addRunDependency"]("datafile_uncertainties.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/uncertainties-3.1.5-py3.8.egg-info/top_level.txt",start:0,end:14,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties-3.1.5-py3.8.egg-info/dependency_links.txt",start:14,end:15,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties-3.1.5-py3.8.egg-info/SOURCES.txt",start:15,end:1163,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties-3.1.5-py3.8.egg-info/requires.txt",start:1163,end:1248,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties-3.1.5-py3.8.egg-info/PKG-INFO",start:1248,end:17045,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/core.py",start:17045,end:144304,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/test_umath.py",start:144304,end:156148,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/umath_core.py",start:156148,end:170959,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/test_uncertainties.py",start:170959,end:255121,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/umath.py",start:255121,end:256440,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/__init__.py",start:256440,end:265795,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/1to2.py",start:265795,end:266179,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/lib1to2/test_1to2.py",start:266179,end:273237,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/lib1to2/__init__.py",start:273237,end:273237,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/lib1to2/fixes/fix_std_devs.py",start:273237,end:273727,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/lib1to2/fixes/fix_std_dev.py",start:273727,end:274764,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/lib1to2/fixes/fix_ufloat.py",start:274764,end:277805,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/lib1to2/fixes/fix_uarray_umatrix.py",start:277805,end:280361,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/lib1to2/fixes/__init__.py",start:280361,end:280361,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/unumpy/core.py",start:280361,end:308617,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/unumpy/test_unumpy.py",start:308617,end:319319,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/unumpy/test_ulinalg.py",start:319319,end:322180,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/unumpy/ulinalg.py",start:322180,end:322551,audio:0},{filename:"/lib/python3.8/site-packages/uncertainties/unumpy/__init__.py",start:322551,end:325392,audio:0}],remote_package_size:197442,package_uuid:"5f32155b-36b2-4955-8edc-c92d3330df90"})})();