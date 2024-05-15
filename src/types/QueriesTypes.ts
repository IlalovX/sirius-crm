export interface getStaffDataType {
  created_at: string;
  direction: string;
  first_name: string;
  id: string;
  is_deleted: boolean;
  last_name: string;
  phone_number: string;
  role: string;
  tg_username: null;
}

export interface getStaffsType {
  success: boolean;
  statusCode: number;
  data: {
    total: number;
    data: getStaffDataType[];
    limit: number;
    offset: number;
  };
  message: string;
}

export interface getStudentsDataType {
  id: string;
  first_name: string;
  last_name: string;
  group_id: string;
  phone_number: string;
  tg_username: null;
  balance: number;
  status: string;
  comment: string;
  is_deleted: boolean;
  created_at: string;
  group: {
    id: string;
    teacher_id: string;
    group_id: number;
    title: string;
    description: string;
    duration: string;
    lesson_days: string;
    lesson_time: string;
    lesson_duration: string;
    price: number;
    status: string;
    is_deleted: boolean;
    created_at: string;
  };
}

export interface getStudentsType {
  success: boolean;
  statusCode: number;
  data: {
    total: number;
    data: getStudentsDataType[];
    limit: number;
    offset: number;
  };
  message: string;
}

export interface getCourseDataType {
  id: string;
  teacher_id: string;
  group_id: number;
  title: string;
  description: string;
  duration: string;
  lesson_days: string;
  lesson_time: string;
  lesson_duration: string;
  price: number;
  status: string;
  is_deleted: boolean;
  created_at: string;
}

export interface getCoursesType {
  success: boolean;
  statusCode: number;
  data: {
    total: number;
    data: getCourseDataType[];
    limit: number;
    offset: number;
  };
  message: string;
}
