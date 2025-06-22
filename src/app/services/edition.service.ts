import { Injectable } from '@angular/core';
import { Edition } from '../models/edition';
import { EditionDTO } from '../models/edition-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EditionService extends BaseService<
  Edition,
  EditionDTO
> {
  protected apiUrl = 'http://localhost:5107/api/editions';
}