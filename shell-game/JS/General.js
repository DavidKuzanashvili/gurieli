$(document).ready(function(){
	$("#bl").css("visibility","visible");
	$("#rtt").height($("#rtt").width()/2);
      center_bl();
	  var rndm;
rndm=Math.floor((Math.random()*8)%8+1);
//$("body").css("background",);
var ry="png"
if(rndm==8)
{
	ry="jpg";
}
$("body").css("background",String("url('IMG/Textures/_"+String(rndm)+"."+ry+"') repeat #000 fixed"));
setInterval(function(){rttt();},400);
});
function rttt()
{
	if(innerHeight>innerWidth)
	{
		$("#dvv").css("visibility","visible");
		$("#rtt").css("visibility","visible");
	}
	else
	{
		$("#dvv").css("visibility","hidden");
		$("#rtt").css("visibility","hidden");
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//amount of moves
var aom;
//speed of the shells
var sos;
//move the shells after how much time?
var s_interv;
function center_bl()
{
	$("#bl").css("left",String(parseFloat(window.innerWidth)/2-parseFloat($("#bl").css("width"))*0.35)+"px");
}
function button_clicked()
{
	$(".button").css("transition-duration","0ms");
	yu=sos/2;
	tt=parseInt($("#bl").css("top"));
	ll=parseInt($("#bl").css("left"))-parseInt($("#s2").css("left"));
	uu=parseInt($("#bve").css("top"));
	hide_buttons();
}

var t=1,tt,ll;
function hide_buttons()
{
	$(".button").animate({top:"-17%",queue:false},1000);
	$(".button").fadeOut({queue:false},1000);
	start_123();
}

function start_123()
{
		$("#_3").css("visibility","visible");
		uu=-200;
	$("#_3").animate({left:String(parseFloat(innerWidth)+10)+"px"},1000,"linear",function(){$("#_2").css("visibility","visible");$("#_3").hide();t=2;__2();});
}

function __2()
{
		$("#_2").animate({left:String(parseFloat(innerWidth)+10)+"px"},1000,"linear",function(){
			$("#_1").css("visibility","visible");$("#_2").hide();t=3;__3();
			});
}

function __3()
{
	$("#_1").animate({left:String(parseFloat(innerWidth)+10)+"px"},1000,"linear",function(){
		$("#_1").hide();start_moving();
		});
}

function start_moving()
{
	$("#s2").animate({top:"25%"},1000,function()
	{
		__s_interv();
		$("#bl").css("visibility","hidden");
		ii=setInterval(function(){__s_interv()},s_interv);
	});
}

var a1,b1,a,b;
function __s_interv()
{
	if(innerHeight>innerWidth)
	{
		
	}
	a=Math.floor(((Math.random()*10)%3)+1);
	b=Math.floor(((Math.random()*10)%3)+1); 
	while(a==b)
	{
	a=Math.floor(((Math.random()*10)%3)+1);
	b=Math.floor(((Math.random()*10)%3)+1);
	}
	moveshells(a,b);
}

var _q,_w,_e,_r;
var aa,bb;
var op=2;
var yu;
function moveshells(a,b)
{
	if(op>aom)
	{
		clearInterval(ii);
		finished_moving();
	}
	else
	{
		++op;
	}
	switch (a)
	{
		case 1:
		a1=$("#s1");
		break;
		case 2:
		a1=$("#s2");
		break;
		case 3:
		a1=$("#s3");
		break;
	}
	switch (b)
	{
		case 1:
		b1=$("#s1");
		break;
		case 2:
		b1=$("#s2");
		break;
		case 3:
		b1=$("#s3");
		break;
	}
	var u;
	switch (a+b)
	{
		case 3:
		u=$("#s3");
		break;
		case 4:
		u=$("#s2");
		break;
		case 5:
		u=$("#s1");
		break;
	}
	if(((Math.random()*10)%2)==1)
	{
		a1.css("z-index","3");
		b1.css("z-index","1");
	}
	else
	{
		a1.css("z-index","1");
		b1.css("z-index","3");
	}
	var ra,rb;
	if(((Math.random()*10)%2)==1)
	{
		ra="40%";
		rb="10%";
	}
	else
	{
		ra="10%";
		rb="40%";
	}
	u.css("z-index","2");
	a1.animate({left:String(b1.css("left"))},{queue: false, duration:sos},function(){_q=false;});
	_q=true;
	a1.animate({queue: false,top:ra},yu,function(){a1.animate({top:"25%"},{queue: false,duration:yu},function(){_w=false;});});
	_w=true;
	b1.animate({left:String(a1.css("left"))},{queue: false, duration:sos},function(){_e=false;});
	_e=true;
	b1.animate({queue: false,top:rb},yu,function(){b1.animate({top:"25%"},{queue: false,duration:yu});});
	_r=true;
}

var fm;
function finished_moving()
{
	fm=true;
	$("#witb").animate({top:"72.5%"},1000);
}

function _1_click()
{
	if(fm)
	{
		False();
		vsbl();
		fm=false;
		$("#s1").animate({top:"10%"},1000,function(){$("#s2").animate({top:"10%"},1000);});
	}
}

function _2_click()
{
	if(fm)
	{
		True();
		vsbl();
		fm=false;
		$("#s2").animate({top:"10%"},1000);
	}
}

function _3_click()
{
	if(fm)
	{
		False();
		vsbl();
		fm=false;
		$("#s3").animate({top:"10%"},1000,function(){$("#s2").animate({top:"10%"},1000);});
	}
}

function vsbl()
{
	$("#bl").css("left",String(parseFloat($("#s2").css("left"))+ll)+"px");
	$("#bl").css("top",String(tt)+"px");
	$("#bl").css("visibility","visible");
}

function True()
{
	$("#tf").attr("src","IMG/t.png");
	$("#witb").animate({opacity:0},900,function(){$("#tf").animate({opacity:"1"},500);});
	showpa();
}

function False()
{
	$("#pa").html("Try Again");
	$("#witb").animate({opacity:0},900,function(){$("#tf").animate({opacity:"1"},500);});
	showpa();
}

function showpa()
{
	$("#pa").animate({top:"5%"},1000);
}

function _pa()
{
	location.reload();
}