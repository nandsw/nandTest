"use strict";
//http://10.2.1.14:8083/searchimagebytags/?s=quotes
var root = "http://10.2.1.14:8083/";
var App  = { 
	"api" : {
		
		"home" 					: root+"searchimagebytags/?s=",

	}
}


App.createComponent = function(api, callback, parent){
	$.ajax({
	    url : api,
	    type : "get",
	    success : function(result){
	    	// console.log(result);
	    	callback(result,parent);
	      
	    },
	    error: function() {
	       // connectionError();
	    }
	 });
}

App.homePage = function(){
		App.createComponent(App.api.home+quotes, App.masthead, $(".masthead"));
}

App.searchPage =  function(query){
	App.createComponent(App.api.home+query, App.searchData, $(".imgLibraries"));
}

App.searchData = function(result,parent){

	var data=result.info.hits.hits;

for(var i=0; i<data.length; i++){
	var tags='';
	for(var j=0; j<data[i]._source.tags.length; j++)
	{
		tags+=(' <span class="value">'+data[i]._source.tags[j]+'</span>,');
	}
	
	var item = $(
			'<div class="slider">'+
				'<div class="sliderImg">'+
				'<img src="'+data[i]._source.filename+'">'+
				'<div class="url"><p><span class="title">Image url : </span><input class="inputId" type="text" class="value" value="'+data[i]._source.filename+'"></p></div>'+
				'</div><div class="sliderText">'+
					'<p><span class="title">Image title : </span><span class="value">'+data[i]._source.article.image_title+'</span></p>'+
					'<p class="tag"><span class="title">Tags : </span>'+tags.substring(0, tags.length - 1)+'</p>'+
					'<p><span class="title">Image type : </span><span class="value">'+data[i]._source.filetype+'</span></p>'+
					'<p><span class="title">Image size(KB) : </span><span class="value">'+(data[i]._source.size_in_bytes/1024).toFixed(3) +' KB</span></p>'+
					'<p><span class="title">Image dimensions : </span><span class="value">'+data[i]._source['dimensions(w,h)']+'</span></p>'+
					'<p><span class="title">Sourcename : </span><span class="value">'+data[i]._source.sourcename+'</span></p>'+
					'<p><span class="title">Sourceurl : </span><span class="value">'+data[i]._source.sourceurl+'</span></p>'+
				'</div>'+
			'</div>'
			)

	$('.slideshow').append(item);
}

	for(var i=0; i<data.length; i++){
		// console.log('hi');
		var item = $(
			'<div class="imgContainer brick  img'+i+'">'+
				'<a href="#"><img src="'+data[i]._source.filename+'"></a>'+
			'</div>'
			)

		$(".imgLibraries").append(item);
		console.log(item.find('img').width());
	}
	
	

	console.log(data);
	// console.log(parent);
}


//click on get url button to get image url
$(document).on("click","#geturl",function(){
   var gurl = globalurl;
   var divUS = '';
   var cbtn = '';   
   cbtn = '<input type="button" id="buttoncopyurl" value="Copy"/>';   
   divUS += '<p><input type="text" class="geturlcode" id="inputId" value="'+gurl+'">  ' + cbtn + '</p>' ;
   console.log(divUS);
   $("#urlshow").append(divUS);    
   $('#geturl').prop('disabled','true');
   });

//click on copy to copy url
$(document).on("click",".inputId",function(){
   var url = $(this).select();
   console.log(url);
   document.execCommand("copy");  
});






