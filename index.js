$(document).ready(function(){
	let URL = "https://www.googleapis.com/youtube/v3/search";
	let key = masterKey;


	
  	function searchVid(query){
  		let options ={
  		q: query,
    	part: 'snippet',
    	key: key,
    	maxResults: 20,
  		}

  		$.getJSON(URL, options, function(data){
        console.log(data);
  			eachVid(data);
			});
  	}

  	function eachVid(data){
  		$.each( data.items, function(i, item){
  			let thumb = item.snippet.thumbnails.medium.url;
  			let title = item.snippet.title;
  			let channelID = item.snippet.channelId;
  			let channelTitle = item.snippet.channelTitle;
        let desc = item.snippet.description;
  			addVideoToHtml(thumb, title, channelTitle, channelID, desc);
  		})
  	}
  	function addVideoToHtml(thumb, title, channelTitle, channelID, desc){
  		  	let article =`<article>
			<img class="thumb" src="${thumb}" alt="${desc}">
			<div class="description">
			<h2>${title}</h2>
			<a href="https://www.youtube.com/channel/${channelID}" target="_blank"><p>${channelTitle}</p></a>				
			</div>		
			</article>`

  		$("main").append(article);
  	}



	$("#user-submit").submit(function(){
		event.preventDefault();
		$("main").html("");
		let query = $("#youtube-search").val();
		searchVid(query);
		$("#youtube-search").val(" ");
	});

});