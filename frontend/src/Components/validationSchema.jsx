import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot exceed 20 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password cannot exceed 50 characters'),
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters long'),
  country: Yup.string()
    .required('Country is required'),
  city: Yup.string()
    .required('City is required'),
  state: Yup.string()
    .required('State is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    course_name: Yup.string()
    .required("Course Name is required.")
    .min(3, "Course Name must be at least 3 characters long."),
  description: Yup.string(),

  // For Course

  
  code: Yup.string()
    .required("Course Code is required.")
    .matches(/^[A-Za-z0-9]+$/, "Course Code must be alphanumeric."),
  minimum_attendence: Yup.number()
    .required("Minimum Attendance is required.")
    .min(1, "Minimum Attendance must be at least 1%.")
    .max(100, "Minimum Attendance cannot exceed 100%."),
  attendence_type: Yup.string()
    .required("Attendance Type is required.")
    .notOneOf(["Please Select"], "Please select a valid Attendance Type."),
  total_working_days: Yup.number()
    .required("Total Working Days is required.")
    .min(1, "Total Working Days must be at least 1."),
  syllabus_name: Yup.string()
    .required("Syllabus Name is required.")
    .notOneOf(["Please Select"], "Please select a valid Syllabus Name."),
});

export default validationSchema;



