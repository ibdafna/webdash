var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="python-dateutil.data";var REMOTE_PACKAGE_BASE="python-dateutil.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","python_dateutil-2.8.1-py3.8.egg-info",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","dateutil",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/dateutil","tz",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/dateutil","parser",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/dateutil","zoneinfo",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:304785,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1064,2028,3213,4457,5831,7084,8611,9919,11294,12625,13560,14602,15388,16418,17005,17969,18685,19286,20102,20999,22356,23497,24532,25531,26725,28068,29163,30344,31544,32312,33233,33972,34844,35845,36905,37850,38573,39405,40220,41459,42790,43755,44610,45569,46584,47514,48682,49716,50750,51854,52845,53590,54543,55735,57082,58329,59461,60690,62001,63184,64659,65900,67145,68180,69255,70257,71679,72958,74032,75313,76439,77543,78719,79919,81140,82294,83271,84581,85880,86954,88070,89330,90338,91129,91884,93077,94190,95073,96002,97056,98389,99767,101013,102260,103498,104802,105910,107030,108578,109991,110855,111736,112941,113999,115057,116079,117112,118093,119277,120536,121764,122646,123574,124652,125633,126496,127754,129059,130223,131368,132634,133853,135135,135874,136804,137543,138738,140044,141363,142364,143275,144412,145513,146615,147954,149228,150625,151830,153878,155926,157974,160022,162070,164121,166178,168226,170274,172322,174372,176401,178456,180510,182566,184614,186662,188710,190758,192806,194854,196902,198937,200985,203033,205081,207129,209177,211225,213273,215330,217378,219426,221474,223522,225570,227618,229666,231714,233766,235814,237862,239918,241966,244014,246062,248110,250158,252206,254254,256311,258359,260407,262455,264503,266557,268607,270655,272703,274751,276799,278847,280904,282952,285007,287055,289112,291160,293208,295256,297304,299361,301417,303465],sizes:[1064,964,1185,1244,1374,1253,1527,1308,1375,1331,935,1042,786,1030,587,964,716,601,816,897,1357,1141,1035,999,1194,1343,1095,1181,1200,768,921,739,872,1001,1060,945,723,832,815,1239,1331,965,855,959,1015,930,1168,1034,1034,1104,991,745,953,1192,1347,1247,1132,1229,1311,1183,1475,1241,1245,1035,1075,1002,1422,1279,1074,1281,1126,1104,1176,1200,1221,1154,977,1310,1299,1074,1116,1260,1008,791,755,1193,1113,883,929,1054,1333,1378,1246,1247,1238,1304,1108,1120,1548,1413,864,881,1205,1058,1058,1022,1033,981,1184,1259,1228,882,928,1078,981,863,1258,1305,1164,1145,1266,1219,1282,739,930,739,1195,1306,1319,1001,911,1137,1101,1102,1339,1274,1397,1205,2048,2048,2048,2048,2048,2051,2057,2048,2048,2048,2050,2029,2055,2054,2056,2048,2048,2048,2048,2048,2048,2048,2035,2048,2048,2048,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2048,2052,2048,2048,2056,2048,2048,2048,2048,2048,2048,2048,2057,2048,2048,2048,2048,2054,2050,2048,2048,2048,2048,2048,2057,2048,2055,2048,2057,2048,2048,2048,2048,2057,2056,2048,1320],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1,1,0,0]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_python-dateutil.data")}Module["addRunDependency"]("datafile_python-dateutil.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/python_dateutil-2.8.1-py3.8.egg-info/top_level.txt",start:0,end:9,audio:0},{filename:"/lib/python3.8/site-packages/python_dateutil-2.8.1-py3.8.egg-info/dependency_links.txt",start:9,end:10,audio:0},{filename:"/lib/python3.8/site-packages/python_dateutil-2.8.1-py3.8.egg-info/SOURCES.txt",start:10,end:2078,audio:0},{filename:"/lib/python3.8/site-packages/python_dateutil-2.8.1-py3.8.egg-info/requires.txt",start:2078,end:2087,audio:0},{filename:"/lib/python3.8/site-packages/python_dateutil-2.8.1-py3.8.egg-info/PKG-INFO",start:2087,end:11406,audio:0},{filename:"/lib/python3.8/site-packages/python_dateutil-2.8.1-py3.8.egg-info/zip-safe",start:11406,end:11407,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/easter.py",start:11407,end:14091,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/utils.py",start:14091,end:16050,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/relativedelta.py",start:16050,end:40954,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/rrule.py",start:40954,end:107693,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/_version.py",start:107693,end:107835,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/tzwin.py",start:107835,end:107894,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/_common.py",start:107894,end:108826,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/__init__.py",start:108826,end:109048,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/tz/_factories.py",start:109048,end:111617,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/tz/win.py",start:111617,end:124552,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/tz/tz.py",start:124552,end:187484,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/tz/_common.py",start:187484,end:200461,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/tz/__init__.py",start:200461,end:200905,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/parser/_parser.py",start:200905,end:259709,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/parser/isoparser.py",start:259709,end:272807,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/parser/__init__.py",start:272807,end:274573,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/zoneinfo/rebuild.py",start:274573,end:276292,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/zoneinfo/__init__.py",start:276292,end:282181,audio:0},{filename:"/lib/python3.8/site-packages/dateutil/zoneinfo/dateutil-zoneinfo.tar.gz",start:282181,end:435496,audio:0}],remote_package_size:308881,package_uuid:"cd7c2af8-e2d0-42c3-a8f6-c0930dfd8632"})})();