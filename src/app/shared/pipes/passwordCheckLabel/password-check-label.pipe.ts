import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'passwordCheckLabel',
})
export class PasswordCheckLabelPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(key: string): string {
    switch (key) {
      case 'hasUppercase':
        return this.translate.instant('At least one uppercase letter');
      case 'hasLowercase':
        return this.translate.instant('At least one lowercase letter');
      case 'hasNumber':
        return this.translate.instant('At least one number');
      case 'hasMinLength':
        return this.translate.instant('At least 8 characters');
      case 'hasSpecial':
        return this.translate.instant('At least one special character');
      default:
        return key;
    }
  }
}
