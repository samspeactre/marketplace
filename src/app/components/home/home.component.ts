import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpService } from 'src/app/shared/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedTab: number | null = 0;
  AllJob: any;

  tabs = [
    {
      label: 'Recents Jobs',

    },
    {
      label: 'Featured Jobs',

    },
    {
      label: 'Freelancer',

    },
    {
      label: 'Part Time',

    },
    {
      label: 'Full Time',

    },
  ];

  selectTab(index: number): void {
    this.selectedTab = index;
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  accordionItems = [
    {
      title: 'How can I upload my video?',
      content: 'Content for Accordion 1',
      open: false
    },
    {
      title: 'How can i upload my resume or CV?',
      content: 'Content for Accordion 2',
      open: false
    },
    {
      title: 'What should i include my cover letter?',
      content: 'Content for Accordion 3',
      open: false
    },
    {
      title: 'How do i search for by location?',
      content: 'Content for Accordion 4',
      open: false
    },
    {
      title: 'Can i apply multiple jobs at once?',
      content: 'Content for Accordion 5',
      open: false
    }
  ];

  toggleAccordion(index: number) {
    // Close any other open accordion
    this.accordionItems.forEach((item, i) => {
      if (i !== index) {
        item.open = false;
      }
    });

    // Toggle the current accordion
    this.accordionItems[index].open = !this.accordionItems[index].open;
  }


  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    await Promise.all([this.getJobs()]);
  }

  async getJobs() {
    try {
      const res: any = await this.http.get('jobs/get_all_jobs', true).toPromise();
      console.log(res);
      this.AllJob = res?.jobs;
    } catch (error) {
      console.error('Error fetching contractors:', error);
    }
  }
}
