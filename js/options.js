// Saves options to storage.sync.

function save_options() {
	var chartbeatapi = document.getElementById("chartbeatapi").value;
	var defaultsite = document.getElementById("site-list").value;
	var devoptions = document.getElementById("dev-select").value;
	var lballsites = document.getElementById("lballsites").value;
	var siftedSetting = document.getElementById("siftedSetting").value;
	
	chrome.storage.sync.set({'chartbeatapi': chartbeatapi}, function() {
		console.log('chartbeatapi saved (' + chartbeatapi + ')');
	});
	
	chrome.storage.sync.set({'defaultsite': defaultsite}, function() {
		console.log('defaultsite saved (' + defaultsite + ')');
	});
	
	chrome.storage.sync.set({'devoptions': devoptions}, function() {
		console.log('devoptions saved (' + devoptions + ')');
	});
	
	chrome.storage.sync.set({'lballsites': lballsites}, function() {
		console.log('lballsites saved (' + lballsites + ')');
	});
	
	chrome.storage.sync.set({'siftedSetting': siftedSetting}, function() {
		console.log('siftedSetting saved (' + siftedSetting + ')');
	});

	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

function reset_options() {
	
	var answer = confirm("Are you sure? You will loose your Chartbeat API...")
	
	if (answer){	
	
		var chartbeatapi = '';
		var defaultsite = '';
		var devoptions = '';
		var lballsites = '';
		var siftedSetting = '';
		
		chrome.storage.sync.set({'chartbeatapi': chartbeatapi}, function() {
			console.log('chartbeatapi removed');
		});
		
		chrome.storage.sync.set({'defaultsite': defaultsite}, function() {
			console.log('defaultsite removed');
		});
		
		chrome.storage.sync.set({'devoptions': devoptions}, function() {
			console.log('devoptions removed');
		});
		
		chrome.storage.sync.set({'lballsites': lballsites}, function() {
			console.log('lballsites removed');
		});
		
		chrome.storage.sync.set({'siftedSetting': siftedSetting}, function() {
			console.log('siftedSetting removed');
		});
	
		var status = document.getElementById("status");
		status.innerHTML = "Options removed.";
		
		setTimeout(function() {
			status.innerHTML = "";
		}, 750);
	  
		$("#chartbeatapi").val("");
		$("#site-list").val("");
		$("#dev-select").val("no");
		$("#lballsites").val("0");
		$("#siftedSetting").val("no");
	
	}
  
}

// Restores select box state to saved value from storage.sync.
function restore_options() {
	
	chrome.storage.sync.get(['chartbeatapi', 'defaultsite', 'devoptions', 'lballsites', 'siftedSetting'], function(syncstorage) {					  
		var chartbeatapi = syncstorage.chartbeatapi;
		var defaultsite = syncstorage.defaultsite;
		var devoptions = syncstorage.devoptions;
		var lballsites = syncstorage.lballsites;
		var siftedSetting = syncstorage.siftedSetting;
		
		// console.log('chartbeatapi: '+syncstorage.chartbeatapi+' || defaultsite: '+syncstorage.defaultsite+' || devoptions: '+syncstorage.devoptions+' || lballsites: '+syncstorage.lballsites);
			
		if (chartbeatapi == "") {
			return;
		}
		
		$("#chartbeatapi").val(chartbeatapi);
		$("#site-list").val(defaultsite);
		$("#dev-select").val(devoptions);
		$("#lballsites").val(lballsites);
		$("#siftedSetting").val(siftedSetting);
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#reset').addEventListener('click', reset_options);