export const hours = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
];

export const days = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"
];

export const getAllChildrenElements = (refDiv: React.RefObject<HTMLDivElement>): HTMLElement[] => {

  const allRowsInSchedule = Array.from(refDiv.current?.children as HTMLCollection);
  const outputArr: HTMLElement[] | null = [];

  allRowsInSchedule.forEach(row =>{
    const {children} = row;

    for (let i = 0; i < children.length; i++) {
      outputArr.push(children[i] as HTMLElement);
    };
  });

  return outputArr;
}

export const converterShortenedDayToExtended = (day: string): string => {
  
  let extendedDay: string = '';
  
  switch (day) {

    case 'mon':
      extendedDay = 'Monday'
      break;
    case 'tue':
      extendedDay = 'Tuesday'
      break;
    case 'wed':
      extendedDay = 'Wednesday'
      break;
    case 'thu':
      extendedDay = 'Thursday'
      break;
    case 'fri':
      extendedDay = 'Friday'
      break;
    case 'sat':
      extendedDay = 'Saturday'
      break;
    case 'sun':
      extendedDay = 'Sunday'
      break;
  };

  return extendedDay;
};

export const capitalizedFirstLetter = (text: string): string => {
  return text[0]?.toUpperCase() + text?.slice(1).toLowerCase();
}

export const validateConditions = {
  firstName: /^[A-z]{2,13}$/,
  lastName: /^[A-z]{2,13}$/,
  phoneNumber: /^[A-z0-9]{2,13}$/, // only for development
  password: /^.{2,13}$/, // only for development
  email: /\S+@\S+\.\S+/,
  role: 'admin' || 'user' || 'trainer' || 'member'
};