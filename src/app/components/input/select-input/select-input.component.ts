import { Component, ContentChildren, ElementRef, Input, OnInit, AfterContentInit, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['../input.component.css']
})
export class SelectInputComponent implements OnInit, AfterContentInit {
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

  toggle!: FormControl;
  searchbox!: FormControl;
  selected!: string;
  title!: string;
  message?: string;

  constructor() { }

  ngOnInit(): void {
    this.toggle = new FormControl(false);

    this.selected = this.props.placeholder || 'Selecione...';

    this.title = this.props.label;

    this.props.control.valueChanges.subscribe((value) => {
      const option = this.options.find((item) => item.value === value);
      
      this.selected = option?.innerText || '';

      this.title = this.selected ? `${this.props.label}: ${this.selected}` : this.props.label;

      this.props.onChange?.call(this.props.onChange, value);
    });
  }

  ngAfterContentInit(): void {
    this.options = this.optionsList.map(ref => ref.nativeElement);

    const selected = this.props.control.value ? this.options.find(option => option.value === this.props.control.value) : null;

    if (selected) {
      setTimeout(() => this.props.control.setValue(selected.value));
    }

    if (this.props.search) {
      this.searchbox = new FormControl('');

      this.searchbox.valueChanges.subscribe((value: string) => {
        if (!value) {
          this.options = this.optionsList.map(ref => ref.nativeElement);

          return;
        }

        let filteredOptions: ElementRef<HTMLOptionElement>[] = this.optionsList.filter((option) => {
          let string: string = option.nativeElement.innerText;

          string = string.normalize("NFD").replace(/\W/g, "");

          return string.toLowerCase().search(value.toLowerCase().normalize("NFD").replace(/\W/g, "")) > -1;
        });

        this.options = filteredOptions.map(ref => ref.nativeElement);
      });
    }

    this.props.control.statusChanges.subscribe(status => {
      this.classList = ['form-control', status.toLocaleLowerCase()];

      const {errors} = this.props.control;
      
      this.message = errors ? errors['message'] : 'Valor inválido!';
    });
  }

  select(option: HTMLOptionElement): void {
    if (!option.disabled) {
      this.props.control.setValue(option.value);
    }

    this.toggle.setValue(false);
  }
}
