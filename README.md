# Breezetime

Breezetime is a dynamic Angular-based application that displays both time and weather information for multiple global locations. With real-time weather updates and local times for each selected location, users can easily stay informed about weather conditions and time zones across the world.

## Features

- **Real-time Clocks**: Displays the current time for multiple global locations.
- **Weather Integration**: Retrieves weather data for selected cities using a weather API.
- **Multiple Location Support**: Add, edit, and remove locations as needed.
- **Local Storage**: Saves user preferences (locations) for seamless use across sessions.
- **Responsive Design**: A user-friendly interface compatible with various screen sizes.
  
## Technologies Used

- **Angular**: Developed using Angular CLI version 18.2.8.
- **Bootstrap**: For responsive and visually appealing styling.
- **Weather API**: Integrated with a weather service to fetch real-time weather data.

## Installation

Follow these steps to get **Breezetime** up and running locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/breezetime.git
   ```

2. Navigate to the project directory:

   ```bash
   cd breezetime
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Development Server

Run the development server:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you make any changes to the source files.

## Build

To build the project, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Code Scaffolding

You can generate new components, directives, pipes, and more with Angular CLI:

```bash
ng generate component component-name
```

For other Angular CLI commands, refer to the [Angular CLI Command Reference](https://angular.io/cli).

## Running Tests

### Unit Tests

Run unit tests using Karma:

```bash
ng test
```

### End-to-End Tests

To run end-to-end tests using a testing platform like Protractor, first install the necessary package:

```bash
npm install protractor
```

Then run the tests:

```bash
ng e2e
```

## Weather Service

The app uses a weather service to fetch real-time weather data for selected locations. You can customize the weather service as per your API of choice.

## Adding and Managing Locations

- **Add a New Location**: Click the add button to open a modal window and select a new location from the list.
- **Edit Locations**: Open the edit modal for any location and change it to your preferred city.
- **Delete Locations**: You can remove any location card by clicking the delete button.

## Further Help

For more details on using Angular CLI, visit the [Angular CLI Documentation](https://angular.io/cli).
