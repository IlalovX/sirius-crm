export interface useStaffData {
  role: string;
  firstName: string;
  lastName: string;
  direction: string;
  tg_username: string;
  phone: string;
}

export interface useGroupData {
  teacher_id: string;
  title: string;
  teacher_name: string;
  duration: string;
  lesson_duration: string;
  lesson_days: string;
  price: number;
  status: string;
  lesson_time: string;
  description: string;
}

export interface useStudentData {
  first_name: string;
  last_name: string;
  status: string;
  comment: string;
  phone_number: string;
  group_id?: string;
}
