import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeatherService } from '../services/weather.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-primary-clock',
  templateUrl: './primary-clock.component.html',
  styleUrls: ['./primary-clock.component.css'],
})
export class PrimaryClockComponent implements OnInit, OnDestroy {
  public location: any = 'New York'; // Default location
  public weatherData: any = null;
  public currentTime: string = ''; // Variable for storing time
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public weatherEmoji: string = ''; // Variable for storing weather emoji
  private intervalId: any; // Store the interval ID for cleanup
  private localTimeOffset: number = 0; // Offset in seconds for real-time updates

  // public alarmTime: string = ''; // Variable for storing the alarm time
  // public alarmMessage: string = ''; // Variable for storing the alarm message
  // private alarmTimeoutId: any; // Store the timeout ID for the alarm

  public locations = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'United Kingdom' },
    { id: 4, name: 'Australia' },
    { id: 5, name: 'Germany' },
    { id: 6, name: 'France' },
    { id: 7, name: 'Italy' },
    { id: 8, name: 'Spain' },
    { id: 9, name: 'India' },
    { id: 10, name: 'China' },
    { id: 11, name: 'Japan' },
    { id: 12, name: 'South Korea' },
    { id: 13, name: 'Brazil' },
    { id: 14, name: 'Mexico' },
    { id: 15, name: 'Russia' },
    { id: 16, name: 'South Africa' },
    { id: 17, name: 'Netherlands' },
    { id: 18, name: 'Belgium' },
    { id: 19, name: 'Sweden' },
    { id: 20, name: 'Norway' },
    { id: 21, name: 'Denmark' },
    { id: 22, name: 'Finland' },
    { id: 23, name: 'Austria' },
    { id: 24, name: 'Switzerland' },
    { id: 25, name: 'Ireland' },
    { id: 26, name: 'New Zealand' },
    { id: 27, name: 'Singapore' },
    { id: 28, name: 'Hong Kong' },
    { id: 29, name: 'Malaysia' },
    { id: 30, name: 'Philippines' },
    { id: 31, name: 'Thailand' },
    { id: 32, name: 'Vietnam' },
    { id: 33, name: 'Indonesia' },
    { id: 34, name: 'Pakistan' },
    { id: 35, name: 'Bangladesh' },
    { id: 36, name: 'Egypt' },
    { id: 37, name: 'Saudi Arabia' },
    { id: 38, name: 'United Arab Emirates' },
    { id: 39, name: 'Qatar' },
    { id: 40, name: 'Kuwait' },
    { id: 41, name: 'Iraq' },
    { id: 42, name: 'Iran' },
    { id: 43, name: 'Turkey' },
    { id: 44, name: 'Greece' },
    { id: 45, name: 'Portugal' },
    { id: 46, name: 'Czech Republic' },
    { id: 47, name: 'Hungary' },
    { id: 48, name: 'Slovakia' },
    { id: 49, name: 'Romania' },
    { id: 50, name: 'Bulgaria' },
    { id: 51, name: 'Ukraine' },
    { id: 52, name: 'Serbia' },
    { id: 53, name: 'Croatia' },
    { id: 54, name: 'Slovenia' },
    { id: 55, name: 'Bosnia and Herzegovina' },
    { id: 56, name: 'Montenegro' },
    { id: 57, name: 'Lithuania' },
    { id: 58, name: 'Latvia' },
    { id: 59, name: 'Estonia' },
    { id: 60, name: 'Belarus' },
    { id: 61, name: 'Moldova' },
    { id: 62, name: 'Kazakhstan' },
    { id: 63, name: 'Uzbekistan' },
    { id: 64, name: 'Azerbaijan' },
    { id: 65, name: 'Georgia' },
    { id: 66, name: 'Armenia' },
    { id: 67, name: 'Jordan' },
    { id: 68, name: 'Lebanon' },
    { id: 69, name: 'Syria' },
    { id: 70, name: 'Yemen' },
    { id: 71, name: 'Oman' },
    { id: 72, name: 'Bahrain' },
    { id: 73, name: 'Malta' },
    { id: 74, name: 'Iceland' },
    { id: 75, name: 'Cyprus' },
    { id: 76, name: 'Malawi' },
    { id: 77, name: 'Zambia' },
    { id: 78, name: 'Zimbabwe' },
    { id: 79, name: 'Kenya' },
    { id: 80, name: 'Tanzania' },
    { id: 81, name: 'Nigeria' },
    { id: 82, name: 'Ghana' },
    { id: 83, name: 'South Sudan' },
    { id: 84, name: 'Uganda' },
    { id: 85, name: 'Rwanda' },
    { id: 86, name: "Côte d'Ivoire" },
    { id: 87, name: 'Senegal' },
    { id: 88, name: 'Togo' },
    { id: 89, name: 'Cameroon' },
    { id: 90, name: 'Morocco' },
    { id: 91, name: 'Algeria' },
    { id: 92, name: 'Tunisia' },
    { id: 93, name: 'Libya' },
    { id: 94, name: 'Angola' },
    { id: 95, name: 'Namibia' },
    { id: 96, name: 'Botswana' },
    { id: 97, name: 'Lesotho' },
    { id: 98, name: 'Eswatini' },
    { id: 99, name: 'Seychelles' },
    { id: 100, name: 'Mauritius' },
  ];

  // private weatherEmojis: { [key: string]: string } = {
  //   Clear: '☀️',
  //   Sunny: '☀️',
  //   'Partly Cloudy': '🌤️',
  //   Overcast: '☁️',
  //   Rain: '🌧️',
  //   Showers: '🌦️',
  //   Drizzle: '🌧️',
  //   Thunderstorm: '⛈️',
  //   Snow: '❄️',
  //   Sleet: '🌨️',
  //   Hail: '🌨️',
  //   Fog: '🌫️',
  //   Windy: '💨',
  //   Cold: '🧊',
  //   Hot: '🌡️',
  // };

  constructor(
    private weatherService: WeatherService,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchWeather();
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.updateTime();
        // Only check if there's a message
        // if (this.alarmMessage) {
        //   alert(this.alarmMessage); // Alert the message
        //   this.alarmMessage = ''; // Reset the message after alerting
        // }
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchWeather(): void {
    this.isLoading = true;
    this.weatherService.getWeather(this.location).subscribe(
      (data) => {
        this.weatherData = data;
        this.initializeTime(data);
        this.isLoading = false;

        const condition = data.current.condition.text;
        // this.weatherEmoji = this.weatherEmojis[condition];
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.errorMessage =
          'Unable to fetch weather data. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  initializeTime(data: any): void {
    const apiDateTime = data.location.localtime;
    const localDateTime = new Date(apiDateTime);
    this.currentTime = localDateTime.toLocaleTimeString();

    this.localTimeOffset = Math.floor(
      (localDateTime.getTime() - Date.now()) / 1000
    );
  }

  updateTime(): void {
    const now = new Date(Date.now() + this.localTimeOffset * 1000);
    this.currentTime = now.toLocaleTimeString();
  }

  openEditModal(content: any): void {
    this.modalService.open(content);
  }

  updateLocation(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newLocation = selectElement.value;
    this.location = newLocation;
    this.fetchWeather();
  }

  // setAlarm(modal: any): void {
  //   if (this.alarmTime) {
  //     const now = new Date();
  //     const [hours, minutes] = this.alarmTime.split(':').map(Number);

  //     // Create a Date object for the alarm time
  //     const alarmDate = new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate(),
  //       hours,
  //       minutes
  //     );

  //     if (alarmDate <= now) {
  //       // If the alarm time is in the past, set it for the next day
  //       alarmDate.setDate(alarmDate.getDate() + 1);
  //     }

  //     const timeUntilAlarm = alarmDate.getTime() - now.getTime();

  //     // Clear any existing timeout to avoid overlapping alarms
  //     if (this.alarmTimeoutId) {
  //       clearTimeout(this.alarmTimeoutId);
  //     }

  //     this.alarmTimeoutId = setTimeout(() => {
  //       this.alarmMessage = '🚨 Alarm! Time to wake up! 🚨';
  //       modal.dismiss(); // Close the modal after setting the alarm
  //     }, timeUntilAlarm);

  //     // Optionally, you can reset the alarm message
  //     this.alarmMessage = '';
  //   } else {
  //     alert('Please set a valid alarm time.');
  //   }
  // }
}
