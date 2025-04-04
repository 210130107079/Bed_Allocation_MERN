# Backend API Documentation

This document provides detailed information about all the API endpoints available in the backend of the **Bed Allocation System**.

## Base URL

The base URL for all API endpoints is:

```
http://localhost:5000/api
```

---

## Endpoints

### 1. Bed Management

#### **GET** `/beds/available`

- **Description**: Fetches all available beds in each room.
- **Response**:
  ```json
  [
    {
      "roomNumber": 101,
      "beds": [1, 2, 3, 4, 5]
    },
    {
      "roomNumber": 102,
      "beds": [1, 2, 3]
    }
  ]
  ```
- **Controller**: [`getAllAvailableBeds`](controller/bedController.js)

---

### 2. Patient Management

#### **GET** `/patients/admitted`

- **Description**: Fetches a list of all admitted patients.
- **Response**:
  ```json
  [
    {
      "_id": "patientId",
      "name": "John Doe",
      "age": 30,
      "roomNumber": 101,
      "bedNumber": 1,
      "doctorName": "Dr. Smith",
      "admissionDate": "2023-10-01T00:00:00.000Z",
      "dischargeDate": null
    }
  ]
  ```
- **Controller**: [`getAdmittedPatients`](controller/patientController.js)

#### **GET** `/patients/discharged`

- **Description**: Fetches a paginated list of all discharged patients.
- **Query Parameters**:
  - `page` (optional): Page number for pagination.
- **Response**:
  ```json
  {
    "docs": [
      {
        "_id": "patientId",
        "name": "Jane Doe",
        "age": 40,
        "roomNumber": 102,
        "bedNumber": 2,
        "doctorName": "Dr. Smith",
        "admissionDate": "2023-09-01T00:00:00.000Z",
        "dischargeDate": "2023-09-10T00:00:00.000Z"
      }
    ],
    "totalPages": 1,
    "page": 1
  }
  ```
- **Controller**: [`getDischargedPatients`](controller/patientController.js)

#### **GET** `/patients/all`

- **Description**: Fetches a list of all patients (admitted and discharged).
- **Response**:
  ```json
  [
    {
      "_id": "patientId",
      "name": "John Doe",
      "age": 30,
      "roomNumber": 101,
      "bedNumber": 1,
      "doctorName": "Dr. Smith",
      "admissionDate": "2023-10-01T00:00:00.000Z",
      "dischargeDate": null
    }
  ]
  ```
- **Controller**: [`getAllPatients`](controller/patientController.js)

#### **POST** `/patients/admit`

- **Description**: Admits a new patient to a specific room and bed.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "roomNumber": 101,
    "bedNumber": 1,
    "totalDays": 5,
    "doctorName": "Dr. Smith"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "patientId",
    "name": "John Doe",
    "age": 30,
    "roomNumber": 101,
    "bedNumber": 1,
    "doctorName": "Dr. Smith",
    "admissionDate": "2023-10-01T00:00:00.000Z",
    "dischargeDate": null
  }
  ```
- **Controller**: [`admitPatient`](controller/patientController.js)

#### **PUT** `/patients/:id/discharge`

- **Description**: Discharges a patient and frees up the bed.
- **Path Parameters**:
  - `id`: The ID of the patient to discharge.
- **Response**:
  ```json
  {
    "_id": "patientId",
    "name": "John Doe",
    "age": 30,
    "roomNumber": 101,
    "bedNumber": 1,
    "doctorName": "Dr. Smith",
    "admissionDate": "2023-10-01T00:00:00.000Z",
    "dischargeDate": "2023-10-06T00:00:00.000Z"
  }
  ```
- **Controller**: [`dischargePatient`](controller/patientController.js)

---

### 3. Doctor Management

#### **GET** `/doctor/get-doctors`

- **Description**: Fetches a list of all doctors.
- **Response**:
  ```json
  [
    {
      "_id": "doctorId",
      "name": "Dr. Smith",
      "age": 45,
      "degree": "MBBS",
      "profileImage": "https://cloudinary.com/image.jpg"
    }
  ]
  ```
- **Controller**: [`getAllDoctor`](controller/docController.js)

#### **POST** `/doctor/add`

- **Description**: Adds a new doctor.
- **Request Body** (Form Data):
  - `name`: Doctor's name.
  - `age`: Doctor's age.
  - `degree`: Doctor's degree.
  - `profileImage`: Doctor's profile image (file upload).
- **Response**:
  ```json
  {
    "newDoctor": {
      "_id": "doctorId",
      "name": "Dr. Smith",
      "age": 45,
      "degree": "MBBS",
      "profileImage": "https://cloudinary.com/image.jpg"
    },
    "message": "Doctor Added Successfully!"
  }
  ```
- **Controller**: [`addNewDoctor`](controller/docController.js)

#### **POST** `/doctor/:id/update-p-pic`

- **Description**: Updates the profile picture of a doctor.
- **Path Parameters**:
  - `id`: The ID of the doctor.
- **Request Body** (Form Data):
  - `profileImage`: New profile image (file upload).
- **Response**:
  ```json
  {
    "updatedDoctor": {
      "_id": "doctorId",
      "name": "Dr. Smith",
      "age": 45,
      "degree": "MBBS",
      "profileImage": "https://cloudinary.com/new-image.jpg"
    },
    "message": "Profile Pic Updated Successfully!"
  }
  ```
- **Controller**: [`updateProfilePic`](controller/docController.js)

---

## Notes

- All endpoints return appropriate HTTP status codes for success and error scenarios.
- Ensure that the backend server is running on `http://localhost:5000` before making API requests.
- For file uploads, use `multipart/form-data` as the content type.

---