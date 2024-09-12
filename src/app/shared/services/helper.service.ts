import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { LoaderService } from './loader.service';
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



  videoUploadHttp(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('video', file);
      this.http.post('video_upload', file, true).subscribe(
        (response: any) => {
          console.log('API response:', response);
          resolve(response.data.video_url);
        },
        (error) => {
          console.error('API error:', error);
          reject(error);
        }
      );
    });
  }
}
