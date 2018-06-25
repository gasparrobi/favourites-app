import {Editable} from "./editable";
/**
 * Created by Elitebook on 2018.01.06..
 */
export class Movie implements Editable {
  id?: number;
  status;
  year: number;
  director?: string;
  title: string;
  fullName?: string;

  constructor(id: number = null,
              title: string = null,
              year: number = null,
              fullName: string = null,
              status: string = null) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.fullName = fullName;
    this.status = status;
  }
}
