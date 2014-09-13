//
// Flickr
//
(function(hello){


function getApiUrl(method, extra_params, skip_network){
	var url=((skip_network) ? "" : "flickr:") +
			"?method=" + method +
			"&api_key="+ hello.init().flickr.id +
			"&format=json";
	for (var param in extra_params){ if (extra_params.hasOwnProperty(param)) {
		url += "&" + param + "=" + extra_params[param];
		// url += "&" + param + "=" + encodeURIComponent(extra_params[param]);
	}}
	return url;
}

// this is not exactly neat but avoid to call
// the method 'flickr.test.login' for each api call

function withUser(cb){

	var auth = hello.getAuthResponse("flickr");

	if(auth&&auth.user_nsid){
		cb(auth.user_nsid);
	}
	else{
		hello.api(getApiUrl("flickr.test.login"), function(userJson){
			// If the
			cb( checkResponse(userJson, "user").id );
		});
	}
}

function sign(url, params){
	if(!params){
		params = {};
	}
	return function(p, callback){
		withUser(function(user_id){
			params.user_id = user_id;
			callback(getApiUrl(url, params, true));
		});
	};
}


function getBuddyIcon(profile, size){
	var url="https://www.flickr.com/images/buddyicon.gif";
	if (profile.nsid && profile.iconserver && profile.iconfarm){
		url="https://farm" + profile.iconfarm + ".staticflickr.com/" +
			profile.iconserver + "/" +
			"buddyicons/" + profile.nsid +
			((size) ? "_"+size : "") + ".jpg";
	}
	return url;
}

function getPhoto(id, farm, server, secret, size){
	size = (size) ? "_"+size : '';
	return "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+size+".jpg";
}

function formatUser(o){
}

function formatError(o){
	if(o && o.stat && o.stat.toLowerCase()!='ok'){
		o.error = {
			code : "invalid_request",
			message : o.message
		};
	}
}

function formatPhotos(o){
	if (o.photoset || o.photos){
		var set = ("photoset" in o) ? 'photoset' : 'photos';
		o = checkResponse(o, set);
		paging(o);
		o.data = o.photo;
		delete o.photo;
		for(var i=0;i<o.data.length;i++){
			var photo = o.data[i];
			photo.name = photo.title;
			photo.picture = getPhoto(photo.id, photo.farm, photo.server, photo.secret, '');
			photo.source = getPhoto(photo.id, photo.farm, photo.server, photo.secret, 'b');
			photo.thumbnail = getPhoto(photo.id, photo.farm, photo.server, photo.secret, 'm');
		}
	}
	return o;
}
function checkResponse(o, key){

	if( key in o) {
		o = o[key];
	}
	else if(!("error" in o)){
		o.error = {
			code : "invalid_request",
			message : o.message || "Failed to get data from Flickr"
		};
	}
	return o;
}

function formatFriends(o){
	formatError(o);
	if(o.contacts){
		o = checkResponse(o,'contacts');
		paging(o);
		o.data = o.contact;
		delete o.contact;
		for(var i=0;i<o.data.length;i++){
			var item = o.data[i];
			item.id = item.nsid;
			item.name = item.realname || item.username;
			item.thumbnail = getBuddyIcon(item, 'm');
		}
	}
	return o;
}

function paging(res){
	if( res.page && res.pages && res.page !== res.pages){
		res.paging = {
			next : "?page=" + (++res.page)
		};
	}
}

hello.init({
	'flickr' : {

		name : "Flickr",

		// Ensure that you define an oauth_proxy
		oauth : {
			version : "1.0a",
			auth	: "https://www.flickr.com/services/oauth/authorize?perms=read",
			request : 'https://www.flickr.com/services/oauth/request_token',
			token	: 'https://www.flickr.com/services/oauth/access_token'
		},

		// AutoRefresh
		// Signin once token expires?
		autorefresh : false,

		// API base URL
		base		: "https://api.flickr.com/services/rest",

		// Map GET resquests
		get : {
			"me"		: sign("flickr.people.getInfo"),
			"me/friends": sign("flickr.contacts.getList", {per_page:"@{limit|50}"}),
			"me/following": sign("flickr.contacts.getList", {per_page:"@{limit|50}"}),
			"me/followers": sign("flickr.contacts.getList", {per_page:"@{limit|50}"}),
			"me/albums"	: sign("flickr.photosets.getList", {per_page:"@{limit|50}"}),
			"me/photos" : sign("flickr.people.getPhotos", {per_page:"@{limit|50}"})
		},

		wrap : {
			me : function(o){
				formatError(o);
				o = checkResponse(o, "person");
				if(o.id){
					if(o.realname){
						o.name = o.realname._content;
						var m = o.name.split(" ");
						o.first_name = m[0];
						o.last_name = m[1];
					}
					o.thumbnail = getBuddyIcon(o, 'l');
					o.picture = getBuddyIcon(o, 'l');
				}
				return o;
			},
			"me/friends" : formatFriends,
			"me/followers" : formatFriends,
			"me/following" : formatFriends,
			"me/albums" : function(o){
				formatError(o);
				o = checkResponse(o, "photosets");
				paging(o);
				if(o.photoset){
					o.data = o.photoset;
					delete o.photoset;
					for(var i=0;i<o.data.length;i++){
						var item = o.data[i];
						item.name = item.title._content;
						item.photos = "https://api.flickr.com/services/rest" + getApiUrl("flickr.photosets.getPhotos", {photoset_id: item.id}, true);
					}
				}
				return o;
			},
			"me/photos" : function(o){
				formatError(o);
				return formatPhotos(o);
			},
			"default" : function(o){
				formatError(o);
				return formatPhotos(o);
			}
		},

		xhr : false,

		jsonp: function(p,qs){
			if(p.method.toLowerCase() == "get"){
				delete qs.callback;
				qs.jsoncallback = p.callbackID;
			}
		}
	}
});
})(hello);