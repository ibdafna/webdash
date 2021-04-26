var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="cytoolz.data";var REMOTE_PACKAGE_BASE="cytoolz.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","cytoolz-0.11.0-py3.8.egg-info",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","cytoolz",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/cytoolz","tests",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/cytoolz","curried",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:519234,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1054,2412,3533,4833,5736,6951,8324,9585,10510,12057,13321,13627,14409,15854,17119,17903,19014,20353,21500,22495,23849,25172,26514,27372,28503,29839,30861,31703,32299,33264,34399,35706,36342,36996,38040,39212,40616,42087,43456,44660,45722,46746,47620,48968,49915,51033,52039,53333,54467,55492,56648,57858,59136,60373,61701,63005,64153,64802,65437,66060,67383,68568,69597,70618,71641,72790,73922,75202,75831,76570,77225,78079,79238,79983,80539,81312,82233,82781,83441,84017,84789,85826,87049,88232,89295,90522,91658,93105,94127,94723,95401,96082,97410,98593,99625,100766,101533,102930,104090,104740,105714,106939,107616,108911,110204,111436,112373,113363,114674,115709,116897,117983,119115,120378,121254,122144,123200,124149,125174,126271,127475,128575,129823,130665,131708,132918,133954,135023,136358,137400,138555,139761,140787,141860,142998,144240,145272,146347,147395,148400,149447,149926,151117,152327,153310,154781,156065,157432,158753,159440,160827,162174,163339,164594,166076,167301,168326,169367,170432,171601,172698,173716,174235,175247,176326,177556,178862,179044,180389,181695,182817,183614,184925,185971,187012,188113,189227,190476,191722,192871,194113,195258,196290,197425,198613,198992,199976,200815,201627,202577,203889,204884,206082,207492,208700,209783,210574,211747,213007,214283,215514,216797,217740,218378,219024,219642,220253,220874,221495,222883,224072,225217,226374,227399,228418,229439,230462,231542,232714,233862,234970,236095,237244,238530,238857,239641,240317,240989,241650,242339,243284,243969,244778,245358,245947,246547,247074,247574,248137,248653,249183,249691,250217,250788,251500,252001,252488,253013,253514,254016,254711,255409,255899,256920,257616,258329,259026,259729,260468,261088,261729,262370,263e3,264106,265425,266680,267687,268884,270033,271076,272053,273190,274264,275360,276611,277856,279167,280339,281313,282460,283479,284372,285265,286306,287496,288642,289922,291141,292351,293566,294687,295753,296471,297938,299026,299376,300386,301462,302597,303793,305039,306335,307452,308522,309511,310731,311644,312676,313919,314974,316002,316999,317565,318686,319863,321144,322426,323294,324471,325616,326805,327998,329202,330408,331573,332854,334050,335342,336624,337985,339073,340355,341378,342545,342825,343871,345074,346271,347280,348469,349616,350764,351436,352124,353318,354272,355551,356567,357708,358807,360315,361095,362022,363322,364630,366091,367365,368784,370019,370833,371495,372889,374301,375515,376925,378184,379352,380273,381125,382258,382993,384177,384972,385973,386515,386938,387724,388893,390054,391234,392304,393373,393929,394441,394735,395276,395993,396695,397359,398635,399675,401056,402299,403600,405031,405416,405562,406331,407111,408339,409044,409865,410855,412153,413093,413954,415151,416195,417377,418426,419138,420077,421220,421986,422526,423078,424259,425408,426636,427888,428940,430117,431475,432701,433938,435147,436450,437404,438637,439939,441318,442416,443850,444861,445247,446105,447378,448286,449586,450858,451944,453206,454440,455184,456264,457764,458909,460240,461400,462583,463924,464439,465621,466730,467898,468948,470214,471104,472197,472683,473199,473988,474708,475380,476330,477450,478561,479538,480703,481498,482628,483484,484567,485615,486674,487675,489067,489649,490416,491060,491623,492365,493581,494755,495742,496689,497607,498590,499606,500597,501395,502291,503234,504138,504765,505828,506902,507979,508617,509917,511029,512090,513022,513974,514675,515688,516685,517949,518968],sizes:[1054,1358,1121,1300,903,1215,1373,1261,925,1547,1264,306,782,1445,1265,784,1111,1339,1147,995,1354,1323,1342,858,1131,1336,1022,842,596,965,1135,1307,636,654,1044,1172,1404,1471,1369,1204,1062,1024,874,1348,947,1118,1006,1294,1134,1025,1156,1210,1278,1237,1328,1304,1148,649,635,623,1323,1185,1029,1021,1023,1149,1132,1280,629,739,655,854,1159,745,556,773,921,548,660,576,772,1037,1223,1183,1063,1227,1136,1447,1022,596,678,681,1328,1183,1032,1141,767,1397,1160,650,974,1225,677,1295,1293,1232,937,990,1311,1035,1188,1086,1132,1263,876,890,1056,949,1025,1097,1204,1100,1248,842,1043,1210,1036,1069,1335,1042,1155,1206,1026,1073,1138,1242,1032,1075,1048,1005,1047,479,1191,1210,983,1471,1284,1367,1321,687,1387,1347,1165,1255,1482,1225,1025,1041,1065,1169,1097,1018,519,1012,1079,1230,1306,182,1345,1306,1122,797,1311,1046,1041,1101,1114,1249,1246,1149,1242,1145,1032,1135,1188,379,984,839,812,950,1312,995,1198,1410,1208,1083,791,1173,1260,1276,1231,1283,943,638,646,618,611,621,621,1388,1189,1145,1157,1025,1019,1021,1023,1080,1172,1148,1108,1125,1149,1286,327,784,676,672,661,689,945,685,809,580,589,600,527,500,563,516,530,508,526,571,712,501,487,525,501,502,695,698,490,1021,696,713,697,703,739,620,641,641,630,1106,1319,1255,1007,1197,1149,1043,977,1137,1074,1096,1251,1245,1311,1172,974,1147,1019,893,893,1041,1190,1146,1280,1219,1210,1215,1121,1066,718,1467,1088,350,1010,1076,1135,1196,1246,1296,1117,1070,989,1220,913,1032,1243,1055,1028,997,566,1121,1177,1281,1282,868,1177,1145,1189,1193,1204,1206,1165,1281,1196,1292,1282,1361,1088,1282,1023,1167,280,1046,1203,1197,1009,1189,1147,1148,672,688,1194,954,1279,1016,1141,1099,1508,780,927,1300,1308,1461,1274,1419,1235,814,662,1394,1412,1214,1410,1259,1168,921,852,1133,735,1184,795,1001,542,423,786,1169,1161,1180,1070,1069,556,512,294,541,717,702,664,1276,1040,1381,1243,1301,1431,385,146,769,780,1228,705,821,990,1298,940,861,1197,1044,1182,1049,712,939,1143,766,540,552,1181,1149,1228,1252,1052,1177,1358,1226,1237,1209,1303,954,1233,1302,1379,1098,1434,1011,386,858,1273,908,1300,1272,1086,1262,1234,744,1080,1500,1145,1331,1160,1183,1341,515,1182,1109,1168,1050,1266,890,1093,486,516,789,720,672,950,1120,1111,977,1165,795,1130,856,1083,1048,1059,1001,1392,582,767,644,563,742,1216,1174,987,947,918,983,1016,991,798,896,943,904,627,1063,1074,1077,638,1300,1112,1061,932,952,701,1013,997,1264,1019,266],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_cytoolz.data")}Module["addRunDependency"]("datafile_cytoolz.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/cytoolz-0.11.0-py3.8.egg-info/top_level.txt",start:0,end:8,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz-0.11.0-py3.8.egg-info/dependency_links.txt",start:8,end:9,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz-0.11.0-py3.8.egg-info/not-zip-safe",start:9,end:10,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz-0.11.0-py3.8.egg-info/SOURCES.txt",start:10,end:1375,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz-0.11.0-py3.8.egg-info/requires.txt",start:1375,end:1405,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz-0.11.0-py3.8.egg-info/PKG-INFO",start:1405,end:6226,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/utils.so",start:6226,end:39147,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/functoolz.pxd",start:39147,end:40399,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/__init__.pxd",start:40399,end:41149,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/recipes.pyx",start:41149,end:42749,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/utils.pyx",start:42749,end:44102,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/recipes.so",start:44102,end:84594,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/functoolz.pyx",start:84594,end:109629,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/utils_test.py",start:109629,end:111704,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/functoolz.so",start:111704,end:343813,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/itertoolz.pyx",start:343813,end:394982,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/dicttoolz.pyx",start:394982,end:410526,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/itertoolz.so",start:410526,end:812906,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/recipes.pxd",start:812906,end:813006,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/_signatures.py",start:813006,end:817362,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/utils.pxd",start:817362,end:817395,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/compatibility.py",start:817395,end:818378,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/dicttoolz.pxd",start:818378,end:819746,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/itertoolz.pxd",start:819746,end:824441,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/_version.py",start:824441,end:824493,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/dicttoolz.so",start:824493,end:937745,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/cpython.pxd",start:937745,end:938242,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/__init__.py",start:938242,end:938713,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_inspect_args.py",start:938713,end:954715,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_functoolz.py",start:954715,end:974932,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_none_safe.py",start:974932,end:987154,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_compatibility.py",start:987154,end:987183,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_embedded_sigs.py",start:987183,end:990678,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_itertoolz.py",start:990678,end:1008843,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_serialization.py",start:1008843,end:1014668,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_curried_toolzlike.py",start:1014668,end:1016067,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_recipes.py",start:1016067,end:1016889,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_doctests.py",start:1016889,end:1017324,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_utils.py",start:1017324,end:1017709,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/dev_skip_test.py",start:1017709,end:1018721,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_dev_skip_test.py",start:1018721,end:1019101,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_signatures.py",start:1019101,end:1021978,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_docstrings.py",start:1021978,end:1025012,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_curried.py",start:1025012,end:1028715,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_tlz.py",start:1028715,end:1030201,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/tests/test_dicttoolz.py",start:1030201,end:1039299,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/curried/exceptions.py",start:1039299,end:1039649,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/curried/operator.py",start:1039649,end:1040151,audio:0},{filename:"/lib/python3.8/site-packages/cytoolz/curried/__init__.py",start:1040151,end:1043035,audio:0}],remote_package_size:523330,package_uuid:"64ce0aec-b4e2-4876-b38e-aeab3b947ffc"})})();