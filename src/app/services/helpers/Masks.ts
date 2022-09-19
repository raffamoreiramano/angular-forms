export class Masks {
  static BRLMask(value: number | string, fraction = 10000, digits = 4): string {
    let number = 0;
  
    if (typeof value === 'number') {
      number = value / fraction;
    } else {
      number = parseInt(value?.replace(/\D/g, "")) / fraction;
    }
  
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: digits });
  }

  static phoneMask(value: string) {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 7) {
      return digits;
    }

    if (digits.match(/^0[1-9]00/)) {
      return digits
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\s\d{3})(\d)/, "$1 $2")
        .replace(/(\s\d{4})(\d+?)$/, "$1")
    }

    if (digits.length <= 9) {
      return digits
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})(-)(\d{5})/, "$1$3")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})(\d+?)$/, "$1");
    }

    return digits
      .replace(/(^0+)(\d)/, "$2")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\s\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})(-)(\d{5})/, "$1$3")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  }

  static IPMask(value: string): string {
    let digits = value
      .replace(/[^.\d]/g, "")
      .replace(/(\.+)(\.+)/, "$10$2")
      .replace(/(\d{3})(\d+)/, "$1.$2")
      .replace(/(^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))\.([.\d]+)$/, "$1")
      .replace(/^((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))(\.+)$/, "$1")

    let slices = digits.split(".").map((item) => {
      if (item.match(/^\d{1,3}$/)) {
        const int = parseInt(item);

        if (int >= 0 && int < 256) {
          return int;
        } else {
          return int - (int - 255)
        }
      }

      return null;
    });

    return slices.join(".");
  }

  static CPMask(value: string): string {
    const digits = value.replace(/\D/g, "");

    // XXX.XXX.XXX-XX
    if (digits.length <= 11) {
      return digits
        .replace(/(\d{3})(\d+?)$/, "$1.$2")
        .replace(/(\d{3})\.(\d{3})(\d+?)$/, "$1.$2.$3")
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4")
        .replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})(\d+?)$/, "$1.$2.$3-$4");
    }

    // XX.XXX.XXX/0001-XX
    if (digits.length <= 15) {
      return digits
        .replace(/(\d{2})(\d+?)$/, "$1.$2")
        .replace(/(\d{2})\.(\d{3})(\d+?)$/, "$1.$2.$3")
        .replace(/(\d{2})\.(\d{3})\.(\d{3})(\d+?)$/, "$1.$2.$3/$4")
        .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d+?)$/, "$1.$2.$3/$4-$5")
        .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})(\d+?)$/, "$1.$2.$3/$4-$5");
    }

    return digits.substring(0, 15);
  }
}