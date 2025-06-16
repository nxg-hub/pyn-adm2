import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email address is required')
    .email('Please enter a valid email address')
    .max(100, 'Email address is too long')
    .trim('Email cannot have leading or trailing spaces')
});

export default ForgotPasswordSchema;