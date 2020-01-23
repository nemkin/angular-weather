import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-wind-widget',
  templateUrl: './wind-widget.component.html',
  styleUrls: ['./wind-widget.component.css']
})
export class WindWidgetComponent implements OnInit, OnChanges {

  @Input() speedInMeterPerSecond: number;
  @Input() directionInDegrees: number;

  public readonly size = 300;
  public readonly innerTextSize = 28;
  public readonly outerTextSize = 25;
  public readonly outerTextMargin = 10;
  public readonly strikeLength = 25;
  public readonly lineWidth = 1;

  public readonly font = 'Arial';
  public readonly baseColor = '#575761';
  public readonly accentColor = '#FFBF46';
  public readonly fontColor = '#648381';
  public readonly windArrowWidth = Math.PI / 180 * 10;
  public readonly strikeCount = 96;

  public strikes = [];
  public centerX: number;
  public centerY: number;
  public radius: number;
  public strikeWidth: number;
  public speedInKilometerPerHour: string;
  public outerTextDistance: number;
  public windArrowDegree: number;
  public a: any;
  public b: any;
  public c: any;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {}

  ngOnInit() {
    this.canvas = document.getElementById('windWidget') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    this.setVariables();

    window.requestAnimationFrame(() => this.draw());
  }

  ngOnChanges() {
    this.setVariables();
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  setVariables() {
    this.centerX = this.size / 2;
    this.centerY = this.size / 2;
    this.radius = this.size / 2 - this.lineWidth - this.outerTextMargin - this.outerTextSize;
    this.strikeWidth = this.lineWidth * 0.6;
    this.speedInKilometerPerHour = (this.speedInMeterPerSecond * 3.6).toFixed(0);
    this.outerTextDistance = this.size / 2 - this.outerTextSize / 2;
    this.windArrowDegree = Math.PI / 180 * this.directionInDegrees + Math.PI / 2;

    this.a = {
      y: this.radius * 0.5 * Math.cos(this.windArrowDegree),
      x: this.radius * 0.5 * Math.sin(this.windArrowDegree),
    };
    this.b = {
      y: this.radius * Math.cos(this.windArrowDegree - this.windArrowWidth),
      x: this.radius * Math.sin(this.windArrowDegree - this.windArrowWidth),
    };
    this.c = {
      y: this.radius * Math.cos(this.windArrowDegree + this.windArrowWidth),
      x: this.radius * Math.sin(this.windArrowDegree + this.windArrowWidth),
    };

    this.strikes = [];
    for (let i = 0; i < this.strikeCount; ++i) {
      if (i % (this.strikeCount / 4) === 0) {
        this.strikes.push(1);
      } else if (i % (this.strikeCount / 8) === 0) {
        this.strikes.push(0.8);
      } else if (i % (this.strikeCount / 16) === 0) {
        this.strikes.push(0.6);
      } else {
        this.strikes.push(0.4);
      }
    }
  }

  draw() {
    this.context.save();
    this.context.translate(this.centerX, this.centerY);

    this.drawDirection();

    this.drawInnerText();
    this.drawOuterText();

    this.drawCircle();
    this.drawStrikes();

    this.context.restore();
    window.requestAnimationFrame(() => this.draw());
  }

  drawCircle(): void {
    this.context.save();
    this.context.beginPath();

    this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);

    this.context.strokeStyle = this.baseColor;
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();

    this.context.restore();
  }

  drawInnerText(): void {
    this.context.save();
    this.context.beginPath();

    this.context.font = `${this.innerTextSize}px ${this.font}`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = this.fontColor;
    this.context.fillText(`${this.speedInKilometerPerHour} km/h`, 0, 0);

    this.context.restore();
  }

  drawOuterText(): void {
    this.context.save();
    this.context.beginPath();

    this.context.font = `${this.outerTextSize}px ${this.font}`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = this.fontColor;

    this.context.fillText('N', 0, -this.outerTextDistance + this.outerTextSize * 0.14);
    this.context.fillText('S', 0, this.outerTextDistance);
    this.context.fillText('W', -this.outerTextDistance, this.outerTextSize * 0.053);
    this.context.fillText('E', this.outerTextDistance - this.outerTextSize * 0.14, this.outerTextSize * 0.105);

    this.context.restore();
  }

  drawDirection(): void {
    this.context.save();
    this.context.beginPath();

    this.context.moveTo(this.a.x, this.a.y);
    this.context.lineTo(this.b.x, this.b.y);
    this.context.lineTo(this.c.x, this.c.y);
    this.context.lineTo(this.a.x, this.a.y);

    this.context.fillStyle = this.accentColor;
    this.context.fill();

    this.context.restore();
  }

  drawStrikes(): void {
    this.context.save();
    this.context.beginPath();

    for (const strike of this.strikes) {
      this.context.fillStyle = this.baseColor;
      this.context.rect(
        -this.lineWidth / 2,
        this.radius - this.lineWidth / 2,
        this.strikeWidth,
        -this.strikeLength * strike
      );
      this.context.fill();
      this.context.rotate(2 * Math.PI / this.strikes.length);
    }

    this.context.restore();
  }
}
