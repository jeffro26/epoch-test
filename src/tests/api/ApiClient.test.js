import {Client} from "../../api/ApiClient"


describe('Client', () => {
  const api = new Client();

  it('deafult config should return secret token', async () => {
    const baseUrl = await api._defaultConfig();
    expect(baseUrl).toEqual({ headers:{
         Authorization: "mysecrettoken" }
     });
  });

  it('client should correctly call get http when _get is called', async () => {
    const mockResponse = { data: 'file has been retrieved' };
    const mockURL = '/testing';
    api.http.get = jest.fn().mockImplementation(() => Promise.resolve(mockResponse));
    const mockeDataResponse = await api._get(mockURL);
    expect(api.http.get).toBeCalledWith(mockURL);
    expect(mockeDataResponse).toEqual(mockResponse.data);
  });
})