import * as Yup from 'yup';

export const ScheduleSchema = Yup.object().shape({
    scheduleHour: Yup.array().of(Yup.string()).required('Required!').length(2, 'Two dates!'),
    scheduleDays: Yup.array().of(Yup.string()).required('Required!'),
});
