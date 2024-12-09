import * as Handlebars from 'handlebars';
import FormatDate, { formatHour } from './FormatDate';
import capitalize from './capitalize';

const decode = require('decode-html');

export class TemplateHelper{

  static buildWithoutTemplate(filename: any,
                              params : any) : string {
    // Implement helpers
    TemplateHelper.helpers();
    const fs = require('fs');
    const template = fs.readFileSync(`./template/${filename}.html`,
                                     'utf8');
    const finishTemplate = Handlebars.compile(template, { strict: true });
    const html = finishTemplate(params);
    return decode(html);
  }
  private static helpers() : void {
    // list helper
    Handlebars.registerHelper('list', (items) => {
      let out = '<ul style="' +
          'font-weight: 300 !important;' +
          ' padding: 0;' +
          ' margin: 0 0 10px 0;' +
          ' list-style-type: disc;">';

      for (const i of items) {
        out = `${out} <li style="margin: 0 0 10px 30px;">  ${i} </li>`;
      }
      return `${out} </ul>`;
    });
    // cameCase helper
    Handlebars.registerHelper('camelCase', (values) => {
      return capitalize(values);
    });

    Handlebars.registerHelper('toUpperCase', (values) => {
      return values.toUpperCase();
    });

    // cameCase helper
    Handlebars.registerHelper('dateFormat', (values) => {
      return FormatDate(new Date(values));
    });
    // cameCase helper
    Handlebars.registerHelper('hourFormat', (values) => {
      return formatHour(new Date(values));
    });
    // cameCase helper
    Handlebars.registerHelper('newDate', () => {
      return `${FormatDate(new Date())} ${formatHour(new Date())}`;
    });
    Handlebars.registerHelper('gender', (value: number) => {
      return value === 1 ? 'Masculino' : 'Femenino';
    });
  }
}
