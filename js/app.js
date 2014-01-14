//Author: Seth Gossler
//Description: Skill Assessment homework,
//with some quicker ember framework implementation


//To hide depreciation logging
Ember.deprecate = function(){};

App = Ember.Application.create();

App.Router.map(function() {
  this.resource("email");
  this.resource("phone");
});

/*
* Route Objects
*/

App.EmailRoute = Ember.Route.extend({
  model: PersonList
});

App.PhoneRoute = Ember.Route.extend({
  model: PersonList
});

/*
* View Objects
*/

/*Application View -- handles view events*/
App.ApplicationView = Ember.View.extend({
	//the Change event triggered by the select tag //
	//there has to be a more elegant way to handle this
	change: function(e){
		if(e) {
			var selectChange = $(e.target).val();
			zebraCount = -1;
			this.get("controller").changeRoute(selectChange)
		}
	}
});

/* Email View */
App.EmailView = Ember.View.extend({
	click: function(e){
		if(e) {
			$elem = $(e.target);
			if(!$elem.is("a"))
			{
				$contact = $elem;
				if(!$elem.hasClass('contact'))
					$contact = $elem.parents('.contact');
				$allContacts = $('.contact');

				if(!$contact.hasClass("active"))
				{
					$allContacts.removeClass("active");
					$allContacts.addClass("fade");

					$contact.removeClass("fade");
					$contact.addClass("active");
				}
				else {
					$allContacts.removeClass("active");
					$allContacts.removeClass("fade");
				}
			}
		}
	}
});

/* Phone View */
App.PhoneView = Ember.View.extend({
	click: function(e){
		if(e) {
			$elem = $(e.target);
			if(!$elem.is("a"))
			{
				$contact = $elem;
				if(!$elem.hasClass('contact'))
					$contact = $elem.parents('.contact');
				$allContacts = $('.contact');

				if(!$contact.hasClass("active"))
				{
					$allContacts.removeClass("active");
					$allContacts.addClass("fade");

					$contact.removeClass("fade");
					$contact.addClass("active");
				}
				else {
					$allContacts.removeClass("active");
					$allContacts.removeClass("fade");
				}
			}
		}
	}
});

/*
* Controller Objects
*/

/*Application Controller -- handles the objects and any "heavy" logic*/
App.ApplicationController = Ember.ObjectController.extend({
	init: function(){
		console.log(window.location);
		if(window.location.hash == "" || window.location.hash == "#/")
			this.transitionToRoute("email");
	},
	changeRoute: function(route){
		 this.transitionToRoute(route);
	},
});

/*
* Model Objects
*/

/*This is a list of Person objects that will be used by the views as models*/
function PersonList() {
  	var Seth = new Person({
  		name: "Seth",
  		email: "sethgossler@gmail.com",
  		phone: "253.592.9443",
  		street: "1230 W Sprague Ave",
  		city: "Spokane, Wa. 99201",
  		status: "online"
  	});

  	var Rich = new Person({
  		name: "Rich",
  		email: "rich@mailnator.com",
  		phone: "555.525.8685",
  		street: "1230 E Sprague Ave",
  		city: "Puyallup, Wa. 98374",
  		status: "away"
  	});

  	var Danny = new Person({
  		name: "Danny",
  		email: "danny@mailnator.com",
  		phone: "555.535.1645",
  		street: "53424 Hopper Ave",
  		city: "Cheney, Wa. 99004",
  		status: "away"
  	});

  	var Taka = new Person({
  		name: "Taka",
  		email: "taka@mailnator.com",
  		phone: "555.525.6463",
  		street: "1230 V Sprague Ave",
  		city: "Spokane, Wa. 99201",
  		status: "busy"
  	});

  	var Tim = new Person({
  		name: "Tim",
  		email: "tim@mailnator.com",
  		phone: "555.535.2354",
  		street: "12453 S Sprague Ave",
  		city: "Spokane, Wa. 99201",
  		status: "away"
  	});

  	var Patrick = new Person({
  		name: "Patrick",
  		email: "Patrick@mailnator.com",
  		phone: "555.525.3333",
  		street: "25325 West Ave",
  		city: "Spokane, Wa. 99201",
  		status: "busy"  	
  	});

  	var Jacques = new Person({
  		name: "Jacques",
  		email: "Jacques@mailnator.com",
  		phone: "555.525.4444",
  		street: "25325 West Ave",
  		city: "Spokane, Wa. 99201",
  		status: "busy"  	
  	});

  	var list = [Seth, Rich, Danny, Taka, Tim, Patrick, Jacques];
    return list;
}
/*A simple "Person" object*/
function Person(param){
	this.name = param.name;
	this.email = param.email;
	this.phone = param.phone;
	this.street = param.street;
	this.city = param.city;
	this.status = param.status;
	this.active = param.active;
}
/*
* Handlebar helpers
*/
//Quick and dirty handlebars zebra stripe helper
zebraCount = -1;
Handlebars.registerHelper('zebra', function() {
   	zebraCount++;
    if(zebraCount%2 == 0)
    	return "";
    else
    	return "dark";
});