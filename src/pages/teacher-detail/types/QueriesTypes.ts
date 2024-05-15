export interface getStaffDetailTypes {
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    first_name: string;
    last_name: string;
    direction: string;
    phone_number: string;
    tg_username: null;
    role: string;
    is_deleted: boolean;
    created_at: string;
    groups: [
      {
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
    ];
  };
  message: string;
}
