import { Component, ViewChild } from "@angular/core";
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexYAxis,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexStroke,
    ApexGrid
} from "ng-apexcharts";
import { HttpService } from "src/app/shared/services/http.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    colors: any;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};



@Component({
    selector: 'app-e-dashboard',
    templateUrl: './e-dashboard.component.html',
    styleUrls: ['./e-dashboard.component.scss']
})
export class EDashboardComponent {

    @ViewChild("chart") chart: ChartComponent | undefined;
    public chartOptions: Partial<ChartOptions>;
    public user: any;
    public Job: number = 0;

    constructor(private http: HttpService) {
        this.chartOptions = {
            series: [
                {
                    name: "Views",
                    data: [0, 41, 35, 51, 49, 62, 69, 91, 148]
                }
            ],
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#3a4e90"
            ],
            stroke: {
                curve: "straight"
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#e0e6e9",
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep"
                ],
                labels: {
                    style: {
                        colors: "#62646A",
                        fontSize: "15px"
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#62646A",
                        fontSize: "15px"
                    }
                },
                axisBorder: {
                    show: false
                }
            }
        };
    }

    ngOnInit() {
        this.loadData();
      }
      
      
      
      async loadData() {
        await Promise.all([this.getUser()]);
      }

    async getUser() {
        try {
          const res: any = await this.http.get('auth/me', true).toPromise();
          this.user = res?.user;
        } catch (error) {
          console.error('Error fetching users:', error);
        }

        try {
            const res: any = await this.http.get('jobs/get-my-jobs', true).toPromise();
            console.log(res);
            this.Job = res?.jobs?.length || 0;
          } catch (error) {
            console.error('Error fetching contractors:', error);
          }
      }
      

}