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
    { id: 1, name: 'Afghanistan' },
    { id: 2, name: 'Albania' },
    { id: 3, name: 'Algeria' },
    { id: 4, name: 'Andorra' },
    { id: 5, name: 'Angola' },
    { id: 6, name: 'Antigua and Barbuda' },
    { id: 7, name: 'Argentina' },
    { id: 8, name: 'Armenia' },
    { id: 9, name: 'Australia' },
    { id: 10, name: 'Austria' },
    { id: 11, name: 'Azerbaijan' },
    { id: 12, name: 'Bahamas' },
    { id: 13, name: 'Bahrain' },
    { id: 14, name: 'Bangladesh' },
    { id: 15, name: 'Barbados' },
    { id: 16, name: 'Belarus' },
    { id: 17, name: 'Belgium' },
    { id: 18, name: 'Belize' },
    { id: 19, name: 'Benin' },
    { id: 20, name: 'Bhutan' },
    { id: 21, name: 'Bolivia' },
    { id: 22, name: 'Bosnia and Herzegovina' },
    { id: 23, name: 'Botswana' },
    { id: 24, name: 'Brazil' },
    { id: 25, name: 'Brunei' },
    { id: 26, name: 'Bulgaria' },
    { id: 27, name: 'Burkina Faso' },
    { id: 28, name: 'Burundi' },
    { id: 29, name: 'Cabo Verde' },
    { id: 30, name: 'Cambodia' },
    { id: 31, name: 'Cameroon' },
    { id: 32, name: 'Canada' },
    { id: 33, name: 'Central African Republic' },
    { id: 34, name: 'Chad' },
    { id: 35, name: 'Chile' },
    { id: 36, name: 'China' },
    { id: 37, name: 'Colombia' },
    { id: 38, name: 'Comoros' },
    { id: 39, name: 'Congo (Congo-Brazzaville)' },
    { id: 40, name: 'Congo (Congo-Kinshasa)' },
    { id: 41, name: 'Costa Rica' },
    { id: 42, name: "Côte d'Ivoire" },
    { id: 43, name: 'Croatia' },
    { id: 44, name: 'Cuba' },
    { id: 45, name: 'Cyprus' },
    { id: 46, name: 'Czech Republic' },
    { id: 47, name: 'Denmark' },
    { id: 48, name: 'Djibouti' },
    { id: 49, name: 'Dominica' },
    { id: 50, name: 'Dominican Republic' },
    { id: 51, name: 'Ecuador' },
    { id: 52, name: 'Egypt' },
    { id: 53, name: 'El Salvador' },
    { id: 54, name: 'Equatorial Guinea' },
    { id: 55, name: 'Eritrea' },
    { id: 56, name: 'Estonia' },
    { id: 57, name: 'Eswatini' },
    { id: 58, name: 'Ethiopia' },
    { id: 59, name: 'Fiji' },
    { id: 60, name: 'Finland' },
    { id: 61, name: 'France' },
    { id: 62, name: 'Gabon' },
    { id: 63, name: 'Gambia' },
    { id: 64, name: 'Georgia' },
    { id: 65, name: 'Germany' },
    { id: 66, name: 'Ghana' },
    { id: 67, name: 'Greece' },
    { id: 68, name: 'Grenada' },
    { id: 69, name: 'Guatemala' },
    { id: 70, name: 'Guinea' },
    { id: 71, name: 'Guinea-Bissau' },
    { id: 72, name: 'Guyana' },
    { id: 73, name: 'Haiti' },
    { id: 74, name: 'Honduras' },
    { id: 75, name: 'Hungary' },
    { id: 76, name: 'Iceland' },
    { id: 77, name: 'India' },
    { id: 78, name: 'Indonesia' },
    { id: 79, name: 'Iran' },
    { id: 80, name: 'Iraq' },
    { id: 81, name: 'Ireland' },
    { id: 82, name: 'Israel' },
    { id: 83, name: 'Italy' },
    { id: 84, name: 'Jamaica' },
    { id: 85, name: 'Japan' },
    { id: 86, name: 'Jordan' },
    { id: 87, name: 'Kazakhstan' },
    { id: 88, name: 'Kenya' },
    { id: 89, name: 'Kiribati' },
    { id: 90, name: 'Kuwait' },
    { id: 91, name: 'Kyrgyzstan' },
    { id: 92, name: 'Laos' },
    { id: 93, name: 'Latvia' },
    { id: 94, name: 'Lebanon' },
    { id: 95, name: 'Lesotho' },
    { id: 96, name: 'Liberia' },
    { id: 97, name: 'Libya' },
    { id: 98, name: 'Liechtenstein' },
    { id: 99, name: 'Lithuania' },
    { id: 100, name: 'Luxembourg' },
    { id: 101, name: 'Madagascar' },
    { id: 102, name: 'Malawi' },
    { id: 103, name: 'Malaysia' },
    { id: 104, name: 'Maldives' },
    { id: 105, name: 'Mali' },
    { id: 106, name: 'Malta' },
    { id: 107, name: 'Marshall Islands' },
    { id: 108, name: 'Mauritania' },
    { id: 109, name: 'Mauritius' },
    { id: 110, name: 'Mexico' },
    { id: 111, name: 'Micronesia' },
    { id: 112, name: 'Moldova' },
    { id: 113, name: 'Monaco' },
    { id: 114, name: 'Mongolia' },
    { id: 115, name: 'Montenegro' },
    { id: 116, name: 'Morocco' },
    { id: 117, name: 'Mozambique' },
    { id: 118, name: 'Myanmar' },
    { id: 119, name: 'Namibia' },
    { id: 120, name: 'Nauru' },
    { id: 121, name: 'Nepal' },
    { id: 122, name: 'Netherlands' },
    { id: 123, name: 'New Zealand' },
    { id: 124, name: 'Nicaragua' },
    { id: 125, name: 'Niger' },
    { id: 126, name: 'Nigeria' },
    { id: 127, name: 'North Korea' },
    { id: 128, name: 'North Macedonia' },
    { id: 129, name: 'Norway' },
    { id: 130, name: 'Oman' },
    { id: 131, name: 'Pakistan' },
    { id: 132, name: 'Palau' },
    { id: 133, name: 'Panama' },
    { id: 134, name: 'Papua New Guinea' },
    { id: 135, name: 'Paraguay' },
    { id: 136, name: 'Peru' },
    { id: 137, name: 'Philippines' },
    { id: 138, name: 'Poland' },
    { id: 139, name: 'Portugal' },
    { id: 140, name: 'Qatar' },
    { id: 141, name: 'Romania' },
    { id: 142, name: 'Russia' },
    { id: 143, name: 'Rwanda' },
    { id: 144, name: 'Saint Kitts and Nevis' },
    { id: 145, name: 'Saint Lucia' },
    { id: 146, name: 'Saint Vincent and the Grenadines' },
    { id: 147, name: 'Samoa' },
    { id: 148, name: 'San Marino' },
    { id: 149, name: 'Sao Tome and Principe' },
    { id: 150, name: 'Saudi Arabia' },
    { id: 151, name: 'Senegal' },
    { id: 152, name: 'Serbia' },
    { id: 153, name: 'Seychelles' },
    { id: 154, name: 'Sierra Leone' },
    { id: 155, name: 'Singapore' },
    { id: 156, name: 'Slovakia' },
    { id: 157, name: 'Slovenia' },
    { id: 158, name: 'Solomon Islands' },
    { id: 159, name: 'Somalia' },
    { id: 160, name: 'South Africa' },
    { id: 161, name: 'South Korea' },
    { id: 162, name: 'South Sudan' },
    { id: 163, name: 'Spain' },
    { id: 164, name: 'Sri Lanka' },
    { id: 165, name: 'Sudan' },
    { id: 166, name: 'Suriname' },
    { id: 167, name: 'Sweden' },
    { id: 168, name: 'Switzerland' },
    { id: 169, name: 'Syria' },
    { id: 170, name: 'Taiwan' },
    { id: 171, name: 'Tajikistan' },
    { id: 172, name: 'Tanzania' },
    { id: 173, name: 'Thailand' },
    { id: 174, name: 'Timor-Leste' },
    { id: 175, name: 'Togo' },
    { id: 176, name: 'Tonga' },
    { id: 177, name: 'Trinidad and Tobago' },
    { id: 178, name: 'Tunisia' },
    { id: 179, name: 'Turkey' },
    { id: 180, name: 'Turkmenistan' },
    { id: 181, name: 'Tuvalu' },
    { id: 182, name: 'Uganda' },
    { id: 183, name: 'Ukraine' },
    { id: 184, name: 'United Arab Emirates' },
    { id: 185, name: 'United Kingdom' },
    { id: 186, name: 'United States' },
    { id: 187, name: 'Uruguay' },
    { id: 188, name: 'Uzbekistan' },
    { id: 189, name: 'Vanuatu' },
    { id: 190, name: 'Vatican City' },
    { id: 191, name: 'Venezuela' },
    { id: 192, name: 'Vietnam' },
    { id: 193, name: 'Yemen' },
    { id: 194, name: 'Zambia' },
    { id: 195, name: 'Zimbabwe' },
    { id: 196, name: 'Greenland' },
    { id: 197, name: 'Puerto Rico' },
    { id: 198, name: 'Guam' },
    { id: 199, name: 'Hong Kong' },
    { id: 200, name: 'Macau' },
    { id: 201, name: 'Western Sahara' },
    { id: 202, name: 'Palestinian Territories' },
    { id: 203, name: 'Falkland Islands' },
    { id: 204, name: 'Saint Pierre and Miquelon' },
    { id: 205, name: 'Montserrat' },
    { id: 206, name: 'Bermuda' },
    { id: 207, name: 'British Virgin Islands' },
    { id: 208, name: 'Cayman Islands' },
    { id: 209, name: 'Anguilla' },
    { id: 210, name: 'Gibraltar' },
    { id: 211, name: 'Isle of Man' },
    { id: 212, name: 'Jersey' },
    { id: 213, name: 'Guernsey' },
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
    this.loadLocationFromLocalStorage();
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
    this.saveLocationToLocalStorage();
  }

  private saveLocationToLocalStorage(): void {
    localStorage.setItem('location', this.location);
  }

  private loadLocationFromLocalStorage(): void {
    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
      this.location = savedLocation;
    }
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
