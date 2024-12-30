import axios from 'axios'

const data = {
    merchantCode: 'DS21357',
    amount: 300000,
    merchantOrderId: 'UANG-SAKU1734993637',
    productDetail: 'Pembayaran Uang Saku Achmad Farid Anjali',
    additionalParam: '6',
    paymentCode: 'I1',
    resultCode: '00',
    merchantUserId: '64',
    reference: 'DS213572411Y4OL8KIJE0G5C',
    signature: '1dd9413f86fb746ec37e7a56392d0bbb',
    publisherOrderId: 'I12452LDAHIZECVKZA1',
    spUserHash: '',
    settlementDate: '2024-12-25',
    sourceAccount: '',
    issuerCode: ''
};

axios.post('http://backend.test/api/user/pembayaran/duitku/callback', data)
    .then(response => {
        console.log('Success!');
        console.log('Status code:', response.status);
        console.log('Response data:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
        // if (error.response) {
        //     console.error('Response data:', error.response.data);
        //     console.error('Status code:', error.response.status);
        // } else if (error.request) {
        //     console.error('Request:', error.request);
        // } else {
        //     console.error('Error:', error.message);
        // }
    });