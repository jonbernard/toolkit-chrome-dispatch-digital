/*

***CHARTBEAT FUNCTIONS***

These functions are called from the "chartbeat-[labs page].js" files
that change the appearence of the labs pages that accompany Chartbeat
statistics suite.

// Site Array Variable
	This array includes the list of site to include in any of the
	chartbeat pages.

	NOTE: 971thefan was removed from the list due to reporting issues.
	It should be added back once functionality is restored.
	

// clearheader() function
	This function clears the header link until the updatestyles
	function can set it to the proper title.


// updatestyles() function
	This function adds styles for the custom Dispatch branding for
	the Chartbeat labs pages. Custom page title (pagetitle) and
	width for the main header title (h1width) are passed through
	from the individual page js files.


// sitename() function
	This function creates a div with the id "site-name", grabs the
	host from the query string and displays it on the page.


//disablesections() function
	This function hides the section pages on the mosaic page. It
	also stops the page from rotating through the sections.
	

// updatemeta() function
	This function update some basic meta tags for the pages.


// sitenav() function
	This function takes the array of sites and creates the dropdown
	select box to allow users to easily switch between sites in the
	Dispatch Digital Toolbox "Trending Now" page. Multiple parts are
	added to the "listmarkup" variable and then appended to the header
	h1 tag.


// sitepopup() function
	This function takes the array of sites and creates the customized
	div dropdown box that allows users to easily switch between sites
	on the Chartbeat visualization pages. Logic is in place to set
	different variables depending on info passed through the funtion.
	This info includes the page that is being rendered, and the tag
	to append the dropdown to. Multiple parts are added to the
	"listmarkup" variable and then appended to the tag passed through
	the function.


// sitepopupfn() function
	This function sets the jQuery functions that facilitate the opening
	and closing of the div dropdown menus on the visualizations pages.


// gethostname() function
	This function gets the variable "host' from the url using the
	getquerystrvar function. This then decides whether it includes all
	the sites, based on the length of the variable, then returns text
	for the header of the pages.


// getquerystrvar() function
	This function takes the query string and breaks it out by
	seperate variables. It then returns the variable that is passed
	through the function.


// Revisions:
	01/26/2013 - Jon Bernard - Created
	02/01/2013 - Jon Bernard - Added specialized site dropdown

This first block sets the defaults for local storage. It calls the
chrome storage api and checks to see if items are set. If not.
It will set them.
*/

var storageArray = "";

chrome.storage.sync.get(['chartbeatapi', 'defaultsite', 'devoptions', 'lballsites', 'siftedSetting'], function(syncstorage) {
	storageArray = {chartbeatapi: syncstorage.chartbeatapi, defaultsite: syncstorage.defaultsite, devoptions: syncstorage.devoptions, lballsites: syncstorage.lballsites, siftedSetting: syncstorage.siftedSetting};
	
	if (storageArray["devoptions"] == 1) {
		console.log(storageArray);
	}
	
	var setchartbeatapi = "";
	var setdefaultsite = "";
	var setdevoptions = 0;
	var setSiftedSetting = 1;
	var lballsites = 0;
	
	if (syncstorage.chartbeatapi == null) {
		chrome.storage.sync.set({'chartbeatapi': setchartbeatapi}, function() {
			if (storageArray["devoptions"] == 1) {
				console.log("Installed default 'chartbeatapi' value");
			}
		});
	}
	
	if (syncstorage.defaultsite == null) {
		chrome.storage.sync.set({'defaultsite': setdefaultsite}, function() {
			if (storageArray["devoptions"] == 1) {
				console.log("Installed default 'defaultsite' value");
			}
		});
	}
	
	if (syncstorage.devoptions == null) {
		chrome.storage.sync.set({'devoptions': setdevoptions}, function() {
			if (storageArray["devoptions"] == 1) {
				console.log("Installed default 'devoptions' value");
			}
		});
	}
	
	if (syncstorage.lballsites == null) {
		chrome.storage.sync.set({'lballsites': lballsites}, function() {
			if (storageArray["devoptions"] == 1) {
				console.log("Installed default 'lballsites' value");
			}
		});
	}
	
	if (syncstorage.siftedSetting == null) {
		chrome.storage.sync.set({'siftedSetting': setSiftedSetting}, function() {
			if (storageArray["devoptions"] == 1) {
				console.log("Installed default 'siftedSetting' value");
			}
		});
	}

});

/* This sets the array of chartbeat sites */

var siteArray = {0: "dispatch.com", 1: "10tv.com", 2: "971thefan.com", 3: "thisweeknews.com", 4: "capital-style.com", 5: "columbusalive.com", 6: "columbuscrave.com", 7: "columbusparent.com", 8: "buckeyextra.dispatch.com", 9: "bluejacketsxtra.dispatch.com"};

