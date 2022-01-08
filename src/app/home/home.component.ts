import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes = [
    {
      name: 'Pannenkoeken',
      imageLink: 'https://bin.kompas.services/m/m1dyt8nwxtmu.jpg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
