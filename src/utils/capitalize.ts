export default function capitalize(sentence?: string | null,
                                   addDefaultPreps?: boolean,
                                   notCapitalizeFor: string[] = []) {
  if (sentence) {
    // tslint:disable-next-line:max-line-length
    let string = ` ${ sentence }`; // for cheking with \s operator in reges is needed an space this operator check all latin caracters
    // tslint:disable-next-line:max-line-length
    const vocalNexosException = ' a,e,i,o,u,y '.split(',').join(' , ').split(','); // === [ ' a ', ' e ', ' i '] that the format we need for identify the vocal nexos
    const defaultPreps: any[] = ['Para', 'En', 'Por', 'Y'].concat(vocalNexosException);
    // tslint:disable-next-line:max-line-length
    const allExceptions: any[] = (addDefaultPreps) ? defaultPreps.concat(notCapitalizeFor) : notCapitalizeFor;
    allExceptions.concat([vocalNexosException]);
    // tslint:disable-next-line:max-line-length
    const excepts: string = (allExceptions) ? allExceptions.join('|') : vocalNexosException.join('|');
    const regPreps: RegExp = RegExp(excepts, 'ig');

    string = string.toLowerCase().replace(/\s\w/g, (l: string) => l.toUpperCase())
    // removing the capitalize for exceptions received
        .replace(regPreps, except => except.toLowerCase())
        // checking for all roman numbers in the const string received
        .replace(/\b[A-Z]+/ig, (l: string) =>
            /^(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)$/ig.test(l)
                ? l.toUpperCase()
                : l);

    return string.substr(1);
  }
  return '';

}