if (storageArray["devoptions"] == 1) {
	console.log(siteArray);
}

function clearheader() {

	$("header h1").html("");

	$("iframe").contents().find("body").css("background-color", "#ff000");

}


function updatestyles(pagetitle, h1width) {

	$("header h1").css("width", h1width);
	$("header h1").html(pagetitle);
	$("header h1").css("color", "#f0f0f0");
	$("header h1").css("text-shadow", "2px 2px 5px black");
	$("iframe").contents().find(".title").css("font-size", "28px");

}


function sitename(type) {

	var host = gethostname();
	if (host != "Dispatch Media Sites" && host == host.replace(".dispatch.com", "")) {
		$("header").append("<div id='site-name'><img src='http://www." + host + "/favicon.ico' height='20' />" + host + "</div>");
	} else if (host != "Dispatch Media Sites" && host != host.replace(".dispatch.com", "")) {
		$("header").append("<div id='site-name'><img src='http://" + host + "/favicon.ico' height='20' />" + host.replace(".dispatch.com", "") + "</div>");
	} else {
		$("header").append("<div id='site-name'>" + host + "</div>");
	}

}


function disablesections() {

	$("iframe").contents().find("#header").css("display","none");
	$("iframe").contents().find("#pause").trigger("click");

}


function updatemeta() {
		
	$("link[rel='shortcut icon']").attr("href", "http://www.dispatch.com/content/digital/config/favicon.ico");

	var host = gethostname();
	$("title").prepend(host + " | Dispatch Digital | ");
	
}


function sitenav(pagetype,tag) {

	var listmarkup = "";
	var url = "";
	var sitelist = "";
		
	url = "http://www.dispatch.com/content/labs/extension/chartbeat-plugin.html?host=";

	listmarkup = "<select id='site-list'><option selected>Choose Site</option>";
	listmarkup += "<option>==============</option>";
	
	for (var i in siteArray) {
		listmarkup += "<option value='" + url + siteArray[i] + "'>" + siteArray[i].replace(".dispatch.com", ""); + "</option>";
	}
	
	listmarkup += "</select>";
	
	$(tag).append(listmarkup);

}


function sitepopup(pagetype,tag) {

	var listmarkup = "";
	var url = "";
	var apikey = "";
	var apikey_string = "";
	var sitelist = "";

	if (pagetype == "mosaic") {
		url = "http://chartbeat.com/labs/bigboardmosaic/?menu=yes&host=";
		apikey = getquerystrvar("apikey");
		apikey_string = "&amp;apikey=" + apikey;
	} else if (pagetype == "lb") {
		url = "http://chartbeat.com/labs/bigboard/?menu=yes&host=";
		
		for (var i in siteArray) {
			sitelist += siteArray[i]+",";
		}
	}
	
	listmarkup = listmarkup + "<div id='site-popup'><div id='site-popup-title' class='open-list'>Choose Sites</div>";
		
	listmarkup = listmarkup + "<div id='site-popup-list'><ul>";
		
	if (pagetype == "lb") {
		listmarkup = listmarkup + "<li><a href='" + url + sitelist + "'><strong>All Sites</strong></a></li>";
	}
	
	for (var i in siteArray) {
		listmarkup = listmarkup + "<li><a href='" + url + siteArray[i] + apikey_string + "'>" + siteArray[i].replace(".dispatch.com", ""); + "</a></li>";
	}
	
	listmarkup = listmarkup + "</a></ul></div></div>";

	$(tag).append(listmarkup);

}

function sitepopupfn(height) {
	
	$("#site-popup").mouseenter(function() {
			$("#site-popup").css("position", "fixed").css("top", "14px").css("right", "10px").css("z-index", "100").css("cursor", "auto");
			$("#site-popup").animate({
				top:'14px',
				right:'10px',
				height:height
			});
	}).mouseleave(function(){
			$("#site-popup").animate({
				top:'14px',
				right:'10px',
				height:'20px'
			});
	});
	
}

function gethostname() {

	var host = getquerystrvar("host");
	if (host.length > 28) {
		host = "Dispatch Media Sites";
	}

	return host;

}

function getquerystrvar(key) {

	key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
	var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
	return match && decodeURIComponent(match[1].replace(/\+/g, " "));

}

function setdefaultsite(host) {
	var sitelist = "";

	chrome.storage.sync.get(["lballsites"], function(syncstorage) {
		
		if (syncstorage.lballsites == 1 && getquerystrvar("host").length < 29 && getquerystrvar("menu") != "yes") {
		
			for (var i in siteArray) {
				sitelist += siteArray[i]+",";
			}
		
			$(location).attr("href","http://chartbeat.com/labs/bigboard/?host="+sitelist);
			
			if (storageArray["devoptions"] == 1) {
				console.log("Redirect triggered based on syncstorage.lballsites");
			}
		}
	
	});
	
}