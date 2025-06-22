import { Injectable } from '@angular/core';
import { Nationality } from '../models/nationality';
import { BaseService } from './base.service';
import { NationalityDTO } from '../models/nationality-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NationalityService extends BaseService<
  Nationality,
  NationalityDTO
> {
  protected apiUrl = 'http://localhost:5107/api/nationalities';
}
