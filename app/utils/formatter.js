export const getQueryString = (params) => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null,
      ),
    ),
  ).toString();
};
