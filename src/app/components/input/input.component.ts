import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Masks } from 'src/app/services/helpers/Masks';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() props!: {
    control: FormControl,
    id: string,
    type: string,
    name: string,
    label: string,
    placeholder?: string,
    title?: string,
    onChange?: Function,
    filename?: {
      control: FormControl,
      onChange: Function,
    }
    accept?: string,
    message?: string,
  };

  title = '';
  message?: string;

  onFocus!: Function;
  onChange!: Function;
  onFilenameChange!: Function;

  private validated = true;

  toggle!: FormControl;
  showPassword = false;

  classList: string[] = ['form-control'];
  
  constructor() {
  }
  
  ngOnInit(): void {
    this.title = this.props.title ?? this.props.label;

    
    switch (this.props.type) {
      case 'text':
      case 'email':
        this.props.control.valueChanges.subscribe((value) => {
          this.props.onChange?.call(this.props.onChange, value);
    
          this.title = this.props.title ?? `${this.props.label}: ${value || '...'}`;
        });

        break;
      case 'password':
        this.toggle = new FormControl(false);

        this.toggle.valueChanges.subscribe((value: true) => this.showPassword = value);

        this.props.control.valueChanges.subscribe((value) => this.props.onChange?.call(this.props.onChange, value));

        this.title = this.props.label;

        break;
      case 'tel':
        this.props.control.valueChanges.subscribe((value) => {
          const maskedValue = Masks.phoneMask(value);

          this.props.onChange?.call(this.props.onChange, value);

          this.props.control.setValue(maskedValue, {
            emitEvent: false,
            onlySelf: true,
          });

          this.title = this.props.title ?? `${this.props.label}: ${maskedValue || '...'}`;
        });

        break;
      case 'number':
        this.onFocus = (focusEvent: FocusEvent) => {
          const root = document.getElementById('root');
          const input = focusEvent.target;

          if (root && input) {
            const onWheel = (wheelEvent: WheelEvent) => wheelEvent.stopPropagation();
            
            root.addEventListener('wheel', onWheel, true);
            
            const onBlur = () => {    
              root.removeEventListener('wheel', onWheel);
            }
            
            input.removeEventListener('blur', onBlur);
            input.addEventListener('blur', onBlur);
          }
        }

        this.props.control.valueChanges.subscribe((value) => {
          this.props.onChange?.call(this.props.onChange, value);
    
          this.title = this.props.title ?? `${this.props.label}: ${value || '...'}`;
        });

        break;
      case 'file':
        const {filename} = this.props;
        
        this.onChange = (changeEvent: any) => {
          const [value] = changeEvent?.target?.files;

          if (value) {            
            this.props.onChange?.call(this.props.onChange, value);
            
            this.props.control.setValue(value, {
              emitEvent: true,
            });

            if (filename?.onChange) {
              const str = value?.name || '';
              const noExtName = str.substr(-str.length, str.lastIndexOf("."));

              filename.onChange?.call(filename?.onChange, noExtName);

              filename.control.setValue(noExtName, {
                emitEvent: false,
                onlySelf: true,
              });
            }
          }
        }

        filename?.control.valueChanges.subscribe((value) => {
          filename?.onChange?.call(this.props.filename?.onChange, value);
    
          this.title = this.props.title ?? `${this.props.label}: ${value || '...'}`;
        });

        break;
      default:
        this.props.control.valueChanges.subscribe((value) => {
          this.props.onChange?.call(this.props.onChange, value);
    
          this.title = this.props.title ?? `${this.props.label}: ${value || '...'}`;
        });

        break;
    }

    this.props.control.statusChanges.subscribe((status) => {
      this.classList = ['form-control', status.toLowerCase()];

      const {errors} = this.props.control;
      
      this.message = errors ? errors['message'] : 'Valor inválido!';
      
      if (this.validated) {
        this.validated = false;
      }
    });
  }
}
