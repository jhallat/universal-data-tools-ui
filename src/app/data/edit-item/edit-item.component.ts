import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Data, DataError } from '../data';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit, OnDestroy {
  dataForm!: FormGroup;
  tableName!: string | null;
  data!: Data;
  data$!: Subscription;

  get fields(): FormArray {
    return <FormArray>this.dataForm.get('fields');
  }

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      fields: this.formBuilder.array([])
    });


    this.data$ = this.activatedRoute.data.subscribe(data => {
      console.log('activated route for edit item');
      console.log(data);
      const resolvedData = data['resolvedData'];
      if (resolvedData instanceof DataError) {
        console.log(resolvedData.localMessage);
      } else {
        console.log(resolvedData);
        this.data = resolvedData;
        for (let heading of this.data.headings) {
          console.log(heading.name);
          this.fields.push(this.buildField(heading.name,
            this.data.items[0][heading.name],
            heading.type !== 'A'))
        }
      }
    })
  }

  buildField(heading: string, value: string, disabled: boolean): FormGroup {
    return this.formBuilder.group({
      heading: { value: heading, disabled },
      value
    })
  }

  addField(): void {
    this.fields.push(this.buildField("", "", false));
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }
}
