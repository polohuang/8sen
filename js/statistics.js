$(document).ready(function(){
	$.get("http://tonyq.org/kptaipei/api-20150628.php", function(data) {
		var type = ["出院", "加護病房", "轉院", "一般病房", "其它", "自動出院(AAD)", "手術", "留觀"];
		var type0=0,type1=0,type2=0,type3=0,type4=0,type5=0,type6=0,type7=0;
		for(var i=0; i<data.data.length; i++){
			switch(data.data[i]["即時動向"]) {
				case "出院":
					type0++;
					break;
				case "加護病房":
					type1++;
					break;
				case "轉院":
					type2++;
					break;
				case "一般病房":
					type3++;
					break;
				case "其它":
					type4++;
					break;
				case "自動出院(AAD)":
					type5++;
					break;
				case "手術":
					type6++;
					break;
				case "留觀":
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
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
		            data: [
		                [type[0], type0],
		                [type[1], type1],
		                [type[2], type2],
		                [type[3], type3],
		                [type[4], type4],
		                [type[5], type5],
		                [type[6], type6],
		                [type[7], type7]
		            ]
		        }]
		    });
		});
		console.log(data.lastmodify);
	}, "json");
});