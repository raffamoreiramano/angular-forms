export class Validation {
  static validateName(value: string, min = 1, max = 64): boolean {
    // Nome do Sujeito
    const regex = /^([A-Z\u00C0-\u00DE][a-zA-Z\u00C0-\u00FF]+\s?[a-zA-Z\u00C0-\u00FF]*\s?)*$/g;

    if (value.length < min || value.length > max) {
      return false;
    }

    if (!value.match(regex)) {
      return false;
    }

    return true;
  }

  static validateEmail(value: string) {
    // e-mail.local_part@domain.com.br
    const characters = '[0-9a-z\u00C0-\u00FF]';
    const punctuation = '[0-9a-z\u00C0-\u00FF+-.]';
    const special = '[!#$%&*+-_.]';
    const regex = new RegExp(
      '^' +
      characters + '+' +
      special + '*' +
      characters + '+@' +
      characters + '+' +
      punctuation + '*' +
      characters + '+$',
      'gi'
    );

    if (!value.match(regex)) {
      return false;
    }

    return true;
  }

  static validatePassword(value: string): boolean {
    // requer entre 8 e 32 caracteres, e permite caracteres alfanuméricos e especiais (!@#$%&*\-_.)
    const regex = /^[\w!@#$%&*\-_.]{8,32}$/gi

    if (!value.match(regex)) {
      return false;
    }

    return true;
  }

  static validatePhone(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    const regex = /(\([0-9]{2}\))/g;

    if (digits.length > 1 && digits.length < 8) {
      return digits.match(/^0/) ? false : true;
    }

    if (digits.length < 10 || digits.length > 11) {
      return false;
    }

    if (!value.match(regex)) {
      return false;
    }

    return digits ? true : false;
  }

  static validateCPF(value: string): boolean {
    let cpf = value.replace(/\D/g, "");

    if (cpf == '') return false;

    if (cpf.length != 11) return false;
    
    let invalidArray: string[] | number[] = [...Array(10).keys()];

    invalidArray = invalidArray.map((item) => {
      return Array(cpf.length + 1).join(String(item));
    });

    if (invalidArray.some((item) => item == cpf)) {
      return false;
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let remainder = 11 - (sum % 11);

    if (remainder == 10 || remainder == 11)	{
      remainder = 0;
    }

    if (remainder != parseInt(cpf.charAt(9)))	{
      return false;
    }

    sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    remainder = 11 - (sum % 11);

    if (remainder == 10 || remainder == 11)	{
      remainder = 0;
    }

    if (remainder != parseInt(cpf.charAt(10))) {
      return false;		
    }
    
    return true;
  }

  // static validateCNPJ(value: string): boolean {
  //   let cnpj = value.replace(/\D/g, "");

  //   if (cnpj == '') return false;

  //   if (cnpj.length != 14) return false;

  //   let invalidArray = [...Array(10).keys()];

  //   invalidArray = invalidArray.map((item) => {
  //     return Array(cnpj.length + 1).join(item);
  //   });

  //   if (invalidArray.some((item) => item == cnpj)) {
  //     return false;
  //   }

  //   let length = cnpj.length - 2
  //   let number = cnpj.substring(0, length);
  //   let digits = cnpj.substring(length);
  //   let sum = 0;
  //   let position = length - 7;

  //   for (var i = length; i >= 1; i--) {
  //     sum += number.charAt(length - i) * position--;

  //     if (position < 2) {
  //       position = 9;
  //     }
  //   }

  //   let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  //   if (result != digits.charAt(0)) return false;

  //   length = length + 1;
  //   number = cnpj.substring(0, length);
  //   sum = 0;
  //   position = length - 7;

  //   for (i = length; i >= 1; i--) {
  //     sum += number.charAt(length - i) * position--;

  //     if (position < 2) {
  //       position = 9;
  //     }
  //   }

  //   result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  //   if (result != digits.charAt(1))	return false;

  //   return true;
  // }

}