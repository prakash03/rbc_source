import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

success : string = "Txn success";

count : number = 20000;
value : number = 0;

btc : number;
btc_price : number = 4283.97; 
btc_value : number = 0;  

eth : number;
eth_price : number = 297.89; 
eth_value : number = 0;  

bhc : number;
bhc_price : number = 53.94; 
bhc_value : number = 0; 

xrp : number;
xrp_price : number = 0.198; 
xrp_value : number = 0; 

investment : number = 0;

     @Output() counterChange :  EventEmitter<number>;
     @Output() valueChange :  EventEmitter<number>;
     @Output() invChange :  EventEmitter<number>;
        constructor(){
         
            this.counterChange = new EventEmitter();
            this.valueChange = new EventEmitter();
         
        }
     
     @Input() 
        get counter(){
            return this.count; 
        }

        add_btc(){
        this.btc_value = this.btc_price * this.btc;
        }

        add_eth(){
        this.eth_value = this.eth_price * this.eth;
        }

        add_bhc(){
        this.bhc_value = this.bhc_price * this.bhc;
        }

        add_xrp(){
        this.xrp_value = this.xrp_price * this.xrp;
        }

        


        buy_all(){
        this.value = this.btc_value + this.eth_value + this.bhc_value + this.xrp_value;
        this.count = this.count - this.value;
        this.counterChange.emit(this.count);
        this.valueChange.emit(this.value);
        this.investment = this.investment + this.value;
        this.invChange.emit(this.investment);
        console.log(this.success);
        }

        sell_all(){
        this.value = this.btc_value + this.eth_value + this.bhc_value + this.xrp_value;
        this.count = this.count + this.value;
        this.counterChange.emit(this.count);        
        this.valueChange.emit(this.value);
        this.investment = 0;
        this.invChange.emit(this.investment);
        }

        submit(){
        this.value = this.btc_value + this.eth_value + this.bhc_value + this.xrp_value;
        }

        buy_btc(){
            this.btc_value = this.btc_price * this.btc;
            this.count = this.count - this.btc_value; 
            this.counterChange.emit(this.count);
        }

        sell_btc(){
            this.btc_value = this.btc_price * this.btc;
            this.count = this.count + this.btc_value; 
            this.counterChange.emit(this.count);
        }

        buy_eth(){
            this.eth_value = this.eth_price * this.eth;
            this.count = this.count - this.eth_value; 
            this.counterChange.emit(this.count);
        }

        sell_eth(){
            this.eth_value = this.eth_price * this.eth;
            this.count = this.count + this.eth_value; 
            this.counterChange.emit(this.count);
        }

        buy_bhc(){
            this.bhc_value = this.bhc_price * this.bhc;
            this.count = this.count - this.bhc_value; 
            this.counterChange.emit(this.count);
        }

        sell_bhc(){
            this.bhc_value = this.bhc_price * this.bhc;
            this.count = this.count + this.bhc_value; 
            this.counterChange.emit(this.count);
        }

        buy_xrp(){
            this.xrp_value = this.xrp_price * this.xrp;
            this.count = this.count - this.xrp_value; 
            this.counterChange.emit(this.count);
        }

        sell_xrp(){
            this.xrp_value = this.xrp_price * this.xrp;
            this.count = this.count + this.xrp_value; 
            this.counterChange.emit(this.count);
        }


  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var dataEmailsSubscriptionChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionsEmailsSubscriptionChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(emailsSubscriptionChart);
  }

}

