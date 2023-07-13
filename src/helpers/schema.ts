import * as yup from 'yup'

const accountSchema = yup.object().shape({
    fullName: yup.string().required('Fullname is required'),
    username: yup.string().required('Username is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().required('Email is required'),
    role: yup.string().required('role is required'),
    status: yup.string().required('status is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    comfirm: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
})

const comfirmSchema = yup.object().shape({
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    comfirm: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
})



export { accountSchema, comfirmSchema }