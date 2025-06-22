import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Directive, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Directive() 
export abstract class AbstractEditComponent<T, TDTO> implements OnInit {
  form: FormGroup;
  item: T | null = null;

  protected fb = inject(FormBuilder);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

  protected abstract entityName: string;
  protected abstract getService(): {
  delete(id: number): Observable<any>;
  update(id: number, dto: any): Observable<any>;
  getById(id: number): Observable<any>;
};
  
  protected abstract buildForm(): FormGroup;
  protected patchForm(data: T): void{
    this.item = data;
    this.form.patchValue(data as { [key: string]: any });
  }

  protected redirectAfterSave(): void {
    this.router.navigate([`/${this.entityName.toLowerCase()}s`]);
  }

  constructor() {
    this.form = this.buildForm();
  }
  protected onInitExtras(): void {}
  protected load(id: number): void {
    this.getService().getById(id).subscribe({
      next: (entity) => {
        this.patchForm(entity)
      },
      error: (entity) => alert(`Error loading ${this.entityName}`),
    });
  }
  protected remove(id: number): void {
    this.getService().delete(id).subscribe({
      next: () => {
        alert(`${this.entityName} deleted successfully!`);
        this.redirectAfterSave();
      },
      error: () => alert(`Failed to delete ${this.entityName}.`),
    });
  }
  protected update(id: number, dto: TDTO): void {
  this.getService().update(id, dto).subscribe({
    next: () => {
      alert(`${this.entityName} updated successfully!`);
      this.redirectAfterSave();
    },
    error: () => alert(`Failed to update ${this.entityName}.`),
  });
}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
    this.onInitExtras()
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const updatedDTO: TDTO = {
          ...this.item,
          ...this.form.value
        };
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.update(id, updatedDTO);
  }

  onDelete() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.remove(id);
  }
}
