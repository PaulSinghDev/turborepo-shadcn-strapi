export const validateField = (
  fieldType: "email" | "text",
  value: string | number
) => {
  switch (fieldType) {
    case "email":
      return (
        value.toString().length > 3 &&
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi.test(value.toString())
      );
    default:
      return (
        value.toString().length > 3 &&
        /^[^{}[\]\\<>]+$/gi.test(value.toString())
      );
  }
};
