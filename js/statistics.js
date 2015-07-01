$(document).ready(function(){
	$.get("http://tonyq.org/kptaipei/api-20150628.php", function(data) {
		var type = ["出院", "加護病房", "轉院", "一般病房", "其它", "自動出院(AAD)", "手術", "留觀"];
		var type_another = [];
		for (var i = 0; i < data.data.length; i++) {
			if(type_another.indexOf(data.data[i]["即時動向"]) == -1) {
				type_another.push(data.data[i]["即時動向"]);
			}
		}
		console.log(type_another);
		var type_another_number = [];
		var type0 = 0, type1 = 0, type2 = 0, type3 = 0, type4 = 0, type5 = 0, type6 = 0, type7 = 0;
		for(var i=0; i<data.data.length; i++){
			switch(data.data[i]["即時動向"]) {
				case type_another[0]:
					type0++;
					break;
				case type_another[1]:
					type1++;
					break;
				case type_another[2]:
					type2++;
					break;
				case type_another[3]:
					type3++;
					break;
				case type_another[4]:
					type4++;
					break;
				case type_another[5]:
					type5++;
					break;
				case type_another[6]:
					type6++;
					break;
				case type_another[7]:
					type7++;
					break;
			}
		}
		$(function () {
		    $('#container').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: '八仙水上樂園患者即時動向'
		        },
		        subtitle: {
		        	text: 'Updated at: ' + data.lastmodify
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.y}</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: 'Total',
		            data: [{
		                name : type_another[0],
		                y : type0
		            },{
		                name : type_another[1],
		                y : type1
		            },{
		            	name : type_another[2],
		                y : type2
		            },{
		            	name : type_another[3],
		                y : type3
		            },{
		            	name : type_another[4],
		                y : type4
		            },{
		            	name : type_another[5],
		                y : type5
		            },{
		            	name : type_another[6],
		                y : type6
		            }/*,{
		            	name : type_another[7],
		                y : type7
		            }*/]
		        }]
		    });
		});

		$("#datasource").html("資料來源: " + data.source);
	}, "json");
});

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}