# Bed Allocation System

The **Bed Allocation System** is a full-stack web application designed to streamline hospital bed allocation and management. It provides features for managing patients, doctors, and room availability, ensuring efficient operations in a healthcare facility.

---

## Features

### Backend
- **Patient Management**:
  - Admit new patients.
  - Discharge patients.
  - Fetch lists of admitted, discharged, and all patients.
- **Doctor Management**:
  - Add new doctors.
  - Update doctor profile pictures.
  - Fetch a list of all doctors.
- **Bed Management**:
  - Fetch available beds by room.
  - Automatically allocate and free beds during patient admission and discharge.
- **Database**:
  - MongoDB is used to store data for patients, doctors, and rooms.

### Frontend
- **Dashboard**:
  - Displays an overview of available beds, admitted patients, and discharged patients.
- **Patient Management**:
  - Admit new patients with room and bed selection.
  - View lists of admitted, discharged, and all patients.
- **Doctor Management**:
  - Add new doctors.
  - View a list of all doctors.
- **Responsive Design**:
  - Built with Tailwind CSS for a modern and responsive UI.
- **Data Visualization**:
  - Uses DataTables for interactive patient lists.

---

## Tech Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Dependencies**:
  - `express`, `mongoose`, `cors`, `cloudinary`, `multer`, `mongoose-paginate-v2`

### Frontend
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios
- **Dependencies**:
  - `react-router-dom`, `datatables.net`, `lucide-react`

---

## Folder Structure

### Backend
Located in the `backend` folder:
- **`models/`**: Contains Mongoose schemas for `Patient`, `Doctor`, and `Room`.
- **`routes/`**: Defines API routes for patients, doctors, and beds.
- **`controller/`**: Contains logic for handling API requests.
- **`middlewares/`**: Middleware for file uploads using Multer.
- **`config/`**: Configuration for Cloudinary.
- **`index.js`**: Entry point for the backend server.

### Frontend
Located in the `frontend` folder:
- **`src/pages/`**: Contains React components for different pages (e.g., Dashboard, Admit Patient, etc.).
- **`src/redux/`**: Redux slices for managing state.
- **`src/components/`**: Reusable UI components (e.g., Navbar, HorizontalCard).
- **`src/hooks/`**: Custom hooks for API calls.
- **`src/app/`**: Redux store configuration.
- **`public/`**: Static assets like images.

---

## How to Run

### Prerequisites
- Node.js and npm installed.
- MongoDB database connection string.

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. The backend will run on `http://localhost:5000`.

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will run on `http://localhost:5173`.

---

## API Documentation

For detailed information about the backend API endpoints, refer to the [Backend API Documentation](./backend/readme.md).

---

## Screenshots

### Dashboard
Displays an overview of available beds, admitted patients, and discharged patients.

### Admit Patient
Form to admit a new patient with room and bed selection.

### Doctor Management
Add new doctors and view the list of existing doctors.

---

## Future Enhancements
- Add authentication and role-based access control.
- Implement advanced analytics for patient and bed usage trends.
- Add notifications for bed availability and patient discharge.

---

## License
This project is licensed under the MIT License.