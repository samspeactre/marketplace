import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-job-details-page',
    templateUrl: './job-details-page.component.html',
    styleUrls: ['./job-details-page.component.scss']
})
export class JobDetailsPageComponent {
    public jobDetail: any;
 
    constructor(private titleService:Title, 
        private router: Router,
         private route: ActivatedRoute,
         private http: HttpService,



    ) {}
    
    ngOnInit() {
        const title = 'Job Details';
        this.titleService.setTitle(`Jove | ${title}`);
        this.route.queryParams.subscribe((params) => {
          const jobId = params['id'];
          if (jobId) {
            this.loadData(jobId);
          }
        });
      }

    async loadData(id: any) {
        await Promise.all([this.getJobDetail(id)]);
      }

      async getJobDetail(id: any) {
        try {
          const res: any = await this.http
            .get(`jobs/get-by-id/?id=${id}`, true)
            .toPromise();
          this.jobDetail = res?.job;
          console.log(this.jobDetail, 'hdg');
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }

}