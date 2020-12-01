import {Component, OnInit, TemplateRef} from '@angular/core';
import {ModalDismissReasons, NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {AuthService} from '../services/auth-service/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private modalService: NgbModal,
              calendar: NgbCalendar,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.isAuthenticated = authService.isAuthenticated();
    this.enabled = true;
  }

  model = {
    left: true,
    middle: false,
    right: false
  };

  isAuthenticated: boolean;

  fromDate: NgbDate;
  toDate: NgbDate;
  closeResult: string;
  registeredUser: User;
  enabled: boolean;

  focus;
  focus1;
  registerFormGroup: FormGroup;

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, {windowClass: 'modal-mini', size: 'sm', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, {centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit() {
  }

  registerWithName(classic2: TemplateRef<any>) {
    const forward = confirm('Register??').valueOf();
    if (forward) {
      this.enabled = false;
      const custName = this.registerFormGroup.value.name;
      const nameReq = {
        name: custName
      };
      this.authService.registerWithName(nameReq).subscribe(data => {
        if (data.ok) {
          this.registeredUser = data.body;
          if (!!this.registeredUser) {
            localStorage.setItem(environment.name_localstorage, custName);
            this.open(classic2, 'Notification', '');
          }
        } else {
          alert('Something went wrong');
        }
        this.enabled = true;
      }, error => {
        this.enabled = true;
        alert(error.toString());
      });
    }
  }
}
