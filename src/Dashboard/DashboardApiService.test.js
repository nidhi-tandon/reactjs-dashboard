
import mockAxios from 'axios';

jest.mock('axios');

test('should fetch users', () => {
    const resp = {
        data:
          {
              'data':
                [
                    {
                        'date_uploaded': '2018-09-25T02:14:50',
                        'documents': [{
                            'date_uploaded': '2018-09-25T02:14:51',
                            'doc_id': 217,
                            'name': '1823696_Proof_16Feb2017.pdf',
                            'preview_url': '/file/cluster/ZEFTLSPOIR/preview.jpeg',
                            'set_id': 1209,
                            'status': 'uploaded',
                            'uploader': 'john'
                        }, {
                            'date_uploaded': '2018-09-25T02:14:51',
                            'doc_id': 218,
                            'name': '10538_PA_16031.pdf',
                            'preview_url': '/file/cluster/DCZBFJCDLN/preview.jpeg',
                            'set_id': 1209,
                            'status': 'queued',
                            'uploader': 'john'
                        }, {
                            'date_uploaded': '2018-09-25T02:14:51',
                            'doc_id': 219,
                            'name': '3704_KR_130.pdf',
                            'preview_url': '/file/cluster/DCZBFJCDLN/preview.jpeg',
                            'set_id': 1209,
                            'status': 'failed',
                            'uploader': 'john'
                        }, {
                            'date_uploaded': '2018-09-25T02:14:51',
                            'doc_id': 229,
                            'name': '21104_NY_11830.pdf',
                            'preview_url': '/file/cluster/OPNJEBJMRC/preview.jpeg',
                            'set_id': 1209,
                            'status': 'processing',
                            'uploader': 'john'
                        }],
                        'name': 'Batch 4290',
                        'set_id': 1209,
                        'status': 'processing'
                    }]
          }
    };


    // const actual = await getDashboardData()

    // or you could use the following depending on your use case:
    mockAxios.get.mockImplementation(() => Promise.resolve(resp))

    mockAxios.get.mockResolvedValue(resp);


    // return getDashboardData().then(users => expect(users.data).toEqual(resp.data));
});

