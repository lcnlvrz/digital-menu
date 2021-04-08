import * as Yup from 'yup';

export const RestaurantSchema = Yup.object().shape({
    name: Yup.string().required('Required!'),
    description: Yup.string().min(100, 'Too short!').max(1000, 'Too long!').required('Required!'),
    location: Yup.string().required('Required!'),
    cellphone: Yup.string()
        .required('Required!')
        .matches(
            /^((?:\(?\d{3}\)?[- .]?\d{4}|\(?\d{4}\)?[- .]?\d{3}|\(?\d{5}\)?[- .]?\d{2})[- .]?\d{4})$/,
            'Invalid cellphone number!',
        ),
    scheduleHour: Yup.array().of(Yup.string()).required('Required!').length(2, 'Two dates!'),
    scheduleDays: Yup.array().of(Yup.string()).required('Required!'),
    isDelivery: Yup.boolean(),
});
