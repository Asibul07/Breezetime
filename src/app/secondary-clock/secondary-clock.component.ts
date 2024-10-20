import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeatherService } from '../services/weather.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

interface ClockCard {
  location: string;
  weatherData: any;
  currentTime: string;
  localTimeOffset: number;
}

@Component({
  selector: 'app-secondary-clock',
  templateUrl: './secondary-clock.component.html',
  styleUrls: ['./secondary-clock.component.css'],
})
export class SecondaryClockComponent implements OnInit, OnDestroy {
  public clockCards: ClockCard[] = [
    {
      location: 'Dhaka',
      weatherData: null,
      currentTime: '',
      localTimeOffset: 0,
    },
    {
      location: 'London',
      weatherData: null,
      currentTime: '',
      localTimeOffset: 0,
    },
    {
      location: 'Tokyo',
      weatherData: null,
      currentTime: '',
      localTimeOffset: 0,
    },
    {
      location: 'India',
      weatherData: null,
      currentTime: '',
      localTimeOffset: 0,
    },
  ];

  public selectedCard: ClockCard; // Property for the selected card
  private intervalId: any; // Store the interval ID for cleanup

  // Define a list of locations
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

  constructor(
    private weatherService: WeatherService,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchWeatherForAllCards();

    // Only run setInterval in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.updateAllTimes(); // Update time for all cards
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    // Cleanup the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchWeatherForAllCards(): void {
    this.clockCards.forEach((card) => {
      this.fetchWeather(card);
    });
  }

  fetchWeather(card: ClockCard): void {
    this.weatherService.getWeather(card.location).subscribe(
      (data) => {
        card.weatherData = data;
        this.initializeTime(card); // Initialize time with API data
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        card.weatherData = null; // Handle error
      }
    );
  }

  initializeTime(card: ClockCard): void {
    const apiDateTime = card.weatherData?.location?.localtime; // Get the localtime from the API response
    if (apiDateTime) {
      const localDateTime = new Date(apiDateTime); // Create a Date object from the API time
      card.currentTime = localDateTime.toLocaleTimeString(); // Set the current time

      // Set the local time offset for real-time updates
      card.localTimeOffset = Math.floor(
        (localDateTime.getTime() - Date.now()) / 1000
      );
    }
  }

  updateAllTimes(): void {
    this.clockCards.forEach((card) => {
      const now = new Date(Date.now() + card.localTimeOffset * 1000); // Adjust the current time by the offset
      card.currentTime = now.toLocaleTimeString(); // Update the current time
    });
  }

  openEditModal(content: any, card: ClockCard): void {
    this.selectedCard = { ...card }; // Create a copy of the card
    this.modalService.open(content).result.then((result) => {
      if (result === 'save') {
        this.updateLocation(card); // Update location if saved
      }
    });
  }

  updateLocation(card: ClockCard): void {
    if (this.isLocationInUse(this.selectedCard.location)) {
      alert(
        'This location is already in use. Please select a different location.'
      ); // Alert user
      return;
    }

    card.location = this.selectedCard.location; // Update location
    this.fetchWeather(card); // Fetch updated weather data
  }

  isLocationInUse(location: string): boolean {
    return this.clockCards.some(
      (card) => card.location.toLowerCase() === location.toLowerCase()
    );
  }

  // deleteCard(index: number): void {
  //   this.clockCards.splice(index, 1); // Remove the card from the array
  // }

  addCard(content: any): void {
    const newCard: ClockCard = {
      location: '', // Default or initial location
      weatherData: null, // Placeholder for weather data
      currentTime: '', // Current time placeholder
      localTimeOffset: 0, // Local time offset, if needed
    };

    this.clockCards.push(newCard); // Add the new card
    this.openEditModal(content, newCard); // Open modal for editing the new card
  }

  deleteCard(index: number): void {
    if (index > -1 && index < this.clockCards.length) {
      this.clockCards.splice(index, 1); // Remove card at specified index
    }
  }
  // }
}
