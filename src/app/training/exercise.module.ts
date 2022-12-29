export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date | String;
  state?: 'completed' | 'cancelled' | null;
}
