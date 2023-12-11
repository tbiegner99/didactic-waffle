const BASE_URL = '/app';
export const urls = {
    BASE_URL,
    coach: (coachId: string, tab?: string) => `${BASE_URL}/coach/${coachId}/${tab}`,
    student: (studentId: string, tab?: string, coach?: string) =>
        `${BASE_URL}/student/${studentId}${tab ? `/${tab}${coach ? `/${coach}` : ''}` : ''}`
};
