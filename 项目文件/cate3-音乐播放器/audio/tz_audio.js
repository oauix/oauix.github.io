var tzAudio = function(callback,moveback,loop,volume){
	var audioDom = document.createElement("audio");
	/*定义音乐播放的列表,playList是音乐列表，currentIndex:记录播放的索引*/
	var playList = [],currentIndex = -1;	
	/*播放*/
	function play(index){
		var song = playList[index];
		if(song){
			//readyState当前音频状态，4=HAVE_ENOUGH_DATA-可用数据足以开始播放
			if(audioDom.readyState==4 && currentIndex == index){
				audioDom.play();//播放音乐
			}else{
				//是否循环播放
				audioDom.loop= loop ||"loop";
				audioDom.volume = volume/10 || 0.6 ;  //volume音量属性
				currentIndex = index;
				//先暂停音乐
				stop();
				//重新加载
				audioDom.src = song.src;
				audioDom.name = song.name;
				//播放音乐
				audioDom.play();
			}
			time();
			audioDom.paused = true;
		}else{
			alert("播放列表是空的!!!");
		}
	};

	function time(){
		audioDom.oncanplaythrough = function(){
			if(callback)callback.call(this,this.duration,getFormatTimer(this.duration));
		};
			
		audioDom.addEventListener("timeupdate",function(){
			if(moveback)moveback.call(this,this.currentTime,getFormatTimer(this.currentTime));
		},false);
	};

	/*获取格式化的分秒*/
	function getFormatTimer(timer){
		if(!timer)return "00:00";
		var m = parseInt(timer / 60,10);
		var s = parseInt(timer % 60,10);
		return (m<10?("0"+m):m)+":"+(s<10?("0"+s):s);
	};

	//暂停	
	function stop(){
		 audioDom.pause();//ie8+支持：pause() 方法停止（暂停）当前播放的音频或视频
	};

	//下一首
	function next(){
		playMain(1);
	};

	//下一首
	function prev(){
		playMain(-1);
	};
	
	function setCurrentTime(percent){
		try{
			if(!audioDom.pasued){
				audioDom.currentTime = audioDom.duration * percent ;
				audioDom.play();
			}
		}catch(e){
			
		}
	};

	//通用方法	
	function playMain(step){
		if(playList.length==0)return ;	//若只有一首歌，就返回不做制作
		if(currentIndex==null){         //若没有歌曲，就调用play函数
			currentIndex = 0;
			play(playList[0]);
		}else{
			var index = currentIndex;
			if(step==1){
				index = (index < playList.length-1)?index+1:0;
			}else{
				index = (index >0)?index-1:playList.length-1; 
			}
			play(index);
		}
	};

	//name:歌曲的名称，src音乐播放的地址 --添加音乐方法
	function add(name,src){
		playList.push({name:name,src:src});
	};

	//删除音乐
	function remove(name){
		var len = playList.length;
		if(len==0)return;
		for(var i=0;i<len;i++){
			var pitem = playList[i];
			if(name==pitem.name){
				playList[i] = null;
				delete pitem;
				break;
			}
		}
	};
	//清空播放列表
	function clear(){
		playList = [];
		currentIndex = -1;
	};
	
	function isPaused(){
		return audio.paused;
	};

	
	return {
		add:add,
		play:play,
		stop:stop,
		prev:prev,
		next:next,
		setCurrentTime:setCurrentTime,
		remove:remove,
		isPaused:isPaused
	};
};

function setProgress(percent){
	document.getElementById("bar").style.left = (percent>=100?98.5:percent)+"%";
	document.getElementById("percent").style.width = percent+"%";
};

function bindProgress(audio){
	var mark = false;
	document.onmousedown = function(e){
		var ev = e || window.event;
		var targetDom = ev.target || ev.srcElement;
		ev.preventDefault();
		if(targetDom.id =="bar"){
			mark = true;
			var  x = ev.clientX || ev.pageX;
			var left = targetDom.offsetLeft;
			var width = targetDom.parentNode.clientWidth - targetDom.clientWidth;
			var pdom = targetDom.parentNode.firstElementChild;
			//绑定移动事件
			audio.stop();
			var percent = 0;
			document.onmousemove = function(e){
				if(mark){
					var ev = e || window.event;
					ev.preventDefault();
					var  nx = ev.clientX || ev.pageX;
					var offx = nx - x + left; 
					offx = (offx <=0?0:offx);
					offx = (offx >width?width:offx);
					targetDom.style.left = offx+"px";
					percent = (offx / width);
					pdom.style.width =(percent/100)+"%"; 
					audio.setCurrentTime(percent);
				}
			};
			document.onmouseup = function(e){
				mark = false;
			};
		}
	};
	
	document.getElementById("barc").onclick = function(e){
		var ev = e || window.event;
		var pwidth = this.parentElement.clientWidth;
		var left = e.clientX;
		var pleft = this.parentElement.offsetLeft;
		var width = left - pleft; 
		var percent = width / pwidth;
		var p = percent * 100;
		document.getElementById("bar").style.left = (p>=100?98.5:p)+"%";
		document.getElementById("percent").style.width = p+"%";
		audio.setCurrentTime(percent);
	};
};


function setMusicLrc(){
	//歌词
	var lrc = document.getElementById("lrc").value;
	var arr = [];
	function tm_showlrc(){
		var lrcArr = lrc.split("[");
		var html = "";
		for(var i=0;i<lrcArr.length;i++){
			var sarr = lrcArr[i].split("]");
			var timer = sarr[0].split(".");
			var message =  sarr[1];
			var stime = timer[0].split(":");
			var ms = stime[0]*60+stime[1]*1;
			if(message){
				arr.push(ms);
				var cm ='';
				for(var j=0;j<message.length;j++){
					cm+="<span>"+message.charAt(j)+"</span>";
				}
				html+="<li class='tztime' id='"+ms+"'>"+cm+"</li>";
			}
		}
		document.getElementById("lrcbox").innerHTML = html;
	};
	tm_showlrc();
}


function tm_changeLrc(timer){
	var m = parseInt(timer / 60);
	var s = parseInt(timer % 60);
	var st = m*60+s*1;
	var timedom = document.querySelectorAll(".tztime");
	for(var i=0;i<timedom.length;i++){
		timedom[i].className = "tztime";
	}
	
	for(var i=0;i<st;i++){
		var tdom = document.getElementById(i);
		if(tdom)tdom.className = "tztime selected";
	}
};
/*只支持ie9+ 要想更多了解，就学习actionscript -flash-mp3 */