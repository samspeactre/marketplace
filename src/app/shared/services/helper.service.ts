import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { LoaderService } from './loader.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpService, private toastr: ToastrService) {
  }


  fileUploadHttp(event: any): Promise<any> {
    LoaderService.loader.next(true);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const files = event.target.files;
      if(files){
        if (files.length > 10) {
          LoaderService.loader.next(false);
            reject("Upto 10 files can be uploaded");
        }
        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
          }
        } else {
          formData.append('images', files[0]);
        }
      }
        console.log(files)
      this.http
        .postMedia(
          'file/upload',
          formData,
          true,
        )
        .subscribe(
          (response: any) => {
            this.toastr.success('File Uploaded Successfully');
            LoaderService.loader.next(false);
            resolve(response); // Assuming the response contains imageUrls
          },
          (error) => {
            LoaderService.loader.next(false);
            reject(error);
          }
        );
    });
  }


  videoUploadHttp(files: FileList): Promise<any> {
    LoaderService.loader.next(true);

    return new Promise((resolve, reject) => {
      const formData = new FormData();

      // Append each file to the formData
      for (let i = 0; i < files.length; i++) {
        formData.append('video', files[i]);
      }

      this.http.postMedia('file/upload_video', formData, true).subscribe(
        (response: any) => {
          this.toastr.success('File Uploaded Successfully');
          LoaderService.loader.next(false);
          resolve(response); // Assuming the response contains video_url
        },
        (error) => {
          LoaderService.loader.next(false);
          reject(error);
        }
      );
    });
  }


  searchJobs(filters: any): Observable<any> {
    let params = new HttpParams();

    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }

    return this.http.post('jobs/search', { params }, false);
  }



  // videoUploadHttp(video: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const formData = new FormData();
  //     formData.append('video', video);
  //     this.http.postMedia('file/upload_video', video, true).subscribe(
  //       (response: any) => {
  //         console.log('API response:', response);
  //         resolve(response.data.video_url);
  //       },
  //       (error) => {
  //         console.error('API error:', error);
  //         reject(error);
  //       }
  //     );
  //   });
  // }
}
