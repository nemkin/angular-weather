import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wind-widget',
  templateUrl: './wind-widget.component.html',
  styleUrls: ['./wind-widget.component.css']
})
export class WindWidgetComponent implements OnInit {

  @Input() speedInMeterPerSecond: number;
  @Input() directionInDegrees: number;

  public readonly size = 1700;
  public readonly innerTextSize = 160;
  public readonly outerTextSize = 240;
  public readonly outerTextMargin = 20;
  public readonly strikeLength = 120;
  public readonly lineWidth = 30;

  public readonly font = 'Arial';
  public readonly baseColor = '#575761';
  public readonly accentColor = '#FFBF46';
  public readonly fontColor = '#648381';

  get centerX() { return this.size / 2; }
  get centerY() { return this.size / 2; }
  get radius() { return this.size / 2 - this.lineWidth - this.outerTextMargin - this.outerTextSize; }
  get strikeWidth() { return this.lineWidth * 0.6; }
  get speedInKilometerPerHour()  { return (this.speedInMeterPerSecond * 3.6).toFixed(0); }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {}

  ngOnInit() {
    this.canvas = document.getElementById('windWidget') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    window.requestAnimationFrame(() => this.draw());
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

    this.context.font = `bold ${this.innerTextSize}px ${this.font}`;
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

    const distance = this.size / 2 - this.outerTextSize / 2;

    this.context.fillText('N', 0, -distance + this.outerTextSize * 0.14);
    this.context.fillText('S', 0, distance);
    this.context.fillText('W', -distance, this.outerTextSize * 0.053);
    this.context.fillText('E', distance - this.outerTextSize * 0.14, this.outerTextSize * 0.105);

    this.context.restore();
  }

  drawDirection(): void {
    this.context.save();
    this.context.beginPath();

    const degree = Math.PI / 180 * this.directionInDegrees + Math.PI / 2;
    const degreeDifference = Math.PI / 180 * 10;

    const a = {
      y: this.radius * 0.5 * Math.cos(degree),
      x: this.radius * 0.5 * Math.sin(degree),
    };
    const b = {
      y: this.radius * Math.cos(degree - degreeDifference),
      x: this.radius * Math.sin(degree - degreeDifference),
    };
    const c = {
      y: this.radius * Math.cos(degree + degreeDifference),
      x: this.radius * Math.sin(degree + degreeDifference),
    };

    this.context.moveTo(a.x, a.y);
    this.context.lineTo(b.x, b.y);
    this.context.lineTo(c.x, c.y);
    this.context.lineTo(a.x, a.y);

    this.context.fillStyle = this.accentColor;
    this.context.fill();

    this.context.restore();
  }

  drawStrikes(): void {
    this.context.save();
    this.context.beginPath();

    const strikeCount = 96;
    const strikes = [];
    for (let i = 0; i < strikeCount; ++i) {
      if (i % (strikeCount / 4) === 0) {
        strikes.push(1);
      } else if (i % (strikeCount / 8) === 0) {
        strikes.push(0.8);
      } else if (i % (strikeCount / 16) === 0) {
        strikes.push(0.6);
      } else {
        strikes.push(0.4);
      }
    }

    for (const strike of strikes) {

      this.context.fillStyle = this.baseColor;

      this.context.rect(
        -this.lineWidth / 2,
        this.radius - this.lineWidth / 2,
        this.strikeWidth,
        -this.strikeLength * strike
      );
      this.context.fill();

      this.context.rotate(2 * Math.PI / strikes.length);
    }

    this.context.restore();
  }
}
