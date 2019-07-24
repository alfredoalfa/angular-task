import { AngularTaksPage } from './app.po';

describe('angular-taks App', () => {
  let page: AngularTaksPage;

  beforeEach(() => {
    page = new AngularTaksPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
