import { Component, ContentChildren, ElementRef, Input, AfterContentInit, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['../input.component.css']
})
export class RadioInputComponent implements AfterContentInit {
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

  change(option: HTMLOptionElement): void {
    this.props.onChange?.call(this.props.onChange, option.value);

    this.props.control.setValue(option.value);
  }
}
