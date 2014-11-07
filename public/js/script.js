$(document).ready(function(){
	timer();
});


function timer(){
	$('.duration').each(function(element){
		var curItem = $(this);
		var duration = curItem.html();
		setInterval(function(){
			var timer = duration.split(':');
			for(var index in timer){
				timer[index] = parseInt(timer[index]);
			}
			var newTime = countdown( new Date(timer[0],timer[1]-1,timer[2],timer[3],timer[4],0,0) ).toString();
			curItem.html(newTime);
			console.log($(this));
		}, 1000);
	})
};
