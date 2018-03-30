import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  StartTrue = true;
  startTime = true;
  min: any = 0;
  sec: any = 0;
  hou: any = 0;
  subscription;
  timestoping = [];
  waitingTimer;
  waiting = false;

  calculateTime() {
    this.sec--;
    if (this.min === 0 && this.hou === 0 && this.sec === 0) {
      this.subscription.unsubscribe();
      this.startTime = true;
    } else {
      if (this.min === 0 && this.hou !== 0 && this.sec === 0) {
        this.hou--;
        this.sec = 59;
        this.min = 59;
      }

      if (this.hou === 0 && this.min !== 0) {
        if (this.sec === 0) {
          this.sec = 59;
          this.min--;
        }
      }

      if (this.sec === 0 && this.hou !== 0) {
        if (this.min !== 0) {
          this.min--;
        } else {
          this.min = 59;
        }
        this.sec = 59;
      }
    }

    if (this.min === 0 && this.sec === 0 && this.hou === 0) {
      this.subscription.unsubscribe();
      this.startTime = true;

    }
  }

  start() {
    this.StartTrue = false;
    this.startTime = false;

    this.subscription = Observable.timer(1000, 1000).subscribe(data => {
      if (!this.waiting) {
        this.calculateTime();
      }
    });

  }

  stop() {
    this.StartTrue = true;
    this.subscription.unsubscribe();
    const obj = {
      min: this.min,
      sec: this.sec,
      hou: this.hou
    };
    this.timestoping.push(obj);
  }

  reset() {
    this.subscription.unsubscribe();
    this.min = 0;
    this.sec = 0;
    this.hou = 0;
    this.timestoping = [];
    this.startTime = true;
  }

  wait() {
    if (this.waitingTimer) {
      this.waitingTimer.unsubscribe();
      this.waitingTimer = null;
    }

    this.waiting = true;
    this.waitingTimer = Observable.timer(300, 300)
      .subscribe((second) => {
        this.waiting = false;
        this.waitingTimer.unsubscribe();
      });
  }

}
