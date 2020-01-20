import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wind-widget',
  templateUrl: './wind-widget.component.html',
  styleUrls: ['./wind-widget.component.css']
})
export class WindWidgetComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() size: number;

  @Input() speedInMeterPerSecond: number;
  @Input() directionInDegrees: number;

  private centerX: number;
  private centerY: number;
  private radius: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {


  }

  ngOnInit() {
    this.centerX = this.x + this.size / 2;
    this.centerY = this.y + this.size / 2;
    this.radius = this.size / 2;

    this.canvas = document.getElementById('windWidget') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    window.requestAnimationFrame(() => this.draw());
  }

  draw() {


    this.context.save();

    this.context.beginPath();
    this.context.rect(0, 0, 500, 500);
    this.context.fillStyle = 'grey';
    this.context.fill();

    this.context.beginPath();
    this.context.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI
    );
    this.context.fillStyle = 'black';
    this.context.fill();

    this.context.restore();

    window.requestAnimationFrame(() => this.draw());
  }
}
