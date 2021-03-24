 /*************************************************************************
 *  File: uniqueEvent.js
 *  Description: Example to setup unique events
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
		AdGydeTracker.setCurrentScreen("UniqueEvent Page")
	}
);

document.getElementById("dunique").onclick = function() 
{
	dailyUnique();
}

document.getElementById("punique").onclick = function() 
{
	permanentUnique();
}

document.getElementById("cunique").onclick = function() 
{
	customUnique();
}


/*
 * Unique Event
 * =============
 * Unique Event is useful to track event which needs to be tracked once in a time period.
 * AdGyde SDK provides Unique Events in three types:-
 *        onDailyUnique.
 *	  onPermanentUnique.
 *	  onCustomUnique.
 * You can implement these unique events as per your need.
 * This event is useful to track event which needs to be tracked once / Uniquely in a Day.
 * Multiple values Can be passed in the Event using multiple Parameters, but Uniqueness will be as per Event ID only
 *
 *
 * NOTE : Creating the Unique Event on Console with Event ID, Parameter is Compulsory
 *
 */


/*
 * Daily Unique event allows you to keep a event unique for current date.
 * In case you want to find out how many Unique users clicked on Daily Article page on 1st Jan 2019, then you can use this event
 */
function dailyUnique()
{
	// The paramter being passed in unique event are in combination of ParamterName and Value same as shown below
	// param.put( paramName, valueName );
	var unique={"dailyunique":"dailyunique_value"};

	// Event is triggered with EventId and Parameters prepared above, the same are passed in this function
	AdGydeTracker.eventDailyUnique("dailyunique",unique);
	window.plugins.toast.showShortBottom('Daily Unique Event Triggered',
	function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}


/*
* Permanent Unique event allows you to keep a event unique for user lifetime.
* In case you want to find out how many Unique users clicked on Article page in app lifetime, then you can use this event
*/
function permanentUnique()
{
	// The paramter being passed in unique event are in combination of ParamterName and Value same as shown below
	// param.put( paramName, valueName );
	var unique={"permanentunique":"permanentunique_value"};
	
	// Event is triggered with EventId and Parameters prepared above, the same are passed in this function
	AdGydeTracker.eventPermanentUnique("permanentunique_id",unique);
	window.plugins.toast.showShortBottom('Permanent Unique Event Triggered',
	function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}


/*
* Custom Unique event allows you to keep a event unique for custom time you require.
* In case you want to find out how many Unique users clicked on Article page during last 72 Hours, then you can use this event
*/
function customUnique()
{
	
	// The paramter being passed in unique event are in combination of ParamterName and Value same as shown below
	// param.put( paramName, valueName );
	var unique={"customunique":"customunique_value"};
	
	// Event is triggered with EventId and Parameters prepared above, the same are passed in this function
	// The third parameter is time in hours where you need to put the hour.
	// Track this Custom Unique events counts in hourly basis.
	AdGydeTracker.eventCustomUnique("customunique_id",unique,2);
	window.plugins.toast.showShortBottom('Custom Unique Event Triggered',
	function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}
