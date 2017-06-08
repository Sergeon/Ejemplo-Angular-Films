import { FilmsNgcliPage } from './app.po';

describe('films-ngcli App', () => {
  let page: FilmsNgcliPage;

  beforeEach(() => {
    page = new FilmsNgcliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
