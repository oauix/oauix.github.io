var playList = [],currentIndex = -1;
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
    
}
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