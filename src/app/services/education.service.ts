import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Education } from '../models/education';
import { EducationDTO } from '../models/education-dto';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseService<
  Education,
  EducationDTO
> {
  protected apiUrl = 'http://localhost:5107/api/educations';
}