function Export(e,t){function n(){a.getLayout().then(function(e){r.empty(),s.empty();var t=$("<tr />");e.qHyperCube.qDimensionInfo.forEach(function(e){$("<th>"+e.qFallbackTitle+"</th>").appendTo(t)}),t.appendTo(s),e.qHyperCube.qDataPages[0].qMatrix.some(function(e,t){var n=$("<tr/>");return e.forEach(function(e){$("<td>"+e.qText+"</td>").appendTo(n)}),n.appendTo(r),75===t})})}function i(){var e="DPExport_"+new Date(Date.now()).toISOString().substring(0,16);a.exportData("CSV_C","/qHyperCubeDef",e).then(function(e){window.open("https://"+QIX.config.host+e,"_blank")})}var a,r=t.find("tbody"),s=t.find("thead"),o=e.map(function(e){return{qNullSuppression:!0,qDef:{qFieldDefs:[e],qSortCriterias:[{qSortByNumeric:-1}]}}});QIX.app.createSessionObject({qInfo:{qId:"",qType:"ExportHyperCube"},qHyperCubeDef:{qDimensions:o,qInterColumnSortOrder:[0],qInitialDataFetch:[{qTop:0,qLeft:0,qHeight:500,qWidth:o.length+1}]}}).then(function(e){a=e,n()});pubsub.subscribe("export",i),pubsub.subscribe("update",n)}function Filter(e,t,n,i){function a(){o.getLayout().then(function(e){u=e.qInfo.qId,b.find("ul").remove();var t=e.qListObject.qDataPages[0].qMatrix,i=e.qListObject.qDimensionInfo.qStateCounts.qSelected;i>0?(c=!0,m.visible().text(i+" of "+e.qListObject.qSize.qcy)):(c=!1,m.invisible());var a=$('<ul class="list" />');a.html(t.map(function(e){return'<li data-elem="'+e[0].qElemNumber+'" class="'+e[0].qState+' listitem"><p class="value">'+e[0].qText+"</p></li>"})),a.find("li").on("click",function(){s($(this).attr("data-elem"))}),a.appendTo(b),l||(f.appendTo(n),l=!0),p&&r(),$("input.search").val("")})}function r(){0===$("#"+q).find(".search").length&&$("#"+q).find(".items").before('<input class="search" placeholder="Search list"/>');new List(document.getElementById(q),{valueNames:["value"]})}function s(t){o.selectListObjectValues("/qListObjectDef",[+t],"DateRange"==e?!1:!0,!1).then(function(e){$("#clearfilter").addClass("active"),pubsub.publish("update")},function(e){console.log(e)})}var o,u,l=!1,c=!1,p=i||!1,q=t.replace(/\s+/g,"").replace(/\./g,""),d='<div id="'+q+'" class="filter">';d+='<div class="title">'+t,d+='  <div class="right"><div class="count"></div><img src="static/img/toggle.svg"></div>',d+="</div>",d+='<div class="items"></div>',d+="</div>";var f=$(l?"#"+q:d),b=f.find(".items"),h=f.find(".title"),m=f.find(".count");h.on("click",function(){$(this).parent().toggleClass("expanded")});var y="DateRange"==e?{qSortByNumeric:1}:{qSortByAscii:1};QIX.app.createSessionObject({qInfo:{qId:"",qType:"ListObject"},qListObjectDef:{qLibraryId:"",qDef:{qFieldDefs:[e],qSortCriterias:[y]},qInitialDataFetch:[{qTop:0,qHeight:300,qLeft:0,qWidth:1}]}}).then(function(e){o=e,a()});var g=pubsub.subscribe("update",a);pubsub.subscribe("kill",function(){QIX.app.destroySessionObject(u),pubsub.unsubscribe(g)})}function Linechart(e,t,n){function i(){d.selectAll("*").remove(),l=d3.time.scale().range([0,s]),u=d3.scale.linear().range([o,0]).nice(),c=d3.svg.axis().scale(l).ticks(3).orient("bottom"),p=d3.svg.axis().scale(u).tickFormat(d3.format("s")).orient("left"),q=d3.svg.line().x(function(e){return l(e.date)}).y(function(e){return u(e.value)}),d.attr("width",s+h.left+h.right).attr("height",o+h.top+h.bottom),f=d.append("g").attr("transform","translate("+h.left+","+h.top+")"),r.getLayout().then(function(e){if(d.selectAll("path, .axis, .error").remove(),e.qHyperCube.qSize.qcy<4)return d.append("text").attr("class","error").attr("text-anchor","middle").attr("transform",function(e){return"translate("+[n.offsetWidth/2,n.offsetHeight/2]+")"}).style("font-size","16px").style("fill","rgb(39, 48, 81)").text("Not Enough Content Available"),null;var t=e.qHyperCube.qDataPages[0].qMatrix.filter(function(e){return e[0].qText.length&&+e[1].qNum===(0|+e[1].qNum)}).map(function(e){return{date:b(e[0].qText),value:e[1].qNum}},[]).sort(function(e,t){return e.date-t.date});l.domain(d3.extent(t,function(e){return e.date})),u.domain(d3.extent(t,function(e){return e.value})),f.append("g").attr("class","x axis").attr("transform","translate(0,"+o+")").call(c),f.append("g").attr("class","y axis").call(p),f.append("path").datum(t).attr("class","line").attr("d",q).style("fill","none").style("stroke","#273051").style("stroke-width","3px")})}function a(){s=n.offsetWidth-h.left-h.right,o=s/1.2-h.top-h.bottom,i()}var r,s,o,u,l,c,p,q,d,f,b=d3.time.format("%Y-%m-%d").parse,h={top:20,right:20,bottom:30,left:30};s=n.offsetWidth-h.left-h.right,o=s/1.2-h.top-h.bottom,d=d3.select(n).append("svg").attr("id","linechart"),QIX.app.createSessionObject({qInfo:{qId:"",qType:"HyperCube"},qHyperCubeDef:{qDimensions:[{qNullSuppression:!0,qDef:{qFieldDefs:[e],qFieldLabels:["Test"],qSortCriterias:[{qSortByNumeric:-1}]}}],qMeasures:[{qLibraryId:"",qSortBy:{qSortByNumeric:-1},qDef:{qLabel:"",qDescription:"",qDef:t}}],qSuppressMissing:!0,qSuppressZero:!0,qInterColumnSortOrder:[0,1],qInitialDataFetch:[{qTop:0,qLeft:0,qHeight:30,qWidth:2}]}}).then(function(e){r=e,i()});var m=pubsub.subscribe("update",i),y=pubsub.subscribe("resize",a);pubsub.subscribe("kill",function(){pubsub.unsubscribe(m),pubsub.unsubscribe(y)})}function Tracking(e,t){function n(){i.getLayout().then(function(e){a.empty(),r.empty();var t=$("<tr />");e.qHyperCube.qDimensionInfo.forEach(function(e){$("<th>"+e.qFallbackTitle+"</th>").appendTo(t)}),t.appendTo(r),e.qHyperCube.qDataPages[0].qMatrix.some(function(e,t){var n=$("<tr/>");e.forEach(function(e,t){if(2==t)return $('<td><a href="'+e.qText.trim()+'" target="_blank">'+e.qText+"</a></td>").appendTo(n);if(3==t){var i=e.qText.split(",").map(function(e){return'<a href="http://www.twitter.com/'+e.trim()+'" target="_blank">'+e+"</a>"});return $("<td>"+i+"</td>").appendTo(n)}return $("<td>"+e.qText+"</td>").appendTo(n)}),n.appendTo(a)})})}var i,a=t.find("tbody"),r=t.find("thead"),s=e.map(function(e){return{qNullSuppression:!0,qDef:{qFieldDefs:[e],qSortCriterias:[{qSortByAscii:1}]}}});QIX.app.createSessionObject({qInfo:{qId:"",qType:"HyperCube"},qListObjectDef:{qDimensions:s,qInterColumnSortOrder:[0],qInitialDataFetch:[{qTop:0,qLeft:0,qHeight:1e3,qWidth:s.length+1}]}}).then(function(e){i=e,n()});var o=pubsub.subscribe("update",n);pubsub.subscribe("kill",function(){pubsub.unsubscribe(o)})}function Table(e,t,n){function i(){u.getLayout().then(function(e){if($(n).empty(),e.qHyperCube.qDataPages[0].qMatrix[0][0].qIsEmpty)return $("<p>No Mentions Available</p>").appendTo($(n));var t=$("<table />"),i=r(e),s=$("<tbody />");l=d3.max(e.qHyperCube.qDataPages[0].qMatrix,function(e){return e[1].qNum}),e.qHyperCube.qDataPages[0].qMatrix.forEach(function(e){var t=a(e);t.appendTo(s)}),i.appendTo(t),s.appendTo(t),t.appendTo($(n))},function(e){console.log(e)})}function a(e){var t=e[1].qNum/l*100,n=$("<tr/>");return $('<td id="'+e[0].qElemNumber+'" class="col col1">'+e[0].qText+"</td>").click(function(e){s(+$(this).attr("id"))}).appendTo(n),$('<td class="col col2"><div style="width:'+t+'%;"></div></td>').appendTo(n),$('<td class="col col3">'+e[1].qNum+"</td>").appendTo(n),n}function r(e){var t=[],n=$("<thead />");return e.qHyperCube.qDimensionInfo.forEach(function(e){t.push(o(e.qFallbackTitle))}),t.push(e.qHyperCube.qMeasureInfo[0].qFallbackTitle),t.forEach(function(e,t){1==t?$('<th colspan="2" class="col col'+(t+1)+'">'+e+"</th>").appendTo(n):$('<th class="col col'+(t+1)+'">'+e+"</th>").appendTo(n)}),n}function s(e){u.selectHyperCubeValues("/qHyperCubeDef",0,[e],!0).then(function(e){pubsub.publish("update")})}function o(e){return e.charAt(0).toUpperCase()+e.slice(1)}var u,l,c=e.map(function(e){return{qNullSuppression:!0,qDef:{qFieldDefs:[e.dim],qFieldLabels:[e.label],qSortCriterias:[{qSortByNumeric:-1}]}}});QIX.app.createSessionObject({qInfo:{qId:"",qType:"HyperCube"},qHyperCubeDef:{qDimensions:c,qMeasures:[{qLibraryId:"",qSortBy:{qSortByNumeric:-1},qDef:{qLabel:t.label,qDescription:"",qDef:t.value}}],qSuppressMissing:!0,qSuppressZero:!0,qInterColumnSortOrder:[1,0],qInitialDataFetch:[{qTop:0,qLeft:0,qHeight:10,qWidth:c.length+1}]}}).then(function(e){u=e,i()});var p=pubsub.subscribe("update",i);pubsub.subscribe("kill",function(){pubsub.unsubscribe(p)})}function ContentTable(e,t){function n(){s.getLayout().then(function(e){e.qHyperCube.qDataPages[0].qMatrix.length<l?c.hide():c.show(),o=e.qHyperCube.qSize.qcy,p.empty(),$(".title-row .totals").text(e.TOTALS);var t=e.qHyperCube.qDataPages[0].qMatrix;t.forEach(function(e){if(!e[1].qIsEmpty){var t;t="Twitter"===e[0].qText?a(e):r(e),t.appendTo(p)}})},function(e){console.log(e)})}function i(){u+=l;var e={qTop:u,qLeft:0,qHeight:l,qWidth:d.length+1};s.getHyperCubeData("/qHyperCubeDef",[e]).then(function(e){e[0].qMatrix.length<l&&$("#more").hide(),e[0].qMatrix.forEach(function(e){if(!e[1].qIsEmpty){var t;t="Twitter"===e[0].qText?a(e):r(e),t.appendTo(p)}})})}function a(e){var t=$('<div class="item" />');$('<div class="info"><i class="fa fa-twitter"></i>&nbsp;&nbsp;'+e[1].qText+q+e[2].qText+"</div>").appendTo(t),$('<div class="body">'+e[3].qText+"</div>").appendTo(t);var n='<div class="details" style="display: none;"><img style="display: none;width: 100%;"></img><div class="details-bar">';n+='<ul><li class="retweet">RETWEETS <strong>'+e[8].qText+"</strong>",n+='</li><li class="favorite">FAVORITES <strong>'+e[7].qText+"</strong></li>",n+='<li class="handle">TWITTER HANDLE <strong>'+e[4].qText.substring(1)+"</strong></li><li></li></ul>",n+='<a target="_blank" href="'+e[5].qText+'">Read on Twitter</a><a target="_blank" href="https://twitter.com/'+e[4].qText+'">View Twitter profile</a></div>';var i=$(n);return"-"!=e[9].qText&&(t.find(".info").append('<i class="fa fa-picture-o"></i>'),i.find("img").attr("src",e[9].qText).show()),i.appendTo(t),t.on("click",function(e){return"A"==e.target.nodeName?null:void $(this).find(".details").slideToggle("fast")}),t}function r(e){var t=$('<div class="item" />');$('<div class="info"><i class="fa fa-cloud"></i>&nbsp;&nbsp;'+e[1].qText+q+e[2].qText+"</div>").appendTo(t),$('<div class="body">'+e[3].qText+"</div>").appendTo(t);var n='<div class="details" style="display: none;"><div class="details-bar">';n+='<ul><li class="documenttype">DOCUMENT TYPE <strong>'+e[6].qText+"</strong></li></ul>",n+='<a target="_blank" href="'+e[5].qText+'">Read document</a><a target="_blank" href="//'+e[4].qText+'">Visit source site</a>',n+="</div></div>";var i=$(n);return i.appendTo(t),t.on("click",function(){$(this).find(".details").slideToggle("fast")}),t}var s,o,u=0,l=30,c=$("#more"),p=t.find(".rows"),q="&nbsp;&nbsp;-&nbsp;&nbsp;",d=e.map(function(e){return{qDef:{qFieldDefs:[e],qSortCriterias:[{qSortByNumeric:-1}]}}});QIX.app.createSessionObject({qInfo:{qId:"",qType:"HyperCube"},TOTALS:{qStringExpression:"='Showing ' & Sum(ContentCounter) & ' out of ' & Sum({1}ContentCounter) & ' tweets & articles.'"},qHyperCubeDef:{qDimensions:d,qSuppressMissing:!0,qSuppressZero:!0,qInterColumnSortOrder:[2],qInitialDataFetch:[{qTop:0,qLeft:0,qHeight:l,qWidth:d.length+1}]}}).then(function(e){s=e,n()});var f=pubsub.subscribe("update",n);pubsub.subscribe("kill",function(){pubsub.unsubscribe(f)}),c.click(function(e){i()})}function WordCloud(e,t,n){function i(){s.getLayout().then(function(e){function t(t,n,a){p.selectAll("text").remove(),q=n?Math.min(l/Math.abs(n[1].x-l/2),l/Math.abs(n[0].x-l/2),c/Math.abs(n[1].y-c/2),c/Math.abs(n[0].y-c/2))/2:1;var o=s.selectAll("text").data(t,function(e){return e.text});o.enter().append("text").on("click",function(e){r(e.qElem)}).attr("class","hash").attr("text-anchor","middle").attr("transform",function(e){return"translate("+[e.x,e.y]+")"}).style("font-size",function(e){return e.size+"px"}).style("cursor","pointer").style("opacity",function(t){return e.qHyperCube.qDataPages[0].qMatrix.length>1?i(t.value)/100:1}).style("fill","rgb(39, 48, 81)").text(function(e){return e.text})}if(p.attr("width",l).attr("height",c),p.selectAll("*").remove(),0===e.qHyperCube.qSize.qcy)return void p.append("text").attr("text-anchor","middle").attr("transform",function(e){return"translate("+[l/2,c/2]+")"}).style("font-size","16px").style("fill","rgb(39, 48, 81)").text("No Hashtags Available");o=d3.max(e.qHyperCube.qDataPages[0].qMatrix.map(function(e){return e[1].qNum})),u=d3.min(e.qHyperCube.qDataPages[0].qMatrix.map(function(e){return e[1].qNum}));var n=d3.scale.log().range([16,d]);n.domain([u,o]);var i=d3.scale.linear().range([60,100]).domain([u,o]),a=e.qHyperCube.qDataPages[0].qMatrix.map(function(e){return{key:e[0].qText,size:e[1].qNum,value:e[1].qNum,qElem:e[0].qElemNumber}}),s=p.append("g").attr("transform","translate("+[l>>1,c>>1]+")");d3.layout.cloud().words(a).timeInterval(10).padding(2).size([l,c]).fontWeight("bold").spiral("rectangular").font("Impact").fontSize(function(t){return 1!=e.qHyperCube.qDataPages[0].qMatrix.length?n(+t.size):d}).rotate(0).text(function(e){return e.key}).on("end",t).start()})}function a(){l!==n.offsetWidth&&(l=n.offsetWidth,c=n.offsetHeight,i())}function r(e){s.selectHyperCubeValues("/qHyperCubeDef",0,[e],!0).then(function(e){pubsub.publish("update")})}var s,o,u,l=n.offsetWidth,c=n.offsetWidth,p=d3.select(n).append("svg").attr("id","svgwordcloud"),q=1,d=42;QIX.app.createSessionObject({qInfo:{qId:"",qType:"HyperCube"},qHyperCubeDef:{qDimensions:[{qNullSuppression:!0,qDef:{qFieldDefs:[e],qFieldLabels:["Test"],qSortCriterias:[{qSortByNumeric:-1}]}}],qMeasures:[{qLibraryId:"",qSortBy:{qSortByNumeric:-1},qDef:{qLabel:"",qDescription:"",qDef:t}}],qSuppressMissing:!0,qSuppressZero:!0,qInterColumnSortOrder:[1,0],qInitialDataFetch:[{qTop:0,qLeft:0,qHeight:50,qWidth:2}]}}).then(function(e){s=e,i()});var f=pubsub.subscribe("update",i),b=pubsub.subscribe("resize",a);pubsub.subscribe("kill",function(){pubsub.unsubscribe(f),pubsub.unsubscribe(b)})}function WorldMap(e,t,n){function i(){QIX.app.createSessionObject({qInfo:{qId:"",qType:"HyperCube"},qHyperCubeDef:{qDimensions:h,qMeasures:[{qLibraryId:"",qSortBy:{qSortByNumeric:-1},qDef:{qLabel:"",qDescription:"",qDef:t}}],qInterColumnSortOrder:[2],qInitialDataFetch:[{qTop:0,qLeft:0,qHeight:y,qWidth:h.length+1}]}}).then(function(e){o=e,a()})}function a(){o.getLayout().then(function(e){g.selectAll("circle").remove();var t,n=e.qHyperCube.qMeasureInfo[0].qMax,i=e.qHyperCube.qMeasureInfo[0].qMin;t=d3.scale.sqrt().domain([i,n]).range(300>f?[0,15]:[0,25]),m={},e.qHyperCube.qDataPages[0].qMatrix.forEach(function(e){m[e[0].qText]={value:e[2].qNum,name:e[1].qText,elem:e[0].qElemNumber}});var a=u.features.filter(function(e){return m.hasOwnProperty(e.id)});g.selectAll("circle").attr("class","bubble").data(a).enter().append("circle").attr("cx",function(e){return d.centroid(e)[0]}).attr("cy",function(e){return d.centroid(e)[1]}).attr("r",function(n){return 1==e.qHyperCube.qDataPages[0].qMatrix.length?10:t(m[n.id].value)}).on("mouseover",v.show).on("mouseout",v.hide).on("click",function(e,t){s(m[e.id].elem)})})}function r(){g.selectAll("path, circle").remove(),f=n.offsetWidth,b=f/1.5,g.attr("width",f).attr("height",b),q=d3.geo.mercator().scale(1).translate([0,0]),d=d3.geo.path().projection(q),l=d.bounds(u),c=.95/Math.max((l[1][0]-l[0][0])/f,(l[1][1]-l[0][1])/b),p=[(f-c*(l[1][0]+l[0][0]))/2,(b-c*(l[1][1]+l[0][1]))/2],q.scale(c).translate(p),g.selectAll("path").data(u.features).enter().append("path").attr("d",d),a()}function s(e){o.selectHyperCubeValues("/qHyperCubeDef",0,[e],!0).then(function(e){pubsub.publish("update")})}var o,u,l,c,p,q,d,f,b,h=e.map(function(e){return{qNullSuppression:!0,qDef:{qFieldDefs:[e.dim],qFieldLabels:[e.label],qSortCriterias:[{qSortByNumeric:-1}]}}}),m={},y=500;f=n.offsetWidth,b=f/1.5,q=d3.geo.mercator().scale(1).translate([0,0]),d=d3.geo.path().projection(q);var g=d3.select(n).append("svg").attr("width",f).attr("height",b),v=d3.tip().attr("class","d3-tip").offset([-10,0]).html(function(e){return"<span>"+m[e.id].name+": "+m[e.id].value+" </span>"});g.call(v),d3.json("/static/data/world.geo.json",function(e,t){return e?console.error(e):(u=t,l=d.bounds(u),c=.95/Math.max((l[1][0]-l[0][0])/f,(l[1][1]-l[0][1])/b),p=[(f-c*(l[1][0]+l[0][0]))/2,(b-c*(l[1][1]+l[0][1]))/2],q.scale(c).translate(p),g.selectAll("path").data(t.features).enter().append("path").attr("d",d),void i())});var T=pubsub.subscribe("update",a),x=pubsub.subscribe("resize",r);pubsub.subscribe("kill",function(){pubsub.unsubscribe(T),pubsub.unsubscribe(x)})}!function(e){e.fn.invisible=function(){return this.each(function(){e(this).css("visibility","hidden")})},e.fn.visible=function(){return this.each(function(){e(this).css("visibility","visible")})}}(jQuery);