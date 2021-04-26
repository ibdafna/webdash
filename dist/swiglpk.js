var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="swiglpk.data";var REMOTE_PACKAGE_BASE="swiglpk.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","swiglpk",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:855109,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1429,2339,3616,4977,6342,7484,8413,9366,10684,12078,13368,14624,15874,17185,18205,19300,20353,21456,22545,23452,24093,24725,25338,25955,26565,27177,27790,28408,29022,29638,30256,30873,31588,32373,33228,34042,34906,35767,36797,37826,38893,39944,41051,42113,43185,44232,45240,46232,47205,48195,49158,50149,51627,53140,54447,55747,57039,58337,59631,60902,62095,63200,64600,66006,66367,66749,67835,68873,69494,70152,71208,71846,72489,73020,73920,74804,75440,76345,77246,77873,78421,79260,80390,81346,82462,83493,84585,85554,86349,87232,87859,88375,89269,90186,90831,91373,92002,92591,93432,94243,94805,95370,96077,96851,97736,98430,98988,100098,100867,101718,102706,103545,104675,105970,107043,107930,108645,109706,110454,111113,111627,112803,113616,114613,115559,116503,117462,118401,119336,120170,121071,122046,123457,124661,125790,126907,127973,129080,130277,131507,132637,133816,134905,135940,136820,138003,139130,139799,140751,141409,142263,143405,144250,145559,146769,147846,149042,149975,151044,152041,153046,153807,154840,155835,156944,157971,158811,159936,161242,162148,163141,164106,164924,165820,166569,167615,168691,169626,170714,171547,172344,172959,173676,174623,175809,176929,177999,179017,180404,181526,182607,183656,184707,185811,186914,188121,189461,190537,190997,191967,193061,194229,195326,196164,197011,197945,198747,199663,200554,201447,202332,203267,204018,204917,205745,206266,207124,207893,208727,209815,210925,212160,213224,214228,214943,215758,216234,217075,217861,218623,219165,220101,220728,221468,222312,223111,223545,224194,224772,225284,226208,226868,227416,228089,228912,229516,230318,230783,231352,232422,232812,233356,234121,234874,235605,236058,236710,237269,238037,238574,239070,239673,240272,240852,241349,242036,242754,243168,243707,244524,244958,245422,246465,247717,248817,249770,250870,252145,253386,254541,255581,256819,257925,259187,260304,261474,262670,263600,264779,265786,266949,268187,269306,270391,271672,272773,273920,275163,276188,277153,277986,278969,280120,280989,282094,283396,284504,285664,286847,287953,288804,289939,290966,292169,293376,294473,295692,296864,298014,299036,300145,300767,301781,302834,304014,305063,306322,307578,308801,309883,310706,311149,312451,313708,314301,315389,316538,317698,318936,319570,320351,320741,321727,323050,324066,324864,325992,326772,327303,328289,329308,330270,331156,331947,332881,333731,334684,335689,336744,337352,338112,338935,340243,341214,342546,343646,344843,346026,347210,348475,349668,351006,352294,353486,354666,355803,356946,358023,358969,359654,361035,362310,363606,364665,365717,366810,367964,368935,370137,371531,372848,374060,375143,376383,377367,378423,379451,380432,381559,382822,384107,385221,386253,387408,388497,389582,390457,391500,392805,393932,394966,395944,397086,398260,399243,400228,401244,402508,403603,404612,405638,406757,407807,408804,409572,410383,411492,412543,413495,414797,415774,416953,417918,419200,420608,421721,422885,423993,425113,426427,427547,428860,430031,430991,432143,433232,434100,435014,435904,437028,438258,439565,440824,441831,443039,444207,445454,446632,448063,449250,450588,451740,452908,453868,454994,456086,457432,458554,459832,461215,462188,463474,464619,465968,467103,468423,469512,470766,472093,473213,474418,475554,476636,477932,478971,480084,480979,481934,483234,484509,485583,486286,487329,488126,489036,489835,490737,491540,492387,493351,494351,495282,496235,497228,498149,499168,500127,501354,502560,503554,504613,505804,506777,507983,509040,509925,510855,511805,512804,514017,514965,515838,516967,518016,519327,520256,521327,522509,523641,524769,525960,527160,528264,529444,530513,531658,532839,533923,535228,536569,537878,539206,540491,541397,542256,543444,544723,545813,547139,547881,548978,550193,551427,552688,553732,554575,555481,556651,557753,558884,560146,561432,562561,563791,564973,566028,567020,568105,569272,570437,571464,572706,573930,575168,576083,577319,578448,578959,579743,580603,581201,582082,582893,583762,584788,585124,585679,586390,587180,588453,589395,590622,591334,592065,592858,593531,594592,595647,596756,597667,598553,599736,600501,601710,602344,603344,604434,605642,606638,607818,608804,609831,610582,611506,612575,613795,615029,616282,617281,618309,619534,620813,621953,623220,624489,625744,626928,628141,629312,630403,631334,632487,633345,634340,635433,636650,637947,639171,640569,641862,643106,644514,645808,646795,647846,648696,649992,651013,651926,653157,654452,655785,657023,658265,659320,660559,661740,662877,664176,665357,666591,667596,668726,670022,670952,672186,673477,674698,675969,677179,678426,679289,680475,681539,682738,684004,685141,686228,687373,688041,689382,690042,691401,692169,693055,694177,695463,696359,697307,698415,699606,700931,702273,703159,704031,705351,706664,707818,708766,709976,710821,711866,712794,713759,714922,716155,717492,718781,719485,720758,721781,722510,723709,724796,725532,726753,727743,728573,729467,730415,731376,732204,733019,733880,734602,735252,735907,736788,737835,738619,739695,740703,741757,742251,742849,743321,743898,744409,744876,745383,745976,746570,747049,747584,748093,748647,749164,749723,750238,750687,751260,751782,752333,752916,753672,754135,754629,755149,755688,756134,756622,757108,757672,758652,759867,761248,762412,763436,764330,765677,766868,767612,768319,769229,770095,770931,771993,773187,774033,774857,775799,776855,777781,779156,780417,781419,782595,783578,784341,785261,786596,787895,789260,790723,792068,793342,794714,796101,797479,798826,799989,801056,802109,803296,804404,805593,806725,807648,808957,810096,811338,812586,813761,815526,817574,819622,821670,823298,824624,826061,827392,828429,829467,830504,831460,832137,832162,832187,832696,833792,834624,835149,835924,836432,837144,837913,838434,838957,839484,840318,841182,841988,842785,843443,844047,844673,845302,845945,846566,847212,847869,848497,849223,849892,850638,851387,852094,852726,853344,854152,854926],sizes:[1429,910,1277,1361,1365,1142,929,953,1318,1394,1290,1256,1250,1311,1020,1095,1053,1103,1089,907,641,632,613,617,610,612,613,618,614,616,618,617,715,785,855,814,864,861,1030,1029,1067,1051,1107,1062,1072,1047,1008,992,973,990,963,991,1478,1513,1307,1300,1292,1298,1294,1271,1193,1105,1400,1406,361,382,1086,1038,621,658,1056,638,643,531,900,884,636,905,901,627,548,839,1130,956,1116,1031,1092,969,795,883,627,516,894,917,645,542,629,589,841,811,562,565,707,774,885,694,558,1110,769,851,988,839,1130,1295,1073,887,715,1061,748,659,514,1176,813,997,946,944,959,939,935,834,901,975,1411,1204,1129,1117,1066,1107,1197,1230,1130,1179,1089,1035,880,1183,1127,669,952,658,854,1142,845,1309,1210,1077,1196,933,1069,997,1005,761,1033,995,1109,1027,840,1125,1306,906,993,965,818,896,749,1046,1076,935,1088,833,797,615,717,947,1186,1120,1070,1018,1387,1122,1081,1049,1051,1104,1103,1207,1340,1076,460,970,1094,1168,1097,838,847,934,802,916,891,893,885,935,751,899,828,521,858,769,834,1088,1110,1235,1064,1004,715,815,476,841,786,762,542,936,627,740,844,799,434,649,578,512,924,660,548,673,823,604,802,465,569,1070,390,544,765,753,731,453,652,559,768,537,496,603,599,580,497,687,718,414,539,817,434,464,1043,1252,1100,953,1100,1275,1241,1155,1040,1238,1106,1262,1117,1170,1196,930,1179,1007,1163,1238,1119,1085,1281,1101,1147,1243,1025,965,833,983,1151,869,1105,1302,1108,1160,1183,1106,851,1135,1027,1203,1207,1097,1219,1172,1150,1022,1109,622,1014,1053,1180,1049,1259,1256,1223,1082,823,443,1302,1257,593,1088,1149,1160,1238,634,781,390,986,1323,1016,798,1128,780,531,986,1019,962,886,791,934,850,953,1005,1055,608,760,823,1308,971,1332,1100,1197,1183,1184,1265,1193,1338,1288,1192,1180,1137,1143,1077,946,685,1381,1275,1296,1059,1052,1093,1154,971,1202,1394,1317,1212,1083,1240,984,1056,1028,981,1127,1263,1285,1114,1032,1155,1089,1085,875,1043,1305,1127,1034,978,1142,1174,983,985,1016,1264,1095,1009,1026,1119,1050,997,768,811,1109,1051,952,1302,977,1179,965,1282,1408,1113,1164,1108,1120,1314,1120,1313,1171,960,1152,1089,868,914,890,1124,1230,1307,1259,1007,1208,1168,1247,1178,1431,1187,1338,1152,1168,960,1126,1092,1346,1122,1278,1383,973,1286,1145,1349,1135,1320,1089,1254,1327,1120,1205,1136,1082,1296,1039,1113,895,955,1300,1275,1074,703,1043,797,910,799,902,803,847,964,1e3,931,953,993,921,1019,959,1227,1206,994,1059,1191,973,1206,1057,885,930,950,999,1213,948,873,1129,1049,1311,929,1071,1182,1132,1128,1191,1200,1104,1180,1069,1145,1181,1084,1305,1341,1309,1328,1285,906,859,1188,1279,1090,1326,742,1097,1215,1234,1261,1044,843,906,1170,1102,1131,1262,1286,1129,1230,1182,1055,992,1085,1167,1165,1027,1242,1224,1238,915,1236,1129,511,784,860,598,881,811,869,1026,336,555,711,790,1273,942,1227,712,731,793,673,1061,1055,1109,911,886,1183,765,1209,634,1e3,1090,1208,996,1180,986,1027,751,924,1069,1220,1234,1253,999,1028,1225,1279,1140,1267,1269,1255,1184,1213,1171,1091,931,1153,858,995,1093,1217,1297,1224,1398,1293,1244,1408,1294,987,1051,850,1296,1021,913,1231,1295,1333,1238,1242,1055,1239,1181,1137,1299,1181,1234,1005,1130,1296,930,1234,1291,1221,1271,1210,1247,863,1186,1064,1199,1266,1137,1087,1145,668,1341,660,1359,768,886,1122,1286,896,948,1108,1191,1325,1342,886,872,1320,1313,1154,948,1210,845,1045,928,965,1163,1233,1337,1289,704,1273,1023,729,1199,1087,736,1221,990,830,894,948,961,828,815,861,722,650,655,881,1047,784,1076,1008,1054,494,598,472,577,511,467,507,593,594,479,535,509,554,517,559,515,449,573,522,551,583,756,463,494,520,539,446,488,486,564,980,1215,1381,1164,1024,894,1347,1191,744,707,910,866,836,1062,1194,846,824,942,1056,926,1375,1261,1002,1176,983,763,920,1335,1299,1365,1463,1345,1274,1372,1387,1378,1347,1163,1067,1053,1187,1108,1189,1132,923,1309,1139,1242,1248,1175,1765,2048,2048,2048,1628,1326,1437,1331,1037,1038,1037,956,677,25,25,509,1096,832,525,775,508,712,769,521,523,527,834,864,806,797,658,604,626,629,643,621,646,657,628,726,669,746,749,707,632,618,808,774,183],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_swiglpk.data")}Module["addRunDependency"]("datafile_swiglpk.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/swiglpk-4.65.1-py3.8.egg-info",start:0,end:6885,audio:0},{filename:"/lib/python3.8/site-packages/swiglpk/_swiglpk.so",start:6885,end:1697049,audio:0},{filename:"/lib/python3.8/site-packages/swiglpk/swiglpk.py",start:1697049,end:1763584,audio:0},{filename:"/lib/python3.8/site-packages/swiglpk/__init__.py",start:1763584,end:1763606,audio:0}],remote_package_size:859205,package_uuid:"67993480-f8b6-4d85-88cd-24bb11650fdd"})})();