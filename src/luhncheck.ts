/* THE FOLLOWING IS NOT MY OWN WORK, it is taken
    from the top stackoverflow answer of
    https://stackoverflow.com/questions/12310837/implementation-of-luhn-algorithm */

    const luhnCheck = (value: string) => {
      if (/[^0-9-\s]+/.test(value)) {
        return false;
      }
      let nCheck = 0,
        bEven = false;
      value = value.replace(/\D/g, "");
      for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
          nDigit = parseInt(cDigit, 10);
    
        if (bEven) {
          if ((nDigit *= 2) > 9) nDigit -= 9;
        }
        nCheck += nDigit;
        bEven = !bEven;
      }
    
      return nCheck % 10 == 0;
    };
    
    export default luhnCheck;