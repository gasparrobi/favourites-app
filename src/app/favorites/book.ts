import {Editable} from './editable';

export class Book implements Editable {
  id?: number;
  status;
  year: number;
  title: string;
  fullName?: string;
}
