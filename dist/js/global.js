!function(n){n.fn.invisible=function(){return this.each(function(){n(this).css("visibility","hidden")})},n.fn.visible=function(){return this.each(function(){n(this).css("visibility","visible")})}}(jQuery);var router=new PathParser;router.add("home",function(){$("#main").load("static/partials/dashboard.html",function(){$.getScript("js/main.js")})}),router.add("profile",function(){$("#main").load("static/partials/profile.html")}),router.add("export",function(){$("#main").removeClass().addClass("export").load("static/partials/export.html",function(){$.getScript("js/export.js")})}),$("#navigation li").on("click",function(){$(this).hasClass("active")||(pubsub.publish("kill"),$("#navigation li").removeClass("active"),$(this).addClass("active"),router.run($(this).data("nav")))});var QIX={global:null,app:null,config:{host:"diplomaticpulse.qlik.com",isSecure:!0,appname:"cb5bd147-7d74-4edd-9e2a-1d16e63906ae"},connect:function(n){var t=this.config;qsocks.Connect(t).then(function(i){QIX.global=i,i.openDoc(t.appname).then(function(t){QIX.app=t,t.clearAll().then(n)})},function(n){console.log(n)})}};QIX.connect(function(){router.run("home"),$(window).on("resize",debounce(function(){pubsub.publish("resize")},500)),Intro.getData()&&Intro.show(),$("#modal-toggle").on("click",function(){Intro.setData($("#dontshow").is(":checked")?!1:!0),Intro.hide()}),$("#menu-button").on("click",function(){$("#sidebar").toggle()});new Search($("#qv-search"))});