import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-entity-list',
  imports: [],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.css'
})
export class EntityListComponent<T> {
  @Input() item!: T;
}
