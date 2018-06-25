import {Editable} from "./editable";
/**
 * Created by Elitebook on 2018.01.06..
 */
export class Film implements Editable {
  id?: number;
  status;
  year: number;
  director?: string;
  title: string;
  fullName?: string;

  constructor() {
  }
}
