# Car Library

## Overview

The **Car Library** is a web application built with React and TypeScript that allows users to browse, filter, sort, and manage a collection of cars. Users can view car details, filter cars by type and specifications, sort them by creation date, and add or delete cars. The application features a modern UI styled with CSS Modules.

### Technologies Used
- **React**: Frontend library for building user interfaces.
- **TypeScript**: For type-safe JavaScript development.
- **CSS Modules**: For modular and scoped CSS styling.
- **Axios**: For making API requests.
- **React Scripts**: For project setup and build tools (Create React App).

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 16 or higher.
- **npm**: Version 7 or higher (comes with Node.js).

You can verify the installations by running:
```bash
node --version
npm --version
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/car-library.git
   cd car-library
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

   This will install all necessary dependencies listed in `package.json`, including React, TypeScript, Axios, and more.

3. **Run the Development Server**:
   ```bash
   npm run start
   ```

   The application will start on `http://localhost:3000` by default. Open this URL in your browser to view the app.

4. **Build for Production**:
   To create an optimized production build, run:
   ```bash
   npm run build
   ```

   The build output will be in the `build/` directory, ready for deployment.

## Project Structure

Here's an overview of the project's main directories and files:

- **`src/`**: Source code directory.
  - **`src/App.tsx`**: Main application component.
  - **`src/components/`**: Reusable React components (e.g., `CarCard`, `FilterModal`, `CreateCarModal`) with their respective `.module.css` files.
  - **`src/api/`**: API functions for fetching and managing car data (e.g., `carsApi.ts`).
  - **`src/types/`**: TypeScript type definitions (e.g., `Car` type).
  - **`src/assets/`**: Static assets like images and SVGs.
- **`public/`**: Public assets and `index.html`.
- **`package.json`**: Project dependencies and scripts.
- **`tsconfig.json`**: TypeScript configuration.
- **`README.md`**: Project documentation (this file).

## Usage

### Features
- **Browse Cars**: View a grid of car cards with details like name, description, type, and specifications.
- **Filter Cars**:
  - Click the "Filter" button to open the filter modal.
  - Select a car type (e.g., Manual, Automatic) and specifications (e.g., Engine, Fuel Type).
  - Click "Apply" to filter the car list. A "Reset" button appears when filters are applied, allowing you to clear them.
- **Sort Cars**:
  - Toggle between "Latest" (newest first) and "Oldest" (oldest first) using the sort button.
- **Search Cars**:
  - Use the search bar to find cars by name.
- **Add a Car**:
  - Click the "Add New Car" button to open the create modal.
  - Fill in the form (image URL, name, description, car type, specifications) and submit.
- **Delete a Car**:
  - Click the delete button on a car card to open the delete confirmation modal.
  - Confirm to remove the car from the list.
- **View Car Details**:
  - Click a car card to view its full details in a modal.

### Example Workflow
1. Open the app at `http://localhost:3000`.
2. Use the search bar to find a specific car (e.g., type "Tesla").
3. Click the "Filter" button, select "Automatic" and "Fuel Type: Petrol", then click "Apply".
4. Toggle the sort button to "Oldest" to see older cars first.
5. Click "Add New Car" to add a new car to the library.
6. Delete a car by clicking the trash icon on its card and confirming.


