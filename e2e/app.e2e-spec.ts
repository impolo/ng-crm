import { APITAPMobileCRMPage } from './app.po';

describe('apitap-mobile-crm App', function() {
  let page: APITAPMobileCRMPage;

  beforeEach(() => {
    page = new APITAPMobileCRMPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
