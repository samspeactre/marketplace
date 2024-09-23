import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-candidate-details-page',
  templateUrl: './candidate-details-page.component.html',
  styleUrls: ['./candidate-details-page.component.scss']
})
export class CandidateDetailsPageComponent {

  title = 'Candidate Details - Jove';
  public candidateDetail: any;


  constructor(private titleService: Title,
    private route: ActivatedRoute,
    private http: HttpService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.route.queryParams.subscribe((params) => {
      const candiateId = params['id'];
      if (candiateId) {
        this.loadData(candiateId);
      }
    });
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  videoUrls = ['../../../../assets/video/community-Popup.mp4', '../../../../assets/video/Rent-Popup.mp4', '../../../../assets/video/sell-Popup.mp4'];
  currentVideoIndex = 0;


  async loadData(id: any) {
    await Promise.all([this.getCandidateDetail(id)]);
  }


  async getCandidateDetail(id: any) {
    try {
      const res: any = await this.http
        .get(`auth/get-candidate-by-id/?id=${id}`, true)
        .toPromise();
      this.candidateDetail = res?.user;
      console.log(this.candidateDetail, 'hdg');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
}
