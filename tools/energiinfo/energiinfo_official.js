
/*
	Class for all communication that happens between service and server
	Shouldn't know anything about the api!
*/

function ServiceCommunication (name, accessToken) {

	this.serviceName = name;
	
	if (accessToken)
		this.accessToken = accessToken;
	else
		this.accessToken = CommonFunctions.getParameterValue('access_token');
		
	this.apiUrl = this.mainUrl ();
}

/* API - calls */

ServiceCommunication.prototype.login = function (siteId, username, passwd, captcha, callback) {

	var data = {
		site: siteId,
		Username: username,
		Password: passwd,
		Captcha: captcha
	};

	this.postData ('login', data, callback, callback, true);
}

ServiceCommunication.prototype.loginUsingAccesstoken = function (siteId, accessToken, callback) {

	var data = {
		site: siteId,
		access_token: accessToken
	};

	this.postData ('login/access_token', data, callback, callback, true, true);
}

ServiceCommunication.prototype.fetchUserSettings = function (callback) {
	com.postData ('user/profile', {}, callback, callback ,true);
}

ServiceCommunication.prototype.listServices = function (callback) {
	this.postData ('services', {}, callback, callback, true);
}

ServiceCommunication.prototype.listInvoices = function (period, callback) {
	var data = {
		period: period
	};
	
	this.postData('invoices', data, callback, callback, true);
}

ServiceCommunication.prototype.listMeteringPoints = function (callback) {

	this.postData ('meteringpoints', {}, callback, callback, true);
}

ServiceCommunication.prototype.searchCustomers = function (searchString, callback) {

	var data = {
		search: searchString
	};

	this.postData ('personnel/customer/search', data, callback, callback, true);
}

ServiceCommunication.prototype.generateLogin = function (customerId, callback) {

	var data = {
		customer_id: customerId
	};

	this.postData ('personnel/customer/generatelogin', data, callback, callback, true);
	
}

ServiceCommunication.prototype.fetchActiveContracts = function(mpId, callback) {
	var data = {
		meteringpoint_id: mpId,
	};

	this.postData('activecontracts', data, function(ans) {
		if (ans && ans.status == "OK" && !!ans.value &&
			ans.value.length > 0) {
			for (var i in ans.value) {
				contract = ans.value[i];

				if (contract.id == '1' &&
					contract.description == 'Anvisningspris' &&
					contract.designation == 'TILLSV' &&
					contract.stop_date == '') {
					contract.NotExists = true;
				}
			}
		}

		callback(ans);
	}, function(ansErr) {
		callback(ansErr);
	}, true);
}



ServiceCommunication.prototype.getCompareValues = function (mpId, signal, callback) {

	var data = {
		meteringpoint_id: mpId,
		signal: signal
	};

	this.postData ('compare', data, callback, callback, true);
}

ServiceCommunication.prototype.getServiceSettings = function (mpId, group, key, callback) {

	var data = {
		meteringpoint_id: mpId,
		group: group,
		key: key
	};

	this.postData ('servicesettings/get', data, callback, callback, true);
}

ServiceCommunication.prototype.setServiceSettings = function (mpId, group, key, val, callback) {

	var data = {
		meteringpoint_id: mpId,
		group: group,
		key: key,
		value: val
	};

	this.postData ('servicesettings/set', data, callback, callback, true);
}


ServiceCommunication.prototype.getServiceObject = function (objectType, objectId, callback) {

	var data = {
		type: objectType,
		id: objectId
	};

	this.postData ('objectsettings/get', data, callback, callback, true);
}

ServiceCommunication.prototype.deleteServiceObject = function (objectType, objectId, callback) {

	var data = {
		type: objectType,
		id: objectId
	};

	this.postData ('objectsettings/delete', data, callback, callback, true);
}

ServiceCommunication.prototype.setServiceObject = function (objectType, objectId, params, callback) {

	var data = {
		type: objectType,
		id: objectId,
	};
	
	for (var key in params) {
		data['object-' + key] = params[key];
	}
	
	data['object-clienttimestamp'] = this.getCurrentTimeStamp();

	this.postData ('objectsettings/set', data, callback, callback, true);
}

ServiceCommunication.prototype.getCurrentTimeStamp = function () {

	var dt = new Date();

	var yyyy = dt.getFullYear().toString();
	var mm = (dt.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = dt.getDate().toString();
	var sDate = yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]);

	var sep = ':';

	var HH = dt.getHours().toString();
	var mm = dt.getMinutes().toString();
	var ss = dt.getSeconds().toString();

	var sHH = (HH[1] ? HH : ("0" + HH[0]));
	var smm = (mm[1] ? mm : ("0" + mm[0]));
	var sss = (ss[1] ? ss : ("0" + ss[0]));

	var sTime = sHH + sep + smm + sep + sss;

	return sDate + " " + sTime;
}

ServiceCommunication.prototype.listServiceObjects = function (objectType, callback) {

	var data = {
		type: objectType
	};

	this.postData ('objectsettings', data, callback, callback, true);
}


