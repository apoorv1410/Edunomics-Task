import { Component,OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
    LineChart=[];
    trajPoints = [];
    hmax = 6   //in meters 
    g = 9.8 //in m/s^2
    tInit = Math.sqrt(2*this.hmax/this.g)   //in s
    absTime = this.tInit    //in s
    coRes = 0.75;
    bounce_num = 0;

    ngOnInit()
    {
        this.getChartData();

        this.drawChart();
    }

    getCoRes(event) {
        this.coRes = event.value;

        this.hmax = 6;
        this.tInit = Math.sqrt(2*this.hmax/this.g)   //in s
        this.absTime = this.tInit    //in s
        this.bounce_num = 0;
        this.trajPoints = []

        this.getChartData();
        
        this.drawChart();
        }

    getChartData(){
        console.log(this.coRes)

    for(let i=0; i<=this.tInit; i+=0.001){
        
        this.trajPoints.push({'x': i,'y': this.hmax - (0.5*this.g*(i**2))});
    }

    this.hmax = this.hmax*this.coRes**2;
    console.log("second hmax",this.hmax)
    this.absTime = this.tInit;
    this.tInit = Math.sqrt(2*this.hmax/this.g)
    this.bounce_num++;

    while(this.hmax>0.001){
        for(let i=0; i<=this.tInit; i+=0.001){
            this.trajPoints.push({'x': this.absTime + i,'y': Math.sqrt(2*this.g*this.hmax)*i - (0.5*this.g*(i**2))});
        }
        this.absTime += this.tInit;
        for(let i=0; i<=this.tInit; i+=0.001){
        
            this.trajPoints.push({'x': this.absTime + i,'y': this.hmax - (0.5*this.g*(i**2))});
        }
        this.hmax = this.hmax*this.coRes**2;
        this.absTime += this.tInit;
        this.tInit = Math.sqrt(2*this.hmax/this.g);
        this.bounce_num++;
    }
    
    }

    

        drawChart(){
        this.LineChart = new Chart('lineChart', {
            "type":"line",
            "data": {
                        "datasets": [
                            { 
                            "label":"Height of the ball",
                            "data": this.trajPoints, 
                            "fill":false,
                            "borderColor":"rgb(75, 192, 192)",
                            "lineTension":0.1
                            }
                        ]
                        },
    
                        "options":{
                            responsive: true, 
                            
                            scales: {
                                xAxes: [{
                                    type: 'linear', 
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time (in s)'
                                    },
                                }], 
                                yAxes: [{ 
                                display: true,
                                scaleLabel: {
                                        display: true,
                                        labelString: 'Height (in m)'
                                }
                            }],
                        }
                    }
                }
                ); 
        }
    
}
