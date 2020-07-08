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

cordova.define("AdGydeCordovaSDK_4.1.5.AdGydeTracker", function(require, exports, module) 
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

			initAdGyde: function(appKeyString)
			{
				cordovaExecCommand('initAdGyde',appKeyString, 'Organic');
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

			eventDailyUnique: function(eventName, value)
			{
				cordovaExecCommand('eventDailyUnique', eventName, value);
			},

			eventPermanentUnique: function(eventName, value)
			{
				cordovaExecCommand('eventPermanentUnique', eventName, value);
			},

			eventCustomUnique: function(eventName, value, time)
			{
				cordovaExecCommand('eventCustomUnique', eventName, value, time );
			},

			eventRevenue: function(rev)
			{
				cordovaExecCommand('eventRevenue', rev);
			},

			setAge: function(year, month, day)
            {
            	cordovaExecCommand('setAge', year, month, day);
            },

            setGender: function(gender)
            {
            	cordovaExecCommand('setGender', gender);
            },

            onFcmToken: function(token)
            {
                cordovaExecCommand('fcmToken',token)
            },
			 onAllowIMEI: function(bool)
             {
                 cordovaExecCommand('allowIMEI',bool)
             },
			  onGetDeeplink:function(success, error)
             {
               cordova.exec(success, error, "AdGydeTrackerPlugin", "onGetDeeplink", []);
             },
			  setUserId:function(userid)
             {
             cordovaExecCommand('setUserId',userid);
             },

             setPhoneNumber:function(phoneNumber){
             cordovaExecCommand('setPhoneNumber',phoneNumber);
             },

              setEmailId:function(emailId){
               cordovaExecCommand('setEmailId',emailId);
               }

		};

		module.exports = AdGydeTracker;
	
});
