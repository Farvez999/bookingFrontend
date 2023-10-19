// const calculateNumberOfDays = () => {
//     if (checkInDate && checkOutDate) {
//       const checkIn = new Date(checkInDate);
//       const checkOut = new Date(checkOutDate);
//       const timeDifference = checkOut.getTime() - checkIn.getTime();
//       const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
//       return numberOfDays;
//     }
//     return 0; // Return 0 if dates are not set
//   };

//   // Calculate the total fee
//   const calculateTotalFee = () => {
//     const numberOfDays = calculateNumberOfDays();
//     if (numberOfDays > 0) {
//       const totalFee = (pricing - discount) * numberOfDays;
//       return totalFee;
//     }
//     return 0; // Return 0 if check-in and check-out dates are not selected
//   };

//   // Use this calculated total fee in your component
//   const totalFee = calculateTotalFee();
