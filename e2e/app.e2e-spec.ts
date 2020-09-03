import { TerribleSpaPage } from './app.po';

describe('terrible-spa App', function () {
  let page: TerribleSpaPage;

  beforeEach(() => {
    page = new TerribleSpaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
