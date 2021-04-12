import * as Yup from 'yup';

export const PlateSchema = Yup.object().shape({
    title: Yup.string().required('Required!').max(50, 'Too long!'),
    description: Yup.string().required('Required!').max(400, 'Too long!'),
    ingredients: Yup.array().of(Yup.string()).required('Required!').min(1, 'At least one ingredient!'),
    price: Yup.string().matches(/^\d+$/, 'Only digits!').required('Required!'),
    preparationTime: Yup.array().of(Yup.string()).min(2, 'Two dates!').required('Required!'),
    image: Yup.string().required('Required!'),
});
