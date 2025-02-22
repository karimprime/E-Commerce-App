import { PasswordCheckLabelPipe } from './password-check-label.pipe';

describe('PasswordCheckLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordCheckLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
