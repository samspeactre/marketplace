import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-ed-manage-jobs',
  templateUrl: './ed-manage-jobs.component.html',
  styleUrls: ['./ed-manage-jobs.component.scss']
})
export class EdManageJobsComponent {

  EmployeJob: any;


  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.loadData();
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
    });
  }



  async loadData() {
    await Promise.all([this.getJobs()]);
  }

  async getJobs() {
    try {
      const res: any = await this.http.get('jobs/get-my-jobs', true).toPromise();
      console.log(res);
      this.EmployeJob = res?.jobs;
    } catch (error) {
      console.error('Error fetching contractors:', error);
    }
  }

  async openJobDetail(id: string) {
    this.router.navigate(['/job-details'], {
      queryParams: { id: id },
    });
  }

}
