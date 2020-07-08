 /*************************************************************************
 *  File: counting.js
 *  Description: Example to setup Counting Events
 *
 *  Copyright (c) 2019 - AdGyde Solutions Private Limited
 *  All Rights Reserved.
 * 
 *  NOTICE:  All information contained herein is, and remains
 *  the property of AdGyde Solutions Private Limited. 
 *  The intellectual and technical concepts contained herein 
 *  are proprietary to AdGyde Solutions Private Limited and 
 *  are considered trade secrets and/or confidential under Law
 *  Dissemination of this information or reproduction of this material,
 *  in whole or in part, is strictly forbidden unless prior written 
 *  permission is obtained from AdGyde Solutions Private Limited.
 *
 */
 
 
 /* Custom User Flow
  * ==================
  *  By Calling the below "AdGydeTracker.setCurrentScreen("Screen_Name");" you can able to add user flow and this user flow will reflect on AdGyde Dashboard.
  */
document.addEventListener("deviceready", 
	function()
	{
		AdGydeTracker.setCurrentScreen("CountingEvent Page");
	}
);

document.getElementById("local").onclick =function() 
{
	countingEventLocal();
}

document.getElementById("national").onclick =function() 
{
	countingEventNational();
}

document.getElementById("international").onclick =function() 
{
	countingEventInternatonal();
}


/*
 * Counting Event
 * =============
 * The below code is the example to pass a Counting event to the AdGyde SDK.
 * This event is used to get Sub-Category Counting values.
 * Multiple values Can be passed for getting counted using same parameter.
 * When user passes multiple values, the console shows the counting of each value seperately
 *
 * NOTE : Creating the Counting Event on Console with Event ID, Parameter is Compulsory
 *
 */

function countingEventLocal()
{
	// Multiple values can be passed through this event and each value will be counted and displayed in panel seperately
	var map={"News":"Local"};

	// Event is triggered with EventId and Parameters prepared above, the same are passed in this function
	AdGydeTracker.countingEvent("CountingEvent",map);
	window.plugins.toast.showShortBottom('Counting Event Triggered', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}


function countingEventNational()
{
	// Multiple values can be passed through this event and each value will be counted and displayed in panel seperately
	var map={"News":"National"};

	// Event is triggered with EventId and Parameters prepared above, the same are passed in this function
	AdGydeTracker.countingEvent("CountingEvent",map);
	window.plugins.toast.showShortBottom('Counting Event Triggered', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}

function countingEventInternatonal()
{
	// Multiple values can be passed through this event and each value will be counted and displayed in panel seperately
	var map={"News":"International"};

	// Event is triggered with EventId and Parameters prepared above, the same are passed in this function
	AdGydeTracker.countingEvent("CountingEvent",map);
	window.plugins.toast.showShortBottom('Counting Event Triggered', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}

