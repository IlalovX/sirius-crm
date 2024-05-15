export interface getCourseDetailType {
  success: boolean;
  statusCode: number;
  data: {
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
  message: string;
}
