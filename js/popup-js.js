$(document).ready(function() {
		
	chrome.storage.sync.get(['chartbeatapi', 'defaultsite', 'devoptions', 'siftedSetting'], function(syncstorage) {
		var storageArray = {chartbeatapi: syncstorage.chartbeatapi, defaultsite: syncstorage.defaultsite, devoptions: syncstorage.devoptions, lballsites: syncstorage.lballsites, siftedSetting: syncstorage.siftedSetting};
		
		if (syncstorage.devoptions == 1) {
			var devreturn = "";
			$("#dev-links").css("display","block");
			
			var devLinkArr = {0: {name: "OpenCMS DigitalBuild Environment", url: "http://dispatch.com/workplacedb"}, 1: {name: "Developer Documentation", url: "http://dispatch.com/devdocs"}, 2: {name: "Tools/Vendor Credentials", url: "https://docs.google.com/document/d/1z3U_YQcvFFFki1F2N1Q9jKIbYBT0dycj-TJObxQHIAs/edit"}, 3: {name: "Helpdesk Tickets", url: "http://sp10prod/tools/helpdesk/rephome.aspx"}, 4: {name: "Caspio Forms", url: "https://www.caspio.com/login/BridgeLogin/?s2=1"}};
			
			if (storageArray["devoptions"] == 1) {
				console.log(devLinkArr);
			}
			
			devreturn += "<h2>Developer Links:</h2><ul>";
			var i;
	
			for (var i in devLinkArr) {
				devreturn += "<li><a href='" + devLinkArr[i]["url"] + "' target='_blank'>" + devLinkArr[i]["name"] + "</a></li>";
			}

			devreturn += "</ul>";
			$("#dev-links").html(devreturn);
				
		} else {
			$("#dev-links").css("display","none");
		}
		
		if (syncstorage.siftedSetting == 1) {
			chrome.tabs.getSelected(null, function(tab) {
				var baseUrl = "http://digitalbuild.dispatch.com/content/system/modules/com.dispatch.taddclient/index.html";
				var siftedReturn = "";
				$("#siftedOptions").css("display","block");
			
				var sifterLinkArr = {0: {name: "Sifted Client", url: baseUrl}, 1: {name: "Add Current Asset to Package", url: baseUrl+"#/asset/url/"+encodeURIComponent(tab.url)}};
				
				if (storageArray["devoptions"] == 1) {
					console.log(sifterLinkArr);
				}
				
				siftedReturn += "<embed src=\"http://digitalbuild.dispatch.com/content/system/modules/com.dispatch.taddclient/img/sifted-nameplate.svg\" type=\"image/svg+xml\"><ul>";
				var i;
				
				for (var i in sifterLinkArr) {
					siftedReturn += "<li><a href='" + sifterLinkArr[i]["url"] + "' target='_blank'>" + sifterLinkArr[i]["name"] + "</a></li>";
				}

				siftedReturn += "</ul>";
				$("#siftedOptions").html(siftedReturn);
			});
		} else {
			$("#siftedOptions").css("display","none");
		}
		
		$("#nav li").click(function () {
			var panelid = $(this).attr("rel");
	
			if (panelid != "chartbeat") {
				$("iframe").attr("src","loading.html");
			}
	
			$(".active").fadeOut(250, function () {
				$(".active").removeClass("active");
				$("#" + panelid).addClass("active");
				$("#" + panelid).fadeIn(250);
			});
			
			// $("#chartbeat").empty();
	
		});
		
		$("#nav li[rel='chartbeat']").click(function () {				  
			$.get("popup-chartbeat.html", function(data) {
				$("#chartbeatajax").html(data);
				
				if (hex_md5(syncstorage.chartbeatapi) === "6f1083403bdea274debc5bc570a020de") {
				
					if (syncstorage.defaultsite == "") {
						$("#chartbeatframe").attr("src","http://www.dispatch.com/content/labs/extension/chartbeat-plugin.html?api=aa9eb4c1cd9790ca445b4d0d6dc4b446");
						$("#trendinglink").attr("href","http://chartbeat.com/labs/bigboard/?host=dispatch.com,10tv.com,thisweeknews.com,capital-style.com,columbusalive.com,columbuscrave.com,columbusparent.com,buckeyextra.dispatch.com,bluejacketsxtra.dispatch.com");
						$("#mosaiclink").attr("href", "http://chartbeat.com/labs/bigboardmosaic/?host=dispatch.com&apikey=aa9eb4c1cd9790ca445b4d0d6dc4b446");
					} else {
						$("#chartbeatframe").attr("src","http://www.dispatch.com/content/labs/extension/chartbeat-plugin.html?host=" + syncstorage.defaultsite + "&api=aa9eb4c1cd9790ca445b4d0d6dc4b446");
						$("#trendinglink").attr("href","http://chartbeat.com/labs/bigboard/?host=" + syncstorage.defaultsite);
						$("#mosaiclink").attr("href", "http://chartbeat.com/labs/bigboardmosaic/?host=" + syncstorage.defaultsite + "&apikey=aa9eb4c1cd9790ca445b4d0d6dc4b446");
					}
					
				} else {
						$("#chartbeatframe").attr("src","http://www.dispatch.com/content/labs/extension/chartbeat-plugin.html?host=" + syncstorage.defaultsite);
						$("#trendinglink").attr("href","http://chartbeat.com/labs/bigboard/");
						$("#mosaiclink").attr("href", "http://chartbeat.com/labs/bigboardmosaic/");
				}
					
				$("#site-list").val("http://www.dispatch.com/content/labs/extension/chartbeat-plugin.html?host=" + syncstorage.defaultsite);
			});
		});
		
		$("#options").click(function () {
			chrome.tabs.create({
				url: "options.html"
			});
		});
	
		$("select").change(function(){ // put a ID to select tag
			if (storageArray["devoptions"] == 1) {
				console.log("trigger");
			}
			var currenturl = $("#chartbeatframe").attr("src");
			var url = $(this).val();
			var api_string = "";
				
			if (hex_md5(syncstorage.chartbeatapi) === "6f1083403bdea274debc5bc570a020de") {
				api_string = "&api=aa9eb4c1cd9790ca445b4d0d6dc4b446";
			}
		
			if (url != "" && currenturl != url) {
				$("#chartbeatframe").attr("src",url+api_string);
			}
		});
	});
	
	sitenav("toolbox","#chartbeatnav");
});