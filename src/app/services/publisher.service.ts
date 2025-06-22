import { Injectable } from '@angular/core';
import { Publisher } from '../models/publisher';
import { PublisherDTO } from '../models/publisher-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService extends BaseService<
  Publisher,
  PublisherDTO
> {
  protected apiUrl = 'http://localhost:5107/api/publishers';
}