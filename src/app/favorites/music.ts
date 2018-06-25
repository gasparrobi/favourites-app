import {Editable} from "./editable";
/**
 * Created by Elitebook on 2018.01.06..
 */
export class Music implements Editable{
  status;
  id?: number;
  year: number;
  title: string;
  fullName?: string;


  constructor() {
  }
}
