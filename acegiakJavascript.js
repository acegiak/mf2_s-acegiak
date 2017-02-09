function blockQuoteExpander(){
	jQuery('blockquote').click(function(){
		if(! jQuery(this).hasClass("expanded")){
			jQuery(this).addClass("expanded");
		}
	});
}

function parse(text){
    var re = /(\+|\-)?(\d+)(d(\d+))?/g;
    var s = text;
    var m;
    
    var ret = 0;
    window.rollLog = "";

    do {
    m = re.exec(s);
    if (m) {
        var mux = 1;
        if(m[1]=='-'){
            mux = -1;
        }
        for(var i = 0; i < m[2];i++){
            var drop = 1;
            if(m[3]){
                drop += Math.floor( Math.random() * parseInt(m[4]) );
                if(m[1]){
                    window.rollLog += m[1];
                }
                window.rollLog += ("(1d"+m[4]+":"+drop+")");
            }
            ret += drop*mux;
        }
        if(!m[3]){
                if(m[1]){
                    window.rollLog += m[1];
                }
            window.rollLog += ((m[2].toString()));
        }
    }
} while (m);
    return (window.rollLog+"\n= "+ret+"!");
}

function facepiles(){
	if(jQuery("ul.webmention-list li.p-repost").length){
		jQuery("div.comments-area").prepend('<ul class="repost-list facepile"></ul>');
		jQuery("ul.webmention-list li.p-repost").detach().appendTo('ul.repost-list');
	}
	if(jQuery("ul.webmention-list li.p-like").length){
		jQuery("div.comments-area").prepend('<ul class="like-list facepile"></ul>');
		jQuery("ul.webmention-list li.p-like").detach().appendTo('ul.like-list');
	}
	jQuery("ul.facepile article").find(".p-author .p-name").hide();
	jQuery("ul.facepile article").mouseover(function(){console.log("in");jQuery(this).find(".p-author .p-name").show();});
	jQuery("ul.facepile article").mouseout(function(){console.log("out");jQuery(this).find(".p-author .p-name").hide();});
}

function moodemoji(){
        jQuery("div.p-mood").each(function(){
                jQuery(this).html(jQuery(this).html().replace(/\((\d+)%\)/g, function(match, value, offset, s){
			moods = {
				90:"😁",
				80:"😀",
				70:"😊",
				60:"🙂",
				50:"😐",
				40:"🙁",
				30:"☹️",
				20:"😞",
				10:"😣",
				0:"😫"
				}
			highest = 0;
			found = false;
			for (var key in moods) {
				if(value > key && key > highest){
					highest = key;
					found = true;
				}
			}
			if(found){
				return " "+moods[highest]+'<span class="moodvalue">'+value+'%</span>';
			}

                        return " ("+value+"%)";
                }));
		console.log(jQuery(this).html());
        });
}

jQuery(document).ready(function() {
	blockQuoteExpander();
	facepiles();
	moodemoji();
	jQuery("body").linker();
	jQuery(".rollable").click(function(){alert(jQuery(this).text()+": "+parse(jQuery(this).text()));});
});



jQuery.fn.linker = function () {
        jQuery(this).contents()
            .filter(function() { return this.nodeType != Node.TEXT_NODE; })
            .each(function () { jQuery(this).linker(); });
        jQuery(this).contents()
            .filter(function() { return this.nodeType == Node.TEXT_NODE })
            .each(function () {
                jQuery(this).replaceWith(
                    jQuery(this).text().replace(/((\+|\-)?(\d+)(d\d+))+/ig, '<span class="rollable">$&</span>')
                    );
            });
    }



