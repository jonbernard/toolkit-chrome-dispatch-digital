$(document).ready(function() {
		
	chrome.storage.sync.get(['chartbeatapi', 'defaultsite', 'devoptions'], function(syncstorage) {
		
		if (syncstorage.devoptions == "yes") {
			var devreturn = "";
			$("#dev-links").css("display","block");
			var devlinkarr = [["http://dispatch.com/workplacedb", "OpenCMS DigitalBuild Environment"], ["http://dispatch.com/devdocs", "Developer Documentation"], ["https://docs.google.com/document/d/1z3U_YQcvFFFki1F2N1Q9jKIbYBT0dycj-TJObxQHIAs/edit", "Tools/Vendor Credentials"], ["http://sp10prod/tools/helpdesk/rephome.aspx", "Helpdesk Tickets"], ["https://www.caspio.com/login/BridgeLogin/?s2=1", "Caspio Forms"]];
			console.log(devlinkarr);
			devreturn += "<h2>Developer Links:</h2><ul>";
			var i;
			for (i = 0; i < devlinkarr.length; ++i) {
				devreturn += "<li><a href='" + devlinkarr[i][0] + "' target='_blank'>" + devlinkarr[i][1] + "</a></li>";
			}
			devreturn += "</ul>";
			$("#dev-links").html(devreturn);
				
		} else {
			$("#dev-links").css("display","none");
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
				if (syncstorage.defaultsite == "") {
					$("#chartbeatframe").attr("src","http://www.dispatch.com/content/labs/extension/chartbeat-plugin.html?api=" + syncstorage.chartbeatapi);
					$("#trendinglink").attr("href","http://chartbeat.com/labs/bigboard/?host=dispatch.com,10tv.com,thisweeknews.com,capital-style.com,columbusalive.com,columbuscrave.com,columbusparent.com,buckeyextra.dispatch.com,bluejacketsxtra.dispatch.com");
					$("#mosaiclink").attr("href", "http://chartbeat.com/labs/bigboardmosaic/?host=dispatch.com&apikey=" + syncstorage.chartbeatapi);
				} else {
					$("#chartbeatframe").attr("src","http://www.dispatch.com/content/labs/extension/chartbeat-plugin.html?host=" + syncstorage.defaultsite + "&api=" + syncstorage.chartbeatapi);
					$("#trendinglink").attr("href","http://chartbeat.com/labs/bigboard/?host=" + syncstorage.defaultsite);
					$("#mosaiclink").attr("href", "http://chartbeat.com/labs/bigboardmosaic/?host=" + syncstorage.defaultsite + "&apikey=" + syncstorage.chartbeatapi);
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
			console.log("trigger");
			var currenturl = $("#chartbeatframe").attr("src");
			var url = $(this).val();
			var api_string = "";
				
			api_string = "&api=" + syncstorage.chartbeatapi;
		
			if (url != "" && currenturl != url) {
				$("#chartbeatframe").attr("src",url+api_string);
			}
		});
	});
	
	sitenav("toolbox","#chartbeatnav");
});