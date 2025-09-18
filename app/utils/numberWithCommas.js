export const numberWithCommas = (number) => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(Number(number));
};

// export const numberWithCommas = (number) => {
//   const formattedNumber = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   }).format(number);

//   return formattedNumber.replace(/\.00$/, '');
// };
