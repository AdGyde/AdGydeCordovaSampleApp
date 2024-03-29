 /*************************************************************************
 *  File: index.js
 *  Description: Example AdGyde Plugn Function Calls
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

 
document.addEventListener("deviceready",
	function()
	{
		// AdGyde Initialise
		// Initialize AdGyde SDK with appkey & default channel id "Organic".
		// When applictaion is installed from Google Play Store without any campaign the Channel will be Organic as specified in Init Function
		// In case the applictaion is installed through a campaign link then the Default channel will be overriden and value from the campaign link will be passed.
		// By Calling the below "AdGydeTracker.setCurrentScreen("Screen_Name");" you can able to add user flow and this user flow will reflect on AdGyde Dashboard.
		AdGydeTracker.initAdGyde("Your_App_Key","Organic");
			
		// Custom User Flow		
        AdGydeTracker.setCurrentScreen("Home_page");
		
		//Permission for Colllecting IMEI
        AdGydeTracker.onAllowIMEI(true);
		
		// Fcm token method call
		onFcmToken();


	}
);


/*
 * Simple Event
 * =============
 * The below code is the example to pass a simple event to the AdGyde SDK.
 * This event requires only 1 Parameter which is the Event ID.
 *
 * NOTE : Creating the Simple Event on Console with Event ID is Compulsory
 *
 */
function simpleEvent()
{
    AdGydeTracker.simpleEvent("Registration");
    window.plugins.toast.showShortBottom('Simple Event Triggered',
    function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});


}


/*
 * Computing Event
 * =============
 * The below code is the example to pass a Computing event to the AdGyde SDK.
 * This event is used to get Sub-Category counting as per weightage of the Sub-Category
 * Multiple values Can be passed for getting the computed values
 * When user passes multiple values, the console shows the computed values of each value relatively
 *
 * NOTE : Creating the Computing Event on Console with Event ID, Parameter is Compulsory
 *
 */
 function computingEvent()
 {
	// Passing a computing event is a little complex
	// First the Sub-Category needs to be specified in a Parameter + Value combination
	// Then the Weightage of the Value needs to be specified in a Value + Weightage Combination
	// In below Example 30%off is a Sub-Category and 1 is the Weightage of the same
  
	var map={"Sale":"50%off","50%off":"10"};
	AdGydeTracker.computingEvent("eventComputing",map);
	window.plugins.toast.showShortBottom('Computing Event Triggered', function(a){console.log('toast success: ' + a)},
	function(b){alert('toast error: ' + b)});
 }


/*
 * Revenue Event
 * =============
 * The below code is the example to pass a Revenue event to the AdGyde SDK.
 * This event is useful to track revenue generated by the user in-app.
 * Unit of the currency need not be passed, by default revenue is calculated in INR (Indian Rupees)
 *
 * NOTE : There is no Need to create the Revenue Event on Console
 *
 */
function revenueEvent()
{
    AdGydeTracker.eventRevenue(5);
    window.plugins.toast.showShortBottom('In App Revenue Event Triggered',
    function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
}


/*
 * AdGyde's Uninstall Tracking functionality allows you to track the number of uninstalls for your application.
 * For the uninstall functionality to work AdGyde requires the FCM token.
 *
 * Application can pass the FCM token directly to AdGyde by calling AdGyde's "com.adgyde.android.FIIDService" Service in Manifest file or else
 *
 * If application has multiple InstanceIDListener services, then the same can be passed using application's pre-existing Listener
 * Just pass the Token to AdGyde's API through the application's pre-existing Listener
 *
 */
function onFcmToken()
{
	//FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
	//Note that this callback will be fired everytime a new token is generated, including the first time.
	FCMPlugin.onTokenRefresh(
		function(token){
		//AdGydeTracker.onFcmToken(token);
		window.plugins.toast.showShortBottom('tokenrefresh-----', function(a){console.log('Tokenn---Sucess ' + token)},
        	function(b){alert('toast error: ' + token)});
		}
	);

	//FCMPlugin.getToken( successCallback(token), errorCallback(err) );
	//Keep in mind the function will return null if the token has not been established yet.
	FCMPlugin.getToken(
		function(token){
			AdGydeTracker.onFcmToken(token);
			window.plugins.toast.showShortBottom('getToken-----', function(a){console.log('Token Success: ' + token)},
                    	function(b){alert('toast error: ' + token)});

        }
	);
}

/*
 * Demography
 * ==========
 * AdGyde demography data provides details of Age and Gender wise segregation of Users.
 * This data needs to be passed by Applictaion to show the same in the console
 */

/*
 * Age data can be passed to SDK by following 2 functions which are shown in below code:-
 *
 * Both function are shown in below setUserAge();
 * Put it as per you passed the value like Age wise or D.O.B wise.
 *
 * Syntax Type 1 :- AdGydeTracker.setAge( int years, int month, int day);
 * Syntax Type 2 :- AdGydeTracker.setAge( int age);
 *
 */

function setUserAge()
{
	AdGydeTracker.setAge(1991,05,05);

 //AdGydeTracker.setAge(26);//Syntax Type 2
}


/* Gender value can be passed to the SDK using the below function.
 * Only the below 3 Values can be passed to the function for Gender
 * Male (M)
 * Female (F)
 * Others (O)
 *
 * Syntax :- AdGydeTracker.setGender(String gender);
 *
*/
function setUserGender()
{
AdGydeTracker.setGender("M");
}

/* Get Deeplink Data 
*/

function getDlData()
{
   AdGydeTracker.onGetDeeplink(success, error);
    function success(data){
        alert(data);
    }

    function error(error){
        alert(JSON.stringify(error));
    }
}

function UserID()
{
 AdGydeTracker.setUserId("ADG1045984");
}

function setPhoneNumber()
{
	AdGydeTracker.setPhoneNumber("8130300721");
}

function setEmailId()
{
	AdGydeTracker.setEmailId("support@adgyde.com");
}


/*Function for calling the page*/
function countingEventPage()
{
	change_page_counting();
}

function uniqueEventPage()
{
	change_page_unique();
}

/*Function for calling the event*/
document.getElementById("simpleEvent").onclick = function() 
{
	simpleEvent();
}

document.getElementById("countingEvent").onclick = function()
{
	countingEventPage();
}

document.getElementById("computingEvent").onclick = function()
{
	computingEvent();
}

document.getElementById("uniqueEvent").onclick = function()
{
	uniqueEventPage();
}

document.getElementById("revenueEvent").onclick = function()
{
	revenueEvent();
}

document.getElementById("userAge").onclick = function()
{
	setUserAge();
}

document.getElementById("userGender").onclick = function()
{
	setUserGender();
}

document.getElementById("getDlData").onclick = function()
{
	getDlData();
}

document.getElementById("setUserId").onclick = function()
{
UserID();
}

document.getElementById("setPhoneNumber").onclick = function()
{
setPhoneNumber();
}

document.getElementById("setEmailId").onclick = function()
{
setEmailId();
}

function change_page_counting()
{
	window.location.href = "countingEvent.html";
}

function change_page_unique()
{
	window.location.href = "uniqueEvent.html";
}

function onLoad() 
{
    document.addEventListener("deviceready", onDeviceReady, false);
}

var app = {
    // Application Constructor
    initialize: function() 
	{
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() 
	{
		this.receivedEvent('deviceready');
    },



    // Update DOM on a Received Event
    receivedEvent: function(id) 
	{
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }

};

app.initialize();
