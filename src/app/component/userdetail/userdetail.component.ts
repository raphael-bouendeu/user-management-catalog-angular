import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { UserService } from '../../service/user.service';
import { Coordinate } from '../../interface/coordinate.interface';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Change' | 'Edit' = 'Edit';
  user: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {


  }
  ngOnInit(): void {
    /* this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // console.log(params.get('uuid')!)
      this.userService.getUser(params.get('uuid')!).subscribe(
        (response: any) => {
          this.response = response;
        }
      )
    }) */

    this.user = (<User>(this.activatedRoute.snapshot.data['resoledResponse'].results[0]));
    console.log(this.user)
    this.loadMap(this.user.coordinate)
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    console.log(mode)
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Change' : 'Edit';
    if (mode === 'edit') {
      // Logic to update the user on the backend
      console.log("Updating using on the back end")
    }
  }
  private loadMap(coordinate: Coordinate): void {
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: 8
    })
    const mainLayer = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    mainLayer.addTo(map)
  }
}