ServiceCommunication.prototype.fetchLoaderStatus = function (mpId, signal, callback) {

	var data = {
		meteringpoint_id: mpId,
		signal: signal
	};
	
	this.postData ('loader/status', data, callback, callback, true);	
}

ServiceCommunication.prototype.fetchReadingValues = function (mpId, period, signal, callback) {

	var data = {
		meteringpoint_id: mpId,
		period: period,
		signal: signal
	};
	
	this.postData ('reading', data, callback, callback, true);		
}

ServiceCommunication.prototype.fetchOriginalReadingValues = function (mpId, period, signal, callback) {

	var data = {
		meteringpoint_id: mpId,
		period: period,
		signal: signal
	};
	
	this.postData ('reading/raw', data, callback, callback, true);
}



ServiceCommunication.prototype.fetchPeriodValues = function (mpId, period, interval, signal, callback) {

	var data = {
		meteringpoint_id: mpId,
		period: period,
		signal: signal,
		interval: interval
	};
	
	this.postData ('period', data, callback, callback, true);
}

ServiceCommunication.prototype.fetchSortedExactPeriodValues = function (mpId, period, interval, signal, order, count, callback) {

	var data = {
		meteringpoint_id: mpId,
		period: period,
		signal: signal,
		interval: interval,
		count: count,
		dir: order,
		status: 'exact'
	};
	
	this.postData ('period/sort', data, callback, callback, true);
}

ServiceCommunication.prototype.fetchAverageTopEffectValues = function (mpId, period, interval, signal, callback) {

	var data = {
		meteringpoint_id: mpId,
		period: period,
		signal: signal,
		interval: interval
	};
	
	this.postData ('period/topeffect/average', data, callback, callback, true);
}


ServiceCommunication.prototype.fetchTempValues = function (period, interval, callback) {

	var data = {
		period: period,
		interval: interval
	};

	this.postData ('temperature', data, callback, callback, true);
}

ServiceCommunication.prototype.getUrlForInvoiceContent = function (invoiceKey) {
	var url = this.mainUrl() + 'Files/?access_token=' + this.accessToken + '&invoice_key=' + invoiceKey;
	
	return url;
	
}

ServiceCommunication.prototype.getUrlForExportContent = function (mpId, period, interval, signal, format) {
	var url = this.mainUrl() + 'ExportData/?access_token=' + this.accessToken + '&meteringpoint_id=' + mpId + '&period=' + period + '&interval=' + interval + '&signal=' + signal + '&format=' + format;
	
	return url;	
}


/* Internal functions */

ServiceCommunication.prototype.isSecure = function() {
	return window.location.protocol == 'https:';
}

ServiceCommunication.prototype.mainUrl = function () {

	var url = '***REMOVED***/PlatformAPI/3.2/';
	
	return "https://" + url;

	if (this.isSecure())
	{
		return "https://" + url;
	}
	else
	{
		return "http://" + url;
	}
}


ServiceCommunication.prototype.postData = function(fnName, data, callback, errorCallback, async, skipAccessToken) {

	//alert ("postData");

	if (async !== true)
		async = false;

	if (async == false)
		console.log ('SEGCom.postData (SYNC): ' + uri);

	var outdata = null;

	//alert ('tst1');

	//alert (JSON.stringify(data));
	
	//data.access_token = this.accesToken;
	//data.cmd = fnName;
	
	var sendUrl = this.apiUrl + '?access_token=' + this.accessToken + '&cmd=' + fnName;	
	
	if (skipAccessToken) {
		sendUrl = this.apiUrl + '?cmd=' + fnName;
	}
	
	

	$.ajax({
		url: sendUrl,
		//url: this.apiUrl,
		async: async,
		type: "POST",
		dataType: "json",
		//data: JSON.stringify(data),
		data: data,
		//contentType: "application/json",
		contentType: "application/x-www-form-urlencoded",
		success: function (res) {
			outdata = res;

			if (callback)
				callback (res);
		},
		error: function (jqXHR, textStatus, errorThrown) { 

			//alert (jqXHR + " - " + textStatus + " - " + errorThrown);
			outdata = null;

			if (errorCallback)
				errorCallback();
		}
	});
	//alert ('tst2');
	//alert (outdata);


	return outdata;
}

ServiceCommunication.prototype.getData = function(fnName, data, callback, errorCallback, async) {

	//alert ("getData");

	if (async !== true)
		async = false;

	if (async == false)
		console.log ('SEGCom.getData (SYNC): ' + uri);

	var outdata = null;

	$.ajax({
		url: this.apiUrl + '?access_token=' + this.accessToken + '&cmd=' + fnName,
		async: async,
		method: "GET",
		dataType: "json",
		data: data,
		success: function (res) {
			outdata = res;

			if (callback)
				callback (res);
		},
		error: function (jqXHR, textStatus, errorThrown) { 

			//alert (jqXHR + " - " + textStatus + " - " + errorThrown);
			outdata = null;

			if (errorCallback)
				errorCallback();
		}
	});

	return outdata;
}