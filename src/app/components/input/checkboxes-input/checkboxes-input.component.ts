import { Component, ContentChildren, ElementRef, Input, AfterContentInit, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkboxes-input',
  templateUrl: './checkboxes-input.component.html',
  styleUrls: ['../input.component.css']
})
export class CheckboxesInputComponent implements AfterContentInit {
  @Input() props!: {
    control: FormControl,
    id: string,
    name: string,
    label: string,
    placeholder?: string,
    search?: boolean,
    value?: string,
    onChange?: Function,
  };

  @ContentChildren('option') optionsList!: QueryList<ElementRef<HTMLOptionElement>>;

  options!: HTMLOptionElement[];

  classList: string[] = ['form-control'];

  selected!: string;
  title!: string;
  message?: string;

  constructor() { }

  ngAfterContentInit(): void {
    this.options = this.optionsList.map(ref => ref.nativeElement);

    if (!this.props.control.value) {
      const enabled: HTMLOptionElement[] = this.options.filter(option => !option.disabled);
      const [first] = enabled;
  
      this.props.control.patchValue(first.value, { emitEvent: false });
    }

    this.props.control.statusChanges.subscribe(status => {
      this.classList = ['form-control', status.toLocaleLowerCase()];

      const {errors} = this.props.control;
      
      this.message = errors ? errors['message'] : 'Valor inválido!';
    });
  }

  check(option: HTMLOptionElement): void {
    const {value} = this.props.control;
    const index = value.findIndex((value: string) => value === option.value);
    
    if (index > -1) {
      value.splice(index, 1);
    } else {
      value.push(option.value);
    }

    this.props.onChange?.call(this.props.onChange, value);

    this.props.control.setValue(value);
  }
}
