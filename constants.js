export const BASE_URL = "http://localhost:3333";
export const VALIDATION = {
   name: {
              required: "Name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
              maxLength: { value: 15, message: "Maximum 15 characters" },
            },
   phoneNumber : {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,13}$/,
                message: "Phone must contain only digits (10–13 characters)",
              },
            },
            email: {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }

}