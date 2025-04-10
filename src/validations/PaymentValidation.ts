import * as Yup from "yup";

export const CardDetailsValidation = Yup.object({
  cardDetail: Yup.string().required("card details is required"),
  expiryDate: Yup.string().required("card expiry data is required"),
  cvv: Yup.string().required("card cvv is required"),
});
