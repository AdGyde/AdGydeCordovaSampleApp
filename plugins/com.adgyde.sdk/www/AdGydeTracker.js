 /*************************************************************************
 *  File: AdGydeTracker.js
 *  Description: AdGyde Tracker Javascript File
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

cordova.define("com.adgyde.sdk.AdGydeTracker", 
	function(require, exports, module) 
	{
		function cordovaExecCommand(command) 
		{    
			var args = Array.prototype.slice.call(arguments, 1);
			console.log('cordovaExecCommand: ',command, args);
			cordova.exec(
				function callback(data) { },
				function errorHandler(err) { },
				'AdGydeTrackerPlugin',
				command,
				args
			);
		}

		function cordovaExecCommandCallback(command, callback) 
		{    
			var args = Array.prototype.slice.call(arguments, 2);
			console.log('cordovaExecCommandCallback: ',command, args);
			cordova.exec(
				callback,
				function errorHandler(err) { },
				'AdGydeTrackerPlugin',
				command,
				args
			);
		}
		
		var AdGydeTracker = 
		{
			getVersion: function (callback) 
			{
				cordovaExecCommandCallback('getVersion', callback);
			},

			initPAgent: function(appKeyString)
			{
				cordovaExecCommand('initPAgent',appKeyString, 'Organic');
			},

			setCurrentScreen: function(screenName)
			{
				cordovaExecCommand('setCurrentScreen',screenName);
			},

			removeCurrentScreen: function(screenName)
			{
				cordovaExecCommand('removeCurrentScreen',screenName);
			},

			simpleEvent: function(eventName)
			{
				cordovaExecCommand('eventSimple', eventName);
			},

			countingEvent: function(eventName, value)
			{
				cordovaExecCommand('eventCounting', eventName, value);
			},

			computingEvent: function(eventName, value)
			{
				cordovaExecCommand('eventComputing', eventName, value);
			},

			eventDailyUnique: function(eventName, value,flag)
			{
				cordovaExecCommand('eventDailyUnique', eventName, value, flag);
			},

			eventPermanentUnique: function(eventName, value, flag)
			{
				cordovaExecCommand('eventPermanentUnique', eventName, value, flag);
			},

			eventCustomUnique: function(eventName, value, time)
			{
				cordovaExecCommand('eventCustomUnique', eventName, value, time );
			},

			eventRevenue: function(rev)
			{
				cordovaExecCommand('eventRevenue', rev);
			},
		};

		module.exports = AdGydeTracker;
	}
);
