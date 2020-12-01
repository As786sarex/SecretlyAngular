import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Message} from '../../models/message';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  getAllMessagesByUsername(url: string, authHeader: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authHeader
    });
    return this.http.get<Message[]>(url, {headers: header});
  }

  sendMessageToUser(url: string, message: Message): Observable<HttpResponse<Message>> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Message>(url, message, {headers: header, observe: 'response'});
  }
}
